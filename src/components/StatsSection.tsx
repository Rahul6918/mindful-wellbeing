const StatsSection = () => {
  const stats = [
    { number: "70M+", label: "Happy Members" },
    { number: "500+", label: "Guided Meditations" },
    { number: "4.9★", label: "App Store Rating" },
    { number: "150+", label: "Sleep Stories" },
  ];

  return (
    <section className="py-16 bg-muted/30 breathe-element">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2 soft-entrance hover-lift gentle-transition" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="text-3xl md:text-4xl font-bold text-primary float-element">
                {stat.number}
              </div>
              <div className="text-muted-foreground delayed-entrance">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;