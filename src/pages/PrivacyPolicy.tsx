
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
      
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-700 mb-4">
          This Privacy Policy describes how न्यायसाथी (Justice Companion) collects, uses, and discloses your 
          information when you use our service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect information you provide directly to us when you register for an account, create or modify your profile, 
          set preferences, or make requests through the Service. This includes:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Account information (name, email address, phone number)</li>
          <li>Profile information (address, Aadhaar number)</li>
          <li>Communication data (chat history, uploaded legal documents)</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Provide, maintain, and improve our services</li>
          <li>Provide legal assistance and guidance</li>
          <li>Process and analyze your legal queries</li>
          <li>Communicate with you about our services</li>
          <li>Connect you with advocates when needed</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Information Security</h2>
        <p className="text-gray-700 mb-4">
          We take reasonable measures to help protect your personal information from loss, theft, misuse, 
          unauthorized access, disclosure, alteration, and destruction.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about this Privacy Policy, please contact us at privacy@nyaysathi.org.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
