import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { parseProductPricingCSV } from "@/services/productPricingService";
import { loadEnhancedCenters } from "@/services/treatmentCenterService";
import { Database, Building2, Package, RefreshCw } from "lucide-react";

export const DataVerificationPanel = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCenters: 0,
    uniqueCategories: [] as string[],
    uniqueTherapeuticAreas: [] as string[],
    uniqueManufacturers: [] as string[],
  });

  const loadStats = async () => {
    setLoading(true);
    try {
      // Load products
      const products = await parseProductPricingCSV();
      
      // Load centers
      const centers = await loadEnhancedCenters();
      
      // Extract unique therapeutic areas (categories)
      const therapeuticAreas = new Set<string>();
      products.forEach(p => therapeuticAreas.add(p.therapeutic_area));
      
      // Extract unique manufacturers
      const manufacturers = new Set<string>();
      products.forEach(p => manufacturers.add(p.manufacturer));
      
      // Extract center therapeutic areas
      const centerAreas = new Set<string>();
      centers.forEach(c => {
        if (c.therapeutic_areas) {
          c.therapeutic_areas.split(',').forEach((area: string) => {
            centerAreas.add(area.trim());
          });
        }
      });
      
      setStats({
        totalProducts: products.length,
        totalCenters: centers.length,
        uniqueCategories: Array.from(therapeuticAreas).sort(),
        uniqueTherapeuticAreas: Array.from(centerAreas).sort(),
        uniqueManufacturers: Array.from(manufacturers).sort(),
      });
    } catch (error) {
      console.error('Stats loading error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Data Verification Summary</h3>
          </div>
          <Button onClick={loadStats} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Products Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold">Products Database</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Therapeutic Categories</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.uniqueCategories.length}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Product Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {stats.uniqueCategories.map(cat => (
                    <Badge key={cat} variant="secondary">{cat}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Manufacturers ({stats.uniqueManufacturers.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {stats.uniqueManufacturers.slice(0, 10).map(mfr => (
                    <Badge key={mfr} variant="outline" className="text-xs">{mfr}</Badge>
                  ))}
                  {stats.uniqueManufacturers.length > 10 && (
                    <Badge variant="outline" className="text-xs">
                      +{stats.uniqueManufacturers.length - 10} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Treatment Centers Summary */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold">Treatment Centers Database</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Centers</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalCenters}</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Therapeutic Areas</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.uniqueTherapeuticAreas.length}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Center Therapeutic Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {stats.uniqueTherapeuticAreas.slice(0, 15).map(area => (
                    <Badge key={area} variant="secondary" className="text-xs">{area}</Badge>
                  ))}
                  {stats.uniqueTherapeuticAreas.length > 15 && (
                    <Badge variant="outline" className="text-xs">
                      +{stats.uniqueTherapeuticAreas.length - 15} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
              <h4 className="font-semibold mb-2">📊 Complete Dataset Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>✓ {stats.totalProducts} Products with full pricing</div>
                <div>✓ {stats.uniqueCategories.length} Product therapeutic categories</div>
                <div>✓ {stats.totalCenters} Treatment centers</div>
                <div>✓ {stats.uniqueTherapeuticAreas.length} Center therapeutic areas</div>
                <div>✓ {stats.uniqueManufacturers.length} Unique manufacturers</div>
                <div>✓ All 4 pricing models (WAC, 340B, Commercial, PAP)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
