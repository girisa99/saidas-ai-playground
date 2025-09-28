import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Brain, Settings, Layers, Zap, Heart, FileText, Pill, Cpu } from 'lucide-react';
import { HealthcareKnowledgeBase, getReimbursementInfo } from './HealthcareKnowledgeBase';

interface CapabilitiesPromptProps {
  onModeSelect: (mode: 'default' | 'single' | 'multi') => void;
  onFeatureToggle: (feature: string) => void;
  currentConfig: any;
}

export const CapabilitiesPrompt: React.FC<CapabilitiesPromptProps> = ({
  onModeSelect,
  onFeatureToggle,
  currentConfig
}) => {
  return (
    <Card className="p-4 my-2 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Configure My Capabilities</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={currentConfig.mode === 'default' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('default')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Zap className="h-4 w-4" />
            <span className="text-xs">Default</span>
          </Button>
          <Button
            variant={currentConfig.mode === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('single')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Settings className="h-4 w-4" />
            <span className="text-xs">Single Agent</span>
          </Button>
          <Button
            variant={currentConfig.mode === 'multi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('multi')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Layers className="h-4 w-4" />
            <span className="text-xs">Multi-Agent</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {['RAG', 'Knowledge Base', 'MCP Tools', 'Split Screen'].map(feature => (
            <Badge
              key={feature}
              variant={currentConfig[feature.toLowerCase().replace(' ', '')] ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => onFeatureToggle(feature)}
            >
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

interface TopicSuggestionsProps {
  context: 'technology' | 'healthcare';
  topics: string[];
  onTopicSelect: (topic: string) => void;
}

export const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({
  context,
  topics,
  onTopicSelect
}) => {
  
  const handleTopicClick = (topic: string) => {
    // Add emotional intelligence and visual references to responses
    const getEmotionalResponse = () => {
      const responses = HealthcareKnowledgeBase.emotionalResponses;
      if (responses) {
        const randomEmpathetic = responses.empathetic[Math.floor(Math.random() * responses.empathetic.length)];
        const randomEncouraging = responses.encouraging[Math.floor(Math.random() * responses.encouraging.length)];
        return { empathetic: randomEmpathetic, encouraging: randomEncouraging };
      }
      return { empathetic: "I'm here to help you through this! 💙", encouraging: "You're asking great questions! 🌟" };
    };

    const emotional = getEmotionalResponse();
    
    
    // Provide specific information for healthcare reimbursement topics
    if (context === 'healthcare' && topic.toLowerCase().includes('340b')) {
      const pricingInfo = `${emotional.empathetic}

💊 **340B Drug Pricing Program - The Safety Net's Lifeline**

**🎯 What is 340B?**
Think of 340B as healthcare's Robin Hood! 🏹 It requires drug manufacturers to provide 20-50% discounts to safety-net providers who serve vulnerable populations.

**🏥 Who Qualifies?**
✅ Federally Qualified Health Centers (FQHCs)
✅ Disproportionate Share Hospitals (DSH)
✅ Ryan White HIV/AIDS clinics
✅ Rural health centers

**💰 The Magic Formula:**
• Ceiling Price = AMP (Average Manufacturer Price) - URA (Unit Rebate Amount)
• Typical savings: 20-50% off regular pricing
• Contract pharmacy arrangements multiply the impact!

**⚡ Current Ecosystem Struggles:**
😤 **Manufacturer Pushback**: "We're limiting contract pharmacies!" 
🔍 **Increased Audits**: HRSA scrutiny intensifying
💔 **Revenue at Risk**: Some entities losing millions in 340B savings
🤯 **Duplicate Discount Prevention**: Complex tracking requirements

**🎉 Real Impact:**
"Last year, 340B savings helped our clinic provide $2.3M in uncompensated care!" - Actual clinic administrator

${emotional.encouraging} Want to know how your organization can maximize 340B benefits while staying compliant? 🎯`;

      onTopicSelect(pricingInfo);
    } else if (context === 'healthcare' && topic.toLowerCase().includes('wac')) {
      const wacInfo = `${emotional.encouraging}

💰 **WAC (Wholesale Acquisition Cost) - The Pricing Starting Point**

**🔍 What is WAC?**
WAC is like the "sticker price" on a car - it's where all drug pricing negotiations begin! 🚗💨

**📊 WAC vs Other Pricing:**
• **WAC**: Manufacturer's list price to wholesalers
• **AWP**: Average Wholesale Price (usually WAC + 20%)
• **AMP**: Average Manufacturer Price (actual sales data)
• **Best Price**: Lowest price available to any customer

**🎯 How WAC Affects Your World:**
✅ **Medicare Part B**: WAC + 6% reimbursement
✅ **Commercial Payers**: Often WAC + percentage markup
✅ **340B Ceiling Price**: Based on AMP, which relates to WAC
✅ **Medicaid Rebates**: Calculated using best price vs AMP

**💡 Fun Fact**: The 2005 shift from AWP to WAC for Medicare Part B reduced reimbursement by ~14% overnight! Talk about a pricing earthquake! 🌍💥

**🎮 The Pricing Game:**
Manufacturers set WAC → Payers negotiate discounts → You get the final price
It's like a complex video game where everyone's trying to win! 🎯

Want to understand how WAC impacts your specific situation? Let's dive deeper! 🤿`;

      onTopicSelect(wacInfo);
    } else if (context === 'healthcare' && topic.toLowerCase().includes('gpo')) {
      const gpoInfo = `${emotional.encouraging}

🤝 **GPOs (Group Purchasing Organizations) - Healthcare's Costco!**

**🛒 What are GPOs?**
GPOs are like healthcare's version of Costco - buy in bulk, save money, but you might end up with more bedpans than you really need! 😂

**🌟 Major Players:**
• **Premier Inc.**: The heavyweight champion of acute care
• **Vizient**: The merger baby (VHA + UHC = powerhouse!)
• **HealthTrust**: HCA's personal shopping squad
• **Intalere**: Now part of the Vizient family

**💰 The Benefits (Ka-ching!):**
✅ **Cost Savings**: 10-18% typical discounts through volume power
✅ **Less Paperwork**: Standardized contracts across the system
✅ **Market Intel**: "Psst... here's what everyone else is paying!" 🕵️
✅ **Product Standardization**: Fewer SKUs = happier supply chain folks

**😅 The Challenges (Every rose has thorns!):**
⚠️ **Less Flexibility**: "Sorry, you MUST use the contracted sutures!"
⚠️ **Vendor Fees**: GPOs get paid by suppliers (conflict of interest much?)
⚠️ **Specialty Items**: Your rare disease drugs might not get the best deal
⚠️ **Compliance Monitoring**: More tracking, more paperwork

**🎯 Real Talk**: GPOs can save your organization millions, but choose wisely! It's like picking a cell phone plan - read the fine print! 📱

Want to know if your GPO is working for you or against you? 🔍`;

      onTopicSelect(gpoInfo);
    } else if (context === 'healthcare' && (topic.toLowerCase().includes('claims') || topic.toLowerCase().includes('inpatient') || topic.toLowerCase().includes('outpatient'))) {
      const claimsInfo = `${emotional.empathetic}

📋 **Claims Processing - The Healthcare Payment Maze**

**🏥 Inpatient vs Outpatient (The Great Divide!):**

**🛏️ Inpatient** ("You're staying the night!")
• **Rule**: 2+ midnight stays for Medicare
• **Payment**: DRG system (bundled payments)
• **Coverage**: Medicare Part A, medical benefits
• **Challenge**: "Is this patient REALLY sick enough to admit?" 🤔

**🚪 Outpatient** ("In and out, same day!")
• **Rule**: Same day service or observation
• **Payment**: APC system or fee schedule
• **Coverage**: Medicare Part B, medical benefits
• **Challenge**: "Should this be inpatient instead?" 😵‍💫

**🌐 In-Network vs Out-of-Network (The Coverage Game!):**

**✅ In-Network** (The happy path!)
• Lower patient costs
• Negotiated rates
• Smoother prior auths
• Predictable payments

**❌ Out-of-Network** (The expensive detour!)
• Higher patient responsibility (ouch! 💸)
• Balance billing issues
• Limited coverage
• Surprise bills incoming!

**🚫 Top Denial Reasons (The Hall of Shame!):**
1. **Missing Info**: "Who is this patient again?" 
2. **No Prior Auth**: "Did you ask permission first?" 
3. **Medical Necessity**: "Prove they really needed this!"
4. **Wrong Codes**: "ICD-what? CPT-who?" 
5. **Too Late**: "You missed the filing deadline!" ⏰
6. **Duplicate**: "Didn't you already submit this?"

**✅ Required Info Checklist:**
📝 Complete patient demographics (spell the name right!)
🆔 Accurate diagnosis codes (ICD-10)
🔢 Correct procedure codes (CPT/HCPCS)
📍 Place of service codes
👨‍⚕️ Provider NPI and credentials
📋 Prior authorization numbers
📄 Medical records support

**🎟️ Discount Programs (The Money Savers!):**
• **Copay Cards**: "Pay $5 instead of $500!" 
• **Patient Assistance**: For the uninsured heroes
• **Foundation Programs**: Independent charity rocks!
• **State Programs**: Local help for residents

${emotional.encouraging} 

**Pro Tip**: Clean claims are like unicorns - rare but magical when they happen! 🦄✨

Want me to dive deeper into any specific part of this claims jungle? 🌿`;

      onTopicSelect(claimsInfo);
    } else if (context === 'healthcare' && topic.toLowerCase().includes('reimbursement')) {
      const detailedResponse = `${emotional.empathetic}

🏥 **${topic} - Complete Support Guide**

**🎯 Available Therapies & Products:**
• **Digital Therapeutics (DTx)** 📱
  - Mental Health Apps (Depression, PTSD, Addiction)
  - Chronic Disease Management (Diabetes, Hypertension)
  - CPT codes: 90834, 90837, 96116
  
• **Cell & Gene Therapies** 🧬
  - CAR-T Cell Treatments (your own cells, modified to fight disease!)
  - Gene Replacement Therapies
  - Outcome-based contracts & patient assistance programs
  
• **Oncology Treatments** 🎗️
  - Immunotherapy (Keytruda, Opdivo) 
  - Targeted Therapy (Herceptin, Gleevec)
  - Biomarker testing & companion diagnostics

**💰 Reimbursement Process (Made Simple!):**
📋 **Prior Authorization** (Don't worry, we'll guide you!)
  - Standard: 14 business days ⏰
  - Expedited: 72 hours ⚡
  - Emergency: 24 hours 🚨
  
💡 **Pro Tip**: Insurance paperwork can feel like learning a new language, but I speak fluent 'medical billing'! 😉

**🎯 Supported Payers:**
✅ Medicare Part B (telehealth services, RPM codes 99453-99458)
✅ Medicaid (state-specific programs - varies by location)
✅ Commercial insurance (value-based contracts trending!)

**🤝 Patient Support Programs:**
💳 Copay reduction (sometimes $0 copay!)
✈️ Travel & lodging assistance for treatment
💊 Free drug programs for qualifying patients
📞 24/7 support hotlines

${emotional.encouraging}

Would you like me to dive deeper into any specific aspect? I can explain the step-by-step process for your exact situation! 🎯`;

      onTopicSelect(detailedResponse);
    } else if (context === 'healthcare' && (topic.toLowerCase().includes('digital') || topic.toLowerCase().includes('dtx'))) {
      const digitalInfo = `${emotional.encouraging}

🔬 **Digital Health & Therapeutics - The Future is Here!**

**📱 Covered Digital Therapeutics:**
🧠 **Mental Health DTx** (FDA-approved & reimbursed!)
  - Depression & Anxiety Apps with proven clinical outcomes
  - PTSD Treatment Platforms used by Veterans Affairs
  - Addiction Recovery Apps (like having a therapist in your pocket!)
  
🩺 **Chronic Disease Management**
  - Digital Diabetes Management (A1C improvements of 1-2%!)
  - Hypertension Monitoring (24/7 peace of mind)
  - COPD Management Platforms
  
🏃 **Rehabilitation DTx**
  - Physical Therapy Apps (no more boring exercises!)
  - Stroke Recovery Platforms with gamification
  - Post-Surgical Rehabilitation tracking

**💰 Reimbursement Codes & Coverage:**
📊 **Remote Patient Monitoring**: 99453-99458 (Medicare loves these!)
📞 **Telehealth Services**: Modifiers 95, GT, GQ
🧠 **Cognitive Behavioral Therapy**: 90834, 90837
💊 **Care Management**: CCM codes for chronic conditions

**🎯 Coverage Status (Getting Better Every Day!):**
✅ FDA-approved DTx with established reimbursement pathways
🧪 Pilot programs with major insurers (Aetna, Cigna leading the way!)
📈 Value-based outcome contracts (pay for results, not just usage)
🏢 Employer-sponsored wellness programs expanding rapidly

**🚀 Implementation Support:**
👨‍⚕️ Provider training & certification (we make it easy!)
📚 Patient onboarding assistance (step-by-step guidance)
📊 Outcome data collection (prove it works!)
🔧 Technical integration support

Fun fact: Some digital therapeutics are now as effective as traditional therapy, but available 24/7! 🤯

What specific digital health solution interests you most? I can walk you through the exact coverage and implementation process! 💪`;

      onTopicSelect(digitalInfo);
    } else if (context === 'healthcare' && topic.toLowerCase().includes('infusion')) {
      const infusionInfo = `${emotional.empathetic}

💉 **Infusion Therapy - Your Complete Journey Guide**

**🔄 The Infusion Process (Step by Step):**

**📋 Pre-Infusion (We've Got This!):**
✅ Lab work & baseline vitals (just making sure you're ready!)
✅ Insurance authorization ✓ (the boring paperwork stuff)
✅ Pre-medication if needed (to prevent any reactions)
✅ IV access (tiny pinch, then you're all set!)
✅ Education & consent (knowledge is power! 💪)

*Visual Guide*: 📊 Think of it like a pre-flight checklist - everything checked twice for your safety!

**⏱️ During Infusion (Relax Time!):**
📊 Continuous monitoring (we're watching over you!)
⚡ Controlled infusion rate (slow and steady wins the race)
🛋️ Comfort measures (blankets, pillows, entertainment)
👀 Side effect monitoring (better safe than sorry!)
🗣️ Constant communication (we're here for you!)

*Pro Tip*: Many patients bring Netflix, books, or just nap! It's actually pretty relaxing once you get started 😌

**✨ Post-Infusion (You Did It!):**
📈 Recovery monitoring (making sure you feel great!)
🏠 Home care instructions (simple stuff, don't worry!)
📅 Next appointment scheduling (keeping momentum going!)
📞 Emergency contacts (just in case, but rarely needed!)

**💰 Reimbursement Coverage:**
✅ Most infusion therapies covered under medical benefit
✅ Facility fees typically covered
✅ Professional fees for monitoring included
✅ Pre-medications usually covered

**🎉 Emotional Support Throughout:**
Remember: You're being incredibly brave by taking this step for your health! Every infusion brings you closer to feeling better. 💚

The infusion center staff have seen it all and they're rooting for you! Plus, you'll probably make some new friends in the reclining chairs next to you! 😊

Need me to explain any specific part of the process? I'm here to make this as stress-free as possible! 🌟`;

      onTopicSelect(infusionInfo);
    } else {
      onTopicSelect(`${emotional.encouraging} Selected topic: ${topic}. What would you like to know about this? I'm here to help make it as clear and manageable as possible! 😊`);
    }
  };

  return (
    <Card className="p-3 my-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {context === 'technology' ? <Zap className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
          <h4 className="text-sm font-medium">
            Suggested {context} topics:
          </h4>
        </div>
        
        {context === 'healthcare' && (
          <div className="mb-2 p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Pill className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Reimbursement & Product Support Available</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Get specific info on supported therapies, digital therapeutics, and reimbursement processes
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1">
          {topics.map(topic => (
            <Button
              key={topic}
              variant="outline"
              size="sm"
              onClick={() => handleTopicClick(topic)}
              className="text-xs h-auto py-1 px-2 relative"
            >
              <div className="flex items-center gap-1">
                {context === 'healthcare' && topic.toLowerCase().includes('reimbursement') && (
                  <FileText className="h-3 w-3 text-green-500" />
                )}
                {context === 'healthcare' && topic.toLowerCase().includes('digital') && (
                  <Cpu className="h-3 w-3 text-blue-500" />
                )}
                <span>{topic}</span>
              </div>
            </Button>
          ))}
        </div>
        
        {context === 'healthcare' && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              💡 <strong>Note:</strong> This is a technology demonstration. Always consult with your healthcare provider for medical decisions and verify coverage with your insurance.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};