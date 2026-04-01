import React from 'react';

// 카테고리 목록 정렬
const CATEGORIES = ['Web', 'Pwnable', 'Crypto', 'Reversing', 'Misc'];

export default function ProblemGrid({ problems, onSelectProblem }) {
  return (
    <div className="panel h-full w-full" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      <h2 className="font-mono mb-4 text-sm" style={{ color: 'var(--cyber-blue)', borderBottom: '1px solid #333', paddingBottom: '0.5rem', margin: '0 0 1rem 0' }}>
        [ TARGET BOARD ]
      </h2>
      
      <div style={{ flex: 1, display: 'flex', gap: '1rem', overflowX: 'auto' }}>
        {CATEGORIES.map(category => {
          const catProblems = problems.filter(p => p.category === category);
          
          return (
            <div key={category} style={{ flex: '1', minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* Category Header */}
              <div 
                className="font-mono text-center" 
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  padding: '8px 4px', 
                  borderBottom: '2px solid var(--cyber-blue)',
                  color: '#fff',
                  fontWeight: 'bolder'
                }}
              >
                {category}
              </div>
              
              {/* Problem Tiles */}
              {catProblems.map(problem => (
                <div 
                  key={problem.id}
                  onClick={() => !problem.isSolved && onSelectProblem(problem)}
                  className={`font-mono glitch-effect flex flex-col items-center justify-center ${problem.isSolved ? 'neon-border-green' : 'neon-border-red'}`}
                  style={{ 
                    height: '80px', 
                    cursor: problem.isSolved ? 'default' : 'pointer',
                    backgroundColor: problem.isSolved ? 'rgba(0,255,65,0.1)' : 'rgba(255,0,60,0.1)',
                    transition: 'all 0.3s ease',
                    opacity: problem.isSolved ? 0.6 : 1
                  }}
                  onMouseOver={(e) => {
                     if(!problem.isSolved) {
                         e.currentTarget.style.backgroundColor = 'rgba(255,0,60,0.3)';
                     }
                  }}
                  onMouseOut={(e) => {
                     if(!problem.isSolved) {
                         e.currentTarget.style.backgroundColor = 'rgba(255,0,60,0.1)';
                     }
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '4px' }}>{problem.title}</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: problem.isSolved ? 'var(--neon-green)' : 'var(--neon-red)' }}>
                    {problem.isSolved ? 'SOLVED' : problem.points}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
