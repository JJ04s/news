export const getPressList = async() => {
    try {
        const response = await fetch('/src/data/mockData.json');
        const data = await response.json();
        return data.pressList;
    } catch (error) {
        console.error('에러 발생:', error);
    }
};

export const getTickerData = async() => {
    try {
        const response = await fetch('/src/data/mockData.json');
        const data = await response.json();
        return data.tickers;
    } catch (error) {
        console.log('에러 발생', error);
    }
}