import { useContext } from 'react';
import { NewsContext } from '../../context/NewsContext';
import { LayoutGrid, List } from 'lucide-react';
import './TabBar.css';

/**
 * [Phase 3.3] TabBar 컴포넌트
 * 설계 포인트:
 * 1. 상태 연동: NewsContext의 tab, viewer 상태에 따라 UI를 변경하고 조작합니다.
 * 2. 디자인 준수: PDF 6.3 명세(높이 24px, 간격 24px/8px)를 정확히 구현합니다.
 */
function TabBar() {
  const { tab, setTab, viewer, setViewer, subscriptions } = useContext(NewsContext);

  return (
    <div className="tab-bar-container">
      {/* 좌측 클러스터: 탭 전환 */}
      <div className="tab-left-cluster">
        <button 
          className={`tab-item ${tab === 'all' ? 'active' : ''}`}
          onClick={() => setTab('all')}
        >
          전체 언론사
        </button>
        
        <div className="tab-item-wrapper">
          <button 
            className={`tab-item ${tab === 'sub' ? 'active' : ''}`}
            onClick={() => setTab('sub')}
          >
            내가 구독한 언론사
          </button>
          {/* 구독 뱃지: 구독한 언론사가 있을 때만 표시 (디자인 6.3) */}
          {subscriptions.length > 0 && (
            <span className="subscription-badge">
              {subscriptions.length}
            </span>
          )}
        </div>
      </div>

      {/* 우측 클러스터: 뷰어 모드 전환 */}
      <div className="tab-right-cluster">
        <button 
          className={`viewer-icon-button ${viewer === 'list' ? 'active' : ''}`}
          onClick={() => setViewer('list')}
          aria-label="리스트 보기"
        >
          <List size={24} />
        </button>
        <button 
          className={`viewer-icon-button ${viewer === 'grid' ? 'active' : ''}`}
          onClick={() => setViewer('grid')}
          aria-label="그리드 보기"
        >
          <LayoutGrid size={24} />
        </button>
      </div>
    </div>
  );
}

export default TabBar;
// --- TabBar 구현 종료 ---
