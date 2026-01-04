import { useRef, useState } from "react";
import LinkedInCover from "@/components/LinkedInCover";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Check } from "lucide-react";

const Index = () => {
  const coverRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");

  const getThemeColors = () => {
    switch (currentTheme) {
      case "aws":
        return { primary: "#ff9900", accent: "#ff6600", bg1: "hsl(30, 15%, 8%)", bg2: "hsl(30, 15%, 6%)" };
      case "azure":
        return { primary: "#0078d4", accent: "#00bcf2", bg1: "hsl(210, 20%, 8%)", bg2: "hsl(210, 20%, 6%)" };
      case "gcp":
        return { primary: "#4285f4", accent: "#ea4335", bg1: "hsl(220, 15%, 8%)", bg2: "hsl(220, 15%, 6%)" };
      default:
        return { primary: "#00d1b2", accent: "#00b4d8", bg1: "hsl(220, 20%, 8%)", bg2: "hsl(220, 20%, 6%)" };
    }
  };

  const handleDownload = async () => {
    if (!coverRef.current) return;

    setIsExporting(true);
    setExported(false);

    try {
      const colors = getThemeColors();
      const linkedInCanvas = document.createElement("canvas");
      linkedInCanvas.width = 1584;
      linkedInCanvas.height = 396;
      const ctx = linkedInCanvas.getContext("2d");

      if (ctx) {
        // Fill with gradient background
        const gradient = ctx.createLinearGradient(0, 0, 1584, 396);
        gradient.addColorStop(0, colors.bg1);
        gradient.addColorStop(0.5, colors.bg2);
        gradient.addColorStop(1, colors.bg1);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1584, 396);

        // Draw grid pattern
        ctx.strokeStyle = `${colors.primary}15`;
        ctx.lineWidth = 1;
        for (let x = 0; x < 1584; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 396);
          ctx.stroke();
        }
        for (let y = 0; y < 396; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1584, y);
          ctx.stroke();
        }

        // Capture the WebGL canvas
        const webglCanvas = coverRef.current.querySelector('canvas');
        if (webglCanvas) {
          try {
            ctx.drawImage(webglCanvas, 0, 0, 1584, 396);
          } catch (e) {
            console.log("WebGL capture skipped, drawing fallback shapes");
            // Draw fallback 3D-like shapes
            drawFallbackShapes(ctx, colors);
          }
        } else {
          drawFallbackShapes(ctx, colors);
        }

        // Draw glow orbs
        ctx.globalAlpha = 0.2;
        const gradient1 = ctx.createRadialGradient(400, 198, 0, 400, 198, 300);
        gradient1.addColorStop(0, colors.primary);
        gradient1.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient1;
        ctx.beginPath();
        ctx.arc(400, 198, 300, 0, Math.PI * 2);
        ctx.fill();

        const gradient2 = ctx.createRadialGradient(1200, 198, 0, 1200, 198, 250);
        gradient2.addColorStop(0, colors.accent);
        gradient2.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient2;
        ctx.beginPath();
        ctx.arc(1200, 198, 250, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw "Available" badge
        ctx.fillStyle = `${colors.primary}20`;
        ctx.strokeStyle = `${colors.primary}50`;
        ctx.lineWidth = 1;
        roundRect(ctx, 642, 80, 300, 32, 16);
        ctx.fill();
        ctx.stroke();

        // Green dot
        ctx.fillStyle = "#34d399";
        ctx.beginPath();
        ctx.arc(660, 96, 5, 0, Math.PI * 2);
        ctx.fill();

        // Badge text
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = "12px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Available for cloud projects", 675, 100);

        // Main title
        ctx.textAlign = "center";
        ctx.font = "bold 48px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = colors.primary;
        ctx.shadowColor = colors.primary;
        ctx.shadowBlur = 20;
        ctx.fillText("Cloud Solution Architect", 792, 200);
        ctx.shadowBlur = 0;

        // Skills
        ctx.font = "16px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = colors.primary;
        ctx.fillText("AWS", 680, 260);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText("•", 720, 260);
        ctx.fillStyle = colors.accent;
        ctx.fillText("Infrastructure as Code", 792, 260);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText("•", 895, 260);
        ctx.fillStyle = colors.primary;
        ctx.fillText("DevOps", 935, 260);

        // Corner decorations
        ctx.strokeStyle = `${colors.primary}80`;
        ctx.lineWidth = 1;
        
        // Top-left corner
        ctx.beginPath();
        ctx.moveTo(16, 16);
        ctx.lineTo(16, 80);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(16, 16);
        ctx.lineTo(80, 16);
        ctx.stroke();
        
        // Bottom-right corner
        ctx.beginPath();
        ctx.moveTo(1568, 380);
        ctx.lineTo(1568, 316);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(1568, 380);
        ctx.lineTo(1504, 380);
        ctx.stroke();

        linkedInCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = `linkedin-cover-${currentTheme}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            setExported(true);
            setTimeout(() => setExported(false), 3000);
          }
        }, "image/png", 1.0);
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const drawFallbackShapes = (ctx: CanvasRenderingContext2D, colors: { primary: string; accent: string }) => {
    // Draw abstract 3D-like shapes as fallback
    const shapes = [
      { x: 200, y: 120, size: 60, color: colors.primary },
      { x: 1400, y: 100, size: 50, color: colors.accent },
      { x: 150, y: 280, size: 40, color: colors.accent },
      { x: 1450, y: 300, size: 45, color: colors.primary },
      { x: 300, y: 200, size: 35, color: colors.primary },
      { x: 1300, y: 250, size: 38, color: colors.accent },
    ];

    shapes.forEach(shape => {
      ctx.globalAlpha = 0.6;
      
      // Glow
      const glow = ctx.createRadialGradient(shape.x, shape.y, 0, shape.x, shape.y, shape.size * 1.5);
      glow.addColorStop(0, shape.color + "40");
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.size * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Shape
      ctx.fillStyle = shape.color;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;

    // Draw particles
    ctx.fillStyle = colors.primary;
    for (let i = 0; i < 100; i++) {
      ctx.globalAlpha = Math.random() * 0.5 + 0.2;
      ctx.beginPath();
      ctx.arc(
        Math.random() * 1584,
        Math.random() * 396,
        Math.random() * 2 + 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw rings
    ctx.strokeStyle = colors.primary + "40";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(792, 198, 300, 80, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = colors.accent + "30";
    ctx.beginPath();
    ctx.ellipse(792, 198, 400, 100, 0.2, 0, Math.PI * 2);
    ctx.stroke();
  };

  const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  return (
    <div className="min-h-screen bg-cloud-dark flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-500">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          LinkedIn Cover Photo Preview
        </h1>
        <p className="text-muted-foreground text-sm md:text-base mb-4">
          Professional Cloud Architect Banner — 1584 × 396 pixels
        </p>
        
        {/* Theme Switcher */}
        <div className="flex justify-center">
          <ThemeSwitcher onThemeChange={setCurrentTheme} />
        </div>
      </div>

      {/* Cover Photo Container */}
      <div className="w-full max-w-6xl" ref={coverRef}>
        <LinkedInCover />
      </div>

      {/* Download Button */}
      <div className="mt-8">
        <Button
          onClick={handleDownload}
          disabled={isExporting}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-base gap-3 glow-teal transition-all duration-300"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating PNG...
            </>
          ) : exported ? (
            <>
              <Check className="w-5 h-5" />
              Downloaded!
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download for LinkedIn (1584×396)
            </>
          )}
        </Button>
      </div>

      {/* Info section */}
      <div className="mt-6 text-center max-w-lg">
        <p className="text-xs text-muted-foreground/60 mb-2">
          Choose your cloud provider theme • Click download to export
        </p>
      </div>
    </div>
  );
};

export default Index;
