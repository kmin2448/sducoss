// src/components/AdminMenu.jsx
import React, { useState, useEffect } from 'react';
import { Settings, X, Save, Users } from 'lucide-react';

export default function AdminMenu({ teams, updateTeamName, updateTeamCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingNames, setEditingNames] = useState({});
  const [teamCount, setTeamCount] = useState(teams?.length || 10);

  // When external team list changes, keep the local count in sync initially
  useEffect(() => {
    if (teams) {
      setTeamCount(teams.length);
    }
  }, [teams]);

  const handleNameChange = (id, newName) => {
    setEditingNames(prev => ({ ...prev, [id]: newName }));
  };

  const handleSaveTeam = (id) => {
    const newName = editingNames[id] !== undefined ? editingNames[id] : teams.find(t => t.id === id).name;
    updateTeamName(id, newName);
  };

  const handleSaveCount = () => {
    const count = parseInt(teamCount, 10);
    if (!isNaN(count) && count > 0 && count <= 50) {
      updateTeamCount(count);
    } else {
      alert("팀 수는 1~50 사이의 숫자를 입력해주세요.");
      setTeamCount(teams.length);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'var(--neon-green)',
          color: '#000',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999, // 매우 높은 z-index 설정
          boxShadow: '0 0 15px rgba(0, 255, 65, 0.4)',
          transition: 'all 0.3s ease'
        }}
        title="관리자 메뉴"
      >
        <Settings size={28} />
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--neon-green)',
            padding: '2rem',
            borderRadius: '12px',
            width: '450px',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 30px rgba(0, 255, 65, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
              <h2 style={{ color: 'var(--neon-green)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings size={20} /> 관리자 설정
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer', padding: '0.5rem' }}
              >
                <X size={24} />
              </button>
            </div>
            
            {/* 팀 수 설정 부분 */}
            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', color: '#ddd' }}>
                <Users size={16} /> 참가 팀 수 설정
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  min="1" max="50"
                  value={teamCount}
                  onChange={(e) => setTeamCount(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid #444',
                    color: '#fff',
                    borderRadius: '4px',
                    outline: 'none',
                    fontFamily: 'monospace'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                  onBlur={(e) => e.target.style.borderColor = '#444'}
                />
                <button 
                  onClick={handleSaveCount}
                  style={{
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  수정
                </button>
              </div>
            </div>

            {/* 팀 명 설정 부분 */}
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#ddd' }}>팀 이름 변경</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {teams.map((team, index) => (
                <div key={team.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', color: '#aaa', fontSize: '0.9rem' }}>#{index + 1}</div>
                  <input 
                    type="text" 
                    value={editingNames[team.id] !== undefined ? editingNames[team.id] : team.name}
                    onChange={(e) => handleNameChange(team.id, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid #444',
                      color: team.color || '#fff',
                      borderRadius: '4px',
                      outline: 'none',
                      fontFamily: 'monospace'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                    onBlur={(e) => e.target.style.borderColor = '#444'}
                  />
                  <button 
                    onClick={() => handleSaveTeam(team.id)}
                    style={{
                      background: 'var(--neon-green)',
                      color: '#000',
                      border: 'none',
                      padding: '0.6rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontWeight: 'bold'
                    }}
                  >
                    <Save size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
