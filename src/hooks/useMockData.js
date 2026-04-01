import { useState, useEffect, useCallback } from 'react';

// 가상 팀 데이터
const MOCK_TEAMS = [
  { id: 1, name: 'Team_Rookies', score: 100, color: '#00FF41', history: [100] },
  { id: 2, name: 'Cyber_Knights', score: 85, color: '#0DE2EA', history: [85] },
  { id: 3, name: 'Null_Pointers', score: 120, color: '#FF003C', history: [120] },
  { id: 4, name: 'Hex_Breakers', score: 40, color: '#F0E68C', history: [40] },
  { id: 5, name: 'Bit_Flippers', score: 200, color: '#FF00FF', history: [200] },
  { id: 6, name: 'Buffer_Overflowers', score: 150, color: '#FFA500', history: [150] },
  { id: 7, name: 'Crypto_Miners', score: 60, color: '#8A2BE2', history: [60] },
  { id: 8, name: 'Packet_Sniffers', score: 95, color: '#32CD32', history: [95] },
  { id: 9, name: 'Root_Kits', score: 180, color: '#FF4500', history: [180] },
  { id: 10, name: 'Zero_Days', score: 110, color: '#1E90FF', history: [110] },
];

// 가상 문제 데이터
const MOCK_PROBLEMS = [
  { id: 101, category: 'Web', title: 'SQL Injection 101', points: 100, isSolved: false },
  { id: 102, category: 'Web', title: 'XSS Validator', points: 200, isSolved: false },
  { id: 103, category: 'Web', title: 'Bypass WAF', points: 300, isSolved: false },
  { id: 201, category: 'Pwnable', title: 'Simple BOF', points: 150, isSolved: false },
  { id: 202, category: 'Pwnable', title: 'Format Strings', points: 250, isSolved: false },
  { id: 203, category: 'Pwnable', title: 'Heap Exploitation', points: 400, isSolved: false },
  { id: 301, category: 'Crypto', title: 'Caesar Cipher', points: 50, isSolved: true },
  { id: 302, category: 'Crypto', title: 'RSA Attack', points: 300, isSolved: false },
  { id: 401, category: 'Reversing', title: 'Keygen_Me', points: 200, isSolved: false },
  { id: 402, category: 'Reversing', title: 'Anti-Debug', points: 350, isSolved: false },
  { id: 501, category: 'Misc', title: 'Sanity Check', points: 10, isSolved: true },
  { id: 502, category: 'Misc', title: 'OSINT Protocol', points: 100, isSolved: false },
];

export function useMockData(intervalMs = 7000) {
  const [teams, setTeams] = useState(
    MOCK_TEAMS.sort((a, b) => b.score - a.score)
  );
  const [problems, setProblems] = useState(MOCK_PROBLEMS);
  const [firstBlood, setFirstBlood] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTeams(prevTeams => {
        // 랜덤하게 1~3개 팀의 점수를 올림 (최대 +100)
        let newTeams = prevTeams.map(team => {
          const isScoring = Math.random() > 0.6;
          const pointsEarned = isScoring ? Math.floor(Math.random() * 100) + 10 : 0;
          const newScore = team.score + pointsEarned;
          // 기록은 차트를 위해 최대 10개까지만 유지
          const newHistory = [...team.history, newScore].slice(-10);
          
          return {
            ...team,
            score: newScore,
            history: newHistory
          };
        });

        // First Blood 확률적 트리거 이벤트
        if (Math.random() > 0.7) {
          const randomTeam = newTeams[Math.floor(Math.random() * newTeams.length)];
          const unsolvedProblems = problems.filter(p => !p.isSolved);
          if (unsolvedProblems.length > 0) {
            const randomProblem = unsolvedProblems[Math.floor(Math.random() * unsolvedProblems.length)];
            setFirstBlood({
              teamName: randomTeam.name,
              problemTitle: randomProblem.title,
              category: randomProblem.category
            });
            // 3초 후 팝업 제거
            setTimeout(() => setFirstBlood(null), 3000);
          }
        }

        // 항상 점수 기준 내림차순 정렬 후 리턴
        return newTeams.sort((a, b) => b.score - a.score);
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, problems]);

  const submitFlag = useCallback((problemId) => {
    return new Promise((resolve, reject) => {
      // 1.5초 로딩 (페이크 로직)
      setTimeout(() => {
        // 70% 확률로 정답 처리
        const isCorrect = Math.random() > 0.3;
        if (isCorrect) {
          setProblems(prev => prev.map(p => p.id === problemId ? { ...p, isSolved: true } : p));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1500);
    });
  }, []);

  const updateTeamName = useCallback((id, newName) => {
    setTeams(prevTeams => prevTeams.map(t => t.id === id ? { ...t, name: newName } : t));
  }, []);

  const updateTeamCount = useCallback((count) => {
    setTeams(prevTeams => {
      const currentCount = prevTeams.length;
      if (count === currentCount) return prevTeams;
      if (count < currentCount) return prevTeams.slice(0, count);
      
      const newTeams = [...prevTeams];
      let maxId = currentCount > 0 ? Math.max(...prevTeams.map(t => t.id)) : 0;
      for (let i = 0; i < count - currentCount; i++) {
        maxId++;
        newTeams.push({
          id: maxId,
          name: `New_Team_${maxId}`,
          score: 0,
          color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
          history: [0]
        });
      }
      return newTeams;
    });
  }, []);

  return {
    teams,
    problems,
    firstBlood,
    submitFlag,
    updateTeamName,
    updateTeamCount
  };
}
