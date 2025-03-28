
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { Building2, User } from "lucide-react";

const Index = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to appropriate portal
    if (user) {
      navigate(user.type === 'user' ? '/user' : '/advocate');
    }
  }, [user, navigate]);

  const handleUserTypeSelection = async (type: 'user' | 'advocate') => {
    await signIn(type);
    navigate(type === 'user' ? '/user' : '/advocate');
  };

  return (
    <div className="min-h-screen bg-auth-gradient flex items-center justify-center p-4">
      <div className="animate-fade-in">
        <Card className="w-full max-w-md mx-auto glass-card">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Logo size="lg" />
            <CardTitle className="text-2xl font-bold mt-4 text-center">Welcome to न्यायसाथी</CardTitle>
            <CardDescription className="text-center">
              Your AI-powered legal assistance companion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-muted-foreground">
                Please select your role to continue
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button
                variant="outline"
                size="lg"
                className="hover-scale bg-white/50 p-6 h-auto flex flex-col items-center space-y-2"
                onClick={() => handleUserTypeSelection('user')}
              >
                <User className="h-8 w-8 text-brand-600 mb-2" />
                <span className="font-semibold text-gray-800">I need legal assistance</span>
                <span className="text-sm text-muted-foreground">Find guidance for your legal matters</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="hover-scale bg-white/50 p-6 h-auto flex flex-col items-center space-y-2"
                onClick={() => handleUserTypeSelection('advocate')}
              >
                <Building2 className="h-8 w-8 text-brand-600 mb-2" />
                <span className="font-semibold text-gray-800">I am an advocate</span>
                <span className="text-sm text-muted-foreground">Connect with clients and offer legal services</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our 
              <Button variant="link" className="h-auto p-0 mx-1">Terms of Service</Button>
              and
              <Button variant="link" className="h-auto p-0 mx-1">Privacy Policy</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
