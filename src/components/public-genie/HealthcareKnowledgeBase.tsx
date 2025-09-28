import React from 'react';

// Enhanced Healthcare Knowledge Base with Emotional Intelligence & Visual References
export const HealthcareKnowledgeBase = {
  emotionalResponses: {
    empathetic: [
      "I understand this can feel overwhelming - let's break it down together step by step 💙",
      "Healthcare navigation can be stressful, but you're not alone in this journey 🤝",
      "I know insurance processes can be frustrating, but we'll find the right path for you 🌟",
      "Taking care of your health is brave - let me help make this easier for you 💪"
    ],
    encouraging: [
      "You're asking all the right questions! 🌟 That shows you're being proactive about your care",
      "Great question! 👏 Understanding your options is the first step to better health outcomes",
      "I love that you're researching this thoroughly - knowledge is power! 💡",
      "You're being such an advocate for yourself - that's exactly what healthcare needs! 🎯"
    ],
    lightHumor: [
      "Insurance paperwork: because apparently healthcare wasn't complicated enough! 😅 But seriously, let me help you navigate this...",
      "Ah, the wonderful world of prior authorizations - where 'urgent' means 'maybe in 2-3 weeks' 😉 Here's how we can speed things up...",
      "CPT codes - because doctors needed their own secret language! 🤓 Don't worry, I speak fluent 'medical billing'...",
      "Welcome to healthcare reimbursement - where the rules are made up and the points... actually do matter! 💰 Let's get you those points..."
    ]
  },

  visualReferences: {
    infusionProcess: {
      preInfusion: {
        title: "Pre-Infusion Preparation",
        description: "What to expect before your infusion therapy",
        steps: [
          "Lab work and baseline vitals assessment",
          "Insurance authorization verification", 
          "Pre-medication administration (if needed)",
          "IV access establishment",
          "Patient education and consent"
        ],
        visualAids: [
          "📋 Pre-infusion checklist",
          "🩸 Lab collection process", 
          "💊 Pre-medication protocols",
          "🔗 IV catheter placement",
          "📚 Patient education materials"
        ],
        emotionalSupport: "Feeling nervous? That's completely normal! 😌 Think of this as your care team's way of making sure everything goes smoothly."
      },
      duringInfusion: {
        title: "During Infusion",
        description: "Your comfort and safety during treatment",
        steps: [
          "Continuous vital sign monitoring",
          "Infusion rate management",
          "Comfort measures and positioning",
          "Side effect monitoring",
          "Patient communication and support"
        ],
        visualAids: [
          "📊 Vital signs monitoring display",
          "⏱️ Infusion pump programming",
          "🛏️ Comfort positioning guide",
          "⚠️ Side effect recognition chart",
          "🗣️ Communication protocols"
        ],
        emotionalSupport: "You're doing great! 💪 Many patients find this is a good time to catch up on reading, shows, or just rest."
      },
      postInfusion: {
        title: "Post-Infusion Care",
        description: "Recovery and next steps after treatment",
        steps: [
          "Post-infusion vital signs assessment",
          "Side effect evaluation and management", 
          "Next appointment scheduling",
          "Home care instructions",
          "Emergency contact information"
        ],
        visualAids: [
          "📈 Recovery monitoring timeline",
          "🏠 Home care instruction cards",
          "📞 Emergency contact list",
          "📅 Follow-up appointment scheduler",
          "💊 Post-treatment medication guide"
        ],
        emotionalSupport: "You did it! 🎉 Your body is now working with the treatment to help you feel better."
      }
    },

    productEducation: {
      oncologyProducts: {
        title: "Oncology Treatment Options",
        categories: [
          {
            name: "Immunotherapy",
            examples: ["Keytruda (pembrolizumab)", "Opdivo (nivolumab)", "Yervoy (ipilimumab)"],
            visualAid: "🛡️ How immunotherapy helps your immune system fight cancer",
            emotionalNote: "These treatments work with your body's natural defenses - pretty amazing what science can do! ✨"
          },
          {
            name: "Targeted Therapy", 
            examples: ["Herceptin (trastuzumab)", "Gleevec (imatinib)", "Avastin (bevacizumab)"],
            visualAid: "🎯 Targeted therapy: precision medicine at work",
            emotionalNote: "Think of this as a smart missile that knows exactly where to go! 🚀"
          }
        ]
      },
      cellGeneTherapy: {
        title: "Cell & Gene Therapy",
        description: "Revolutionary treatments using your own cells",
        process: [
          "Cell collection from patient",
          "Laboratory modification/enhancement",
          "Quality control and testing",
          "Reinfusion to patient",
          "Monitoring and follow-up"
        ],
        visualAid: "🧬 From your cells to cure: the CAR-T journey",
        emotionalNote: "This is truly personalized medicine - using YOUR own cells to fight disease! How cool is that? 🤯"
      }
    }
  },
  digitalTherapeutics: [
    {
      category: "Mental Health DTx",
      products: [
        "Prescription Digital Therapeutics for Depression",
        "CBT-based Digital Interventions",
        "Addiction Recovery Apps",
        "PTSD Treatment Platforms"
      ],
      reimbursementSupport: "CPT codes 90834, 90837, 96116",
      coverageScope: "Medicare Part B, Commercial Insurance"
    },
    {
      category: "Chronic Disease Management",
      products: [
        "Digital Diabetes Management",
        "Hypertension Monitoring DTx",
        "COPD Management Platforms",
        "Heart Failure Remote Monitoring"
      ],
      reimbursementSupport: "RPM codes 99453-99458, CCM codes",
      coverageScope: "Medicare, Medicaid, Commercial"
    },
    {
      category: "Rehabilitation DTx",
      products: [
        "Physical Therapy Apps",
        "Stroke Recovery Platforms",
        "Post-Surgical Rehabilitation",
        "Cognitive Rehabilitation Tools"
      ],
      reimbursementSupport: "Physical therapy codes, telehealth modifiers",
      coverageScope: "Medicare Part B, Workers' Comp"
    }
  ],

  therapyCategories: [
    {
      name: "Cell & Gene Therapies",
      examples: [
        "CAR-T Cell Therapies",
        "Gene Replacement Therapies",
        "Stem Cell Treatments",
        "Immunotherapies"
      ],
      reimbursementChallenges: [
        "High cost per treatment",
        "Outcome-based contracts",
        "Prior authorization requirements",
        "Coverage determination processes"
      ],
      supportedPrograms: [
        "Medicare Coverage Advisory Committee (MEDCAC)",
        "FDA Breakthrough Therapy Designation",
        "Manufacturer Patient Assistance Programs",
        "State Medicaid Programs"
      ]
    },
    {
      name: "Oncology Treatments",
      examples: [
        "Targeted Therapies",
        "Immunotherapy Drugs",
        "Precision Medicine",
        "Radiation Therapies"
      ],
      reimbursementChallenges: [
        "Biomarker testing requirements",
        "Companion diagnostic coverage",
        "Step therapy protocols",
        "Site of care considerations"
      ],
      supportedPrograms: [
        "Oncology Care Model (OCM)",
        "Enhanced Oncology Model (EOM)",
        "Patient Access Programs",
        "Foundation Assistance Programs"
      ]
    }
  ],

  reimbursementProcesses: {
    priorAuthorization: {
      steps: [
        "Clinical documentation review",
        "Medical necessity determination",
        "Coverage policy alignment",
        "Appeal process if denied"
      ],
      timelines: {
        "Standard PA": "14 business days",
        "Expedited PA": "72 hours",
        "Emergency": "24 hours"
      }
    },
    claimsSubmission: {
      requirements: [
        "Accurate CPT/HCPCS codes",
        "ICD-10 diagnostic codes",
        "Place of service codes",
        "Modifier usage"
      ],
      digitalHealthSpecific: [
        "Telehealth modifiers (95, GT, GQ)",
        "Remote monitoring codes",
        "Digital therapeutic specific codes",
        "Outcome reporting requirements"
      ]
    }
  },

  payerPrograms: {
    medicare: {
      digitalHealthCoverage: [
        "Telehealth services",
        "Remote patient monitoring",
        "Digital diabetes prevention",
        "Mental health apps (limited)"
      ],
      reimbursementRates: "Based on physician fee schedule"
    },
    medicaid: {
      variability: "State-by-state coverage policies",
      emergingCoverage: [
        "Substance abuse DTx",
        "Chronic disease management",
        "Maternal health apps"
      ]
    },
    commercial: {
      trends: [
        "Value-based contracts",
        "Pilot programs for DTx",
        "Outcomes-based reimbursement",
        "Employer-sponsored coverage"
      ]
    }
  },

  supportServices: {
    patientAssistance: [
      "Copay reduction programs",
      "Free drug programs",
      "Travel assistance",
      "Lodging support"
    ],
    providerSupport: [
      "Prior authorization assistance",
      "Claims submission support",
      "Appeal letter templates",
      "Coverage verification tools"
    ],
    digitalHealthSpecific: [
      "DTx prescription support",
      "Patient onboarding assistance",
      "Outcome data collection",
      "Provider training programs"
    ]
  }
};

export const getReimbursementInfo = (topic: string) => {
  switch (topic.toLowerCase()) {
    case 'emotional':
      return HealthcareKnowledgeBase;
    case 'digital therapeutics (dtx)':
      return HealthcareKnowledgeBase.digitalTherapeutics;
    case 'cell, gene & advanced therapies':
      return HealthcareKnowledgeBase.therapyCategories.find(t => t.name === "Cell & Gene Therapies");
    case 'oncology therapies & products':
      return HealthcareKnowledgeBase.therapyCategories.find(t => t.name === "Oncology Treatments");
    case 'reimbursement (travel & logistics)':
      return HealthcareKnowledgeBase.reimbursementProcesses;
    case 'infusion':
      return HealthcareKnowledgeBase.visualReferences.infusionProcess;
    default:
      return HealthcareKnowledgeBase;
  }
};

export const getPayerSpecificInfo = (payer: 'medicare' | 'medicaid' | 'commercial') => {
  return HealthcareKnowledgeBase.payerPrograms[payer];
};

export const getEmotionalSupport = (context: string) => {
  const responses = HealthcareKnowledgeBase.emotionalResponses;
  const randomType = Math.random() > 0.5 ? 'empathetic' : 'encouraging';
  return responses[randomType][Math.floor(Math.random() * responses[randomType].length)];
};

export const getVisualReference = (process: string) => {
  return HealthcareKnowledgeBase.visualReferences[process] || null;
};