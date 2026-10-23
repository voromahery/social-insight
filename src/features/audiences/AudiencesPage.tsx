import { Users, AlertCircle } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'

const SEGMENTS = [
  { id: 'gen-z', name: 'Gen Z (18–26)', description: 'Digital natives, short-form video consumers, value-driven, creator-economy participants.', platforms: ['tiktok', 'instagram', 'youtube', 'discord'], languages: ['en'], interests: ['gaming', 'sustainability', 'mental health', 'creator economy', 'social justice'] },
  { id: 'millennials', name: 'Millennials (27–42)', description: 'Career-focused, home buyers, parents, strong purchasing power. Mix of long-form and short-form content.', platforms: ['instagram', 'youtube', 'linkedin', 'facebook'], languages: ['en'], interests: ['personal finance', 'parenting', 'career development', 'home', 'travel'] },
  { id: 'gen-x', name: 'Gen X (43–58)', description: 'High earners, brand loyal, prefer longer content, strong on Facebook and YouTube.', platforms: ['facebook', 'youtube', 'linkedin'], languages: ['en'], interests: ['investing', 'retirement', 'health', 'family', 'home improvement'] },
  { id: 'small-biz', name: 'Small Business Owners', description: 'Self-employed individuals and SMB owners seeking practical tools, marketing, and growth advice.', platforms: ['linkedin', 'facebook', 'youtube'], languages: ['en'], interests: ['marketing', 'tools', 'accounting', 'hiring', 'growth'] },
  { id: 'freelancers', name: 'Freelancers & Independent Workers', description: 'Independent contractors across creative, tech, and professional service categories.', platforms: ['linkedin', 'youtube', 'x', 'instagram'], languages: ['en'], interests: ['productivity', 'tax', 'client acquisition', 'remote work', 'portfolio'] },
  { id: 'students', name: 'Students (16–24)', description: 'University and secondary students seeking career guidance, study resources, and life skills.', platforms: ['tiktok', 'youtube', 'instagram', 'reddit'], languages: ['en'], interests: ['study tips', 'career planning', 'student finance', 'mental health', 'scholarships'] },
  { id: 'parents', name: 'Parents', description: 'Parents of young children and teenagers, interested in education, products, and family wellbeing.', platforms: ['facebook', 'instagram', 'pinterest', 'youtube'], languages: ['en'], interests: ['parenting', 'education', 'activities', 'family products', 'childcare'] },
  { id: 'creators', name: 'Content Creators', description: 'Individuals building an audience and monetizing content across platforms.', platforms: ['youtube', 'tiktok', 'instagram', 'x'], languages: ['en'], interests: ['content strategy', 'monetization', 'growth', 'editing tools', 'analytics'] },
]

export default function AudiencesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Audience Intelligence</h1>
        <p className="text-slate-500 text-sm">
          Understand audience segments, their platform preferences, and content interests.
        </p>
      </div>

      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Aggregate data only.</span>{' '}
          All audience information uses published aggregate research and does not infer individual users' personal attributes. Age groups are approximations based on available public reports.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SEGMENTS.map(seg => (
          <div key={seg.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-200 hover:shadow-md transition-all flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm">{seg.name}</h2>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">{seg.description}</p>

            <div className="mb-3">
              <p className="text-xs font-medium text-slate-500 mb-1.5">Active on</p>
              <div className="flex flex-wrap gap-1">
                {seg.platforms.map(p => <Badge key={p} variant="info" size="sm">{p}</Badge>)}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-1.5">Key interests</p>
              <div className="flex flex-wrap gap-1">
                {seg.interests.slice(0, 4).map(i => <Badge key={i} variant="outline" size="sm">{i}</Badge>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
