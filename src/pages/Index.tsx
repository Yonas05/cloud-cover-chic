import LinkedInCover from "@/components/LinkedInCover";

const Index = () => {
  return (
    <div className="min-h-screen bg-cloud-dark flex flex-col items-center justify-center p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          LinkedIn Cover Photo Preview
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Professional Cloud Architect Banner — 1584 × 396 pixels (4:1 ratio)
        </p>
      </div>

      {/* Cover Photo Container */}
      <div className="w-full max-w-6xl">
        <LinkedInCover />
      </div>

      {/* Info section */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground/60">
          Animated network visualization • Floating cloud icons • Professional tech aesthetic
        </p>
      </div>
    </div>
  );
};

export default Index;
