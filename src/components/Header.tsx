import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 breathe-element">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 gentle-transition hover-glow">
            Mindful
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/discover" className="text-foreground hover:text-primary gentle-transition hover-lift">
              Discover
            </Link>
            <Link to="/meditations" className="text-foreground hover:text-primary gentle-transition hover-lift">
              Meditations
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary gentle-transition hover-lift">
              Pricing
            </Link>
            <Link to="/profile" className="text-foreground hover:text-primary gentle-transition hover-lift">
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="btn-interactive hover-breathe">
            <User className="h-4 w-4 mr-2 float-element" />
            Sign In
          </Button>
          <Button size="sm" className="btn-interactive hover-glow">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;