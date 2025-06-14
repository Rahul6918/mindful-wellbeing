import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart,
  Share,
  ArrowLeft 
} from "lucide-react";
import { meditationData } from "@/data/meditations";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([80]);
  const [isLiked, setIsLiked] = useState(false);

  // Find meditation by ID (simplified)
  const allMeditations = [
    ...meditationData.beginner,
    ...meditationData.sleep,
    ...meditationData.focus,
  ];
  
  const meditation = allMeditations.find(m => m.id === id) || allMeditations[0];
  const totalDuration = parseInt(meditation.duration) * 60; // Convert to seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)}>
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Meditation Visual */}
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-6">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <div className="w-60 h-60 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
                <div className="w-40 h-40 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className={`w-20 h-20 bg-primary rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
                </div>
              </div>
            </div>
          </div>
          
          <Badge variant="secondary" className="mb-4">
            {meditation.category}
          </Badge>
          <h1 className="text-3xl font-bold text-foreground mb-2">{meditation.title}</h1>
          <p className="text-muted-foreground">{meditation.description}</p>
        </div>

        {/* Player Controls */}
        <Card>
          <CardContent className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <Slider
                value={[currentTime]}
                max={totalDuration}
                step={1}
                onValueChange={handleSeek}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button variant="ghost" size="lg">
                <SkipBack className="h-6 w-6" />
              </Button>
              
              <Button 
                size="lg" 
                className="h-16 w-16 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              
              <Button variant="ghost" size="lg">
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={volume}
                max={100}
                step={1}
                onValueChange={setVolume}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-10">{volume[0]}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Session Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {isPlaying ? "Playing now..." : "Paused"}
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>Duration: {meditation.duration}</span>
            <span>•</span>
            <span>Category: {meditation.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;