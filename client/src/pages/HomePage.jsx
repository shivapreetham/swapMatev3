import React from "react";
import { Vortex } from "../components/ui/vortex";
import NavBar1 from "../components/Header/Navbar";
import BentoBox from "../components/FeatureBox/BentoBox";

export function HomePage() {
  return (
    <div className="relative w-full h-screen">
      <NavBar1 />
      <Vortex
        backgroundColor="black"
        rangeY={1000}
        particleCount={500}
        baseHue={1200}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <div className="w-full h-full flex flex-col justify-center items-center">
          
          <main className="flex-grow flex-1 justify-center items-center w-full h-full overflow-y-auto">
            <div className="w-full h-full max-h-[calc(100vh-100px)] overflow-y-auto">
              <BentoBox />
            </div>
          </main>
        </div>
      </Vortex>
    </div>
  );
}

export default HomePage;
