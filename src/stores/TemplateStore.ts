import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import type { RootStore } from './RootStore';

// 模板分类
export enum TemplateCategory {
  BUSINESS = '企业官网',
  PORTFOLIO = '作品集',
  BLOG = '博客',
  ECOMMERCE = '电子商务',
  LANDING = '落地页',
  PERSONAL = '个人网站',
  EDUCATION = '教育培训',
  REALESTATE = '房地产',
  TRAVEL = '旅游酒店',
  HEALTH = '医疗健康',
  RESTAURANT = '餐饮美食',
  TECH = '科技产品',
  AGENCY = '创意机构',
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
        id: '1',
        name: 'Modern企业官网',
        description: '现代风格的企业官网模板，适合各类公司使用',
        category: TemplateCategory.BUSINESS,
        thumbnail: 'https://images.unsplash.com/photo-1487017159836-4e23a8290b1a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Creative作品集',
        description: '创意设计师作品集展示模板，突显个性与专业',
        category: TemplateCategory.PORTFOLIO,
        thumbnail: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Minimalist博客',
        description: '简约风格博客模板，聚焦内容与阅读体验',
        category: TemplateCategory.BLOG,
        thumbnail: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '4',
        name: 'Fashion电商',
        description: '时尚服饰电商网站模板，提供流畅的购物体验',
        category: TemplateCategory.ECOMMERCE,
        thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '5',
        name: 'SaaS产品落地页',
        description: '软件产品落地页模板，高效转化访客',
        category: TemplateCategory.LANDING,
        thumbnail: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '6',
        name: '个人简历展示',
        description: '个人职业简历网站，展示专业经验与技能',
        category: TemplateCategory.PERSONAL,
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '7',
        name: '在线课程平台',
        description: '教育培训网站模板，适合在线课程与知识付费',
        category: TemplateCategory.EDUCATION,
        thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '8',
        name: '房产中介服务',
        description: '房地产代理网站，展示房源与服务项目',
        category: TemplateCategory.REALESTATE,
        thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '9',
        name: '旅行度假指南',
        description: '旅游景点与酒店预订网站，分享旅行体验',
        category: TemplateCategory.TRAVEL,
        thumbnail: 'https://images.unsplash.com/photo-1476900543704-4312b78632f8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '10',
        name: '健康与瑜伽',
        description: '健康生活方式网站，适合瑜伽与健身机构',
        category: TemplateCategory.HEALTH,
        thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '11',
        name: '高级餐厅',
        description: '精致餐厅网站，展示菜品与预订服务',
        category: TemplateCategory.RESTAURANT,
        thumbnail: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1385&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '12',
        name: '科技应用推广',
        description: '移动应用与软件产品展示网站',
        category: TemplateCategory.TECH,
        thumbnail: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '13',
        name: '创意设计工作室',
        description: '创意机构网站，展示项目案例与服务能力',
        category: TemplateCategory.AGENCY,
        thumbnail: 'https://images.unsplash.com/photo-1560155016-bd4879ae8f21?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '14',
        name: '极简摄影师',
        description: '摄影作品集网站，简约设计突出视觉内容',
        category: TemplateCategory.PORTFOLIO,
        thumbnail: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '15',
        name: '数字营销服务',
        description: '数字营销与SEO服务公司网站模板',
        category: TemplateCategory.BUSINESS,
        thumbnail: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '16',
        name: '咖啡馆展示',
        description: '小型咖啡馆网站，展示特色饮品与环境',
        category: TemplateCategory.RESTAURANT,
        thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '17',
        name: 'NFT艺术作品',
        description: 'NFT艺术品展示与交易平台网站',
        category: TemplateCategory.TECH,
        thumbnail: 'https://images.unsplash.com/photo-1647642476417-c571d4cfcfa6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
      {
        id: '18',
        name: '产品发布会',
        description: '新产品发布会落地页，倒计时与注册功能',
        category: TemplateCategory.LANDING,
        thumbnail: 'https://images.unsplash.com/photo-1501503069356-3c6b82a17d89?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        components: [],
        createdAt: new Date()
      },
    ];
  }
} 