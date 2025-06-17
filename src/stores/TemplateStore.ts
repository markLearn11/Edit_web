import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import type { RootStore } from './RootStore';

// 模板分类
export enum TemplateCategory {
  BUSINESS = '商业网站',
  PORTFOLIO = '作品集',
  BLOG = '博客',
  ECOMMERCE = '电子商务',
  LANDING = '落地页',
  PERSONAL = '个人网站',
}

// 模板接口
export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  thumbnail: string;
  components: TemplateComponent[];
  createdAt: Date;
}

// 模板组件接口
export interface TemplateComponent {
  id: string;
  type: 'header' | 'footer' | 'hero' | 'features' | 'pricing' | 'testimonials' | 'contact' | 'gallery' | 'text' | 'custom';
  content: any;
  options?: any;
}

/**
 * 模板管理Store
 */
export class TemplateStore {
  templates: Template[] = [];
  selectedTemplateId: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    
    // 在实际应用中，这里会从API加载模板，这里仅做示例
    this.loadDemoTemplates();
  }

  // 获取所有模板
  get allTemplates() {
    return this.templates;
  }

  // 获取选中的模板
  get selectedTemplate() {
    return this.templates.find(t => t.id === this.selectedTemplateId) || null;
  }

  // 按分类获取模板
  getTemplatesByCategory(category: TemplateCategory) {
    return this.templates.filter(t => t.category === category);
  }

  // 选择模板
  selectTemplate(templateId: string) {
    this.selectedTemplateId = templateId;
  }

  // 清除选择
  clearSelection() {
    this.selectedTemplateId = null;
  }

  // 加载模板（模拟）
  async loadTemplates() {
    this.isLoading = true;
    this.error = null;
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.loadDemoTemplates();
    } catch (error) {
      this.error = '加载模板失败';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  // 加载演示模板
  private loadDemoTemplates() {
    this.templates = [
      {
        id: uuidv4(),
        name: 'Neo企业官网',
        description: '现代科技感的企业官网模板',
        category: TemplateCategory.BUSINESS,
        thumbnail: '/templates/business-1.jpg',
        components: [],
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Flux作品集',
        description: '创意设计师作品集展示模板',
        category: TemplateCategory.PORTFOLIO,
        thumbnail: '/templates/portfolio-1.jpg',
        components: [],
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Pulse博客',
        description: '干净简洁的博客模板',
        category: TemplateCategory.BLOG,
        thumbnail: '/templates/blog-1.jpg',
        components: [],
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Quantum商城',
        description: '未来感电子商务模板',
        category: TemplateCategory.ECOMMERCE,
        thumbnail: '/templates/ecommerce-1.jpg',
        components: [],
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Genesis落地页',
        description: '高转化率产品落地页模板',
        category: TemplateCategory.LANDING,
        thumbnail: '/templates/landing-1.jpg',
        components: [],
        createdAt: new Date()
      },
    ];
  }
} 