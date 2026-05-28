/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Loader2, 
  CheckCircle, 
  Compass, 
  X, 
  Check, 
  Sparkles, 
  Mail, 
  Phone, 
  GraduationCap, 
  Clock
} from 'lucide-react';
import { Candidate } from './types';
import { initialCandidates, mockJobs } from './data/mockCandidates';

export default function App() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStatus, setAnalyzingStatus] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Simulate real-time SBERT transformer classification
  const processFile = (file: File) => {
    setIsAnalyzing(true);
    setAnalyzingStatus('Extracting CV content from document...');
    
    setTimeout(() => {
      setAnalyzingStatus('SBERT Workflow: Tokenizing & cleaning word lists...');
      
      setTimeout(() => {
        setAnalyzingStatus('Neural Encoding: Generating 384-dimensional SBERT embeddings...');
        
        setTimeout(() => {
          setAnalyzingStatus('Cosine Similarity: Mapping semantic similarity scores...');
          
          setTimeout(() => {
            const nameWithoutExt = file.name.split('.')[0] || 'New Candidate';
            const cleanName = nameWithoutExt
              .replace(/[-_]/g, ' ')
              .replace(/\b\w/g, c => c.toUpperCase());
            
            const lowerFileName = file.name.toLowerCase();
            let predictedCategory = 'Digital-Media';
            let mockSkills = ['Marketing Strategy', 'Brand Management', 'Copywriting', 'SEO Optimize', 'Data Analytics'];
            
            if (lowerFileName.includes('it') || lowerFileName.includes('tech') || lowerFileName.includes('code') || lowerFileName.includes('developer') || lowerFileName.includes('system') || lowerFileName.includes('programmer')) {
              predictedCategory = 'Information-Technology';
              mockSkills = ['React', 'TypeScript', 'Node.js', 'System Architecture', 'AWS Cloud', 'Information Security'];
            } else if (lowerFileName.includes('hr') || lowerFileName.includes('people') || lowerFileName.includes('recruit') || lowerFileName.includes('talent') || lowerFileName.includes('sdm')) {
              predictedCategory = 'HR';
              mockSkills = ['Strategic HR Management', 'Applicant Tracking Systems (ATS)', 'Conflict Resolution', 'Employee Relations'];
            } else if (lowerFileName.includes('design') || lowerFileName.includes('ui') || lowerFileName.includes('ux') || lowerFileName.includes('figma') || lowerFileName.includes('visual')) {
              predictedCategory = 'Designer';
              mockSkills = ['Figma Layouts', 'Design System Architecture', 'Typography Pairing', 'Interactive Click-Throughs'];
            } else if (lowerFileName.includes('finance') || lowerFileName.includes('economy') || lowerFileName.includes('audit') || lowerFileName.includes('tax') || lowerFileName.includes('account')) {
              predictedCategory = 'Finance';
              mockSkills = ['Corporate Finance', 'Fiscal Auditing', 'Macroeconomics Forecasts', 'Investment Appraisals'];
            }

            // Generate representative scores
            const compatScores: { [key: string]: number } = {
              'job-it': predictedCategory === 'Information-Technology' ? 0.892 : (predictedCategory === 'Designer' ? 0.440 : 0.220),
              'job-hr': predictedCategory === 'HR' ? 0.931 : 0.280,
              'job-design': predictedCategory === 'Designer' ? 0.885 : (predictedCategory === 'Information-Technology' ? 0.420 : 0.310),
              'job-finance': predictedCategory === 'Finance' ? 0.912 : 0.240,
            };

            const highestScore = Math.max(...(Object.values(compatScores) as number[]));
            const status = highestScore >= 0.80 
              ? 'highly_relevant' 
              : (highestScore >= 0.65 ? 'relevant' : 'unrelated');

            const newCandidate: Candidate = {
              id: `CV_${Math.floor(10000 + Math.random() * 90000)}_${cleanName.replace(/\s+/g, '')}`,
              name: cleanName,
              email: `${cleanName.toLowerCase().replace(/\s+/g, '.')}@candidate-pool.com`,
              phone: `+62 8${Math.floor(100000000 + Math.random() * 900000000)}`,
              category: predictedCategory,
              skills: mockSkills,
              experience: [
                {
                  role: `${predictedCategory} Specialist`,
                  company: 'Digital Innovation Corp',
                  duration: '2023 - Present',
                  description: 'Aligning database schemas, optimizing recruitment workflows, and validating model prediction outputs.'
                }
              ],
              education: {
                degree: `Bachelor's Degree in ${predictedCategory === 'Information-Technology' ? 'Information Systems / IT' : predictedCategory}`,
                institution: 'Bina Nusantara University',
                year: '2024'
              },
              compatScores: compatScores,
              semanticOverlap: {
                'job-it': {
                  strength: compatScores['job-it'],
                  matches: predictedCategory === 'Information-Technology' ? ['Systems Engineering'] : [],
                  semanticOnly: predictedCategory === 'Information-Technology' ? ['Information Systems => Information Technology Link'] : []
                },
                'job-hr': {
                  strength: compatScores['job-hr'],
                  matches: predictedCategory === 'HR' ? ['Strategic Recruitment'] : [],
                  semanticOnly: predictedCategory === 'HR' ? ['Recruiter Coordinator => HR Management Overlap'] : []
                },
                'job-design': {
                  strength: compatScores['job-design'],
                  matches: predictedCategory === 'Designer' ? ['Figma Design'] : [],
                  semanticOnly: predictedCategory === 'Designer' ? ['Visual Layouts => Responsive Typography alignment'] : []
                },
                'job-finance': {
                  strength: compatScores['job-finance'],
                  matches: predictedCategory === 'Finance' ? ['Fiscal Auditing'] : [],
                  semanticOnly: predictedCategory === 'Finance' ? ['Economics analysis => Corporate Finance balance sheets'] : []
                }
              },
              relevanceStatus: status,
              uploadedAt: new Date().toISOString(),
              processTimeMs: Math.floor(1100 + Math.random() * 500)
            };

            setSelectedCandidate(newCandidate);
            setIsAnalyzing(false);
          }, 600);
        }, 500);
      }, 500);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#181e2b] text-[#e2e8f0] relative flex flex-col justify-between selection:bg-yellow-400/20 selection:text-yellow-200 antialiased font-sans">
      
      {/* Background Soft Yellow-Gold Ambient Glows */}
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-yellow-400/[0.035] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-yellow-400/[0.025] blur-[120px] rounded-full pointer-events-none" />

      {/* Header / Brand */}
      <header className="border-b border-slate-700 bg-[#212a3d]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 flex items-center justify-center p-0.5 shadow-lg shadow-yellow-400/10">
              <div className="w-full h-full bg-[#1b2230] rounded-[7px] flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white font-sans">
                SBERT CV Classifier
              </h1>
              <p className="text-[11px] text-slate-300 font-mono">
                Sentence-Transformers Automated CV Classification
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main 2-Column Dashboard - aligned items-stretch to ensure vertical levelling */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Parsed Paper CV (Document Viewer) & Uploader directly below - occupies 7 columns */}
        <section id="input-column" className="lg:col-span-7 flex flex-col h-full gap-4">
          <div className="flex flex-col h-[52px] justify-center">
            <h2 className="text-base font-bold text-white tracking-tight font-sans flex items-center gap-2">
              SBERT CV Parser &amp; Document Viewer
            </h2>
            <p className="text-xs text-slate-400">
              Pristine document layout generated after SBERT contextual text extraction.
            </p>
          </div>

          {/* DOCUMENT PREVIEW WORKSPACE */}
          <div className="bg-[#1f2636] border border-slate-700/60 rounded-xl p-6 md:p-7 shadow-xl relative backdrop-blur-md flex flex-col justify-between min-h-[480px] flex-1">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700/50 pb-3">
              <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider font-semibold">
                Parsed Document view
              </span>
              {selectedCandidate && (
                <span className="text-[10px] font-mono text-slate-400">
                  ID: {selectedCandidate.id}
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {selectedCandidate ? (
                /* WHITE INTERACTIVE DOCUMENT PAPER VIEW */
                <div className="bg-white text-slate-900 rounded-lg shadow-2xl p-5 sm:p-7 border border-slate-300 relative overflow-hidden font-sans transition-all duration-300 animate-fade-in flex-1 flex flex-col justify-between m-1 sm:m-2.5">
                  <div>
                    {/* Subtle PDF Page Header Indicator */}
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-6 text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                      <span>Digital Resume Document</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold font-mono">Parsed Preview</span>
                    </div>

                    {/* Candidate Primary Title Header inside the paper */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                        {selectedCandidate.name}
                      </h3>
                      
                      {/* Contact details */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                        <span className="flex items-center gap-1">📍 Singapore / Remote</span>
                        <span>•</span>
                        <span>📧 {selectedCandidate.email}</span>
                        <span>•</span>
                        <span>📞 {selectedCandidate.phone}</span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                        <span className="px-2 py-1 bg-slate-900 text-white rounded text-[9px] uppercase font-mono tracking-wider font-semibold">
                          SBERT Category Tag: {selectedCandidate.category}
                        </span>
                      </div>
                    </div>

                    {/* Grid details inside printed sheet */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Education */}
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase font-extrabold text-slate-900 tracking-wider border-b border-slate-200 pb-1">
                          Academic Education
                        </h4>
                        <p className="text-sm font-bold text-slate-900">
                          {selectedCandidate.education.degree}
                        </p>
                        <p className="text-xs text-slate-600">
                          {selectedCandidate.education.institution}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400 font-medium select-none">
                          Graduation Year: {selectedCandidate.education.year}
                        </p>
                      </div>

                      {/* Competence & Skills */}
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase font-extrabold text-slate-900 tracking-wider border-b border-slate-200 pb-1">
                          Core Professional Skills
                        </h4>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {selectedCandidate.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-0.5 bg-slate-100 text-slate-800 font-medium text-[10px] rounded border border-slate-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Printed Experience list inside resume */}
                    {selectedCandidate.experience && selectedCandidate.experience.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-slate-200">
                        <h4 className="text-xs uppercase font-extrabold text-slate-900 tracking-wider pb-2">
                          Professional Employment History
                        </h4>
                        <div className="space-y-4">
                          {selectedCandidate.experience.map((exp, idx) => (
                            <div key={idx} className="text-xs text-slate-700">
                              <div className="flex justify-between items-start gap-2 flex-wrap">
                                <span className="font-extrabold text-slate-900 text-sm">{exp.role}</span>
                                <span className="text-[10px] text-slate-500 font-mono font-semibold whitespace-nowrap">{exp.duration}</span>
                              </div>
                              <p className="text-amber-700 font-semibold text-xs mt-0.5">{exp.company}</p>
                              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stamp signature mock */}
                  <div className="mt-8 flex justify-end">
                    <div className="text-center p-2 border-2 border-slate-300 border-dashed rounded font-mono text-[9px] text-slate-400 uppercase tracking-widest leading-none rotate-2 select-none">
                      SBERT MAPPED DOCUMENT<br />
                      <span className="text-slate-500 text-[8px] font-bold">BATCH REF: {selectedCandidate.id.split('_')[1] || 'SBERT_PRED'}</span>
                    </div>
                  </div>

                </div>
              ) : (
                /* BLACK/DARK INTERACTIVE WORKSPACE VIEW WHEN EMPTY */
                <div className="bg-[#121824] text-[#cbd5e1] rounded-lg shadow-xl p-8 border border-slate-700/45 border-dashed min-h-[380px] flex flex-col justify-center items-center text-center transition-all duration-300 relative overflow-hidden flex-1 m-1 sm:m-2.5">
                  <div className="absolute top-[5%] right-[5%] text-[9px] font-mono text-slate-500 select-none uppercase tracking-widest border border-slate-800 px-2 py-0.5 rounded">
                    Awaiting Upload
                  </div>
                  
                  <div className="w-16 h-16 rounded-full bg-[#161d2b] border border-[#212a3d] flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-slate-500 animate-pulse" />
                  </div>
                  
                  <h3 className="text-sm font-bold text-slate-200 tracking-tight">No Active CV Loaded</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed mx-auto">
                    The semantic similarity comparison is idle. Select or drag & drop a PDF, TXT, or DOCX resume document using the control bar below to check real-time SBERT contextual representation alignment.
                  </p>

                  {/* Quick-select templates with all member names fully removed */}
                  <div className="mt-8 pt-6 border-t border-[#212a3d] w-full">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">
                      Or test similarity model immediately with a custom sample CV:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {initialCandidates.map((c) => {
                        let label = 'CV Template';
                        if (c.category === 'Information-Technology') label = 'IT Systems Architect';
                        else if (c.category === 'HR') label = 'Talent Acquisition Lead';
                        else if (c.category === 'Designer') label = 'UI/UX Designer';
                        else if (c.category === 'Finance') label = 'Financial Auditor';
                        
                        return (
                          <button
                            key={c.id}
                            onClick={() => setSelectedCandidate(c)}
                            style={{ contentVisibility: 'auto' }}
                            className="px-3 py-1.5 text-[11px] border border-slate-700 hover:border-yellow-400/40 bg-[#161d2b] hover:bg-[#212a3d] text-slate-300 hover:text-white rounded transition font-medium cursor-pointer font-sans shadow-sm"
                          >
                            📄 {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SBERT Processing overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-[#121824]/98 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center border border-yellow-400/20 shadow-2xl animate-fade-in z-20 font-sans">
                <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mb-3.5" />
                <h4 className="text-sm font-semibold text-slate-200">SBERT Model Processing</h4>
                <p className="text-[10px] text-yellow-400 font-mono mt-2 text-center bg-yellow-400/5 px-3 py-1.5 rounded border border-yellow-400/10 max-w-md">
                  {analyzingStatus}
                </p>
                <span className="text-[8px] text-slate-500 mt-4 italic uppercase tracking-wider font-mono">Mapping Softmax Embeddings</span>
              </div>
            )}

            {selectedCandidate && (
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-xs text-yellow-400/80 hover:text-yellow-400 font-medium flex items-center gap-1.5 self-end transition mt-3 font-mono cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Reset Document View
              </button>
            )}
          </div>

          {/* ACTION BUTTON DIRECTLY BELOW THE PREVIEW CONTAINER */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#212a3d]/40 border border-slate-700/40 rounded-xl p-4 shadow-xl backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                <Upload className="w-3.5 h-3.5 text-yellow-405 text-yellow-400" />
                SBERT Model Upload Pipeline
              </span>
              <p className="text-[10px] text-slate-400 max-w-xs md:max-w-md">
                Select PDF, TXT, or DOCX documents. Tensor embedding vectors are computed instantly on choice.
              </p>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.txt,.doc,.docx"
              />
              <button
                type="button"
                onClick={triggerUploadClick}
                disabled={isAnalyzing}
                className="relative px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-300 hover:to-yellow-450 hover:shadow-lg hover:shadow-yellow-400/20 active:scale-95 transition-all duration-200 flex items-center gap-2 font-mono disabled:opacity-50 select-none cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 text-slate-950" />
                    Upload Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Classification Results ONLY - occupies 5 columns */}
        <section id="results-column" className="lg:col-span-5 flex flex-col h-full gap-4">
          <div className="flex flex-col h-[52px] justify-center">
            <h2 className="text-base font-bold text-white tracking-tight font-sans flex items-center gap-2">
              SBERT Classification Results
            </h2>
            <p className="text-xs text-slate-400">
              Computed cosine similarity scores and job matches analyzed by the model.
            </p>
          </div>

          <div className="bg-[#1f2636] border border-slate-700/60 rounded-xl p-6 md:p-7 shadow-xl relative overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[480px] flex-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/[0.015] blur-[100px] pointer-events-none rounded-full" />

            <div className="space-y-6 flex-1 flex flex-col justify-between">
              
              {/* === SIMILARITY SCORES LIST === */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-yellow-400" />
                    SBERT Similarity Scores
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Mapped semantic affinity distance with predefined target job domains.
                  </p>
                </div>

                <div className="space-y-3 font-sans">
                  {mockJobs.map((job) => {
                    const score = selectedCandidate ? (selectedCandidate.compatScores[job.id] || 0) : 0;
                    const isTargetDept = selectedCandidate ? (selectedCandidate.category.toLowerCase() === job.department.toLowerCase()) : false;
                    
                    let barColor = 'bg-slate-700/60';
                    let textClass = 'text-slate-500 font-mono';
                    
                    if (selectedCandidate) {
                      barColor = 'bg-yellow-400';
                      textClass = 'text-yellow-400 font-bold font-mono';
                    }

                    return (
                      <div key={job.id} className="bg-[#1b2230]/75 p-3.5 rounded-lg border border-slate-700/50 flex flex-col justify-between transition-all duration-300">
                        <div className="flex justify-between items-center text-xs mb-2">
                           <div className="flex items-center gap-1.5">
                             <span className="font-semibold text-slate-200">{job.title}</span>
                             <span className="text-[9px] font-mono text-slate-400 bg-[#161e2b] px-1.5 py-0.5 rounded border border-slate-700/40">
                               {job.department}
                             </span>
                           </div>
                           <span className={textClass}>{score.toFixed(3)}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-full bg-[#141a24] rounded-full overflow-hidden border border-slate-800">
                            <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${score * 100}%` }} />
                          </div>
                          
                          {isTargetDept && score > 0 && (
                            <span className="text-[8px] bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 px-1.5 py-0.5 rounded uppercase font-mono tracking-wider font-semibold whitespace-nowrap">
                              Best Match
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Info panel when empty */}
              {!selectedCandidate && (
                <div className="bg-[#1b2230]/40 border border-slate-700/40 p-4 rounded-lg text-center font-sans space-y-1 my-auto">
                  <p className="text-xs text-slate-400 font-medium">Embedding Vector Mappings Idle</p>
                  <p className="text-[10px]/relaxed text-slate-500">
                    Awaiting document analysis embedding to calculate cosine distance.
                  </p>
                </div>
              )}

            </div>

            {/* Bottom Recommendation badge */}
            <div className="mt-8 pt-4 border-t border-slate-700/60 flex items-center justify-between gap-4 font-sans">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider select-none">
                Decision recommendation
              </span>

              <div className="flex items-center gap-2">
                {!selectedCandidate ? (
                  <span className="flex items-center gap-1.5 bg-slate-800/40 border border-slate-700 text-slate-400 px-3 py-1 text-xs font-semibold rounded font-mono uppercase tracking-wider select-none">
                    AWAITING UPLOAD
                  </span>
                ) : selectedCandidate.relevanceStatus === 'highly_relevant' ? (
                  <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 text-xs font-bold rounded font-sans uppercase tracking-wider">
                    <Check className="w-3.5 h-3.5" />
                    HIGHLY RECOMMENDED
                  </span>
                ) : selectedCandidate.relevanceStatus === 'relevant' ? (
                  <span className="flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-3 py-1 text-xs font-bold rounded font-sans uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    RELEVANT
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-450 px-3 py-1 text-xs font-bold rounded font-sans uppercase tracking-wider">
                    <X className="w-3.5 h-3.5" />
                    UNRELATED
                  </span>
                )}
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Styled Footer - Member Names removed */}
      <footer className="border-t border-slate-700 bg-[#212a3d]/40 py-6 text-center text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <p className="font-mono text-[10px]/relaxed text-slate-400">
            SBERT all-MiniLM-L6-v2 Semantic Core
          </p>
          <p className="text-[11px]">
            SBERT CV Classifier Dashboard
          </p>
        </div>
      </footer>

    </div>
  );
}
