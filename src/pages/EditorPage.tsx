import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { useTemplateStore, useProjectStore, useUIStore } from '@/stores/RootStore';

// 将模板渲染函数提取到组件外部
const renderTemplatePreview = (templateCategory: string) => {
  // 根据不同的模板类别返回不同的预览内容
  switch(templateCategory) {
    case '企业官网':
      return (
        <>
          <header className="bg-blue-600 text-white py-16 px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">专业解决方案提供商</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">我们为企业提供创新的解决方案，助力业务增长</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium">了解我们的服务</button>
          </header>
          
          <div className="py-16 px-8">
            <h2 className="text-3xl font-bold text-center mb-12">我们的核心优势</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {title: "专业团队", icon: "👥", desc: "经验丰富的专业人才组成"},
                {title: "优质服务", icon: "⭐", desc: "客户满意度达98%以上"},
                {title: "创新方案", icon: "💡", desc: "定制化解决方案满足需求"}
              ].map((item, i) => (
                <div key={i} className="text-center p-6 border rounded-lg">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="py-16 px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">我们的服务</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "战略咨询", desc: "帮助企业制定长期发展战略，明确市场定位和业务方向。" },
                  { title: "品牌塑造", desc: "为企业打造专业品牌形象，提升品牌价值和市场认知度。" },
                  { title: "数字营销", desc: "利用数字化渠道进行精准营销，提高客户转化率和投资回报。" },
                  { title: "技术赋能", desc: "引入前沿技术，推动企业数字化转型，提升运营效率。" }
                ].map((service, i) => (
                  <div key={i} className="flex bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="py-16 px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">成功案例</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { client: "科技创新公司", result: "帮助客户提升销售额35%，市场份额增加15%。" },
                  { client: "制造业领导者", result: "通过数字化转型，运营效率提升40%，成本降低25%。" },
                  { client: "金融服务机构", result: "客户满意度提升至95%，新客户增长率达到30%。" }
                ].map((case_study, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">{case_study.client}</h3>
                    <p className="text-gray-700">{case_study.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-700 text-white py-16 px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">准备好开始了吗？</h2>
              <p className="text-xl mb-8">与我们的专家团队联系，为您的业务提供量身定制的解决方案</p>
              <button className="bg-white text-blue-700 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
                联系我们
              </button>
            </div>
          </div>

          <footer className="bg-gray-800 text-white py-12 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">公司名称</h3>
                <p className="text-gray-300 mb-4">提供专业的商业解决方案，助力企业发展与创新。</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">服务</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>战略咨询</li>
                  <li>品牌管理</li>
                  <li>数字营销</li>
                  <li>市场分析</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">资源</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>博客文章</li>
                  <li>行业报告</li>
                  <li>案例研究</li>
                  <li>常见问题</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">联系我们</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>info@company.com</li>
                  <li>+86 123 4567 8910</li>
                  <li>上海市浦东新区XX路XX号</li>
                </ul>
              </div>
            </div>
            <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; 2023 公司名称. 保留所有权利.</p>
            </div>
          </footer>
        </>
      );
    
    case '电子商务':
      return (
        <>
          <header className="bg-indigo-600 text-white py-8 px-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Fashion Store</h1>
              <div className="hidden md:flex space-x-6">
                <button className="hover:underline">男装</button>
                <button className="hover:underline">女装</button>
                <button className="hover:underline">儿童</button>
                <button className="hover:underline">配饰</button>
              </div>
              <div className="flex space-x-4">
                <button className="p-1">🔍</button>
                <button className="p-1">👤</button>
                <button className="p-1 relative">
                  🛒
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
                </button>
              </div>
            </div>
          </header>

          <div className="bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                <div className="relative h-80 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
                    <div className="text-white px-8">
                      <p className="text-sm uppercase tracking-wide mb-1">新品系列</p>
                      <h2 className="text-4xl font-bold mb-4">2023秋冬系列</h2>
                      <p className="text-lg mb-6">优雅与舒适并存，探索我们的全新系列</p>
                      <button className="bg-white text-indigo-600 px-6 py-2 rounded-md font-medium">
                        立即购买
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ...省略更多代码以避免超出大小 */}
          
        </>
      );
    
    case '餐饮美食':
    case '旅游酒店':
    default:
      return (
        <>
          <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16 px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">您的未来网站</h1>
            <p className="text-xl max-w-2xl mx-auto">这里将是您通过NeoGenesis创建的精美网站，拖放组件并自定义内容和样式。</p>
          </header>
          
          <div className="py-12 px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">内容区域</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">内容区块 {item}</h3>
                  <p className="text-gray-600">这是一段关于内容的描述文本，您可以根据需要修改。</p>
                </div>
              ))}
            </div>
          </div>
        </>
      );
  }
};

const EditorPage: React.FC = observer(() => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const templateStore = useTemplateStore();
  const projectStore = useProjectStore();
  const uiStore = useUIStore();
  
  const [activeSection, setActiveSection] = useState<string>('content');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  
  // 当前项目
  const currentProject = projectStore.currentProject;
  
  // 声明所有会用到的状态，确保每次渲染时钩子顺序一致
  const [editingElement, setEditingElement] = useState<HTMLElement | null>(null);
  
  // 加载模板并创建项目
  useEffect(() => {
    const init = async () => {
      // 设置加载状态
      uiStore.setGlobalLoading(true);
      
      try {
        // 如果是新项目
        if (templateId === 'new') {
          // 导航到模板选择页面
          navigate('/templates');
          return;
        }
        
        // 如果是从模板创建项目
        if (templateId && templateId !== 'new') {
          console.log('从模板创建项目:', templateId);
          
          // 创建一个默认项目，确保页面能够显示
          // 实际逻辑中应该先检查templateStore.templates是否有内容，如果没有，先加载模板
          if (templateStore.templates.length === 0) {
            await templateStore.loadTemplates();
          }
          
          // 选择模板
          templateStore.selectTemplate(templateId);
          
          // 如果有选中的模板但没有当前项目，创建一个新项目
          if (templateStore.selectedTemplate) {
            const template = templateStore.selectedTemplate;
            
            // 检查是否已经有此模板的项目
            if (!projectStore.currentProject || projectStore.currentProject.templateId !== template.id) {
              projectStore.createProjectFromTemplate(
                template, 
                `基于${template.name}的项目`, 
                '由NeoGenesis自动创建'
              );
            }
            
            // 显示成功通知
            uiStore.addNotification({
              type: 'success',
              message: '项目创建成功！开始编辑您的网站吧！',
              duration: 5000
            });
          } else {
            // 如果没有找到模板，显示错误
            uiStore.addNotification({
              type: 'error',
              message: '未找到指定模板，请重新选择',
              duration: 5000
            });
            navigate('/templates');
          }
        }
      } catch (error) {
        console.error('初始化编辑器时出错:', error);
        uiStore.addNotification({
          type: 'error',
          message: '加载项目时出错，请重试',
          duration: 5000
        });
        navigate('/templates');
      } finally {
        // 关闭加载状态
        uiStore.setGlobalLoading(false);
      }
    };
    
    init();
  }, [templateId, templateStore, projectStore, uiStore, navigate]);
  
  // 保存项目
  const handleSave = async () => {
    uiStore.setGlobalLoading(true);
    
    try {
      const success = await projectStore.saveProject();
      
      if (success) {
        uiStore.addNotification({
          type: 'success',
          message: '项目保存成功！',
          duration: 3000
        });
      } else {
        throw new Error('保存失败');
      }
    } catch (error) {
      uiStore.addNotification({
        type: 'error',
        message: '保存项目时出错，请重试',
        duration: 5000
      });
    } finally {
      uiStore.setGlobalLoading(false);
    }
  };
  
  // 导出项目
  const handleExport = () => {
    if (currentProject) {
      navigate(`/export/${currentProject.id}`);
    }
  };
  
  // 切换预览模式
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };
  
  // 获取模板类别
  const getTemplateCategory = () => {
    if (templateStore.selectedTemplate) {
      return templateStore.selectedTemplate.category;
    }
    return '未知类别';
  };
  
  // 将模板渲染函数定义为纯组件
  const renderTemplateContent = useCallback((category: string) => {
    // 根据不同的模板类别返回不同的预览内容
    switch(category) {
      case '企业官网':
        return (
          <>
            <header className="bg-blue-600 text-white py-16 px-8 text-center">
              <h1 className="text-4xl font-bold mb-4">专业解决方案提供商</h1>
              <p className="text-xl max-w-2xl mx-auto mb-8">我们为企业提供创新的解决方案，助力业务增长</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium">了解我们的服务</button>
            </header>
            
            <div className="py-16 px-8">
              <h2 className="text-3xl font-bold text-center mb-12">我们的核心优势</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {title: "专业团队", icon: "👥", desc: "经验丰富的专业人才组成"},
                  {title: "优质服务", icon: "⭐", desc: "客户满意度达98%以上"},
                  {title: "创新方案", icon: "💡", desc: "定制化解决方案满足需求"}
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 border rounded-lg">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      
      case '电子商务':
        return (
          <>
            <header className="bg-indigo-600 text-white py-8 px-4">
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Fashion Store</h1>
                <div className="hidden md:flex space-x-6">
                  <button className="hover:underline">男装</button>
                  <button className="hover:underline">女装</button>
                  <button className="hover:underline">儿童</button>
                  <button className="hover:underline">配饰</button>
                </div>
                <div className="flex space-x-4">
                  <button className="p-1">🔍</button>
                  <button className="p-1">👤</button>
                  <button className="p-1 relative">
                    🛒
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
                  </button>
                </div>
              </div>
            </header>
          </>
        );
      
      case '餐饮美食':
        return (
          <>
            <header className="bg-cover bg-center h-96 flex items-center justify-center" style={{backgroundColor: '#2D1A05', backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')", backgroundBlendMode: "overlay"}}>
              <div className="text-center text-white">
                <p className="text-sm uppercase tracking-widest mb-2">用心烹饪 · 精致体验</p>
                <h1 className="text-5xl font-serif mb-4">Gourmet Restaurant</h1>
                <p className="text-xl mb-8">精致料理 · 优雅环境 · 难忘体验</p>
                <button className="border-2 border-white px-8 py-2 hover:bg-white hover:text-amber-800 transition duration-300">
                  立即预订
                </button>
              </div>
            </header>
          </>
        );
      
      case '旅游酒店':
        return (
          <>
            <header className="bg-cover bg-center h-screen flex items-center justify-center" style={{backgroundColor: '#05668D', backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80')", backgroundBlendMode: "soft-light"}}>
              <div className="text-center text-white p-8">
                <h1 className="text-6xl font-bold mb-6">探索世界的美妙</h1>
                <p className="text-2xl mb-10 max-w-2xl mx-auto">让我们带您前往梦想的目的地，体验非凡的旅行</p>
                <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label className="block text-gray-800 text-sm font-medium mb-2">目的地</label>
                      <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option>任意目的地</option>
                        <option>巴厘岛</option>
                        <option>马尔代夫</option>
                        <option>普吉岛</option>
                        <option>三亚</option>
                        <option>北海道</option>
                      </select>
                    </div>
                    {/* 其他表单字段... */}
                  </div>
                  <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                    立即搜索
                  </button>
                </div>
              </div>
            </header>
          </>
        );
      
      default:
        return (
          <>
            <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16 px-8 text-center">
              <h1 className="text-4xl font-bold mb-4">您的未来网站</h1>
              <p className="text-xl max-w-2xl mx-auto">这里将是您通过NeoGenesis创建的精美网站，拖放组件并自定义内容和样式。</p>
            </header>
            
            <div className="py-12 px-8">
              <h2 className="text-2xl font-bold mb-6 text-center">内容区域</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">内容区块 {item}</h3>
                    <p className="text-gray-600">这是一段关于内容的描述文本，您可以根据需要修改。</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  }, []);

  // 获取模板预览内容
  const getTemplatePreview = () => {
    if (!templateStore.selectedTemplate) {
      return (
        <div className="p-8 text-center text-gray-500">
          <p>无预览内容</p>
        </div>
      );
    }
    
    const templateCategory = templateStore.selectedTemplate.category;
    return renderTemplateContent(templateCategory);
  };
  
  // 使内容可编辑 - 修改为多个useEffect钩子，确保每个钩子都能在每次渲染时被调用
  // 第一个useEffect用于设置事件监听器
  useEffect(() => {
    // 添加点击事件监听
    const handleContentClick = (e: MouseEvent) => {
      if (!isPreviewMode) return;
      
      const target = e.target as HTMLElement;
      
      // 检查是否是可编辑内容
      if (target.tagName === 'H1' || target.tagName === 'H2' || 
          target.tagName === 'H3' || target.tagName === 'P' ||
          target.tagName === 'BUTTON') {
        
        // 防止已有输入框的重复创建
        if (document.querySelector('.editable-input')) return;
        
        const originalText = target.textContent || '';
        target.innerHTML = '';
        setEditingElement(target);
        
        // 创建输入框
        const input = document.createElement('input');
        input.value = originalText;
        input.className = 'editable-input w-full bg-transparent border-b border-neo-primary outline-none';
        target.appendChild(input);
        input.focus();
        
        // 处理输入框失去焦点事件
        input.addEventListener('blur', () => {
          const newText = input.value.trim() || originalText;
          target.textContent = newText;
          setEditingElement(null);
        });
        
        // 处理回车键
        input.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            const newText = input.value.trim() || originalText;
            target.textContent = newText;
            setEditingElement(null);
          }
        });
        
        e.stopPropagation();
      }
    };
    
    document.addEventListener('click', handleContentClick);
    
    return () => {
      document.removeEventListener('click', handleContentClick);
    };
  }, [isPreviewMode]);
  
  // 单独的useEffect钩子处理editingElement的变化
  useEffect(() => {
    // 当编辑元素发生变化时可以执行一些操作
    if (editingElement) {
      console.log('正在编辑元素:', editingElement.tagName);
    }
  }, [editingElement]);
  
  // 如果没有当前项目，显示加载状态
  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-neo-primary/20 border-t-neo-primary animate-spin" />
          <p className="text-neo-light/70">正在加载项目...</p>
        </div>
      </div>
    );
  }
  
  // 编辑器操作 - 编辑标题
  const handleEditText = (element: HTMLElement, value: string) => {
    if (!isPreviewMode) return;
    
    // 仅用于演示，实际应用中需要更新状态
    element.textContent = value;
  };
  
  // 在编辑模式下显示编辑控件
  const renderEditableContent = () => {
    // 如果是预览模式但不是编辑状态，添加可编辑标识
    if (isPreviewMode && !activeSection) {
      return (
        <div className="fixed bottom-4 right-4 bg-neo-darker text-white p-4 rounded-lg shadow-lg">
          <p className="mb-2">点击内容可以直接编辑</p>
          <button 
            className="neo-btn-primary w-full"
            onClick={() => setActiveSection('content')}
          >
            切换到编辑面板
          </button>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* 编辑器顶部工具栏 */}
      <div className="border-b border-neo-primary/20 bg-neo-darker py-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-display font-bold">{currentProject.name}</h1>
          <span className="text-xs bg-neo-primary/20 text-neo-primary px-2 py-1 rounded-full">
            {getTemplateCategory()}
          </span>
          <div className="flex items-center bg-neo-darker rounded-md overflow-hidden border border-neo-primary/30">
            <button
              className={`px-3 py-1.5 text-sm ${
                activeSection === 'content'
                  ? 'bg-neo-primary text-neo-dark'
                  : 'text-neo-light hover:bg-neo-primary/10'
              }`}
              onClick={() => setActiveSection('content')}
            >
              内容
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                activeSection === 'style'
                  ? 'bg-neo-primary text-neo-dark'
                  : 'text-neo-light hover:bg-neo-primary/10'
              }`}
              onClick={() => setActiveSection('style')}
            >
              样式
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                activeSection === 'settings'
                  ? 'bg-neo-primary text-neo-dark'
                  : 'text-neo-light hover:bg-neo-primary/10'
              }`}
              onClick={() => setActiveSection('settings')}
            >
              设置
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            className={`px-3 py-1.5 text-sm rounded-md ${
              isPreviewMode
                ? 'bg-neo-primary text-neo-dark'
                : 'border border-neo-primary/30 text-neo-light hover:bg-neo-primary/10'
            }`}
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? '退出预览' : '预览'}
          </button>
          <button
            className="neo-btn-outline py-1.5 text-sm"
            onClick={handleSave}
          >
            保存
          </button>
          <button
            className="neo-btn-primary py-1.5 text-sm"
            onClick={handleExport}
          >
            导出
          </button>
        </div>
      </div>
      
      {/* 编辑器主体区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边编辑面板 - 仅在非预览模式下显示 */}
        {!isPreviewMode && (
          <div className="w-80 border-r border-neo-primary/20 bg-neo-darker overflow-y-auto">
            {activeSection === 'content' && (
              <div className="p-4">
                <h2 className="text-lg font-display font-bold mb-4">内容编辑</h2>
                <div className="space-y-4">
                  {/* 这里将是组件列表，用户可以拖放到编辑区域 */}
                  <p className="text-neo-light/70 text-sm">拖动组件到编辑区域来构建您的网站</p>
                  
                  {/* 示例组件项 */}
                  {['标题', '段落', '图片', '按钮', '表单', '分割线', '图标', '卡片'].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="p-3 border border-neo-primary/20 rounded-md bg-neo-darker hover:bg-neo-primary/5 cursor-grab"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-md bg-neo-primary/10 flex items-center justify-center text-neo-primary mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {activeSection === 'style' && (
              <div className="p-4">
                <h2 className="text-lg font-display font-bold mb-4">样式设置</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">主题色</label>
                    <div className="flex space-x-2">
                      {['#0BEFF7', '#6E56F5', '#FF2975', '#00F1A9', '#FFB740'].map((color, index) => (
                        <button 
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-neo-dark"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">字体</label>
                    <select className="neo-input w-full">
                      <option>Orbitron</option>
                      <option>Space Grotesk</option>
                      <option>JetBrains Mono</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">背景样式</label>
                    <div className="flex space-x-2">
                      <button className="w-12 h-12 bg-neo-darker border border-neo-primary/30 rounded-md"></button>
                      <button className="w-12 h-12 bg-neo-grid bg-neo-grid-size border border-neo-primary/30 rounded-md"></button>
                      <button className="w-12 h-12 bg-neo-gradient opacity-30 border border-neo-primary/30 rounded-md"></button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'settings' && (
              <div className="p-4">
                <h2 className="text-lg font-display font-bold mb-4">项目设置</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">项目名称</label>
                    <input type="text" className="neo-input w-full" value={currentProject.name} />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">描述</label>
                    <textarea className="neo-input w-full h-20" value={currentProject.description}></textarea>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">SEO设置</label>
                    <div className="space-y-2">
                      <input type="text" className="neo-input w-full" placeholder="页面标题" />
                      <input type="text" className="neo-input w-full" placeholder="页面描述" />
                      <input type="text" className="neo-input w-full" placeholder="关键词（用逗号分隔）" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* 编辑/预览区域 */}
        <div className={`flex-1 overflow-auto ${isPreviewMode ? 'bg-white' : 'bg-neo-grid bg-neo-grid-size bg-opacity-30'}`}>
          {/* 此处将是网站内容的编辑/预览区域 */}
          <div className={`mx-auto ${isPreviewMode ? 'w-full' : 'max-w-4xl'} ${isPreviewMode ? '' : 'p-6'}`}>
            {/* 编辑模式中显示的提示信息 */}
            {!isPreviewMode && (
              <div className="border-2 border-dashed border-neo-primary/30 rounded-lg p-8 text-center mb-8">
                <h3 className="text-xl font-display font-bold mb-2">开始构建您的网站</h3>
                <p className="text-neo-light/70 mb-4">从左侧拖动组件到此区域，或点击下方按钮添加预设区块</p>
                <button className="neo-btn-outline">添加区块</button>
              </div>
            )}
            
            {/* 预览模式下的网站内容 */}
            {isPreviewMode && (
              <div className="bg-white text-gray-800 w-full min-h-screen">
                {/* 根据模板类型显示不同的预览内容 */}
                {getTemplatePreview()}
                
                {/* 编辑提示控件 */}
                {renderEditableContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditorPage; 