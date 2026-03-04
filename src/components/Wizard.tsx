import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SECTIONS } from '../constants';
import { LIAData, LIAQuestion, ComplianceAnalysis } from '../types';
import { ChevronLeft, Wand2, Loader2, FileCheck, BookOpen, AlertTriangle, ArrowRight, RefreshCw, ArchiveRestore, X, Check } from 'lucide-react';
import { getGeminiSuggestion, analyzeRisk } from '../services/geminiService';
import { useAutoSave } from '../hooks/useAutoSave';
import { AnalysisRenderer } from './AnalysisRenderer';

interface WizardProps {
  onComplete: (data: LIAData) => void;
  onStepChange?: (step: number) => void;
}

export const Wizard: React.FC<WizardProps> = ({ onComplete, onStepChange }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<LIAData>({
    date_of_assessment: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  });
  const [loadingAI, setLoadingAI] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [riskAnalysis, setRiskAnalysis] = useState<ComplianceAnalysis | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const cardRef = useRef<HTMLDivElement>(null);
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);

  // Auto-save hook
  const { showRecovery, restore, discard, clearSavedData, lastSaved } = useAutoSave(
    formData,
    currentStepIndex,
    setFormData,
    setCurrentStepIndex
  );

  const currentSection = SECTIONS[currentStepIndex];
  const isLastStep = currentStepIndex === SECTIONS.length - 1;

  const handleInputChange = (id: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear field error on change
    if (fieldErrors[id]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};
    for (const q of currentSection.questions) {
      if (q.required) {
        const val = formData[q.id];
        if (!val || (typeof val === 'string' && val.trim() === '')) {
          errors[q.id] = 'This field is required.';
        }
      }
    }
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Scroll to first error
      const firstErrorId = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    return true;
  };

  const scrollToCard = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStepIndex < SECTIONS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      // Use setTimeout to scroll after React re-render
      setTimeout(scrollToCard, 50);
    } else {
      clearSavedData();
      onComplete({
        ...formData,
        ai_compliance_analysis: riskAnalysis ? JSON.stringify(riskAnalysis) : ''
      });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setTimeout(scrollToCard, 50);
    }
  };

  const handleAIAssist = async (question: LIAQuestion) => {
    setLoadingAI(question.id);
    setAiError(null);
    const context = JSON.stringify(formData);
    const currentValue = (formData[question.id] as string) || '';

    try {
      const { suggestion } = await getGeminiSuggestion(context, question.question, currentValue);
      handleInputChange(question.id, suggestion);
    } catch {
      setAiError(question.id);
    }
    setLoadingAI(null);
  };

  // Fetch risk analysis with error handling
  const fetchAnalysis = useCallback(async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    try {
      const result = await analyzeRisk(formData);
      setRiskAnalysis(result);
    } catch {
      setAnalysisError('Failed to analyze assessment. Please check your connection and try again.');
    } finally {
      setAnalysisLoading(false);
    }
  }, [formData]);

  useEffect(() => {
    if (currentSection.id === 'conclusion' && !riskAnalysis && !analysisLoading && !analysisError) {
      fetchAnalysis();
    }
  }, [currentSection.id, riskAnalysis, analysisLoading, analysisError, fetchAnalysis]);

  // Clear stale risk analysis when user navigates away from conclusion
  useEffect(() => {
    if (currentSection.id !== 'conclusion' && riskAnalysis) {
      setRiskAnalysis(null);
      setAnalysisError(null);
    }
  }, [currentSection.id, riskAnalysis]);

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStepIndex);
  }, [currentStepIndex, onStepChange]);

  // Show saved indicator briefly when auto-save triggers
  useEffect(() => {
    if (!lastSaved) return;
    setShowSavedIndicator(true);
    const timer = setTimeout(() => setShowSavedIndicator(false), 2000);
    return () => clearTimeout(timer);
  }, [lastSaved]);

  const getDynamicHelperText = (q: LIAQuestion) => {
    const defaultText = q.helperText;

    if (q.id === 'processing_activity') {
      const activity = ((formData['processing_activity'] as string) || '').toLowerCase();
      const interest = ((formData['p1_description'] as string) || '').toLowerCase();
      const aiRegex = /\b(ai|artificial intelligence|machine learning|ml|llm|gpt|genai|generative ai|neural network|deep learning)\b/i;
      const isAI = aiRegex.test(activity) || aiRegex.test(interest);

      if (isAI) {
        return (
          <>
            {defaultText}
            <span className="block mt-2 pt-2 border-t border-gray-100 text-xs text-brand-black font-medium bg-brand-lime/20 p-2 rounded">
              <strong>AI/ML Context Detected (EDPB Opinion 28/2024):</strong><br/>
              Please ensure your description specifically addresses risks regarding the source of training data (e.g. web scraping vs. licensed data), model accuracy (hallucinations), and security risks (e.g. model inversion or membership inference).
            </span>
          </>
        );
      }
    }
    return defaultText;
  };

  const renderAnalysis = () => {
    if (analysisError) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 gap-4">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <span className="text-sm font-medium text-center max-w-md">{analysisError}</span>
          <button
            onClick={fetchAnalysis}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Analysis
          </button>
        </div>
      );
    }

    if (analysisLoading || !riskAnalysis) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-lime" />
          <span className="text-sm font-medium">Analyzing assessment data for compliance risks...</span>
        </div>
      );
    }

    return <AnalysisRenderer analysis={riskAnalysis} variant="wizard" />;
  };

  return (
    <div className="w-full" ref={cardRef}>

      {/* Recovery Banner */}
      {showRecovery && (
        <div className="bg-brand-lime/20 border border-brand-lime rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ArchiveRestore className="w-5 h-5 text-brand-black flex-shrink-0" />
            <span className="text-sm font-medium text-brand-black">Unsaved assessment found. Would you like to restore it?</span>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={restore}
              className="px-4 py-2 bg-brand-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Restore
            </button>
            <button
              onClick={discard}
              className="px-4 py-2 bg-white text-brand-black border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Card Container */}
      <div className="bg-white shadow-soft-xl rounded-3xl p-8 md:p-12 border border-white">

        {/* Header with Steps */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-brand-black text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Step {currentStepIndex + 1}</span>
              {currentSection.edpbReference && (
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Reference: {currentSection.edpbReference}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-brand-black tracking-tight">{currentSection.title}</h2>
            <p className="text-gray-500 mt-2 max-w-xl">{currentSection.description}</p>
          </div>

          {/* Step Indicators */}
          <div className="flex flex-col items-end gap-2 no-print">
            <div
              className="flex gap-1.5"
              role="progressbar"
              aria-valuenow={currentStepIndex + 1}
              aria-valuemin={1}
              aria-valuemax={SECTIONS.length}
              aria-label={`Step ${currentStepIndex + 1} of ${SECTIONS.length}`}
            >
              {SECTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStepIndex ? 'w-8 bg-brand-black' :
                    idx < currentStepIndex ? 'w-4 bg-brand-lime' : 'w-4 bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className={`flex items-center gap-1 text-xs text-gray-400 font-medium transition-opacity duration-300 ${showSavedIndicator ? 'opacity-100' : 'opacity-0'}`}>
              <Check className="w-3 h-3" />
              Saved
            </div>
          </div>
        </div>

        {/* Screen reader step announcement */}
        <div className="sr-only" aria-live="polite">
          Step {currentStepIndex + 1} of {SECTIONS.length}: {currentSection.title}
        </div>

        {/* Form Body */}
        <div className="mb-12">
          {/* Risk Analysis Special Section */}
          {currentSection.id === 'conclusion' && (
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-lime p-2 rounded-lg text-brand-black">
                  <Wand2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-brand-black">AI Compliance Analysis</h4>
              </div>
              {renderAnalysis()}
            </div>
          )}

          {currentSection.questions.map((q) => (
            <div key={q.id} className={`group ${q.spacing === 'tight' ? 'mb-8' : 'mb-12'}`}>
              <div className="flex justify-between items-baseline mb-3">
                <label htmlFor={q.id} className="block text-sm font-semibold text-brand-black uppercase tracking-wider">
                  {q.question}
                  {q.required && <span className="text-red-400 ml-1">*</span>}
                  {!q.required && <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">(optional)</span>}
                </label>
                {!q.disableAI && q.type === 'text' && (
                  <button
                    onClick={() => handleAIAssist(q)}
                    disabled={loadingAI === q.id}
                    className="text-[10px] font-bold uppercase tracking-widest text-brand-black flex items-center gap-2 transition-all bg-brand-lime hover:bg-brand-black hover:text-brand-lime border border-brand-lime hover:border-brand-black px-4 py-2 rounded-full shadow-sm hover:shadow-md active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    {loadingAI === q.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                    {loadingAI === q.id ? 'Drafting...' : 'Draft with AI'}
                  </button>
                )}
              </div>

              {q.helperText && (
                <p className="text-sm text-gray-500 mb-4 leading-relaxed max-w-3xl">
                  {getDynamicHelperText(q)}
                </p>
              )}

              <div className="relative">
                {q.type === 'text' && (
                  <div>
                    {q.componentType === 'input' ? (
                      <input
                        type="text"
                        id={q.id}
                        className={`w-full bg-white px-5 py-4 rounded-xl border transition-all text-sm text-brand-black font-medium placeholder-gray-300 shadow-sm ${
                          fieldErrors[q.id] ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black'
                        }`}
                        placeholder="Type here..."
                        value={(formData[q.id] as string) || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                      />
                    ) : (
                      <textarea
                        id={q.id}
                        rows={4}
                        className={`w-full bg-white px-5 py-4 rounded-xl border transition-all resize-none text-base text-brand-black font-medium placeholder-gray-300 shadow-sm ${
                          fieldErrors[q.id] ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black'
                        }`}
                        placeholder="Type here..."
                        value={(formData[q.id] as string) || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                      />
                    )}
                  </div>
                )}

                {q.type === 'select' && (
                  <div className="relative">
                    <select
                      id={q.id}
                      className={`w-full bg-white px-5 py-4 rounded-xl border transition-all appearance-none text-base text-brand-black font-medium cursor-pointer shadow-sm ${
                        fieldErrors[q.id] ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black'
                      }`}
                      value={(formData[q.id] as string) || ''}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                    >
                      <option value="">SELECT OPTION</option>
                      {q.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                )}

                {q.type === 'yesno' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleInputChange(q.id, 'Yes')}
                      className={`flex-1 py-4 px-6 rounded-xl font-bold uppercase tracking-widest transition-all shadow-sm ${
                        formData[q.id] === 'Yes'
                          ? 'bg-brand-black text-white ring-2 ring-brand-black'
                          : `bg-white border text-gray-500 hover:border-gray-300 ${fieldErrors[q.id] ? 'border-red-300' : 'border-gray-200'}`
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleInputChange(q.id, 'No')}
                      className={`flex-1 py-4 px-6 rounded-xl font-bold uppercase tracking-widest transition-all shadow-sm ${
                        formData[q.id] === 'No'
                          ? 'bg-brand-black text-white ring-2 ring-brand-black'
                          : `bg-white border text-gray-500 hover:border-gray-300 ${fieldErrors[q.id] ? 'border-red-300' : 'border-gray-200'}`
                      }`}
                    >
                      No
                    </button>
                  </div>
                )}
                {q.id === 'p1_lawfulness' && formData[q.id] === 'No' && (
                  <div className="mt-3 flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-700 font-medium">
                      If the interest is not lawful, Art. 6(1)(f) GDPR cannot serve as a legal basis. Consider whether this assessment should proceed.
                    </p>
                  </div>
                )}
              </div>

              {/* Field validation error */}
              {fieldErrors[q.id] && (
                <p className="mt-2 text-xs text-red-500 font-medium">{fieldErrors[q.id]}</p>
              )}

              {/* AI suggestion error — persistent with retry/dismiss */}
              {aiError === q.id && (
                <div className="mt-2 flex items-center gap-3 text-xs text-red-500 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                  <span className="flex-1">Failed to generate AI suggestion.</span>
                  <button
                    onClick={() => handleAIAssist(q)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold uppercase tracking-wider"
                  >
                    <RefreshCw className="w-3 h-3" /> Retry
                  </button>
                  <button
                    onClick={() => setAiError(null)}
                    className="flex items-center text-red-400 hover:text-red-600"
                    aria-label="Dismiss error"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors ${
              currentStepIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-brand-black hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="group flex items-center gap-2 px-8 py-3 bg-brand-black hover:bg-gray-800 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-black/20"
          >
            {isLastStep ? (
              <>
                Generate Report
                <FileCheck className="w-4 h-4" />
              </>
            ) : (
              <>
                Next Phase
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
