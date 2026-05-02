import { useState, useEffect } from 'react';
import { getPressList, getTickerData } from './api/newsApi';

/**
 * 데이터 검증용 App 컴포넌트 (V2)
 * 설계 포인트: 
 * 1. 24개 언론사가 6x4 그리드 형태로 올바르게 렌더링되는지 확인합니다.
 * 2. 이미지 없는 로고(logoProps)의 스타일 속성들이 정상적으로 적용되는지 테스트합니다.
 */
function App() {
  const [pressList, setPressList] = useState([]);
  const [tickers, setTickers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      const presses = await getPressList();
      const tickerData = await getTickerData();

      setPressList(presses);
      setTickers(tickerData);

      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) return <div style={{ padding: '40px' }}>데이터를 불러오는 중입니다...</div>;

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--color-page)', minHeight: '100vh' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>🗞️ 뉴스스탠드 API 검증 (24개 언론사)</h1>
        <p style={{ color: 'var(--color-sub)' }}>newApi.js를 통해 불러온 데이터</p>
      </header>

      {/* 그리드 뷰 검증 (6x4) */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 154px)', 
        gridTemplateRows: 'repeat(4, 96px)',
        gap: '1px',
        backgroundColor: 'var(--color-line)', // 구분선 효과
        width: 'fit-content',
        border: '1px solid var(--color-line)'
      }}>
        {pressList.map((press) => {
          const { text, color, bg, font, weight, italic, accent, accentChar } = press.logoProps;
          
          return (
            <div key={press.id} style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: bg || 'var(--color-card)',
              width: '154px',
              height: '96px',
              padding: '10px',
              textAlign: 'center',
              fontFamily: font === 'serif' ? 'var(--font-serif)' : 'var(--font-main)',
              fontWeight: weight || 500,
              fontStyle: italic ? 'italic' : 'normal',
              color: color || 'var(--color-ink)',
              fontSize: '16px'
            }}>
              {/* 강조색(Accent) 처리 로직 테스트 */}
              {accent ? (
                <span>
                  {text.substring(0, accentChar)}
                  <span style={{ color: accent }}>{text.substring(accentChar)}</span>
                </span>
              ) : text}
            </div>
          );
        })}
      </section>

      <footer style={{ marginTop: '40px', color: 'var(--color-mute)', fontSize: '12px' }}>
        // --- 24개 언론사 로고 데이터 검증 종료 ---
      </footer>
    </div>
  );
}

export default App;
