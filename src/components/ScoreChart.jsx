import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ScoreChart({ teams }) {
  // 상위 5팀만 그래프에 표시하여 복잡도 감소
  const topTeams = useMemo(() => teams.slice(0, 5), [teams]);

  const data = useMemo(() => {
    return {
      // X축 레이블 (최대 10개의 데이터 포인트)
      labels: Array.from({ length: 10 }, (_, i) => `T-${10 - i}`),
      datasets: topTeams.map(team => ({
        label: team.name,
        data: team.history,
        borderColor: team.color,
        backgroundColor: `${team.color}33`, // 20% opacity
        borderWidth: 2,
        pointBackgroundColor: team.color,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false, // 채우기 효과 (성능과 가독성을 위해 false)
      }))
    };
  }, [topTeams]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeInOutQuad'
    },
    scales: {
      x: {
        grid: { color: '#333' },
        ticks: { color: '#888', font: { family: 'Fira Code' } }
      },
      y: {
        grid: { color: '#333' },
        ticks: { color: '#888', font: { family: 'Fira Code' } }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ccc',
          font: { family: 'Fira Code', size: 11 },
          usePointStyle: true,
          pointStyle: 'rect'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { family: 'Fira Code' },
        bodyFont: { family: 'Fira Code' },
        borderColor: '#333',
        borderWidth: 1
      }
    }
  };

  return (
    <div className="panel h-full w-full" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      <h2 className="font-mono mb-4 text-sm" style={{ color: 'var(--cyber-blue)', borderBottom: '1px solid #333', paddingBottom: '0.5rem', margin: '0 0 1rem 0' }}>
        [ LIVE RANKING TREND ]
      </h2>
      <div style={{ flex: 1, minHeight: '250px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
