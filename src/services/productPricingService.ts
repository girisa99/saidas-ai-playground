import { supabase } from "@/integrations/supabase/client";

export interface ProductPricing {
  id?: string;
  product_name: string;
  generic_name: string;
  manufacturer: string;
  ndc_code: string;
  therapeutic_area: string;
  indication: string;
  number_of_doses: string;
  wac_price: string;
  government_price: string;
  commercial_price: string;
  pap_available: string;
  prior_auth_required: string;
  phase1_preinfusion: string;
  phase2_manufacturing: string;
  phase3_infusion: string;
  phase4_postinfusion: string;
  days_to_infusion: string;
  insurance_types: string;
  copay_assistance: string;
  rems_required: string;
  specialty_pharmacy: string;
  inpatient_outpatient: string;
}

export interface PricingQuery {
  product?: string;
  therapeutic_area?: string;
  manufacturer?: string;
  insurance_type?: string;
  price_range?: string;
}

export const parseProductPricingCSV = async (): Promise<ProductPricing[]> => {
  try {
    const response = await fetch('/data/product-pricing-journey.csv');
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    const products: ProductPricing[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = parseCSVLine(lines[i]);
      
      if (values.length >= 22) {
        products.push({
          product_name: values[0],
          generic_name: values[1],
          manufacturer: values[2],
          ndc_code: values[3],
          therapeutic_area: values[4],
          indication: values[5],
          number_of_doses: values[6],
          wac_price: values[7],
          government_price: values[8],
          commercial_price: values[9],
          pap_available: values[10],
          prior_auth_required: values[11],
          phase1_preinfusion: values[12],
          phase2_manufacturing: values[13],
          phase3_infusion: values[14],
          phase4_postinfusion: values[15],
          days_to_infusion: values[16],
          insurance_types: values[17],
          copay_assistance: values[18],
          rems_required: values[19],
          specialty_pharmacy: values[20],
          inpatient_outpatient: values[21],
        });
      }
    }
    
    return products;
  } catch (error) {
    console.error('Error parsing product pricing CSV:', error);
    return [];
  }
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
};

export const searchProductPricing = (
  products: ProductPricing[],
  query: PricingQuery
): ProductPricing[] => {
  return products.filter(product => {
    if (query.product && !product.product_name.toLowerCase().includes(query.product.toLowerCase()) &&
        !product.generic_name.toLowerCase().includes(query.product.toLowerCase())) {
      return false;
    }
    
    if (query.therapeutic_area && !product.therapeutic_area.toLowerCase().includes(query.therapeutic_area.toLowerCase())) {
      return false;
    }
    
    if (query.manufacturer && !product.manufacturer.toLowerCase().includes(query.manufacturer.toLowerCase())) {
      return false;
    }
    
    if (query.insurance_type && !product.insurance_types.toLowerCase().includes(query.insurance_type.toLowerCase())) {
      return false;
    }
    
    return true;
  });
};

export const extractPriceValue = (priceString: string): number => {
  const match = priceString.match(/\$?([\d,]+)/);
  return match ? parseFloat(match[1].replace(/,/g, '')) : 0;
};

export const formatPriceComparison = (product: ProductPricing): string => {
  const wac = extractPriceValue(product.wac_price);
  const gov = extractPriceValue(product.government_price);
  const discount = gov > 0 ? Math.round(((wac - gov) / wac) * 100) : 0;
  
  return `WAC: ${product.wac_price} | Government (340B): ${product.government_price} (${discount}% discount) | Commercial: ${product.commercial_price}`;
};

export const syncProductPricingToKnowledgeBase = async () => {
  try {
    // Clear existing pricing entries first to avoid duplicates
    await supabase
      .from('universal_knowledge_base')
      .delete()
      .or('dataset_source.eq./data/product-pricing-journey.csv,dataset_source.eq./data/pricing-insurance-guide.md');
    
    const products = await parseProductPricingCSV();
    console.log(`Syncing ${products.length} products to knowledge base...`);
    
    for (const product of products) {
      const content = `
# ${product.product_name} (${product.generic_name})

**Manufacturer:** ${product.manufacturer}
**NDC Code:** ${product.ndc_code}
**Therapeutic Area:** ${product.therapeutic_area}
**Indication:** ${product.indication}

## Pricing Information
${formatPriceComparison(product)}

**Patient Assistance:** ${product.pap_available}
**Copay Assistance:** ${product.copay_assistance}

## Coverage Requirements
- Prior Authorization: ${product.prior_auth_required}
- Insurance Types: ${product.insurance_types}
- REMS Required: ${product.rems_required}
- Specialty Pharmacy: ${product.specialty_pharmacy}
- Administration: ${product.inpatient_outpatient}

## Treatment Journey

### Phase 1: Pre-Infusion
${product.phase1_preinfusion}

### Phase 2: Manufacturing
${product.phase2_manufacturing}

### Phase 3: Infusion/Administration
${product.phase3_infusion}

### Phase 4: Post-Infusion Monitoring
${product.phase4_postinfusion}

**Timeline:** ${product.days_to_infusion} from enrollment to treatment
      `.trim();
      
      await supabase.from('universal_knowledge_base').insert({
        finding_name: `${product.product_name} - Pricing & Treatment Journey`,
        clinical_significance: content,
        description: `Complete pricing, insurance, and treatment journey information for ${product.product_name}`,
        domain: 'medical_imaging',
        content_type: 'protocol',
        dataset_source: '/data/product-pricing-journey.csv',
        is_approved: true,
        quality_score: 95,
        metadata: {
          product_name: product.product_name,
          generic_name: product.generic_name,
          manufacturer: product.manufacturer,
          therapeutic_area: product.therapeutic_area,
          wac_price: product.wac_price,
          government_price: product.government_price,
          ndc_code: product.ndc_code,
          days_to_treatment: product.days_to_infusion,
          pap_available: product.pap_available === 'Yes',
          prior_auth_required: product.prior_auth_required.includes('Yes'),
          tags: [
            product.therapeutic_area.toLowerCase(),
            product.manufacturer.toLowerCase(),
            'pricing',
            'treatment-journey',
            'insurance'
          ]
        }
      });
    }
    
    // Also add the comprehensive guide
    const guideResponse = await fetch('/data/pricing-insurance-guide.md');
    const guideText = await guideResponse.text();
    
    await supabase.from('universal_knowledge_base').insert({
      finding_name: 'Comprehensive Guide to Drug Pricing Models & Insurance Coverage',
      clinical_significance: guideText,
      description: 'Detailed explanation of WAC, Government, Commercial pricing and insurance types',
      domain: 'patient_onboarding',
      content_type: 'protocol',
      dataset_source: '/data/pricing-insurance-guide.md',
      is_approved: true,
      quality_score: 98,
      metadata: {
        coverage_types: ['Medicare Part B', 'Medicare Part D', 'Medicaid', 'Commercial', 'VA/DoD', '340B'],
        pricing_models: ['WAC', 'Government', 'Commercial', 'PAP'],
        tags: ['pricing', 'insurance', 'wac', '340b', 'medicaid', 'medicare', 'pap']
      }
    });
    
    console.log(`✅ Successfully synced ${products.length} products + 1 guide = ${products.length + 1} total entries`);
    return { 
      success: true, 
      count: products.length + 1,
      products: products.length,
      guides: 1 
    };
  } catch (error) {
    console.error('Error syncing product pricing:', error);
    return { success: false, error };
  }
};
