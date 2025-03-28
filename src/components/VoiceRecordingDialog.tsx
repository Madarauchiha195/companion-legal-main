
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";
import { toast } from "sonner";

type VoiceRecordingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecordingComplete: (audioBlob: Blob, transcript: string) => void;
};

const VoiceRecordingDialog: React.FC<VoiceRecordingDialogProps> = ({
  open,
  onOpenChange,
  onRecordingComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clean up when dialog closes
  useEffect(() => {
    if (!open) {
      stopRecording();
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
    }
  }, [open]);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });
      
      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to access microphone. Please check permissions.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  const handleSubmit = async () => {
    if (!audioBlob) return;
    
    setIsTranscribing(true);
    
    try {
      // In a real app, you would send the audio to a speech-to-text service
      // Here we'll just simulate it with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock transcript
      const transcript = "This is a simulated transcript of your audio recording.";
      
      onRecordingComplete(audioBlob, transcript);
      onOpenChange(false);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast.error("Failed to transcribe audio");
    } finally {
      setIsTranscribing(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            <span>Voice Recording</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-6 space-y-6">
          <div className="text-4xl font-mono">
            {formatTime(recordingTime)}
          </div>
          
          <div className="flex gap-4">
            {!isRecording && !audioBlob && (
              <Button
                type="button"
                size="icon"
                className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600"
                onClick={startRecording}
              >
                <Mic className="h-8 w-8" />
              </Button>
            )}
            
            {isRecording && (
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-16 w-16 rounded-full border-red-500 text-red-500"
                onClick={stopRecording}
              >
                <Square className="h-6 w-6" />
              </Button>
            )}
          </div>
          
          {audioUrl && (
            <div className="w-full">
              <audio src={audioUrl} controls className="w-full" />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isTranscribing}
          >
            Cancel
          </Button>
          
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={!audioBlob || isTranscribing}
          >
            {isTranscribing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Transcribing...
              </>
            ) : (
              <>Use Recording</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceRecordingDialog;
