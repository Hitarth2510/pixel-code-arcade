
import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  initialTime?: number; // Time in seconds
  onTimeEnd?: () => void;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const Timer: React.FC<TimerProps> = ({ initialTime = 3600, onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isPaused) return;
    
    if (timeLeft <= 0) {
      if (onTimeEnd) onTimeEnd();
      return;
    }
    
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft, isPaused, onTimeEnd]);
  
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  const getColorClass = () => {
    if (timeLeft > initialTime / 2) return "text-arcade-neon";
    if (timeLeft > initialTime / 4) return "text-yellow-400";
    return "text-red-400 animate-pulse";
  };
  
  return (
    <div className="arcade-panel p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TimerIcon className="h-4 w-4 text-arcade-neon" />
        <span className="arcade-font text-xs">TIME LEFT</span>
      </div>
      
      <span className={`font-mono ${getColorClass()}`}>
        {formatTime(timeLeft)}
      </span>
      
      <button 
        onClick={togglePause} 
        className="text-xs pixel-button py-0.5 px-2"
      >
        {isPaused ? "RESUME" : "PAUSE"}
      </button>
    </div>
  );
};

export default Timer;
