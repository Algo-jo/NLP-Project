/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Candidate, JobDescription } from '../types';

export const mockJobs: JobDescription[] = [
  {
    id: 'job-it',
    title: 'Senior IT Systems Architect',
    department: 'Information-Technology',
    requirements: ['Kubernetes', 'Cloud Infrastructure', 'Systems Engineering', 'Relational Databases', 'Information Security'],
    descriptionText: 'Looking for a Senior Systems Engineer or IT Architect to build resilient, distributed information infrastructures. Candidates must understand data system deployments, security, and cloud ecosystems.'
  },
  {
    id: 'job-hr',
    title: 'Corporate Talent Acquisition Lead',
    department: 'HR',
    requirements: ['Strategic Recruitment', 'Applicant Tracking Systems', 'Interpersonal Skills', 'Employee Training', 'HR Analytics'],
    descriptionText: 'Seeking an HR Manager to spearhead international recruitment pipelines. Responsibility includes sourcing top-tier talent, handling human resource operations, and mentoring development programs.'
  },
  {
    id: 'job-design',
    title: 'Lead Product & UI/UX Designer',
    department: 'Designer',
    requirements: ['Figma Design', 'System Design', 'Visual Branding', 'Interface Wireframing', 'Interactive Prototypes'],
    descriptionText: 'Designing pristine digital products. Requires solid visual layout principles, user experience map optimization, and deep understanding of typographic pairing, interactive design, and responsive frameworks.'
  },
  {
    id: 'job-finance',
    title: 'Financial Controller & Auditor',
    department: 'Finance',
    requirements: ['Fiscal Auditing', 'Corporate Finance', 'Tax Compliance', 'Cost Analysis', 'Investment Risk Management'],
    descriptionText: 'We need a detailed Controller to handle balance sheets, risk assessments, and auditing metrics. Economic principles, tax regulation understanding, and budget control expertise are mandatory.'
  }
];

export const initialCandidates: Candidate[] = [
  {
    id: 'CV_10291_JJonathan',
    name: 'Jonathan Archer',
    email: 'jonathan.archer@candidate-pool.com',
    phone: '+1 415-555-0192',
    category: 'Information-Technology',
    skills: ['Cloud Infrastructure', 'Kubernetes', 'Docker', 'Systems Architecture', 'Go', 'Databases', 'Information Security'],
    experience: [
      {
        role: 'Systems Engineer',
        company: 'Nova Cloud Systems',
        duration: '2023 - Present',
        description: 'Designed secure cloud architectures and deployed scalable container systems.'
      },
      {
        role: 'Database Specialist',
        company: 'Starlight Financial Systems',
        duration: '2022 - 2023',
        description: 'Optimized relational databases, handled query performance, and orchestrated cluster states.'
      }
    ],
    education: {
      degree: 'B.Sc. in Computer Science',
      institution: 'Stanford University',
      year: '2024'
    },
    compatScores: {
      'job-it': 0.895,
      'job-hr': 0.284,
      'job-design': 0.420,
      'job-finance': 0.312
    },
    semanticOverlap: {
      'job-it': {
        strength: 0.89,
        matches: ['Cloud Infrastructure', 'Databases', 'Systems Engineering'],
        semanticOnly: ['Infrastructure Scalability => Cloud infrastructure matching', 'Secure architectures => Information Security matching']
      },
      'job-hr': {
        strength: 0.28,
        matches: [],
        semanticOnly: ['Database mentoring => Training matching']
      },
      'job-design': {
        strength: 0.42,
        matches: [],
        semanticOnly: ['Database Specialist => UX layout organization similarity']
      },
      'job-finance': {
        strength: 0.31,
        matches: [],
        semanticOnly: ['Query performance metrics => Cost estimation']
      }
    },
    relevanceStatus: 'highly_relevant',
    uploadedAt: '2026-05-28T08:12:00Z',
    processTimeMs: 1420
  },
  {
    id: 'CV_10292_AlanTuring',
    name: 'Alan Turing Lead',
    email: 'alan.turing@candidate-pool.com',
    phone: '+1 415-555-0134',
    category: 'Information-Technology',
    skills: ['Information Systems', 'Business Process Analysis', 'ERP Systems', 'SQL Server Upgrade', 'IT Governance', 'Information Management'],
    experience: [
      {
        role: 'Business Information Consultant',
        company: 'Aero Technology Solutions',
        duration: '2023 - Present',
        description: 'Aligned information architectures with technical requirements. Directed core business systems translation into systems architectures.'
      }
    ],
    education: {
      degree: 'B.Sc. in Information Systems',
      institution: 'Pacific Institute of Technology',
      year: '2024'
    },
    compatScores: {
      'job-it': 0.765,
      'job-hr': 0.352,
      'job-design': 0.450,
      'job-finance': 0.410
    },
    semanticOverlap: {
      'job-it': {
        strength: 0.765,
        matches: ['Information Security'],
        semanticOnly: [
          'Information Systems => Information Technology (High SBERT Semantic Alignment)',
          'IT Infrastructure Management => Infrastructure Management (High Conceptual Link)'
        ]
      },
      'job-hr': {
        strength: 0.35,
        matches: [],
        semanticOnly: []
      },
      'job-design': {
        strength: 0.45,
        matches: [],
        semanticOnly: []
      },
      'job-finance': {
        strength: 0.41,
        matches: [],
        semanticOnly: []
      }
    },
    relevanceStatus: 'relevant',
    uploadedAt: '2026-05-28T08:15:00Z',
    processTimeMs: 1680
  },
  {
    id: 'CV_10293_SarahConnor',
    name: 'Sarah Connor',
    email: 'sarah.connor@candidate-pool.com',
    phone: '+1 415-555-0177',
    category: 'HR',
    skills: ['Strategic HR Management', 'Global Recruitment Pipeline', 'Applicant Tracking System (ATS)', 'Employee Relations', 'Conflict Resolution', 'Training & Development'],
    experience: [
      {
        role: 'Human Resources Director',
        company: 'Apex Global Solutions',
        duration: '2021 - Present',
        description: 'Orchestrated full employee life cycle activities, talent sourcing, performance metrics, and led corporate restructuring.'
      },
      {
        role: 'Recruiter Coordinator',
        company: 'Legacy Talent Group',
        duration: '2019 - 2021',
        description: 'Oversaw high-volume recruiter tasks, configured ATS integrations, and optimized interview loops.'
      }
    ],
    education: {
      degree: 'Bachelor of Psychology',
      institution: 'Stanford University',
      year: '2023'
    },
    compatScores: {
      'job-it': 0.224,
      'job-hr': 0.942,
      'job-design': 0.310,
      'job-finance': 0.245
    },
    semanticOverlap: {
      'job-it': {
        strength: 0.22,
        matches: [],
        semanticOnly: []
      },
      'job-hr': {
        strength: 0.94,
        matches: ['Strategic Recruitment', 'Applicant Tracking Systems', 'Employee Training'],
        semanticOnly: [
          'Oversaw high-volume recruiter tasks => Talent sourcing performance similarity',
          'Tactical interviewer loops => Strategic recruiting structure similarity'
        ]
      },
      'job-design': {
        strength: 0.31,
        matches: [],
        semanticOnly: []
      },
      'job-finance': {
        strength: 0.24,
        matches: [],
        semanticOnly: []
      }
    },
    relevanceStatus: 'highly_relevant',
    uploadedAt: '2026-05-28T08:18:00Z',
    processTimeMs: 1250
  },
  {
    id: 'CV_10294_JaneFoster',
    name: 'Jane Foster',
    email: 'jane.foster@candidate-pool.com',
    phone: '+1 415-555-0188',
    category: 'Designer',
    skills: ['UI/UX Redesign', 'Design Systems', 'Figma Prototyping', 'Typography Layouts', 'Front-End Styling', 'Vector Illustration'],
    experience: [
      {
        role: 'Senior Digital Product Designer',
        company: 'Nexus Creative Lab',
        duration: '2022 - Present',
        description: 'Iterated complex fintech payment structures, structured cohesive design blueprints, and elevated interactive click-through conversions.'
      }
    ],
    education: {
      degree: 'B.Des. in Visual Communication Design',
      institution: 'Stanford University',
      year: '2024'
    },
    compatScores: {
      'job-it': 0.435,
      'job-hr': 0.390,
      'job-design': 0.885,
      'job-finance': 0.290
    },
    semanticOverlap: {
      'job-it': {
        strength: 0.435,
        matches: [],
        semanticOnly: []
      },
      'job-hr': {
        strength: 0.39,
        matches: [],
        semanticOnly: []
      },
      'job-design': {
        strength: 0.885,
        matches: ['Figma Design', 'System Design', 'Visual Branding', 'Interface Wireframing'],
        semanticOnly: [
          'Cohesive design blueprints => Design systems structure alignment',
          'Payment conversion optimization => UI task completion flow similarity'
        ]
      },
      'job-finance': {
        strength: 0.29,
        matches: [],
        semanticOnly: []
      }
    },
    relevanceStatus: 'highly_relevant',
    uploadedAt: '2026-05-28T08:22:00Z',
    processTimeMs: 1510
  },
  {
    id: 'CV_10295_BruceWayne',
    name: 'Bruce Wayne',
    email: 'bruce.wayne@candidate-pool.com',
    phone: '+1 415-555-0199',
    category: 'Finance',
    skills: ['Equity Analysis', 'Budget Auditing', 'Fiscal Planning', 'Tax Law Compliance', 'Financial Risk Appraisal', 'Macroeconomic Modeling'],
    experience: [
      {
        role: 'Investment Strategy Lead',
        company: 'Vanguard Security Associates',
        duration: '2022 - Present',
        description: 'Orchestrated client risk blueprints, performed extensive auditing checks on balance sheets, and authored macroeconomic forecasts.'
      }
    ],
    education: {
      degree: 'B.Sc. in Finance & Economics',
      institution: 'Stanford University',
      year: '2024'
    },
    compatScores: {
      'job-it': 0.320,
      'job-hr': 0.285,
      'job-design': 0.312,
      'job-finance': 0.910
    },
    semanticOverlap: {
      'job-it': {
        strength: 0.32,
        matches: [],
        semanticOnly: []
      },
      'job-hr': {
        strength: 0.285,
        matches: [],
        semanticOnly: []
      },
      'job-design': {
        strength: 0.312,
        matches: [],
        semanticOnly: []
      },
      'job-finance': {
        strength: 0.91,
        matches: ['Corporate Finance', 'Fiscal Auditing', 'Investment Risk Management'],
        semanticOnly: [
          'Authoring macroeconomic forecasts => Budget cost modeling & cost analysis',
          'Client risk blueprints => Financial appraisal alignment'
        ]
      }
    },
    relevanceStatus: 'unrelated',
    uploadedAt: '2026-05-28T08:26:00Z',
    processTimeMs: 1390
  }
];

export const mockConfusionMatrix = {
  labels: ['IT', 'HR', 'Design', 'Finance', 'Other'],
  matrix: [
    [48, 1, 1, 0, 0],
    [0, 45, 0, 1, 2],
    [2, 0, 43, 0, 1],
    [0, 0, 0, 47, 1],
    [1, 2, 2, 1, 46]
  ]
};

export const categoriesList = [
  'Information-Technology', 'HR', 'Designer', 'Teacher', 'Advocate', 'Business-Development',
  'Healthcare', 'Fitness', 'Agriculture', 'BPO', 'Sales', 'Consultant', 'Digital-Media',
  'Automobile', 'Chef', 'Finance', 'Apparel', 'Engineering', 'Accountant', 'Construction',
  'Public-Relations', 'Banking', 'Arts', 'Aviation'
];
