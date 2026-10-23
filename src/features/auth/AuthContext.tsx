import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth'
import { auth, googleProvider, facebookProvider, twitterProvider } from '../../lib/firebase'
import type { User, UserPreferences } from '../../types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  loginWithTwitter: () => Promise<void>
  logout: () => Promise<void>
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

function firebaseUserToAppUser(fbUser: FirebaseUser): User {
  return {
    id: fbUser.uid,
    email: fbUser.email ?? '',
    name: fbUser.displayName ?? fbUser.email?.split('@')[0] ?? 'User',
    preferences: DEFAULT_PREFERENCES,
    createdAt: fbUser.metadata.creationTime ?? new Date().toISOString(),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser ? firebaseUserToAppUser(fbUser) : null)
      setIsLoading(false)
    })
    return unsub
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (email: string, password: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    setUser(firebaseUserToAppUser({ ...cred.user, displayName: name }))
  }

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  const loginWithFacebook = async () => {
    await signInWithPopup(auth, facebookProvider)
  }

  const loginWithTwitter = async () => {
    await signInWithPopup(auth, twitterProvider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{
      user, isLoading,
      login, loginWithGoogle, loginWithFacebook, loginWithTwitter,
      logout, register,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
