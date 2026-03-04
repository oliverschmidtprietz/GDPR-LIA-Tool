import React from 'react';
import { X, Shield } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface PrivacyModalProps {
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  const containerRef = useFocusTrap(onClose);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 print:hidden">
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col border border-gray-200"
      >
        <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-brand-lime p-2 rounded-lg">
              <Shield className="w-5 h-5 text-brand-black" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-xl font-bold text-brand-black">Privacy Notice</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-limeText">Data Protection Information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close privacy notice">
            <X className="w-6 h-6 text-brand-black" />
          </button>
        </div>

        <div className="p-8 space-y-8 text-sm text-gray-600 leading-relaxed">

          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">Controller</h3>
            <p>
              This tool is provided by OneZero Legal. For contact details, please visit{' '}
              <a href="https://onezero.legal/contact" target="_blank" rel="noopener noreferrer" className="text-brand-limeText font-semibold hover:underline">
                onezero.legal/contact
              </a>.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">What data we process</h3>
            <p className="mb-2">We only process technically necessary data:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-brand-black">Server logs</strong> — Your IP address, browser/user-agent string, and timestamps are processed by our hosting provider (Hostinger) for security and operational purposes.
              </li>
              <li>
                <strong className="text-brand-black">localStorage (client-side only)</strong> — Your form data is auto-saved in your browser for session recovery. This data is never transmitted to our server and can be cleared by you at any time.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">AI processing</h3>
            <p>When you click "Suggest" or "Analyze":</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>The contents of the relevant form fields are sent to our server, which forwards them to the Google Gemini API for processing.</li>
              <li>Data is not stored on our server; it is passed through in real-time.</li>
              <li>Google's Gemini API processes the data under Google's terms of service. We do not persistently store your data.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">No cookies, no tracking</h3>
            <p>This application sets no cookies, uses no analytics services, and employs no third-party tracking.</p>
          </section>

          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">No personal data intended</h3>
            <p>
              The form fields are designed for organizational and legal assessment content, not personal data. Please avoid entering personal or sensitive data into the form fields.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">Legal basis</h3>
            <p>
              Server log processing is based on Art. 6(1)(f) GDPR (legitimate interest in providing the tool's functionality and ensuring security). AI processing is initiated by the user on demand.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">Your rights</h3>
            <p className="mb-2">Under the GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your personal data (Art. 15)</li>
              <li>Rectification of inaccurate data (Art. 16)</li>
              <li>Erasure of your data (Art. 17)</li>
              <li>Restriction of processing (Art. 18)</li>
              <li>Data portability (Art. 20)</li>
              <li>Object to processing (Art. 21)</li>
              <li>Lodge a complaint with a supervisory authority (Art. 77)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">Contact</h3>
            <p>
              For any data protection inquiries, please reach out via{' '}
              <a href="https://onezero.legal/contact" target="_blank" rel="noopener noreferrer" className="text-brand-limeText font-semibold hover:underline">
                onezero.legal/contact
              </a>.
            </p>
          </section>

        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center rounded-b-3xl">
          <button onClick={onClose} className="bg-brand-black text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 rounded-full shadow-lg shadow-black/10">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
