import './Header.css';

/**
 * [Phase 2.2] Header 컴포넌트
 * 설계 포인트:
 * 1. Intl.DateTimeFormat을 사용하여 명세서의 "2026. 01. 14. 수요일" 포맷을 구현합니다.
 * 2. SVG 아이콘을 직접 작성하여 외부 라이브러리 의존성을 줄이고 최적화했습니다.
 * 3. CSS 변수(--typo, --color)를 적극 활용하여 디자인 시스템을 준수합니다.
 */
function Header() {
  // 설계 포인트: 명세에 맞는 날짜 포맷 생성 함수
  const formatToday = () => {
    const today = new Date();
    // 2026. 05. 03. 일요일 형식으로 변환
    const formatter = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    });
    
    // 포맷팅 결과: "2026. 05. 03. 일요일"
    return formatter.format(today);
  };

  return (
    <header className="header-container">
      {/* 왼쪽: 로고 영역 */}
      <a href="/" className="logo-area">
        {/* PDF 명세의 신문 아이콘 SVG 구현 */}
        <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 9H17" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13H17" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 9H8" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13H8" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="logo-text">뉴스스탠드</h1>
      </a>

      {/* 오른쪽: 오늘 날짜 */}
      <div className="date-area">
        {formatToday()}
      </div>
    </header>
  );
}

export default Header;
// --- Header 구현 종료 ---
