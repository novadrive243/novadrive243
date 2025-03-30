
// API configuration
export const OPENAI_API_KEY = "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";

// Assistant ID - Note: You need to create this assistant in your OpenAI account
export const ASSISTANT_ID = "asst_G1ik7q0ohUBVpwpdiNsEa4cz";

// Flag to enable fallback responses when the assistant is not working
export const USE_FALLBACK_BY_DEFAULT = false;

// Default quick replies
export const QUICK_REPLIES = [
  {
    fr: "Comment réserver un chauffeur?",
    en: "How do I book a driver?"
  },
  {
    fr: "Quels sont vos tarifs?",
    en: "What are your rates?"
  },
  {
    fr: "Quelles zones desservez-vous?",
    en: "What areas do you serve?"
  },
  {
    fr: "Types de véhicules disponibles?",
    en: "What vehicles do you offer?"
  }
];
