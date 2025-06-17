import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { useProjectStore, useUIStore } from '@/stores/RootStore';

const ExportPage: React.FC = observer(() => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const projectStore = useProjectStore();
  const uiStore = useUIStore();
  
  const [exportFormat, setExportFormat] = useState<'html' | 'zip'>('html');
  const [exportResult, setExportResult] = useState<{ url: string, format: string } | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  
  // 确保我们有一个当前项目
  useEffect(() => {
    if (projectId && projectId !== projectStore.currentProjectId) {
      // 如果当前项目不是我们要导出的项目，则需要设置
      // 在实际应用中，这里会从存储或API加载项目
      uiStore.addNotification({
        type: 'info',
        message: '正在准备导出...',
        duration: 3000
      });
    }
  }, [projectId, projectStore, uiStore]);
  
  // 处理导出
  const handleExport = async () => {
    if (!projectStore.currentProject) {
      uiStore.addNotification({
        type: 'error',
        message: '没有可导出的项目',
        duration: 5000
      });
      return;
    }
    
    setIsExporting(true);
    
    try {
      const result = await projectStore.exportProject(exportFormat);
      if (result) {
        setExportResult(result);
        uiStore.addNotification({
          type: 'success',
          message: '项目导出成功！',
          duration: 5000
        });
      } else {
        throw new Error('导出失败');
      }
    } catch (error) {
      uiStore.addNotification({
        type: 'error',
        message: '导出项目时出错，请重试',
        duration: 5000
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  // 返回编辑器
  const handleBackToEditor = () => {
    if (projectStore.currentProjectId) {
      navigate(`/editor/${projectStore.currentProjectId}`);
    } else {
      navigate('/templates');
    }
  };
  
  return (
    <div className="py-8 max-w-3xl mx-auto">
      <motion.h1 
        className="text-3xl font-display font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="neo-glow-text">导出</span>您的网站
      </motion.h1>
      
      <motion.div
        className="neo-card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-xl font-display mb-4">导出选项</h2>
        
        <div className="space-y-6">
          {/* 导出格式选择 */}
          <div>
            <h3 className="text-sm font-medium mb-3">选择导出格式</h3>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="exportFormat" 
                  className="text-neo-primary" 
                  checked={exportFormat === 'html'}
                  onChange={() => setExportFormat('html')}
                />
                <span>HTML文件</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="exportFormat" 
                  className="text-neo-primary" 
                  checked={exportFormat === 'zip'}
                  onChange={() => setExportFormat('zip')}
                />
                <span>ZIP压缩包</span>
              </label>
            </div>
            <p className="text-neo-light/70 text-xs mt-2">
              {exportFormat === 'html' 
                ? 'HTML文件适合快速部署到网页托管服务' 
                : 'ZIP压缩包包含完整项目文件，适合进一步定制'}
            </p>
          </div>
          
          {/* 导出按钮 */}
          <div className="flex justify-end">
            <button
              className="neo-btn-primary"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-neo-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在导出...
                </span>
              ) : '导出网站'}
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* 导出结果 */}
      {exportResult && (
        <motion.div
          className="neo-card bg-neo-success/5 border-neo-success/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start">
            <div className="bg-neo-success/10 p-2 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neo-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-display font-medium mb-2">导出成功！</h3>
              <p className="text-neo-light/80 mb-4">您的网站已成功导出为 {exportResult.format.toUpperCase()} 格式</p>
              
              <div className="flex space-x-3">
                <a 
                  href={exportResult.url} 
                  download={`website.${exportResult.format}`}
                  className="neo-btn-primary py-2 px-4 text-sm"
                >
                  下载文件
                </a>
                
                <button
                  onClick={handleBackToEditor}
                  className="neo-btn-outline py-2 px-4 text-sm"
                >
                  返回编辑器
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* 预览 */}
      <motion.div
        className="neo-card mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-display mb-4">网站预览</h2>
        
        <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg overflow-hidden border border-neo-primary/20">
          {/* 这里可以使用iframe来预览导出的网站 */}
          <div className="flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">网站预览</p>
              <p className="text-sm opacity-70">导出后可在浏览器中查看完整网站</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* 底部操作 */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBackToEditor}
          className="neo-btn-outline"
        >
          返回编辑器
        </button>
        
        <button
          className="neo-btn-primary"
          onClick={() => navigate('/templates')}
        >
          创建新网站
        </button>
      </div>
    </div>
  );
});

export default ExportPage; 