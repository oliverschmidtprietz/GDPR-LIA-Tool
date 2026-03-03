import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { EDPB_GUIDELINES_CONTEXT } from '../edpbContext.js';

const router = Router();

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

router.post('/suggest', async (req: Request, res: Response) => {
  const { context, question, currentValue } = req.body;

  if (!ai) {
    res.json({ suggestion: 'AI suggestions are disabled (API Key missing).', citations: '' });
    return;
  }

  if (!question) {
    res.status(400).json({ error: 'Missing required field: question' });
    return;
  }

  try {
    const model = 'gemini-3.1-flash-lite-preview';

    const prompt = `
      You are an expert GDPR consultant assisting a user in completing a Legitimate Interest Assessment (LIA).
      You must strictly follow the guidance in **EDPB Guidelines 1/2024**.

      REFERENCE MATERIAL:
      ${EDPB_GUIDELINES_CONTEXT}

      Context of the assessment so far (JSON): ${context || '{}'}

      The user is answering the question: "${question}"

      Current draft Answer: "${currentValue || ''}"

      Task:
      If the current answer is empty, suggest a professional, compliant starting point.
      If the current answer is provided, refine it to use precise legal terminology from the EDPB guidelines.

      AI/ML INSTRUCTIONS (EDPB Opinion 28/2024):

      STRICT TRIGGER CHECK:
      You must ONLY apply EDPB Opinion 28/2024 if the user input or context EXPLICITLY contains one of these specific terms:
      - "Artificial Intelligence" or "AI"
      - "Machine Learning" or "ML"
      - "Large Language Model" or "LLM"
      - "Generative AI" or "GenAI"
      - "GPT" or "Transformer"
      - "Neural Network"

      FALSE POSITIVES (DO NOT APPLY Opinion 28/2024):
      - Do NOT trigger on "algorithm", "analytics", "automated decision making", "scoring", "profiling", "logic", or "statistics" UNLESS one of the explicit AI terms above is ALSO present.
      - These concepts exist in GDPR outside of AI (e.g., Art. 22) and should be treated under standard Art. 6(1)(f) guidelines.

      ACTION:
      - IF TRIGGERED: Incorporate specific risks from Opinion 28/2024 (e.g., data scraping, model inversion, hallucination) into the suggestion.
      - IF NOT TRIGGERED: Provide a standard LIA suggestion. DO NOT mention "AI", "Opinion 28/2024", or "training data" in your response.

      OUTPUT FORMAT:
      You must output a valid JSON object with:
      1. "suggestion": The text to fill into the form field.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim();
    if (!text) throw new Error('Empty response from AI');

    const parsed = JSON.parse(text);
    res.json({
      suggestion: parsed.suggestion || 'No suggestion available.',
      citations: '',
    });
  } catch (error) {
    console.error('Gemini suggest error:', error);
    res.status(500).json({ suggestion: 'Unable to generate suggestion at this time.', citations: '' });
  }
});

router.post('/analyze', async (req: Request, res: Response) => {
  const { assessmentData } = req.body;

  if (!ai) {
    res.json({ summary: 'AI Analysis disabled (API Key missing).' });
    return;
  }

  if (!assessmentData) {
    res.status(400).json({ error: 'Missing required field: assessmentData' });
    return;
  }

  try {
    const model = 'gemini-3.1-pro-preview';
    const prompt = `
      Act as a strict Data Protection Auditor.
      Review the following Legitimate Interest Assessment (LIA) data against **EDPB Guidelines 1/2024**.

      REFERENCE MATERIAL:
      ${EDPB_GUIDELINES_CONTEXT}

      USER DATA:
      ${JSON.stringify(assessmentData, null, 2)}

      Task: Provide a critical Executive Summary of the risks in structured JSON format.

      CRITERIA FOR LEGITIMATE INTEREST (MUST CHECK ALL 3):
      1. Lawfulness: Is it lawful under EU/Member State law?
      2. Articulation: Is it clearly and precisely defined?
      3. Real & Present: Is it non-speculative and currently existing?

      OUTPUT JSON SCHEMA:
      {
        "summary": "Brief executive summary paragraph (max 60 words).",
        "checks": [
          {
            "name": "Legitimate Interest",
            "status": "Pass" | "Fail" | "Warning",
            "details": "Evaluate strictly if ALL 3 sub-conditions are met: 1) Lawfulness, 2) Clear Articulation, 3) Real & Present."
          },
          {
            "name": "Necessity",
            "status": "Pass" | "Fail" | "Warning",
            "details": "Assessment of strict necessity and mildest means."
          },
          {
            "name": "Balancing",
            "status": "Pass" | "Fail" | "Warning",
            "details": "Assessment of impact on rights/freedoms vs interest."
          }
        ],
        "risks": ["Specific risk 1", "Specific risk 2"],
        "recommendations": ["Recommendation 1", "Recommendation 2"]
      }

      **AI CHECK:** ONLY if the data EXPLICITLY indicates AI/ML usage (terms: AI, Machine Learning, LLM, etc.), check against **EDPB Opinion 28/2024** (Anonymization, Scraping, Synthetic Data) and include in risks/recommendations.

      Tone: Professional, Legalistic.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (error) {
    console.error('Gemini analyze error:', error);
    res.status(500).json({ summary: 'Analysis failed due to an error.' });
  }
});

export default router;
