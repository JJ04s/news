import './Ticker.css';

/**
 * [Phase 2.3] Ticker 컴포넌트
 * 설계 포인트:
 * 1. PDF 명세서에 따라 좌우 2개의 독립된 레인(Lane) 구조로 설계했습니다.
 * 2. 언론사 영역(56px)과 뉴스 제목 영역(flex 1)을 분리하여 레이아웃을 고정했습니다.
 * 3. 말줄임표(ellipsis)를 적용하여 뉴스 제목이 길어져도 레이아웃이 깨지지 않게 방어했습니다.
 */
function Ticker({ tickers }) {
  // 데이터가 없을 때를 대비한 방어 코드
  if (!tickers) return null;

  return (
    <div className="ticker-container">
      {/* 왼쪽 레인 */}
      <div className="ticker-lane">
        <span className="ticker-press">연합뉴스</span>
        <div className="ticker-title">
          {tickers.left[0]}
        </div>
      </div>

      {/* 오른쪽 레인 */}
      <div className="ticker-lane">
        <span className="ticker-press">한국경제</span>
        <div className="ticker-title">
          {tickers.right[0]}
        </div>
      </div>
    </div>
  );
}

export default Ticker;
// --- Ticker 구현 종료 ---
