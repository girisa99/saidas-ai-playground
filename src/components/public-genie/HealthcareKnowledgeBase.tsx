import React from 'react';

// Healthcare Knowledge Base for Reimbursement Support
export const HealthcareKnowledgeBase = {
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
    case 'digital therapeutics (dtx)':
      return HealthcareKnowledgeBase.digitalTherapeutics;
    case 'cell, gene & advanced therapies':
      return HealthcareKnowledgeBase.therapyCategories.find(t => t.name === "Cell & Gene Therapies");
    case 'oncology therapies & products':
      return HealthcareKnowledgeBase.therapyCategories.find(t => t.name === "Oncology Treatments");
    case 'reimbursement (travel & logistics)':
      return HealthcareKnowledgeBase.reimbursementProcesses;
    default:
      return null;
  }
};

export const getPayerSpecificInfo = (payer: 'medicare' | 'medicaid' | 'commercial') => {
  return HealthcareKnowledgeBase.payerPrograms[payer];
};