export const site = {
  name: '个人网页',
  author: 'Your Name',
  description: '一个用于展示个人信息、项目、经历和文字的静态网站。',
  nav: [
    { label: '首页', href: '/' },
    { label: '个人介绍', href: '/page1/' },
    { label: '工作经历', href: '/experience/' },
    { label: '项目经历', href: '/projects/' },
    { label: '文字', href: '/writings/' },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Vercel', href: 'https://vercel.com/' },
  ],
} as const;
