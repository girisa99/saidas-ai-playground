import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTreatmentCentersForMap, TreatmentCenter } from '@/services/treatmentCenterService';
import { MapPin, Phone, Globe, Mail, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const InteractiveTreatmentCenterMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [centers, setCenters] = useState<TreatmentCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<TreatmentCenter | null>(null);
  const [centerType, setCenterType] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Load treatment centers
  useEffect(() => {
    loadCenters();
  }, [centerType]);

  const loadCenters = async () => {
    const data = await getTreatmentCentersForMap(
      centerType === 'all' ? undefined : centerType
    );
    setCenters(data);
  };

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
                onChange={(e) => setMapboxToken(e.target.value)}
              />
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
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{selectedCenter.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        {selectedCenter.center_type.replace('_', ' ')}
                      </Badge>
                      {selectedCenter.is_verified && (
                        <Badge variant="default">Verified</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCenter(null)}
                  >
                    ✕
                  </Button>
                </div>

                {selectedCenter.address && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <span>
                      {selectedCenter.address}
                      {selectedCenter.city && `, ${selectedCenter.city}`}
                      {selectedCenter.state && `, ${selectedCenter.state}`}
                      {selectedCenter.zip_code && ` ${selectedCenter.zip_code}`}
                    </span>
                  </div>
                )}

                {selectedCenter.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${selectedCenter.phone}`} className="hover:underline">
                      {selectedCenter.phone}
                    </a>
                  </div>
                )}

                {selectedCenter.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={selectedCenter.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      Visit Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {selectedCenter.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${selectedCenter.email}`} className="hover:underline">
                      {selectedCenter.email}
                    </a>
                  </div>
                )}

                {selectedCenter.specialties && selectedCenter.specialties.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCenter.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCenter.source_name && (
                  <div className="pt-2 mt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Source: {selectedCenter.source_name}
                      {selectedCenter.source_url && (
                        <a 
                          href={selectedCenter.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 hover:underline inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
