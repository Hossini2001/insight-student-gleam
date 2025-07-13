import { GraduationCap, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudentType } from "@/data/questions";

interface StudentTypeSelectorProps {
  onSelect: (type: StudentType) => void;
}

export function StudentTypeSelector({ onSelect }: StudentTypeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl backdrop-blur-sm bg-background/95">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Student Satisfaction Survey
            </h1>
            <p className="text-muted-foreground text-lg">
              Please select your student type to begin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              variant="outline"
              className="h-32 flex-col space-y-4 hover:bg-primary/10 border-2 transition-all duration-300"
              onClick={() => onSelect("undergraduate")}
            >
              <BookOpen className="h-12 w-12 text-primary" />
              <span className="text-xl font-semibold">Undergraduate Student</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-32 flex-col space-y-4 hover:bg-primary/10 border-2 transition-all duration-300"
              onClick={() => onSelect("graduate")}
            >
              <GraduationCap className="h-12 w-12 text-primary" />
              <span className="text-xl font-semibold">Graduate Student</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}