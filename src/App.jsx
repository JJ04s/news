import { useState, useEffect } from 'react';
import { getPressList, getTickerData } from './api/newsApi';
import Header from './components/Header/Header';
import './App.css';

/**
 * [Phase 2.1] 메인 App 컴포넌트
 * 설계 포인트:
 * 1. PDF 명세서의 Canvas(1280px)와 Content(930px) 레이아웃을 구현합니다.
 * 2. 전체 서비스의 뼈대를 잡고, 이후 개발할 컴포넌트들의 위치(Slot)를 확보합니다.
 * 3. 데이터 로드 로직은 최상단인 App에서 관리하여 하위로 내려주는 구조를 유지합니다.
 */
function App() {
  const [pressList, setPressList] = useState([]);
  const [tickers, setTickers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 로드 로직 (Phase 1.4 유지)
  useEffect(() => {
    const loadData = async () => {
      try {
        const [presses, tickerData] = await Promise.all([
          getPressList(),
          getTickerData()
        ]);

        setPressList(presses);
        setTickers(tickerData);
      } catch (error) {
        console.error('초기 데이터 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // --- [데이터 로드] 기능 종료 ---
  }, []);

  if (isLoading) return <div className="loading">뉴스를 불러오는 중입니다...</div>;

  return (
    <div className="app-container">
      {/* 930px 고정 너비의 메인 콘텐츠 영역 */}
      <main className="newsstand-canvas">
        
        {/* Phase 2.2: Header 영역 */}
        <Header />

        {/* Phase 2.3: Ticker 영역 */}
        <section className="placeholder ticker-area">
          News Ticker (Rolling Lanes)
        </section>

        {/* Phase 2.4/2.5: 메인 영역 (TabBar + Grid/List) */}
        <div className="main-content-wrapper">
          <section className="placeholder tabbar-area">
            TabBar (All/Sub & Grid/List Toggle)
          </section>

          <section className="placeholder content-area">
            Main Content (Grid View / List View)
          </section>
        </div>

      </main>
    </div>
  );
}

export default App;
