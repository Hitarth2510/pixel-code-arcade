
import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, PlayCircle } from 'lucide-react';

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
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  
  const handleSelectCase = (id: number) => {
    setSelectedCase(id);
  };
  
  const passedCount = testCases.filter(tc => tc.passed).length;
  const totalCount = testCases.length;
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-4 p-3 border-b border-arcade-neon/30">
        <button
          className={`text-xs arcade-font ${activeTab === 'testcases' ? 'text-arcade-neon' : 'text-gray-400'}`}
          onClick={() => setActiveTab('testcases')}
        >
          Test Cases
        </button>
        <button
          className={`text-xs arcade-font ${activeTab === 'output' ? 'text-arcade-neon' : 'text-gray-400'}`}
          onClick={() => setActiveTab('output')}
        >
          Output
        </button>
      </div>
      
      {activeTab === 'testcases' && (
        <div className="flex flex-col h-full">
          <div className="p-3 border-b border-arcade-neon/30">
            <button
              className="text-xs arcade-font text-arcade-purple hover:text-arcade-pink"
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
          
          <div className="flex-1 overflow-y-auto">
            {testCases.map((test) => (
              <div
                key={test.id}
                className={`border-b border-arcade-neon/20 p-3 cursor-pointer hover:bg-arcade-dark/50 ${
                  selectedCase === test.id ? 'bg-arcade-dark/50' : ''
                }`}
                onClick={() => handleSelectCase(test.id)}
              >
                <div className="flex items-center justify-between">
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
                    <span className="text-sm">Case {test.id}</span>
                  </div>
                  
                  <button
                    className="text-[10px] arcade-font text-arcade-neon hover:text-arcade-pink"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRunTestCase(test.id);
                    }}
                  >
                    Run
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'output' && selectedCase !== null && (
        <div className="flex-1 p-3 overflow-y-auto">
          {testCases.find(t => t.id === selectedCase) && (
            <div>
              <div className="mb-3">
                <h4 className="text-xs text-arcade-neon mb-1">Input:</h4>
                <pre className="bg-black/30 p-2 rounded text-xs overflow-x-auto">
                  {testCases.find(t => t.id === selectedCase)?.input}
                </pre>
              </div>
              
              <div className="mb-3">
                <h4 className="text-xs text-arcade-neon mb-1">Expected Output:</h4>
                <pre className="bg-black/30 p-2 rounded text-xs overflow-x-auto">
                  {testCases.find(t => t.id === selectedCase)?.expectedOutput}
                </pre>
              </div>
              
              {testCases.find(t => t.id === selectedCase)?.actualOutput !== undefined && (
                <div>
                  <h4 className="text-xs text-arcade-neon mb-1">Your Output:</h4>
                  <pre className="bg-black/30 p-2 rounded text-xs overflow-x-auto">
                    {testCases.find(t => t.id === selectedCase)?.actualOutput}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestCases;
