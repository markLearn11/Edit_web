import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 模板类型定义
interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail?: string;
}

const HomePage: React.FC = () => {
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
              精选<span className="neo-glow-text">模板</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-neo-light/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              从多种专业设计的模板中选择，快速启动您的项目
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-lg bg-neo-darker/80 border border-neo-primary/20 hover:shadow-neo-glow transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                <div className="p-6">
                  <h3 className="font-display font-medium text-lg mb-2">{template.name}</h3>
                  <p className="text-neo-light/70 text-sm">{template.category}</p>
                </div>
                <div className="absolute inset-0 bg-neo-darker/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link to={`/templates/${template.id}`} className="neo-btn-primary">
                    选择模板
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
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
  { id: '1', name: 'Neo企业官网', category: '商业网站' },
  { id: '2', name: 'Flux作品集', category: '作品集' },
  { id: '3', name: 'Pulse博客', category: '博客' },
];

export default HomePage; 