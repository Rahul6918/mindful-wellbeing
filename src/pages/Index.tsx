import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CategorySection from "@/components/CategorySection";
import { meditationData } from "@/data/meditations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      
      <CategorySection
        title="Perfect for Beginners"
        description="New to meditation? Start here with our foundational courses designed to introduce you to mindfulness."
        meditations={meditationData.beginner}
      />
      
      <CategorySection
        title="Sleep Better Tonight"
        description="Wind down with our collection of sleep meditations and bedtime stories."
        meditations={meditationData.sleep}
      />
      
      <CategorySection
        title="Sharpen Your Focus"
        description="Enhance your concentration and productivity with targeted focus sessions."
        meditations={meditationData.focus}
      />
      
      {/* Footer */}
      <footer className="bg-muted/50 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Mindful</h2>
          <p className="text-muted-foreground mb-6">
            Your journey to better mental health starts here
          </p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
