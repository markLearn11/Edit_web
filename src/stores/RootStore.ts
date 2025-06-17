import { createContext, useContext } from 'react';
import { TemplateStore } from './TemplateStore';
import { ProjectStore } from './ProjectStore';
import { UIStore } from './UIStore';

/**
 * 根Store类，包含所有子Store
 */
export class RootStore {
  templateStore: TemplateStore;
  projectStore: ProjectStore;
  uiStore: UIStore;

  constructor() {
    this.templateStore = new TemplateStore(this);
    this.projectStore = new ProjectStore(this);
    this.uiStore = new UIStore(this);
  }
}

// 创建一个Context
export const RootStoreContext = createContext<RootStore | null>(null);

// 创建一个Hook来使用Store
export function useRootStore(): RootStore {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('useRootStore必须在RootStoreProvider内部使用');
  }
  return context;
}

// 导出子Store的快捷访问Hook
export function useTemplateStore() {
  return useRootStore().templateStore;
}

export function useProjectStore() {
  return useRootStore().projectStore;
}

export function useUIStore() {
  return useRootStore().uiStore;
} 