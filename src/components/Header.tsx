import { Button } from "@/components/ui/button";
import { User, Menu, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const navigationLinks = [
    { to: "/discover", label: "Discover" },
    { to: "/meditations", label: "Meditations" },
    { to: "/pricing", label: "Pricing" },
    ...(session ? [{ to: "/profile", label: "Profile" }] : []),
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80">
            Mindful
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigationLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop Auth/Profile */}
          <div className="hidden sm:flex items-center space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobile && (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4 space-y-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2 text-lg text-foreground hover:text-primary"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t space-y-3">
                    {session ? (
                      <Button onClick={handleSignOut} className="w-full flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/auth" onClick={() => setIsDrawerOpen(false)}>
                            <User className="h-4 w-4 mr-2" />
                            Sign In
                          </Link>
                        </Button>
                        <Button className="w-full" asChild>
                          <Link to="/auth" onClick={() => setIsDrawerOpen(false)}>
                            Get Started
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;