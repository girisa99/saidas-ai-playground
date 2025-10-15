import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTreatmentCentersForMap, searchTreatmentCenters, TreatmentCenter, loadEnhancedCenters } from '@/services/treatmentCenterService';
import { MapPin, Maximize2, Minimize2, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { TreatmentCenterDetails } from './TreatmentCenterDetails';

interface InteractiveTreatmentCenterMapProps {
  filterByType?: string;
  searchQuery?: string;
  therapeuticArea?: string;
  product?: string;
  manufacturer?: string;
  clinicalTrial?: string;
  state?: string;
  city?: string;
}

export const InteractiveTreatmentCenterMap = ({ 
  filterByType, 
  searchQuery, 
  therapeuticArea,
  product,
  manufacturer,
  clinicalTrial,
  state,
  city
}: InteractiveTreatmentCenterMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [centers, setCenters] = useState<TreatmentCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<TreatmentCenter | null>(null);
  const [centerType, setCenterType] = useState<string>(filterByType || 'all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    try {
      return localStorage.getItem('mapbox_token') || '';
    } catch {
      return '';
    }
  });
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Simple localStorage-backed geocode cache
  const getGeocodeCache = (): Record<string, { lat: number; lng: number }> => {
    try {
      return JSON.parse(localStorage.getItem('geocode_cache_v1') || '{}');
    } catch {
      return {};
    }
  };
  
  const setGeocodeCache = (cache: Record<string, { lat: number; lng: number }>) => {
    try {
      localStorage.setItem('geocode_cache_v1', JSON.stringify(cache));
    } catch {}
  };
  
  const geocodeAddress = async (fullAddress: string): Promise<{ lat: number; lng: number } | null> => {
    if (!mapboxToken) return null;
    const cache = getGeocodeCache();
    if (cache[fullAddress]) return cache[fullAddress];
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(fullAddress)}.json?access_token=${mapboxToken}&limit=1`;
      const resp = await fetch(url);
      const json = await resp.json();
      const feature = json?.features?.[0];
      if (feature?.center?.length === 2) {
        const [lng, lat] = feature.center;
        cache[fullAddress] = { lat, lng };
        setGeocodeCache(cache);
        return { lat, lng };
      }
    } catch (e) {
      console.error('Geocoding failed for', fullAddress, e);
    }
    return null;
  };

  const loadCenters = async () => {
    // Prefer DB if available
    let data: TreatmentCenter[] = [];
    if (therapeuticArea || product || manufacturer || clinicalTrial || state || city || searchQuery) {
      data = await searchTreatmentCenters({
        centerType: centerType === 'all' ? undefined : centerType,
        therapeuticArea,
        product,
        manufacturer,
        clinicalTrial,
        state,
        city,
        searchText: searchQuery,
        limit: 500,
      });
    } else {
      data = await getTreatmentCentersForMap(centerType === 'all' ? undefined : centerType);
    }

    // If DB empty, fallback to local CSV and geocode
    if (!data || data.length === 0) {
      try {
        const csvRows = await loadEnhancedCenters();
        const limited = csvRows.slice(0, 200); // cap for performance
        const enriched: TreatmentCenter[] = [];
        for (const row of limited) {
          const name = row.name?.trim();
          const addr = [row.address, row.city, row.state, row.zip_code].filter(Boolean).join(', ');
          const loc = await geocodeAddress(addr);
          if (!loc) continue;
          const typeGuess = /car-t|gene/i.test(String(row.therapeutic_areas)) ? 'gene_therapy' : 'oncology';
          enriched.push({
            id: `${name}-${row.state}-${row.zip_code}`,
            name,
            center_type: typeGuess,
            address: row.address,
            city: row.city,
            state: row.state,
            zip_code: row.zip_code,
            phone: row.phone,
            website: row.website,
            email: row.email,
            key_providers: Array.isArray(row.key_providers) ? row.key_providers : String(row.key_providers || '').split(';').map((s: string) => s.trim()).filter(Boolean),
            therapeutic_areas: Array.isArray(row.therapeutic_areas) ? row.therapeutic_areas : String(row.therapeutic_areas || '').split(',').map((s: string) => s.trim()).filter(Boolean),
            products_drugs: Array.isArray(row.products_drugs) ? row.products_drugs : String(row.products_drugs || '').split(',').map((s: string) => s.trim()).filter(Boolean),
            manufacturers: Array.isArray(row.manufacturers) ? row.manufacturers : String(row.manufacturers || '').split(',').map((s: string) => s.trim()).filter(Boolean),
            clinical_trials: row.clinical_trials,
            trial_sponsors: Array.isArray(row.trial_sponsors) ? row.trial_sponsors : String(row.trial_sponsors || '').split(',').map((s: string) => s.trim()).filter(Boolean),
            capacity_info: row.capacity,
            nci_designated: row.nci_designated,
            fact_accredited: String(row.fact_accredited).toLowerCase().startsWith('y'),
            patient_services: Array.isArray(row.patient_services) ? row.patient_services : String(row.patient_services || '').split(',').map((s: string) => s.trim()).filter(Boolean),
            latitude: loc.lat,
            longitude: loc.lng,
            country: 'USA',
          } as TreatmentCenter);
        }
        data = enriched;
      } catch (e) {
        console.error('Fallback CSV load failed:', e);
      }
    }

    // Apply local type filter if set
    const filtered = centerType === 'all' ? data : data.filter(c => c.center_type === centerType);
    setCenters(filtered);
  };

  // Load treatment centers based on props or state
  useEffect(() => {
    loadCenters();
  }, [centerType, filterByType, therapeuticArea, product, manufacturer, clinicalTrial, state, city, searchQuery]);

  useEffect(() => {
    if (filterByType) {
      setCenterType(filterByType);
    }
  }, [filterByType]);

  // Try to load Mapbox token from database on mount
  useEffect(() => {
    const loadMapboxToken = async () => {
      if (mapboxToken) return; // Already have token from localStorage
      
      try {
        const { data, error } = await supabase
          .from('app_configuration')
          .select('config_value')
          .eq('config_key', 'mapbox_public_token')
          .maybeSingle();
        
        if (data && data.config_value && !error) {
          setMapboxToken(data.config_value);
          // Also save to localStorage for future use
          localStorage.setItem('mapbox_token', data.config_value);
        }
      } catch (err) {
        console.error('Failed to load Mapbox token from database:', err);
      }
    };
    
    loadMapboxToken();
  }, []);
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isMapInitialized) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.5795, 39.8283], // Center of USA
        zoom: 3.5,
        pitch: 0,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.addControl(
        new mapboxgl.FullscreenControl(),
        'top-right'
      );

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
      setIsMapInitialized(false);
    };
  }, [mapboxToken]);

  // Add markers when centers change
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    centers.forEach((center) => {
      if (center.latitude && center.longitude) {
        const markerElement = document.createElement('div');
        markerElement.className = 'treatment-center-marker';
        markerElement.style.width = '30px';
        markerElement.style.height = '30px';
        markerElement.style.borderRadius = '50%';
        markerElement.style.cursor = 'pointer';
        markerElement.style.transition = 'all 0.3s';
        
        // Color code by center type
        const colors: Record<string, string> = {
          gene_therapy: '#8b5cf6',
          bmt: '#ec4899',
          oncology: '#f59e0b',
          general: '#3b82f6'
        };
        markerElement.style.backgroundColor = colors[center.center_type] || '#6b7280';
        markerElement.style.border = '3px solid white';
        markerElement.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

        // Add icon
        markerElement.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" style="width: 18px; height: 18px; margin: 6px;">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `;

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([center.longitude, center.latitude])
          .addTo(map.current!);

        // Add click handler
        markerElement.addEventListener('click', () => {
          setSelectedCenter(center);
          map.current?.flyTo({
            center: [center.longitude!, center.latitude!],
            zoom: 12,
            duration: 1500
          });
        });

        // Hover effect
        markerElement.addEventListener('mouseenter', () => {
          markerElement.style.transform = 'scale(1.2)';
          markerElement.style.zIndex = '1000';
        });
        markerElement.addEventListener('mouseleave', () => {
          markerElement.style.transform = 'scale(1)';
          markerElement.style.zIndex = 'auto';
        });

        markers.current.push(marker);
      }
    });

    // Fit bounds to show all markers
    if (centers.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      centers.forEach(center => {
        if (center.latitude && center.longitude) {
          bounds.extend([center.longitude, center.latitude]);
        }
      });
      
      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 10
        });
      }
    }
  }, [centers, isMapInitialized]);

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Interactive Treatment Center Map
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mapbox Token Input (if not set) */}
          {!mapboxToken && (
            <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
              <p className="text-sm font-medium">Enter Mapbox Access Token</p>
              <p className="text-xs text-muted-foreground">
                Get your free token at{' '}
                <a 
                  href="https://account.mapbox.com/access-tokens/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
              <Input
                type="password"
                placeholder="pk.eyJ1Ijoi..."
                value={mapboxToken}
                onChange={(e) => {
                  const token = e.target.value;
                  setMapboxToken(token);
                  try {
                    localStorage.setItem('mapbox_token', token);
                  } catch (e) {
                    console.error('Failed to save mapbox token', e);
                  }
                }}
              />
            </div>
          )}

          {/* Active Filters Display */}
          {(therapeuticArea || product || manufacturer || clinicalTrial || state || city) && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <Filter className="h-4 w-4" />
                Active Filters:
              </div>
              <div className="flex flex-wrap gap-2">
                {therapeuticArea && (
                  <Badge variant="secondary">Therapeutic: {therapeuticArea}</Badge>
                )}
                {product && (
                  <Badge variant="secondary">Product: {product}</Badge>
                )}
                {manufacturer && (
                  <Badge variant="secondary">Manufacturer: {manufacturer}</Badge>
                )}
                {clinicalTrial && (
                  <Badge variant="secondary">Trial: {clinicalTrial}</Badge>
                )}
                {state && (
                  <Badge variant="secondary">State: {state}</Badge>
                )}
                {city && (
                  <Badge variant="secondary">City: {city}</Badge>
                )}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex items-center gap-4">
            <Select value={centerType} onValueChange={setCenterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="gene_therapy">Gene Therapy</SelectItem>
                <SelectItem value="bmt">BMT / Transplant</SelectItem>
                <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="general">General Healthcare</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{centers.length} centers</span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs">Gene Therapy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-xs">BMT</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-xs">Oncology</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs">General</span>
              </div>
            </div>
          </div>

          {/* Map Container */}
          {mapboxToken ? (
            <div className="relative">
              <div 
                ref={mapContainer} 
                className={`rounded-lg shadow-lg ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[500px]'}`}
              />
            </div>
          ) : (
            <div className="h-[500px] rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground">
              Enter Mapbox token to view interactive map
            </div>
          )}

          {/* Selected Center Details */}
          {selectedCenter && (
            <TreatmentCenterDetails 
              center={selectedCenter} 
              onClose={() => setSelectedCenter(null)} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
