import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MeditationCardProps {
  title: string;
  description: string;
  duration: string;
  category: string;
  image?: string;
  isLocked?: boolean;
}

const MeditationCard = ({ 
  title, 
  description, 
  duration, 
  category, 
  image,
  isLocked = false 
}: MeditationCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground">{duration}</span>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
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
        <Button 
          className="w-full" 
          variant={isLocked ? "outline" : "default"}
          disabled={isLocked}
          onClick={() => !isLocked && (window.location.href = `/player/meditation-1`)}
        >
          {isLocked ? "Unlock with Premium" : "Start Session"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MeditationCard;