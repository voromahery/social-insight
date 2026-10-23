export type DataStatus =
  | 'verified'
  | 'published-estimate'
  | 'user-provided'
  | 'derived'
  | 'illustrative'
  | 'unknown'

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'insufficient'

export interface EvidenceRecord {
  id: string
  sourceName: string
  sourceUrl?: string
  collectionMethod: string
  collectionDate: string
  lastVerified: string
  geographicScope: string
  sampleSize?: number
  limitations: string[]
  metricDefinition: string
  confidence: ConfidenceLevel
  dataStatus: DataStatus
}

export interface Platform {
  id: string
  name: string
  slug: string
  description: string
  iconUrl?: string
  contentFormats: string[]
  industryRelevance: string[]
  monetizationMethods: string[]
  audienceInfo: string
  geographicLimitations: string[]
  officialDocsUrl: string
  sourceQuality: ConfidenceLevel
  verificationDate: string
  monthlyActiveUsers?: string
  primaryDemographic?: string
}

export interface MonetizationMethod {
  id: string
  name: string
  slug: string
  description: string
  revenueMechanism: string
  platforms: string[]
  industries: string[]
  requiredSkills: string[]
  startupRequirements: string
  potentialCosts: string
  eligibilityRestrictions: string[]
  geographicAvailability: string[]
  officialRequirements: string
  evidenceSources: EvidenceRecord[]
  lastVerified: string
  category: 'direct-platform' | 'business-model'
}

export interface Industry {
  id: string
  name: string
  slug: string
  description: string
  subIndustries: string[]
  topPlatforms: string[]
  contentFormats: string[]
  audienceSize: string
  monetizationPotential: ConfidenceLevel
}

export interface AudienceSegment {
  id: string
  name: string
  description: string
  ageGroups?: string[]
  occupations?: string[]
  educationLevels?: string[]
  countries: string[]
  languages: string[]
  industries: string[]
  platforms: string[]
  interests: string[]
}

export interface GeographicMarket {
  id: string
  name: string
  countryCode: string
  region?: string
  city?: string
  lat?: number
  lng?: number
  population?: number
  internetPenetration?: string
  topPlatforms: string[]
  primaryLanguages: string[]
  gdpPerCapita?: string
  dataAvailability: ConfidenceLevel
}

export interface TrendObservation {
  id: string
  topic: string
  platform: string
  market: string
  direction: 'rising' | 'stable' | 'declining' | 'emerging'
  periodStart: string
  periodEnd: string
  changePercent?: number
  absoluteValue?: number
  source: EvidenceRecord
}

export interface OpportunityScore {
  total: number
  demand: number
  trendMomentum: number
  contentScarcity: number
  audienceRelevance: number
  monetizationPotential: number
  includedComponents: string[]
  excludedComponents: string[]
  confidence: ConfidenceLevel
  explanation: string
}

export interface ContentOpportunity {
  id: string
  title: string
  description: string
  platform: string
  market: string
  industry?: string
  topics: string[]
  contentFormats: string[]
  audienceSegments: string[]
  score: OpportunityScore
  trendDirection: TrendObservation['direction']
  evidenceRecords: EvidenceRecord[]
  monetizationPathways: string[]
  competitorCoverage: 'weak' | 'moderate' | 'strong' | 'unknown'
  discoveredAt: string
  lastUpdated: string
  tags: string[]
  mode: 'rising-demand' | 'underserved' | 'audience-questions' | 'market-specific'
}

export interface Competitor {
  id: string
  name: string
  profileUrl: string
  platform: string
  category: string
  description?: string
  addedAt: string
  followerCount?: number
  publishingFrequency?: string
  topTopics: string[]
  contentFormats: string[]
  isPublic: boolean
}

export interface CompetitorContent {
  id: string
  competitorId: string
  title: string
  url: string
  format: string
  topic: string
  publishedAt: string
  engagementEstimate?: string
  notes?: string
}

export interface ContentBrief {
  id: string
  opportunityId?: string
  title: string
  status: 'draft' | 'ready' | 'published' | 'archived'
  targetAudience: string
  audienceProblem: string
  coreTopic: string
  suggestedAngle: string
  contentFormat: string
  platform: string
  geographicContext: string
  languageContext: string
  evidence: string
  competitorExamples: string[]
  differentiationStrategy: string
  proposedTitle: string
  outline: string[]
  callToAction: string
  monetizationPathway: string
  successMetrics: string[]
  limitations: string
  createdAt: string
  updatedAt: string
  notes?: string
}

export type ExperimentStatus =
  | 'proposed'
  | 'researching'
  | 'ready-to-create'
  | 'published'
  | 'measuring'
  | 'completed'
  | 'abandoned'

export interface Experiment {
  id: string
  briefId?: string
  opportunityId?: string
  title: string
  platform: string
  plannedPublishDate?: string
  actualPublishDate?: string
  hypothesis: string
  successMetrics: string[]
  baseline?: Record<string, number>
  actualResults?: Record<string, number>
  status: ExperimentStatus
  lessonsLearned?: string
  createdAt: string
  updatedAt: string
}

export interface SavedInsight {
  id: string
  type: 'opportunity' | 'platform' | 'topic' | 'competitor' | 'market' | 'brief' | 'experiment'
  referenceId: string
  title: string
  notes?: string
  tags: string[]
  savedAt: string
  collectionName?: string
}

export interface Report {
  id: string
  title: string
  description: string
  sections: ReportSection[]
  exportFormat: 'pdf' | 'csv' | 'print'
  geographicScope: string
  dateRange: { start: string; end: string }
  methodology: string
  limitations: string
  createdAt: string
}

export interface ReportSection {
  id: string
  title: string
  content: string
  dataItems: string[]
  sources: EvidenceRecord[]
}

export interface UserPreferences {
  primaryGoal: 'grow-creator' | 'market-business' | 'research-niche' | 'find-markets' | 'manage-client' | 'monetization'
  industries: string[]
  targetAudiences: string[]
  platforms: string[]
  geographicScope: 'global' | 'local'
  country?: string
  region?: string
  primaryLanguage: string
  businessModel?: string
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
  defaultDashboardView: string
  scoreWeights: {
    demand: number
    trendMomentum: number
    contentScarcity: number
    audienceRelevance: number
    monetizationPotential: number
  }
}

export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  preferences: UserPreferences
  createdAt: string
}

export interface FilterState {
  platform?: string
  topic?: string
  industry?: string
  contentFormat?: string
  country?: string
  region?: string
  language?: string
  audienceSegment?: string
  monetizationModel?: string
  dateRange?: { start: string; end: string }
  trendDirection?: TrendObservation['direction']
  competitionLevel?: 'low' | 'medium' | 'high'
  confidenceLevel?: ConfidenceLevel
  mode?: ContentOpportunity['mode']
  minScore?: number
}
