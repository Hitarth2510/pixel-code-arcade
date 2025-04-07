
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad, Key, Lock } from 'lucide-react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const CORRECT_PASSCODE = "arcade123"; // In a real app, this would be stored securely

const Index = () => {
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simple timeout to simulate verification
    setTimeout(() => {
      if (passcode === CORRECT_PASSCODE) {
        toast.success("Access granted!");
        navigate('/ide');
      } else {
        toast.error("Invalid passcode. Please try again.");
      }
      setIsSubmitting(false);
    }, 800);
  };

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
          Enter the secure passcode to access the Python Coding Competition IDE.
        </p>
        
        <form onSubmit={handlePasscodeSubmit} className="max-w-sm mx-auto mb-8">
          <div className="arcade-panel p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="h-5 w-5 text-arcade-neon" />
              <span className="arcade-font text-sm text-arcade-neon">ENTER PASSCODE</span>
            </div>
            
            <div className="relative">
              <Input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="* * * * * *"
                className="bg-arcade-darker border-arcade-neon/30 text-arcade-text font-mono text-center tracking-widest"
                maxLength={20}
                required
              />
              <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-arcade-neon/50" />
            </div>
            
            <button 
              type="submit" 
              className="pixel-button mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "VERIFYING..." : "UNLOCK ARCADE"}
            </button>
          </div>
        </form>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="arcade-panel p-4">
            <h3 className="arcade-font text-arcade-pink mb-2 text-sm">COMPETE</h3>
            <p className="text-xs">Solve challenges against the clock</p>
          </div>
          
          <div className="arcade-panel p-4">
            <h3 className="arcade-font text-arcade-neon mb-2 text-sm">LEARN</h3>
            <p className="text-xs">Improve Python skills with each problem</p>
          </div>
          
          <div className="arcade-panel p-4">
            <h3 className="arcade-font text-arcade-purple mb-2 text-sm">WIN</h3>
            <p className="text-xs">Earn points and top the leaderboard</p>
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
