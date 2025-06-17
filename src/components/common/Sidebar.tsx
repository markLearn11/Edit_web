import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-7a1 1 0 00-.293-.707l-5-5a1 1 0 00-1.414 0l-5 5A1 1 0 003 10v7a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3" />
      </svg>
    ), 
    label: '首页', 
    path: '/' 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ), 
    label: '模板', 
    path: '/templates' 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ), 
    label: '编辑器', 
    path: '/editor/new' 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ), 
    label: '导出', 
    path: '/export' 
  },
];

const Sidebar: React.FC<SidebarProps> = observer(({ isOpen, onToggle }) => {
  return (
    <aside className={`w-64 border-r border-neo-primary/20 bg-neo-darker transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'} flex-shrink-0`}>
      <div className="h-full flex flex-col">
        {/* 收起/展开按钮 - 仅在桌面显示 */}
        <button 
          className="hidden md:flex items-center justify-center h-12 border-b border-neo-primary/20 text-neo-primary hover:bg-neo-primary/10 transition-colors"
          onClick={onToggle}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
        
        {/* 导航菜单 */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2 px-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center py-3 px-4 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-neo-primary/10 text-neo-primary' 
                        : 'text-neo-light hover:bg-neo-primary/5 hover:text-neo-primary'
                    }`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && <span className="ml-3 transition-opacity duration-200">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* 底部区域 */}
        {isOpen && (
          <div className="p-4 border-t border-neo-primary/20">
            <div className="bg-neo-primary/5 rounded-md p-3">
              <h4 className="text-sm font-medium text-neo-primary mb-2">AI助手</h4>
              <p className="text-xs text-neo-light/80">
                通过AI助手快速生成和编辑您的网站内容
              </p>
              <button className="mt-3 w-full neo-btn-outline text-xs py-1.5">
                启动助手
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
});

export default Sidebar; 