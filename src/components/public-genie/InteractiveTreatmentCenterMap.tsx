import { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getTreatmentCentersForMap, searchTreatmentCenters, TreatmentCenter, loadEnhancedCenters } from '@/services/treatmentCenterService';
import { MapPin, Maximize2, Minimize2, Filter, X, DollarSign, Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { TreatmentCenterDetails } from './TreatmentCenterDetails';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Countries for dropdown
const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'AU', name: 'Australia' },
  { code: 'JP', name: 'Japan' },
  { code: 'OTHER', name: 'Other' },
];

// US States for dropdown
const US_STATES = [
  { code: '', name: 'All States' },
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }, { code: 'DC', name: 'Washington DC' }
];

// Canadian Provinces
const CA_PROVINCES = [
  { code: '', name: 'All Provinces' },
  { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' }, { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' }, { code: 'NL', name: 'Newfoundland' }, { code: 'NS', name: 'Nova Scotia' },
  { code: 'ON', name: 'Ontario' }, { code: 'PE', name: 'Prince Edward Island' }, { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' }, { code: 'NT', name: 'Northwest Territories' }, { code: 'NU', name: 'Nunavut' },
  { code: 'YT', name: 'Yukon' }
];

interface InteractiveTreatmentCenterMapProps {
  filterByType?: string;
  searchQuery?: string;
  therapeuticArea?: string;
  product?: string;
  manufacturer?: string;
  clinicalTrial?: string;
  state?: string;
  city?: string;
  zipCode?: string;
}

export const InteractiveTreatmentCenterMap = ({ 
  filterByType, 
  searchQuery, 
  therapeuticArea,
  product,
  manufacturer,
  clinicalTrial,
  state,
  city,
  zipCode
}: InteractiveTreatmentCenterMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<(mapboxgl.Marker & { clusterId?: number })[]>([]);
  const [allCenters, setAllCenters] = useState<TreatmentCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<TreatmentCenter | null>(null);
  const [selectedTherapeuticAreas, setSelectedTherapeuticAreas] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [selectedState, setSelectedState] = useState<string>(state || '');
  const [userZipCode, setUserZipCode] = useState<string>(zipCode || '');
  const [maxResults, setMaxResults] = useState<number>(50);
  const [filterSearch, setFilterSearch] = useState({ area: '', mfg: '', product: '' });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    try {
      return localStorage.getItem('mapbox_token') || '';
    } catch {
      return '';
    }
  });
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [clusterZoomLevel, setClusterZoomLevel] = useState(3.5);
  const [userZipCoords, setUserZipCoords] = useState<{lat: number; lng: number} | null>(null);
  
  // Get states/provinces based on selected country
  const getRegions = () => {
    if (selectedCountry === 'US') return US_STATES;
    if (selectedCountry === 'CA') return CA_PROVINCES;
    return [];
  };
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

  // Geocode user's zip code when search is triggered
  const handleZipSearch = async () => {
    if (!userZipCode || !mapboxToken) return;
    const coords = await geocodeAddress(userZipCode);
    if (coords) {
      setUserZipCoords(coords);
      console.log(`📍 User zip ${userZipCode} geocoded to:`, coords);
      // Fly to user's location
      map.current?.flyTo({
        center: [coords.lng, coords.lat],
        zoom: 8,
        duration: 1500
      });
    }
  };

  // Helper: calculate distance in miles between two lat/lng points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959; // Earth radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Load centers from database only - no CSV fallback to prevent duplicates
  const loadCenters = async () => {
    let data: TreatmentCenter[] = [];
    
    // Fetch from database only (showing exactly 157 centers, no duplicates)
    if (therapeuticArea || product || manufacturer || clinicalTrial || state || city || searchQuery) {
      data = await searchTreatmentCenters({
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
      data = await getTreatmentCentersForMap(filterByType);
    }
    
    console.log(`Loaded ${data.length} treatment centers from database`);
    setAllCenters(data);
  };

  // Extract unique values for filters
  const { therapeuticAreas, manufacturers, products } = useMemo(() => {
    const areas = new Set<string>();
    const mfgs = new Set<string>();
    const prods = new Set<string>();
    
    allCenters.forEach(center => {
      center.therapeutic_areas?.forEach(area => areas.add(area));
      center.manufacturers?.forEach(mfg => mfgs.add(mfg));
      center.products_drugs?.forEach(prod => prods.add(prod));
    });
    
    return {
      therapeuticAreas: Array.from(areas).sort(),
      manufacturers: Array.from(mfgs).sort(),
      products: Array.from(prods).sort(),
    };
  }, [allCenters]);

  // Filter centers based on selections (including props + UI selections) with distance sorting
  const filteredCenters = useMemo(() => {
    // Use UI state if set, otherwise fall back to props
    const activeState = selectedState || state || '';
    
    // Merge explicit props with user-selected filters so props act as defaults
    const requiredAreas = selectedTherapeuticAreas.length > 0 
      ? selectedTherapeuticAreas 
      : (therapeuticArea ? [therapeuticArea] : []);
    const requiredMfgs = selectedManufacturers.length > 0 
      ? selectedManufacturers 
      : (manufacturer ? [manufacturer] : []);
    const requiredProds = selectedProducts.length > 0 
      ? selectedProducts 
      : (product ? [product] : []);

    // First filter by product/therapy/manufacturer
    const base = allCenters.filter(center => {
      if (requiredAreas.length > 0) {
        const hasMatch = center.therapeutic_areas?.some(area => requiredAreas.includes(area));
        if (!hasMatch) return false;
      }
      if (requiredMfgs.length > 0) {
        const hasMatch = center.manufacturers?.some(mfg => requiredMfgs.includes(mfg));
        if (!hasMatch) return false;
      }
      if (requiredProds.length > 0) {
        const hasMatch = center.products_drugs?.some(prod => requiredProds.includes(prod));
        if (!hasMatch) return false;
      }
      return true;
    });

    // Then apply location filter if provided
    const matchState = (centerState?: string) => {
      if (!activeState) return true;
      const cs = (centerState || '').trim().toUpperCase();
      const desired = activeState.toUpperCase();
      return cs === desired || cs.startsWith(desired);
    };

    const matchCity = (centerCity?: string) => {
      if (!city) return true;
      return (centerCity || '').toLowerCase().includes(city.trim().toLowerCase());
    };

    let byLocation = base.filter(c => matchState(c.state) && matchCity(c.city));

    // Final fallback: if nothing after location filters, return product/therapy-only set
    const finalSet = byLocation.length > 0 ? byLocation : (activeState ? [] : base);

    // Sort by distance if zip code coordinates available
    if (userZipCoords && finalSet.length > 0) {
      return finalSet
        .map(c => ({
          ...c,
          distance: (c.latitude && c.longitude) 
            ? calculateDistance(userZipCoords.lat, userZipCoords.lng, c.latitude, c.longitude)
            : 999999
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxResults);
    }

    // Apply max results limit
    return finalSet.slice(0, maxResults);
  }, [allCenters, selectedTherapeuticAreas, selectedManufacturers, selectedProducts, therapeuticArea, product, manufacturer, selectedState, state, city, userZipCoords, maxResults]);

  // Load treatment centers on mount
  useEffect(() => {
    loadCenters();
  }, [therapeuticArea, product, manufacturer, clinicalTrial, state, city, searchQuery, zipCode]);

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

  // Create marker clusters based on zoom level
  const createClusters = (centers: TreatmentCenter[], zoom: number) => {
    if (zoom >= 8) return centers.map(c => ({ centers: [c], lat: c.latitude!, lng: c.longitude! }));
    
    const clusters: Array<{ centers: TreatmentCenter[]; lat: number; lng: number }> = [];
    const gridSize = zoom < 5 ? 5 : 2; // degrees
    const grid = new Map<string, TreatmentCenter[]>();
    
    centers.forEach(center => {
      if (!center.latitude || !center.longitude) return;
      const latKey = Math.floor(center.latitude / gridSize);
      const lngKey = Math.floor(center.longitude / gridSize);
      const key = `${latKey},${lngKey}`;
      
      if (!grid.has(key)) grid.set(key, []);
      grid.get(key)!.push(center);
    });
    
    grid.forEach(clusterCenters => {
      const avgLat = clusterCenters.reduce((sum, c) => sum + (c.latitude || 0), 0) / clusterCenters.length;
      const avgLng = clusterCenters.reduce((sum, c) => sum + (c.longitude || 0), 0) / clusterCenters.length;
      clusters.push({ centers: clusterCenters, lat: avgLat, lng: avgLng });
    });
    
    return clusters;
  };

  // Add markers with clustering
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    const zoom = map.current.getZoom() || 3.5;
    const clusters = createClusters(filteredCenters, zoom);

    clusters.forEach((cluster) => {
      const isCluster = cluster.centers.length > 1;
      const markerElement = document.createElement('div');
      markerElement.className = 'treatment-center-marker';
      markerElement.style.cursor = 'pointer';
      markerElement.style.transition = 'all 0.3s';
      
      if (isCluster) {
        // Cluster marker
        const size = Math.min(50, 30 + cluster.centers.length * 2);
        markerElement.style.width = `${size}px`;
        markerElement.style.height = `${size}px`;
        markerElement.style.borderRadius = '50%';
        markerElement.style.backgroundColor = '#3b82f6';
        markerElement.style.border = '3px solid white';
        markerElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
        markerElement.style.display = 'flex';
        markerElement.style.alignItems = 'center';
        markerElement.style.justifyContent = 'center';
        markerElement.style.fontWeight = 'bold';
        markerElement.style.color = 'white';
        markerElement.style.fontSize = '14px';
        markerElement.textContent = cluster.centers.length.toString();
      } else {
        // Single marker - color by therapeutic area
        markerElement.style.width = '32px';
        markerElement.style.height = '32px';
        markerElement.style.borderRadius = '50%';
        
        const center = cluster.centers[0];
        const primaryArea = center.therapeutic_areas?.[0] || '';
        const colorMap: Record<string, string> = {
          'CAR-T': '#8b5cf6',
          'Gene Therapy': '#a855f7',
          'Cell Therapy': '#c026d3',
          'Oncology': '#f59e0b',
          'Hematology': '#ef4444',
          'BMT': '#ec4899',
        };
        const color = Object.keys(colorMap).find(key => primaryArea.includes(key)) 
          ? colorMap[Object.keys(colorMap).find(key => primaryArea.includes(key))!]
          : '#6b7280';
        
        markerElement.style.backgroundColor = color;
        markerElement.style.border = '3px solid white';
        markerElement.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
        markerElement.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" style="width: 20px; height: 20px; margin: 6px;">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `;
      }

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([cluster.lng, cluster.lat]);
      
      // Only add to map if it exists
      if (map.current) {
        marker.addTo(map.current);
      }

      markerElement.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isCluster) {
          // Zoom in to show individual centers in the cluster
          const currentZoom = map.current?.getZoom() || 3.5;
          const newZoom = Math.min(currentZoom + 3, 15);
          map.current?.flyTo({
            center: [cluster.lng, cluster.lat],
            zoom: newZoom,
            duration: 1200,
            essential: true
          });
        } else {
          setSelectedCenter(cluster.centers[0]);
          map.current?.flyTo({
            center: [cluster.lng, cluster.lat],
            zoom: 12,
            duration: 1500,
            essential: true
          });
        }
      });

      // Hover effects removed to prevent marker drift on some browsers


      markers.current.push(marker as any);
    });
  }, [filteredCenters, isMapInitialized]);

  // Fit bounds only when filtered centers change (not on zoom)
  useEffect(() => {
    if (!map.current || !isMapInitialized || filteredCenters.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    filteredCenters.forEach(center => {
      if (center.latitude && center.longitude) {
        bounds.extend([center.longitude, center.latitude]);
      }
    });
    
    if (!bounds.isEmpty()) {
      map.current.fitBounds(bounds, {
        padding: 80,
        maxZoom: 10,
        duration: 1000
      });
    }
  }, [filteredCenters, isMapInitialized]);

  // Update clusters on zoom - use callback ref to avoid infinite loop
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;
    
    const handleZoom = () => {
      // Re-render markers at new zoom level without changing state
      if (!map.current) return;
      
      const zoom = map.current.getZoom() || 3.5;
      
      // Clear and recreate markers based on zoom
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      
      const clusters = createClusters(filteredCenters, zoom);
      
      clusters.forEach((cluster) => {
        const isCluster = cluster.centers.length > 1;
        const markerElement = document.createElement('div');
        markerElement.className = 'treatment-center-marker';
        markerElement.style.cursor = 'pointer';
        markerElement.style.transition = 'all 0.3s';
        
        if (isCluster) {
          const size = Math.min(50, 30 + cluster.centers.length * 2);
          markerElement.style.width = `${size}px`;
          markerElement.style.height = `${size}px`;
          markerElement.style.borderRadius = '50%';
          markerElement.style.backgroundColor = '#3b82f6';
          markerElement.style.border = '3px solid white';
          markerElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
          markerElement.style.display = 'flex';
          markerElement.style.alignItems = 'center';
          markerElement.style.justifyContent = 'center';
          markerElement.style.fontWeight = 'bold';
          markerElement.style.color = 'white';
          markerElement.style.fontSize = '14px';
          markerElement.textContent = cluster.centers.length.toString();
        } else {
          markerElement.style.width = '32px';
          markerElement.style.height = '32px';
          markerElement.style.borderRadius = '50%';
          
          const center = cluster.centers[0];
          const primaryArea = center.therapeutic_areas?.[0] || '';
          const colorMap: Record<string, string> = {
            'CAR-T': '#8b5cf6',
            'Gene Therapy': '#a855f7',
            'Cell Therapy': '#c026d3',
            'Oncology': '#f59e0b',
            'Hematology': '#ef4444',
            'BMT': '#ec4899',
          };
          const color = Object.keys(colorMap).find(key => primaryArea.includes(key)) 
            ? colorMap[Object.keys(colorMap).find(key => primaryArea.includes(key))!]
            : '#6b7280';
          
          markerElement.style.backgroundColor = color;
          markerElement.style.border = '3px solid white';
          markerElement.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
          markerElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" style="width: 20px; height: 20px; margin: 6px;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          `;
        }

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([cluster.lng, cluster.lat]);
        
        if (map.current) {
          marker.addTo(map.current);
        }

        markerElement.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isCluster) {
            const currentZoom = map.current?.getZoom() || 3.5;
            const newZoom = Math.min(currentZoom + 3, 15);
            map.current?.flyTo({
              center: [cluster.lng, cluster.lat],
              zoom: newZoom,
              duration: 1200,
              essential: true
            });
          } else {
            setSelectedCenter(cluster.centers[0]);
            map.current?.flyTo({
              center: [cluster.lng, cluster.lat],
              zoom: 12,
              duration: 1500,
              essential: true
            });
          }
        });

        // Hover effects removed to prevent marker drift on some browsers


        markers.current.push(marker as any);
      });
    };
    
    map.current.on('zoom', handleZoom);
    map.current.on('zoomend', handleZoom);
    
    return () => {
      map.current?.off('zoom', handleZoom);
      map.current?.off('zoomend', handleZoom);
    };
  }, [isMapInitialized, filteredCenters]);

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Treatment Centers 
              {(selectedState || state) && ` in ${US_STATES.find(s => s.code === (selectedState || state))?.name || selectedState || state}`}
              {city && ` - ${city}`}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Disclaimer Banner */}
          {filteredCenters.length > 0 && (
            <div className="mt-3 p-4 bg-warning/10 border-l-4 border-warning rounded-md">
              <p className="text-sm text-warning-foreground font-medium mb-1">
                ⚠️ Experimental Data - Verification Required
              </p>
              <p className="text-xs text-muted-foreground">
                This information is for educational purposes. Treatment center data may not be current. 
                {product && ` Contact the ${product} manufacturer or`} your healthcare provider to verify 
                locations, availability, and enrollment criteria for {product || therapeuticArea || 'treatment'}.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Showing {filteredCenters.length} of {allCenters.length} locations
                {(selectedState || state) && ` in ${US_STATES.find(s => s.code === (selectedState || state))?.name || selectedState || state}`}
                {userZipCoords && userZipCode && ` (sorted by distance from ${userZipCode})`}
              </p>
            </div>
          )}
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
          {(therapeuticArea || product || manufacturer || clinicalTrial || selectedState || city) && (
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <Filter className="h-4 w-4 text-primary" />
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
                {selectedCountry && (
                  <Badge variant="secondary" className="gap-1">
                    Country: {COUNTRIES.find(c => c.code === selectedCountry)?.name || selectedCountry}
                  </Badge>
                )}
                {selectedState && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCountry === 'CA' ? 'Province' : 'State'}: {getRegions().find(s => s.code === selectedState)?.name || selectedState}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedState('')} />
                  </Badge>
                )}
                {city && (
                  <Badge variant="secondary">City: {city}</Badge>
                )}
              </div>
            </div>
          )}

          {/* Step 1: Location Search */}
          <div className="p-4 bg-muted/30 rounded-lg border space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Step 1: Select Location
              </Label>
              <Badge variant="outline" className="text-xs">Required</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Country Dropdown */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Country</Label>
                <Select value={selectedCountry} onValueChange={(v) => { setSelectedCountry(v); setSelectedState(''); }}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {COUNTRIES.map(c => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* State/Province Dropdown - only show for US/CA */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  {selectedCountry === 'CA' ? 'Province' : 'State/Region'}
                </Label>
                <Select 
                  value={selectedState} 
                  onValueChange={setSelectedState}
                  disabled={!['US', 'CA'].includes(selectedCountry)}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={`Select ${selectedCountry === 'CA' ? 'province' : 'state'}`} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-background z-50">
                    {getRegions().map(s => (
                      <SelectItem key={s.code || 'all'} value={s.code || 'all'}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Zip/Postal Code Search */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  {selectedCountry === 'US' ? 'Zip Code' : 'Postal Code'} (for distance)
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder={selectedCountry === 'US' ? 'e.g., 10001' : 'Postal code'}
                    value={userZipCode}
                    onChange={(e) => setUserZipCode(e.target.value)}
                    className="bg-background"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleZipSearch}
                    disabled={!userZipCode || !mapboxToken}
                    className="shrink-0"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Results Limit */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Max Results</Label>
                <Select value={maxResults.toString()} onValueChange={(v) => setMaxResults(parseInt(v))}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="25">25 centers</SelectItem>
                    <SelectItem value="50">50 centers</SelectItem>
                    <SelectItem value="100">100 centers</SelectItem>
                    <SelectItem value="200">200 centers</SelectItem>
                    <SelectItem value="500">All centers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Step 2: Treatment Filters */}
          <div className="p-4 bg-muted/30 rounded-lg border space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-semibold flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                Step 2: Filter by Treatment
              </Label>
              <Badge variant="outline" className="text-xs">Optional</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Therapeutic Areas Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-background">
                  <span className="truncate">
                    {selectedTherapeuticAreas.length > 0 
                      ? `${selectedTherapeuticAreas.length} Therapeutic Area${selectedTherapeuticAreas.length > 1 ? 's' : ''}`
                      : 'Therapeutic Areas'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-background z-50" align="start">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Therapeutic Areas</Label>
                    {selectedTherapeuticAreas.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedTherapeuticAreas([])}
                        className="h-6 px-2 text-xs"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Search areas..."
                    value={filterSearch.area}
                    onChange={(e) => setFilterSearch(prev => ({ ...prev, area: e.target.value }))}
                    className="h-8"
                  />
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {therapeuticAreas
                      .filter(area => area.toLowerCase().includes(filterSearch.area.toLowerCase()))
                      .map(area => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox
                            id={`area-${area}`}
                            checked={selectedTherapeuticAreas.includes(area)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTherapeuticAreas([...selectedTherapeuticAreas, area]);
                              } else {
                                setSelectedTherapeuticAreas(selectedTherapeuticAreas.filter(a => a !== area));
                              }
                            }}
                          />
                          <label htmlFor={`area-${area}`} className="text-sm cursor-pointer flex-1">
                            {area}
                          </label>
                        </div>
                      ))}
                    {therapeuticAreas.filter(area => area.toLowerCase().includes(filterSearch.area.toLowerCase())).length === 0 && (
                      <p className="text-sm text-muted-foreground py-2">No matching areas</p>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Manufacturers Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-background">
                  <span className="truncate">
                    {selectedManufacturers.length > 0 
                      ? `${selectedManufacturers.length} Manufacturer${selectedManufacturers.length > 1 ? 's' : ''}`
                      : 'Manufacturers'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-background z-50" align="start">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Manufacturers</Label>
                    {selectedManufacturers.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedManufacturers([])}
                        className="h-6 px-2 text-xs"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Search manufacturers..."
                    value={filterSearch.mfg}
                    onChange={(e) => setFilterSearch(prev => ({ ...prev, mfg: e.target.value }))}
                    className="h-8"
                  />
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {manufacturers
                      .filter(mfg => mfg.toLowerCase().includes(filterSearch.mfg.toLowerCase()))
                      .map(mfg => (
                        <div key={mfg} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mfg-${mfg}`}
                            checked={selectedManufacturers.includes(mfg)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedManufacturers([...selectedManufacturers, mfg]);
                              } else {
                                setSelectedManufacturers(selectedManufacturers.filter(m => m !== mfg));
                              }
                            }}
                          />
                          <label htmlFor={`mfg-${mfg}`} className="text-sm cursor-pointer flex-1">
                            {mfg}
                          </label>
                        </div>
                      ))}
                    {manufacturers.filter(mfg => mfg.toLowerCase().includes(filterSearch.mfg.toLowerCase())).length === 0 && (
                      <p className="text-sm text-muted-foreground py-2">No matching manufacturers</p>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Products Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-background">
                  <span className="truncate">
                    {selectedProducts.length > 0 
                      ? `${selectedProducts.length} Product${selectedProducts.length > 1 ? 's' : ''}`
                      : 'Products/Treatments'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-background z-50" align="start">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Products/Treatments</Label>
                    {selectedProducts.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedProducts([])}
                        className="h-6 px-2 text-xs"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Search products..."
                    value={filterSearch.product}
                    onChange={(e) => setFilterSearch(prev => ({ ...prev, product: e.target.value }))}
                    className="h-8"
                  />
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {products
                      .filter(prod => prod.toLowerCase().includes(filterSearch.product.toLowerCase()))
                      .map(prod => (
                        <div key={prod} className="flex items-center space-x-2">
                          <Checkbox
                            id={`prod-${prod}`}
                            checked={selectedProducts.includes(prod)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedProducts([...selectedProducts, prod]);
                              } else {
                                setSelectedProducts(selectedProducts.filter(p => p !== prod));
                              }
                            }}
                          />
                          <label htmlFor={`prod-${prod}`} className="text-sm cursor-pointer flex-1">
                            {prod}
                          </label>
                        </div>
                      ))}
                    {products.filter(prod => prod.toLowerCase().includes(filterSearch.product.toLowerCase())).length === 0 && (
                      <p className="text-sm text-muted-foreground py-2">No matching products</p>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedTherapeuticAreas.length > 0 || selectedManufacturers.length > 0 || selectedProducts.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {selectedTherapeuticAreas.map(area => (
                <Badge key={area} variant="secondary" className="gap-1">
                  {area}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedTherapeuticAreas(selectedTherapeuticAreas.filter(a => a !== area))}
                  />
                </Badge>
              ))}
              {selectedManufacturers.map(mfg => (
                <Badge key={mfg} variant="secondary" className="gap-1">
                  {mfg}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedManufacturers(selectedManufacturers.filter(m => m !== mfg))}
                  />
                </Badge>
              ))}
              {selectedProducts.map(prod => (
                <Badge key={prod} variant="secondary" className="gap-1">
                  {prod}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedProducts(selectedProducts.filter(p => p !== prod))}
                  />
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSelectedTherapeuticAreas([]);
                  setSelectedManufacturers([]);
                  setSelectedProducts([]);
                  setSelectedState('');
                  setUserZipCode('');
                  setUserZipCoords(null);
                }}
                className="h-7 text-xs"
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Stats Bar */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold">{filteredCenters.length}</span>
                <span className="text-muted-foreground">Treatment Centers</span>
              </div>
              {filteredCenters.length !== allCenters.length && (
                <span className="text-xs text-muted-foreground">
                  (filtered from {allCenters.length} total)
                </span>
              )}
            </div>
            {userZipCoords && userZipCode && (
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" />
                Sorted by distance from {userZipCode}
              </Badge>
            )}
          </div>

          {/* Map Container */}
          {mapboxToken ? (
            <div className="relative isolate">
              <div 
                ref={mapContainer} 
                className={`rounded-lg shadow-lg overflow-hidden z-0 ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[500px]'}`}
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
