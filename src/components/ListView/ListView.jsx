import { useContext } from 'react';
import { NewsContext } from '../../context/NewsContext';
import { Newspaper } from 'lucide-react';
import './ListView.css';

/**
 * [Phase 3.1] ListView 컴포넌트
 * 설계 포인트:
 * 1. 데이터 구독: NewsContext에서 카테고리와 언론사 목록을 직접 가져옵니다.
 * 2. 렌더링 방어: 데이터가 비어있을 경우 화면이 깨지지 않도록 얼리 리턴(Early Return) 처리합니다.
 */
function ListView() {
  const { 
    categories, 
    pressList, 
    isLoading, 
    subscriptions, 
    subscribe, 
    unsubscribe, 
    processingIds, 
    tab,
    activeCategory,
    setActiveCategory,
    currentPressIndex,
    progress,
    setIsTimerPaused
  } = useContext(NewsContext);

  // 데이터 로딩 중이거나 데이터가 없을 때의 처리
  if (isLoading || !pressList || pressList.length === 0) return null;

  /**
   * [Phase 3.3 & 3.4] 파생 데이터 (Derived State) 필터링
   * 별도의 State를 만들지 않고 기존 tab, activeCategory를 조합해 
   * 렌더링 시점에 실시간으로 뉴스 목록을 계산합니다. (데이터 무결성 보장)
   */
  const tabFilteredList = tab === 'all'
    ? pressList
    : pressList.filter(press => subscriptions.some(sub => sub.pressId === press.id));

  const categoryFilteredList = tabFilteredList.filter(press => press.category === activeCategory);

  // [Phase 3.3] 구독한 언론사가 아예 없는 경우
  if (tabFilteredList.length === 0 && tab === 'sub') {
    return (
      <div className="list-view-empty-container">
        <div className="empty-content">
          <Newspaper size={48} className="empty-icon" strokeWidth={1.2} />
          <h3 className="empty-title">구독한 언론사가 없습니다.</h3>
          <p className="empty-description">
            전체 언론사에서 원하는 언론사를 구독해 보세요.
          </p>
        </div>
      </div>
    );
  }

  /**
   * [Phase 3.4] 현재 표시할 언론사 결정
   * 상위 Context에서 계산된 currentPressIndex를 활용해 순환하는 데이터를 노출합니다.
   */
  const currentPress = categoryFilteredList[currentPressIndex] || categoryFilteredList[0];
  const isSubscribed = currentPress ? subscriptions.some(sub => sub.pressId === currentPress.id) : false;

  return (
    <div 
      className="list-view-container"
      onMouseEnter={() => setIsTimerPaused(true)}
      onMouseLeave={() => setIsTimerPaused(false)}
    >
      {/* 1. 카테고리 탭 영역 */}
      <nav className="category-tab-bar">
        {categories.map((category) => (
          <div 
            key={category} 
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            <div className="tab-text-group">
              <span className="category-name">{category}</span>
              {activeCategory === category && currentPress && (
                <span className="category-counter">
                  {currentPressIndex + 1} / {categoryFilteredList.length}
                </span>
              )}
            </div>
            
            <div className="progress-bg">
              {activeCategory === category && (
                <div 
                  className="progress-bar" 
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* 2. 뉴스 콘텐츠 영역 */}
      <div className="news-content-area">
        {currentPress ? (
          <>
            {/* 헤더: 언론사 정보 */}
            <header className="news-header">
              <span className="press-name">{currentPress.name}</span>
              <span className="edit-time">{currentPress.lastEditTime} 편집</span>
              <button 
                className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
                onClick={() => isSubscribed ? unsubscribe(currentPress.id) : subscribe(currentPress.id)}
                disabled={processingIds.has(currentPress.id)}
              >
                {isSubscribed ? '× 해지하기' : '+ 구독하기'}
              </button>
            </header>

            {/* 바디: 기사 내용 */}
            <section className="news-body">
              <div className="main-article">
                <div className="thumbnail-wrapper">
                  <img src={currentPress.mainArticle.thumbnail} alt="기사 썸네일" />
                </div>
                <h3 className="main-title">{currentPress.mainArticle.title}</h3>
              </div>

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
          </>
        ) : (
          /* [Phase 3.4] 특정 카테고리에 구독 뉴스가 없을 때의 작은 엠티 상태 */
          <div className="category-empty-state">
            <p className="empty-description">
              '{activeCategory}' 카테고리에 구독한 언론사가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListView;
// --- ListView 구현 종료 ---
