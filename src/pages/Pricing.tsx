import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, RefreshCw, Settings } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [session, setSession] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true); // Default to annual billing
  const { toast } = useToast();
  const navigate = useNavigate();

  // Stripe Price IDs - replace with your actual Stripe price IDs
  const stripePrices = {
    premiumMonthly: "price_1OxxxxxxxxxxxxMONTHLY", // Replace with actual $2 monthly price ID
    premiumAnnual: "price_1OxxxxxxxxxxxxANNUAL",   // Replace with actual $1 annual price ID
    forever: "price_1OxxxxxxxxxxxxFOREVER",        // Replace with actual $99 one-time price ID
  };

  const getPremiumPlan = () => ({
    name: "Premium",
    price: isAnnual ? "$1" : "$2",
    period: isAnnual ? "per year" : "per month",
    originalPrice: isAnnual ? "$24" : null,
    description: "Unlock your full potential",
    features: [
      "Unlimited guided meditations",
      "All categories (Sleep, Focus, Anxiety)",
      "Advanced breathing techniques",
      "Offline downloads",
      "Progress analytics",
      "Daily reminders",
      "Premium sleep stories"
    ],
    buttonText: session ? "Start Premium" : "Sign Up for Premium",
    popular: true,
    variant: "default" as const,
    priceId: isAnnual ? stripePrices.premiumAnnual : stripePrices.premiumMonthly
  });

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      originalPrice: null,
      description: "Start your mindfulness journey",
      features: [
        "3 guided meditations",
        "Basic breathing exercises", 
        "Sleep stories (limited)",
        "Progress tracking"
      ],
      buttonText: session ? "Current Plan" : "Get Started Free",
      popular: false,
      variant: "outline" as const,
      priceId: null
    },
    getPremiumPlan(),
    {
      name: "Forever",
      price: "$99",
      period: "one-time payment",
      originalPrice: null,
      description: "Mindfulness for life",
      features: [
        "Everything in Premium",
        "Lifetime access",
        "Future content updates",
        "Priority support",
        "Early access to new features",
        "Bonus meditation courses"
      ],
      buttonText: session ? "Get Lifetime Access" : "Sign Up for Lifetime",
      popular: false,
      variant: "secondary" as const,
      priceId: stripePrices.forever
    }
  ];

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (session) {
      checkSubscription();
    }
  }, [session]);

  const initializeAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      // Don't redirect if not logged in - just show pricing page
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkSubscription = async () => {
    if (refreshing) return;
    
    try {
      setRefreshing(true);
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) throw error;
      
      setSubscription(data);
      console.log("Subscription status:", data);
    } catch (error: any) {
      toast({
        title: "Error checking subscription",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleSubscribe = async (priceId: string) => {
    // If user is not logged in, redirect to auth page
    if (!session) {
      navigate("/auth");
      return;
    }
    
    if (!priceId) return;
    
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Error creating checkout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Error opening customer portal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const isSubscribed = subscription?.subscribed;
  const currentTier = subscription?.subscription_tier;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10">
      <Header />
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {isSubscribed ? "My Plan" : "Choose Your Mindfulness Plan"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {isSubscribed 
              ? `You're currently on the ${currentTier} plan. Manage your subscription below.`
              : "Start free and upgrade anytime. Cancel whenever you want."
            }
          </p>
          {/* Subscription Status & Controls - only show for logged in users */}
          {session && (
            <div className="flex items-center justify-center gap-4 mb-8">
              {isSubscribed && (
                <Badge variant="secondary" className="px-3 py-1">
                  Active: {currentTier} Plan
                </Badge>
              )}
              <Button 
                onClick={checkSubscription}
                disabled={refreshing}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh Status
              </Button>
              {isSubscribed && (
                <Button 
                  onClick={handleManageSubscription}
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Manage Subscription
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={!isAnnual ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsAnnual(false)}
              className="rounded-md"
            >
              Monthly
            </Button>
            <Button
              variant={isAnnual ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsAnnual(true)}
              className="rounded-md"
            >
              Annual
              <Badge variant="secondary" className="ml-2 text-xs">Save 50%</Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isCurrentPlan = session && ((plan.name === "Free" && !isSubscribed) || 
                                 (plan.name === "Premium" && isSubscribed));
            
            return (
              <Card 
                key={plan.name} 
                className={`relative transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isCurrentPlan ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                } ${plan.popular && !isSubscribed ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}
              >
                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Your Plan
                    </Badge>
                  </div>
                )}
                {plan.popular && !isSubscribed && !isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                      )}
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-muted-foreground">/{plan.period}</span>
                      {plan.originalPrice && (
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs">50% off</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center group">
                        <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full transition-all duration-200 hover:scale-105 active:scale-95" 
                    variant={isCurrentPlan ? "outline" : plan.variant}
                    size="lg"
                    disabled={isCurrentPlan}
                    onClick={() => {
                      if (!session) {
                        navigate("/auth");
                        return;
                      }
                      if (plan.priceId) {
                        handleSubscribe(plan.priceId);
                      }
                    }}
                  >
                    {isCurrentPlan ? "Current Plan" : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Subscription Info */}
        {isSubscribed && subscription?.subscription_end && (
          <div className="mt-12 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Subscription Details</h3>
                <p className="text-sm text-muted-foreground">
                  Your subscription renews on{" "}
                  {new Date(subscription.subscription_end).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;