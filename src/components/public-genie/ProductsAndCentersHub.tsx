import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductPricingOverview } from './ProductPricingOverview';
import { ProductCenteredFlow } from './ProductCenteredFlow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Map, List } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export const ProductsAndCentersHub = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Products, Pricing & Treatment Centers
          </CardTitle>
          <CardDescription>
            Explore 14 products with 22 data fields and 157+ treatment centers with 18 data fields - 40+ comprehensive categories total
          </CardDescription>
        </CardHeader>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Note:</strong> Product pricing data is loaded directly from CSV (no sync needed for viewing). 
          However, <strong>Genie AI needs the Admin sync</strong> to answer intelligent pricing questions via RAG.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pricing">
            <List className="h-4 w-4 mr-2" />
            Product Catalog & Pricing
          </TabsTrigger>
          <TabsTrigger value="centers">
            <Map className="h-4 w-4 mr-2" />
            Treatment Centers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="mt-6">
          <ProductPricingOverview />
        </TabsContent>

        <TabsContent value="centers" className="mt-6">
          <ProductCenteredFlow />
        </TabsContent>
      </Tabs>
    </div>
  );
};
