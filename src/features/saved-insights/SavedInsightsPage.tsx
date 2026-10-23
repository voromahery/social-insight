import { useState } from 'react'
import { Bookmark, Download, X, Search } from 'lucide-react'
import type { SavedInsight } from '../../types'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { exportToCSV, savedInsightsToCSV } from '../../lib/export'

export default function SavedInsightsPage() {
  const [items, setItems] = useState<SavedInsight[]>(() => {
    try { return JSON.parse(localStorage.getItem('social-insight-saved') ?? '[]') as SavedInsight[] }
    catch { return [] }
  })
  const [search, setSearch] = useState('')

  const filtered = items.filter(i =>
    !search ||
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  const remove = (id: string) => {
    const updated = items.filter(i => i.id !== id)
    setItems(updated)
    try { localStorage.setItem('social-insight-saved', JSON.stringify(updated)) } catch {}
  }

  const handleExport = () => {
    exportToCSV(savedInsightsToCSV(filtered), 'social-insight-saved-research')
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Saved Insights</h1>
          <p className="text-slate-500 text-sm">Your saved opportunities, platforms, and research items.</p>
        </div>
        {items.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        )}
      </div>

      {items.length > 0 && (
        <div className="mb-4 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search saved items…"
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="font-semibold text-slate-700 mb-1">
            {items.length === 0 ? 'No saved insights yet' : 'No results match your search'}
          </h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {items.length === 0
              ? 'Save opportunities, platforms, and topics from throughout the app to find them quickly here.'
              : 'Try adjusting your search terms.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3">
              <Bookmark className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-900 text-sm">{item.title}</h3>
                  <Badge variant="info" size="sm">{item.type}</Badge>
                </div>
                {item.notes && <p className="text-xs text-slate-500 mb-1">{item.notes}</p>}
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tags.map(t => <Badge key={t} variant="outline" size="sm">{t}</Badge>)}
                </div>
                <p className="text-xs text-slate-400 mt-1">Saved {new Date(item.savedAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => remove(item.id)} className="text-slate-300 hover:text-red-500 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
