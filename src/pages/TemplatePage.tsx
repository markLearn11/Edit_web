import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { useTemplateStore, useUIStore } from '@/stores/RootStore';
import { TemplateCategory } from '@/stores/TemplateStore';

const TemplatePage: React.FC = observer(() => {
  const templateStore = useTemplateStore();
  const uiStore = useUIStore();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 加载模板数据
  useEffect(() => {
    const loadTemplates = async () => {
      uiStore.setGlobalLoading(true);
      await templateStore.loadTemplates();
      uiStore.setGlobalLoading(false);
    };
    
    loadTemplates();
  }, [templateStore, uiStore]);
  
  // 过滤后的模板
  const filteredTemplates = templateStore.templates.filter(template => {
    // 按分类过滤
    if (selectedCategory !== 'all' && template.category !== selectedCategory) {
      return false;
    }
    
    // 按搜索词过滤
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // 处理模板选择
  const handleSelectTemplate = (templateId: string) => {
    templateStore.selectTemplate(templateId);
    uiStore.openModal('templatePreview', { templateId });
  };
  
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">
          <span className="neo-glow-text">模板</span>库
        </h1>
        
        {/* 搜索框 */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索模板..."
            className="neo-input pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-neo-primary/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            selectedCategory === 'all'
              ? 'bg-neo-primary text-neo-dark'
              : 'bg-neo-darker text-neo-light hover:bg-neo-primary/10'
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          全部
        </button>
        
        {Object.values(TemplateCategory).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-neo-primary text-neo-dark'
                : 'bg-neo-darker text-neo-light hover:bg-neo-primary/10'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* 模板网格 */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className="group relative overflow-hidden rounded-lg bg-neo-darker border border-neo-primary/20 hover:shadow-neo-glow transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-neo-primary/10">
                <div className="w-full h-full flex items-center justify-center text-neo-primary">
                  {template.thumbnail ? (
                    <img 
                      src={template.thumbnail} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-display font-medium text-lg">{template.name}</h3>
                <p className="text-neo-light/70 text-sm">{template.category}</p>
                <p className="text-neo-light/60 text-xs mt-2 line-clamp-2">{template.description}</p>
              </div>
              
              <div className="absolute inset-0 bg-neo-darker/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  className="neo-btn-primary"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  使用此模板
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neo-primary/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-display font-medium mb-2">未找到匹配的模板</h3>
          <p className="text-neo-light/70">请尝试其他搜索条件或查看所有模板</p>
          <button 
            className="neo-btn-outline mt-4"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
          >
            查看所有模板
          </button>
        </div>
      )}
      
      {/* 模板预览模态框 将在其他组件中实现 */}
    </div>
  );
});

export default TemplatePage; 