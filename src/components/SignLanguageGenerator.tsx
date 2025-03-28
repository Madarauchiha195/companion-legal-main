
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SignLanguageGeneratorProps {
  text: string;
  onVideoGenerated?: (videoUrl: string) => void;
}

const API_URL = "https://sing-lang-creation-backend.onrender.com/get_frames";

const SignLanguageGenerator: React.FC<SignLanguageGeneratorProps> = ({ 
  text,
  onVideoGenerated 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [signGrammar, setSignGrammar] = useState<string | null>(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [fileSize, setFileSize] = useState("calculating...");
  const [timeLeft, setTimeLeft] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (text) {
      generateVideo();
    }
  }, [text]);
  
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.addEventListener("timeupdate", updateTimeLeft);
      return () => {
        videoRef.current?.removeEventListener("timeupdate", updateTimeLeft);
      };
    }
  }, [videoUrl, totalDuration]);
  
  const updateTimeLeft = () => {
    if (videoRef.current) {
      const remaining = Math.max(0, totalDuration - videoRef.current.currentTime);
      setTimeLeft(remaining);
    }
  };

  const generateVideo = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setVideoUrl(null);
    setSignGrammar(null);
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      
      // Set sign grammar
      setSignGrammar(data.sign_grammar);
      
      if (!data.frames || data.frames.length === 0) {
        throw new Error("No valid frames received");
      }
      
      const totalDur = data.total_duration || 0;
      setTotalDuration(totalDur);
      
      // Get frame size from the first frame
      const firstFrame = data.frames[0]?.frames[0];
      if (!firstFrame) {
        throw new Error("No frames available");
      }
      
      // Create an off-screen canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const tempImg = new Image();
      tempImg.src = `data:image/jpeg;base64,${firstFrame}`;
      await new Promise<void>((resolve) => {
        tempImg.onload = () => {
          canvas.width = tempImg.width;
          canvas.height = tempImg.height;
          resolve();
        };
      });
      
      // Capture the video stream from the canvas
      const FPS = 30;
      const videoStream = canvas.captureStream(FPS);
      const mediaRecorder = new MediaRecorder(videoStream, { mimeType: "video/webm" });
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
        setFileSize(sizeMB);
        
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        
        if (onVideoGenerated) {
          onVideoGenerated(url);
        }
        
        setIsLoading(false);
      };
      
      mediaRecorder.start();
      
      // Render frames with proper delay
      for (const wordData of data.frames) {
        for (let i = 0; i < wordData.frames.length; i++) {
          const frame = wordData.frames[i];
          const duration = (wordData.durations && wordData.durations[i]) || 0.1;
          if (!frame) continue;
          
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.src = `data:image/jpeg;base64,${frame}`;
            img.onload = () => {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              setTimeout(resolve, duration * 1000);
            };
          });
        }
      }
      
      // Stop recording after total duration plus buffer
      setTimeout(() => {
        mediaRecorder.stop();
      }, totalDur * 1000 + 100);
      
    } catch (error) {
      console.error("Error generating sign language video:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <canvas ref={canvasRef} className="hidden" />
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Generating sign language video...</p>
        </div>
      )}
      
      {signGrammar && (
        <div className="bg-muted p-3 rounded-md">
          <h3 className="text-sm font-medium mb-1">Converted Sign Grammar:</h3>
          <p className="text-sm">{signGrammar}</p>
        </div>
      )}
      
      {videoUrl && (
        <div className="space-y-3">
          <video 
            ref={videoRef} 
            src={videoUrl} 
            controls 
            className="w-full rounded-md border" 
          />
          
          <div className="text-xs space-y-1 text-muted-foreground">
            <div><span className="font-medium">Duration:</span> {totalDuration.toFixed(2)} sec</div>
            <div><span className="font-medium">File Size:</span> {fileSize} MB</div>
            <div><span className="font-medium">Time Left:</span> {timeLeft.toFixed(2)} sec</div>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full"
            onClick={() => {
              const a = document.createElement("a");
              a.href = videoUrl;
              a.download = "sign_language.webm";
              a.click();
            }}
          >
            Download Video
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignLanguageGenerator;
