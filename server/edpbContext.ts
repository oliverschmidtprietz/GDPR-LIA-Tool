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
   - Recital 47 Recognized Interests: Direct marketing, fraud prevention, network and information security, intra-group transfers for internal administrative purposes. These are explicitly recognized but STILL require a full LIA — recognition does not equal automatic approval.
   - Case Law Recognized Interests (CJEU): Enforcement of legal claims, ensuring network security (Breyer, C-582/14), prevention of fraud (joined cases C-468/10 and C-469/10).
   - Third-Party Interests: Art 6(1)(f) explicitly covers interests of third parties, not only the controller. The third party must be identifiable and the interest must be articulated concretely.
   - Public Interest: May constitute a legitimate interest, but only where the controller can demonstrate a direct, concrete benefit — abstract references to "the public good" are insufficient.

3. ASSESSMENT OF "NECESSITY":
   - Definition: "Necessary" does NOT mean "useful", "cheaper", or "more convenient".
   - Strict Necessity: If the objective can be achieved by less intrusive means (e.g., anonymized data, opt-in), Art 6(1)(f) cannot be used.
   - Data Minimization: Processing must be limited to what is strictly required.
   - Alternatives Assessment: The controller must have considered and documented why less intrusive alternatives were rejected. This is not optional — failure to consider alternatives undermines the necessity claim.

4. ASSESSMENT OF "BALANCING EXERCISE":
   - Reasonable Expectations: Would the user expect this processing at the time of collection? Key factors:
     * Context of data collection (direct collection vs. third-party sourcing vs. public scraping)
     * Nature of the relationship (customer vs. non-customer, employee vs. contractor)
     * Transparency provided at time of collection (privacy notice, cookie banners)
     * Whether the data subject actively engaged with the controller
   - Power Imbalance: Employer-employee relationships or processing children's data weigh heavily against the controller.
   - Children's Data: Art 6(1)(f) last sentence — "taking into consideration the interests of children." Processing children's data requires a HIGHER threshold of justification. Direct marketing targeting children will almost always fail the balancing test.
   - Data Sensitivity Factors:
     * Special category data (Art. 9) or criminal offence data (Art. 10) dramatically increases risk weighting
     * Financial data, health-adjacent data, location data, communications metadata — all heighten impact
     * Volume of data per individual (comprehensive profiles weigh against controller)
     * Number of data subjects affected (mass processing increases aggregate risk)
   - Scope and Consequences:
     * Nature of impact: discrimination, financial loss, reputational damage, chilling effects on free expression
     * Likelihood of impact: How probable is harm, not just how severe?
     * Reversibility: Can the consequences be undone?
   - Mitigating Measures vs. Compliance: Measures that are ALREADY required by GDPR (e.g., encryption, access controls, data minimization) DO NOT count as "additional safeguards." Only measures BEYOND legal obligations qualify.
   - Valid Mitigating Measures: Privacy Enhancing Technologies (PETs), unconditional opt-out, short retention periods, pseudonymization going beyond the legal minimum, differential privacy, data aggregation before use.

5. ART. 21 — RIGHT TO OBJECT:
   - Data subjects have the RIGHT TO OBJECT to processing based on Art 6(1)(f) at any time.
   - The controller must STOP processing unless it can demonstrate "compelling legitimate grounds" that override the data subject's interests — a HIGH bar.
   - For direct marketing: The right to object is ABSOLUTE — no balancing test required (Art 21(2)).
   - The right to object must be clearly and separately communicated to the data subject (Art 21(4)).
   - Practical implication: An LIA that does not account for Art 21 opt-out mechanisms is incomplete.

6. DOCUMENTATION & ACCOUNTABILITY (Art. 5(2)):
   - The controller bears the BURDEN OF PROOF that legitimate interest applies.
   - The LIA must be documented BEFORE processing begins, not retroactively.
   - Documentation must be sufficiently detailed for a supervisory authority to review.
   - The assessment must be REVIEWED periodically, especially when circumstances change.
   - Accountability principle: "Not just compliant, but able to demonstrate compliance."

7. PROFILING & AUTOMATED DECISION-MAKING (Art. 22):
   - Profiling based on Art 6(1)(f) is permissible but subject to heightened scrutiny.
   - Solely automated decisions producing legal or similarly significant effects CANNOT rely on Art 6(1)(f) alone — Art 22(2) requires explicit consent or contract necessity.
   - Even non-solely-automated profiling raises the bar in the balancing test due to intrusiveness and opacity.
   - Profiling for direct marketing: Permitted but subject to the absolute right to object (Art 21(2)).

8. DISTINCTION: GDPR-REQUIRED MEASURES vs. GENUINE ADDITIONAL SAFEGUARDS:
   - NOT safeguards (already required by GDPR): encryption at rest/in transit, access controls, privacy notice, data breach notification, appointing a DPO, maintaining records of processing.
   - GENUINE safeguards (weigh in favor of controller): unconditional opt-out mechanism, privacy-by-design features exceeding legal requirements, data aggregation/anonymization after initial purpose, independent audit/review, shorter retention than legally required, transparency reports, human review of automated outputs.

-----------------------------------------------------------------------------------------

OFFICIAL REFERENCE: EDPB Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (Adopted 17 Dec 2024).

KEY GUIDANCE FOR AI MODELS (Opinion 28/2024):

1. SCOPE & DEFINITIONS:
   - Distinguishes between **Development Phase** (Training) and **Deployment Phase**.
   - **Anonymization Threshold:** AI models trained on personal data are NOT automatically anonymous. To be considered anonymous, it must be demonstrated that personal data cannot be extracted (regurgitation) or inferred (e.g., Membership Inference Attacks) using reasonable means. If not anonymous, the model itself constitutes personal data.
   - Specific anonymization attack vectors the controller must assess:
     * **Regurgitation**: Model reproduces verbatim training data (names, addresses, text passages)
     * **Membership Inference**: Adversary determines whether a specific individual's data was in the training set
     * **Property Inference**: Extracting statistical properties about subgroups in training data
     * **Model Inversion/Extraction**: Reconstructing training data or model parameters from outputs

2. LEGITIMATE INTEREST IN DEVELOPMENT (TRAINING) - Art 6(1)(f):
   - **Necessity:** Strict assessment required.
     * Can the model be trained using **synthetic data** or anonymized data instead?
     * Is the volume of data strictly proportionate to the quality of the model needed?
   - **Balancing of Interests:**
     * **Web Scraping:** Scraping public data (e.g., social media) poses HIGH RISKS. The fact that data is public does not mean it can be scraped freely. Users generally do NOT reasonably expect their public posts to be used for AI training.
     * **First-party vs. Third-party Data**: Data collected directly from data subjects with their knowledge carries LOWER risk than data scraped from third-party sources or purchased from data brokers.
     * **Rights:** Implementing an unconditional **Opt-out** mechanism is a strong mitigating measure.
     * **Safeguards:** Filters to prevent data ingestion, Differential Privacy, "Machine Unlearning" capabilities.
   - **Purpose Limitation in Model Reuse/Fine-tuning**: A model trained for purpose A cannot be repurposed for purpose B without a new legal basis assessment. The original LIA does NOT extend to derivative purposes or fine-tuning for different objectives.

3. LEGITIMATE INTEREST IN DEPLOYMENT:
   - Risks to Data Subjects: Hallucinations (inaccurate data), Bias/Discrimination, Lack of Transparency, Security risks (Model Inversion).
   - **Hallucination Risk**: Generative AI may produce false personal data (attributing statements, credentials, or actions to real individuals). This constitutes processing of inaccurate personal data and triggers accuracy obligations under Art. 5(1)(d).
   - Mitigating Measures: Output filters, strict human oversight, transparency regarding model capabilities (Model Cards).
   - **Transparency Requirements**:
     * Model cards documenting training data provenance, known limitations, and intended use cases
     * AI disclosure: Data subjects must be informed when AI is used to process their data or make decisions about them
     * Explainability: Ability to provide meaningful information about the logic involved (Art. 13(2)(f), Art. 14(2)(g))

4. UNLAWFUL TRAINING DATA (Fruit of the Poisonous Tree):
   - If a model was trained on unlawfully processed data (e.g., scraped without a legal basis), the model itself may be considered unlawful. Corrective measures by DPAs can include the erasure of the model itself.

5. DEPLOYMENT-SPECIFIC RISKS FOR GENERATIVE AI:
   - **False Personal Data Generation**: LLMs can generate plausible but false information about real people, creating Art. 5(1)(d) accuracy concerns
   - **Unauthorized Profiling**: AI outputs may amount to profiling individuals without their knowledge
   - **Purpose Creep**: Deployed models being used for purposes beyond the original assessment
   - **Data Subject Rights**: How are rights (access, rectification, erasure) exercised against AI model outputs?
`;
