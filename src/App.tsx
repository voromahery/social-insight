import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthContext'
import ProtectedRoute from './app/ProtectedRoute'
import Layout from './app/Layout'

const LandingPage = lazy(() => import('./app/LandingPage'))
const LoginPage = lazy(() => import('./features/auth/LoginPage'))
const RegisterPage = lazy(() => import('./features/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./features/auth/ForgotPasswordPage'))
const OnboardingPage = lazy(() => import('./features/onboarding/OnboardingPage'))
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'))
const PlatformsPage = lazy(() => import('./features/platforms/PlatformsPage'))
const PlatformDetailPage = lazy(() => import('./features/platforms/PlatformDetailPage'))
const MonetizationPage = lazy(() => import('./features/monetization/MonetizationPage'))
const IndustriesPage = lazy(() => import('./features/industries/IndustriesPage'))
const AudiencesPage = lazy(() => import('./features/audiences/AudiencesPage'))
const MarketInsightsPage = lazy(() => import('./features/market-insights/MarketInsightsPage'))
const ContentGapsPage = lazy(() => import('./features/content-gaps/ContentGapsPage'))
const OpportunityDetailPage = lazy(() => import('./features/content-gaps/OpportunityDetailPage'))
const CompetitorsPage = lazy(() => import('./features/competitors/CompetitorsPage'))
const GeographicInsightsPage = lazy(() => import('./features/geographic-insights/GeographicInsightsPage'))
const ContentLabPage = lazy(() => import('./features/content-lab/ContentLabPage'))
const ExperimentsPage = lazy(() => import('./features/experiments/ExperimentsPage'))
const SavedInsightsPage = lazy(() => import('./features/saved-insights/SavedInsightsPage'))
const ReportsPage = lazy(() => import('./features/reports/ReportsPage'))
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'))

function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/platforms" element={<PlatformsPage />} />
            <Route path="/platforms/:platformId" element={<PlatformDetailPage />} />
            <Route path="/monetization" element={<MonetizationPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/audiences" element={<AudiencesPage />} />
            <Route path="/market-insights" element={<MarketInsightsPage />} />
            <Route path="/content-gaps" element={<ContentGapsPage />} />
            <Route path="/content-gaps/:opportunityId" element={<OpportunityDetailPage />} />
            <Route path="/competitors" element={<CompetitorsPage />} />
            <Route path="/geographic-insights" element={<GeographicInsightsPage />} />
            <Route path="/content-lab" element={<ContentLabPage />} />
            <Route path="/experiments" element={<ExperimentsPage />} />
            <Route path="/saved-insights" element={<SavedInsightsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
