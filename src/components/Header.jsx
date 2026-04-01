import React, { useState, useEffect } from 'react';
import { Activity, User } from 'lucide-react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-center w-full" style={{ padding: '1rem 2rem', borderBottom: '1px solid #333', backgroundColor: 'var(--bg-panel)' }}>
      {/* 로고 / 타이틀 영역 */}
      <div className="flex items-center gap-4">
        <h1 className="neon-text-green font-mono m-0" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
          GAMJA_HACK<span className="blinking-cursor"></span>
        </h1>
        <div className="flex items-center gap-2" style={{ backgroundColor: 'rgba(0, 255, 65, 0.1)', padding: '4px 12px', borderRadius: '4px', border: '1px solid var(--neon-green)' }}>
          <div style={{ width: 8, height: 8, backgroundColor: 'var(--neon-green)', borderRadius: '50%' }} className="animate-pulse-green"></div>
          <span className="font-mono text-sm" style={{ color: 'var(--neon-green)', fontSize: '0.8rem' }}>LIVE</span>
        </div>
      </div>

      {/* 우측 영역: 시계 및 가상 유저 */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-mono" style={{ color: 'var(--cyber-blue)' }}>
          <Activity size={18} />
          <span>{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-2" style={{ borderLeft: '1px solid #444', paddingLeft: '1.5rem' }}>
          <User size={18} style={{ color: '#ccc' }} />
          <span className="font-mono" style={{ fontSize: '0.9rem', color: '#ccc' }}>root_admin</span>
        </div>
      </div>
    </header>
  );
}
