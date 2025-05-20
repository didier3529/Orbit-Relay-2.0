import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ 
  children, 
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
  value?: string; // Changed to optional since it's not used internally
  className?: string;
}

export function AccordionItem({ 
  children, 
  className = "" 
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className={`border border-[#3a3a5a] rounded-lg overflow-hidden bg-[#0f0f1a] hover:border-[#64ffda] transition-all duration-300 ${className}`}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Using type assertion to fix TypeScript error
          return React.cloneElement(child as React.ReactElement<any>, { 
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