
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const LegalStatements = () => {
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
      
      <h1 className="text-3xl font-bold mb-6">Legal Statements</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-700 mb-4">
          The following legal statements govern your use of न्यायसाथी (Justice Companion).
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Disclaimer</h2>
        <p className="text-gray-700 mb-4">
          The information provided by न्यायसाथी is for general informational purposes only. All information 
          on the Service is provided in good faith, however, we make no representation or warranty of any 
          kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, 
          or completeness of any information on the Service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Not Legal Advice</h2>
        <p className="text-gray-700 mb-4">
          The content provided by न्यायसाथी is not intended to constitute legal advice. Users should consult 
          with a qualified legal professional for advice regarding their specific legal situation. Use of 
          the Service does not create an attorney-client relationship between the user and न्यायसाथी or any 
          affiliated advocates.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          Unless otherwise noted, all content on the Service is the property of न्यायसाथी and may not be 
          used without our permission. This includes text, graphics, logos, icons, images, audio clips, 
          digital downloads, and software.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Governing Law</h2>
        <p className="text-gray-700 mb-4">
          These Legal Statements shall be governed by and construed in accordance with the laws of India, 
          without regard to its conflict of law provisions.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about these Legal Statements, please contact us at legal@nyaysathi.org.
        </p>
      </div>
    </div>
  );
};

export default LegalStatements;
