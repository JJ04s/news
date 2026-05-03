import './GridView.css';

/**
 * [Phase 2.4] GridView 컴포넌트
 * 설계 포인트:
 * 1. CSS Grid를 활용하여 6x4(24개) 언론사 바둑판 레이아웃을 구현합니다.
 * 2. 각 셀(Grid Item)은 고정된 높이를 가지며, 내부 로고는 중앙 정렬합니다.
 * 3. 데이터의 logoProps를 활용하여 텍스트 기반 로고를 유연하게 렌더링합니다.
 */
function GridView({ pressList }) {
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
