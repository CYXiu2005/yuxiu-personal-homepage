# STYLE.md — 宋代文人生活小品视觉与动效规范

> 本文件是个人网站的全局视觉与动效约束，供 Codex、设计工具和后续开发统一阅读。  
> 本文件只定义全站风格系统、材质、色彩、排版、动效、交互反馈和组件外观，不规定各页面的具体内容、信息顺序或页面文案。  
> 若后续页面需求与本文件冲突，应先确认需求，再修改本文件；不要由开发工具自行改变整体风格。

---

## 1. 核心定位

### 1.1 风格名称

**宋代文人生活小品 / Song Literati Vignette**

### 1.2 核心气质

整个网站应呈现以下感觉：

- 清雅，但不是空洞的极简；
- 复古，但不是仿古网页模板；
- 灵动，但不是高频炫技动画；
- 文人感，但不是博物馆说明牌；
- 有生活气息，但不堆砌古代器物；
- 有空气和流动感，页面始终像有轻风、雾气、纸张呼吸；
- 安静中有生命力，细节需要在靠近、停留和滚动时逐渐显现；
- 视觉语言应服务于个人表达、项目、经历和文字，而不能压过内容本身。

### 1.3 核心叙事

网站不是“古风主题站”，而是一组当代个人经历被重新组织成宋代文人生活小品的数字空间。

可借用的意象包括：

- 窗、帘、案、书、茶、花、砚、灯、桥、舟、山、水、云、竹、石；
- 阅读、书写、远望、行旅、会友、听雨、焚香、整理书卷；
- 宣纸留白、淡墨线条、浅绛设色、旧纸纤维、朱印点睛；
- 风掠帘角、雾过山脚、墨色晕开、枝叶轻摆。

禁止把所有元素同时放进一个画面。每个视觉场景应只保留 **1 个主要生活动作 + 2–4 个辅助意象**。

---

## 2. 参考材料的使用边界

### 2.1 两张参考图用于学习

参考图传达的主要规则：

- 大面积暖白纸张留白；
- 人物占画面比例较小；
- 人物不依赖五官细节表达；
- 轮廓以克制、略带手感的墨线完成；
- 设色非常有限，以淡青、浅绿、灰蓝、米白为主；
- 小型朱印作为视觉收束点；
- 书、茶、花等物件稀疏出现；
- 构图不追求完全居中，而追求自然的偏置和平衡；
- 画面像一张尚未被填满的册页，而不是完整插画海报。

不得直接临摹、复制或描摹参考图中的具体人物、器物位置、印章或构图。

### 2.2 视频用于学习动效

上传视频仅作为以下内容的动态参考：

- 雾层的速度；
- 雾层的透明度变化；
- 前后景遮挡关系；
- 雾气在画面中的滞留感；
- 底部向纸白自然消散的方式；
- 动画连续但不急促的总体节奏。

不得直接把视频中的现代桥梁、文字或城市画面作为网站视觉元素。

### 2.3 按键 Prompt 用于学习交互边框

用户提供的 `SpecularButton` 组件是按钮边框交互的实现基础。

保留：

- 光线沿边框移动；
- 光线根据鼠标位置改变方向；
- 鼠标接近时逐渐显现；
- 高光在边框外侧轻微溢出；
- 按下时有轻微缩放；
- 键盘聚焦状态清晰可见。

必须修改默认的深色玻璃视觉，使其适配暖纸、墨色和浅金色体系。

---

## 3. 不可违反的视觉原则

### 3.1 留白优先

- 每个主要视觉区域应保留充足空白。
- 插画、纹理、雾气不能平均铺满全屏。
- 同一视口内的强视觉锚点原则上不超过 2 个。
- 内容附近应存在稳定的低噪声区域。
- 背景元素不得穿过长段正文，除非透明度低于 `0.05`。

### 3.2 小景而非大场面

优先：

- 一人读书；
- 一人临窗；
- 一桌一花；
- 一舟一山；
- 一角帘幕；
- 一段桥、一叶舟、一枝花。

避免：

- 宫殿全景；
- 大型历史叙事；
- 密集人物群像；
- 满屏山水；
- 游戏式古风 UI；
- 金碧辉煌、龙纹、祥云边框等泛古风符号。

### 3.3 动而不躁

所有动效必须符合以下条件：

- 不弹跳；
- 不旋转大角度；
- 不突然放大；
- 不使用高频粒子；
- 不使用霓虹光晕；
- 不同时触发多个强动画；
- 动画应有进入、滞留和退去，而不是只有线性位移；
- 大多数动效在用户不注意时也能自然存在。

### 3.4 材质必须克制

纸纹、墨迹、颗粒、折痕只用于建立触感，不能制造“脏旧”。

- 纸纹对比度：`2%–6%`
- 颗粒不透明度：`0.025–0.06`
- 局部墨晕不透明度：`0.04–0.12`
- 不使用明显污渍、烧焦边缘、卷轴边框或仿旧裂纹。

---

## 4. 色彩系统

### 4.1 主色板

```css
:root {
  /* 纸张 */
  --paper-50:  #fffaf0;
  --paper-100: #fbf3e6;
  --paper-200: #f4e8d7;
  --paper-300: #e9dcc8;
  --paper-shadow: #d8c9b4;

  /* 墨色 */
  --ink-950: #292620;
  --ink-900: #332f29;
  --ink-800: #47423a;
  --ink-700: #5f594f;
  --ink-600: #777064;
  --ink-400: #aaa194;
  --ink-200: #d3cabd;

  /* 青绿与雾色 */
  --celadon-700: #66786a;
  --celadon-600: #768b79;
  --celadon-500: #91a393;
  --celadon-300: #b9c6b8;
  --mist-blue: #b8c6c1;
  --mist-white: #f5f2e9;

  /* 浅绛与木色 */
  --tea-700: #80694f;
  --tea-500: #a48969;
  --peach-400: #d3ac9e;
  --peach-300: #e1c2b5;

  /* 朱砂与浅金，仅作点睛 */
  --cinnabar-700: #9f4035;
  --cinnabar-600: #b45243;
  --cinnabar-500: #c56a58;
  --old-gold-600: #aa8b58;
  --old-gold-400: #c4aa78;

  /* 功能色 */
  --focus-ring: rgba(159, 64, 53, 0.62);
  --selection-bg: rgba(145, 163, 147, 0.30);
}
```

### 4.2 使用比例

建议全站视觉占比：

- 暖纸色：`68%–80%`
- 墨色与灰褐：`12%–20%`
- 青绿、灰蓝、木色：`6%–12%`
- 朱砂与浅金：合计不超过 `3%`

### 4.3 颜色禁用

禁止：

- 纯黑 `#000000` 作为大面积正文；
- 纯白 `#ffffff` 作为整页背景；
- 高饱和中国红；
- 荧光色；
- 蓝紫渐变；
- 大面积金色；
- 高对比玻璃拟态；
- 暗黑赛博风背景。

---

## 5. 纸张与背景材质

### 5.1 基础背景

页面底色使用暖白纸张，不使用纯色扁平背景。

```css
html {
  background: var(--paper-100);
}

body {
  color: var(--ink-900);
  background:
    radial-gradient(
      circle at 18% 12%,
      rgba(255, 255, 255, 0.34),
      transparent 34%
    ),
    radial-gradient(
      circle at 82% 70%,
      rgba(216, 201, 180, 0.14),
      transparent 42%
    ),
    var(--paper-100);
}
```

### 5.2 纸纹层

使用独立固定纹理层，不要把纹理重复写进每个组件。

```css
.paper-grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 80;
  opacity: 0.045;
  mix-blend-mode: multiply;
  background-image: url("/textures/xuan-paper-grain.webp");
  background-size: 640px 640px;
}
```

要求：

- 纹理必须无明显接缝；
- 不跟随单个组件滚动；
- 移动端可将透明度降至 `0.025–0.035`；
- 页面截图时不得出现明显噪点块。

### 5.3 墨晕层

可在局部背景使用低透明度墨晕：

```css
.ink-wash {
  background:
    radial-gradient(
      ellipse at center,
      rgba(103, 120, 106, 0.10) 0%,
      rgba(103, 120, 106, 0.045) 42%,
      transparent 72%
    );
  filter: blur(10px);
}
```

墨晕必须是柔和边缘，不得表现为规则圆形色块。

---

## 6. 插画语言

### 6.1 构图

- 人物通常占局部插画面积的 `12%–28%`。
- 空白面积建议保持 `58%–78%`。
- 构图允许偏左、偏右或偏下，不强制居中。
- 同一插画中的物件数量建议为 `3–7`。
- 主体之间应有明显疏密差，不要平均分布。
- 朱印可作为小型终止符，不是品牌 Logo。

### 6.2 线条

- 主轮廓视觉线宽：桌面端约 `1.1–1.6px`；
- 次级线条：`0.7–1.1px`；
- 线条颜色：`rgba(41, 38, 32, 0.76–0.92)`；
- 不要求几何完全平直；
- 允许轻微笔触抖动；
- 不使用漫画粗描边；
- 不使用纯数字矢量图标替代全部手绘元素。

### 6.3 人物

- 人物不绘制清晰五官，或只保留极少笔触；
- 姿态比表情更重要；
- 衣纹应简洁，不能做繁复服饰考据展示；
- 服装以米白、淡青、浅灰绿为主；
- 人物不应成为巨大头像式视觉中心；
- 现代人物经历可通过动作和物件转译，不需要把人物完全古装角色化。

### 6.4 器物

优先使用：

- 书册、纸张、笔、砚；
- 茶盏、细颈花瓶；
- 小桌、坐榻、窗框、帘；
- 一枝花、一丛竹、一块石；
- 舟、桥、远山、月、雨线。

每个场景只选择少量器物。器物不应像古董陈列目录。

### 6.5 设色

- 色块边缘允许有水分感；
- 颜色透明度通常为 `0.18–0.55`；
- 颜色不得完全覆盖墨线；
- 同一幅小品最多使用 3 个主设色；
- 避免完整平涂和 3D 光影。

---

## 7. 排版系统

### 7.1 中文字体

优先使用系统宋体与开源宋体回退：

```css
--font-serif-cn:
  "Songti SC",
  "STSong",
  "Noto Serif CJK SC",
  "Source Han Serif SC",
  "SimSun",
  serif;
```

### 7.2 英文字体

```css
--font-serif-latin:
  "Iowan Old Style",
  "Palatino Linotype",
  "Book Antiqua",
  Georgia,
  serif;
```

### 7.3 辅助无衬线字体

仅用于小型功能标签、日期、状态：

```css
--font-sans:
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  "PingFang SC",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  sans-serif;
```

### 7.4 字号令牌

```css
:root {
  --text-xs: clamp(0.75rem, 0.72rem + 0.10vw, 0.82rem);
  --text-sm: clamp(0.86rem, 0.82rem + 0.14vw, 0.95rem);
  --text-base: clamp(1rem, 0.96rem + 0.18vw, 1.10rem);
  --text-lg: clamp(1.18rem, 1.08rem + 0.34vw, 1.38rem);
  --text-xl: clamp(1.46rem, 1.28rem + 0.62vw, 1.90rem);
  --text-2xl: clamp(1.90rem, 1.55rem + 1.18vw, 2.70rem);
  --text-3xl: clamp(2.55rem, 1.95rem + 2.10vw, 4.20rem);
}
```

### 7.5 行高与字距

- 正文行高：`1.82–2.0`
- 长文正文推荐：`1.9`
- 标题行高：`1.12–1.28`
- 中文正文不额外增加字距，或不超过 `0.02em`
- 英文小标题可使用 `0.04–0.08em`
- 功能标签可使用 `0.08em`
- 禁止大段文字全大写。

### 7.6 文字颜色

- 主要正文：`var(--ink-900)`
- 次级说明：`var(--ink-700)`
- 弱化信息：`var(--ink-600)`
- 禁用信息：`var(--ink-400)`
- 不用浅灰色承担主要正文。

---

## 8. 空间与版式节奏

### 8.1 空间令牌

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.50rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4.5rem;
  --space-9: 6.5rem;
  --space-10: 9rem;
}
```

### 8.2 全局宽度

```css
:root {
  --content-narrow: 42rem;
  --content-reading: 48rem;
  --content-wide: 76rem;
  --page-gutter: clamp(1.25rem, 4vw, 4.5rem);
}
```

### 8.3 留白规则

- 区域之间优先用空白分隔，而不是粗线或深色块；
- 内容容器不得贴边；
- 小品插画与正文之间至少保留 `2rem` 的呼吸距离；
- 大型空白不是待填区域，不要自动补图；
- 不把每一块内容都装进卡片。

### 8.4 边界语言

- 常规细线：`1px solid rgba(71, 66, 58, 0.22)`
- 强调线：`1px solid rgba(71, 66, 58, 0.38)`
- 朱砂短线只用于极少量强调；
- 圆角以 `2px–10px` 为主；
- 不使用大面积 `24px+` 圆角卡片；
- 不使用胶囊标签作为全站主要语言。

---

## 9. 雾气动态系统

## 9.1 从参考视频可确认的信息

参考视频的可读取参数：

- 分辨率：`1152 × 720`
- 时长：`10 秒`
- 帧率：`25 fps`
- 编码：`AV1 / WebM`
- 总体运动：连续、低速、低对比
- 主要动态区域：画面中下部
- 底部处理：逐渐过渡到接近纯纸白
- 雾气没有明显的“突然停住”
- 所谓滞留感主要来自低速度平台、透明度缓慢变化和多层遮挡，而不是硬暂停

由于没有原始动画代码，以下 CSS 时间、位移和透明度是**按成片反推的工程复刻参数**，不得描述为源视频的原始参数。

## 9.2 雾气总体要求

- 雾气是环境层，不是主动画；
- 用户第一眼不应立即意识到“这里有动画”；
- 观看 2–4 秒后才应感受到画面正在流动；
- 位移必须小，形变和透明度变化比位移更重要；
- 雾气在内容下方或远离主要文字区域；
- 雾气不能遮挡可点击元素；
- 每层都必须使用不同周期与负延迟，避免同时回到起点；
- 不允许使用单层左右平移制造明显循环。

## 9.3 推荐层级

### 远雾 `mist-back`

- 作用：连接纸张和远山；
- 不透明度：`0.08–0.15`
- 模糊：`22–34px`
- 缩放：`1.08–1.14`
- 水平位移范围：`1.0–1.8vw`
- 垂直位移范围：`0.2–0.6vh`
- 周期：`30–36s`
- 推荐值：`32s`
- 负延迟：`-8s` 至 `-14s`
- 混合模式：`multiply` 或 `normal`
- 滞留平台：每周期 2 次，每次约占周期 `12%–18%`

### 中雾 `mist-mid`

- 作用：形成主要流动感；
- 不透明度：`0.14–0.24`
- 模糊：`14–24px`
- 缩放：`1.06–1.12`
- 水平位移范围：`2.0–3.2vw`
- 垂直位移范围：`0.5–1.0vh`
- 周期：`22–28s`
- 推荐值：`24s`
- 负延迟：`-4s` 至 `-10s`
- 混合模式：`normal`
- 滞留平台：每周期 2 次，每次 `10%–14%`

### 前雾 `mist-front`

- 作用：制造近景空气和底部消散；
- 不透明度：`0.16–0.30`
- 模糊：`8–16px`
- 缩放：`1.04–1.10`
- 水平位移范围：`3.0–4.5vw`
- 垂直位移范围：`0.7–1.4vh`
- 周期：`17–22s`
- 推荐值：`19s`
- 负延迟：`-7s` 至 `-15s`
- 混合模式：`screen` 或 `normal`
- 滞留平台：每周期 1–2 次，每次 `8%–12%`

## 9.4 “滞留”定义

滞留不等于静止。

在滞留区间：

- 水平位置变化不超过 `0.45vw`；
- 垂直位置变化不超过 `0.25vh`；
- 缩放变化不超过 `0.012`；
- 不透明度变化控制在 `±0.02`；
- 保留极慢形变，使雾仍然“活着”。

禁止：

```css
/* 禁止用完全相同关键帧制造机械停顿 */
40% { transform: translateX(20px); }
55% { transform: translateX(20px); }
```

应使用微小变化：

```css
40% {
  transform: translate3d(1.35vw, -0.36vh, 0) scale(1.085);
  opacity: 0.22;
}

54% {
  transform: translate3d(1.62vw, -0.48vh, 0) scale(1.092);
  opacity: 0.23;
}
```

## 9.5 雾气关键帧

```css
@keyframes mist-drift-back {
  0% {
    transform: translate3d(-1.4vw, 0.15vh, 0) scale(1.08);
    opacity: 0.09;
  }

  18% {
    transform: translate3d(-0.55vw, -0.18vh, 0) scale(1.10);
    opacity: 0.13;
  }

  34% {
    transform: translate3d(0.55vw, -0.42vh, 0) scale(1.115);
    opacity: 0.145;
  }

  49% {
    transform: translate3d(0.86vw, -0.30vh, 0) scale(1.12);
    opacity: 0.14;
  }

  68% {
    transform: translate3d(0.20vw, 0.05vh, 0) scale(1.105);
    opacity: 0.12;
  }

  84% {
    transform: translate3d(-0.72vw, 0.24vh, 0) scale(1.09);
    opacity: 0.10;
  }

  100% {
    transform: translate3d(-1.4vw, 0.15vh, 0) scale(1.08);
    opacity: 0.09;
  }
}

@keyframes mist-drift-mid {
  0% {
    transform: translate3d(-2.5vw, 0.55vh, 0) scale(1.06);
    opacity: 0.14;
  }

  20% {
    transform: translate3d(-0.85vw, -0.15vh, 0) scale(1.085);
    opacity: 0.20;
  }

  37% {
    transform: translate3d(1.20vw, -0.62vh, 0) scale(1.105);
    opacity: 0.235;
  }

  49% {
    transform: translate3d(1.58vw, -0.72vh, 0) scale(1.112);
    opacity: 0.23;
  }

  70% {
    transform: translate3d(0.35vw, -0.10vh, 0) scale(1.09);
    opacity: 0.19;
  }

  86% {
    transform: translate3d(-1.45vw, 0.42vh, 0) scale(1.07);
    opacity: 0.16;
  }

  100% {
    transform: translate3d(-2.5vw, 0.55vh, 0) scale(1.06);
    opacity: 0.14;
  }
}

@keyframes mist-drift-front {
  0% {
    transform: translate3d(3.4vw, 0.80vh, 0) scale(1.05);
    opacity: 0.18;
  }

  17% {
    transform: translate3d(1.20vw, 0.15vh, 0) scale(1.075);
    opacity: 0.25;
  }

  33% {
    transform: translate3d(-0.85vw, -0.38vh, 0) scale(1.095);
    opacity: 0.29;
  }

  45% {
    transform: translate3d(-1.26vw, -0.48vh, 0) scale(1.102);
    opacity: 0.285;
  }

  64% {
    transform: translate3d(-0.20vw, 0.08vh, 0) scale(1.085);
    opacity: 0.24;
  }

  82% {
    transform: translate3d(2.10vw, 0.70vh, 0) scale(1.06);
    opacity: 0.20;
  }

  100% {
    transform: translate3d(3.4vw, 0.80vh, 0) scale(1.05);
    opacity: 0.18;
  }
}
```

## 9.6 雾气容器

```css
.mist-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  isolation: isolate;
}

.mist-layer {
  position: absolute;
  left: -8%;
  right: -8%;
  bottom: -8%;
  height: 58%;
  transform-origin: 50% 72%;
  will-change: transform, opacity;
  backface-visibility: hidden;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.30) 14%,
    #000 40%,
    #000 68%,
    transparent 100%
  );
}

.mist-layer--back {
  background-image: url("/textures/mist-back.webp");
  background-size: 112% 100%;
  filter: blur(28px);
  mix-blend-mode: multiply;
  animation: mist-drift-back 32s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  animation-delay: -11s;
}

.mist-layer--mid {
  background-image: url("/textures/mist-mid.webp");
  background-size: 118% 100%;
  filter: blur(18px);
  animation: mist-drift-mid 24s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  animation-delay: -7s;
}

.mist-layer--front {
  background-image: url("/textures/mist-front.webp");
  background-size: 124% 100%;
  filter: blur(11px);
  mix-blend-mode: screen;
  animation: mist-drift-front 19s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  animation-delay: -13s;
}
```

## 9.7 雾气资产要求

优先方案：

- 使用 3 张透明背景 WebP；
- 每张雾图结构不同；
- 边缘必须柔和；
- 不使用同一张图简单复制三次；
- 单张建议宽度 `1600–2400px`；
- 单张压缩后尽量低于 `220KB`；
- 不在雾图中嵌入具体山、桥、文字或人物。

原型阶段可用多个 `radial-gradient()` 替代，但正式版本应使用独立雾纹资产。

## 9.8 页面进入时的雾气

- 雾气不从 `opacity: 0` 突然出现；
- 页面加载时直接以负延迟进入循环中段；
- 最外层容器可在 `700–1100ms` 内由 `0.55` 渐入到 `1`；
- 不对每层分别执行明显入场；
- 页面切换后保留环境连续感，避免雾气每次从同一位置重启。

## 9.9 移动端雾气

移动端：

- 最多保留 2 层；
- 总体透明度降低约 `15%`；
- 位移幅度降低约 `25%`；
- 模糊值降低约 `15%`；
- 不使用高分辨率视频作为雾气背景；
- 低性能设备允许静态雾纹。

---

## 10. 全局动效语言

### 10.1 动效令牌

```css
:root {
  --duration-instant: 120ms;
  --duration-fast: 180ms;
  --duration-base: 320ms;
  --duration-slow: 620ms;
  --duration-reveal: 900ms;
  --duration-ink: 1200ms;

  --ease-standard: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-soft: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-drift: cubic-bezier(0.37, 0, 0.63, 1);
}
```

### 10.2 内容出现

推荐：

- 位移：`8–16px`
- 透明度：`0 → 1`
- 时长：`620–900ms`
- 延迟：`0–180ms`
- 列表 stagger：`60–90ms`
- 同屏 stagger 总时长不得超过 `420ms`

禁止：

- 从屏幕外飞入；
- 旋转进入；
- 过度缩放；
- 弹簧回弹；
- 每一行文字单独逐字跳动。

### 10.3 滚动显现

```css
.reveal {
  opacity: 0;
  transform: translate3d(0, 12px, 0);
  transition:
    opacity 760ms var(--ease-soft),
    transform 900ms var(--ease-soft);
}

.reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
```

进入视口阈值建议：

- `IntersectionObserver threshold: 0.12`
- `rootMargin: 0px 0px -8% 0px`
- 每个元素只播放一次；
- 返回上方时不重复闪现。

### 10.4 悬停滞留

悬停反馈不应立刻消失：

- 进入延迟：`40–80ms`
- 进入动画：`180–320ms`
- 离开动画：`280–460ms`
- 光晕或墨色可保留 `80–140ms` 后开始退去
- 不使用超过 `1.02` 的放大
- 推荐位移不超过 `-2px`

### 10.5 墨线绘制

仅用于少量分隔线、路径或小图：

- 时长：`900–1400ms`
- 延迟：`120–280ms`
- 线宽不可变化过大；
- 使用 `stroke-dasharray` 与 `stroke-dashoffset`；
- 完成后保持静止；
- 同一屏幕内最多 2 个绘制动画。

### 10.6 纸张呼吸

可选的极弱环境动画：

- 周期：`12–18s`
- 亮度变化：不超过 `±1.5%`
- 纹理透明度变化：不超过 `±0.01`
- 禁止整体页面明显闪烁。

---

## 11. SpecularButton 按键规范

## 11.1 技术边界

项目主体继续使用 Astro。

`SpecularButton` 属于明确的复杂局部交互，可作为 **React Island** 引入，不代表把全站改为 React。

安装：

```bash
npx astro add react
npm install ogl
```

首屏重要按钮：

```astro
<SpecularButton client:load />
```

非首屏按钮：

```astro
<SpecularButton client:visible />
```

不要为普通文字链接使用 WebGL 按钮。

## 11.2 宋代风格推荐参数

```jsx
<SpecularButton
  size="md"
  radius={7}
  tint="#fbf3e6"
  tintOpacity={0.24}
  blur={5}
  textColor="#332f29"
  lineColor="#c4aa78"
  baseColor="#777064"
  intensity={0.72}
  shineSize={8}
  shineFade={34}
  thickness={0.85}
  speed={0.18}
  followMouse
  proximity={210}
  autoAnimate={false}
>
  按钮文字
</SpecularButton>
```

### 参数解释

- `radius={7}`：避免现代玻璃胶囊感；
- `tintOpacity={0.24}`：保留纸张透感，但不能像透明塑料；
- `blur={5}`：只制造轻微空气层；
- `textColor="#332f29"`：使用墨色；
- `lineColor="#c4aa78"`：使用浅旧金，不用纯白霓虹；
- `baseColor="#777064"`：静态边框为柔和墨灰；
- `intensity={0.72}`：高光克制；
- `shineSize={8}`：高光区较窄；
- `shineFade={34}`：边缘平缓消失；
- `thickness={0.85}`：接近手绘细线；
- `speed={0.18}`：自动角度变化保持缓慢；
- `proximity={210}`：接近后再出现，不让按钮持续发亮；
- `autoAnimate={false}`：静止时保持安静。

## 11.3 按钮 CSS 覆盖

原 Prompt 中的深色阴影需要替换：

```css
.specular-button {
  font-family: var(--font-serif-cn);
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--sb-text-color);

  background:
    linear-gradient(
      180deg,
      rgba(255, 250, 240, 0.30),
      rgba(244, 232, 215, 0.14)
    );

  border-radius: var(--sb-radius);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.45),
    inset 0 -1px 0 rgba(71, 66, 58, 0.05),
    0 7px 20px rgba(71, 66, 58, 0.08);

  transition:
    transform 180ms var(--ease-standard),
    box-shadow 320ms var(--ease-standard),
    background-color 320ms var(--ease-standard);
}

.specular-button:hover {
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.52),
    inset 0 -1px 0 rgba(71, 66, 58, 0.06),
    0 10px 24px rgba(71, 66, 58, 0.10);
}

.specular-button:active {
  transform: translateY(0) scale(0.985);
}

.specular-button:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 4px;
}

.specular-button:disabled {
  opacity: 0.46;
  filter: grayscale(0.20);
}
```

## 11.4 按钮使用限制

- 同一视口内最多出现 2 个高光边框按钮；
- 次要操作使用普通墨线按钮或文字链接；
- 按钮不得全屏持续自动扫光；
- 不使用纯白高光；
- 不使用大面积黑色底；
- 不使用强烈发光阴影；
- 不在滚动过程中持续计算所有离屏按钮；
- 多个按钮同时存在时优先采用共享指针状态，避免重复注册过多全局监听器。

## 11.5 性能要求

每个按钮单独创建 WebGL Context 会增加资源开销。

开发时必须：

- 将非首屏按钮设置为 `client:visible`；
- 组件卸载时移除事件监听和 WebGL Context；
- 页面中 WebGL 按钮数量尽量不超过 4 个；
- 移动端可关闭 `followMouse`；
- 触屏设备使用轻微点击反馈代替鼠标追光；
- `prefers-reduced-motion` 下关闭高光运动，仅保留静态细边框。

---

## 12. 常规按钮与文字链接

### 12.1 普通墨线按钮

用于次级操作：

```css
.ink-button {
  border: 1px solid rgba(71, 66, 58, 0.34);
  border-radius: 6px;
  color: var(--ink-900);
  background: rgba(251, 243, 230, 0.42);
  padding: 0.72rem 1.15rem;
  transition:
    border-color 240ms var(--ease-standard),
    background-color 320ms var(--ease-standard),
    transform 180ms var(--ease-standard);
}

.ink-button:hover {
  border-color: rgba(159, 64, 53, 0.46);
  background: rgba(255, 250, 240, 0.72);
  transform: translateY(-1px);
}
```

### 12.2 文字链接

全站文字链接的悬停配色统一使用朱砂红棕色。优先读取
`--cinnabar-700`；页面只定义了简化色板时可使用
`--cinnabar`，最终回退色为 `#9f4035`。首页“转自一言”、
下载链接、正文链接与其他同类文字入口都遵循此规则，
不要在不同页面分别改成纯黑、亮红或其他高饱和颜色。

```css
.text-link {
  color: var(--ink-800);
  text-decoration: none;
  background-image: linear-gradient(
    to right,
    rgba(159, 64, 53, 0.48),
    rgba(159, 64, 53, 0.48)
  );
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0 1px;
  transition:
    color 220ms ease,
    background-size 420ms var(--ease-soft);
}

.text-link:hover {
  color: var(--cinnabar-700, var(--cinnabar, #9f4035));
  background-size: 100% 1px;
}
```

---

## 13. 卡片、容器与分隔

### 13.1 卡片

卡片不能成为全站默认容器。

确实需要卡片时：

```css
.paper-card {
  background: rgba(251, 243, 230, 0.48);
  border: 1px solid rgba(71, 66, 58, 0.16);
  border-radius: 8px;
  box-shadow: 0 12px 36px rgba(71, 66, 58, 0.055);
  backdrop-filter: blur(2px);
}
```

禁止：

- 重阴影；
- 纯白卡片；
- 大圆角；
- 每张卡片都悬浮放大；
- 大面积玻璃模糊。

### 13.2 分隔线

```css
.ink-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(71, 66, 58, 0.24) 18%,
    rgba(71, 66, 58, 0.24) 82%,
    transparent
  );
}
```

### 13.3 朱印式标记

朱印只能用于：

- 当前选中状态；
- 极少量章节标记；
- 页面视觉终止点；
- 个人署名式标识。

要求：

- 尺寸小；
- 不完全规则；
- 颜色使用 `--cinnabar-600`；
- 不把真实姓名做成随处重复的印章；
- 不使用现成传统印章素材直接拼贴。

---

## 14. 图像与媒体

### 14.1 图片处理

- 优先使用 WebP 或 AVIF；
- 普通插画不加明显圆角；
- 图片边缘允许轻微羽化；
- 可使用浅纸色遮罩统一色温；
- 不统一套复古滤镜导致文字和项目截图失真；
- 项目截图应保持可读，不强制做水墨化处理。

### 14.2 媒体色温统一

装饰性图片可使用：

```css
.literati-image {
  filter:
    saturate(0.74)
    contrast(0.94)
    sepia(0.08);
}
```

项目成果图、界面截图和数据图表不得强制应用上述滤镜。

### 14.3 视频

- 视频默认静音；
- 必须提供 `poster`；
- 不自动加载多个视频；
- 视频只承担环境氛围，不承载关键信息；
- 移动端和节能模式允许使用静态图；
- 不直接使用参考桥梁视频作为正式背景。

---

## 15. 导航与状态反馈

本文件不规定导航的具体布局，只规定视觉语言：

- 导航文字使用墨色；
- 当前项通过朱砂短线、墨色加深或极小印记表示；
- 不使用高饱和填充标签；
- Hover 反馈时长 `220–360ms`；
- 当前项不得依赖颜色作为唯一识别方式；
- 键盘焦点必须清晰；
- 固定导航若有背景，只使用轻微纸色和 `2–6px` 模糊；
- 不使用高强度玻璃栏。

---

## 16. 可访问性与减少动态

### 16.1 对比度

- 正文与纸色背景必须保持清晰可读；
- 低透明装饰元素不得承担信息；
- 朱砂色不能单独表示错误或选中；
- 小字号文本禁止使用 `--ink-400`。

### 16.2 键盘

- 所有交互元素支持键盘访问；
- 使用 `:focus-visible`；
- 焦点环不得被 `overflow: hidden` 裁切；
- Canvas 高光层必须 `aria-hidden="true"` 和 `pointer-events: none`。

### 16.3 减少动态

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
  }

  .mist-layer {
    animation: none !important;
    transform: none !important;
  }

  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }

  .specular-button__fx {
    display: none;
  }
}
```

减少动态模式下：

- 保留静态雾气；
- 保留边框；
- 关闭扫光；
- 关闭滚动位移；
- 不影响内容可见性。

---

## 17. 响应式规则

### 桌面端

- 保持大量横向留白；
- 插画可偏置摆放；
- 雾气允许 3 层；
- 允许极慢视差，最大位移不超过 `10px`。

### 平板端

- 雾气保留 2–3 层；
- 适当减少装饰元素；
- 不强行维持桌面端的横向构图；
- 字号使用 `clamp()` 自动收缩。

### 移动端

- 主要内容优先；
- 装饰插画可缩小或隐藏局部；
- 雾气最多 2 层；
- 纸纹透明度降低；
- 不依赖 Hover；
- 按钮高光改为触摸时短暂显现；
- 避免固定背景导致滚动卡顿；
- 不使用横向溢出作为构图手段。

---

## 18. 推荐文件组织

```text
src/
├── components/
│   ├── effects/
│   │   ├── MistField.astro
│   │   ├── PaperGrain.astro
│   │   └── InkReveal.astro
│   ├── react/
│   │   ├── SpecularButton.jsx
│   │   └── SpecularButton.css
│   └── common/
│
├── styles/
│   ├── tokens.css
│   ├── typography.css
│   ├── motion.css
│   ├── effects.css
│   └── global.css
│
└── assets/
    ├── illustrations/
    └── textures/
        ├── xuan-paper-grain.webp
        ├── mist-back.webp
        ├── mist-mid.webp
        └── mist-front.webp
```

规则：

- 所有色值先进入 `tokens.css`；
- 所有通用关键帧进入 `motion.css`；
- 雾气和纸张效果进入 `effects.css`；
- 不在页面文件中重复定义同一套动画；
- 组件内部可使用局部样式，但不得复制全局令牌；
- React 只用于 SpecularButton 等明确需要客户端状态的局部组件。

---

## 19. 性能约束

- 首屏装饰资源总量建议控制在 `700KB` 内；
- 单张雾纹尽量不超过 `220KB`；
- 纸纹尽量不超过 `160KB`；
- 装饰图使用懒加载；
- 首屏主视觉除外的图片设置 `loading="lazy"`；
- 所有图片提供明确宽高，避免布局偏移；
- 持续动画只允许修改 `transform` 与 `opacity`；
- 不持续动画 `filter`、`box-shadow` 或布局属性；
- 雾层必须使用 `will-change`，但只用于实际运动元素；
- 不创建大量 WebGL Context；
- 离屏动效应暂停或不挂载；
- 页面可见性改变时允许暂停非必要动画。

---

## 20. 禁止事项

Codex 不得自行加入：

- 现代霓虹；
- 赛博风；
- 玻璃拟态大卡片；
- 大面积黑底；
- 高饱和红金配色；
- 龙凤、宫殿、祥云边框；
- 仿卷轴页面；
- 宣纸烧边；
- 明显古代 UI 图标套件；
- 密集粒子；
- 雪花、花瓣持续飘落；
- 水波纹点击特效；
- 鼠标拖尾；
- 大型 3D 模型；
- 大幅视差滚动；
- 弹簧式卡片；
- 页面切换翻书特效；
- 全站自动播放音乐；
- 为了“古风”而牺牲项目截图和正文可读性。

---

## 21. Codex 执行顺序

Codex 开始视觉开发前，应按以下顺序执行：

1. 阅读本文件和项目技术栈文档；
2. 建立 `tokens.css`；
3. 建立全局纸色、墨色和排版基础；
4. 建立纸纹层；
5. 建立可独立测试的 `MistField`；
6. 验证雾气在 10 秒以上观看时无明显跳变；
7. 集成 React；
8. 安装 `ogl`；
9. 集成并改造 `SpecularButton`；
10. 添加 `prefers-reduced-motion`；
11. 检查桌面端、平板端和移动端；
12. 最后再把各页面内容接入视觉系统。

不要先制作具体页面，再反向拼凑风格。

---

## 22. 验收标准

### 视觉

- [ ] 页面第一印象是清雅、有空气感，而不是传统古风模板；
- [ ] 暖纸色占主导；
- [ ] 墨色清晰但不生硬；
- [ ] 青绿和浅绛仅作辅助；
- [ ] 朱砂只用于少量点睛；
- [ ] 人物小品或装饰图保留大量留白；
- [ ] 不出现密集古风元素；
- [ ] 项目截图和正文仍然清晰。

### 动效

- [ ] 雾气至少有 2 个不同速度层；
- [ ] 完整观看 10 秒看不到明显循环接缝；
- [ ] 雾气有缓慢滞留，但没有机械停顿；
- [ ] 动画主要使用 `transform` 与 `opacity`；
- [ ] 内容显现不弹跳；
- [ ] Hover 离开时有柔和余韵；
- [ ] 减少动态模式可正常工作。

### 按钮

- [ ] 使用用户提供的 SpecularButton 交互逻辑；
- [ ] 边框高光会跟随鼠标靠近方向；
- [ ] 高光为浅旧金或暖亮色，不是霓虹白；
- [ ] 静态边框是柔和墨灰；
- [ ] 按钮圆角克制；
- [ ] 无深色玻璃大阴影；
- [ ] 键盘焦点清晰；
- [ ] 移动端没有不必要的持续 WebGL 动画。

### 工程

- [ ] `npm run dev` 正常；
- [ ] `npm run build` 正常；
- [ ] `npm run astro check` 正常；
- [ ] 无重复全局动画代码；
- [ ] 无硬编码本地绝对路径；
- [ ] 无不必要大型依赖；
- [ ] 首屏资源体积受控；
- [ ] 离屏动效不持续消耗资源。

---

## 23. 最终风格一句话

> 让网站像一册被轻风翻开的宋人生活小品：纸色温暖，墨线克制，人物与器物只占一隅，雾气缓慢经过，细节在停留中显现，而所有古意都服务于一个当代、真实、持续生长的人。

---

## 24. 全站三帧背景动画频率约束

- 首页及所有后续页面的三帧定格背景统一使用 `750ms` 的单帧停留间隔。
- 新增或修改三帧背景动画时，不得为不同页面单独设置其他间隔。
- 若未来确需调整频率，必须同时修改所有使用三帧背景的页面，并同步更新本节约束。
- 三帧动画只切换图片的可见状态，不添加淡入淡出、位移或缩放过渡，以保持统一的定格动画质感。

---

## 25. 正文字体约束

- 全站正文、段落说明、引文与内容集合正文统一使用本地存档的上图东观体粗体，字体族为 `STDongGuanTi Bld`。
- 页面标题、主视觉标题、按钮和其他展示性短文本可继续使用平方公子体或页面指定的展示字体。
- 新增正文组件时，应优先继承全局 `--font-body`，不得重新指定无关的系统字体栈。
- 上图东观体必须从 `/fonts/shangtudongguan-bold/result.css` 本地加载，不依赖外部字体服务。
