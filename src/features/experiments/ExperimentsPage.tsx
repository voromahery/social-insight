import { useState } from 'react'
import { FlaskConical, Plus, X, CheckCircle2, Clock, Archive } from 'lucide-react'
import type { Experiment, ExperimentStatus } from '../../types'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { MOCK_PLATFORMS } from '../../mocks/platforms'

function generateId() { return `exp-${Date.now()}` }

const STATUS_CONFIG: Record<ExperimentStatus, { label: string; variant: 'default' | 'info' | 'success' | 'warning' | 'danger' | 'outline'; icon: typeof Clock }> = {
  proposed: { label: 'Proposed', variant: 'outline', icon: Clock },
  researching: { label: 'Researching', variant: 'info', icon: Clock },
  'ready-to-create': { label: 'Ready to create', variant: 'warning', icon: Clock },
  published: { label: 'Published', variant: 'info', icon: CheckCircle2 },
  measuring: { label: 'Measuring', variant: 'warning', icon: Clock },
  completed: { label: 'Completed', variant: 'success', icon: CheckCircle2 },
  abandoned: { label: 'Abandoned', variant: 'danger', icon: Archive },
}

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>(() => {
    try { return JSON.parse(localStorage.getItem('social-insight-experiments') ?? '[]') as Experiment[] }
    catch { return [] }
  })
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', platform: '', hypothesis: '', metrics: '' })

  const save = (updated: Experiment[]) => {
    setExperiments(updated)
    try { localStorage.setItem('social-insight-experiments', JSON.stringify(updated)) } catch {}
  }

  const addExperiment = () => {
    if (!form.title || !form.hypothesis) return
    const exp: Experiment = {
      id: generateId(),
      title: form.title,
      platform: form.platform,
      hypothesis: form.hypothesis,
      successMetrics: form.metrics.split(',').map(s => s.trim()).filter(Boolean),
      status: 'proposed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    save([exp, ...experiments])
    setForm({ title: '', platform: '', hypothesis: '', metrics: '' })
    setShowForm(false)
  }

  const updateStatus = (id: string, status: ExperimentStatus) => {
    save(experiments.map(e => e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e))
  }

  const deleteExp = (id: string) => save(experiments.filter(e => e.id !== id))

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Experiments</h1>
          <p className="text-slate-500 text-sm">Track content hypotheses and compare results with your predictions.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Experiment
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">New Experiment</h2>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Tax tips for freelancers #1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
                <select value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option value="">Select platform</option>
                  {MOCK_PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hypothesis *</label>
              <textarea value={form.hypothesis} onChange={e => setForm(f => ({ ...f, hypothesis: e.target.value }))} rows={3} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="e.g., A short video explaining quarterly taxes for freelancers will reach 10,000+ views within 30 days on YouTube, because this topic has high search demand and few beginner-friendly tutorials." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Success metrics (comma-separated)</label>
              <input value={form.metrics} onChange={e => setForm(f => ({ ...f, metrics: e.target.value }))} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 10,000 views, 500 likes, 100 comments" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button size="sm" onClick={addExperiment}>Save experiment</Button>
              <Button size="sm" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {experiments.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="font-semibold text-slate-700 mb-1">No experiments yet</h2>
          <p className="text-sm text-slate-500 mb-4 max-w-sm mx-auto">
            Record a content hypothesis, publish it, and track whether your predicted outcomes match the actual results.
          </p>
          <p className="text-xs text-slate-400 mb-4">Note: Social Insight cannot claim causality from a single experiment. Use experiments to learn directionally, not definitively.</p>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Start your first experiment
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiments.map(exp => {
            const config = STATUS_CONFIG[exp.status]
            const StatusIcon = config.icon
            return (
              <div key={exp.id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 text-sm">{exp.title}</h3>
                      <Badge variant={config.variant} size="sm">
                        <StatusIcon className="w-3 h-3 inline mr-1" />{config.label}
                      </Badge>
                    </div>
                    {exp.platform && <Badge variant="info" size="sm">{exp.platform}</Badge>}
                  </div>
                  <button onClick={() => deleteExp(exp.id)} className="text-slate-300 hover:text-red-500 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-600 mb-3 leading-relaxed">{exp.hypothesis}</p>

                {exp.successMetrics.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-slate-500 mb-1">Success metrics</p>
                    <div className="flex flex-wrap gap-1">
                      {exp.successMetrics.map(m => <Badge key={m} variant="default" size="sm">{m}</Badge>)}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500">Update status:</span>
                  <select
                    value={exp.status}
                    onChange={e => updateStatus(exp.id, e.target.value as ExperimentStatus)}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  >
                    {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-400 ml-auto">
                    {new Date(exp.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
