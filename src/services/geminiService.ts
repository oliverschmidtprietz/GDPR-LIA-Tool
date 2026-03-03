import { LIAData } from '../types';

export const getGeminiSuggestion = async (
  context: string,
  question: string,
  currentValue: string
): Promise<{ suggestion: string; citations: string }> => {
  try {
    const response = await fetch('/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, question, currentValue }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return {
      suggestion: data.suggestion || 'No suggestion available.',
      citations: data.citations || '',
    };
  } catch (error) {
    console.error('AI suggestion error:', error);
    throw error;
  }
};

export const analyzeRisk = async (
  assessmentData: LIAData
): Promise<string> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessmentData }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error('Risk analysis error:', error);
    throw error;
  }
};
