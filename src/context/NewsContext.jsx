import { createContext, useState, useEffect } from 'react';

/**
 * [Phase 3.1] NewsContext
 * 설계 포인트:
 * 1. 중앙 집중식 데이터 관리: DB(Mock Data)에서 불러온 정보를 전역에서 공유합니다.
 * 2. 확장성: 향후 '구독 정보'나 '뷰 모드' 상태도 이곳에서 관리하여 복잡한 Props 전달을 제거합니다.
 */
export const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [newsData, setNewsData] = useState({
    tickers: null,
    pressList: [],
    categories: [],
    isLoading: true
  });

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
    <NewsContext.Provider value={newsData}>
      {children}
    </NewsContext.Provider>
  );
}
// --- NewsContext 구현 종료 ---
