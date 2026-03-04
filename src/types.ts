export interface LIAQuestion {
  id: string;
  category: string;
  question: string;
  helperText?: string;
  type: 'text' | 'yesno' | 'select' | 'checkbox';
  componentType?: 'input' | 'textarea';
  options?: string[];
  required?: boolean;
  disableAI?: boolean;
  spacing?: 'tight' | 'normal';
}

export interface LIASection {
  id: string;
  title: string;
  description: string;
  edpbReference?: string;
  questions: LIAQuestion[];
}

export interface LIAData {
  [key: string]: string | boolean | string[];
}

export interface ComplianceSubCriteria {
  name: string;
  status: 'Pass' | 'Fail' | 'Warning';
  detail: string;
}

export interface ComplianceRisk {
  description: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface ComplianceCheck {
  name: string;
  status: 'Pass' | 'Fail' | 'Warning';
  details: string;
  subCriteria?: ComplianceSubCriteria[];
}

export interface ComplianceAnalysis {
  summary: string;
  overallRating: 'Compliant' | 'Partially Compliant' | 'Non-Compliant';
  checks: ComplianceCheck[];
  risks: ComplianceRisk[] | string[];
  recommendations: string[];
}
