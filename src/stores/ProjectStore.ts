import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import type { RootStore } from './RootStore';
import type { Template, TemplateComponent } from './TemplateStore';

// 项目接口
export interface Project {
  id: string;
  name: string;
  description: string;
  templateId: string;
  components: ProjectComponent[];
  createdAt: Date;
  updatedAt: Date;
}

// 项目组件接口
export interface ProjectComponent extends TemplateComponent {
  edited: boolean;
}

/**
 * 项目管理Store
 */
export class ProjectStore {
  projects: Project[] = [];
  currentProjectId: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  // 获取当前项目
  get currentProject() {
    return this.projects.find(p => p.id === this.currentProjectId) || null;
  }

  // 从模板创建新项目
  createProjectFromTemplate(template: Template, name: string, description: string = '') {
    const projectId = uuidv4();
    const now = new Date();
    
    // 将模板组件转换为项目组件
    const projectComponents: ProjectComponent[] = template.components.map(component => ({
      ...component,
      edited: false
    }));
    
    const newProject: Project = {
      id: projectId,
      name,
      description,
      templateId: template.id,
      components: projectComponents,
      createdAt: now,
      updatedAt: now
    };
    
    this.projects.push(newProject);
    this.currentProjectId = projectId;
    
    return projectId;
  }

  // 更新组件内容
  updateComponentContent(componentId: string, newContent: any) {
    if (!this.currentProject) return;
    
    const component = this.currentProject.components.find(c => c.id === componentId);
    if (component) {
      component.content = newContent;
      component.edited = true;
      this.currentProject.updatedAt = new Date();
    }
  }

  // 添加新组件
  addComponent(componentType: string, content: any = {}, options: any = {}) {
    if (!this.currentProject) return;
    
    const newComponent: ProjectComponent = {
      id: uuidv4(),
      type: componentType as any,
      content,
      options,
      edited: true
    };
    
    this.currentProject.components.push(newComponent);
    this.currentProject.updatedAt = new Date();
    
    return newComponent.id;
  }

  // 删除组件
  deleteComponent(componentId: string) {
    if (!this.currentProject) return;
    
    const index = this.currentProject.components.findIndex(c => c.id === componentId);
    if (index !== -1) {
      this.currentProject.components.splice(index, 1);
      this.currentProject.updatedAt = new Date();
    }
  }

  // 保存项目（模拟）
  async saveProject() {
    if (!this.currentProject) return;
    
    this.isLoading = true;
    this.error = null;
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      this.currentProject.updatedAt = new Date();
      // 在实际应用中，这里会调用API保存项目
      console.log('项目已保存:', this.currentProject);
      return true;
    } catch (error) {
      this.error = '保存项目失败';
      console.error(error);
      return false;
    } finally {
      this.isLoading = false;
    }
  }
  
  // 导出项目（模拟）
  async exportProject(format: 'html' | 'zip' = 'html') {
    if (!this.currentProject) return null;
    
    this.isLoading = true;
    this.error = null;
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      // 在实际应用中，这里会调用API导出项目
      console.log(`项目已导出为${format}格式:`, this.currentProject);
      
      // 返回模拟的导出URL
      return {
        url: `https://api.example.com/exports/${this.currentProject.id}.${format}`,
        format
      };
    } catch (error) {
      this.error = '导出项目失败';
      console.error(error);
      return null;
    } finally {
      this.isLoading = false;
    }
  }
} 