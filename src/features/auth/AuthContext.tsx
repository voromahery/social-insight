import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User, UserPreferences } from '../../types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const DEFAULT_PREFERENCES: UserPreferences = {
  primaryGoal: 'grow-creator',
  industries: [],
  targetAudiences: [],
  platforms: [],
  geographicScope: 'global',
  primaryLanguage: 'English',
  experienceLevel: 'intermediate',
  defaultDashboardView: 'opportunities',
  scoreWeights: {
    demand: 0.30,
    trendMomentum: 0.20,
    contentScarcity: 0.20,
    audienceRelevance: 0.15,
    monetizationPotential: 0.15,
  },
}

function createMockUser(email: string, name: string): User {
  return {
    id: `user-${Date.now()}`,
    email,
    name,
    preferences: DEFAULT_PREFERENCES,
    createdAt: new Date().toISOString(),
  }
}

const STORAGE_KEY = 'si_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setUser(JSON.parse(stored) as User)
    } catch {
      // ignore parse errors
    }
    setIsLoading(false)
  }, [])

  const persist = (u: User | null) => {
    setUser(u)
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const login = async (email: string, _password: string) => {
    // Dev mode: accept any credentials, create mock user
    await new Promise((r) => setTimeout(r, 400))
    const u = createMockUser(email, email.split('@')[0])
    persist(u)
  }

  const register = async (email: string, _password: string, name: string) => {
    await new Promise((r) => setTimeout(r, 400))
    const u = createMockUser(email, name)
    persist(u)
  }

  const logout = () => persist(null)

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
