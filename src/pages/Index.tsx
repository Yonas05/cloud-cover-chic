import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import LinkedInCover from "@/components/LinkedInCover";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Check } from "lucide-react";

const Index = () => {
  const coverRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");

  const handleDownload = async () => {
    if (!coverRef.current) return;

    setIsExporting(true);
    setExported(false);

    try {
      const linkedInCanvas = document.createElement("canvas");
      linkedInCanvas.width = 1584;
      linkedInCanvas.height = 396;
      const ctx = linkedInCanvas.getContext("2d");

      if (ctx) {
        const rect = coverRef.current.getBoundingClientRect();
        const scaleX = 1584 / rect.width;
        const scaleY = 396 / rect.height;

        // Get computed background color
        const computedStyle = getComputedStyle(document.documentElement);
        const bgColor = computedStyle.getPropertyValue('--background').trim();
        
        // Fill with gradient background
        const gradient = ctx.createLinearGradient(0, 0, 1584, 396);
        gradient.addColorStop(0, 'hsl(220, 20%, 8%)');
        gradient.addColorStop(0.5, 'hsl(220, 20%, 6%)');
        gradient.addColorStop(1, 'hsl(220, 20%, 10%)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1584, 396);

        // Draw grid pattern
        ctx.strokeStyle = 'rgba(0, 209, 178, 0.05)';
        ctx.lineWidth = 1;
        const gridSize = 60 * scaleX;
        for (let x = 0; x < 1584; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 396);
          ctx.stroke();
        }
        for (let y = 0; y < 396; y += gridSize * (rect.height / rect.width)) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1584, y);
          ctx.stroke();
        }

        // Capture the WebGL canvas if it exists
        const webglCanvas = coverRef.current.querySelector('canvas');
        if (webglCanvas && webglCanvas.width > 0 && webglCanvas.height > 0) {
          try {
            ctx.drawImage(webglCanvas, 0, 0, 1584, 396);
          } catch (e) {
            console.log("WebGL canvas capture skipped");
          }
        }

        // Draw glow orbs
        ctx.globalAlpha = 0.15;
        const gradient1 = ctx.createRadialGradient(400, 198, 0, 400, 198, 300);
        gradient1.addColorStop(0, 'hsl(169, 100%, 41%)');
        gradient1.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, 800, 396);

        const gradient2 = ctx.createRadialGradient(1200, 198, 0, 1200, 198, 250);
        gradient2.addColorStop(0, 'hsl(197, 100%, 43%)');
        gradient2.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient2;
        ctx.fillRect(800, 0, 784, 396);
        ctx.globalAlpha = 1;

        // Capture HTML elements (excluding the 3D canvas)
        const webglContainer = coverRef.current.querySelector('.absolute.inset-0.z-0');
        if (webglContainer) {
          (webglContainer as HTMLElement).style.visibility = 'hidden';
        }

        const htmlCanvas = await html2canvas(coverRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
          width: coverRef.current.offsetWidth,
          height: coverRef.current.offsetHeight,
          ignoreElements: (element) => element.tagName.toLowerCase() === 'canvas',
        });

        if (webglContainer) {
          (webglContainer as HTMLElement).style.visibility = 'visible';
        }

        // Draw HTML elements on top
        ctx.drawImage(htmlCanvas, 0, 0, 1584, 396);

        // Corner decorations
        const primaryColor = 'rgba(0, 209, 178, 0.5)';
        ctx.strokeStyle = primaryColor;
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
