import React from 'react';
import { X, HelpCircle } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface FAQModalProps {
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ onClose }) => {
  const containerRef = useFocusTrap(onClose);

  const faqs = [
    {
      q: "When should I conduct an LIA?",
      a: "You should conduct a Legitimate Interest Assessment (LIA) BEFORE you start processing personal data where you intend to rely on Art. 6(1)(f) GDPR as your lawful basis. It acts as your justification document."
    },
    {
      q: "Can I use Art. 6(1)(f) for Sensitive Data (Art. 9)?",
      a: "Generally, no. Article 9 (Special Categories of Data like health, biometrics, political opinions) requires a separate specific exception (e.g., explicit consent). A legitimate interest under Art. 6 is usually insufficient to process special category data without meeting an Art. 9 condition."
    },
    {
      q: "Does 'Legitimate Interest' mean 'Commercial Interest'?",
      a: "It can, but it is broader. It includes commercial interests, individual interests, and broader societal benefits (e.g., freedom of expression, internet security, fraud prevention). However, vaguely defined interests like 'profit maximization' without specific context are often rejected by DPAs."
    },
    {
      q: "What if the assessment result is negative?",
      a: "If the Balancing Test (Phase 3) shows that the rights of individuals override your interests, you CANNOT rely on Art. 6(1)(f). You must either stop the processing, modify it (to reduce impact), or find another legal basis (like Consent)."
    },
    {
      q: "Do I need to show this to the Data Subject?",
      a: "You must inform data subjects that you are relying on legitimate interests (Art. 13/14 GDPR). They also have the right to object (Art. 21). While you don't necessarily have to publish the full LIA, you must be able to provide the 'essence' of the balancing test if requested or challenged."
    },
    {
      q: "Is direct marketing a valid legitimate interest?",
      a: "Yes, Recital 47 GDPR explicitly states that 'The processing of personal data for direct marketing purposes may be regarded as carried out for a legitimate interest.' However, the balancing test still applies, and the unconditional right to object (opt-out) remains."
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 print:hidden">
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-modal-title"
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col border border-gray-200"
      >
        <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-brand-lime p-2 rounded-lg">
              <HelpCircle className="w-5 h-5 text-brand-black" />
            </div>
            <div>
              <h2 id="faq-modal-title" className="text-xl font-bold text-brand-black">FAQ</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-limeText">Frequently Asked Questions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close FAQ">
            <X className="w-6 h-6 text-brand-black" />
          </button>
        </div>

        <div className="p-8 space-y-2">
          {faqs.map((item, idx) => (
            <div key={idx} className="border-b border-gray-100 last:border-0 pb-6 mb-6 last:mb-0 last:pb-0">
              <h4 className="text-base font-bold text-brand-black mb-2 flex items-start gap-2">
                <span className="text-brand-limeText mt-0.5">&bull;</span>
                {item.q}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed pl-4">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center rounded-b-3xl">
          <button onClick={onClose} className="bg-brand-black text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 rounded-full shadow-lg shadow-black/10">
            Close FAQ
          </button>
        </div>
      </div>
    </div>
  );
};
