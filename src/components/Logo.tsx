
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-2xl font-bold text-brand-600">
        <span className="text-brand-600">NYAY</span>
        <span className="text-brand-800">SATHI</span>
      </div>
    </div>
  );
};

export default Logo;
