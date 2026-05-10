import { createContext, useState, useEffect } from 'react';

/**
 * [Phase 3.1] NewsContext
 * 설계 포인트:
 * 1. 중앙 집중식 데이터 관리: DB(Mock Data)에서 불러온 정보를 전역에서 공유합니다.
 * 2. 확장성: 향후 '구독 정보'나 '뷰 모드' 상태도 이곳에서 관리하여 복잡한 Props 전달을 제거합니다.
 */
export const NewsContext = createContext();

const API_URL = 'https://69bd31e32bc2a25b22add65b.mockapi.io/subscriptions'

export function NewsProvider({ children }) {
  const [newsData, setNewsData] = useState({
    tickers: null,
    pressList: [],
    categories: [],
    isLoading: true
  });

  const [subscriptions, setSubscriptions] = useState([]);

  const [processingIds, setProcessingIds] = useState(new Set());

  // [Phase 3.3] 뷰 전환 상태 추가
  const [tab, setTab] = useState('all'); // 'all' | 'sub'
  const [viewer, setViewer] = useState('grid'); // 'grid' | 'list'

  // [Phase 3.4] 리스트 뷰 카테고리 상태 추가
  const [activeCategory, setActiveCategory] = useState('종합/경제');
  const [currentPressIndex, setCurrentPressIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // [Phase 3.4] 자동 전환 타이머 엔진
  useEffect(() => {
    // 그리드 뷰이거나 데이터 로딩 중이면 타이머 작동 안 함
    if (viewer !== 'list' || newsData.isLoading || isTimerPaused) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + (100 / 60); // 100ms * 60 = 6s
        return 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [viewer, isTimerPaused, activeCategory, currentPressIndex]);

  // [Phase 3.4] 프로그레스 완료 시 다음 단계로 이동
  useEffect(() => {
    if (progress >= 100) {
      const currentCategoryPresses = newsData.pressList.filter(
        p => p.category === activeCategory
      );

      if (currentPressIndex < currentCategoryPresses.length - 1) {
        // 1. 같은 카테고리 내 다음 언론사
        setCurrentPressIndex(prev => prev + 1);
      } else {
        // 2. 다음 카테고리로 이동
        const categoryIdx = newsData.categories.indexOf(activeCategory);
        const nextCategoryIdx = (categoryIdx + 1) % newsData.categories.length;
        setActiveCategory(newsData.categories[nextCategoryIdx]);
        setCurrentPressIndex(0);
      }
      setProgress(0);
    }
  }, [progress, activeCategory, currentPressIndex, newsData]);

  // 수동 클릭 시 초기화 함수
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentPressIndex(0);
    setProgress(0);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSubscriptions(data);
    };
    loadInitialData();
  }, []);

  const subscribe = async (pressId) => {

    if (subscriptions.some(sub => sub.pressId === pressId) || processingIds.has(pressId)) {
      return;
    }

    setProcessingIds(prev => new Set(prev).add(pressId));
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pressId: pressId })
      });

      const newSubscription = await response.json();
      setSubscriptions(prev => [...prev, newSubscription]);
    } catch (error) {
      console.error('구독 실패:', error);
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(pressId);
        return next;
      });
    }
  };

  const unsubscribe = async (pressId) => {
    if (processingIds.has(pressId)) return;

    const targetSub = subscriptions.find(sub => sub.pressId === pressId);

    if (!targetSub) return;

    setProcessingIds(prev => new Set(prev).add(pressId));

    try {
      await fetch(`${API_URL}/${targetSub.id}`, {
        method: 'DELETE'
     });
      setSubscriptions(prev => prev.filter(sub => sub.id !== targetSub.id));
    } catch (error) {
      console.error('해지 실패:', error);
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(pressId);
        return next;
      });
    }
  };
  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch('/src/data/mockData.json');
        const data = await response.json();
        
        setNewsData({
          tickers: data.tickers,
          pressList: data.pressList,
          categories: data.categories,
          isLoading: false
        });
      } catch (error) {
        console.error('데이터 로드 실패:', error);
        setNewsData(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchAllData();
  }, []);

  return (
    <NewsContext.Provider value={{
      ...newsData,
      subscriptions,
      subscribe,
      unsubscribe,
      processingIds,
      tab,
      setTab,
      viewer,
      setViewer,
      activeCategory,
      setActiveCategory: handleCategoryClick, // 탭 클릭 시 리셋 포함된 함수로 교체
      currentPressIndex,
      setCurrentPressIndex,
      progress,
      isTimerPaused,
      setIsTimerPaused
    }}>
      {children}
    </NewsContext.Provider>
  );
}
// --- NewsContext 구현 종료 ---
