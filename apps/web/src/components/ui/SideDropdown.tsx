import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface SideDropdownProps {
  title: string;
  children: React.ReactNode;
  position: "left" | "right";
  className?: string;
}

export function SideDropdown({ title, children, position, className = "" }: SideDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle mouse enter/leave events
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed ${position === "left" ? "left-0" : "right-0"} top-1/4 z-50 ${className}`}
    >
      {/* Trigger button */}
      <div className="relative">
        {/* Button */}
        <div
          className={`relative flex items-center justify-center ${
            position === "left" ? "rounded-r-lg" : "rounded-l-lg"
          } bg-[#1c1c2a] border border-[#3a3a5a] hover:border-[#64ffda] transition-all duration-300 
          cursor-pointer px-4 py-8 group ${
            isOpen ? "border-[#64ffda]" : ""
          }`}
        >
          <div className={`flex items-center ${position === "left" ? "flex-row" : "flex-row-reverse"} gap-2`}>
            <span className="text-[#64ffda] font-bold text-xl whitespace-nowrap group-hover:text-white transition-colors duration-300 tracking-wider uppercase font-['Orbitron']">
              {title}
            </span>
            {position === "left" ? (
              <ChevronRight
                className={`w-6 h-6 text-[#64ffda] transition-all duration-300 group-hover:text-white group-hover:translate-x-1 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            ) : (
              <ChevronLeft
                className={`w-6 h-6 text-[#64ffda] transition-all duration-300 group-hover:text-white group-hover:-translate-x-1 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Dropdown content */}
      <div
        className={`absolute top-0 ${
          position === "left" ? "left-0" : "right-0"
        } w-96 md:w-[450px] bg-[#1c1c2a] border border-[#3a3a5a] rounded-lg p-6 
        shadow-lg transition-all duration-300 transform ${
          isOpen
            ? "translate-x-0 opacity-100 border-[#64ffda]"
            : position === "left"
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#64ffda] tracking-wider uppercase font-['Orbitron']">{title}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-[#64ffda] transition-colors p-2 rounded-full hover:bg-[#0f0f1a]/50"
          >
            {position === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
        <div className="overflow-y-auto max-h-[70vh] pr-2">{children}</div>
      </div>
    </div>
  );
}