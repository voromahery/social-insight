import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Users, Globe, AlertCircle } from 'lucide-react'
import { MOCK_PLATFORMS } from '../../mocks/platforms'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function PlatformDetailPage() {
  const { platformId } = useParams<{ platformId: string }>()
  const platform = MOCK_PLATFORMS.find(p => p.id === platformId)

  if (!platform) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link to="/platforms" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Platforms
        </Link>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h2 className="font-semibold text-slate-700 mb-1">Platform not found</h2>
          <Link to="/platforms"><Button variant="outline" size="sm">Browse platforms</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link to="/platforms" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4" /> Back to Platforms
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{platform.name}</h1>
            {platform.monthlyActiveUsers && (
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                <Users className="w-4 h-4" />
                <span>{platform.monthlyActiveUsers} monthly active users</span>
              </div>
            )}
          </div>
          <a href={platform.officialDocsUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> Official docs
            </Button>
          </a>
        </div>
        <p className="text-slate-600 leading-relaxed">{platform.description}</p>
        {platform.primaryDemographic && (
          <p className="text-sm text-slate-500 mt-3">
            <span className="font-medium">Primary demographic:</span> {platform.primaryDemographic}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader><h2 className="font-semibold text-slate-900 text-sm">Content Formats</h2></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {platform.contentFormats.map(f => <Badge key={f} variant="info" size="sm">{f}</Badge>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h2 className="font-semibold text-slate-900 text-sm">Industry Relevance</h2></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {platform.industryRelevance.map(i => <Badge key={i} variant="default" size="sm">{i}</Badge>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h2 className="font-semibold text-slate-900 text-sm">Monetization Methods</h2></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {platform.monetizationMethods.map(m => <Badge key={m} variant="success" size="sm">{m.replace(/-/g, ' ')}</Badge>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slate-400" /> Geographic Limitations
            </h2>
          </CardHeader>
          <CardContent>
            {platform.geographicLimitations.length === 0 ? (
              <p className="text-sm text-slate-500">No documented restrictions.</p>
            ) : (
              <ul className="space-y-1">
                {platform.geographicLimitations.map(l => (
                  <li key={l} className="text-sm text-slate-600 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" /> {l}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
        <p className="text-xs text-slate-500">
          <span className="font-medium">Audience information:</span> {platform.audienceInfo}
        </p>
        <p className="text-xs text-slate-400 mt-2">Verified: {platform.verificationDate} · Source quality: {platform.sourceQuality}</p>
      </div>
    </div>
  )
}
