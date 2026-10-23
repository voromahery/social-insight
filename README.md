# Social Insight

> Opportunity intelligence platform for content creators and marketers. Discover underserved content niches, track platform trends, and find monetization paths — backed by real public data.

**Copyright © 2025 H. Daniel Fabrice. All rights reserved.**

---

## Data Sources

All platform statistics used in this application are sourced from the following **publicly available** reports and sites. Data is loaded at app startup and labelled clearly as reference data throughout the UI.

### Primary Source

| Source | URL | Data provided |
|--------|-----|---------------|
| **DataReportal — Digital 2025 Global Overview** | https://datareportal.com/reports/digital-2025-global-overview-report | Global social media user counts, ad reach, engagement, demographics |
| **DataReportal — Top Social Platforms 2025** | https://datareportal.com/reports/digital-2025-sub-section-top-social-platforms | Per-platform MAU, ad reach, time-spent, favourite-platform rankings |
| **DataReportal — Social Media Users** | https://datareportal.com/social-media-users | Aggregate social media user totals, platform penetration rates |
| **DataReportal — State of Social 2025** | https://datareportal.com/reports/digital-2025-sub-section-state-of-social | Usage motivations, following behaviour, content publishing patterns |

### Platform-Specific Sources

| Source | URL | Data provided |
|--------|-----|---------------|
| **DataReportal — X (Twitter) Stats** | https://datareportal.com/essential-x-stats | X ad reach, user trends |
| **DataReportal — LinkedIn Stats** | https://datareportal.com/essential-linkedin-stats | LinkedIn registered members, estimated MAU |
| **DataReportal — Pinterest Stats** | https://datareportal.com/essential-pinterest-stats | Pinterest MAU (from earnings), ad reach |
| **Backlinko — Twitch Statistics** | https://backlinko.com/twitch-users | Twitch monthly unique visitors, DAU, demographics |
| **DemandSage — Discord Statistics** | https://demandsage.com/discord-statistics/ | Discord official MAU, registered users |

### Key Figures Used (as of DataReportal Digital 2025, published Feb 2025)

| Platform | Metric | Value | Source |
|----------|--------|-------|--------|
| YouTube | Ad reach | 2.53 billion | DataReportal / Google |
| Facebook | Ad reach | 2.28 billion | DataReportal / Meta |
| Instagram | Ad reach (18+) | 1.67 billion | DataReportal / Meta |
| TikTok | Ad reach (18+) | 1.59 billion | DataReportal / ByteDance |
| LinkedIn | Est. MAU | ~350 million | DataReportal (third-party est.) |
| Pinterest | MAU | 537 million | Pinterest Q3 2024 earnings |
| X (Twitter) | Ad reach | 586 million | DataReportal / X |
| Reddit | Unique visitors/mo | ~700 million | DataReportal / Reddit |
| Telegram | MAU | 1 billion+ | Founder statement, Mar 2025 |
| Discord | MAU | 200 million+ | Discord official, 2025 |
| Twitch | Monthly unique visitors | ~240 million | Backlinko / Semrush |

> **Note:** Ad reach figures are not the same as monthly active users. Platforms define and report metrics differently. All figures are used here as reference data for illustrative purposes and may not reflect current real-world values. DataReportal's own reports include detailed caveats on comparability.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS v4
- **Charts:** Recharts
- **Routing:** React Router v7
- **Maps:** React Leaflet + OpenStreetMap
- **Forms:** React Hook Form + Zod
- **State / Data fetching:** TanStack Query
- **PWA:** vite-plugin-pwa
- **Testing:** Vitest + Testing Library

## Getting Started

```bash
npm install
npm run dev       # development server
npm run build     # production build
npm run test      # run tests
npm run typecheck # type-check only
```

## Project Status

This is an MVP with illustrative sample data. Real API integrations are planned. See the [open issues](https://github.com/voromahery/social-insight/issues) for the roadmap.

---

*Data sourced from public reports. Platform statistics are reference figures and should not be used for commercial or investment decisions without independent verification.*
