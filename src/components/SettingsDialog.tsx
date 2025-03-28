
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLanguageChange?: (language: string) => void;
  currentLanguage: string;
};

const SettingsDialog: React.FC<SettingsDialogProps> = ({ 
  open, 
  onOpenChange,
  onLanguageChange,
  currentLanguage = "english"
}) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    
    if (onLanguageChange) {
      onLanguageChange(value);
    }
    
    toast({
      title: "Language Updated",
      description: `Language has been changed to ${value.charAt(0).toUpperCase() + value.slice(1)}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <h3 className="text-sm font-medium mb-2">Language</h3>
            <Select 
              value={selectedLanguage} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="kannada">Kannada</SelectItem>
                <SelectItem value="telugu">Telugu</SelectItem>
                <SelectItem value="urdu">Urdu</SelectItem>
                <SelectItem value="sign">Sign Language</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-1">Legal Information</h3>
            <div className="space-y-1">
              <Link to="/privacy" className="text-sm text-blue-600 hover:underline block">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-blue-600 hover:underline block">
                Terms of Service
              </Link>
              <Link to="/legal" className="text-sm text-blue-600 hover:underline block">
                Legal Statements
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-1">About</h3>
            <p className="text-sm text-muted-foreground">
              NYAYSATHI is a legal assistance platform designed to provide accessible legal guidance to users in multiple languages, including sign language.
            </p>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
