import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Ticker() {
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'rgba(255, 0, 60, 0.1)',
      borderBottom: '1px solid var(--neon-red)',
      padding: '8px 0',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="flex items-center" style={{ minWidth: 'max-content', animation: 'ticker-scroll 20s linear infinite' }}>
        <style>{`
          @keyframes ticker-scroll {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
        
        {/* 공지 내용 1 */}
        <div className="flex items-center gap-2 font-mono" style={{ color: 'var(--neon-red)', marginRight: '50px' }}>
          <AlertCircle size={16} />
          <span>[NOTICE] Web 분야 'Bypass WAF' 문제 힌트가 15:00에 공개될 예정입니다. 준비하세요!</span>
        </div>
        
        {/* 공지 내용 2 */}
        <div className="flex items-center gap-2 font-mono" style={{ color: 'var(--neon-red)', marginRight: '50px' }}>
          <AlertCircle size={16} />
          <span>[SYSTEM] 현재 네트워크 트래픽이 안정적입니다. 공격을 계속 진행하십시오.</span>
        </div>
        
        {/* 공지 내용 3 */}
        <div className="flex items-center gap-2 font-mono" style={{ color: 'var(--neon-red)', marginRight: '50px' }}>
          <AlertCircle size={16} />
          <span>[HINT] Crypto 'RSA Attack'의 소수를 분해하기 위한 유용한 도구를 찾아보세요.</span>
        </div>
      </div>
    </div>
  );
}
