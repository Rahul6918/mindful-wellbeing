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
    <Card className="cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground">{duration}</span>
        </div>
        <CardTitle className="text-lg">
          {title}
        </CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
          </div>
        </div>
        {isLocked ? (
          <Button className="w-full" variant="outline" disabled>
            Unlock with Premium
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link to={`/player/${id}`}>Start Session</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MeditationCard;