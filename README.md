# Social Insight

**Discover the opportunities others overlook.**

Social Insight is an opportunity intelligence platform that helps businesses, marketers, agencies, and content creators find underserved content niches, understand their market, evaluate competitors, and turn evidence-backed opportunities into actionable content and business strategies.

## What It Does

Unlike conventional analytics dashboards, Social Insight answers:

- **What should I create next?** — Ranked content opportunities with transparent scoring
- **Where is there unmet demand?** — Topics with audience interest but weak content coverage
- **What are competitors missing?** — Gap analysis across platforms and formats
- **Where in the world is this relevant?** — Local and global geographic filters with Leaflet maps
- **How can I monetize this?** — Structured monetization catalog with requirements and pathways
- **What evidence supports this?** — Every insight links to sources, methodology, and limitations

## Tech Stack

| Area | Technology |
|------|-----------|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Data fetching | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Maps | Leaflet + React Leaflet |
| Icons | Lucide React |
| Utilities | Lodash, date-fns, clsx |
| Testing | Vitest + React Testing Library |
| PWA | vite-plugin-pwa |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/              # Router, layout, landing page
├── components/
│   ├── charts/       # Recharts wrappers
│   ├── maps/         # Leaflet map components
│   └── ui/           # Reusable UI components
├── features/
│   ├── auth/         # Login, register, onboarding
│   ├── content-gaps/ # Content Gap Explorer (flagship)
│   ├── platforms/    # Platform directory
│   ├── monetization/ # Monetization explorer
│   ├── competitors/  # Competitor research
│   ├── geographic-insights/ # Map-based market discovery
│   ├── content-lab/  # Brief builder
│   ├── experiments/  # Hypothesis tracking
│   ├── saved-insights/ # Saved research
│   └── reports/      # Report generation
├── lib/
│   ├── scoring.ts    # Opportunity scoring engine
│   ├── export.ts     # CSV export utilities
│   └── cn.ts         # Tailwind class merging
├── mocks/            # Structured sample data
├── queries/          # TanStack Query hooks
├── schemas/          # Zod validation schemas
├── services/         # Service layer
├── test/             # Test setup
└── types/            # TypeScript domain types
```

## Core Features

### Content Gap Explorer
The flagship feature. Discover opportunities across four modes:
- **Rising Demand** — Topics with measured growth in audience interest
- **Underserved Topics** — High demand + low content coverage
- **Audience Questions** — Recurring unmet information needs
- **Market-Specific Gaps** — Opportunities in specific geographic markets

### Transparent Opportunity Scoring
Every opportunity is scored 0–100 using a configurable formula:
```
Score = 0.30×Demand + 0.20×Trend + 0.20×Scarcity + 0.15×Relevance + 0.15×Monetization
```
Missing inputs are excluded with renormalized weights — never silently zeroed.

### Evidence System
Every insight shows source name, URL, collection method, date, geographic scope, sample size, limitations, and confidence level. Data status labels (Verified / Published estimate / Illustrative) are shown on every card.

### Geographic Intelligence
Interactive Leaflet maps with pan, zoom, marker clustering, choropleth overlays, and accessible table alternatives. Global and local scope controls. Does not require geolocation permissions.

### Monetization Catalog
12+ monetization methods with requirements, eligibility, geographic availability, and platform compatibility. Separates direct platform monetization from business models.

## Data Notice

The initial release uses structured sample data clearly labeled as illustrative. The architecture is designed for future integration with official platform APIs, licensed market research, and user-provided data. No data is fabricated as verified market research.

## License

Private — all rights reserved.
