
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface ProblemDescriptionProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  title,
  difficulty,
  description,
  examples,
  constraints,
}) => {
  const difficultyColor = 
    difficulty === 'Easy' ? 'text-green-400' :
    difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="h-full overflow-y-auto px-4 py-6">
      <h2 className="text-xl arcade-font text-arcade-neon animate-glow mb-4">{title}</h2>
      
      <div className="flex items-center mb-6">
        <span className={`text-sm font-bold ${difficultyColor} mr-4 arcade-font`}>
          {difficulty}
        </span>
      </div>
      
      <Separator className="border-arcade-neon opacity-30 my-4" />
      
      <div className="mb-6">
        <p className="whitespace-pre-line mb-4">{description}</p>
      </div>
      
      <h3 className="text-sm arcade-font text-arcade-pink mb-3">Examples:</h3>
      
      <div className="space-y-6 mb-6">
        {examples.map((example, i) => (
          <div key={i} className="bg-arcade-dark p-3 rounded-md border border-arcade-neon/30">
            <div className="mb-2">
              <span className="text-xs text-arcade-neon font-semibold">Input:</span>
              <pre className="bg-black/30 p-2 rounded mt-1 text-sm overflow-x-auto">
                {example.input}
              </pre>
            </div>
            
            <div className="mb-2">
              <span className="text-xs text-arcade-neon font-semibold">Output:</span>
              <pre className="bg-black/30 p-2 rounded mt-1 text-sm overflow-x-auto">
                {example.output}
              </pre>
            </div>
            
            {example.explanation && (
              <div>
                <span className="text-xs text-arcade-neon font-semibold">Explanation:</span>
                <p className="text-sm mt-1">{example.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <h3 className="text-sm arcade-font text-arcade-pink mb-3">Constraints:</h3>
      
      <ul className="list-disc list-inside space-y-1 mb-6">
        {constraints.map((constraint, i) => (
          <li key={i} className="text-sm">{constraint}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemDescription;
