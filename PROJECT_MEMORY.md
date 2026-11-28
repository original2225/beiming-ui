# 北冥 UI · 项目记忆（PROJECT_MEMORY）

> **交接用法**：开新会话第一句说「先读 README.md 和 PROJECT_MEMORY.md，只看最新一节，然后做 <具体下一步>，别动其他包」。README 讲**组件有哪些、token 契约、svgo 的坑**，本文件讲**做到哪、分层的理由、接下来做什么**。
> 每完成一块完整功能就往下追加一节。上下文到 10 万 token 左右就换会话。

## 一句话现状（更新于 2026-11-27）

npm workspaces 单仓三包：`core`（中性组件 + 语义 token 契约，零色值零装饰）+ `theme-ink`（水墨）+ `theme-neutral`（中性极简，用来证明 core 不绑风格），外加 `studio/` 预览台。**core 目前 Button / Primitives / FormControls / Feedback 四个文件共约 20 个组件**；theme-ink 另有印章、墨痕与 14 种水墨图案 SVG。工作区干净，与 origin/main 同步。

## 分层原则（这是这个库的命根子，改动前先读）

一句话：**组件问「这是什么」，主题答「长什么样」。**

- core 组件**不允许**出现色值、阴影、装饰；一切外观走 token
- token 键名固定且**全部必填**——漏一项编译期报错，不会上线才发现某处透明
- `theme-ink` 是**一种风格**，不是默认风格；`theme-neutral` 的存在就是为了证明这一点
- studio 用 Tailwind，靠 `@source "../../packages/theme-*/src"` 扫描类名；**改完必须重启 dev server，热更新不生效**

## 已完成（按 git 提交倒序）

- `feat(core)` 新增 10 个组件：表单控件（Select / Checkbox / Switch / RadioGroup / Slider）+ 反馈（Alert / Spinner / Skeleton / Progress / Tooltip）
- `feat(ink)` 行楷标题（lxgw 文楷子集字体）、大圆角、徽章卡片点缀、水墨动效
- `refactor` 修正分层——core 中性化，水墨降为一种风格
- `chore` MIT LICENSE
- `feat(官网)` 强化 Button + 14 种水墨图案
- `fix` 根 tsconfig 覆盖 `packages/*/src` 与 `studio/src`
- `feat` 三层架构起底：通用组件 + 官网/网盘两套特化共存

## 现有组件速查（详细清单见 README）

- **core 基础**：Button（9 变体 × 4 尺寸、图标槽、点击水波）、Input、Textarea、Field、Card、Badge
- **core 表单**：Select（自定义下拉）、Checkbox、Switch、RadioGroup、Slider
- **core 反馈**：Alert（4 语义色）、Spinner、Skeleton、Progress（含不确定态）、Tooltip
- **theme-ink**：InkStroke 墨痕分隔线、Seal 朱砂印章（3 档）、14 种水墨图案（全部手写 SVG path + currentColor，跟着墨色走，不用为每套皮肤备素材）

## 待办 / 下一步

1. 组件只在 studio 预览台里看过，**还没在官网/云盘页面里替换验证**——真正的验收是接到实际页面里
2. 官网与云盘目前各自还在用自己的一套样式，往 core 迁移是分阶段的事，别一次全换
3. 缺的常用件：Table / Modal / Tabs / Pagination / Toast（官网后台、云盘列表都用得上）
4. 没有 npm publish 流程，目前靠本地 workspaces 引用

## 已知的坑

- **水墨图案的 SVG 弧线**：弧半径必须 ≥ 弦长一半，否则弧不成立整块空白；两段弧围月牙时内弧 `sweep` 必须反向（0），否则围出来是实心椭圆。正确写法在 README「关于水墨图案的两个 SVG 弧线坑」一节（外弧 `A18,18 0 0,1`、内弧 `A22,22 0 0,0`，月牙最厚 8.65px）
- **studio 的 Tailwind `@source` 路径**相对于写 `@source` 的 css 文件，且改完必须重启 dev server
- **组件来源的原则**：先有两个真实产品在用，再从里面往外抽——别凭空铺一堆用不上的组件

## 命令

```bash
npm install
npm run dev         # studio 预览台
npm run typecheck   # 全部包类型检查（tsc --noEmit -p tsconfig.json）
npm run build       # 全部 workspace 构建
```

## 与另两个项目的关系

- `C:\Users\15780\dev\beiming-official-website`（北冥官网）与 `C:\Users\15780\dev\beiming-drive`（北冥云盘）是本库的**上游需求来源**，也是最终消费者
- 主题 `theme-ink` 是官网暗色 + 云盘浅色共用的那一套；改主题会影响这两个产品，改前先看它们当前用的版本

## 2026-11-28｜翻页 / 转场动效：FlipSurface（5 变体）

### 主题
把北冥官网登录卡上做出来的「上下翻活页纸」抽象成通用件，并补上同一族的另外四种：
书的左右翻页、覆盖翻页、风车式选择翻阅、仿真书页（卷曲明暗）。灵感来自视频转场。

### 关键决定（他定的，带日期）
- 花蝉 2026-11-28：「做完这种上下翻页的，再试着做别的动画，把技巧和方法写进 UI 库 —— 书的左右翻页、风车选择翻阅、覆盖翻页、仿真书页等，借鉴视频转场方式」。**要求的是沉淀方法，不只是做组件。**
- 放 **core** 而不是 theme：动效描述的是「怎么动」（轴向、层级、遮挡），是结构；颜色全走 `--bm-*`，所以水墨与中性两套皮肤都成立。这符合「组件问这是什么，主题答长什么样」。

### 踩的坑 / 发现
- **绕边转 180° 后盒子会镜像到边的另一侧，必须补同轴向位移拉回原位，且位移符号与直觉相反、必须写在 rotate 之后。** 三条实测数据：上边框 `translateY(-100%)`（写 +100% → 纸跑到卡片上方 487~974px，看着像翻上去就消失）；左边框 `translateX(-100%)`（写 +100% → 背面偏 −564px）；右边框 `translateX(+100%)`（写 −100% → 偏 +565px）。
- 翻完的验收判据是硬数字：`back.left - flip.left === 0 && back.top - flip.top === 0`，五个变体实测全 0。
- 用 `transition` 驱动 `transform`、不用 keyframes：keyframes 靠类名切换启动，状态类里一旦混进 `position/inset`，切换那一帧布局就塌（官网登录卡连续两版都死在这）。
- 两面用 `grid-template-areas:'stack'` 叠格；`position:absolute; inset:0` 配 JS 量父高会循环依赖，实测两面高度全塌成 0。
- studio 必须用 `npm run dev -w studio` 启动（root 在 studio），直接在仓库根跑 `npx vite` 会把根当项目根，页面全白；另外它的 `vite.config.ts` 里写死 `port: 5183`，被占用时会被别的东西占掉，验证时用 `--port` 显式指定。

### 已完成（可查证的）
- 新增 `packages/core/src/components/FlipSurface.tsx` + `packages/core/src/transitions.css`（五变体，零色值）
- `packages/core/package.json` 加 `./transitions.css` 导出；`core/src/index.ts` 导出 `FlipSurface`
- studio 新增「转场动效」tab（`MotionGallery`），五张卡可点
- `npm run typecheck` 通过（tsc --noEmit 全库）
- 预览台 5200 端口实测：5 个 `.bm-flip` 全部渲染，翻完背面偏移均为 (0,0)
- README 增「关于翻页动效的三个坑」；组件清单加 FlipSurface 表

### 待办 / 下一步
1. 官网登录卡（`beiming-official-website/frontend/src/components/auth/AuthBook.tsx`）目前是自己写的一套 `.bm-leaf` 样式，还没换成 `FlipSurface variant="vertical"`，迁移时要重新验证圆扣/横线纸/提示条那几层装饰不被 core 的 `background: var(--bm-surface)` 覆盖
2. `windmill` 变体只做了「两面」的形态；如果要在 3~5 个面板间循环切换，需要再加一个受控的 `index` + 方向，等真实页面有需求再补
3. 五个变体还没进任何一个真实页面，studio 里看过不等于验收

## 追加格式（以后每块功能完成后照这个写）

```
## 2026-MM-DD｜<做了什么>
### 主题
### 关键决定（他定的，带日期）
### 踩的坑 / 发现
### 已完成（可查证的：文件、typecheck 结果、提交）
### 待办 / 下一步
```
