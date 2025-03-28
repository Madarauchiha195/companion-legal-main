
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, FileText } from "lucide-react";
import { toast } from "sonner";

type FileUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (file: File, description: string) => void;
  type: "document" | "image";
};

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({
  open,
  onOpenChange,
  onFileUpload,
  type,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState("");
  
  const allowedTypes = type === "document" 
    ? ".pdf,.doc,.docx,.txt"
    : "image/*";
  
  const title = type === "document" ? "Upload Document" : "Upload Image";
  const icon = type === "document" ? FileText : Upload;
  
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check if file type is allowed
      if (type === "document" && !droppedFile.name.match(/\.(pdf|doc|docx|txt)$/i)) {
        toast.error("Please upload a valid document file (.pdf, .doc, .docx, .txt)");
        return;
      }
      
      if (type === "image" && !droppedFile.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      
      setFile(droppedFile);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async () => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onFileUpload(file, description);
      toast.success(`${type === "document" ? "Document" : "Image"} uploaded successfully`);
      
      // Reset form and close dialog
      setFile(null);
      setDescription("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(`Failed to upload ${type === "document" ? "document" : "image"}`);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <icon.render className="h-5 w-5" />
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            } ${file ? "bg-muted/50" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              {file ? (
                <>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <icon.render className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <>
                  <div className="p-3 bg-muted rounded-full">
                    <icon.render className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Drag & drop your {type === "document" ? "document" : "image"} here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or click to browse
                    </p>
                  </div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" type="button">
                      Choose File
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept={allowedTypes}
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="file-description" className="text-sm font-medium block mb-2">
              Description (optional)
            </label>
            <textarea
              id="file-description"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              rows={3}
              placeholder={`Add a description for this ${type}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={!file || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>Upload</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
