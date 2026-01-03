import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import LinkedInCover from "@/components/LinkedInCover";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Check } from "lucide-react";

const Index = () => {
  const coverRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleDownload = async () => {
    if (!coverRef.current) return;

    setIsExporting(true);
    setExported(false);

    try {
      // Create canvas at LinkedIn cover resolution
      const canvas = await html2canvas(coverRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: "#1e2a3a",
        width: coverRef.current.offsetWidth,
        height: coverRef.current.offsetHeight,
      });

      // Create a new canvas at exact LinkedIn dimensions
      const linkedInCanvas = document.createElement("canvas");
      linkedInCanvas.width = 1584;
      linkedInCanvas.height = 396;
      const ctx = linkedInCanvas.getContext("2d");

      if (ctx) {
        // Draw the captured canvas scaled to LinkedIn dimensions
        ctx.drawImage(canvas, 0, 0, 1584, 396);

        // Convert to blob and download
        linkedInCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "linkedin-cover-cloud-architect.png";
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
          Animated network visualization • Floating cloud icons • Professional tech aesthetic
        </p>
        <p className="text-xs text-muted-foreground/40">
          Tip: The exported image will be static. For best results, ensure the preview looks perfect before downloading.
        </p>
      </div>
    </div>
  );
};

export default Index;
