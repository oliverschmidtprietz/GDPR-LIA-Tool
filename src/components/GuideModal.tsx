import React from 'react';
import { X, Scale, AlertTriangle, Wand2, FileText } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  const containerRef = useFocusTrap(onClose);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 print:hidden">
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col border border-gray-200"
      >
        <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <h2 id="guide-modal-title" className="text-2xl font-bold tracking-tight text-brand-black">LIA User Guide</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-limeText">AI-powered LIA Tool aligned with EDPB Guidelines 1/2024</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close guide">
            <X className="w-6 h-6 text-brand-black" />
          </button>
        </div>

        <div className="p-8 space-y-12">

          <section>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-l-4 border-brand-lime pl-4 text-brand-black">The Legal Basis: Art. 6(1)(f) GDPR</h3>
            <p className="text-lg leading-relaxed text-gray-600 font-light mb-4">
              Article 6(1)(f) GDPR allows data processing when necessary for legitimate interests, provided they are not overridden by the data subject's rights. It serves as a legal basis that requires a careful, documented assessment to ensure that the processing is strictly necessary for a real and present interest and does not disproportionately impact individuals. The controller bears the burden of proving that these conditions are met before processing begins. This tool follows the strict interpretation of the <a href="https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-brand-limeText hover:underline font-bold">EDPB Guidelines 1/2024 on processing of personal data based on Article 6(1)(f) GDPR, Version 1.0, Adopted on 8 October 2024</a>.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 border-l-4 border-brand-lime pl-4 text-brand-black">The 3-Step Cumulative Test</h3>
            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="bg-brand-black text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg mb-4">1</div>
                <h4 className="font-bold text-lg mb-2 text-brand-black">Legitimate Interest</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The interest must be <strong>lawful</strong> (not contrary to EU or Member State law), <strong>clearly and precisely articulated</strong>, and <strong>"Real and Present"</strong> (not hypothetical) <span className="text-brand-limeText font-bold text-xs">(EDPB Guidelines 1/2024, para. 14-27)</span>.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="bg-brand-black text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg mb-4">2</div>
                <h4 className="font-bold text-lg mb-2 text-brand-black">Necessity</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Processing must be <strong>strictly necessary</strong>, not just "useful" or "cheaper". If a less intrusive method exists, you must use it <span className="text-brand-limeText font-bold text-xs">(EDPB Guidelines 1/2024, para. 28-30)</span>.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="bg-brand-black text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg mb-4">3</div>
                <h4 className="font-bold text-lg mb-2 text-brand-black">Balancing</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The legitimate interest must not be overridden by the interests or fundamental rights and freedoms of the data subject. You must analyze and document this by considering the <strong>impact</strong> on data subjects, their <strong>reasonable expectations</strong>, and finally <strong>balancing opposing rights</strong> and interests, including the possibility of further mitigating measures <span className="text-brand-limeText font-bold text-xs">(EDPB Guidelines 1/2024, para. 31-54)</span>.
                </p>
              </div>

            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-l-4 border-brand-lime pl-4 text-brand-black">AI Development & Deployment (EDPB Opinion 28/2024)</h3>
            <p className="text-lg leading-relaxed text-gray-600 font-light mb-4">
              This tool also incorporates the <a href="https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-brand-limeText hover:underline font-bold">EDPB Opinion 28/2024</a> to help controllers demonstrate the appropriateness of legitimate interest in AI contexts:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-3 text-gray-600 font-light leading-relaxed">
              <li>
                <strong className="text-brand-black font-medium">Development Phase (Training):</strong> Controllers must justify why training on personal data is strictly necessary and why synthetic or anonymized data cannot be used instead. For data collected via web scraping, the balancing test must account for the fact that users generally do not expect their public posts to be used for AI training.
              </li>
              <li>
                <strong className="text-brand-black font-medium">Deployment Phase:</strong> Specific risks such as hallucinations (accuracy), bias, and re-identification must be assessed.
              </li>
              <li>
                <strong className="text-brand-black font-medium">Safeguards:</strong> Appropriateness can be demonstrated through measures like privacy-enhancing technologies (PETs), filters to prevent data ingestion, and providing unconditional opt-out mechanisms.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 border-l-4 border-brand-lime pl-4 text-brand-black">AI Auditor Integration</h3>

            <div className="space-y-8 text-gray-600 font-light leading-relaxed">
              <p>
                This tool acts as a specialized assistant to help you document your legitimate interest assessment efficiently and compliantly. It leverages artificial intelligence to provide real-time guidance based on the complex regulatory framework of the GDPR.
              </p>

              <div>
                <h4 className="font-bold text-brand-black text-lg mb-2 flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-brand-limeText" />
                  Using the "Draft with AI" Features
                </h4>
                <p className="mb-3">
                  Next to the input fields, you will find <strong>AI Assistant buttons</strong>. These are designed to help you formulate your answers. When clicked, the AI analyzes your previous entries and suggests a draft response that uses specific legal terminology expected by the EDPB Guidelines (e.g., correctly articulating a "real and present" interest or defining "strict necessity").
                </p>
                <p className="mb-3">
                  The logic goes beyond simple text generation: If your inputs indicate that you are developing or deploying AI models, the assistant automatically incorporates the specific requirements of <strong>EDPB Opinion 28/2024</strong> into its suggestions, prompting you to consider factors like data scraping risks or model hallucinations.
                </p>
                <p className="font-medium text-brand-black bg-gray-50 p-3 rounded-lg border-l-2 border-brand-lime">
                  <strong>Important:</strong> When using the "Draft with AI" feature, you must always double-check whether the proposed wording, including the proposed circumstances, actually applies in the case under review.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-brand-black text-lg mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-limeText" />
                  AI Compliance Analysis (Phase 5)
                </h4>
                <p className="mb-3">
                  Once you reach the <strong>Final Conclusion</strong> section, the tool performs a comprehensive "AI Compliance Analysis". This acts as a simulated audit of your documentation before you finalize it. The analysis is structured into:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 mb-3">
                  <li><strong>Compliance Check:</strong> An evaluation of whether your arguments meet the 3-step test criteria.</li>
                  <li><strong>Key Risks Identified:</strong> Highlights of potential weaknesses or missing safeguards.</li>
                  <li><strong>Recommendations:</strong> Concrete steps to improve the assessment's defensibility.</li>
                </ul>
                <p>
                  This feedback loop helps you identify gaps—such as a vague interest definition or insufficient safeguards—allowing you to refine the assessment immediately.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-brand-black text-lg mb-2 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brand-limeText" />
                  Decision Making & Responsibility
                </h4>
                <p className="mb-3">
                  While this tool leverages AI for efficiency and guidance, <strong>the final decision rests with you</strong>. You must evaluate the AI's suggestions and decide whether the data processing is permissible under Art. 6(1)(f) GDPR after weighing all relevant circumstances.
                </p>
                <p className="mb-3">
                  It is a perfectly valid outcome to conclude that a decision cannot yet be made ("UNCERTAIN"). This indicates that further consultation with your Data Protection Officer (DPO) is necessary, or that additional mitigating measures must be implemented. Even in this case, the documentation generated by this tool serves as a valuable record of your diligence and the steps taken so far.
                </p>
                <p className="italic text-sm text-gray-500 border-t border-gray-100 pt-3 mt-3">
                  Note: This tool is intended to assist with documentation and consideration in the context of determining whether a given processing of personal data may be based on Article 6(1)(f) GDPR. It does not replace legal advice or the formal decision-making authority of the controller.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border-l-4 border-orange-400 shadow-sm flex gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-orange-800 text-xs uppercase tracking-widest mb-1">Disclaimer</h5>
                  <p className="text-xs text-orange-900/80 font-medium leading-relaxed">
                    The AI analysis is an automated assessment or guidance based on EDPB guidelines. The AI-generated content might be incorrect or incomplete, and should in any case be reviewed by a legal professional or the Data Protection Officer before use.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center rounded-b-3xl">
          <button onClick={onClose} className="bg-brand-black text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 rounded-full shadow-lg shadow-black/10">
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
