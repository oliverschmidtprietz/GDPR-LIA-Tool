import React from 'react';
import { ComplianceCheck, ComplianceAnalysis, ComplianceRisk } from '../types';
import { CheckCircle, XCircle, AlertTriangle, ShieldAlert, ListChecks, Info } from 'lucide-react';

interface AnalysisRendererProps {
  analysis: ComplianceAnalysis;
  variant: 'wizard' | 'report';
}

const ratingColors = {
  'Compliant': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  'Partially Compliant': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
  'Non-Compliant': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
};

const severityColors = {
  'High': 'bg-red-100 text-red-700',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'Low': 'bg-blue-100 text-blue-700',
};

/** Backward-compatible: risks may be string[] (old) or ComplianceRisk[] (new) */
function isStructuredRisk(r: string | ComplianceRisk): r is ComplianceRisk {
  return typeof r === 'object' && r !== null && 'description' in r;
}

function getRiskText(r: string | ComplianceRisk): string {
  return isStructuredRisk(r) ? r.description : r;
}

function getRiskSeverity(r: string | ComplianceRisk): string | undefined {
  return isStructuredRisk(r) ? r.severity : undefined;
}

const SubCriteriaList: React.FC<{ check: ComplianceCheck; variant: 'wizard' | 'report' }> = ({ check, variant }) => {
  if (!check.subCriteria?.length) return null;
  const textSize = variant === 'report' ? 'text-[9px]' : 'text-[11px]';
  return (
    <ul className={`mt-2 space-y-1 ${textSize}`}>
      {check.subCriteria.map((sc, i) => (
        <li key={i} className="flex items-start gap-2 text-gray-500">
          <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
            sc.status === 'Pass' ? 'bg-green-400' :
            sc.status === 'Fail' ? 'bg-red-400' : 'bg-yellow-400'
          }`} />
          <span><span className="font-semibold text-gray-600">{sc.name}:</span> {sc.detail}</span>
        </li>
      ))}
    </ul>
  );
};

export const AnalysisRenderer: React.FC<AnalysisRendererProps> = ({ analysis, variant }) => {
  const rating = analysis.overallRating;
  const colors = rating ? ratingColors[rating] : undefined;

  if (variant === 'report') {
    return (
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 break-inside-avoid">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-brand-black text-white text-[10px] font-bold px-2 py-1 rounded">AI ADDENDUM</span>
          <h2 className="text-xl font-bold text-brand-black uppercase tracking-tight">Compliance Analysis</h2>
          {rating && colors && (
            <span className={`ml-auto text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${colors.bg} ${colors.text} ${colors.border} border`}>
              {rating}
            </span>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Executive Summary</h3>
          <p className="text-sm font-medium text-brand-black leading-relaxed">{analysis.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {analysis.checks?.map((check: ComplianceCheck, idx: number) => (
            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2 border-b border-gray-50 pb-2">
                <span className="text-[10px] font-bold uppercase text-brand-black">{check.name}</span>
                {check.status === 'Pass' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {check.status === 'Fail' && <XCircle className="w-4 h-4 text-red-500" />}
                {check.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
              </div>
              <p className="text-[10px] text-gray-500 leading-normal flex-grow">{check.details}</p>
              <SubCriteriaList check={check} variant="report" />
              <div className={`mt-2 pt-1 text-center text-[10px] font-bold uppercase tracking-widest rounded ${
                check.status === 'Pass' ? 'text-green-700' :
                check.status === 'Fail' ? 'text-red-700' :
                'text-yellow-700'
              }`}>
                {check.status}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {analysis.risks?.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-3 text-red-600">
                <ShieldAlert className="w-4 h-4" /> Key Risks
              </h4>
              <ul className="space-y-2">
                {analysis.risks.map((r, i: number) => (
                  <li key={i} className="flex gap-2 text-[10px] text-gray-600 bg-white p-2 rounded border border-gray-100 items-start">
                    <div className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0 mt-1"></div>
                    <span className="flex-1">{getRiskText(r)}</span>
                    {getRiskSeverity(r) && (
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase flex-shrink-0 ${severityColors[getRiskSeverity(r) as keyof typeof severityColors] || ''}`}>
                        {getRiskSeverity(r)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.recommendations?.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-3 text-green-600">
                <ListChecks className="w-4 h-4" /> Recommendations
              </h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((r: string, i: number) => (
                  <li key={i} className="flex gap-2 text-[10px] text-gray-600 bg-white p-2 rounded border border-gray-100">
                    <div className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0 mt-1"></div>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 flex gap-2 items-start">
          <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div>
            <h5 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mb-1">Audit Trail Note</h5>
            <p className="text-[10px] text-gray-400 italic">
              This analysis was generated automatically on {new Date().toLocaleDateString()} based on the inputs provided.
              It serves as guidance for the Data Protection Officer and does not constitute legal advice.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Wizard variant
  return (
    <div className="space-y-8">
      {/* Overall Rating Badge */}
      {rating && colors && (
        <div className={`flex items-center justify-center gap-3 p-4 rounded-2xl border ${colors.bg} ${colors.border}`}>
          <span className={`text-sm font-bold uppercase tracking-widest ${colors.text}`}>{rating}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Executive Summary</h5>
        <p className="text-brand-black text-sm leading-relaxed font-medium">{analysis.summary}</p>
      </div>

      <div className="grid gap-4">
        {analysis.checks?.map((check: ComplianceCheck, idx: number) => (
          <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`mt-1 p-1 rounded-full ${
              check.status === 'Pass' ? 'bg-green-100 text-green-600' :
              check.status === 'Fail' ? 'bg-red-100 text-red-600' :
              'bg-yellow-100 text-yellow-600'
            }`}>
              {check.status === 'Pass' && <CheckCircle className="w-5 h-5" />}
              {check.status === 'Fail' && <XCircle className="w-5 h-5" />}
              {check.status === 'Warning' && <AlertTriangle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-brand-black">{check.name}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                  check.status === 'Pass' ? 'bg-green-100 text-green-700' :
                  check.status === 'Fail' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>{check.status}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{check.details}</p>
              <SubCriteriaList check={check} variant="wizard" />
            </div>
          </div>
        ))}
      </div>

      {(analysis.risks?.length > 0 || analysis.recommendations?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          {analysis.risks?.length > 0 && (
            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-4">Risks</h5>
              <ul className="space-y-3">
                {analysis.risks.map((r, i: number) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-2 items-start leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span className="flex-1">{getRiskText(r)}</span>
                    {getRiskSeverity(r) && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex-shrink-0 ${severityColors[getRiskSeverity(r) as keyof typeof severityColors] || ''}`}>
                        {getRiskSeverity(r)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {analysis.recommendations?.length > 0 && (
            <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-4">Recommendations</h5>
              <ul className="space-y-3">
                {analysis.recommendations.map((r: string, i: number) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-2 items-start leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 pt-4 border-t border-gray-200 text-[10px] text-gray-400 italic">
        Disclaimer: The AI analysis is an automated assessment based on EDPB guidelines. Content may be incomplete and should be reviewed by a legal professional.
      </p>
    </div>
  );
};
