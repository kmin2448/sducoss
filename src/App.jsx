import React, { useState } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import ScoreChart from './components/ScoreChart';
import Leaderboard from './components/Leaderboard';
import ProblemGrid from './components/ProblemGrid';
import ProblemModal from './components/ProblemModal';
import FirstBloodPopup from './components/FirstBloodPopup';
import AdminMenu from './components/AdminMenu';
import { useMockData } from './hooks/useMockData';

export default function App() {
  const { teams, problems, firstBlood, submitFlag, updateTeamName, updateTeamCount } = useMockData(7000); // 7초마다 데이터 업데이트
  const [selectedProblem, setSelectedProblem] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)' }}>
      {/* 1. 상단 GNB */}
      <Header />
      
      {/* 2. 공지사항 티커 */}
      <Ticker />

      {/* 3. 본문 2단 레이아웃 (Dashboard / Problem Board) */}
      <main style={{ flex: 1, display: 'flex', gap: '2rem', padding: '2rem' }}>
        
        {/* 좌측: 대시보드 (차트 + 리더보드) */}
        <section style={{ flex: '3', display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: '400px' }}>
          <div style={{ flex: '1' }}>
             <ScoreChart teams={teams} />
          </div>
          <div style={{ flex: '2', display: 'flex', flexDirection: 'column' }}>
             <Leaderboard teams={teams} />
          </div>
        </section>

        {/* 우측: 문제 보드 */}
        <section style={{ flex: '7' }}>
          <ProblemGrid problems={problems} onSelectProblem={setSelectedProblem} />
        </section>

      </main>

      {/* 하단 푸터 */}
      <footer style={{ padding: '1rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '2rem', opacity: 0.6 }}>
          <span className="font-mono text-xs" style={{ color: '#ccc' }}>&copy; 2026 GAMJA HACK</span>
          <span className="font-mono text-xs" style={{ color: '#ccc' }}>강원대학교 데이터보안활용혁신융합대학사업단</span>
          <span className="font-mono text-xs" style={{ color: '#ccc' }}>강원정보보호지원센터</span>
          <span className="font-mono text-xs" style={{ color: '#ccc' }}>국정원지부</span>
        </div>
      </footer>

      {/* 모달 및 오버레이 */}
      {selectedProblem && (
        <ProblemModal 
          problem={selectedProblem} 
          onClose={() => setSelectedProblem(null)} 
          onSubmitFlag={submitFlag} 
        />
      )}

      {/* First Blood 팝업 (조건부 렌더링) */}
      <FirstBloodPopup event={firstBlood} />

      {/* 관리자 메뉴 */}
      <AdminMenu teams={teams} updateTeamName={updateTeamName} updateTeamCount={updateTeamCount} />

    </div>
  );
}
