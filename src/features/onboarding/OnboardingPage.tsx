import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, TrendingUp, Check } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

type Goal = 'grow-creator' | 'market-business' | 'research-niche' | 'find-markets' | 'manage-client' | 'monetization'
type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
type GeoScope = 'global' | 'local'

const GOALS: Array<{ value: Goal; label: string; description: string }> = [
  { value: 'grow-creator', label: 'Grow a creator brand', description: 'Build an audience and grow your personal brand' },
  { value: 'market-business', label: 'Market a business', description: 'Find content opportunities for your products or services' },
  { value: 'research-niche', label: 'Research a niche', description: 'Explore market opportunities in a specific topic area' },
  { value: 'find-markets', label: 'Find new markets', description: 'Identify geographic or demographic markets to expand into' },
  { value: 'manage-client', label: 'Manage client research', description: 'Conduct research and produce insights for clients' },
  { value: 'monetization', label: 'Discover monetization', description: 'Find ways to generate revenue from social content' },
]

const INDUSTRIES = ['Technology', 'Finance', 'Health & Wellness', 'Education', 'Fashion', 'Food & Beverage', 'Travel', 'Gaming', 'Beauty', 'Real Estate', 'Marketing', 'Creative Services']
const PLATFORMS = ['YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'X (Twitter)', 'Facebook', 'Pinterest', 'Reddit', 'Twitch', 'Discord']
const COUNTRIES = ['United States', 'United Kingdom', 'Australia', 'Canada', 'Germany', 'France', 'India', 'Brazil', 'Japan', 'Mexico']

interface Prefs {
  goal?: Goal
  industries: string[]
  platforms: string[]
  geoScope: GeoScope
  country: string
  experience: ExperienceLevel
  language: string
}

function OptionButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative text-left p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500',
        selected
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      )}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </span>
      )}
      {children}
    </button>
  )
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [prefs, setPrefs] = useState<Prefs>({
    industries: [],
    platforms: [],
    geoScope: 'global',
    country: '',
    experience: 'intermediate',
    language: 'English',
  })

  const totalSteps = 4

  const toggleArray = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]

  const finish = () => {
    try {
      const stored = localStorage.getItem('si_user')
      if (stored) {
        const user = JSON.parse(stored)
        user.preferences = {
          ...user.preferences,
          primaryGoal: prefs.goal ?? 'grow-creator',
          industries: prefs.industries,
          platforms: prefs.platforms.map((p) => p.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')),
          geographicScope: prefs.geoScope,
          country: prefs.country || undefined,
          primaryLanguage: prefs.language,
          experienceLevel: prefs.experience,
        }
        localStorage.setItem('si_user', JSON.stringify(user))
      }
    } catch {
      // ignore
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Social Insight</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i + 1 <= step ? 'bg-indigo-600 w-8' : 'bg-slate-200 w-4'
                )}
              />
            ))}
          </div>
          <p className="text-sm text-slate-400">Step {step} of {totalSteps}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">What's your primary goal?</h2>
              <p className="text-slate-500 text-sm mb-6">This helps us personalize your dashboard and recommendations.</p>
              <div className="grid grid-cols-1 gap-3">
                {GOALS.map((g) => (
                  <OptionButton
                    key={g.value}
                    selected={prefs.goal === g.value}
                    onClick={() => setPrefs((p) => ({ ...p, goal: g.value }))}
                  >
                    <p className="font-medium text-slate-900 text-sm">{g.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{g.description}</p>
                  </OptionButton>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Your industry and platforms</h2>
              <p className="text-slate-500 text-sm mb-4">Select all that apply — you can change these later.</p>
              <div className="mb-5">
                <p className="text-sm font-medium text-slate-700 mb-2">Industries (select any)</p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setPrefs((p) => ({ ...p, industries: toggleArray(p.industries, ind) }))}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                        prefs.industries.includes(ind)
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-300'
                      )}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Platforms (select any)</p>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((pl) => (
                    <button
                      key={pl}
                      type="button"
                      onClick={() => setPrefs((p) => ({ ...p, platforms: toggleArray(p.platforms, pl) }))}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                        prefs.platforms.includes(pl)
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-300'
                      )}
                    >
                      {pl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Your target market</h2>
              <p className="text-slate-500 text-sm mb-6">We won't assume your location — choose the markets you want to research.</p>
              <div className="mb-5">
                <p className="text-sm font-medium text-slate-700 mb-3">Geographic scope</p>
                <div className="grid grid-cols-2 gap-3">
                  {(['global', 'local'] as GeoScope[]).map((s) => (
                    <OptionButton
                      key={s}
                      selected={prefs.geoScope === s}
                      onClick={() => setPrefs((p) => ({ ...p, geoScope: s }))}
                    >
                      <p className="font-medium text-slate-900 text-sm capitalize">{s === 'global' ? 'Global' : 'Local & Regional'}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {s === 'global' ? 'Research worldwide opportunities' : 'Focus on specific countries or regions'}
                      </p>
                    </OptionButton>
                  ))}
                </div>
              </div>
              {prefs.geoScope === 'local' && (
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Primary country</p>
                  <select
                    value={prefs.country}
                    onChange={(e) => setPrefs((p) => ({ ...p, country: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Your experience and language</h2>
              <p className="text-slate-500 text-sm mb-6">Helps us calibrate explanations and recommendations.</p>
              <div className="mb-5">
                <p className="text-sm font-medium text-slate-700 mb-3">Experience level</p>
                <div className="grid grid-cols-3 gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map((lvl) => (
                    <OptionButton
                      key={lvl}
                      selected={prefs.experience === lvl}
                      onClick={() => setPrefs((p) => ({ ...p, experience: lvl }))}
                    >
                      <p className="font-medium text-slate-900 text-sm capitalize">{lvl}</p>
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Primary language</p>
                <select
                  value={prefs.language}
                  onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {['English', 'Spanish', 'French', 'German', 'Portuguese', 'Japanese', 'Mandarin', 'Hindi', 'Arabic'].map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <button
                type="button"
                onClick={finish}
                className="text-sm text-slate-400 hover:text-slate-600"
              >
                Skip setup
              </button>
            )}
            {step < totalSteps ? (
              <Button onClick={() => setStep((s) => s + 1)}>
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={finish}>
                Get started <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
