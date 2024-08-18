import React from "react";

interface HeroProps {
  children: React.ReactNode; // Add this line to accept children
}

const Hero: React.FC<HeroProps> = () => {
  return (
    <main className="w-[85.4%] flex-1 p-[30px] ml-auto bg-[#4094f726]"></main>
  );
};

export default Hero;
