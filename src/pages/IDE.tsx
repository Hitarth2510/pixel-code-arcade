
import React, { useState } from 'react';
import { toast } from "sonner";
import ProblemDescription from '@/components/ProblemDescription';
import CodeEditor from '@/components/CodeEditor';
import TestCases from '@/components/TestCases';
import { Trophy } from 'lucide-react';

const initialCode = `def two_sum(nums, target):
    # Write your solution here
    pass

# Example usage:
# two_sum([2, 7, 11, 15], 9) should return [0, 1]`;

const problemData = {
  title: "Two Sum",
  difficulty: "Easy" as const,
  description: 
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\n" +
    "You may assume that each input would have exactly one solution, and you may not use the same element twice.\n\n" +
    "You can return the answer in any order.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]"
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]"
    }
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ]
};

const initialTestCases = [
  {
    id: 1,
    input: "nums = [2,7,11,15], target = 9",
    expectedOutput: "[0,1]"
  },
  {
    id: 2,
    input: "nums = [3,2,4], target = 6",
    expectedOutput: "[1,2]"
  },
  {
    id: 3,
    input: "nums = [3,3], target = 6",
    expectedOutput: "[0,1]"
  },
  {
    id: 4,
    input: "nums = [1,2,3,4,5], target = 9",
    expectedOutput: "[3,4]"
  }
];

const IDEPage: React.FC = () => {
  const [testCases, setTestCases] = useState(initialTestCases);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Mock function to simulate running code
  const runCode = (code: string) => {
    // In a real application, you'd send this code to a backend for execution
    toast.info("Executing code...");
    
    // For this example, we'll just pretend to run the code
    setTimeout(() => {
      toast.success("Code executed successfully!");
    }, 1000);
  };
  
  // Mock function for running test cases
  const runTestCase = (id: number) => {
    setTestCases(prev => prev.map(tc => 
      tc.id === id ? { ...tc, running: true, passed: undefined, actualOutput: undefined } : tc
    ));
    
    // Simulate test run with a timeout
    setTimeout(() => {
      // Find the current test case we're working with
      const currentTestCase = testCases.find(tc => tc.id === id);
      
      // For demo, let's assume the first two cases pass and others fail
      const passed = id <= 2;
      const actualOutput = passed ? currentTestCase?.expectedOutput : "[0,0]";
      
      setTestCases(prev => prev.map(tc => 
        tc.id === id ? { 
          ...tc, 
          running: false, 
          passed, 
          actualOutput 
        } : tc
      ));
      
      if (passed) {
        toast.success(`Test case ${id} passed!`);
      } else {
        toast.error(`Test case ${id} failed!`);
      }
    }, 1500);
  };
  
  // Run all test cases
  const runAllTestCases = () => {
    setTestCases(prev => prev.map(tc => ({ ...tc, running: true, passed: undefined })));
    
    // Simulate running all tests with a timeout
    setTimeout(() => {
      let allPassed = true;
      
      setTestCases(prev => prev.map(tc => {
        // For demo, only the first 2 cases pass
        const passed = tc.id <= 2;
        if (!passed) allPassed = false;
        
        return {
          ...tc,
          running: false,
          passed,
          actualOutput: passed ? tc.expectedOutput : "[0,0]"
        };
      }));
      
      if (allPassed) {
        setShowSuccess(true);
        toast.success("All test cases passed!");
      } else {
        toast.error("Some test cases failed!");
      }
    }, 2000);
  };
  
  // Reset function
  const resetCode = () => {
    setShowSuccess(false);
    setTestCases(initialTestCases);
    toast.info("Code reset!");
  };
  
  return (
    <div className="min-h-screen bg-arcade-dark flex flex-col relative">
      {/* Scanlines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none"></div>
      
      <header className="border-b border-arcade-neon flex items-center justify-between p-4">
        <h1 className="arcade-font text-lg text-arcade-neon animate-glow">PIXEL CODE ARCADE</h1>
        <div className="flex space-x-2">
          <button className="pixel-button text-[10px] py-1">Problems</button>
          <button className="pixel-button text-[10px] py-1">Leaderboard</button>
          <button className="pixel-button text-[10px] py-1">Settings</button>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Three panel layout */}
        <div className="w-full md:w-1/3 h-[400px] md:h-auto overflow-y-auto arcade-panel m-3">
          <ProblemDescription {...problemData} />
        </div>
        
        <div className="w-full md:w-1/3 h-[400px] md:h-auto arcade-panel m-3">
          <CodeEditor
            initialCode={initialCode}
            language="python"
            onRunCode={runCode}
            onResetCode={resetCode}
          />
        </div>
        
        <div className="w-full md:w-1/3 h-[400px] md:h-auto arcade-panel m-3">
          <TestCases
            testCases={testCases}
            onRunTestCase={runTestCase}
            onRunAllTestCases={runAllTestCases}
          />
        </div>
      </main>
      
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="arcade-panel p-8 max-w-md text-center">
            <Trophy className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
            <h2 className="arcade-font text-arcade-neon text-xl mb-4 animate-glow">CONGRATULATIONS!</h2>
            <p className="mb-6">You've solved the challenge!</p>
            <button 
              className="pixel-button"
              onClick={() => setShowSuccess(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDEPage;
