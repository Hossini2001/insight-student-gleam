import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ClipboardList, BarChart3, Users, Star, BookOpen, Coffee } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ClipboardList,
      title: "Easy Surveys",
      description: "Simple and intuitive questionnaire interface"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics", 
      description: "Comprehensive results and insights dashboard"
    },
    {
      icon: Users,
      title: "Student-Focused",
      description: "Designed specifically for educational institutions"
    },
    {
      icon: Star,
      title: "Satisfaction Tracking",
      description: "Measure both academic and daily life satisfaction"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Student Satisfaction Survey
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive platform to measure and analyze student satisfaction across academic and daily life experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/survey")}
              className="bg-gradient-to-r from-primary to-accent text-lg px-8 py-6 shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300"
            >
              <ClipboardList className="w-5 h-5 mr-2" />
              Take Survey
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/results")}
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Results
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Survey Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Academic Satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center text-muted-foreground mb-4">
                Evaluate your educational experience
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Teaching quality and methods</li>
                <li>• Course content and curriculum</li>
                <li>• Learning resources availability</li>
                <li>• Academic support services</li>
                <li>• Assessment and feedback</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">Daily Life Satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center text-muted-foreground mb-4">
                Rate your campus life experience
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Dining and accommodation</li>
                <li>• Recreation and sports facilities</li>
                <li>• Transportation services</li>
                <li>• Social activities and events</li>
                <li>• Campus safety and environment</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Experience?</h2>
          <p className="text-muted-foreground mb-8">
            Your feedback helps improve the educational experience for everyone
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/survey")}
            className="bg-gradient-to-r from-primary to-accent text-lg px-12 py-6 shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300"
          >
            Start Survey Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
