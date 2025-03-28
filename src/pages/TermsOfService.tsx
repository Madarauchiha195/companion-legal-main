
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const TermsOfService = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-700 mb-4">
          These Terms of Service ("Terms") govern your access to and use of न्यायसाथी (Justice Companion). 
          Please read these Terms carefully before using our service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Use of Service</h2>
        <p className="text-gray-700 mb-4">
          न्यायसाथी provides AI-driven legal assistance for informational purposes only. The information 
          provided through our Service is not legal advice, and no attorney-client relationship is formed 
          by using our Service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Account Registration</h2>
        <p className="text-gray-700 mb-4">
          To access certain features of the Service, you must register for an account. You agree to provide 
          accurate, current, and complete information during the registration process and to update such 
          information to keep it accurate, current, and complete.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Content and Conduct</h2>
        <p className="text-gray-700 mb-4">
          You are responsible for all content you provide to the Service. You agree not to use the Service 
          for any illegal purpose or to engage in any activity that disrupts or interferes with the Service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          न्यायसाथी and its affiliates, officers, employees, agents, partners, and licensors shall not be 
          liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting 
          from your use of or inability to use the Service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Changes to Terms</h2>
        <p className="text-gray-700 mb-4">
          We may modify these Terms at any time. We will provide notice of changes by posting the updated 
          Terms on the Service. Your continued use of the Service after any changes indicates your acceptance 
          of the new Terms.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about these Terms, please contact us at terms@nyaysathi.org.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
