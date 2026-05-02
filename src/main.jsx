import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css' // 디자인 토큰 변수 먼저 로드
import './index.css'             // 그 다음 전역 스타일 로드
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
