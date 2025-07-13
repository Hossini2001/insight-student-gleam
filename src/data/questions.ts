export const undergraduateQuestions = {
  academic: [
    "I am satisfied with the Japanese language classes at my school.",
    "The teachers explain lessons in an understandable way.",
    "The learning materials (books, online resources) are helpful.",
    "I receive enough feedback on my progress.",
    "The pace of the lessons is appropriate for my level."
  ],
  dailyLife: [
    "I am satisfied with my living conditions (housing, room, etc.).",
    "It is easy for me to manage my daily expenses.",
    "I can communicate in Japanese in everyday life (shopping, clinics, etc.).",
    "I feel supported by my school staff in non-academic matters (life guidance, visa support, etc.).",
    "I rarely feel isolated or homesick."
  ]
};

export const graduateQuestions = {
  academic: [
    "I am satisfied with the quality of my university courses.",
    "Professors are accessible and helpful outside of class.",
    "The course content supports my academic or career goals.",
    "I am satisfied with the research or lab opportunities provided.",
    "There is enough academic support (e.g., writing help, tutoring, language support)."
  ],
  dailyLife: [
    "I am satisfied with my part-time work opportunities or financial situation.",
    "My housing and living environment are comfortable.",
    "I can balance my academic and personal life.",
    "I participate in university or community events to connect with others.",
    "I know where to seek help for health, mental well-being, or legal issues."
  ]
};

// Legacy exports for backward compatibility
export const academicQuestions = undergraduateQuestions.academic;
export const dailyLifeQuestions = undergraduateQuestions.dailyLife;

export type StudentType = "undergraduate" | "graduate";

export interface SurveyResponse {
  id: string;
  studentId: string;
  studentType: StudentType;
  academicResponses: number[];
  dailyLifeResponses: number[];
  completedAt: Date;
}

export interface SurveyData {
  academicQuestions: string[];
  dailyLifeQuestions: string[];
}