import React, { useState } from 'react';
import { Terminal, Download, X } from 'lucide-react';

export default function ProblemModal({ problem, onClose, onSubmitFlag }) {
  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!problem) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!flag.trim()) return;
    
    setStatus('loading');
    const isCorrect = await onSubmitFlag(problem.id, flag);
    
    if (isCorrect) {
      setStatus('success');
      setTimeout(() => onClose(), 1500); // 1.5초 후 모달 자동으로 닫힘
    } else {
      setStatus('error');
      // 오답 메시지 초기화
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="absolute flex items-center justify-center w-full h-full" style={{ top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
      <div className="panel neon-border-blue" style={{ width: '500px', backgroundColor: '#0A0A0A', padding: '0', animation: 'fadeIn 0.3s ease-out' }}>
        
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center" style={{ padding: '12px 20px', backgroundColor: 'rgba(13,226,234,0.1)', borderBottom: '1px solid var(--cyber-blue)' }}>
          <div className="flex items-center gap-2 font-mono neon-text-blue">
            <Terminal size={18} />
            <span style={{ fontWeight: 'bold' }}>{problem.category} / {problem.points} pts</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* 모달 바디 */}
        <div style={{ padding: '20px' }}>
          <h2 className="font-mono text-xl mb-2" style={{ color: '#fff' }}>{problem.title}</h2>
          <p className="font-mono text-sm mb-6" style={{ color: '#aaa', lineHeight: 1.6 }}>
            "이 시스템에 대한 루트 접근 권한을 획득하고, 숨겨진 플래그를 찾으세요. <br/>
            주의: 모든 트래픽은 모니터링되고 있습니다."
          </p>
          
          <button className="flex justify-center items-center gap-2 font-mono" style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: 'transparent',
            border: '1px dashed #555',
            color: '#ccc',
            marginBottom: '20px',
            cursor: 'not-allowed'
           }}>
             <Download size={16} /> Fake Attachment.zip (1.2MB)
          </button>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 relative">
              <label className="font-mono text-xs" style={{ color: 'var(--neon-green)' }}>&gt; INPUT FLAG:</label>
              <input 
                type="text" 
                className="font-mono"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="FLAG{...}"
                autoFocus
                disabled={status === 'loading' || status === 'success'}
                style={{
                  width: '100%',
                  backgroundColor: '#000',
                  border: '1px solid #333',
                  padding: '12px',
                  color: 'var(--neon-green)',
                  outline: 'none',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
                onBlur={(e) => e.target.style.border = '1px solid #333'}
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="font-mono glitch-effect"
                style={{
                  marginTop: '10px',
                  padding: '12px',
                  backgroundColor: status === 'loading' ? '#333' : 'var(--neon-green)',
                  color: status === 'loading' ? '#888' : '#000',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: status === 'loading' ? 'wait' : 'pointer'
                }}
              >
                {status === 'idle' && 'SUBMIT PAYLOAD'}
                {status === 'loading' && 'VALIDATING... [██████░░░░]'}
                {status === 'success' && 'ACCESS GRANTED'}
                {status === 'error' && 'ACCESS DENIED'}
              </button>
            </div>
          </form>
          
          {/* 피드백 메시지 영역 */}
          {status === 'error' && (
             <div className="font-mono text-center mb-2 mt-4 animate-pulse-green" style={{ color: 'var(--neon-red)' }}>
               [!] INCORRECT FLAG FORMAT OR INVALID SIGNATURE.
             </div>
          )}
          {status === 'success' && (
             <div className="font-mono text-center justify-center flex mb-2 mt-4" style={{ color: 'var(--neon-green)' }}>
               [+] FLAG ACCEPTED. POINTS AWARDED.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
