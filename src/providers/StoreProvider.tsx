import React, { createContext, useContext } from 'react';
import { RootStore, RootStoreContext } from '@/stores/RootStore';

interface StoreProviderProps {
  children: React.ReactNode;
}

/**
 * 全局存储提供者组件
 * 用于将RootStore提供给整个应用
 */
const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  // 创建一个根存储实例
  const rootStore = React.useMemo(() => new RootStore(), []);
  
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default StoreProvider; 