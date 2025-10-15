import { useEffect, useState } from "react";
import { parseProductPricingCSV, searchProductPricing, ProductPricing } from "@/services/productPricingService";
import { PricingComparisonCard } from "./PricingComparisonCard";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface PricingDisplayProps {
  product: string;
  insuranceType?: string;
}

export const PricingDisplay = ({ product, insuranceType }: PricingDisplayProps) => {
  const [pricingData, setPricingData] = useState<ProductPricing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        setLoading(true);
        const allProducts = await parseProductPricingCSV();
        const filtered = searchProductPricing(allProducts, { product });
        setPricingData(filtered);
      } catch (error) {
        console.error('Error loading pricing:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, [product]);

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </Card>
    );
  }

  if (pricingData.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pricing Information</h3>
      <div className="grid gap-4">
        {pricingData.slice(0, 3).map((product, index) => (
          <PricingComparisonCard 
            key={index}
            product={product}
            userInsuranceType={insuranceType}
          />
        ))}
      </div>
    </div>
  );
};
