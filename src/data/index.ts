import geographicData from './geographic-markets.json'
import type { GeographicMarket } from '../types'

export const GEOGRAPHIC_MARKETS: GeographicMarket[] = geographicData.countries as GeographicMarket[]

export const GEOGRAPHIC_REGIONS = geographicData.regions

export const GLOBAL_STATS = geographicData.globalStats

export { geographicData }
