import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            Mindful
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/discover" className="text-foreground hover:text-primary transition-colors">
              Discover
            </Link>
            <Link to="/meditations" className="text-foreground hover:text-primary transition-colors">
              Meditations
            </Link>
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;