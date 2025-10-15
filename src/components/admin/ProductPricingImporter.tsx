import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { syncProductPricingToKnowledgeBase } from "@/services/productPricingService";
import { Upload, Database, DollarSign } from "lucide-react";

export const ProductPricingImporter = () => {
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleImport = async () => {
    try {
      setIsImporting(true);
      toast({
        title: "Starting import",
        description: "Syncing product pricing data to knowledge base...",
      });

      const result = await syncProductPricingToKnowledgeBase();

      if (result.success) {
        toast({
          title: "Import successful",
          description: `Synced ${result.count} products to knowledge base`,
        });
      } else {
        throw new Error("Import failed");
      }
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to sync pricing data",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Product Pricing & Journey Data</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Import comprehensive product pricing (WAC, 340B, Commercial, PAP), treatment journey phases,
          insurance coverage, and prior authorization requirements into the universal knowledge base.
        </p>

        <div className="flex gap-2">
          <Button
            onClick={handleImport}
            disabled={isImporting}
            className="flex items-center gap-2"
          >
            {isImporting ? (
              <>
                <Database className="h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Sync to Knowledge Base
              </>
            )}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>✓ 100+ products with comprehensive pricing</p>
          <p>✓ All 4 pricing models (WAC, 340B, Commercial, PAP)</p>
          <p>✓ Treatment journey phases (Pre, Manufacturing, Infusion, Post)</p>
          <p>✓ Insurance coverage and prior authorization</p>
          <p>✓ Pricing guide with model explanations</p>
        </div>
      </div>
    </Card>
  );
};
