import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock leaflet for tests
vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(),
    tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
    marker: vi.fn(() => ({ addTo: vi.fn(), bindPopup: vi.fn() })),
    icon: vi.fn(),
    divIcon: vi.fn(),
    latLng: vi.fn(),
    latLngBounds: vi.fn(),
  },
}))

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => children,
  TileLayer: () => null,
  Marker: () => null,
  Popup: ({ children }: { children: React.ReactNode }) => children,
  useMap: vi.fn(),
  GeoJSON: () => null,
  LayerGroup: ({ children }: { children: React.ReactNode }) => children,
  CircleMarker: () => null,
  Tooltip: ({ children }: { children: React.ReactNode }) => children,
}))
