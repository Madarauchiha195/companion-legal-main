
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

type ProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mandatory?: boolean;
};

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().min(5, { message: "Address is required" }),
  aadhaarNumber: z.string().length(12, { message: "Aadhaar number must be 12 digits" }),
});

const ProfileDialog: React.FC<ProfileDialogProps> = ({ 
  open, 
  onOpenChange,
  mandatory = false 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(user?.photoURL || null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      aadhaarNumber: "",
    },
  });

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    // In a real app, this would update the user profile in the backend
    console.log("Profile updated:", data);
    
    // Store in localStorage for demo purposes
    localStorage.setItem("userProfileComplete", "true");
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    
    // Close the dialog
    if (!mandatory) {
      onOpenChange(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          // In a real app, you would upload the image to a storage service
          // and then update the user's photoURL
          setProfileImage(event.target.result as string);
          setIsUploading(false);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={mandatory ? () => {} : onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Information</DialogTitle>
          <DialogDescription>
            {mandatory 
              ? "Please complete your profile to continue using न्यायसाथी." 
              : "Update your profile information."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {profileImage ? (
                <AvatarImage src={profileImage} alt={user?.name} />
              ) : (
                <AvatarFallback className="bg-brand-100 text-brand-600 text-xl">
                  {user?.name
                    .split(" ")
                    .map(name => name[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            
            <label 
              htmlFor="profile-image" 
              className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground p-1.5 cursor-pointer hover:bg-primary/90 transition-colors"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </label>
            <input 
              id="profile-image" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your 12-digit Aadhaar number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="submit">Save Profile</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
