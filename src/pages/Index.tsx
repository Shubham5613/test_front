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
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Optimize Your Ad Campaigns
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Harness the power of AI to analyze, optimize, and maximize the ROI of your advertising campaigns with data-driven insights.
          </p>
          <Button
            variant="campaign"
            size="xl"
            onClick={() => navigate("/campaign-info")}
            className="shadow-campaign-glow"
          >
            Start Optimization <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Campaign Analytics
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your advertising strategy with cutting-edge AI analysis and optimization tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-campaign-md hover:shadow-campaign-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full text-primary w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Optimize?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of marketers who are already maximizing their campaign performance with our AI-powered platform.
          </p>
          <Button
            variant="secondary"
            size="xl"
            onClick={() => navigate("/campaign-info")}
            className="shadow-campaign-lg hover:shadow-campaign-glow"
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
