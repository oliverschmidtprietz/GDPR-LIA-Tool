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

export interface ComplianceCheck {
  name: string;
  status: 'Pass' | 'Fail' | 'Warning';
  details: string;
}

export interface ComplianceAnalysis {
  summary: string;
  checks: ComplianceCheck[];
  risks: string[];
  recommendations: string[];
}
