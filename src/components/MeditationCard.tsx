import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface MeditationCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  image?: string;
  isLocked?: boolean;
}

const MeditationCard = ({ 
  id,
  title, 
  description, 
  duration, 
  category, 
  image,
  isLocked = false 
}: MeditationCardProps) => {
  return (
    <Card className="card-breathe hover:shadow-lg gentle-transition cursor-pointer group hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between soft-entrance">
          <Badge variant="secondary" className="text-xs hover-breathe">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground delayed-entrance">{duration}</span>
        </div>
        <CardTitle className="text-lg group-hover:text-primary gentle-transition delayed-entrance">
          {title}
        </CardTitle>
        <CardDescription className="text-sm delayed-entrance">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center hover-glow gentle-transition">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center float-element">
            <div className="w-8 h-8 bg-primary rounded-full animate-[breathe_4s_ease-in-out_infinite] hover-breathe"></div>
          </div>
        </div>
        {isLocked ? (
          <Button className="w-full btn-interactive" variant="outline" disabled>
            Unlock with Premium
          </Button>
        ) : (
          <Button asChild className="w-full btn-interactive hover-glow">
            <Link to={`/player/${id}`}>Start Session</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MeditationCard;