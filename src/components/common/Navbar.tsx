import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useUIStore } from '@/stores/RootStore';

const Navbar: React.FC = observer(() => {
  const uiStore = useUIStore();
  
  return (
    <header className="border-b border-neo-primary/20 bg-neo-darker">
      <div className="neo-container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            className="md:hidden mr-3 text-neo-primary"
            onClick={() => uiStore.toggleSidebar()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <Link to="/" className="flex items-center">
            <span className="font-display text-2xl font-bold">
              <span className="text-neo-primary">Neo</span>
              <span className="text-neo-light">Genesis</span>
            </span>
          </Link>
        </div>
        
        {/* 导航链接 - 仅在桌面显示 */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-neo-light hover:text-neo-primary transition-colors">首页</Link>
          <Link to="/templates" className="text-neo-light hover:text-neo-primary transition-colors">模板</Link>
          <Link to="#features" className="text-neo-light hover:text-neo-primary transition-colors">功能</Link>
        </nav>
        
        {/* 右侧操作区 */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full text-neo-light hover:text-neo-primary hover:bg-neo-primary/10 transition-colors"
            onClick={() => uiStore.toggleTheme()}
          >
            {uiStore.theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          <button className="neo-btn-primary text-sm py-2">
            创建网站
          </button>
        </div>
      </div>
    </header>
  );
});

export default Navbar; 