import { Cloud, Server, Database, Globe, Cpu, Shield, Zap, GitBranch } from "lucide-react";

interface CloudIconProps {
  type: "cloud" | "server" | "database" | "globe" | "cpu" | "shield" | "zap" | "git";
  className?: string;
  size?: number;
}

const iconMap = {
  cloud: Cloud,
  server: Server,
  database: Database,
  globe: Globe,
  cpu: Cpu,
  shield: Shield,
  zap: Zap,
  git: GitBranch,
};

const CloudIcon = ({ type, className = "", size = 32 }: CloudIconProps) => {
  const Icon = iconMap[type];
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 blur-xl opacity-40 bg-primary rounded-full" />
      <Icon size={size} className="relative text-primary drop-shadow-lg" strokeWidth={1.5} />
    </div>
  );
};

export default CloudIcon;
