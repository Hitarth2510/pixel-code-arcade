
import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Gamepad, Play, RefreshCw } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  onRunCode: (code: string) => void;
  onResetCode: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  onRunCode,
  onResetCode,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    onRunCode(code);
    setTimeout(() => {
      setIsRunning(false);
    }, 1500);
  };

  const handleResetCode = () => {
    setCode(initialCode);
    onResetCode();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 bg-arcade-dark">
        <div className="flex items-center space-x-2">
          <Gamepad className="h-4 w-4 text-arcade-neon" />
          <span className="text-sm arcade-font text-arcade-neon">Python Editor</span>
        </div>
        <div className="flex space-x-3">
          <button
            className="pixel-button text-[10px] py-1 flex items-center"
            onClick={handleResetCode}
          >
            <RefreshCw className="h-3 w-3 mr-1" /> Reset
          </button>
          <button
            className="pixel-button text-[10px] py-1 flex items-center bg-arcade-neon text-arcade-darker hover:bg-arcade-blue"
            onClick={handleRunCode}
            disabled={isRunning}
          >
            <Play className="h-3 w-3 mr-1" /> {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>
      
      <Separator className="border-arcade-neon opacity-30" />
      
      <div className="flex-1 relative">
        <textarea
          className="h-full w-full bg-arcade-darker p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-arcade-neon"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 bg-pixel-grid bg-[size:20px_20px]"></div>
      </div>
    </div>
  );
};

export default CodeEditor;
