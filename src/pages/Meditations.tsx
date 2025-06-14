import { useState } from "react";
import Header from "@/components/Header";
import MeditationCard from "@/components/MeditationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { meditationData } from "@/data/meditations";

const Meditations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allMeditations = [
    ...meditationData.beginner,
    ...meditationData.sleep,
    ...meditationData.focus,
  ];

  const categories = ["all", "beginner", "sleep", "focus"];

  const filteredMeditations = allMeditations.filter((meditation) => {
    const matchesSearch = meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meditation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || meditation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Meditations</h1>
          <p className="text-muted-foreground mb-6">
            Discover your perfect meditation session from our extensive library
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search meditations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer capitalize"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Meditation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMeditations.map((meditation) => (
            <MeditationCard
              key={meditation.id}
              id={meditation.id}
              title={meditation.title}
              description={meditation.description}
              duration={meditation.duration}
              category={meditation.category}
              isLocked={meditation.isLocked}
            />
          ))}
        </div>

        {filteredMeditations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No meditations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meditations;