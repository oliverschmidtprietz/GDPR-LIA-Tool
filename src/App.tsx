import React, { useState, useRef } from 'react';
import { Layout } from './components/ui/Layout';
import { Wizard } from './components/Wizard';
import { Report } from './components/Report';
import { GuideModal } from './components/GuideModal';
import { FAQModal } from './components/FAQModal';
import { PrivacyModal } from './components/PrivacyModal';
import { useTypingAnimation } from './hooks/useTypingAnimation';
import { LIAData } from './types';
import { AlertTriangle } from 'lucide-react';

function App() {
  const [view, setView] = useState<'wizard' | 'report'>('wizard');
  const [data, setData] = useState<LIAData>({});
  const [showGuide, setShowGuide] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const wizardRef = useRef<HTMLDivElement>(null);
  const typing = useTypingAnimation();

  const handleComplete = (completedData: LIAData) => {
    setData(completedData);
    setView('report');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToWizard = () => {
    if (wizardRef.current) {
      wizardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Layout
      onOpenGuide={() => setShowGuide(true)}
      onOpenFAQ={() => setShowFAQ(true)}
      onOpenPrivacy={() => setShowPrivacy(true)}
    >
      {view === 'wizard' ? (
        <>
          {wizardStep === 0 && <div className="w-full relative mb-12 no-print overflow-hidden pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">

              {/* Badge Style */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full pl-1 pr-4 py-1 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <span className="bg-brand-lime text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                <span className="text-xs font-medium text-gray-500">Based on EDPB Guidelines 1/2024</span>
              </div>

              {/* Hero Title */}
              <h2
                className="text-5xl md:text-7xl font-bold text-brand-black mb-6 tracking-tight leading-[1.1]"
                aria-label="Legitimate Interest Assessment."
              >
                <span aria-hidden="true">
                  {typing.line1}
                  {typing.phase === 'line1' && typing.showCursor && (
                    <span className="inline-block w-[3px] h-[0.85em] bg-brand-black align-middle ml-0.5 animate-blink-cursor" />
                  )}
                  {(typing.phase !== 'line1' || typing.done) && <br />}
                  {typing.line2 && (
                    <span className="relative inline-block bg-brand-lime text-brand-black px-3 py-1 mt-3 rounded-lg">
                      {typing.line2}
                      {(typing.phase === 'line2' || typing.phase === 'linger') && typing.showCursor && (
                        <span className="inline-block w-[3px] h-[0.85em] bg-brand-black align-middle ml-0.5 animate-blink-cursor" />
                      )}
                    </span>
                  )}
                  {typing.done && <span className="text-gray-300">.</span>}
                </span>
              </h2>

              <p className="text-gray-500 text-lg md:text-xl font-normal max-w-2xl leading-relaxed mb-10">
                Conduct legitimate interest assessments under Art. 6(1)(f) GDPR and generate audit-ready documentation with AI-powered guidance and efficiency.*
              </p>

              <div className="flex gap-4">
                <button onClick={scrollToWizard} className="bg-brand-black text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                  Start Assessment
                </button>
                <button onClick={() => setShowGuide(true)} className="bg-white text-brand-black border border-gray-200 px-8 py-3.5 rounded-full font-medium hover:bg-gray-50 transition-all">
                  Read Guide
                </button>
              </div>
            </div>
          </div>}

          <div ref={wizardRef} className="w-full px-4 mb-32 relative z-10 max-w-6xl mx-auto">
            <Wizard onComplete={handleComplete} onStepChange={setWizardStep} />

            <div className="max-w-3xl mx-auto mt-12">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex gap-4 items-start">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h5 className="font-bold text-brand-black text-xs uppercase tracking-widest mb-1">* Disclaimer</h5>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-2">
                    The AI analysis is an automated assessment or guidance based on EDPB guidelines. The AI-generated content might be incorrect or incomplete, and should in any case be reviewed by a legal professional or the Data Protection Officer before use.
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Please do not enter personal data or sensitive information into the form fields. The controller name, address, and DPO contact details are optional. We do not store the data you enter for any purpose beyond your current session (client-side auto-save).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Report data={data} onEdit={() => setView('wizard')} />
      )}

      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
      {showFAQ && <FAQModal onClose={() => setShowFAQ(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </Layout>
  );
}

export default App;
