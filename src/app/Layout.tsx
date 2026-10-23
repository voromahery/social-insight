import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, Search, Globe, DollarSign, Map, Briefcase, Users,
  TrendingUp, Lightbulb, Target, FlaskConical, Bookmark, FileText,
  Settings, Menu, ChevronRight, ChevronLeft, Database,
} from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'
import { cn } from '../lib/cn'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/content-gaps', label: 'Content Gaps', icon: Search, flagship: true },
  { to: '/platforms', label: 'Platforms', icon: Globe },
  { to: '/monetization', label: 'Monetization', icon: DollarSign },
  { to: '/geographic-insights', label: 'Geographic', icon: Map },
  { to: '/industries', label: 'Industries', icon: Briefcase },
  { to: '/audiences', label: 'Audiences', icon: Users },
  { to: '/market-insights', label: 'Market Insights', icon: TrendingUp },
  { to: '/content-lab', label: 'Content Lab', icon: Lightbulb },
  { to: '/competitors', label: 'Competitors', icon: Target },
  { to: '/experiments', label: 'Experiments', icon: FlaskConical },
  { to: '/saved-insights', label: 'Saved', icon: Bookmark },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebar = (
    <nav
      className={cn(
        'flex flex-col h-full bg-slate-900 text-slate-300 transition-all duration-200',
        collapsed ? 'w-16' : 'w-60'
      )}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-slate-800">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm truncate">Social Insight</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden lg:flex text-slate-400 hover:text-white p-1 rounded ml-auto"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, flagship }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors group',
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800',
                collapsed ? 'justify-center' : ''
              )
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && (
              <span className="truncate">{label}</span>
            )}
            {!collapsed && flagship && (
              <span className="ml-auto text-xs bg-indigo-500 text-white px-1.5 py-0.5 rounded-full">★</span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-3">
        {!collapsed && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 px-1">
            <Database className="w-3 h-3" />
            <span>Sample data</span>
          </div>
        )}
        {user && (
          <div className={cn('flex items-center gap-2', collapsed ? 'justify-center' : '')}>
            <div className="w-7 h-7 rounded-full bg-indigo-700 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white uppercase">
              {user.name?.[0] ?? 'U'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{user.name}</p>
                <button onClick={logout} className="text-xs text-slate-500 hover:text-slate-300">Sign out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">{sidebar}</div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50 h-full flex">
            {sidebar}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 flex-shrink-0">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-700 p-1 rounded"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <div className="max-w-sm relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search insights…"
                className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                aria-label="Global search (not yet functional)"
              />
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 uppercase">
                {user.name?.[0] ?? 'U'}
              </div>
              <span className="hidden sm:block font-medium">{user.name}</span>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
