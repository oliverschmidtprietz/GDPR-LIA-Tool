import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { LIAData, ComplianceAnalysis } from '../types';
import { SECTIONS } from '../constants';
import { ArrowLeft, Loader2, Download } from 'lucide-react';
import { AnalysisRenderer } from './AnalysisRenderer';

interface ReportProps {
  data: LIAData;
  onEdit: () => void;
}

export const Report: React.FC<ReportProps> = ({ data, onEdit }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const aiAnalysis = data['ai_compliance_analysis'] as string;

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const element = document.getElementById('report-content');
    if (!element) {
      setIsGenerating(false);
      return;
    }
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `LIA_Report_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const finalResult = data['final_result'] as string;

  const renderAnalysis = () => {
    if (!aiAnalysis) return null;
    try {
      const analysis: ComplianceAnalysis = JSON.parse(aiAnalysis);
      return <AnalysisRenderer analysis={analysis} variant="report" />;
    } catch {
      return <p className="text-red-500 text-xs">Error displaying analysis.</p>;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pt-8 pb-20 px-4">
      <div className="sticky top-6 z-40 flex justify-between items-center mb-8 no-print bg-white/90 backdrop-blur py-3 px-6 rounded-full shadow-soft-xl border border-gray-100">
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-2 text-brand-black hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Editor
        </button>
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-brand-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 disabled:bg-gray-300 transition-colors font-bold text-xs uppercase tracking-widest shadow-md"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" /> Download PDF Report
            </>
          )}
        </button>
      </div>

      <div id="report-content" className="bg-white print:w-full px-8 md:px-16 py-12 max-w-[210mm] mx-auto shadow-2xl shadow-gray-200/50 rounded-sm min-h-[297mm]">
        {/* Document Header */}
        <div className="mb-12 border-b-2 border-black pb-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-black text-black tracking-tighter mb-1">LIA</h1>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Legitimate Interest Assessment</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Legal Basis</p>
              <p className="text-xl font-bold text-black">Art. 6(1)(f) GDPR</p>
            </div>
          </div>

          <div className="mt-8 pt-6 flex justify-between">
            <div>
              <span className="block text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-1">Controller</span>
              <span className="text-lg font-bold text-black block">{data['controller_name'] || '\u2014'}</span>
              <span className="text-sm text-gray-600 block">{data['controller_address']}</span>
            </div>
            <div className="text-right">
              <span className="block text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-1">Assessment Date</span>
              <span className="text-lg font-bold text-black block">{data['date_of_assessment'] || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">

          {/* Conclusion Box */}
          <div className="bg-gray-50 p-6 border-l-4 border-black break-inside-avoid">
            <h3 className="text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-500">Conclusion</h3>
            <p className="text-xl font-bold text-black leading-tight mb-2">{finalResult || 'Assessment Incomplete'}</p>
            {data['final_comments'] && (
              <div className="pt-2 mt-2 border-t border-gray-200">
                <p className="text-sm text-gray-700 italic">{data['final_comments']}</p>
              </div>
            )}
          </div>

          {SECTIONS.slice(0, -1).map((section) => (
            <div key={section.id} className="break-inside-avoid">
              <h2 className="text-base font-black text-black uppercase tracking-tight border-b border-gray-200 pb-2 mb-6">
                {section.title}
              </h2>

              <div className="space-y-6">
                {section.questions.map(q => (
                  <div key={q.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 break-inside-avoid">
                    <div className="md:col-span-4">
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide leading-tight">{q.question}</p>
                    </div>
                    <div className="md:col-span-8">
                      <div className="text-gray-800 text-sm leading-relaxed border-l-2 border-gray-100 pl-4 text-justify">
                        {data[q.id] ? data[q.id].toString() : <span className="text-gray-300 italic">Not Answered</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-16 pt-12 border-t-2 border-black flex justify-between items-end break-inside-avoid">
            <div className="w-1/3">
              <div className="h-px bg-black mb-4"></div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">DPO Signature</p>
            </div>
            <div className="w-1/3">
              <div className="h-px bg-black mb-4"></div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Controller Signature</p>
            </div>
          </div>

          {/* AI Analysis Addendum */}
          {aiAnalysis && (
            <div className="mt-12 pt-8 border-t border-dashed border-gray-300">
              {renderAnalysis()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
