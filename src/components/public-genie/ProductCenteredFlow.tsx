import { useState } from 'react';
import { ProductTherapeuticSelector } from './ProductTherapeuticSelector';
import { InteractiveTreatmentCenterMap } from './InteractiveTreatmentCenterMap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MapPin } from 'lucide-react';

export const ProductCenteredFlow = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedTherapeutic, setSelectedTherapeutic] = useState<string | null>(null);

  const handleReset = () => {
    setSelectedProduct(null);
    setSelectedTherapeutic(null);
  };

  if (!selectedProduct && !selectedTherapeutic) {
    return (
      <ProductTherapeuticSelector
        onProductSelect={setSelectedProduct}
        onTherapeuticSelect={setSelectedTherapeutic}
      />
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Selection
              </Button>
              <div className="text-sm">
                <span className="text-muted-foreground">Viewing centers for: </span>
                <span className="font-semibold">
                  {selectedProduct || selectedTherapeutic}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Treatment Centers & Pricing
            </div>
          </div>
        </CardContent>
      </Card>

      <InteractiveTreatmentCenterMap
        product={selectedProduct || undefined}
        therapeuticArea={selectedTherapeutic || undefined}
      />
    </div>
  );
};
