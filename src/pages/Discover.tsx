import Header from "@/components/Header";
import CategorySection from "@/components/CategorySection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Sparkles, TrendingUp, Calendar, Clock, Search } from "lucide-react";
import { meditationData } from "@/data/meditations";
import { useState } from "react";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const allMeditations = [
    ...meditationData.beginner,
    ...meditationData.sleep,
    ...meditationData.focus
  ];
  
  const filteredMeditations = allMeditations.filter(meditation => {
    const matchesSearch = meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meditation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           meditation.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  
  const featuredContent = [
    {
      title: "7-Day Mindfulness Challenge",
      description: "Start your journey with our beginner-friendly challenge",
      image: "gradient-1",
      tag: "Challenge",
      duration: "7 days"
    },
    {
      title: "Deep Sleep Stories",
      description: "Drift off to peaceful narratives designed for rest",
      image: "gradient-2", 
      tag: "Featured",
      duration: "30-45 min"
    },
    {
      title: "Quick Focus Breaks",
      description: "5-minute sessions perfect for busy schedules",
      image: "gradient-3",
      tag: "Popular",
      duration: "5 min"
    }
  ];

  const dailyRecommendation = meditationData.beginner[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Discover Your Path
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore curated content designed to help you find peace, focus, and better sleep
          </p>
        </div>

        {/* Daily Recommendation */}
        <Card className="mb-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Today's Pick</Badge>
            </div>
            <CardTitle className="text-2xl">Daily Recommendation</CardTitle>
            <CardDescription>
              Personalized just for you based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full animate-[breathe_4s_ease-in-out_infinite]"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {dailyRecommendation.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {dailyRecommendation.description}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {dailyRecommendation.duration}
                  </div>
                  <Badge variant="outline">{dailyRecommendation.category}</Badge>
                </div>
                <Button>Start Session</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Content */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Featured Content</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredContent.map((content, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className={`h-48 bg-gradient-to-br ${
                    index === 0 ? 'from-blue-500/20 to-purple-500/20' :
                    index === 1 ? 'from-green-500/20 to-teal-500/20' :
                    'from-orange-500/20 to-red-500/20'
                  } rounded-t-lg flex items-center justify-center`}>
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-primary rounded-full animate-[breathe_4s_ease-in-out_infinite]"></div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{content.tag}</Badge>
                      <span className="text-sm text-muted-foreground">{content.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {content.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Category Pills */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                  <TabsTrigger 
                    value="all" 
                    className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="basics" 
                    className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Basics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sleep" 
                    className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Sleep
                  </TabsTrigger>
                  <TabsTrigger 
                    value="focus" 
                    className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Focus
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search meditations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          {/* Results */}
          <CategorySection
            title={`${filteredMeditations.length} ${filteredMeditations.length === 1 ? 'Result' : 'Results'}`}
            description={searchQuery ? `Showing results for "${searchQuery}"` : "Explore all available meditations"}
            meditations={filteredMeditations}
          />
        </div>

        {/* Statistics */}
        <Card className="bg-muted/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join millions finding peace daily
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary">2M+</div>
                <div className="text-muted-foreground">Daily users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Meditations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4.9★</div>
                <div className="text-muted-foreground">User rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Discover;