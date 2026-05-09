import { useContext } from 'react';
import { NewsContext } from '../../context/NewsContext';
import './GridView.css';

/**
 * [Phase 3.1] GridView 컴포넌트
 * 설계 포인트:
 * 1. 데이터 구독: NewsContext를 통해 전역 언론사 데이터를 가져옵니다.
 * 2. 렌더링 방어: 데이터 로딩 중이거나 데이터가 없을 경우를 대비한 방어 로직을 추가했습니다.
 */
function GridView() {
  const { pressList, isLoading } = useContext(NewsContext);

  if (isLoading || !pressList) return null;

  // 24개의 그리드 칸을 유지하기 위해 데이터가 부족하더라도 24개를 보장합니다.
  const displayList = pressList.slice(0, 24);

  return (
    <div className="grid-view-container">
      {displayList.map((press) => (
        <div key={press.id} className="grid-item">
          <div 
            className="press-logo"
            style={{
              fontFamily: press.logoProps.font === 'serif' ? 'var(--font-logo)' : 'var(--font-main)',
              fontWeight: press.logoProps.weight || 400,
              color: press.logoProps.color || 'var(--color-ink)',
              backgroundColor: press.logoProps.bg || 'transparent',
              fontStyle: press.logoProps.italic ? 'italic' : 'normal',
              borderRadius: press.logoProps.radius === 'sub' ? '4px' : '0'
            }}
          >
            {/* 특정 글자만 강조하는 로직 (예: SBS Biz의 Biz) */}
            {press.logoProps.accent ? (
              <>
                <span>{press.name.slice(0, press.logoProps.accentChar)}</span>
                <span style={{ color: press.logoProps.accent }}>
                  {press.name.slice(press.logoProps.accentChar)}
                </span>
              </>
            ) : (
              press.name
            )}
          </div>
          
          {/* 호버 시 나타날 구독 버튼 (Phase 4.1에서 고도화 예정) */}
          <div className="grid-hover-layer">
            <button className="subscribe-button">+ 구독하기</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GridView;
// --- GridView 구현 종료 ---
