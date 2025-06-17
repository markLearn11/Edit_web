/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    'bg-neo-dark',
    'bg-neo-darker',
    'text-neo-light',
    'text-neo-primary',
    'border-neo-primary',
  ],
  theme: {
    extend: {
      colors: {
        // AI科幻色彩主题
        'neo-primary': '#0BEFF7',    // 明亮的青色（主色调）
        'neo-secondary': '#6E56F5',  // 紫罗兰色（次要色调）
        'neo-accent': '#FF2975',     // 霓虹粉（强调色）
        'neo-dark': '#090E21',       // 深蓝黑色（背景色）
        'neo-darker': '#050914',     // 更深的背景色
        'neo-light': '#E2F3F5',      // 浅色（文本色）
        'neo-success': '#00F1A9',    // 成功状态色
        'neo-warning': '#FFB740',    // 警告状态色
        'neo-error': '#FF3860',      // 错误状态色
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'Roboto', 'sans-serif'],
        'display': ['Orbitron', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neo-glow': '0 0 15px rgba(11, 239, 247, 0.5)',
        'neo-glow-strong': '0 0 25px rgba(11, 239, 247, 0.8)',
        'neo-accent-glow': '0 0 15px rgba(255, 41, 117, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'neo-gradient': 'linear-gradient(135deg, #0BEFF7 0%, #6E56F5 50%, #FF2975 100%)',
        'neo-grid': 'radial-gradient(#1a2e4c 1px, transparent 1px)',
      },
      backgroundSize: {
        'neo-grid-size': '20px 20px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
} 