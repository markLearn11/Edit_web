import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { useTemplateStore, useProjectStore, useUIStore } from '@/stores/RootStore';

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
          // 选择模板
          templateStore.selectTemplate(templateId);
          
          // 如果有选中的模板但没有当前项目，创建一个新项目
          if (templateStore.selectedTemplate && !projectStore.currentProject) {
            const template = templateStore.selectedTemplate;
            projectStore.createProjectFromTemplate(
              template, 
              `基于${template.name}的项目`, 
              '由NeoGenesis自动创建'
            );
            
            // 显示成功通知
            uiStore.addNotification({
              type: 'success',
              message: '项目创建成功！开始编辑您的网站吧！',
              duration: 5000
            });
          }
        }
      } catch (error) {
        console.error('初始化编辑器时出错:', error);
        uiStore.addNotification({
          type: 'error',
          message: '加载项目时出错，请重试',
          duration: 5000
        });
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
  
  return (
    <div className="flex flex-col h-full">
      {/* 编辑器顶部工具栏 */}
      <div className="border-b border-neo-primary/20 bg-neo-darker py-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-display font-bold">{currentProject.name}</h1>
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
          <div className={`mx-auto ${isPreviewMode ? 'max-w-6xl' : 'max-w-4xl'} p-6`}>
            {/* 编辑模式中显示的提示信息 */}
            {!isPreviewMode && (
              <div className="border-2 border-dashed border-neo-primary/30 rounded-lg p-8 text-center mb-8">
                <h3 className="text-xl font-display font-bold mb-2">开始构建您的网站</h3>
                <p className="text-neo-light/70 mb-4">从左侧拖动组件到此区域，或点击下方按钮添加预设区块</p>
                <button className="neo-btn-outline">
                  添加区块
                </button>
              </div>
            )}
            
            {/* 预览模式下的网站内容 */}
            {isPreviewMode && (
              <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* 示例网站内容 */}
                <header className="bg-blue-600 text-white py-16 px-8 text-center">
                  <h1 className="text-4xl font-bold mb-4">您的未来网站</h1>
                  <p className="text-xl max-w-2xl mx-auto">这里将是您通过NeoGenesis创建的精美网站，拖放组件并自定义内容和样式。</p>
                </header>
                
                <div className="py-12 px-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">我们的服务</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="border rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">服务项目 {item}</h3>
                        <p className="text-gray-600">这是一段关于服务内容的描述文本，您可以根据需要修改。</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditorPage; 