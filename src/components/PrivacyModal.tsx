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
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col border border-gray-200"
      >
        <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-brand-lime p-2 rounded-lg">
              <Shield className="w-5 h-5 text-brand-black" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-xl font-bold text-brand-black">Privacy Notice</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-limeText">Art. 13 GDPR</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close privacy notice">
            <X className="w-6 h-6 text-brand-black" />
          </button>
        </div>

        <div className="p-8 space-y-8 text-sm text-gray-600 leading-relaxed">

          {/* Preamble */}
          <section>
            <p>
              This privacy notice explains how your personal data is processed when you use the LIA Tool, in accordance with Art. 13 of Regulation (EU) 2016/679 (General Data Protection Regulation — GDPR).
            </p>
            <p className="mt-2 text-xs text-gray-400 font-medium">Last updated: March 2026</p>
          </section>

          {/* 1. Controller and DPO */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">1. Controller and Data Protection Officer</h3>
            <p>
              The controller within the meaning of Art. 4(7) GDPR is OneZero Legal, Germany. You can reach us via{' '}
              <a href="https://onezero.legal/contact" target="_blank" rel="noopener noreferrer" className="text-brand-limeText font-semibold hover:underline">
                onezero.legal/contact
              </a>.
            </p>
            <p className="mt-2">
              Our Data Protection Officer can be contacted at the same address.
            </p>
          </section>

          {/* 2. Categories of Personal Data */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">2. Categories of Personal Data Processed</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-brand-black">(a) Server logs</strong> — IP address, browser/user-agent string, and timestamps are automatically collected by our hosting provider (Hostinger) when you access this tool.
              </li>
              <li>
                <strong className="text-brand-black">(b) Form field content</strong> — When you use the AI-assisted features ("Draft with AI" or "Analyze"), the contents of the relevant form fields are transmitted to our server and forwarded to the Google Gemini API for processing.
              </li>
              <li>
                <strong className="text-brand-black">(c) localStorage data</strong> — Your form inputs are auto-saved in your browser's localStorage for session recovery. This data remains entirely on your device and is never transmitted to our server.
              </li>
            </ul>
          </section>

          {/* 3. Purposes and Legal Basis */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">3. Purposes of Processing and Legal Basis</h3>

            <div className="space-y-4">
              <div>
                <p><strong className="text-brand-black">(a) Server infrastructure and security</strong></p>
                <p className="mt-1">Server logs are processed to ensure the security, stability, and availability of this tool.</p>
                <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-brand-lime text-xs font-medium mt-2">
                  Legal basis: Art. 6(1)(f) GDPR — legitimate interest in operating and securing the tool.
                </div>
              </div>

              <div>
                <p><strong className="text-brand-black">(b) AI-assisted features</strong></p>
                <p className="mt-1">When you actively trigger "Draft with AI" or "Analyze", the relevant form field content is sent to the Gemini API to generate AI-assisted suggestions or compliance analysis. This processing is initiated exclusively by your action.</p>
                <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-brand-lime text-xs font-medium mt-2">
                  Legal basis: Art. 6(1)(f) GDPR — legitimate interest in providing user-requested AI functionality.
                </div>
              </div>

              <div>
                <p><strong className="text-brand-black">(c) localStorage (auto-save)</strong></p>
                <p className="mt-1">Auto-saving form data in your browser's localStorage is a purely client-side operation. No data is transmitted to any server. This is mentioned for transparency only; it does not constitute processing by the controller.</p>
                <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-brand-lime text-xs font-medium mt-2">
                  Not controller processing — included for transparency.
                </div>
              </div>
            </div>
          </section>

          {/* 4. Legitimate Interests */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">4. Legitimate Interests Pursued</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-brand-black">Server logs:</strong> Our legitimate interest lies in maintaining the operational security and integrity of the tool, detecting abuse, and troubleshooting errors. Server logs are limited to technically necessary data and are not used for profiling or behavioral analysis.
              </li>
              <li>
                <strong className="text-brand-black">AI features:</strong> Our legitimate interest lies in providing the core functionality of this tool — AI-assisted drafting and compliance analysis. Processing occurs only when you explicitly trigger it, is limited to the specific form fields relevant to the request, and the data is not stored on our servers.
              </li>
            </ul>
          </section>

          {/* 5. Recipients */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">5. Recipients of Personal Data</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-brand-black">(a) UAB Hostinger, Lithuania</strong> — Hosting provider and processor. Servers are located within the EU.
              </li>
              <li>
                <strong className="text-brand-black">(b) Google Ireland Ltd / Google LLC</strong> — Processor for the Gemini API. Form field content is sent to Google's API when you use the AI-assisted features.
              </li>
              <li>
                <strong className="text-brand-black">(c)</strong> Beyond the processors listed above, your personal data is not shared with any other recipients.
              </li>
            </ul>
          </section>

          {/* 6. International Transfers */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">6. International Transfers</h3>
            <p>
              <strong className="text-brand-black">Google Gemini API:</strong> Data sent to Google Ireland Ltd may be transferred to Google LLC in the United States. This transfer is safeguarded by the EU–US Data Privacy Framework (European Commission adequacy decision of 10 July 2023) and additionally by Standard Contractual Clauses (SCCs) incorporated into Google's data processing terms.
            </p>
            <p className="mt-2">
              <strong className="text-brand-black">Hostinger:</strong> All hosting infrastructure is located within the EU. No international transfer takes place.
            </p>
          </section>

          {/* 7. Retention Periods */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">7. Retention Periods</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-brand-black">Server logs:</strong> Retained by Hostinger in accordance with their data retention policy.
              </li>
              <li>
                <strong className="text-brand-black">AI-processed data:</strong> Form field content is transmitted to the Gemini API in real time and is not stored on our server. Retention by Google is governed by the Gemini API's data processing terms.
              </li>
              <li>
                <strong className="text-brand-black">localStorage data:</strong> Remains in your browser until you clear it manually or clear your browser data. You can delete it at any time using the "Start Over" function in the tool.
              </li>
            </ul>
          </section>

          {/* 8. Your Rights */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">8. Your Rights</h3>
            <p className="mb-3">Under the GDPR, you have the following rights with respect to your personal data:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-brand-black">Right of access (Art. 15)</strong> — You can request confirmation of whether we process your personal data and obtain a copy of that data.
              </li>
              <li>
                <strong className="text-brand-black">Right to rectification (Art. 16)</strong> — You can request correction of inaccurate personal data.
              </li>
              <li>
                <strong className="text-brand-black">Right to erasure (Art. 17)</strong> — You can request deletion of your personal data where the legal requirements are met.
              </li>
              <li>
                <strong className="text-brand-black">Right to restriction (Art. 18)</strong> — You can request that processing of your data be restricted under certain conditions.
              </li>
              <li>
                <strong className="text-brand-black">Right to data portability (Art. 20)</strong> — You can request to receive your personal data in a structured, commonly used, machine-readable format.
              </li>
              <li>
                <strong className="text-brand-black">Right to object (Art. 21)</strong> — You have the right to object at any time to the processing of your personal data based on Art. 6(1)(f) GDPR on grounds relating to your particular situation. Upon objection, we will cease processing unless we demonstrate compelling legitimate grounds that override your interests, rights, and freedoms, or the processing serves the establishment, exercise, or defence of legal claims.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us via{' '}
              <a href="https://onezero.legal/contact" target="_blank" rel="noopener noreferrer" className="text-brand-limeText font-semibold hover:underline">
                onezero.legal/contact
              </a>.
            </p>
          </section>

          {/* 9. Right to Lodge a Complaint */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">9. Right to Lodge a Complaint</h3>
            <p>
              Under Art. 77 GDPR, you have the right to lodge a complaint with a supervisory authority if you believe that the processing of your personal data infringes the GDPR. You may contact the supervisory authority in the EU Member State of your habitual residence, place of work, or place of the alleged infringement. The competent German federal state data protection authority may also be contacted.
            </p>
          </section>

          {/* 10. Obligation to Provide Data */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">10. Obligation to Provide Data</h3>
            <p>
              There is no statutory or contractual obligation to provide personal data. Server log data (IP address) is technically necessary to deliver the tool over the internet. Use of the AI-assisted features is entirely voluntary — the tool can be used without triggering any AI processing.
            </p>
          </section>

          {/* 11. Automated Decision-Making */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">11. Automated Decision-Making</h3>
            <p>
              No automated decision-making within the meaning of Art. 22 GDPR takes place. The AI-generated outputs (draft text and compliance analysis) are informational suggestions only. They do not produce any legal or similarly significant effects and are not used as the basis for any automated decisions concerning you.
            </p>
          </section>

          {/* 12. Cookies and Tracking */}
          <section>
            <h3 className="text-base font-bold text-brand-black mb-2">12. Cookies and Tracking</h3>
            <p>
              This tool does not set any cookies, does not use analytics services, and does not employ any third-party tracking technologies. The use of localStorage for auto-saving form data is a browser-internal storage mechanism and is not a cookie within the meaning of the ePrivacy Directive.
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
