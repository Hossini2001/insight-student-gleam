import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { SurveyProgress } from "@/components/SurveyProgress";
import { StudentTypeSelector } from "@/components/StudentTypeSelector";
import { 
  undergraduateQuestions, 
  graduateQuestions, 
  StudentType 
} from "@/data/questions";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

type SurveySection = "academic" | "dailyLife";

export default function Survey() {
  const [studentType, setStudentType] = useState<StudentType | null>(null);
  const [currentSection, setCurrentSection] = useState<SurveySection>("academic");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [academicResponses, setAcademicResponses] = useState<(number | null)[]>([]);
  const [dailyLifeResponses, setDailyLifeResponses] = useState<(number | null)[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStudentTypeSelect = (type: StudentType) => {
    setStudentType(type);
    const questions = type === "undergraduate" ? undergraduateQuestions : graduateQuestions;
    setAcademicResponses(new Array(questions.academic.length).fill(null));
    setDailyLifeResponses(new Array(questions.dailyLife.length).fill(null));
  };

  if (!studentType) {
    return <StudentTypeSelector onSelect={handleStudentTypeSelect} />;
  }

  const questions = studentType === "undergraduate" ? undergraduateQuestions : graduateQuestions;
  const currentQuestions = currentSection === "academic" ? questions.academic : questions.dailyLife;
  const currentResponses = currentSection === "academic" ? academicResponses : dailyLifeResponses;
  const setCurrentResponses = currentSection === "academic" ? setAcademicResponses : setDailyLifeResponses;

  const handleRatingSelect = (rating: number) => {
    const newResponses = [...currentResponses];
    newResponses[currentQuestion] = rating;
    setCurrentResponses(newResponses);
  };

  const handleNext = () => {
    if (currentResponses[currentQuestion] === null) {
      toast({
        title: "Please select a rating",
        description: "You must rate this question before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection === "academic") {
      setCurrentSection("dailyLife");
      setCurrentQuestion(0);
      toast({
        title: "Academic section completed!",
        description: "Moving to daily life satisfaction questions.",
      });
    } else {
      // Survey completed
      completeSurvey();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection === "dailyLife") {
      setCurrentSection("academic");
      setCurrentQuestion(questions.academic.length - 1);
    }
  };

  const completeSurvey = () => {
    // Save responses to localStorage (in a real app, this would be sent to a backend)
    const surveyData = {
      id: Date.now().toString(),
      studentType,
      academicResponses: academicResponses.filter(r => r !== null),
      dailyLifeResponses: dailyLifeResponses.filter(r => r !== null),
      completedAt: new Date().toISOString(),
    };

    const existingData = JSON.parse(localStorage.getItem("surveyResponses") || "[]");
    existingData.push(surveyData);
    localStorage.setItem("surveyResponses", JSON.stringify(existingData));

    toast({
      title: "Survey completed successfully!",
      description: "Thank you for your feedback. Your responses have been recorded.",
    });

    navigate("/results");
  };

  const isLastQuestion = currentQuestion === currentQuestions.length - 1;
  const isLastSection = currentSection === "dailyLife";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-6">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Student Satisfaction Survey
          </h1>
          <p className="text-muted-foreground">Help us improve your experience</p>
        </div>

        <SurveyProgress
          currentQuestion={currentQuestion + 1}
          totalQuestions={currentQuestions.length}
          category={currentSection === "academic" ? "Academic Satisfaction" : "Daily Life Satisfaction"}
        />

        <QuestionCard
          question={currentQuestions[currentQuestion]}
          questionNumber={
            currentSection === "academic" 
              ? currentQuestion + 1 
              : questions.academic.length + currentQuestion + 1
          }
          selectedRating={currentResponses[currentQuestion]}
          onRatingSelect={handleRatingSelect}
        />

        <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0 && currentSection === "academic"}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Section {currentSection === "academic" ? "1" : "2"} of 2
          </div>

          <Button
            onClick={handleNext}
            disabled={currentResponses[currentQuestion] === null}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent"
          >
            {isLastQuestion && isLastSection ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Complete Survey
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}