import { useState } from 'react'
import { Target, Plus, X, ExternalLink, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { competitorSchema, type CompetitorInput } from '../../schemas'
import type { Competitor } from '../../types'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { MOCK_PLATFORMS } from '../../mocks/platforms'

function generateId() { return `comp-${Date.now()}` }

const CATEGORIES = ['Direct competitor', 'Indirect competitor', 'Industry leader', 'Niche creator', 'Adjacent content']

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>(() => {
    try { return JSON.parse(localStorage.getItem('social-insight-competitors') ?? '[]') as Competitor[] }
    catch { return [] }
  })
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompetitorInput>({
    resolver: zodResolver(competitorSchema),
  })

  const save = (updated: Competitor[]) => {
    setCompetitors(updated)
    try { localStorage.setItem('social-insight-competitors', JSON.stringify(updated)) } catch {}
  }

  const onSubmit = (data: CompetitorInput) => {
    const comp: Competitor = {
      id: generateId(),
      name: data.name,
      profileUrl: data.profileUrl,
      platform: data.platform,
      category: data.category,
      description: data.description,
      addedAt: new Date().toISOString(),
      topTopics: [],
      contentFormats: [],
      isPublic: true,
    }
    save([comp, ...competitors])
    reset()
    setShowForm(false)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Competitor Research</h1>
          <p className="text-slate-500 text-sm">Track competitor publishers and identify content gaps in their coverage.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Competitor
        </Button>
      </div>

      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Public data only.</span>{' '}
          Social Insight supports manual research and CSV import of public competitor information. Private analytics, reach, or audience demographics from competitor accounts are not accessible and will not be displayed.
        </p>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Add Competitor</h2>
            <button onClick={() => { setShowForm(false); reset() }} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                <input {...register('name')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Creator or brand name" />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Profile URL *</label>
                <input {...register('profileUrl')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://youtube.com/@channel" />
                {errors.profileUrl && <p className="text-xs text-red-600 mt-1">{errors.profileUrl.message}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Platform *</label>
                <select {...register('platform')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option value="">Select platform</option>
                  {MOCK_PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {errors.platform && <p className="text-xs text-red-600 mt-1">{errors.platform.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                <select {...register('category')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes (optional)</label>
              <textarea {...register('description')} rows={2} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Key topics, strengths, content gaps…" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" size="sm">Add competitor</Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => { setShowForm(false); reset() }}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {competitors.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="font-semibold text-slate-700 mb-1">No competitors tracked yet</h2>
          <p className="text-sm text-slate-500 mb-4 max-w-sm mx-auto">
            Add competitor accounts to identify topics they cover, gaps in their content, and opportunities they're missing.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add your first competitor
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Added</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {competitors.map(comp => (
                <tr key={comp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{comp.name}</div>
                    <a href={comp.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 mt-0.5">
                      <ExternalLink className="w-3 h-3" /> Profile
                    </a>
                  </td>
                  <td className="px-4 py-4"><Badge variant="info" size="sm">{comp.platform}</Badge></td>
                  <td className="px-4 py-4 text-slate-600">{comp.category}</td>
                  <td className="px-4 py-4 text-slate-500 text-xs max-w-xs truncate">{comp.description ?? '—'}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs">{new Date(comp.addedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4">
                    <button onClick={() => save(competitors.filter(c => c.id !== comp.id))} className="text-slate-300 hover:text-red-500 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
