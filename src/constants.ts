import { LIASection } from './types';

// Based on "Fragenkatalog zur Durchführung einer Interessenabwägung nach Art. 6 Abs. 1 lit. f DS-GVO"
// Structure:
// 1. Definition of Interest
// 2. Necessity Check (Erforderlichkeit)
// 3. Balancing of Interests (Interessenabwägung)

export const SECTIONS: LIASection[] = [
  {
    id: 'preliminaries',
    title: 'Preliminary Information',
    description: 'Basic details about the controller and the processing activity.',
    questions: [
      {
        id: 'controller_name',
        category: 'Controller Details',
        question: 'Controller Name (Optional)',
        helperText: 'Legal name of the organization responsible for the data processing.',
        type: 'text',
        componentType: 'input',
        required: false,
        disableAI: true,
        spacing: 'tight'
      },
      {
        id: 'controller_address',
        category: 'Controller Details',
        question: 'Address (Optional)',
        helperText: 'Full postal address of the controller.',
        type: 'text',
        componentType: 'input',
        required: false,
        disableAI: true,
        spacing: 'tight'
      },
      {
        id: 'dpo_contact',
        category: 'Controller Details',
        question: 'DPO Contact (Optional)',
        helperText: 'Contact details of Data Protection Officer, if applicable',
        type: 'text',
        componentType: 'input',
        required: false,
        disableAI: true
      },
      {
        id: 'processing_activity',
        category: 'General',
        question: 'Description of Processing Activity',
        helperText: 'Briefly describe what data is processed, how, and for what specific purpose.',
        type: 'text',
        required: true
      },
      {
        id: 'date_of_assessment',
        category: 'General',
        question: 'Date of Assessment',
        type: 'text', 
        componentType: 'input',
        required: true,
        disableAI: true
      }
    ]
  },
  {
    id: 'phase1',
    title: 'Phase 1: Legitimate Interest',
    description: 'Determine if the interest pursued is legitimate (lawful, sufficiently clear, and real).',
    edpbReference: 'EDPB Guidelines 1/2024, para. 14-27',
    questions: [
      {
        id: 'p1_whose_interest',
        category: 'Source of Interest',
        question: 'Whose interest is being pursued?',
        type: 'select',
        options: ['Controller (Self)', 'Third Party', 'Public Interest'],
        required: true
      },
      {
        id: 'p1_description',
        category: 'Description',
        question: 'What is the specific legitimate interest?',
        helperText: 'e.g., IT security, fraud prevention, direct marketing, enforcement of legal claims. Must be more than just "profit" in abstract terms.',
        type: 'text',
        required: true
      },
      {
        id: 'p1_lawfulness',
        category: 'Lawfulness',
        question: 'Is the interest lawful?',
        helperText: 'Is the objective prohibited by law? Does it violate any other regulations?',
        type: 'yesno',
        required: true
      },
      {
        id: 'p1_reality',
        category: 'Reality',
        question: 'Is the interest real and present?',
        helperText: 'Is it a concrete interest or merely hypothetical/speculative?',
        type: 'text',
        required: true
      },
      {
        id: 'p1_recognized',
        category: 'Recognition',
        question: 'Is this interest recognized by Recital 47 or CJEU case law?',
        helperText: 'Recital 47 explicitly recognizes: direct marketing, fraud prevention, network/information security, intra-group transfers. Recognition does not exempt from the full LIA but strengthens the interest.',
        type: 'select',
        options: [
          'Yes — Recital 47 (direct marketing)',
          'Yes — Recital 47 (fraud prevention)',
          'Yes — Recital 47 (network security)',
          'Yes — Recital 47 (intra-group transfers)',
          'Yes — CJEU case law',
          'No — Not explicitly recognized'
        ],
        required: true
      }
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2: Necessity',
    description: 'Evaluate if the processing is necessary to achieve the defined interest.',
    edpbReference: 'EDPB Guidelines 1/2024, para. 28-30',
    questions: [
      {
        id: 'p2_suitability',
        category: 'Suitability',
        question: 'Is the processing suitable to achieve the objective?',
        helperText: 'Can the defined goal actually be reached through this data processing?',
        type: 'text',
        required: true
      },
      {
        id: 'p2_mildest_means',
        category: 'Mildest Means',
        question: 'Is it the mildest means available?',
        helperText: 'Is there another way to achieve the same result with less intrusive means (e.g., less data, anonymous data)?',
        type: 'text',
        required: true
      },
      {
        id: 'p2_data_minimization',
        category: 'Data Minimization',
        question: 'Is only personal data that is necessary for achieving the purpose being processed?',
        helperText: 'Confirm that the scope of data collected is limited to what is strictly needed (Data Minimization).',
        type: 'text',
        required: true
      },
      {
        id: 'p2_alternatives',
        category: 'Alternatives',
        question: 'What alternatives were considered and why were they rejected?',
        helperText: 'Document less intrusive alternatives you evaluated (e.g., anonymized data, aggregated statistics, opt-in consent, synthetic data). Explain specifically why each was insufficient. The EDPB requires this assessment — failure to consider alternatives undermines the necessity claim.',
        type: 'text',
        required: true
      }
    ]
  },
  {
    id: 'phase3',
    title: 'Phase 3: Balancing of Interests',
    description: 'Weigh the legitimate interest against the interests or fundamental rights of the data subject.',
    edpbReference: 'EDPB Guidelines 1/2024, para. 31-54',
    questions: [
      {
        id: 'p3_nature_data',
        category: 'Nature of Data',
        question: 'What personal data categories are processed?',
        helperText: 'List all categories of data like personal contact data (name, address, telephone, email), master data (customer ID, contract details), behavioural data (purchase history, logs), online identifiers or location data etc. Does it involve special categories (Art. 9) or Art. 10 data? Sensitive financial/private data? Publicly available data?',
        type: 'text',
        required: true
      },
      {
        id: 'p3_scale_volume',
        category: 'Scale & Complexity',
        question: 'What is the scale of processing and data volume?',
        helperText: 'Describe the overall volume of data, the volume of data per data subject, and the number of data subjects affected. Explicitly state whether the personal data is combined, matched, or cross-referenced with other data sets.',
        type: 'text',
        required: true
      },
      {
        id: 'p3_nature_subject',
        category: 'Data Subjects',
        question: 'Who are the data subjects?',
        helperText: 'Describe which data subjects\' data is processed. In particular, specify the relationship/context and indicate whether they are particularly vulnerable (children, employees, patients) or if there is a power imbalance.',
        type: 'text',
        required: true
      },
      {
        id: 'p3_consequences',
        category: 'Impact',
        question: 'What are the possible consequences for the data subjects?',
        helperText: 'How extensive is the data collection? Consider negative effects like financial loss, discrimination, reputational damage, or chilling effects. In AI/ML contexts (EDPB Opinion 28/2024), explicitly assess risks of hallucinations (inaccuracy), bias/discrimination, re-identification from training data (model inversion), and the impact of large-scale scraping.',
        type: 'text',
        required: true
      },
      {
        id: 'p3_expectations',
        category: 'Expectations',
        question: 'Can the data subject reasonably expect this processing at the point of data collection?',
        helperText: 'Where, in what context, and when is the data collected? How is data processing made transparent to the individuals concerned? Is there a relevant relationship between the data subject and the controller, like is the data subject a client or in the service of the controller?',
        type: 'text',
        required: true
      },
      {
        id: 'p3_safeguards',
        category: 'Safeguards',
        question: 'What additional safeguards are implemented?',
        helperText: 'Encryption, pseudonymization, strict retention periods, opt-out mechanisms, transparency measures.',
        type: 'text',
        required: true
      },
      {
        id: 'p3_retention',
        category: 'Data Retention',
        question: 'How long will the data be processed, what are the data retention periods?',
        helperText: 'Specify the exact retention period. The duration of processing is a key factor in the assessment. It is vital to clearly define and strictly adhere to retention periods to ensure compliance with the storage limitation principle.',
        type: 'text',
        required: true
      },
      {
        id: 'p3_opt_out',
        category: 'Right to Object',
        question: 'Is an opt-out mechanism offered? (Art. 21)',
        helperText: 'Describe how data subjects can object to the processing. For direct marketing, the right to object is absolute (Art. 21(2)). The opt-out must be clearly communicated, easily accessible, and unconditional. An LIA without an Art. 21 mechanism is incomplete.',
        type: 'text',
        required: true
      },
      {
        id: 'p3_profiling',
        category: 'Profiling',
        question: 'Does the processing involve profiling or automated decision-making?',
        helperText: 'Profiling based on Art. 6(1)(f) is subject to heightened scrutiny. Solely automated decisions producing legal or similarly significant effects cannot rely on Art. 6(1)(f) alone (Art. 22).',
        type: 'select',
        options: [
          'No profiling or automated decisions',
          'Profiling without automated decisions',
          'Automated decisions with human oversight',
          'Solely automated decisions (Art. 22 applies)'
        ],
        required: true
      },
      {
        id: 'p3_third_country',
        category: 'International Transfers',
        question: 'Is data transferred to third countries?',
        helperText: 'If applicable, specify the countries and transfer mechanisms (SCCs, adequacy decision, BCRs). Third-country transfers increase risk weighting in the balancing exercise.',
        type: 'text',
        required: false
      }
    ]
  },
  {
    id: 'conclusion',
    title: 'Final Conclusion',
    description: 'Based on the previous steps, determine the outcome.',
    questions: [
      {
        id: 'final_result',
        category: 'Outcome',
        question: 'Does the legitimate interest override the rights of the data subject?',
        type: 'select',
        options: [
          'YES - Processing is permissible under Art. 6(1)(f)',
          'NO - Processing is NOT permissible',
          'UNCERTAIN - Requires DPO consultation'
        ],
        required: true
      },
      {
        id: 'final_comments',
        category: 'Comments',
        question: 'Additional Comments / Reasoning Summary',
        type: 'text',
        required: false
      },
      {
        id: 'final_dpia',
        category: 'DPIA',
        question: 'Is a Data Protection Impact Assessment (DPIA) also required? (Art. 35)',
        helperText: 'A DPIA is mandatory when processing is likely to result in a high risk to data subjects — e.g., systematic profiling, large-scale processing of special categories, or public monitoring. The LIA and DPIA are complementary, not mutually exclusive.',
        type: 'select',
        options: [
          'Not required',
          'Yes — DPIA has been conducted',
          'Yes — DPIA is planned',
          'Under evaluation'
        ],
        required: false
      }
    ]
  }
];