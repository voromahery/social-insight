import { useState } from 'react'
import { Lightbulb, Plus, FileText, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contentBriefSchema, type ContentBriefInput } from '../../schemas'
import type { ContentBrief } from '../../types'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { MOCK_PLATFORMS } from '../../mocks/platforms'

function generateId() {
  return `brief-${Date.now()}`
}

export default function ContentLabPage() {
  const [briefs, setBriefs] = useState<ContentBrief[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('social-insight-briefs') ?? '[]') as ContentBrief[]
    } catch {
      return []
    }
  })
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContentBriefInput>({
    resolver: zodResolver(contentBriefSchema),
  })

  const saveBriefs = (updated: ContentBrief[]) => {
    setBriefs(updated)
    try { localStorage.setItem('social-insight-briefs', JSON.stringify(updated)) } catch {}
  }

  const onSubmit = (data: ContentBriefInput) => {
    const brief: ContentBrief = {
      id: generateId(),
      title: data.title,
      status: 'draft',
      targetAudience: data.targetAudience,
      audienceProblem: data.audienceProblem,
      coreTopic: data.coreTopic,
      suggestedAngle: data.suggestedAngle ?? '',
      contentFormat: data.contentFormat,
      platform: data.platform,
      geographicContext: 'Global',
      languageContext: 'English',
      evidence: '',
      competitorExamples: [],
      differentiationStrategy: '',
      proposedTitle: data.proposedTitle ?? '',
      outline: data.outline ? data.outline.split('\n').filter(Boolean) : [],
      callToAction: data.callToAction ?? '',
      monetizationPathway: data.monetizationPathway ?? '',
      successMetrics: [],
      limitations: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: data.notes,
    }
    saveBriefs([brief, ...briefs])
    reset()
    setShowForm(false)
  }

  const deleteBrief = (id: string) => {
    saveBriefs(briefs.filter(b => b.id !== id))
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Content Lab</h1>
          <p className="text-slate-500 text-sm">Turn opportunities into structured content briefs.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Create Brief
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">New Content Brief</h2>
            <button onClick={() => { setShowForm(false); reset() }} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Brief title *</label>
                <input {...register('title')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Freelancer Tax Basics Series" />
                {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Core topic *</label>
                <input {...register('coreTopic')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Self-employment taxes" />
                {errors.coreTopic && <p className="text-xs text-red-600 mt-1">{errors.coreTopic.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target audience *</label>
              <input {...register('targetAudience')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., First-year freelancers in the US" />
              {errors.targetAudience && <p className="text-xs text-red-600 mt-1">{errors.targetAudience.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Audience problem or question *</label>
              <input {...register('audienceProblem')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., I don't know what taxes I owe as a freelancer" />
              {errors.audienceProblem && <p className="text-xs text-red-600 mt-1">{errors.audienceProblem.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content format *</label>
                <select {...register('contentFormat')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option value="">Select format</option>
                  {['long video', 'short video', 'article', 'newsletter', 'carousel', 'podcast', 'live stream', 'course'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                {errors.contentFormat && <p className="text-xs text-red-600 mt-1">{errors.contentFormat.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Platform *</label>
                <select {...register('platform')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option value="">Select platform</option>
                  {MOCK_PLATFORMS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {errors.platform && <p className="text-xs text-red-600 mt-1">{errors.platform.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Proposed title / hook</label>
              <input {...register('proposedTitle')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., The Freelancer's Tax Checklist (Nobody Told You)" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Outline (one item per line)</label>
              <textarea {...register('outline')} rows={4} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Introduction&#10;What taxes freelancers pay&#10;How to calculate self-employment tax&#10;Quarterly estimates explained&#10;Common deductions&#10;Call to action" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Call to action</label>
                <input {...register('callToAction')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Download the free tax checklist" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Monetization pathway</label>
                <input {...register('monetizationPathway')} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Affiliate links to tax software" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
              <textarea {...register('notes')} rows={2} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Additional research notes or reminders" />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" size="sm">Save brief</Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => { setShowForm(false); reset() }}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {briefs.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="font-semibold text-slate-700 mb-1">No content briefs yet</h2>
          <p className="text-sm text-slate-500 mb-4 max-w-sm mx-auto">
            Create a brief to turn a content opportunity into a structured publishing plan with audience, format, outline, and monetization strategy.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Create your first brief
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {briefs.map(brief => (
            <div key={brief.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{brief.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{brief.coreTopic}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Badge variant={brief.status === 'draft' ? 'warning' : 'success'} size="sm">
                    {brief.status}
                  </Badge>
                  <button
                    onClick={() => deleteBrief(brief.id)}
                    className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                    aria-label="Delete brief"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 flex-1">
                <p><span className="font-medium">Audience:</span> {brief.targetAudience}</p>
                <p><span className="font-medium">Platform:</span> {brief.platform}</p>
                <p><span className="font-medium">Format:</span> {brief.contentFormat}</p>
                {brief.proposedTitle && (
                  <p><span className="font-medium">Hook:</span> {brief.proposedTitle}</p>
                )}
                {brief.outline.length > 0 && (
                  <p><span className="font-medium">Outline:</span> {brief.outline.length} sections</p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400">
                  Created {new Date(brief.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
