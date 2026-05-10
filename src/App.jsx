import { useContext } from 'react';
import { NewsContext, NewsProvider } from './context/NewsContext';
import Header from './components/Header/Header';
import Ticker from './components/Ticker/Ticker';
import TabBar from './components/TabBar/TabBar';
import GridView from './components/GridView/GridView';
import ListView from './components/ListView/ListView';
import './App.css';

/**
 * [Phase 3.1] 메인 App 컴포넌트
 * 설계 포인트:
 * 1. NewsProvider 도입: Context API를 통해 전역 상태 관리 체계로 전환했습니다.
 * 2. 로직 분리: 데이터 fetching 로직을 NewsContext로 이동시켜 App의 책임을 줄였습니다.
 */
function AppContent() {
  const { viewer } = useContext(NewsContext);

  return (
    <div className="app-container">
      {/* 930px 고정 너비의 메인 콘텐츠 영역 */}
      <main className="newsstand-canvas">

        {/* Phase 2.2: Header 영역 */}
        <Header />

        {/* Phase 3.1: Ticker 영역 (내부에서 Context 구독) */}
        <Ticker />

        {/* [Phase 3.3] TabBar 영역 */}
        <TabBar />

        {/* [Phase 3.3] 메인 영역: 뷰 모드에 따른 조건부 렌더링 */}
        <div className="main-content-wrapper">
          {viewer === 'grid' ? <GridView /> : <ListView />}
        </div>

      </main>
    </div>
  );
}

function App() {
  return (
    <NewsProvider>
      <AppContent />
    </NewsProvider>
  );
}

export default App;
