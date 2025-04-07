
import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, PlayCircle, Code, ListChecks } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  running?: boolean;
}

interface TestCasesProps {
  testCases: TestCase[];
  onRunTestCase: (id: number) => void;
  onRunAllTestCases: () => void;
}

const TestCases: React.FC<TestCasesProps> = ({
  testCases,
  onRunTestCase,
  onRunAllTestCases,
}) => {
  const [activeTab, setActiveTab] = useState<'testcases' | 'output'>('testcases');
  const [selectedCase, setSelectedCase] = useState<number | null>(testCases[0]?.id || null);
  
  const handleSelectCase = (id: number) => {
    setSelectedCase(id);
    if (activeTab !== 'output') {
      setActiveTab('output');
    }
  };
  
  const passedCount = testCases.filter(tc => tc.passed).length;
  const totalCount = testCases.length;
  
  return (
    <div className="h-full flex flex-col border border-arcade-neon/30 rounded-md overflow-hidden">
      <div className="flex items-center bg-arcade-darker p-3 border-b border-arcade-neon/30">
        <button
          className={`flex items-center mr-4 ${activeTab === 'testcases' ? 'text-arcade-neon' : 'text-gray-400'}`}
          onClick={() => setActiveTab('testcases')}
        >
          <ListChecks className="h-4 w-4 mr-2" />
          <span className="text-xs arcade-font">Test Cases</span>
        </button>
        <button
          className={`flex items-center ${activeTab === 'output' ? 'text-arcade-neon' : 'text-gray-400'}`}
          onClick={() => setActiveTab('output')}
        >
          <Code className="h-4 w-4 mr-2" />
          <span className="text-xs arcade-font">Output</span>
        </button>
      </div>
      
      {activeTab === 'testcases' && (
        <div className="flex flex-col h-full">
          <div className="p-3 border-b border-arcade-neon/30 bg-arcade-dark/50">
            <button
              className="pixel-button text-[10px] py-1 arcade-font text-arcade-purple hover:text-arcade-pink"
              onClick={onRunAllTestCases}
            >
              Run All Tests
            </button>
            
            <div className="mt-3 text-xs">
              <span className="text-arcade-text">
                {passedCount}/{totalCount} passing
              </span>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            {testCases.map((test) => (
              <div
                key={test.id}
                className={`border-b border-arcade-neon/20 p-3 cursor-pointer hover:bg-arcade-dark/50 ${
                  selectedCase === test.id ? 'bg-arcade-dark/50' : ''
                }`}
                onClick={() => handleSelectCase(test.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {test.running ? (
                      <PlayCircle className="h-4 w-4 text-arcade-blue animate-pulse mr-2" />
                    ) : test.passed === undefined ? (
                      <div className="h-4 w-4 rounded-full border border-arcade-neon/30 mr-2" />
                    ) : test.passed ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className="text-sm">Test Case {test.id}</span>
                  </div>
                </div>
                
                <div className="bg-black/30 p-2 rounded text-xs overflow-x-auto">
                  <span className="text-arcade-neon/80">Input: </span>
                  <span className="font-mono">{test.input}</span>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
      
      {activeTab === 'output' && selectedCase !== null && (
        <ScrollArea className="flex-1 p-3">
          {testCases.find(t => t.id === selectedCase) && (
            <div>
              <Card className="mb-3 bg-arcade-dark border-arcade-neon/30 p-3">
                <h4 className="text-xs text-arcade-neon mb-1">Input:</h4>
                <pre className="bg-black/30 p-2 rounded mt-1 text-xs overflow-x-auto">
                  {testCases.find(t => t.id === selectedCase)?.input}
                </pre>
              </Card>
              
              <Card className="mb-3 bg-arcade-dark border-arcade-neon/30 p-3">
                <h4 className="text-xs text-arcade-neon mb-1">Expected Output:</h4>
                <pre className="bg-black/30 p-2 rounded mt-1 text-xs overflow-x-auto">
                  {testCases.find(t => t.id === selectedCase)?.expectedOutput}
                </pre>
              </Card>
              
              {testCases.find(t => t.id === selectedCase)?.actualOutput !== undefined && (
                <Card className="bg-arcade-dark border-arcade-neon/30 p-3">
                  <h4 className="text-xs text-arcade-neon mb-1">Your Output:</h4>
                  <pre className="bg-black/30 p-2 rounded mt-1 text-xs overflow-x-auto">
                    {testCases.find(t => t.id === selectedCase)?.actualOutput}
                  </pre>
                  
                  <div className="mt-3 flex items-center">
                    <span className="text-xs mr-2">Status:</span>
                    {testCases.find(t => t.id === selectedCase)?.passed ? (
                      <span className="text-xs text-green-500 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Passed
                      </span>
                    ) : (
                      <span className="text-xs text-red-500 flex items-center">
                        <XCircle className="h-3 w-3 mr-1" /> Failed
                      </span>
                    )}
                  </div>
                </Card>
              )}
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
};

export default TestCases;
