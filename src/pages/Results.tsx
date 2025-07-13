import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { academicQuestions, dailyLifeQuestions } from "@/data/questions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, Users, TrendingUp, Award } from "lucide-react";

interface SurveyData {
  id: string;
  academicResponses: number[];
  dailyLifeResponses: number[];
  completedAt: string;
}

export default function Results() {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("surveyResponses") || "[]");
    setSurveyData(data);
  }, []);

  const calculateAverage = (responses: number[][]) => {
    if (responses.length === 0) return 0;
    const total = responses.flat().reduce((sum, rating) => sum + rating, 0);
    return total / responses.flat().length;
  };

  const academicAverage = calculateAverage(surveyData.map(d => d.academicResponses));
  const dailyLifeAverage = calculateAverage(surveyData.map(d => d.dailyLifeResponses));
  const overallAverage = (academicAverage + dailyLifeAverage) / 2;

  const ratingDistribution = () => {
    const allRatings = surveyData.flatMap(d => [...d.academicResponses, ...d.dailyLifeResponses]);
    const distribution = [1, 2, 3, 4, 5].map(rating => ({
      rating: `${rating} Star${rating > 1 ? 's' : ''}`,
      count: allRatings.filter(r => r === rating).length,
      percentage: (allRatings.filter(r => r === rating).length / allRatings.length) * 100
    }));
    return distribution;
  };

  const questionAverages = () => {
    const academic = academicQuestions.map((question, index) => ({
      question: `Q${index + 1}`,
      fullQuestion: question,
      average: surveyData.length > 0 
        ? surveyData.reduce((sum, data) => sum + (data.academicResponses[index] || 0), 0) / surveyData.length
        : 0,
      category: 'Academic'
    }));

    const dailyLife = dailyLifeQuestions.map((question, index) => ({
      question: `Q${index + 11}`,
      fullQuestion: question,
      average: surveyData.length > 0
        ? surveyData.reduce((sum, data) => sum + (data.dailyLifeResponses[index] || 0), 0) / surveyData.length
        : 0,
      category: 'Daily Life'
    }));

    return [...academic, ...dailyLife];
  };

  const pieData = [
    { name: 'Academic', value: academicAverage, color: 'hsl(var(--primary))' },
    { name: 'Daily Life', value: dailyLifeAverage, color: 'hsl(var(--accent))' }
  ];

  const getSatisfactionLevel = (score: number) => {
    if (score >= 4.5) return { label: "Excellent", color: "text-green-600" };
    if (score >= 3.5) return { label: "Good", color: "text-blue-600" };
    if (score >= 2.5) return { label: "Fair", color: "text-yellow-600" };
    if (score >= 1.5) return { label: "Poor", color: "text-orange-600" };
    return { label: "Very Poor", color: "text-red-600" };
  };

  if (surveyData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-2">No Survey Data</h2>
            <p className="text-muted-foreground mb-6">Complete a survey first to see the results.</p>
            <Button onClick={() => navigate("/survey")} className="bg-gradient-to-r from-primary to-accent">
              Take Survey
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-6">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Survey Results
            </h1>
            <p className="text-muted-foreground">Student satisfaction analytics and insights</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-[var(--shadow-elegant)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Responses</p>
                  <p className="text-3xl font-bold">{surveyData.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-elegant)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Satisfaction</p>
                  <p className="text-3xl font-bold">{overallAverage.toFixed(1)}/5</p>
                  <p className={`text-sm font-medium ${getSatisfactionLevel(overallAverage).color}`}>
                    {getSatisfactionLevel(overallAverage).label}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-elegant)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Academic Average</p>
                  <p className="text-3xl font-bold">{academicAverage.toFixed(1)}/5</p>
                </div>
                <Award className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-elegant)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Daily Life Average</p>
                  <p className="text-3xl font-bold">{dailyLifeAverage.toFixed(1)}/5</p>
                </div>
                <Award className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle>Satisfaction by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ratingDistribution().map((item) => (
                  <div key={item.rating} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-muted-foreground">{item.count} responses</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Breakdown */}
        <Card className="border-0 shadow-[var(--shadow-elegant)]">
          <CardHeader>
            <CardTitle>Question-by-Question Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={600}>
              <BarChart data={questionAverages()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis domain={[0, 5]} />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(2)}/5`, 'Average Rating']}
                  labelFormatter={(label) => {
                    const question = questionAverages().find(q => q.question === label);
                    return question ? question.fullQuestion : label;
                  }}
                />
                <Bar 
                  dataKey="average" 
                  fill="url(#gradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}