import { NewsProvider } from './context/NewsContext';
import Header from './components/Header/Header';
import Ticker from './components/Ticker/Ticker';
import GridView from './components/GridView/GridView';
import ListView from './components/ListView/ListView';
import './App.css';

/**
 * [Phase 3.1] 메인 App 컴포넌트
 * 설계 포인트:
 * 1. NewsProvider 도입: Context API를 통해 전역 상태 관리 체계로 전환했습니다.
 * 2. 로직 분리: 데이터 fetching 로직을 NewsContext로 이동시켜 App의 책임을 줄였습니다.
 */
function App() {
  return (
    <NewsProvider>
      <div className="app-container">
        {/* 930px 고정 너비의 메인 콘텐츠 영역 */}
        <main className="newsstand-canvas">
          
          {/* Phase 2.2: Header 영역 */}
          <Header />

          {/* Phase 3.1: Ticker 영역 (내부에서 Context 구독) */}
          <Ticker />

          {/* Phase 2.4/2.5: 메인 영역 */}
          <div className="main-content-wrapper">
            <section className="placeholder tabbar-area">
              TabBar (All/Sub & Grid/List Toggle)
            </section>

            {/* 이후 단계에서 Context를 구독하도록 수정될 예정입니다. */}
            <GridView />
            <ListView />
          </div>

        </main>
      </div>
    </NewsProvider>
  );
}

export default App;
