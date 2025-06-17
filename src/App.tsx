/*
 * @Author: jihao00122 52628008+jihao00122@users.noreply.github.com
 * @Date: 2025-06-17 15:28:59
 * @LastEditors: jihao00122 52628008+jihao00122@users.noreply.github.com
 * @LastEditTime: 2025-06-17 18:16:24
 * @FilePath: /Edit_web/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// 页面组件
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import TemplatePage from './pages/TemplatePage';
import ExportPage from './pages/ExportPage';

// 布局组件
import MainLayout from './components/layouts/MainLayout';

// 存储
import StoreProvider from './providers/StoreProvider';

function App() {
  // 添加一些动画效果到全局鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.createElement('div');
      cursor.className = 'cursor-fx';
      cursor.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: rgba(11, 239, 247, 0.7);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        z-index: 9999;
        opacity: 0.8;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(cursor);
      
      setTimeout(() => {
        cursor.style.opacity = '0';
        cursor.style.width = '25px';
        cursor.style.height = '25px';
        cursor.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          cursor.remove();
        }, 500);
      }, 10);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="templates" element={<TemplatePage />} />
          <Route path="editor/:templateId" element={<EditorPage />} />
          <Route path="export/:projectId" element={<ExportPage />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}

export default App; 