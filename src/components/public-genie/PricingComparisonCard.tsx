import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingDown, HelpCircle, CheckCircle } from "lucide-react";
import { ProductPricing, extractPriceValue } from "@/services/productPricingService";

interface PricingComparisonCardProps {
  product: ProductPricing;
  userInsuranceType?: string;
}

export const PricingComparisonCard = ({ product, userInsuranceType }: PricingComparisonCardProps) => {
  const wacPrice = extractPriceValue(product.wac_price);
  const govPrice = extractPriceValue(product.government_price);
  const discount = govPrice > 0 ? Math.round(((wacPrice - govPrice) / wacPrice) * 100) : 0;
  
  const getRelevantPrice = () => {
    if (!userInsuranceType) return product.wac_price;
    
    switch (userInsuranceType.toLowerCase()) {
      case 'medicare':
      case 'medicaid':
      case '340b':
      case 'va':
        return product.government_price;
      case 'commercial':
        return product.commercial_price;
      default:
        return product.wac_price;
    }
  };

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{product.product_name}</h3>
          <p className="text-sm text-muted-foreground">{product.generic_name}</p>
          <Badge variant="outline" className="mt-2">{product.therapeutic_area}</Badge>
        </div>
        <DollarSign className="h-6 w-6 text-primary" />
      </div>

      <div className="grid gap-3">
        {/* WAC Price */}
        <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
          <div>
            <p className="text-sm font-medium">WAC (List Price)</p>
            <p className="text-xs text-muted-foreground">Wholesale Acquisition Cost</p>
          </div>
          <p className="text-lg font-bold">{product.wac_price}</p>
        </div>

        {/* Government Price */}
        <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-green-200 dark:border-green-800">
          <div>
            <p className="text-sm font-medium flex items-center gap-2">
              Government (340B/VA)
              {discount > 0 && (
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {discount}% off
                </Badge>
              )}
            </p>
            <p className="text-xs text-muted-foreground">Medicaid, VA, 340B eligible facilities</p>
          </div>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">{product.government_price}</p>
        </div>

        {/* Commercial Price */}
        <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
          <div>
            <p className="text-sm font-medium">Commercial Insurance</p>
            <p className="text-xs text-muted-foreground">Negotiated rates vary by plan</p>
          </div>
          <p className="text-lg font-bold">{product.commercial_price}</p>
        </div>

        {/* Your Estimated Cost */}
        {userInsuranceType && (
          <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Your Estimated Cost</p>
                <p className="text-xs text-muted-foreground">Based on {userInsuranceType} coverage</p>
              </div>
              <p className="text-xl font-bold text-primary">{getRelevantPrice()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Financial Assistance */}
      <div className="space-y-2 pt-2 border-t">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <p className="text-sm font-medium">Patient Assistance Available</p>
        </div>
        <p className="text-xs text-muted-foreground ml-6">
          {product.pap_available}
        </p>
        {product.copay_assistance && (
          <p className="text-xs text-muted-foreground ml-6">
            <strong>Copay Help:</strong> {product.copay_assistance}
          </p>
        )}
      </div>

      {/* Coverage Requirements */}
      <div className="space-y-2 pt-2 border-t">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-blue-600" />
          <p className="text-sm font-medium">Coverage Requirements</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs ml-6">
          <div>
            <strong>Prior Auth:</strong> {product.prior_auth_required.includes('Yes') ? 'Required' : 'Not Required'}
          </div>
          <div>
            <strong>REMS:</strong> {product.rems_required}
          </div>
          <div>
            <strong>Specialty Pharmacy:</strong> {product.specialty_pharmacy}
          </div>
          <div>
            <strong>Administration:</strong> {product.inpatient_outpatient}
          </div>
        </div>
      </div>

      {/* Treatment Timeline */}
      <div className="p-3 bg-accent/20 rounded-lg">
        <p className="text-sm font-medium mb-1">Treatment Timeline</p>
        <p className="text-xs text-muted-foreground">
          <strong>{product.days_to_infusion}</strong> from enrollment to treatment
        </p>
      </div>
    </Card>
  );
};
