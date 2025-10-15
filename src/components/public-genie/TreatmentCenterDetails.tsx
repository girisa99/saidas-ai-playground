import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TreatmentCenter } from '@/services/treatmentCenterService';
import { MapPin, Phone, Globe, Mail, ExternalLink, Users, Pill, Building2, FlaskConical, Award } from 'lucide-react';

interface TreatmentCenterDetailsProps {
  center: TreatmentCenter;
  onClose: () => void;
}

export const TreatmentCenterDetails = ({ center, onClose }: TreatmentCenterDetailsProps) => {
  return (
    <Card className="border-l-4 border-l-primary max-h-[600px] overflow-y-auto">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between sticky top-0 bg-card pb-2 border-b">
          <div>
            <h4 className="font-semibold text-lg">{center.name}</h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge variant="secondary">
                {center.center_type.replace('_', ' ')}
              </Badge>
              {center.is_verified && (
                <Badge variant="default">Verified</Badge>
              )}
              {center.nci_designated && (
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950">
                  <Award className="h-3 w-3 mr-1" />
                  {center.nci_designated}
                </Badge>
              )}
              {center.fact_accredited && (
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
                  FACT Accredited
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          {center.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
              <span>
                {center.address}
                {center.city && `, ${center.city}`}
                {center.state && `, ${center.state}`}
                {center.zip_code && ` ${center.zip_code}`}
                {center.country && center.country !== 'USA' && (
                  <span className="ml-1 font-medium">({center.country})</span>
                )}
              </span>
            </div>
          )}

          {center.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${center.phone}`} className="hover:underline text-primary">
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
                className="hover:underline text-primary flex items-center gap-1"
              >
                Visit Website
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {center.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${center.email}`} className="hover:underline text-primary">
                {center.email}
              </a>
            </div>
          )}
        </div>

        {/* Capacity */}
        {center.capacity_info && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium mb-1">
              <Building2 className="h-4 w-4" />
              Capacity
            </div>
            <p className="text-sm text-muted-foreground">{center.capacity_info}</p>
          </div>
        )}

        {/* Therapeutic Areas */}
        {center.therapeutic_areas && center.therapeutic_areas.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              Therapeutic Areas
            </p>
            <div className="flex flex-wrap gap-1">
              {center.therapeutic_areas.map((area, idx) => (
                <Badge key={idx} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Products/Drugs */}
        {center.products_drugs && center.products_drugs.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Products & Drugs
            </p>
            <div className="flex flex-wrap gap-1">
              {center.products_drugs.map((drug, idx) => (
                <Badge key={idx} variant="outline" className="text-xs bg-green-50 dark:bg-green-950">
                  {drug}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Manufacturers */}
        {center.manufacturers && center.manufacturers.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Manufacturers/Sponsors
            </p>
            <div className="flex flex-wrap gap-1">
              {center.manufacturers.map((mfr, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {mfr}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Key Providers */}
        {center.key_providers && center.key_providers.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Key Providers/Specialists
            </p>
            <div className="space-y-1">
              {center.key_providers.map((provider, idx) => (
                <p key={idx} className="text-xs text-muted-foreground pl-2 border-l-2">
                  {provider}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Clinical Trials */}
        {center.clinical_trials && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Clinical Trials</p>
            <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
              {center.clinical_trials}
            </p>
            {center.trial_sponsors && center.trial_sponsors.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {center.trial_sponsors.map((sponsor, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {sponsor}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Patient Services */}
        {center.patient_services && center.patient_services.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Patient Services</p>
            <div className="flex flex-wrap gap-1">
              {center.patient_services.map((service, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Source */}
        {center.source_name && (
          <div className="pt-2 mt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Source: {center.source_name}
              {center.source_url && (
                <a 
                  href={center.source_url}
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
  );
};
