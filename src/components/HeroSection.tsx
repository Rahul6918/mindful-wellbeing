import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-background via-primary/5 to-secondary/10 py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find your calm in the
            <span className="text-primary"> everyday chaos</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of guided meditations, sleep stories, and mindfulness exercises 
            designed to help you stress less and live more mindfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Try Free for 7 Days
            </Button>
          </div>
        </div>
        
        {/* Visual Element */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <div className="w-60 h-60 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
                <div className="w-40 h-40 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;