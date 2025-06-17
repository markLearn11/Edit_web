import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// 模板类型定义
interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  tags: string[];
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // 添加模板点击处理函数
  const handleTemplateClick = (templateId: string) => {
    console.log(`选择了模板: ${templateId}`);
    // 使用React Router导航而不是修改window.location
    navigate(`/editor/${templateId}`);
  };

  return (
    <div className="py-8">
      {/* 英雄区域 */}
      <section className="relative overflow-hidden mb-16">
        {/* 背景效果 */}
        <div className="absolute inset-0 bg-neo-grid bg-neo-grid-size opacity-30"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-neo-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-neo-secondary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        
        <div className="relative z-10 text-center py-24">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="neo-gradient-text">AI驱动</span>的
            <br className="md:hidden" />
            <span className="neo-glow-text ml-2">网站生成平台</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-neo-light/80 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            使用NeoGenesis，轻松创建专业级网站。
            <br className="hidden md:block" />
            选择模板，编辑内容，一键导出 — 无需编码经验。
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/templates" className="neo-btn-primary px-10 py-4 text-lg">
              开始创建
            </Link>
            <a href="#features" className="neo-btn-outline px-10 py-4 text-lg">
              了解功能
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* 特性展示 */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-neo-grid bg-neo-grid-size opacity-20"></div>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="neo-glow-text">超越想象</span>的网站创建体验
            </motion.h2>
            <motion.p 
              className="text-xl text-neo-light/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              我们融合了最新的AI技术和直观的用户界面，让网站创建变得前所未有的简单
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="neo-card hover:shadow-neo-glow transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6 text-neo-primary">{feature.icon}</div>
                <h3 className="text-xl font-display font-bold mb-4">{feature.title}</h3>
                <p className="text-neo-light/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 模板展示 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-neo-grid bg-neo-grid-size opacity-20"></div>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              精选<span className="neo-glow-text">网站</span>模板
            </motion.h2>
            <motion.p 
              className="text-xl text-neo-light/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              专业设计的网站模板，涵盖各行各业需求，快速建立您的在线形象
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-lg bg-neo-darker/80 border border-neo-primary/20 hover:shadow-neo-glow transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleTemplateClick(template.id)}
              >
                <div className="aspect-w-16 aspect-h-9 bg-neo-primary/5">
                  <div className="w-full h-full overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <motion.img 
                        src={template.thumbnail} 
                        alt={template.name} 
                        className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400/050914/0BEFF7?text=NeoGenesis';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display font-medium text-lg">{template.name}</h3>
                    <span className="text-xs bg-neo-primary/20 text-neo-primary px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-neo-light/70 text-sm mb-3 line-clamp-2">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-2 py-1 text-xs bg-neo-primary/10 text-neo-primary/90 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-neo-darker/90 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-6">
                  <h3 className="font-display font-medium text-lg mb-4 text-center text-neo-primary">{template.name}</h3>
                  <p className="text-neo-light/80 text-sm mb-6 text-center">{template.description}</p>
                  <Link 
                    to={`/editor/${template.id}`} 
                    className="neo-btn-primary px-6 py-2"
                    onClick={(e) => {
                      e.stopPropagation(); // 防止触发父元素点击事件
                    }}
                  >
                    选择模板
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/templates" className="neo-btn-outline px-8 py-3 text-lg">
              查看所有模板
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA区域 */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-neo-gradient opacity-10"></div>
        <div className="absolute inset-0 bg-neo-grid bg-neo-grid-size opacity-30"></div>
        
        <div className="relative z-10 text-center py-16">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            准备好<span className="neo-glow-text">创建</span>您的网站了吗？
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-neo-light/80 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            立即体验AI驱动的网站创建，让您的创意无缝转化为现实
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/templates" className="neo-btn-primary px-10 py-4 text-lg">
              开始免费创建
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// 特性数据
const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: '多种模板选择',
    description: '提供丰富的专业模板，涵盖各行各业需求，让您快速找到适合的起点'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: '直观编辑体验',
    description: '拖放式编辑器让您无需编码知识，即可自由定制网站的每个细节'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI驱动内容',
    description: '人工智能助手帮助您生成文案、优化内容，提供设计建议，激发创意灵感'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: '媒体资源管理',
    description: '轻松上传、编辑和管理图片及其他媒体文件，打造视觉震撼的网站效果'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '优化的性能',
    description: '生成的网站代码优化，确保快速加载速度和流畅用户体验，提高访客转化率'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    title: '一键导出',
    description: '完成设计后，一键导出为标准网站文件，支持多种托管方式，快速上线'
  },
];

// 示例模板数据
const templates: Template[] = [
  { 
    id: '1', 
    name: 'Modern企业官网', 
    category: '企业官网',
    thumbnail: 'https://images.unsplash.com/photo-1487017159836-4e23a8290b1a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '现代风格的企业官网模板，适合各类公司使用',
    tags: ['企业', '商务', '响应式']
  },
  { 
    id: '8', 
    name: '房产中介服务', 
    category: '房地产',
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '房地产代理网站，展示房源与服务项目',
    tags: ['房产', '中介', '展示']
  },
  { 
    id: '4', 
    name: 'Fashion电商', 
    category: '电子商务',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '时尚服饰电商网站模板，提供流畅的购物体验',
    tags: ['电商', '时尚', '购物']
  },
  { 
    id: '11', 
    name: '高级餐厅', 
    category: '餐饮美食',
    thumbnail: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1385&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '精致餐厅网站，展示菜品与预订服务',
    tags: ['餐饮', '预订', '美食']
  },
  { 
    id: '9', 
    name: '旅行度假指南', 
    category: '旅游酒店',
    thumbnail: 'https://images.unsplash.com/photo-1476900543704-4312b78632f8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '旅游景点与酒店预订网站，分享旅行体验',
    tags: ['旅游', '度假', '预订']
  },
  { 
    id: '12', 
    name: '科技应用推广', 
    category: '科技产品',
    thumbnail: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '移动应用与软件产品展示网站',
    tags: ['APP', '科技', '推广']
  }
];

export default HomePage; 