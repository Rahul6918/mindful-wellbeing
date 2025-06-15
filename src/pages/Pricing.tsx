import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Start your mindfulness journey",
      features: [
        "3 guided meditations",
        "Basic breathing exercises",
        "Sleep stories (limited)",
        "Progress tracking"
      ],
      buttonText: "Get Started",
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Premium",
      price: isAnnual ? "$1" : "$2",
      originalPrice: isAnnual ? "$12" : "$24",
      period: isAnnual ? "per month (billed annually)" : "per month",
      yearlyPrice: isAnnual ? "$12/year" : null,
      savings: isAnnual ? "Save 50%" : null,
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
      buttonText: "Start Free Trial",
      popular: true,
      variant: "default" as const
    },
    {
      name: "Lifetime",
      price: "$99",
      originalPrice: "$199",
      period: "one-time payment",
      savings: "50% OFF",
      description: "Mindfulness for life",
      features: [
        "Everything in Premium",
        "Lifetime access",
        "Future content updates",
        "Priority support",
        "Early access to new features",
        "Bonus meditation courses"
      ],
      buttonText: "Get Lifetime Access",
      popular: false,
      variant: "secondary" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 breathe-element">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 soft-entrance">
            Choose Your Mindfulness Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 delayed-entrance">
            Start free and upgrade anytime. Cancel whenever you want.
          </p>
          
          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8 delayed-entrance">
            <span className={`text-sm font-medium gentle-transition ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full gentle-transition hover-glow ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background gentle-transition ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium gentle-transition ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2 float-element">
                Save 50%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative card-breathe hover-lift gentle-transition ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105 hover-glow' : ''}`}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 float-element">
                    <Star className="h-3 w-3 mr-1 breathe-element" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold soft-entrance">{plan.name}</CardTitle>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 delayed-entrance">
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    {plan.savings && (
                      <Badge variant="secondary" className="text-xs float-element">
                        {plan.savings}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 delayed-entrance">
                    <span className="text-muted-foreground">/{plan.period}</span>
                    {plan.yearlyPrice && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {plan.yearlyPrice}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mt-2 delayed-entrance">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center soft-entrance" style={{animationDelay: `${(index * 0.2) + (featureIndex * 0.05)}s`}}>
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0 hover-breathe" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full btn-interactive hover-glow" 
                  variant={plan.variant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 soft-entrance">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 card-breathe hover-lift gentle-transition soft-entrance" style={{animationDelay: '0.1s'}}>
              <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 card-breathe hover-lift gentle-transition soft-entrance" style={{animationDelay: '0.2s'}}>
              <h3 className="font-semibold text-lg mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes! Premium comes with a 7-day free trial. No credit card required to start.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 card-breathe hover-lift gentle-transition soft-entrance" style={{animationDelay: '0.3s'}}>
              <h3 className="font-semibold text-lg mb-2">What's included in the free plan?</h3>
              <p className="text-muted-foreground">
                The free plan includes 3 guided meditations, basic breathing exercises, and limited sleep stories to get you started.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 card-breathe hover-lift gentle-transition soft-entrance" style={{animationDelay: '0.4s'}}>
              <h3 className="font-semibold text-lg mb-2">Can I download meditations for offline use?</h3>
              <p className="text-muted-foreground">
                Yes, Premium and Lifetime subscribers can download meditations to listen offline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;