import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  selectedRating: number | null;
  onRatingSelect: (rating: number) => void;
}

const ratings = [
  { value: 1, label: "Very Dissatisfied", emoji: "😞" },
  { value: 2, label: "Dissatisfied", emoji: "😕" },
  { value: 3, label: "Neutral", emoji: "😐" },
  { value: 4, label: "Satisfied", emoji: "🙂" },
  { value: 5, label: "Very Satisfied", emoji: "😊" }
];

export function QuestionCard({ question, questionNumber, selectedRating, onRatingSelect }: QuestionCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-[var(--shadow-elegant)] bg-card/50 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent mb-4">
              <span className="text-primary-foreground font-bold text-lg">{questionNumber}</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{question}</h3>
            <p className="text-muted-foreground">Rate your satisfaction level</p>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            {ratings.map((rating) => (
              <Button
                key={rating.value}
                variant={selectedRating === rating.value ? "default" : "outline"}
                onClick={() => onRatingSelect(rating.value)}
                className={cn(
                  "flex flex-col items-center justify-center h-20 transition-all duration-300",
                  selectedRating === rating.value 
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)] transform scale-105" 
                    : "hover:scale-105 hover:shadow-md"
                )}
              >
                <span className="text-2xl mb-1">{rating.emoji}</span>
                <span className="text-xs font-medium">{rating.value}</span>
              </Button>
            ))}
          </div>
          
          {selectedRating && (
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                You selected: <span className="text-foreground">{ratings[selectedRating - 1].label}</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}