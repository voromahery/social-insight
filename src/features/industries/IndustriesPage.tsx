import { Briefcase } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'

const INDUSTRIES = [
  { id: 'retail', name: 'Retail', description: 'E-commerce, brick-and-mortar, consumer goods and shopping.', platforms: ['instagram', 'tiktok', 'facebook', 'pinterest'], formats: ['image', 'short video', 'live commerce'] },
  { id: 'education', name: 'Education', description: 'E-learning, tutoring, skills training and academic content.', platforms: ['youtube', 'linkedin', 'tiktok'], formats: ['long video', 'shorts', 'newsletter'] },
  { id: 'finance', name: 'Finance', description: 'Personal finance, investing, banking and financial services.', platforms: ['youtube', 'linkedin', 'x', 'reddit'], formats: ['long video', 'article', 'newsletter'] },
  { id: 'technology', name: 'Technology', description: 'Software, hardware, AI, developer tools and tech news.', platforms: ['youtube', 'linkedin', 'x', 'reddit'], formats: ['long video', 'article', 'newsletter'] },
  { id: 'health', name: 'Health & Wellness', description: 'Fitness, nutrition, mental health and medical content.', platforms: ['instagram', 'tiktok', 'youtube'], formats: ['short video', 'reels', 'long video'] },
  { id: 'beauty', name: 'Beauty & Skincare', description: 'Makeup, skincare, haircare and personal care.', platforms: ['instagram', 'tiktok', 'youtube', 'pinterest'], formats: ['reels', 'short video', 'image'] },
  { id: 'food', name: 'Food & Beverage', description: 'Recipes, restaurants, nutrition and food culture.', platforms: ['instagram', 'tiktok', 'youtube', 'pinterest'], formats: ['short video', 'reels', 'image'] },
  { id: 'travel', name: 'Travel', description: 'Destinations, travel tips, tourism and hospitality.', platforms: ['instagram', 'youtube', 'tiktok', 'pinterest'], formats: ['long video', 'reels', 'image', 'blog'] },
  { id: 'gaming', name: 'Gaming', description: 'Video games, esports, game reviews and streaming.', platforms: ['twitch', 'youtube', 'tiktok', 'discord'], formats: ['live stream', 'long video', 'short video'] },
  { id: 'professional-services', name: 'Professional Services', description: 'Consulting, legal, accounting and B2B services.', platforms: ['linkedin', 'youtube', 'x'], formats: ['article', 'newsletter', 'video'] },
  { id: 'real-estate', name: 'Real Estate', description: 'Property, mortgages, investing and housing market.', platforms: ['instagram', 'youtube', 'facebook', 'linkedin'], formats: ['video tour', 'short video', 'article'] },
  { id: 'creative-services', name: 'Creative Services', description: 'Design, photography, writing, art and creative work.', platforms: ['instagram', 'youtube', 'pinterest', 'tiktok'], formats: ['image', 'timelapse', 'tutorial video'] },
]

export default function IndustriesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Industry Intelligence</h1>
        <p className="text-slate-500 text-sm">
          Explore content opportunities, platform suitability, and audience insights by industry vertical.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INDUSTRIES.map(ind => (
          <div key={ind.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm">{ind.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{ind.description}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-medium text-slate-500 mb-1.5">Top platforms</p>
              <div className="flex flex-wrap gap-1">
                {ind.platforms.map(p => <Badge key={p} variant="info" size="sm">{p}</Badge>)}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-1.5">Content formats</p>
              <div className="flex flex-wrap gap-1">
                {ind.formats.map(f => <Badge key={f} variant="default" size="sm">{f}</Badge>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
