import MeditationCard from "./MeditationCard";

interface CategorySectionProps {
  title: string;
  description: string;
  meditations: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    category: string;
    isLocked?: boolean;
  }>;
}

const CategorySection = ({ title, description, meditations }: CategorySectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meditations.map((meditation) => (
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
      </div>
    </section>
  );
};

export default CategorySection;