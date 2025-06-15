import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-background via-primary/5 to-secondary/10 py-20 breathe-element">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight soft-entrance">
            Find your calm in the
            <span className="text-primary hover-glow"> everyday chaos</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed delayed-entrance">
            Discover thousands of guided meditations, sleep stories, and mindfulness exercises 
            designed to help you stress less and live more mindfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center delayed-entrance">
            <Button asChild size="lg" className="text-lg px-8 py-6 btn-interactive hover-glow">
              <Link to="/meditations">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 btn-interactive hover-lift">
              <Link to="/discover">Try Free for 7 Days</Link>
            </Button>
          </div>
        </div>
        
        {/* Visual Element */}
        <div className="mt-16 flex justify-center soft-entrance">
          <div className="relative hover-lift">
            <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center breathe-element hover-glow">
              <div className="w-60 h-60 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center animate-breathe-slow">
                <div className="w-40 h-40 bg-primary/20 rounded-full flex items-center justify-center float-element">
                  <div className="w-20 h-20 bg-primary rounded-full animate-[breathe_4s_ease-in-out_infinite] hover-breathe"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full animate-[breathe_4s_ease-in-out_infinite] float-element"></div>
            <div className="absolute -bottom-8 -left-8 w-6 h-6 bg-accent rounded-full animate-[breathe_4s_ease-in-out_infinite] float-element"></div>
            <div className="absolute -top-8 -left-4 w-4 h-4 bg-primary/60 rounded-full animate-breathe-slow"></div>
            <div className="absolute -bottom-4 -right-8 w-5 h-5 bg-secondary/60 rounded-full animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;