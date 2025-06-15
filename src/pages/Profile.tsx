import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Award, Settings, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (error) throw error;

        if (profile) {
          setDisplayName(profile.display_name || "User");
        } else {
          setDisplayName("User");
        }
      } catch (error: any) {
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate, toast]);

  const stats = [
    { label: "Total Sessions", value: "47", icon: Calendar },
    { label: "Total Time", value: "12h 30m", icon: Clock },
    { label: "Current Streak", value: "7 days", icon: TrendingUp },
    { label: "Achievements", value: "12", icon: Award },
  ];

  const achievements = [
    { title: "First Steps", description: "Complete your first meditation", unlocked: true },
    { title: "Week Warrior", description: "Meditate for 7 days straight", unlocked: true },
    { title: "Zen Master", description: "Complete 50 meditation sessions", unlocked: false },
    { title: "Night Owl", description: "Complete 10 sleep meditations", unlocked: true },
  ];

  const recentSessions = [
    { title: "Morning Mindfulness", duration: "10 min", date: "Today" },
    { title: "Deep Sleep", duration: "20 min", date: "Yesterday" },
    { title: "Focus Flow", duration: "15 min", date: "2 days ago" },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback>
              {displayName
                .split(" ")
                .map((name) => name.charAt(0))
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{displayName}</h1>
            <p className="text-muted-foreground mb-4">
              Member since March 2024 • Mindfulness Practitioner
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">Level 3</Badge>
              <Badge variant="outline">47 Sessions</Badge>
            </div>
          </div>
          
          <Button variant="outline" asChild>
            <Link to="/profile/edit">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                Keep up the great work on your mindfulness journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Weekly Goal</span>
                  <span className="text-sm text-muted-foreground">5/7 sessions</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Next Level</span>
                  <span className="text-sm text-muted-foreground">47/60 sessions</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
              <CardDescription>Your latest meditation activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{session.title}</div>
                      <div className="text-sm text-muted-foreground">{session.date}</div>
                    </div>
                    <Badge variant="outline">{session.duration}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Unlock badges as you progress on your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked
                      ? "bg-primary/10 border-primary/20"
                      : "bg-muted/30 border-border opacity-60"
                  }`}
                >
                  <Award
                    className={`h-8 w-8 mb-2 ${
                      achievement.unlocked ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <h4 className="font-medium text-foreground mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked && (
                    <Badge variant="secondary" className="mt-2">Unlocked</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;