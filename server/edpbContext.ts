export const EDPB_GUIDELINES_CONTEXT = `
OFFICIAL REFERENCE: EDPB Guidelines 1/2024 on processing of personal data based on Article 6(1)(f) GDPR (Version 1.0, Adopted 8 Oct 2024).

CORE PRINCIPLES FOR LIA (Guidelines 1/2024):

1. THE 3-STEP TEST (CUMULATIVE):
   To rely on Art 6(1)(f), ALL three conditions must be met:
   a) Pursuit of a legitimate interest (Lawful, clearly articulated, real/present).
   b) Necessity of processing.
   c) Balancing of interests (Controller's interest vs. Data Subject's rights).

2. ASSESSMENT OF "LEGITIMATE INTEREST":
   - "Real and Present": The interest must be effective at the date of processing, NOT hypothetical or speculative.
   - Example of Failure: A newspaper keeping data of former subscribers for a "possible" future magazine launch that isn't concrete yet is NOT a legitimate interest.
   - Lawfulness: Must not violate other laws (e.g., ePrivacy Directive for email marketing).

3. ASSESSMENT OF "NECESSITY":
   - Definition: "Necessary" does NOT mean "useful", "cheaper", or "more convenient".
   - Strict Necessity: If the objective can be achieved by less intrusive means (e.g., anonymized data, opt-in), Art 6(1)(f) cannot be used.
   - Data Minimization: Processing must be limited to what is strictly required.

4. ASSESSMENT OF "BALANCING EXERCISE":
   - Power Imbalance: Employer-employee relationships or processing children's data weigh heavily against the controller.
   - Reasonable Expectations: Would the user expect this processing at the time of collection?
   - Mitigating Measures vs. Compliance: Measures that are ALREADY required by GDPR (e.g., encryption) DO NOT count as "additional safeguards".
   - Valid Mitigating Measures: Privacy Enhancing Technologies (PETs), unconditional opt-out, short retention periods.

-----------------------------------------------------------------------------------------

OFFICIAL REFERENCE: EDPB Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (Adopted 17 Dec 2024).

KEY GUIDANCE FOR AI MODELS (Opinion 28/2024):

1. SCOPE & DEFINITIONS:
   - Distinguishes between **Development Phase** (Training) and **Deployment Phase**.
   - **Anonymization Threshold:** AI models trained on personal data are NOT automatically anonymous. To be considered anonymous, it must be demonstrated that personal data cannot be extracted (regurgitation) or inferred (e.g., Membership Inference Attacks) using reasonable means. If not anonymous, the model itself constitutes personal data.

2. LEGITIMATE INTEREST IN DEVELOPMENT (TRAINING) - Art 6(1)(f):
   - **Necessity:** Strict assessment required.
     * Can the model be trained using **synthetic data** or anonymized data instead?
     * Is the volume of data strictly proportionate to the quality of the model needed?
   - **Balancing of Interests:**
     * **Web Scraping:** Scraping public data (e.g., social media) poses HIGH RISKS. The fact that data is public does not mean it can be scraped freely. Users generally do NOT reasonably expect their public posts to be used for AI training.
     * **Rights:** Implementing an unconditional **Opt-out** mechanism is a strong mitigating measure.
     * **Safeguards:** Filters to prevent data ingestion, Differential Privacy, "Machine Unlearning" capabilities.

3. LEGITIMATE INTEREST IN DEPLOYMENT:
   - Risks to Data Subjects: Hallucinations (inaccurate data), Bias/Discrimination, Lack of Transparency, Security risks (Model Inversion).
   - Mitigating Measures: Output filters, strict human oversight, transparency regarding model capabilities (Model Cards).

4. UNLAWFUL TRAINING DATA (Fruit of the Poisonous Tree):
   - If a model was trained on unlawfully processed data (e.g., scraped without a legal basis), the model itself may be considered unlawful. Corrective measures by DPAs can include the erasure of the model itself.
`;