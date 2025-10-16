import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { parseProductPricingCSV, ProductPricing, formatPriceComparison } from '@/services/productPricingService';
import { DollarSign, Pill, Activity, TrendingUp, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export const ProductPricingOverview = () => {
  const [products, setProducts] = useState<ProductPricing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await parseProductPricingCSV();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Group by therapeutic area
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.therapeutic_area;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, ProductPricing[]>);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Loading pricing information...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              FDA-approved therapies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Therapeutic Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(productsByCategory).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              CAR-T, Gene, CRISPR, MS
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Info className="h-4 w-4" />
              Product Data Fields
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground mt-1">
              Per product record
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$65K - $3.1M</div>
            <p className="text-xs text-muted-foreground mt-1">
              WAC pricing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Product Catalog & Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="by-category">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="by-category">By Therapeutic Area</TabsTrigger>
              <TabsTrigger value="all-products">All Products</TabsTrigger>
            </TabsList>

            <TabsContent value="by-category" className="mt-4">
              <ScrollArea className="h-[600px] pr-4">
                <Accordion type="single" collapsible className="space-y-2">
                  {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-semibold">{category}</span>
                          <Badge variant="secondary">{categoryProducts.length} products</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {categoryProducts.map((product, idx) => (
                            <Card key={idx} className="border-l-4 border-l-primary">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h4 className="font-semibold text-lg">{product.product_name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {product.generic_name}
                                    </p>
                                  </div>
                                  <Badge>{product.manufacturer.split('/')[0]}</Badge>
                                </div>

                                <p className="text-sm mb-3">{product.indication}</p>

                                <Separator className="my-3" />

                                {/* Pricing Section */}
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Pricing:</span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                    <div className="bg-muted/50 p-2 rounded">
                                      <p className="text-xs text-muted-foreground">WAC Price</p>
                                      <p className="font-semibold">{product.wac_price}</p>
                                    </div>
                                    <div className="bg-muted/50 p-2 rounded">
                                      <p className="text-xs text-muted-foreground">Government (340B)</p>
                                      <p className="font-semibold">{product.government_price}</p>
                                    </div>
                                    <div className="bg-muted/50 p-2 rounded">
                                      <p className="text-xs text-muted-foreground">Commercial</p>
                                      <p className="font-semibold">{product.commercial_price}</p>
                                    </div>
                                  </div>
                                </div>

                                <Separator className="my-3" />

                                {/* Support Programs */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Patient Assistance</p>
                                    <p className="font-medium">{product.pap_available}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Copay Assistance</p>
                                    <p className="font-medium">{product.copay_assistance}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Insurance Types</p>
                                    <p className="font-medium text-xs">{product.insurance_types.split(',')[0]}...</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Timeline</p>
                                    <p className="font-medium">{product.days_to_infusion}</p>
                                  </div>
                                </div>

                                {/* Treatment Journey Phases */}
                                <Accordion type="single" collapsible className="mt-4">
                                  <AccordionItem value="journey">
                                    <AccordionTrigger className="text-sm py-2">
                                      View Treatment Journey Timeline
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="space-y-3 pt-2">
                                        <div className="flex items-start gap-3">
                                          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                            1
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium text-sm">Pre-Infusion</p>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                              {product.phase1_preinfusion.substring(0, 150)}...
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                            2
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium text-sm">Manufacturing</p>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                              {product.phase2_manufacturing.substring(0, 150)}...
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                            3
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium text-sm">Infusion</p>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                              {product.phase3_infusion.substring(0, 150)}...
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                            4
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium text-sm">Post-Infusion Monitoring</p>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                              {product.phase4_postinfusion.substring(0, 150)}...
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="all-products" className="mt-4">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {products.map((product, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold">{product.product_name}</h4>
                            <p className="text-sm text-muted-foreground">{product.indication}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                              <Badge variant="secondary">{product.therapeutic_area}</Badge>
                              <Badge variant="outline">{product.manufacturer.split('/')[0]}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-primary">{product.wac_price}</p>
                            <p className="text-xs text-muted-foreground">WAC Price</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Information Banner */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
        <CardContent className="p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 dark:text-blue-100">Pricing Information</p>
            <p className="text-blue-800 dark:text-blue-200 mt-1">
              All pricing data includes WAC (Wholesale Acquisition Cost), Government pricing (340B/VA discounts), 
              Commercial insurance estimates, and patient assistance program availability. Treatment timelines vary 
              by product and patient eligibility.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
