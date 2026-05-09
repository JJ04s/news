import { useContext } from 'react';
import { NewsContext } from '../../context/NewsContext';
import './ListView.css';

/**
 * [Phase 3.1] ListView 컴포넌트
 * 설계 포인트:
 * 1. 데이터 구독: NewsContext에서 카테고리와 언론사 목록을 직접 가져옵니다.
 * 2. 렌더링 방어: 데이터가 비어있을 경우 화면이 깨지지 않도록 얼리 리턴(Early Return) 처리합니다.
 */
function ListView() {
  const { categories, pressList, isLoading, subscriptions, subscribe, unsubscribe } = useContext(NewsContext);

  // 데이터 로딩 중이거나 데이터가 없을 때의 처리
  if (isLoading || !pressList || pressList.length === 0) return null;

  // 현재는 UI 틀 구성을 위해 첫 번째 언론사 데이터를 사용합니다.
  const currentPress = pressList[0];
  // [3.2] 현재 언론사가 구독 중인지 확인
  const isSubscribed = subscriptions.some(sub => sub.pressId === currentPress.id);

  return (
    <div className="list-view-container">
      {/* 1. 카테고리 탭 영역 */}
      <nav className="category-tab-bar">
        {categories.map((category, index) => (
          <div key={category} className={`category-tab ${index === 0 ? 'active' : ''}`}>
            <span className="category-name">{category}</span>
            {/* Phase 3.4에서 애니메이션이 들어갈 프로그레스 바 배경 */}
            <div className="progress-bg">
              {index === 0 && <div className="progress-bar" style={{ width: '0%' }}></div>}
            </div>
          </div>
        ))}
      </nav>

      {/* 2. 뉴스 콘텐츠 영역 */}
      <div className="news-content-area">
        {/* 헤더: 언론사 정보 */}
        <header className="news-header">
          <span className="press-name">{currentPress.name}</span>
          <span className="edit-time">{currentPress.lastEditTime} 편집</span>
          {/* [3.2] 구독/해지 버튼 연동 */}
          <button 
            className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
            onClick={() => isSubscribed ? unsubscribe(currentPress.id) : subscribe(currentPress.id)}
          >
            {isSubscribed ? '× 해지하기' : '+ 구독하기'}
          </button>
        </header>

        {/* 바디: 기사 내용 */}
        <section className="news-body">
          {/* 주요 기사 (왼쪽) */}
          <div className="main-article">
            <div className="thumbnail-wrapper">
              <img src={currentPress.mainArticle.thumbnail} alt="기사 썸네일" />
            </div>
            <h3 className="main-title">{currentPress.mainArticle.title}</h3>
          </div>

          {/* 서브 기사 목록 (오른쪽) */}
          <ul className="sub-article-list">
            {currentPress.subArticles.map((article, index) => (
              <li key={index} className="sub-article-item">
                <a href={article.link} className="sub-title">{article.title}</a>
              </li>
            ))}
            <li className="sub-article-notice">
              {currentPress.name} 언론사에서 직접 편집한 뉴스입니다.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ListView;
// --- ListView 구현 종료 ---
