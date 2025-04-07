import React, { useState } from 'react';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ProblemDescription from '@/components/ProblemDescription';
import CodeEditor from '@/components/CodeEditor';
import TestCases from '@/components/TestCases';
import ProblemsList, { Problem } from '@/components/ProblemsList';
import Timer from '@/components/Timer';
import { Trophy } from 'lucide-react';
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

// Problem data array
const problems: Problem[] = [
  { id: 1, title: "Two Sum", difficulty: "Easy" },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium" },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard" },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium" },
  { id: 6, title: "Regular Expression Matching", difficulty: "Hard" },
  { id: 7, title: "Container With Most Water", difficulty: "Medium" },
  { id: 8, title: "Integer to Roman", difficulty: "Medium" },
  { id: 9, title: "Roman to Integer", difficulty: "Easy" },
  { id: 10, title: "Longest Common Prefix", difficulty: "Easy" }
];

// Sample problem data
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

// Test cases
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

const initialCode = `def two_sum(nums, target):
    # Write your solution here
    pass

# Example usage:
# two_sum([2, 7, 11, 15], 9) should return [0, 1]`;

const IDEPage: React.FC = () => {
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState(initialTestCases);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(problems[0]);
  const [showProblems, setShowProblems] = useState(false);
  
  // Mock function to simulate running code
  const runCode = (code: string) => {
    toast.info("Executing code...");
    
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

  // Timer end handler
  const handleTimeEnd = () => {
    toast.warning("Time's up! Your session has ended.");
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };
  
  // Select problem handler
  const handleSelectProblem = (problem: Problem) => {
    setCurrentProblem(problem);
    toast.info(`Switched to problem: ${problem.title}`);
    // In a real app, we'd fetch the problem data and test cases
  };

  // Submit solution
  const handleSubmitSolution = () => {
    toast.info("Submitting your solution...");
    runAllTestCases();
  };
  
  return (
    <div className="min-h-screen bg-arcade-dark flex flex-col">
      {/* Scanlines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none"></div>
      
      <header className="border-b border-arcade-neon flex items-center p-4">
        <div className="w-1/4">
          <Timer initialTime={3600} onTimeEnd={handleTimeEnd} />
        </div>
        <h1 className="arcade-font text-xl text-center text-arcade-neon animate-pulse flex-1">
          PYTHON CODING CHALLENGE 4.0
        </h1>
        <div className="w-1/4 flex justify-end space-x-2">
          <button 
            className="pixel-button text-[10px] py-1"
            onClick={() => setShowProblems(true)}
          >
            Problems
          </button>
          <button 
            className="pixel-button text-[10px] py-1 bg-arcade-neon/20 hover:bg-arcade-neon/40"
            onClick={handleSubmitSolution}
          >
            Submit
          </button>
        </div>
      </header>
      
      <main className="flex-grow overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[calc(100vh-60px)]"
        >
          {/* Problem Description Panel */}
          <ResizablePanel defaultSize={30} minSize={20} className="arcade-panel-resizable">
            <div className="h-full p-1">
              <ScrollArea className="h-full rounded-md">
                <ProblemDescription {...problemData} />
              </ScrollArea>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-arcade-neon/20" />
          
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={40} minSize={30} className="arcade-panel-resizable">
            <div className="h-full p-1">
              <CodeEditor
                initialCode={initialCode}
                language="python"
                onRunCode={runCode}
                onResetCode={resetCode}
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-arcade-neon/20" />
          
          {/* Test Cases Panel */}
          <ResizablePanel defaultSize={30} minSize={20} className="arcade-panel-resizable">
            <div className="h-full p-1">
              <TestCases
                testCases={testCases}
                onRunTestCase={runTestCase}
                onRunAllTestCases={runAllTestCases}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      
      {/* Problem selection modal */}
      {showProblems && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40 p-4">
          <div className="w-full max-w-xl">
            <ProblemsList 
              problems={problems} 
              onSelectProblem={(problem) => {
                handleSelectProblem(problem);
                setShowProblems(false);
              }}
              currentProblemId={currentProblem.id}
            />
            
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => setShowProblems(false)}
                className="pixel-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
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
