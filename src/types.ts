/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Candidate {
  id: string; // matches filename format
  name: string;
  email: string;
  phone: string;
  category: string; // Target category out of the 24 listed
  skills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  compatScores: { [jobId: string]: number }; // Cosine similarity with different jobs
  semanticOverlap: { [jobId: string]: { strength: number; matches: string[]; semanticOnly: string[] } };
  relevanceStatus: 'highly_relevant' | 'relevant' | 'unrelated';
  uploadedAt: string;
  processTimeMs: number;
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  requirements: string[];
  descriptionText: string;
}

export interface ModelMetric {
  accuracy: number;
  avgProcessTimeSec: number;
  sbertF1: number;
  tfidfF1: number;
  ndcgScore: number;
  mapScore: number;
}
