import Cover3DScene from "./Cover3DScene";
import CloudIcon from "./CloudIcon";
import { 
  LambdaIcon, 
  KubernetesIcon, 
  TerraformIcon, 
  DockerIcon, 
  CloudFormationIcon,
  EC2Icon,
  S3Icon,
  RDSIcon,
  VPCIcon,
  Route53Icon,
  ELBIcon,
  DynamoDBIcon,
  ECSIcon,
  EKSIcon,
  APIGatewayIcon,
} from "./TechIcons";

const LinkedInCover = () => {
  return (
    <div className="relative w-full aspect-[4/1] bg-background overflow-hidden rounded-lg border border-border/50">
      {/* Dark gradient background matching reference */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 40%, hsl(180 80% 20% / 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 50%, hsl(180 100% 30% / 0.1) 0%, transparent 50%),
            linear-gradient(180deg, hsl(200 30% 8%) 0%, hsl(200 25% 6%) 50%, hsl(200 30% 10%) 100%)
          `
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* 3D Scene */}
      <Cover3DScene />

      {/* AWS Service Icons - Left side */}
      <div className="absolute top-[12%] left-[4%] animate-float opacity-60">
        <div className="relative">
          <div className="absolute inset-0 blur-md opacity-40 bg-primary rounded-full scale-150" />
          <EC2Icon size={28} className="relative text-primary drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute top-[35%] left-[6%] animate-float-delay opacity-50">
        <div className="relative">
          <div className="absolute inset-0 blur-md opacity-30 bg-accent rounded-full scale-150" />
          <S3Icon size={26} className="relative text-accent drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-[30%] left-[3%] animate-float opacity-55">
        <div className="relative">
          <div className="absolute inset-0 blur-md opacity-35 bg-primary rounded-full scale-125" />
          <LambdaIcon size={24} className="relative text-primary drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-[12%] left-[8%] animate-float-delay opacity-45">
        <div className="relative">
          <div className="absolute inset-0 blur-md opacity-30 bg-accent rounded-full scale-125" />
          <RDSIcon size={22} className="relative text-accent drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute top-[55%] left-[15%] animate-float opacity-40">
        <div className="relative">
          <div className="absolute inset-0 blur-sm opacity-30 bg-primary rounded-full scale-125" />
          <VPCIcon size={20} className="relative text-primary drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute top-[20%] left-[12%] animate-float-delay opacity-45">
        <div className="relative">
          <div className="absolute inset-0 blur-sm opacity-25 bg-accent rounded-full scale-125" />
          <ECSIcon size={22} className="relative text-accent drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-[45%] left-[18%] animate-float opacity-35">
        <div className="relative">
          <div className="absolute inset-0 blur-sm opacity-25 bg-primary rounded-full scale-125" />
          <DynamoDBIcon size={20} className="relative text-primary drop-shadow-lg" />
        </div>
      </div>

      {/* AWS Service Icons - Right side */}
      <div className="absolute top-[15%] right-[5%] animate-float-delay opacity-55">
        <div className="relative">
          <div className="absolute inset-0 blur-md opacity-40 bg-accent rounded-full scale-150" />
          <DockerIcon size={28} className="relative text-accent drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute top-[40%] right-[3%] animate-float opacity-50">
        <div className="relative">
          <div className="absolute inset-0 blur-md opacity-35 bg-primary rounded-full scale-125" />
          <KubernetesIcon size={26} className="relative text-primary drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-[25%] right-[6%] animate-float-delay opacity-45">
        <div className="relative">
          <div className="absolute inset-0 blur-md opacity-30 bg-accent rounded-full scale-125" />
          <TerraformIcon size={24} className="relative text-accent drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-[10%] right-[12%] animate-float opacity-40">
        <div className="relative">
          <div className="absolute inset-0 blur-sm opacity-25 bg-primary rounded-full scale-125" />
          <CloudFormationIcon size={22} className="relative text-primary drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute top-[60%] right-[15%] animate-float-delay opacity-35">
        <div className="relative">
          <div className="absolute inset-0 blur-sm opacity-25 bg-accent rounded-full scale-125" />
          <Route53Icon size={20} className="relative text-accent drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute top-[25%] right-[10%] animate-float opacity-40">
        <div className="relative">
          <div className="absolute inset-0 blur-sm opacity-30 bg-primary rounded-full scale-125" />
          <ELBIcon size={22} className="relative text-primary drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-[50%] right-[18%] animate-float-delay opacity-35">
        <div className="relative">
          <div className="absolute inset-0 blur-sm opacity-20 bg-accent rounded-full scale-125" />
          <EKSIcon size={20} className="relative text-accent drop-shadow-lg" />
        </div>
      </div>
      <div className="absolute top-[75%] right-[20%] animate-float opacity-30">
        <div className="relative">
          <div className="absolute inset-0 blur-sm opacity-20 bg-primary rounded-full scale-125" />
          <APIGatewayIcon size={18} className="relative text-primary drop-shadow-lg" />
        </div>
      </div>

      {/* Main glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-primary/8 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-accent/5 rounded-full blur-[60px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[40%] right-[30%] translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-accent/5 rounded-full blur-[60px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-8">
        {/* Available badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
          <span className="text-xs font-medium tracking-wide text-foreground/90">
            Available for cloud projects
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          <span className="text-primary text-glow">Cloud Solution Architect</span>
        </h1>

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
