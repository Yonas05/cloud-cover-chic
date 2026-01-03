import CloudNetwork from "./CloudNetwork";
import CloudIcon from "./CloudIcon";

const LinkedInCover = () => {
  return (
    <div className="relative w-full aspect-[4/1] bg-background overflow-hidden rounded-lg border border-border/50">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cloud-dark via-background to-cloud-medium" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 209, 178, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 209, 178, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated network canvas */}
      <CloudNetwork />

      {/* Floating cloud icons */}
      <div className="absolute top-[15%] left-[8%] animate-float opacity-40">
        <CloudIcon type="cloud" size={48} />
      </div>
      <div className="absolute top-[25%] right-[12%] animate-float-delay opacity-30">
        <CloudIcon type="server" size={40} />
      </div>
      <div className="absolute bottom-[20%] left-[15%] animate-float-delay opacity-35">
        <CloudIcon type="database" size={36} />
      </div>
      <div className="absolute top-[35%] left-[30%] animate-float opacity-25">
        <CloudIcon type="shield" size={32} />
      </div>
      <div className="absolute bottom-[30%] right-[20%] animate-float opacity-30">
        <CloudIcon type="cpu" size={38} />
      </div>
      <div className="absolute top-[20%] right-[35%] animate-float-delay opacity-25">
        <CloudIcon type="git" size={30} />
      </div>
      <div className="absolute bottom-[25%] right-[40%] animate-float opacity-20">
        <CloudIcon type="zap" size={28} />
      </div>

      {/* Main glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-primary/10 rounded-full blur-[80px] animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-accent/10 rounded-full blur-[60px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Content overlay - centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-8">
        {/* Available badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
          <span className="text-xs font-medium tracking-wide text-foreground/90">
            Available for cloud projects
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-1">
          <span className="text-foreground">Yonas Fayera</span>
        </h1>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          <span className="text-primary text-glow">Itana</span>
        </h2>

        {/* Title */}
        <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide mb-4">
          Cloud Solution Architect
        </p>

        {/* Skills */}
        <div className="flex items-center gap-3 text-sm md:text-base">
          <span className="text-primary font-medium">AWS</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-accent font-medium">Infrastructure as Code</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-primary font-medium">DevOps</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-4 left-4 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute top-4 left-4 w-16 h-px bg-gradient-to-r from-primary/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-4 right-4 w-px h-16 bg-gradient-to-t from-primary/50 to-transparent" />
        <div className="absolute bottom-4 right-4 w-16 h-px bg-gradient-to-l from-primary/50 to-transparent" />
      </div>
    </div>
  );
};

export default LinkedInCover;
