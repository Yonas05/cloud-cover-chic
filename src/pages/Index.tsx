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
      const canvas = await html2canvas(coverRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        width: coverRef.current.offsetWidth,
        height: coverRef.current.offsetHeight,
      });

      const linkedInCanvas = document.createElement("canvas");
      linkedInCanvas.width = 1584;
      linkedInCanvas.height = 396;
      const ctx = linkedInCanvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(canvas, 0, 0, 1584, 396);

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
