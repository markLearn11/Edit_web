import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTemplateStore, useUIStore } from '@/stores/RootStore';
import { TemplateCategory } from '@/stores/TemplateStore';

const TemplatePage: React.FC = observer(() => {
  const navigate = useNavigate();
  const templateStore = useTemplateStore();
  const uiStore = useUIStore();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  
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
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !template.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // 推荐的模板分类
  const recommendedCategories = [
    TemplateCategory.BUSINESS,
    TemplateCategory.ECOMMERCE,
    TemplateCategory.PORTFOLIO,
    TemplateCategory.BLOG,
    TemplateCategory.LANDING,
    TemplateCategory.RESTAURANT,
    TemplateCategory.TECH
  ];
  
  // 处理模板选择
  const handleSelectTemplate = (templateId: string) => {
    templateStore.selectTemplate(templateId);
    // 使用React Router导航
    navigate(`/editor/${templateId}`);
  };
  
  // 处理模板点击预览
  const handlePreviewTemplate = (templateId: string) => {
    setActiveTemplate(templateId === activeTemplate ? null : templateId);
  };
  
  // 当前活跃的模板详情
  const activeTemplateDetails = activeTemplate
    ? templateStore.templates.find(t => t.id === activeTemplate) 
    : null;
  
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-4 md:mb-0">
          <span className="neo-glow-text">模板</span>库
        </h1>
        
        {/* 搜索框 */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="搜索模板..."
            className="neo-input pr-10 w-full"
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
      <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
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
        
        {recommendedCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-neo-primary text-neo-dark'
                : 'bg-neo-darker text-neo-light hover:bg-neo-primary/10'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        
        <button
          className="px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap bg-neo-darker text-neo-light hover:bg-neo-primary/10"
          onClick={() => {
            // 弹出更多分类选项
            const otherCategories = Object.values(TemplateCategory).filter(
              category => !recommendedCategories.includes(category)
            );
            if (otherCategories.length > 0) {
              // 这里可以实现弹出选择器，简化版先选第一个
              setSelectedCategory(otherCategories[0]);
            }
          }}
        >
          更多分类...
        </button>
      </div>
      
      {/* 模板网格 */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className={`group relative overflow-hidden rounded-lg bg-neo-darker/80 border transition-all duration-300 cursor-pointer ${
                activeTemplate === template.id
                  ? 'border-neo-primary shadow-neo-glow scale-[1.02]'
                  : 'border-neo-primary/20 hover:shadow-neo-glow hover:scale-[1.01]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handlePreviewTemplate(template.id)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-neo-primary/5 overflow-hidden">
                <motion.div 
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/600x400/050914/0BEFF7?text=NeoGenesis';
                    }}
                  />
                </motion.div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display font-medium text-lg">{template.name}</h3>
                  <span className="text-xs bg-neo-primary/20 text-neo-primary px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-neo-light/60 text-sm line-clamp-2">{template.description}</p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neo-darker to-transparent h-16 pointer-events-none"></div>
              
              {activeTemplate === template.id && (
                <motion.div 
                  className="absolute right-4 bottom-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <button 
                    className="neo-btn-primary px-4 py-1.5 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate(template.id);
                    }}
                  >
                    使用此模板
                  </button>
                </motion.div>
              )}
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
      
      {/* 模板预览详情 */}
      {activeTemplateDetails && (
        <div className="fixed inset-0 bg-neo-darker/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-neo-darker max-w-4xl w-full rounded-xl overflow-hidden border border-neo-primary/30 shadow-neo-glow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative">
              <img 
                src={activeTemplateDetails.thumbnail} 
                alt={activeTemplateDetails.name}
                className="w-full h-60 sm:h-80 object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-neo-darker/50 hover:bg-neo-darker/80 rounded-full p-2 transition-colors"
                onClick={() => setActiveTemplate(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neo-darker to-transparent h-24"></div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-display font-bold">{activeTemplateDetails.name}</h2>
                <span className="bg-neo-primary/20 text-neo-primary px-3 py-1 rounded-full text-sm">
                  {activeTemplateDetails.category}
                </span>
              </div>
              
              <p className="text-neo-light/80 mb-6">{activeTemplateDetails.description}</p>
              
              <div className="flex justify-between items-center">
                <button 
                  className="neo-btn-outline"
                  onClick={() => setActiveTemplate(null)}
                >
                  返回
                </button>
                <button 
                  className="neo-btn-primary"
                  onClick={() => handleSelectTemplate(activeTemplateDetails.id)}
                >
                  使用此模板
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
});

export default TemplatePage; 