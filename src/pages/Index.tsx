
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-arcade-dark flex items-center justify-center relative overflow-hidden">
      {/* Scanlines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none"></div>
      
      <div className="text-center z-10 p-8 max-w-3xl">
        <div className="mb-8 flex justify-center">
          <Gamepad className="h-16 w-16 text-arcade-neon animate-glow" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 arcade-font text-arcade-neon animate-glow">
          PIXEL CODE ARCADE
        </h1>
        
        <p className="text-xl mb-8 max-w-2xl mx-auto text-arcade-text">
          Welcome to the Python Coding Competition IDE. Test your coding skills with retro arcade style!
        </p>
        
        <Link to="/ide" className="pixel-button inline-block">
          ENTER THE ARCADE
        </Link>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="arcade-panel p-6">
            <h3 className="arcade-font text-arcade-pink mb-3">Compete</h3>
            <p className="text-sm">Solve coding challenges and compete with other programmers</p>
          </div>
          
          <div className="arcade-panel p-6">
            <h3 className="arcade-font text-arcade-neon mb-3">Learn</h3>
            <p className="text-sm">Improve your Python and algorithm skills with each challenge</p>
          </div>
          
          <div className="arcade-panel p-6">
            <h3 className="arcade-font text-arcade-purple mb-3">Win</h3>
            <p className="text-sm">Earn points and climb the global leaderboard</p>
          </div>
        </div>
      </div>
      
      {/* Decorative pixel elements */}
      <div className="absolute top-20 left-20 h-4 w-4 bg-arcade-pink animate-pixel-pulse"></div>
      <div className="absolute bottom-20 right-20 h-6 w-6 bg-arcade-neon animate-pixel-pulse"></div>
      <div className="absolute bottom-40 left-40 h-3 w-3 bg-arcade-purple animate-pixel-pulse"></div>
      <div className="absolute top-40 right-40 h-5 w-5 bg-arcade-blue animate-pixel-pulse"></div>
    </div>
  );
};

export default Index;
