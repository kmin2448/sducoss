import React from 'react';
import { Skull } from 'lucide-react';

export default function FirstBloodPopup({ event }) {
  if (!event) return null;

  return (
    <div 
      className="absolute flex items-center gap-4 panel neon-border-red"
      style={{ 
        bottom: '40px', 
        right: '40px', 
        backgroundColor: 'rgba(26,0,0,0.9)', 
        padding: '20px 30px',
        zIndex: 500,
        animation: 'fadeIn 0.5s ease-out forwards',
        boxShadow: '0 0 20px rgba(255, 0, 60, 0.4)'
      }}
    >
      <div className="animate-pulse-green" style={{ color: 'var(--neon-red)' }}>
        <Skull size={40} />
      </div>
      <div>
        <h3 className="font-mono text-lg neon-text-red m-0 mb-1" style={{ fontWeight: 900, fontStyle: 'italic', letterSpacing: '2px' }}>FIRST BLOOD!</h3>
        <p className="font-mono text-sm m-0" style={{ color: '#fff' }}>
          <strong style={{ color: 'var(--cyber-blue)' }}>{event.teamName}</strong> just pwned 
          <br/>
          <span style={{ color: 'var(--neon-green)' }}>[{event.category}]</span> {event.problemTitle}
        </p>
      </div>
    </div>
  );
}
