import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Target, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Data-Driven Insights",
      description: "Get AI-powered recommendations based on your campaign performance data"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Budget Optimization",
      description: "Automatically optimize budget allocation across your ad campaigns"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Sentiment Analysis",
      description: "Understand how your audience responds to your ad content"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Analysis",
      description: "Get instant feedback and recommendations for campaign improvements"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
         ram
     
    </div>
  );
};

export default Index;
