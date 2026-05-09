import { useState, useEffect, useRef, useContext } from 'react';
import { NewsContext } from '../../context/NewsContext';

/**
 * [Phase 3.1] TickerLane 컴포넌트
 * 설계 포인트:
 * 1. 데이터 구독: NewsContext를 통해 티커 데이터를 직접 가져옵니다.
 * 2. 3.2초 주기 롤링: setInterval을 사용하여 정해진 주기에 따라 인덱스를 순환시킵니다.
 * 3. 상호작용: 마우스 호버 시 애니메이션을 일시 정지하여 사용자의 가독성을 배려합니다.
 * 4. Crossfade 효과: key 속성을 활용해 기사 변경 시 CSS 애니메이션을 트리거합니다.
 */
function TickerLane({ type, pressName }) {
  const { tickers, isLoading } = useContext(NewsContext);
  const newsList = tickers ? tickers[type] : [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(true);
  const timerRef = useRef(null);

  // 다음 기사로 인덱스 변경 (0 -> 1 -> 2 -> ... -> 0)
  const rollNext = () => {
    if (newsList.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % newsList.length);
    }
  };

  useEffect(() => {
    if (!isLoading && isRolling && newsList.length > 0) {
      // 3.2초 주기로 롤링 시작
      timerRef.current = setInterval(rollNext, 3200);
    }
    // 컴포넌트 언마운트 시 또는 상태 변경 시 타이머 정리 (메모리 누수 방지)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading, isRolling, newsList.length]);

  if (isLoading) return <div className="ticker-lane loading">로딩 중...</div>;

  return (
    <div 
      className="ticker-lane"
      onMouseEnter={() => setIsRolling(false)}
      onMouseLeave={() => setIsRolling(true)}
    >
      <span className="ticker-press">{pressName}</span>
      <div className="ticker-title-wrapper">
        {/* key가 변경될 때마다 DOM이 교체되며 CSS 애니메이션이 실행됩니다. */}
        <div key={currentIndex} className="ticker-title animated">
          {newsList[currentIndex]}
        </div>
      </div>
    </div>
  );
}

export default TickerLane;
// --- TickerLane 구현 종료 ---
