import React from 'react';

export default function Leaderboard({ teams }) {
  return (
    <div className="panel h-full w-full" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      <h2 className="font-mono text-sm" style={{ color: 'var(--neon-green)', borderBottom: '1px solid #333', paddingBottom: '0.5rem', margin: '0 0 1rem 0' }}>
        [ CURRENT STANDINGS ]
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
        {/* 헤더 */}
        <div className="font-mono text-xs" style={{ display: 'grid', gridTemplateColumns: '40px 1fr 80px', padding: '0 0.5rem', color: '#666' }}>
          <span>RANK</span>
          <span>TEAM</span>
          <span style={{ textAlign: 'right' }}>SCORE</span>
        </div>

        {/* 리스트 */}
        <div className="relative w-full" style={{ display: 'flex', flexDirection: 'column' }}>
          {teams.map((team, index) => {
            const isTop3 = index < 3;
            // 순위 변동 애니메이션을 위해 절대 위치 혹은 flex transition을 사용할 수 있으나
            // 단순화를 위해 react key 활용 렌더링
            return (
              <div 
                key={team.id}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '40px 1fr 80px',
                  padding: '12px 0.5rem',
                  backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  borderLeft: isTop3 ? `3px solid ${team.color}` : '3px solid transparent',
                  alignItems: 'center',
                  transition: 'all 0.5s ease',
                  transform: 'translateY(0)',
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}
              >
                <div className="font-mono" style={{ 
                  color: isTop3 ? team.color : '#888',
                  fontWeight: isTop3 ? 'bold' : 'normal',
                  fontSize: isTop3 ? '1.1rem' : '0.9rem'
                 }}>
                  {index + 1}
                </div>
                
                <div className="font-mono" style={{ 
                  color: '#fff', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis' 
                }}>
                  {team.name}
                </div>
                
                <div className="font-mono" style={{ 
                  color: team.color, 
                  textAlign: 'right',
                  fontWeight: 'bold',
                  textShadow: isTop3 ? `0 0 5px ${team.color}` : 'none'
                }}>
                  {team.score}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
