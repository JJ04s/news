import './ListView.css';

/**
 * [Phase 2.5] ListView 컴포넌트
 * 설계 포인트:
 * 1. 상단 카테고리 탭과 하단 뉴스 콘텐츠 영역으로 구성됩니다.
 * 2. 카테고리 탭은 6개의 카테고리를 균등하게 배치하며, 현재 선택된 탭에는 프로그레스 바 영역을 확보합니다.
 * 3. 뉴스 콘텐츠는 좌측 주요 기사(이미지+제목)와 우측 서브 기사 목록으로 분리합니다.
 */
function ListView({ categories, pressList }) {
  // 현재는 UI 틀 구성을 위해 첫 번째 언론사 데이터를 사용합니다.
  const currentPress = pressList[0];
  if (!currentPress) return null;

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
          <button className="subscribe-button">+ 구독하기</button>
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
