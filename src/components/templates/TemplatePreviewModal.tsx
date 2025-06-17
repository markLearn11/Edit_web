import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTemplateStore, useProjectStore, useUIStore } from '@/stores/RootStore';
import Modal from '@/components/common/Modal';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: string;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = observer(({ 
  isOpen, 
  onClose, 
  templateId 
}) => {
  const navigate = useNavigate();
  const templateStore = useTemplateStore();
  const projectStore = useProjectStore();
  const uiStore = useUIStore();
  
  const [projectName, setProjectName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // 获取模板数据
  const template = templateStore.templates.find(t => t.id === templateId);
  
  // 如果没有找到模板，关闭模态框
  if (!template) {
    onClose();
    return null;
  }
  
  // 如果第一次打开模态框，设置默认项目名称
  if (isOpen && !projectName) {
    setProjectName(`基于${template.name}的项目`);
  }
  
  // 处理创建项目
  const handleCreateProject = async () => {
    if (!template) return;
    
    setIsCreating(true);
    
    try {
      // 创建新项目
      const projectId = projectStore.createProjectFromTemplate(
        template,
        projectName || `基于${template.name}的项目`
      );
      
      // 添加成功通知
      uiStore.addNotification({
        type: 'success',
        message: '项目创建成功！',
        duration: 3000
      });
      
      // 关闭模态框
      onClose();
      
      // 导航到编辑器页面
      navigate(`/editor/${template.id}`);
    } catch (error) {
      console.error('创建项目失败:', error);
      uiStore.addNotification({
        type: 'error',
        message: '创建项目失败，请重试',
        duration: 5000
      });
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="模板预览"
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 模板预览 */}
        <div>
          <div className="aspect-w-16 aspect-h-9 bg-neo-primary/10 rounded-lg overflow-hidden mb-4">
            {template.thumbnail ? (
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neo-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="bg-neo-primary/10 text-neo-primary text-xs px-2 py-0.5 rounded mr-2">
                {template.category}
              </span>
              <span className="text-neo-light/50 text-xs">
                {new Date(template.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-display font-bold">{template.name}</h3>
            <p className="text-neo-light/70 text-sm">{template.description}</p>
          </div>
        </div>
        
        {/* 创建项目表单 */}
        <div>
          <h3 className="text-lg font-display font-medium mb-4">创建项目</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium block">项目名称</label>
              <input 
                type="text" 
                className="neo-input w-full" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="输入项目名称"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">模板特性</label>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neo-success mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>响应式设计，适配各种设备</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neo-success mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>优化的加载性能</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neo-success mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>现代化视觉效果</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neo-success mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>完全可自定义的内容和样式</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              className="neo-btn-outline"
              onClick={onClose}
            >
              取消
            </button>
            <button
              className="neo-btn-primary"
              onClick={handleCreateProject}
              disabled={isCreating}
            >
              {isCreating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-neo-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  创建中...
                </span>
              ) : '使用此模板'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default TemplatePreviewModal; 