import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useUIStore } from '@/stores/RootStore';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import NotificationContainer from '@/components/common/NotificationContainer';

const MainLayout: React.FC = observer(() => {
  const uiStore = useUIStore();
  
  return (
    <div className="flex flex-col min-h-screen bg-neo-dark">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {!uiStore.isMobile && (
          <Sidebar 
            isOpen={uiStore.isSidebarOpen} 
            onToggle={() => uiStore.toggleSidebar()} 
          />
        )}
        
        <main className={`flex-1 transition-all duration-300 p-4 md:p-6 overflow-auto`}>
          <div className="neo-container">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* 移动设备侧边栏 */}
      {uiStore.isMobile && uiStore.isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-neo-darker/80 backdrop-blur-sm z-40"
          onClick={() => uiStore.toggleSidebar()}
        >
          <div 
            className="absolute top-0 left-0 h-full w-64 bg-neo-darker border-r border-neo-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar 
              isOpen={true} 
              onToggle={() => uiStore.toggleSidebar()} 
            />
          </div>
        </div>
      )}
      
      {/* 全局加载状态 */}
      {uiStore.isGlobalLoading && (
        <div className="fixed inset-0 bg-neo-darker/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-16 h-16 rounded-full border-4 border-neo-primary/20 border-t-neo-primary animate-spin" />
        </div>
      )}
      
      {/* 通知容器 */}
      <NotificationContainer notifications={uiStore.notifications} onRemove={uiStore.removeNotification} />
    </div>
  );
});

export default MainLayout; 