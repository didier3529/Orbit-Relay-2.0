import React from "react";

export function SocialButtons() {
  return (
    <div className="flex items-center space-x-4">
      {/* X Button */}
      <a
        href="https://x.com/OrbitRelay"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 
          rounded-full bg-transparent border border-[#3a3a5a] hover:border-[#5de6da]
          transition-all duration-300 group"
      >
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 
          bg-[#5de6da] blur-md transition-opacity duration-300"
        ></div>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-8 h-8 text-[#aaaaaa] group-hover:text-[#5de6da] transition-colors duration-300"
        >
          <path
            fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </a>

      {/* PumpFun Button with diamond/pill logo */}
      <a
        href="https://pump.fun/board"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 
          rounded-full bg-transparent border border-[#3a3a5a] hover:border-[#5de6da]
          transition-all duration-300 group"
      >
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 
          bg-[#5de6da] blur-md transition-opacity duration-300"
        ></div>
        <div className="relative z-10 flex items-center justify-center">
          {/* Diamond/Pill logo SVG for PumpFun */}
          <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-45 12 12)">
              <path
                d="M7 8C7 6.34315 8.34315 5 10 5H14C15.6569 5 17 6.34315 17 8V16C17 17.6569 15.6569 19 14 19H10C8.34315 19 7 17.6569 7 16V8Z"
                stroke="#2a6e62"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M7 12H17" stroke="#2a6e62" strokeWidth="1.5" />
              <path d="M7 8C7 6.34315 8.34315 5 10 5H14C15.6569 5 17 6.34315 17 8V12H7V8Z" fill="white" />
              <path
                d="M7 12H17V16C17 17.6569 15.6569 19 14 19H10C8.34315 19 7 17.6569 7 16V12Z"
                fill="#5de6da"
                className="group-hover:fill-[#5de6da]"
              />
              <circle cx="13" cy="15" r="1" fill="white" />
            </g>
          </svg>
        </div>
      </a>
    </div>
  );
}