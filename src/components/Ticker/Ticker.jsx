import TickerLane from './TickerLane';
import './Ticker.css';

/**
 * [Phase 3.1] Ticker 컴포넌트
 * 설계 포인트:
 * 1. 구조적 분리: 좌/우 독립된 레인을 TickerLane 컴포넌트로 관리합니다.
 * 2. 레이아웃: CSS Flexbox를 사용하여 두 개의 레인을 수평 배치합니다.
 */
function Ticker() {
  return (
    <div className="ticker-container">
      <TickerLane 
        type="left" 
        pressName="연합뉴스" 
      />
      <div className="ticker-divider" />
      <TickerLane 
        type="right" 
        pressName="한국경제" 
      />
    </div>
  );
}

export default Ticker;
// --- Ticker 구현 종료 ---
