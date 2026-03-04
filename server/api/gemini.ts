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
      You must strictly follow the guidance in **EDPB Guidelines 1/2024** and, where applicable, **EDPB Opinion 28/2024**.

      REFERENCE MATERIAL:
      ${EDPB_GUIDELINES_CONTEXT}

      Context of the assessment so far (JSON): ${context || '{}'}

      The user is answering the question: "${question}"

      Current draft Answer: "${currentValue || ''}"

      QUALITY CRITERIA — your suggestion MUST meet ALL of these:
      1. **Specificity**: Reference the concrete processing activity from the context. Never use generic placeholders like "[insert here]".
      2. **Legal Grounding**: Cite specific EDPB guideline paragraphs, GDPR articles, or Recital 47 categories where relevant.
      3. **Completeness**: Address all sub-aspects of the question. If the question asks about safeguards, list specific measures, not just categories.
      4. **Proportionality**: Match the depth of the answer to the complexity of the question. Simple yes/no context → 1 sentence. Complex balancing → 3-5 sentences.

      FIELD-SPECIFIC GUIDANCE:
      - For "legitimate interest" fields: Name the specific interest, confirm it is lawful, articulate why it is real and present (not hypothetical). Reference Recital 47 if applicable.
      - For "necessity" fields: Explain why the processing is strictly necessary, what alternatives were considered and why rejected. "Convenient" or "cheaper" is NOT "necessary."
      - For "balancing" fields: Weigh specific controller interests against specific data subject rights. Address reasonable expectations, power imbalance, data sensitivity, and safeguards individually.
      - For "safeguard" fields: List only GENUINE additional safeguards (beyond GDPR-mandated measures). Encryption and access controls are already required — they don't count.
      - For "opt-out / Art. 21" fields: Describe the mechanism, how it is communicated, and whether it is unconditional.
      - For "alternatives" fields: Name at least 2 concrete alternatives and explain specifically why each was insufficient.

      EXAMPLE — Weak vs. Strong:
      Weak: "The interest is legitimate because it serves business purposes."
      Strong: "The controller pursues fraud prevention (Recital 47 GDPR), specifically detecting unauthorized account access patterns. This interest is real and present, as the controller has documented 847 fraud attempts in Q3 2024. The interest is lawful and does not conflict with ePrivacy Directive requirements, as no electronic communications content is accessed."

      OUTPUT LENGTH: 2-5 sentences for text fields. Match the complexity of the question.

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
      - IF TRIGGERED: Incorporate specific risks from Opinion 28/2024 (e.g., data scraping, model inversion, hallucination, purpose limitation in model reuse) into the suggestion.
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
        httpOptions: { timeout: 15_000 },
      },
    });

    const text = response.text?.trim();
    if (!text) throw new Error('Empty response from AI');

    let parsed: { suggestion?: string };
    try {
      parsed = JSON.parse(text);
    } catch {
      // If JSON parsing fails, use raw text as the suggestion
      parsed = { suggestion: text };
    }

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

    // Detect AI/ML terms in the assessment data
    const dataStr = JSON.stringify(assessmentData).toLowerCase();
    const aiTerms = /\b(artificial intelligence|ai|machine learning|ml|llm|large language model|generative ai|genai|gpt|transformer|neural network|deep learning)\b/i;
    const isAIRelated = aiTerms.test(dataStr);

    const aiCheckBlock = isAIRelated ? `
      CHECK 4 — AI MODEL COMPLIANCE (Opinion 28/2024):
      IMPORTANT: Include this check ONLY because AI/ML terms were detected in the assessment data.
      Sub-criteria to evaluate:
      - "Training Data Lawfulness": Was training data collected with a valid legal basis? Was web scraping involved? (Pass/Fail/Warning)
      - "Anonymization Assessment": Has the controller assessed whether the model is truly anonymous (regurgitation, membership inference, model inversion risks)? (Pass/Fail/Warning)
      - "Purpose Limitation": Is model reuse/fine-tuning for different purposes addressed? (Pass/Fail/Warning)
      - "Deployment Safeguards": Are hallucination risks, output filters, human oversight, and AI disclosure addressed? (Pass/Fail/Warning)
    ` : '';

    const prompt = `
      Act as a strict, critical Data Protection Auditor conducting a formal review.
      Review the following Legitimate Interest Assessment (LIA) data against **EDPB Guidelines 1/2024**${isAIRelated ? ' and **EDPB Opinion 28/2024**' : ''}.

      REFERENCE MATERIAL:
      ${EDPB_GUIDELINES_CONTEXT}

      USER DATA:
      ${JSON.stringify(assessmentData, null, 2)}

      AUDIT APPROACH: Be CRITICAL, not lenient. If information is missing or vague, mark it as "Warning" or "Fail" — do not give the benefit of the doubt. A compliant LIA must be thorough and specific.

      EVALUATE THESE CHECKS:

      CHECK 1 — LEGITIMATE INTEREST:
      Sub-criteria to evaluate:
      - "Lawfulness": Is the interest lawful under EU/Member State law? Does it conflict with any other regulation (e.g., ePrivacy)? (Pass/Fail/Warning)
      - "Articulation": Is the interest clearly and precisely defined, or vague/abstract? (Pass/Fail/Warning)
      - "Real & Present": Is it concrete and currently existing, or hypothetical/speculative? (Pass/Fail/Warning)
      - "Recognition": Is it a Recital 47 or case-law recognized interest? (informational, does not affect Pass/Fail)
      Overall status: Fail if ANY sub-criterion fails. Warning if any is Warning and none Fail.

      CHECK 2 — NECESSITY:
      Sub-criteria to evaluate:
      - "Strict Necessity": Is the processing genuinely necessary (not merely useful or convenient)? (Pass/Fail/Warning)
      - "Alternatives Assessment": Were less intrusive alternatives considered AND documented with reasons for rejection? (Pass/Fail/Warning)
      - "Data Minimization": Is only strictly necessary data processed? No excessive collection? (Pass/Fail/Warning)
      Overall status: Fail if ANY sub-criterion fails. Warning if any is Warning and none Fail.

      CHECK 3 — BALANCING OF INTERESTS:
      Sub-criteria to evaluate:
      - "Reasonable Expectations": Would data subjects expect this processing given the context of collection? (Pass/Fail/Warning)
      - "Impact Assessment": Are consequences for data subjects adequately identified (discrimination, financial loss, chilling effects)? (Pass/Fail/Warning)
      - "Vulnerable Groups": Are children, employees, or other vulnerable groups affected? Is the heightened standard addressed? (Pass/Fail/Warning)
      - "Safeguards Quality": Are GENUINE additional safeguards in place (beyond GDPR-mandated measures)? (Pass/Fail/Warning)
      - "Art. 21 Opt-Out": Is an opt-out mechanism described and communicated? For direct marketing, is the absolute right respected? (Pass/Fail/Warning)
      Overall status: Fail if ANY sub-criterion fails. Warning if any is Warning and none Fail.

      CHECK 4 — DOCUMENTATION COMPLETENESS (Accountability, Art. 5(2)):
      Sub-criteria to evaluate:
      - "Completeness": Are all required fields filled with substantive content (not placeholder text)? (Pass/Fail/Warning)
      - "Specificity": Are answers specific to the processing activity, or generic/copy-pasted? (Pass/Fail/Warning)
      - "Retention & Review": Are retention periods defined and is periodic review mentioned? (Pass/Fail/Warning)
      Overall status: Fail if ANY sub-criterion fails.

      ${aiCheckBlock}

      RISK CLASSIFICATION:
      - High: Likely to result in regulatory action or significant harm to data subjects
      - Medium: Deficiency that weakens the LIA but may be remedied
      - Low: Minor gap or improvement opportunity

      OVERALL RATING:
      - "Compliant": ALL checks Pass
      - "Partially Compliant": No check Fails, but one or more Warnings exist
      - "Non-Compliant": ANY check Fails

      OUTPUT JSON SCHEMA (respond with ONLY this JSON):
      {
        "summary": "Brief executive summary paragraph (max 80 words). State the overall rating and key findings.",
        "overallRating": "Compliant" | "Partially Compliant" | "Non-Compliant",
        "checks": [
          {
            "name": "Check name",
            "status": "Pass" | "Fail" | "Warning",
            "details": "Explanation of the assessment for this check.",
            "subCriteria": [
              { "name": "Sub-criterion name", "status": "Pass" | "Fail" | "Warning", "detail": "Specific finding." }
            ]
          }
        ],
        "risks": [
          { "description": "Specific risk description with GDPR article reference.", "severity": "High" | "Medium" | "Low" }
        ],
        "recommendations": ["Actionable recommendation with GDPR article reference."]
      }

      Tone: Professional, legalistic, critical. Cite GDPR articles and EDPB guideline paragraphs where possible.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        httpOptions: { timeout: 45_000 },
      },
    });

    const text = response.text?.trim() || '{}';

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // If JSON parsing fails, return a valid empty structure
      console.error('Failed to parse AI analysis JSON, returning fallback');
      parsed = {
        summary: 'Analysis completed but the response format was invalid. Please retry.',
        overallRating: 'Partially Compliant',
        checks: [],
        risks: [],
        recommendations: ['Retry the analysis to obtain a complete compliance assessment.'],
      };
    }

    res.json(parsed);
  } catch (error) {
    console.error('Gemini analyze error:', error);
    res.status(500).json({ summary: 'Analysis failed due to an error.' });
  }
});

export default router;
