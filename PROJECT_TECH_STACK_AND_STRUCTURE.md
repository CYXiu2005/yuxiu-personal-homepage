# 个人网站项目技术栈与总体结构

## 1. 项目定位

本项目是一个以个人信息、项目经历、学习与实习经历、个人文字及外部链接为核心内容的个人网站。

第一阶段以静态内容展示为主，不引入用户登录、数据库、管理后台或复杂服务端逻辑。项目应优先保证：

- 结构清晰；
- 内容易于维护；
- 组件可复用；
- 页面加载速度快；
- 便于持续扩展；
- 适合通过 Git 和 GitHub 进行版本管理；
- 适合由 Codex 辅助开发和维护。

本文件仅定义技术栈、工程结构和基础开发约束，不包含具体页面设计、交互细节、视觉风格或文案内容。

---

## 2. 核心技术栈

### 2.1 前端框架

使用 **Astro** 作为项目的核心前端框架。

Astro 主要负责：

- 项目构建；
- 路由管理；
- 页面组织；
- 组件复用；
- 静态内容生成；
- Markdown 和 MDX 内容读取；
- 按需加载交互组件。

项目默认采用静态站点生成模式，优先生成可直接部署的静态资源。

### 2.2 开发语言

使用 **TypeScript** 作为主要开发语言。

TypeScript 用于：

- Astro 组件逻辑；
- 配置文件；
- 数据结构定义；
- 内容类型校验；
- 工具函数；
- 后续可能增加的交互逻辑。

项目中应尽量避免无类型约束的复杂 JavaScript 代码。

### 2.3 样式系统

使用 **Tailwind CSS 4** 作为主要样式工具。

同时保留全局 CSS 文件，用于：

- CSS Variables；
- 全局基础样式；
- 排版规则；
- 通用动画；
- Tailwind 不适合处理的特殊样式。

当前阶段只确定样式技术方案，不预设具体颜色、字体、布局风格或视觉规范。

### 2.4 内容管理

使用 **Markdown / MDX** 管理可持续更新的内容。

优先用于管理：

- 项目介绍；
- 个人文字；
- 经历条目；
- 其他需要独立维护的结构化内容。

使用 Astro Content Collections 对内容进行统一管理和类型校验。

内容文件与页面组件应保持分离，避免将大量长期维护的正文直接硬编码在组件中。

### 2.5 交互方案

默认优先使用：

1. Astro 组件；
2. 原生 HTML；
3. 原生 JavaScript 或 TypeScript。

仅当某个局部功能确实需要复杂状态管理或高交互能力时，再引入 **React**。

React 不作为第一阶段全站基础框架，也不应在没有实际需求时提前安装。

### 2.6 版本管理与代码托管

使用：

- **Git**：本地版本管理；
- **GitHub**：远程代码托管。

建议采用以下基本分支方式：

- `main`：稳定、可部署版本；
- 功能分支：用于独立开发较大的新功能。

每完成一个相对独立的功能模块，应建立清晰的 Git 提交记录。

### 2.7 部署方式

使用 **Vercel** 作为默认部署平台。

部署流程：

```text
本地开发
→ Git 提交
→ 推送至 GitHub
→ Vercel 自动构建
→ 发布线上版本
```

默认由 Vercel 连接 GitHub 仓库，并监听 `main` 分支。

第一阶段不需要单独购买或维护云服务器。

---

## 3. 总体架构

项目采用内容驱动的静态网站架构。

```text
Markdown / MDX / 配置数据
            ↓
Astro Content Collections
            ↓
Astro 页面与组件
            ↓
Tailwind CSS + 全局 CSS
            ↓
Astro 静态构建
            ↓
Vercel 部署
```

主要原则：

- 内容与展示逻辑分离；
- 页面与公共组件分离；
- 可复用结构抽象为组件；
- 可持续维护的内容存放在内容目录中；
- 静态资源与源代码分离；
- 构建配置集中管理；
- 不提前引入不必要的后端能力。

---

## 4. 建议项目目录

```text
personal-website/
├── public/
│   ├── favicon/
│   ├── files/
│   └── static/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── content/
│   │   └── layout/
│   │
│   ├── content/
│   │   ├── projects/
│   │   ├── writings/
│   │   └── experience/
│   │
│   ├── data/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │
│   ├── scripts/
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   └── content.config.ts
│
├── .gitignore
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 5. 目录职责说明

### `public/`

存放不需要经过构建工具处理、需要以原始文件形式发布的静态资源。

适合存放：

- 网站图标；
- 可下载文件；
- 固定公开资源；
- 不需要压缩或转换的文件。

不要将所有图片无差别放入该目录。

### `src/assets/`

存放需要由 Astro 或构建工具处理的资源。

主要包括：

- 页面图片；
- 项目封面；
- 图标资源；
- 可被组件导入的媒体文件。

### `src/components/`

存放可复用组件。

建议按职责划分：

- `common/`：通用基础组件；
- `content/`：用于展示结构化内容的组件；
- `layout/`：导航、页脚、页面框架等布局组件。

组件应尽量保持职责单一，避免单个组件同时承担数据读取、复杂逻辑和大量展示代码。

### `src/content/`

存放由 Astro Content Collections 管理的内容文件。

建议包括：

- `projects/`：项目内容；
- `writings/`：个人文字；
- `experience/`：经历内容。

每类内容都应定义统一的数据字段和校验规则。

### `src/data/`

存放体量较小、结构稳定、无需使用 Markdown 编写的数据。

适合存放：

- 外部链接；
- 联系方式配置；
- 技能标签；
- 网站基础信息；
- 其他简单 JSON 或 TypeScript 数据。

### `src/layouts/`

存放页面级布局组件。

布局组件负责：

- 页面公共 HTML 结构；
- 元信息入口；
- 公共导航和页脚组合；
- 内容容器；
- 全局资源引入。

布局组件不应直接包含大量具体页面内容。

### `src/pages/`

存放 Astro 路由文件。

Astro 根据该目录自动生成访问路径。

当前文件只规定使用文件路由机制，不规定具体页面数量、页面名称或页面内部结构。

### `src/scripts/`

存放相对独立的客户端脚本。

只有无法合理写入组件且具有复用价值的脚本才放入此目录。

### `src/styles/`

存放全局样式和基础样式文件。

第一阶段至少保留：

```text
src/styles/global.css
```

该文件用于引入 Tailwind CSS、定义 CSS Variables 及全局基础规则。

### `src/types/`

存放项目内部共享的 TypeScript 类型和接口。

当类型只被单个文件使用时，可直接定义在对应文件中；只有跨模块复用的类型才放入该目录。

### `src/utils/`

存放无界面、可复用的工具函数。

例如：

- 日期格式化；
- 内容排序；
- 字符串处理；
- 数据转换；
- 链接校验。

工具函数应避免依赖具体页面。

### `src/content.config.ts`

定义 Astro Content Collections 的内容集合、字段结构和校验规则。

该文件是内容管理结构的核心配置之一。

---

## 6. 内容数据原则

所有可持续维护的内容应尽量采用结构化方式保存。

每类内容应具备统一字段，例如：

```yaml
---
title:
description:
date:
order:
tags:
featured:
draft:
---
```

具体字段将在后续讨论内容结构时确定。

当前开发中应遵守：

- 不在多个组件中重复硬编码相同信息；
- 不将大量项目正文直接写入页面文件；
- 不将展示顺序完全依赖文件名；
- 为内容定义明确的数据类型；
- 为可选字段提供合理默认值；
- 为草稿内容预留 `draft` 状态；
- 为首页精选内容预留 `featured` 状态。

---

## 7. 组件开发原则

### 7.1 Astro 优先

默认使用 `.astro` 组件。

只有存在明确的复杂客户端交互需求时，才考虑 React 或其他前端框架组件。

### 7.2 组件职责单一

每个组件应只负责一个清晰功能。

不建议：

- 在一个组件中放置整站全部内容；
- 在页面组件中重复实现相同结构；
- 将数据读取逻辑复制到多个页面；
- 为极少量内容过度拆分组件。

### 7.3 Props 类型明确

组件 Props 应使用 TypeScript 定义。

示例：

```ts
interface Props {
  title: string;
  description?: string;
}
```

### 7.4 内容与组件分离

组件负责展示，内容文件或数据文件负责提供信息。

避免将长期维护的项目介绍、文章正文或经历描述直接写死在组件模板中。

---

## 8. 路由与构建原则

项目使用 Astro 文件路由。

需要支持的内容类型可通过动态路由生成详情页面，但具体路由命名和页面关系将在后续页面结构讨论中确定。

构建目标：

```bash
npm run build
```

构建结果应为可部署的静态网站。

开发环境：

```bash
npm run dev
```

本地预览生产构建：

```bash
npm run preview
```

项目应保证上述命令可以正常运行。

---

## 9. 推荐初始化方式

```bash
npm create astro@latest personal-website
cd personal-website
npm install
npx astro add tailwind
npm run dev
```

初始化时建议：

- 选择 TypeScript；
- 开启严格类型检查；
- 初始化 Git 仓库；
- 暂不添加 React；
- 暂不添加数据库；
- 暂不添加服务端适配器。

只有在后续功能明确需要时，再增加新的集成。

---

## 10. 环境与依赖管理

使用 Node.js 的长期支持版本。

包管理器默认使用 **npm**。

项目依赖必须记录在：

```text
package.json
package-lock.json
```

不应提交：

```text
node_modules/
dist/
.env
```

如后续增加环境变量，应：

- 提供 `.env.example`；
- 不将真实密钥提交到 Git；
- 在 Vercel 中配置生产环境变量。

第一阶段原则上不需要敏感环境变量。

---

## 11. 代码质量要求

建议在项目中保留以下检查能力：

```bash
npm run dev
npm run build
npm run preview
npm run astro check
```

开发时应满足：

- TypeScript 无明显类型错误；
- 构建过程无报错；
- 不保留未使用的大型依赖；
- 不在代码中硬编码本地绝对路径；
- 不提交调试文件和临时文件；
- 避免无必要的客户端 JavaScript；
- 避免复制粘贴形成重复组件；
- 文件命名保持统一；
- 导入路径清晰。

如后续项目规模扩大，可再加入：

- ESLint；
- Prettier；
- Husky；
- lint-staged；
- 自动化测试。

第一阶段不要求一次性加入全部工程化工具。

---

## 12. Git 管理建议

首次初始化后建立基线提交：

```bash
git add .
git commit -m "chore: initialize Astro personal website"
```

后续提交信息建议使用清晰前缀：

```text
feat: 新增功能
fix: 修复问题
refactor: 重构代码
style: 调整样式
content: 更新内容
docs: 更新文档
chore: 工程配置调整
```

每次提交应尽量对应一个明确、可描述的改动。

---

## 13. 部署约定

默认部署平台为 Vercel。

推荐流程：

1. 本地创建 Astro 项目；
2. 使用 Git 管理代码；
3. 推送到 GitHub；
4. 在 Vercel 导入 GitHub 仓库；
5. 使用默认 Astro 构建配置；
6. 将 `main` 分支作为生产分支；
7. 每次推送后自动构建和发布。

默认构建命令：

```bash
npm run build
```

默认输出目录：

```text
dist
```

后续可再绑定自定义域名。

---

## 14. 第一阶段不包含的技术

除非后续需求发生变化，第一阶段不引入：

- Spring Boot；
- Django；
- FastAPI；
- Express 服务端；
- MySQL；
- PostgreSQL；
- MongoDB；
- 用户注册和登录；
- 管理后台；
- 支付系统；
- 微服务；
- Docker；
- Kubernetes；
- 独立云服务器；
- 服务端渲染；
- 大型状态管理库；
- 全站 React 架构；
- 重型 CMS。

如未来需要在线编辑内容，可单独评估 Headless CMS，而不是在第一阶段自行开发后台。

---

## 15. 后续可扩展方向

当前架构应为以下能力保留扩展空间，但不在第一阶段实现：

- 中英文双语；
- 深色模式；
- 内容分类与标签；
- 项目筛选；
- 文章搜索；
- RSS；
- SEO 元信息；
- Open Graph 分享图；
- 网站访问统计；
- 联系表单；
- Headless CMS；
- 局部 React 交互组件；
- 自动化内容发布；
- 自定义域名。

所有扩展应以实际需求为依据，不提前过度开发。

---

## 16. Codex 开发约束

Codex 在修改本项目时应遵守以下规则：

1. 在编码前先阅读本文件、`README.md`、`package.json` 和现有目录结构。
2. 不自行改变已确定的核心技术栈。
3. 不在未提出需求时引入后端、数据库或大型框架。
4. 不擅自确定具体页面风格、颜色、字体、动效或文案。
5. 不在未确认的情况下重构整个项目。
6. 新增依赖前说明其用途，并优先使用现有能力解决。
7. 优先使用 Astro 组件，复杂交互明确需要时再使用 React。
8. 可维护内容优先放入 `src/content/` 或 `src/data/`。
9. 公共结构必须抽取为可复用组件。
10. 所有修改应通过 TypeScript 检查和生产构建。
11. 不硬编码本地路径、部署域名或个人隐私信息。
12. 页面细节、视觉风格和交互方案需等待后续需求文档。

---

## 17. 当前技术方案总结

```text
框架：Astro
语言：TypeScript
样式：Tailwind CSS 4 + Global CSS
内容：Markdown / MDX
内容管理：Astro Content Collections
交互：Astro + 原生 TypeScript，必要时局部 React
版本管理：Git
代码托管：GitHub
部署平台：Vercel
构建模式：静态站点生成
包管理器：npm
```

该技术方案是当前项目的基础约束。后续页面设计、内容组织、视觉风格、交互方式和具体功能将在独立讨论后补充。
