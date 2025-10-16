import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Pill, Activity } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProductTherapeuticSelectorProps {
  onProductSelect: (product: string) => void;
  onTherapeuticSelect: (therapeutic: string) => void;
}

export const ProductTherapeuticSelector = ({ 
  onProductSelect, 
  onTherapeuticSelect 
}: ProductTherapeuticSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Product data from pricing CSV
  const products = useMemo(() => [
    { name: 'Kymriah', therapeutic: 'CAR-T Therapy', indication: 'Pediatric/Young Adult ALL', manufacturer: 'Novartis', price: '$475,000' },
    { name: 'Yescarta', therapeutic: 'CAR-T Therapy', indication: 'Large B-Cell Lymphoma', manufacturer: 'Gilead/Kite', price: '$373,000' },
    { name: 'Breyanzi', therapeutic: 'CAR-T Therapy', indication: 'Large B-Cell Lymphoma', manufacturer: 'BMS/Juno', price: '$410,300' },
    { name: 'Abecma', therapeutic: 'CAR-T Therapy', indication: 'Relapsed/Refractory Multiple Myeloma', manufacturer: 'BMS/Bluebird', price: '$419,500' },
    { name: 'Tecartus', therapeutic: 'CAR-T Therapy', indication: 'Mantle Cell Lymphoma', manufacturer: 'Gilead/Kite', price: '$373,000' },
    { name: 'Carvykti', therapeutic: 'CAR-T Therapy', indication: 'Relapsed/Refractory Multiple Myeloma', manufacturer: 'Janssen/Legend', price: '$465,000' },
    { name: 'Lyfgenia', therapeutic: 'Gene Therapy', indication: 'Sickle Cell Disease', manufacturer: 'Bluebird Bio', price: '$3,100,000' },
    { name: 'Zynteglo', therapeutic: 'Gene Therapy', indication: 'Beta-Thalassemia', manufacturer: 'Bluebird Bio', price: '$2,800,000' },
    { name: 'Casgevy', therapeutic: 'CRISPR Gene Therapy', indication: 'SCD & Beta-Thalassemia', manufacturer: 'Vertex/CRISPR Tx', price: '$2,200,000' },
    { name: 'Zolgensma', therapeutic: 'Gene Therapy', indication: 'Spinal Muscular Atrophy', manufacturer: 'Novartis', price: '$2,125,000' },
    { name: 'Roctavian', therapeutic: 'Gene Therapy', indication: 'Severe Hemophilia A', manufacturer: 'BioMarin', price: '$2,900,000' },
    { name: 'Luxturna', therapeutic: 'Gene Therapy', indication: 'Inherited Retinal Disease', manufacturer: 'Spark/Roche', price: '$850,000' },
    { name: 'Ocrevus', therapeutic: 'Multiple Sclerosis', indication: 'Relapsing MS / PPMS', manufacturer: 'Genentech/Roche', price: '$65,000/year' },
  ], []);

  const therapeuticAreas = useMemo(() => {
    const areas = new Map<string, { count: number; products: string[] }>();
    products.forEach(p => {
      const existing = areas.get(p.therapeutic) || { count: 0, products: [] };
      existing.count++;
      existing.products.push(p.name);
      areas.set(p.therapeutic, existing);
    });
    return Array.from(areas.entries()).map(([name, data]) => ({ name, ...data }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.therapeutic.toLowerCase().includes(term) ||
      p.indication.toLowerCase().includes(term) ||
      p.manufacturer.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Select Product or Therapeutic Area
        </CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, therapeutics, or indications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">
              <Pill className="h-4 w-4 mr-2" />
              By Product ({filteredProducts.length})
            </TabsTrigger>
            <TabsTrigger value="therapeutics">
              <Activity className="h-4 w-4 mr-2" />
              By Therapeutic ({therapeuticAreas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.name}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => onProductSelect(product.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {product.indication}
                          </p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            <Badge variant="secondary">{product.therapeutic}</Badge>
                            <Badge variant="outline">{product.manufacturer}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-primary">{product.price}</p>
                          <p className="text-xs text-muted-foreground">WAC Price</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="therapeutics" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {therapeuticAreas.map((area) => (
                  <Card
                    key={area.name}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => onTherapeuticSelect(area.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{area.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {area.count} products available
                          </p>
                        </div>
                        <Badge variant="secondary">{area.count}</Badge>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground mb-1">Products:</p>
                        <div className="flex gap-1 flex-wrap">
                          {area.products.map(p => (
                            <Badge key={p} variant="outline" className="text-xs">
                              {p}
                            </Badge>
                          ))}
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
  );
};
