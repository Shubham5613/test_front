import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Plus, Trash2, BarChart3, TrendingUp, ArrowRight, ArrowLeft } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const steps = ["Campaign Info", "Ad Entries", "Results"];

interface Campaign {
  name: string;
  ad_title: string;
  clicks: string;
  impressions: string;
  current_budget: string;
}

interface AnalysisResponse {
  gpt_recommendation: any;
  data_driven_allocation: Array<{
    name: string;
    current_budget: number;
    algo_suggested_budget: number;
    sentiment_analysis?: {
      sentiment: string;
      explanation: string;
    };
  }>;
}

interface HistoryItem {
  campaign_name: string;
  created_at: string;
  input_data: any;
  gpt_response: any;
}

const CampaignForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const stepFromRoute = {
    "/campaign-info": 0,
    "/ad-entries": 1,
    "/results": 2
  }[location.pathname] || 0;

  const currentStep = stepFromRoute;

  const [campaignName, setCampaignName] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { name: "", ad_title: "", clicks: "", impressions: "", current_budget: "" }
  ]);
  const [response, setResponse] = useState<AnalysisResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/history/");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const handleCampaignChange = (index: number, field: keyof Campaign, value: string) => {
    const updated = [...campaigns];
    updated[index][field] = value;
    setCampaigns(updated);
  };

  const addCampaignRow = () => {
    setCampaigns([
      ...campaigns,
      { name: "", ad_title: "", clicks: "", impressions: "", current_budget: "" }
    ]);
  };

  const removeCampaignRow = (index: number) => {
    setCampaigns(campaigns.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formattedData = {
      campaign_name: campaignName,
      campaigns: campaigns.map((c) => ({
        name: c.name,
        ad_title: c.ad_title,
        clicks: parseInt(c.clicks) || 0,
        impressions: parseInt(c.impressions) || 0,
        current_budget: parseFloat(c.current_budget) || 0
      }))
    };

    try {
      setLoading(true);
      // Simulate API call with mock data for demo
      setTimeout(() => {
        const mockResponse: AnalysisResponse = {
          gpt_recommendation: {
            summary: "Based on your campaign data, here are optimization recommendations",
            insights: ["Increase budget for high-performing ads", "Optimize ad titles for better CTR"]
          },
          data_driven_allocation: campaigns.map((c, i) => ({
            name: c.name || `Ad ${i + 1}`,
            current_budget: parseFloat(c.current_budget) || 0,
            algo_suggested_budget: (parseFloat(c.current_budget) || 0) * (1.2 + Math.random() * 0.6),
            sentiment_analysis: {
              sentiment: ["Positive", "Neutral", "Negative"][Math.floor(Math.random() * 3)],
              explanation: "AI-powered sentiment analysis based on ad performance metrics"
            }
          }))
        };
        setResponse(mockResponse);
        setLoading(false);
        navigate("/results");
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setResponse(null);
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive": return "bg-success text-success-foreground";
      case "negative": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="p-8 bg-card shadow-campaign-glow">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your campaign data...</p>
            </div>
          </Card>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Ad Campaign Optimization
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Plan, analyze and optimize your ad spend across campaigns using data and AI insights.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-center">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {steps.map((label, idx) => (
                    <Button
                      key={idx}
                      variant={currentStep === idx ? "campaign" : "navigation"}
                      className="w-full justify-start"
                      onClick={() => navigate(["/campaign-info", "/ad-entries", "/results"][idx])}
                    >
                      <span className="mr-2">{idx + 1}</span>
                      {label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="bg-gradient-card shadow-campaign-lg">
              <CardContent className="p-8">
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-2">Campaign Information</h2>
                      <p className="text-muted-foreground">Let's start by naming your campaign</p>
                    </div>
                    
                    <div className="max-w-md mx-auto space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Campaign Name</label>
                        <Input
                          type="text"
                          placeholder="Enter your campaign name"
                          value={campaignName}
                          onChange={(e) => setCampaignName(e.target.value)}
                          className="text-center"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-center pt-6">
                      <Button 
                        onClick={() => navigate("/ad-entries")}
                        variant="campaign"
                        size="lg"
                        disabled={!campaignName.trim()}
                      >
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-2">Ad Entries</h2>
                      <p className="text-muted-foreground">Add your ad campaigns and their performance data</p>
                    </div>

                    <div className="space-y-4">
                      {campaigns.map((c, index) => (
                        <Card key={index} className="p-4 border-dashed">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                            <div>
                              <label className="block text-sm font-medium mb-1">Ad Name</label>
                              <Input
                                type="text"
                                placeholder="Ad Name"
                                value={c.name}
                                onChange={(e) => handleCampaignChange(index, "name", e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Ad Title</label>
                              <Input
                                type="text"
                                placeholder="Ad Title"
                                value={c.ad_title}
                                onChange={(e) => handleCampaignChange(index, "ad_title", e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Clicks</label>
                              <Input
                                type="number"
                                placeholder="Clicks"
                                value={c.clicks}
                                onChange={(e) => handleCampaignChange(index, "clicks", e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Impressions</label>
                              <Input
                                type="number"
                                placeholder="Impressions"
                                value={c.impressions}
                                onChange={(e) => handleCampaignChange(index, "impressions", e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Budget ($)</label>
                              <Input
                                type="number"
                                placeholder="Budget"
                                value={c.current_budget}
                                onChange={(e) => handleCampaignChange(index, "current_budget", e.target.value)}
                                required
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeCampaignRow(index)}
                              disabled={campaigns.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCampaignRow}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Ad
                      </Button>
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={() => navigate("/campaign-info")}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        variant="campaign"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Analyze Campaign
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
                      <p className="text-muted-foreground">AI-powered insights for your campaign optimization</p>
                    </div>

                    {response && (
                      <>
                        {/* GPT Recommendations */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <BarChart3 className="mr-2 h-5 w-5" />
                              AI Recommendations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                              {JSON.stringify(response.gpt_recommendation, null, 2)}
                            </pre>
                          </CardContent>
                        </Card>

                        {/* Budget Allocation */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Data-Driven Budget Allocation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                              {JSON.stringify(response.data_driven_allocation, null, 2)}
                            </pre>
                          </CardContent>
                        </Card>

                        {/* Sentiment Analysis */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Sentiment Analysis</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {response.data_driven_allocation.map((c, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div>
                                    <p className="font-medium">{c.name || `Ad #${i + 1}`}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {c.sentiment_analysis?.explanation || "No sentiment data."}
                                    </p>
                                  </div>
                                  {c.sentiment_analysis && (
                                    <Badge className={getSentimentColor(c.sentiment_analysis.sentiment)}>
                                      {c.sentiment_analysis.sentiment}
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Chart */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Budget Comparison Chart</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-96">
                              <Bar
                                data={{
                                  labels: response.data_driven_allocation.map((c) => c.name),
                                  datasets: [
                                    {
                                      label: "Current Budget",
                                      backgroundColor: "hsl(var(--campaign-secondary))",
                                      data: response.data_driven_allocation.map((c) => c.current_budget)
                                    },
                                    {
                                      label: "Optimized Budget",
                                      backgroundColor: "hsl(var(--campaign-primary))",
                                      data: response.data_driven_allocation.map((c) => c.algo_suggested_budget)
                                    }
                                  ]
                                }}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  plugins: {
                                    legend: { position: "top" }
                                  }
                                }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* History Section */}
            <div className="mt-8">
              <div className="flex justify-center mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? "Hide Campaign History" : "Show Campaign History"}
                </Button>
              </div>

              {showHistory && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Campaign History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {history.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No previous campaigns found.</p>
                        <p className="text-sm mt-2">Start by creating your first campaign above!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {history.map((item, index) => (
                          <Card key={index} className="border-l-4 border-l-primary">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{item.campaign_name}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(item.created_at)}
                                </span>
                              </div>
                              <details className="text-sm">
                                <summary className="cursor-pointer text-primary hover:underline">
                                  View Details
                                </summary>
                                <Separator className="my-2" />
                                <div className="space-y-2">
                                  <div>
                                    <p className="font-medium mb-1">Input:</p>
                                    <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                                      {JSON.stringify(item.input_data, null, 2)}
                                    </pre>
                                  </div>
                                  <div>
                                    <p className="font-medium mb-1">GPT Response:</p>
                                    <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                                      {JSON.stringify(item.gpt_response, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                              </details>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;