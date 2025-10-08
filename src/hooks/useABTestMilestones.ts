import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ABTestVariant {
  variant_name: string;
  milestones: number[];
  is_active: boolean;
  weight: number;
}

export const useABTestMilestones = () => {
  const [milestones, setMilestones] = useState<number[]>([3, 5, 7]); // default
  const [variant, setVariant] = useState<string>('variant_a');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadABTestVariant();
  }, []);

  const loadABTestVariant = async () => {
    try {
      // Fetch active variants
      const { data: variants, error } = await supabase
        .from('genie_ab_test_config')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      if (!variants || variants.length === 0) {
        setIsLoading(false);
        return;
      }

      // Select variant based on weights
      const selectedVariant = selectWeightedVariant(variants as ABTestVariant[]);
      setVariant(selectedVariant.variant_name);
      setMilestones(selectedVariant.milestones);
    } catch (error) {
      console.error('Error loading A/B test variant:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectWeightedVariant = (variants: ABTestVariant[]): ABTestVariant => {
    const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
    const random = Math.random() * totalWeight;
    
    let weightSum = 0;
    for (const variant of variants) {
      weightSum += variant.weight;
      if (random <= weightSum) {
        return variant;
      }
    }
    
    return variants[0]; // fallback
  };

  return {
    milestones,
    variant,
    isLoading,
  };
};
