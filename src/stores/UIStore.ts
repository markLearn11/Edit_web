import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

/**
 * UI状态管理Store
 */
export class UIStore {
  // 全局加载状态
  isGlobalLoading: boolean = false;
  
  // 模态框状态
  activeModal: string | null = null;
  modalData: any = null;
  
  // 侧边栏状态
  isSidebarOpen: boolean = true;
  
  // 通知状态
  notifications: Notification[] = [];
  
  // 主题状态
  theme: 'dark' | 'light' = 'dark';
  
  // 移动设备状态
  isMobile: boolean = false;
  
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    
    // 检测移动设备
    this.checkMobileDevice();
    
    // 监听窗口大小变化
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.checkMobileDevice);
    }
  }

  // 检测移动设备
  checkMobileDevice = () => {
    this.isMobile = window.innerWidth < 768;
  }
  
  // 设置全局加载状态
  setGlobalLoading(loading: boolean) {
    this.isGlobalLoading = loading;
  }
  
  // 打开模态框
  openModal(modalName: string, data: any = null) {
    this.activeModal = modalName;
    this.modalData = data;
  }
  
  // 关闭模态框
  closeModal() {
    this.activeModal = null;
    this.modalData = null;
  }
  
  // 切换侧边栏
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  // 添加通知
  addNotification(notification: Omit<Notification, 'id'>) {
    const id = Date.now().toString();
    this.notifications.push({
      id,
      ...notification,
    });
    
    // 自动移除通知
    setTimeout(() => {
      this.removeNotification(id);
    }, notification.duration || 3000);
    
    return id;
  }
  
  // 移除通知
  removeNotification(id: string) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
  
  // 切换主题
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    
    // 更新HTML元素以反映主题变化
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    }
  }
  
  // 清除所有状态
  reset() {
    this.isGlobalLoading = false;
    this.activeModal = null;
    this.modalData = null;
    this.notifications = [];
  }
}

// 通知接口
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
} 