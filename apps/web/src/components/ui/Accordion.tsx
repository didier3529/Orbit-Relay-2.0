import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
}

export function Accordion({ 
  children, 
  type = "single", 
  collapsible = true, 
  className = "" 
}: AccordionProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ 
  children, 
  value, 
  className = "" 
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className={`border border-[#3a3a5a] rounded-lg overflow-hidden bg-[#0f0f1a] hover:border-[#64ffda] transition-all duration-300 ${className}`}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            isOpen, 
            onToggle: () => setIsOpen(!isOpen)
          });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionTrigger({ 
  children, 
  className = "", 
  isOpen, 
  onToggle 
}: AccordionTriggerProps) {
  return (
    <button 
      className={`w-full flex items-center justify-between px-4 py-3 text-white hover:text-[#64ffda] text-left tracking-wider font-semibold font-['Orbitron'] ${className}`}
      onClick={onToggle}
    >
      {children}
      <ChevronDown className={`h-4 w-4 text-[#64ffda] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export function AccordionContent({ 
  children, 
  className = "", 
  isOpen 
}: AccordionContentProps) {
  return isOpen ? (
    <div className={`px-4 pb-3 text-gray-300 ${className}`}>
      {children}
    </div>
  ) : null;
}