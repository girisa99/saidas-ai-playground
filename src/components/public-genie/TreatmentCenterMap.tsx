import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTreatmentCentersForMap, TreatmentCenter } from '@/services/treatmentCenterService';
import { MapPin, Phone, Globe, Mail, Search, ExternalLink } from 'lucide-react';

export const TreatmentCenterMap = () => {
  const [centers, setCenters] = useState<TreatmentCenter[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<TreatmentCenter[]>([]);
  const [centerType, setCenterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<TreatmentCenter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCenters();
  }, [centerType]);

  const loadCenters = async () => {
    setIsLoading(true);
    const data = await getTreatmentCentersForMap(
      centerType === 'all' ? undefined : centerType
    );
    setCenters(data);
    setFilteredCenters(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = centers.filter(center =>
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.state?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCenters(filtered);
    } else {
      setFilteredCenters(centers);
    }
  }, [searchQuery, centers]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Treatment Center Locator
          </CardTitle>
          <CardDescription>
            Find specialized treatment centers for gene therapy, BMT, and other advanced therapies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Centers</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, city, or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Center Type</label>
              <Select value={centerType} onValueChange={setCenterType}>
                <SelectTrigger>
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
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredCenters.length} centers found</span>
            {selectedCenter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCenter(null)}
              >
                Clear selection
              </Button>
            )}
          </div>

          {/* Centers List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading treatment centers...
              </div>
            ) : filteredCenters.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No treatment centers found matching your criteria
              </div>
            ) : (
              filteredCenters.map((center) => (
                <Card 
                  key={center.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCenter?.id === center.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCenter(center)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{center.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {center.center_type.replace('_', ' ')}
                            </Badge>
                            {center.is_verified && (
                              <Badge variant="default" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </div>

                      {center.address && (
                        <p className="text-sm text-muted-foreground">
                          {center.address}
                          {center.city && `, ${center.city}`}
                          {center.state && `, ${center.state}`}
                          {center.zip_code && ` ${center.zip_code}`}
                        </p>
                      )}

                      {center.specialties && center.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {center.specialties.slice(0, 3).map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {center.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{center.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {selectedCenter?.id === center.id && (
                        <div className="pt-3 mt-3 border-t space-y-2">
                          {center.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a href={`tel:${center.phone}`} className="hover:underline">
                                {center.phone}
                              </a>
                            </div>
                          )}
                          {center.website && (
                            <div className="flex items-center gap-2 text-sm">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a 
                                href={center.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-1"
                              >
                                Visit Website
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          )}
                          {center.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a href={`mailto:${center.email}`} className="hover:underline">
                                {center.email}
                              </a>
                            </div>
                          )}
                          {center.source_name && (
                            <div className="pt-2 mt-2 border-t">
                              <p className="text-xs text-muted-foreground">
                                Source: {center.source_name}
                                {center.source_url && (
                                  <a 
                                    href={center.source_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-1 hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3 inline" />
                                  </a>
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
