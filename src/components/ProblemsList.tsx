
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, List } from 'lucide-react';

export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface ProblemsListProps {
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  currentProblemId?: number;
}

const ProblemsList: React.FC<ProblemsListProps> = ({
  problems,
  onSelectProblem,
  currentProblemId
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  return (
    <div className="arcade-panel border-arcade-neon/30">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-3 bg-arcade-darker rounded-t-md border-b border-arcade-neon/30"
      >
        <div className="flex items-center space-x-2">
          <List className="h-4 w-4 text-arcade-neon" />
          <span className="text-sm arcade-font text-arcade-neon">Problems List</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-arcade-neon" />
        ) : (
          <ChevronDown className="h-4 w-4 text-arcade-neon" />
        )}
      </button>
      
      {isOpen && (
        <div className="bg-arcade-darker border-t border-arcade-neon/20">
          <ScrollArea className="h-[300px] p-2">
            <ul className="space-y-1">
              {problems.map((problem) => (
                <li key={problem.id}>
                  <button
                    onClick={() => {
                      onSelectProblem(problem);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2 text-sm rounded ${
                      currentProblemId === problem.id
                        ? 'bg-arcade-neon/20 text-white'
                        : 'hover:bg-arcade-darker/80 text-arcade-text'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{problem.title}</span>
                      <span 
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          problem.difficulty === 'Easy' ? 'bg-green-800/30 text-green-400' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-800/30 text-yellow-400' :
                          'bg-red-800/30 text-red-400'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default ProblemsList;
