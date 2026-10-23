import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthContext'
import ProtectedRoute from './app/ProtectedRoute'
import Layout from './app/Layout'
import LandingPage from './app/LandingPage'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import ForgotPasswordPage from './features/auth/ForgotPasswordPage'
import OnboardingPage from './features/onboarding/OnboardingPage'
import DashboardPage from './features/dashboard/DashboardPage'
import PlatformsPage from './features/platforms/PlatformsPage'
import PlatformDetailPage from './features/platforms/PlatformDetailPage'
import MonetizationPage from './features/monetization/MonetizationPage'
import IndustriesPage from './features/industries/IndustriesPage'
import AudiencesPage from './features/audiences/AudiencesPage'
import MarketInsightsPage from './features/market-insights/MarketInsightsPage'
import ContentGapsPage from './features/content-gaps/ContentGapsPage'
import OpportunityDetailPage from './features/content-gaps/OpportunityDetailPage'
import CompetitorsPage from './features/competitors/CompetitorsPage'
import GeographicInsightsPage from './features/geographic-insights/GeographicInsightsPage'
import ContentLabPage from './features/content-lab/ContentLabPage'
import ExperimentsPage from './features/experiments/ExperimentsPage'
import SavedInsightsPage from './features/saved-insights/SavedInsightsPage'
import ReportsPage from './features/reports/ReportsPage'
import SettingsPage from './features/settings/SettingsPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Onboarding — protected but outside main layout */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes inside the app layout */}
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
    </AuthProvider>
  )
}
