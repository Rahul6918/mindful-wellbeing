import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
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
      
      <Footer />
    </div>
  );
};

export default Index;
