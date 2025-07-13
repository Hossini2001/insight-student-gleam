export const academicQuestions = [
  "How satisfied are you with the quality of teaching in your courses?",
  "How satisfied are you with the course curriculum and content?",
  "How satisfied are you with the availability of learning resources?",
  "How satisfied are you with the feedback you receive from instructors?",
  "How satisfied are you with the academic support services?",
  "How satisfied are you with the library facilities and resources?",
  "How satisfied are you with the technology and equipment available?",
  "How satisfied are you with the assessment methods used?",
  "How satisfied are you with the opportunities for academic growth?",
  "How satisfied are you with your overall academic experience?"
];

export const dailyLifeQuestions = [
  "How satisfied are you with the campus dining facilities?",
  "How satisfied are you with the accommodation/housing options?",
  "How satisfied are you with the recreational and sports facilities?",
  "How satisfied are you with the campus transportation services?",
  "How satisfied are you with the student social activities and events?",
  "How satisfied are you with the campus safety and security?",
  "How satisfied are you with the healthcare services available?",
  "How satisfied are you with the student support services?",
  "How satisfied are you with the campus environment and atmosphere?",
  "How satisfied are you with your overall daily life experience?"
];

export interface SurveyResponse {
  id: string;
  studentId: string;
  academicResponses: number[];
  dailyLifeResponses: number[];
  completedAt: Date;
}

export interface SurveyData {
  academicQuestions: string[];
  dailyLifeQuestions: string[];
}