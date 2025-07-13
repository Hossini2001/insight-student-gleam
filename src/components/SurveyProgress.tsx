import { Progress } from "@/components/ui/progress";

interface SurveyProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  category: string;
}

export function SurveyProgress({ currentQuestion, totalQuestions, category }: SurveyProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">{category}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {currentQuestion} of {totalQuestions}
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2"
      />
    </div>
  );
}