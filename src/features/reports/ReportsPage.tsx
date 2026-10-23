import { FileText, Download, Plus } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { MOCK_OPPORTUNITIES } from '../../mocks/opportunities'
import { exportToCSV, opportunitiesToCSV } from '../../lib/export'

export default function ReportsPage() {
  const handleExportOpportunities = () => {
    exportToCSV(opportunitiesToCSV(MOCK_OPPORTUNITIES), 'social-insight-opportunities')
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Reports</h1>
          <p className="text-slate-500 text-sm">Generate and export research reports with sources and methodology.</p>
        </div>
        <Button className="gap-2" disabled>
          <Plus className="w-4 h-4" /> Generate Report
        </Button>
      </div>

      {/* Quick exports */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <FileText className="w-8 h-8 text-indigo-500 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1 text-sm">Opportunities Export</h3>
          <p className="text-xs text-slate-500 mb-4">All sample content opportunities with scores, evidence confidence, and metadata.</p>
          <Button variant="outline" size="sm" onClick={handleExportOpportunities} className="gap-2 w-full">
            <Download className="w-3.5 h-3.5" /> Download CSV
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 opacity-60">
          <FileText className="w-8 h-8 text-slate-300 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1 text-sm">Platform Comparison</h3>
          <p className="text-xs text-slate-500 mb-4">Side-by-side comparison of platform audiences, formats, and monetization methods.</p>
          <Button variant="outline" size="sm" disabled className="gap-2 w-full">
            Coming soon
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 opacity-60">
          <FileText className="w-8 h-8 text-slate-300 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1 text-sm">Competitor Analysis</h3>
          <p className="text-xs text-slate-500 mb-4">Exportable competitor research with topic coverage and publishing frequency.</p>
          <Button variant="outline" size="sm" disabled className="gap-2 w-full">
            Add competitors first
          </Button>
        </div>
      </div>

      {/* Empty state for saved reports */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <h2 className="font-semibold text-slate-900 mb-4">Saved Reports</h2>
        <div className="text-center py-8">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 mb-2">No reports generated yet.</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Full report generation with sources, methodology, dates, geographic scope, and limitations is planned for the next release. Use the CSV export above to get started.
          </p>
        </div>
      </div>
    </div>
  )
}
