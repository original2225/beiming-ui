# 北冥 UI

一套面向产品的中式组件库。**核心是中性的，风格可换**：组件本身不含任何配色和装饰，水墨（theme-ink）只是其中一种风格。

```
packages/
  core/            中性组件 + 语义 token 契约（零色值、零装饰）
  theme-ink/       水墨风格 —— 北冥官网与云盘共用
  theme-neutral/   中性极简风格 —— 用来证明 core 不绑风格
studio/           预览台
```

## 分层原则

一句话：**组件问「这是什么」，主题答「长什么样」。**

| 层 | 只管这些 | 换掉它影响 |
| --- | --- | --- |
| `core` | 组件结构、交互、`--bm-*` 槽位 | 所有风格 |
| `theme-ink` | 水墨的色值、圆角、字体、墨痕印章、14 种图案 | 只有用水墨的产品 |
| `theme-neutral` | 中性极简的色值、圆角、字体 | 只有用中性风的产品 |

**判别方法**：一处改动如果只对某个风格有意义，它属于那个 theme 包；如果它改变「这个组件怎么响应」，它属于 core。

具体到水墨：`InkStroke`（墨痕分隔线）、`Seal`（朱砂印章）、14 种水墨图案**都不在 core 里**，它们在 `theme-ink`。因为中性风格里出现墨痕和印章就是错的——组件库不该强行给每个风格配一套水墨纹样。

## theme-ink：官网和云盘共用

北冥官网和云盘**用同一套**水墨风格，只是明暗两档不同：

| 皮肤 | 给谁用 | 为什么 |
| --- | --- | --- |
| `ink-dark`（墨） | 官网默认 | 首页铺满 Minecraft 场景大图，暗底让画面当主角 |
| `ink-light`（纸） | 云盘默认 | 文件列表、表格、路径这类高密度信息在浅底上更耐看 |

**这两个不是两个品牌的两套皮肤**，是同一风格的两个明暗档：组件、圆角 8、字体、墨痕印章全部一致，只有色值不同。所以官网和云盘的按钮、输入框、卡片长得是同一副样子，整体观感统一。

## 用法

```tsx
// 1. 选一个风格，引它的 css
import '@beiming-ui/theme-ink/theme.css'

// 2. 给根节点打主题标
<div data-bm-theme="ink-dark">
  <Button>主要操作</Button>
</div>
```

`data-bm-theme` 可打在任意节点，嵌套生效——预览台就是左右各打一个，互不干扰。

### 现有皮肤

| 包 | 皮肤名 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme-ink | `ink-dark` | 官网 | 深墨底、靛蓝 #2E5A6B、圆角 8、衬线标题 |
| theme-ink | `ink-light` | 云盘 | 浅纸面，同一套组件 |
| theme-neutral | `neutral-light` | | 中性极简，圆角 6，全无衬线，零装饰 |
| theme-neutral | `neutral-dark` | | 中性暗档 |

## 两条必须遵守的规则

**一、主题作用域必须自己声明 `background` 和 `color`。**

只定义 CSS 变量是不够的：如果外层是深色页面，浅色主题里的文字会继承外层的浅色文字，出现白底白字。每个 theme.css 末尾都有这段：

```css
[data-bm-theme] {
  background-color: var(--bm-bg);
  color: var(--bm-text);
  font-family: var(--bm-font-body, inherit);
}
```

**二、core 里不许出现字面色值，也不许出现装饰性图形。**

需要新颜色时先问：这是新槽位（加进契约）还是某个风格特有的（放 theme 包）。想加水墨纹样，放 `theme-ink`，不要塞 core。

**三、用 Tailwind v4 的项目必须写 `@source`。**

v4 默认只扫描当前项目目录，**扫不到 monorepo 里的 `packages/*`**。不加这几行，core 组件用到的类（`size-3`、`size-4`、`tabular-nums`…）一个都不会生成 —— 表现为 SVG 没有宽度被撑满父容器（一个 12×12 的下拉箭头会变成 600×600）、数字不对齐。这个失败是静默的，不报错。

```css
@import "tailwindcss";
@source "../../packages/core/src";
@source "../../packages/theme-ink/src";
@source "../../packages/theme-neutral/src";
```

路径相对于写 `@source` 的 css 文件。改完必须重启 dev server，热更新不生效。

## Token 契约

键名固定，全部必填——漏一项编译期报错，不会上线才发现某处透明。

| 槽位 | 用途 |
| --- | --- |
| `bg` | 页面底 |
| `surface` / `surfaceSunken` / `surfaceHover` | 面板 / 凹陷 / 悬浮底 |
| `border` / `borderStrong` | 细边框 / 强调边框 |
| `text` / `textSecondary` / `textMuted` | 正文 / 次要 / 弱化文字 |
| `accent` / `accentHover` / `accentForeground` | 主色三态 |
| `danger` / `success` / `warning` | 语义色 |
| `ring` | focus 环 |
| `shadow` / `shadowLg` | 小阴影 / 浮层阴影 |

## 现有组件

**core（中性，任何风格都成立）**

基础：`Button`（9 变体 × 4 尺寸，带图标槽、点击水波）、`Input`、`Textarea`、`Field`、`Card`（含角落装饰）、`Badge`（含点缀）

表单：`Select`（自定义下拉）、`Checkbox`、`Switch`、`RadioGroup`、`Slider`

反馈：`Alert`（4 语义色）、`Spinner`、`Skeleton`、`Progress`（含不确定态）、`Tooltip`

**theme-ink（水墨专属）**

- `InkStroke` 墨痕分隔线
- `Seal` 朱砂印章（3 档尺寸）
- 14 种水墨图案：远山 / 单峰 / 祥云 / 双云 / 水波 / 竹 / 梅枝 / 残月 / 飞鸟 / 鲸 / 印框 / 墨点 / 笔触 / 角花

全部用手写 SVG path，`currentColor` 着色，自动跟随当前皮肤的墨色，配 `opacity` 做浓淡——不需要为每套皮肤单独准备素材。

## 本地开发

```bash
npm install
npm run dev        # 预览台
npm run typecheck  # 全部包类型检查
```

预览台有两个视图：**风格对比**（同一组件在水墨 vs 中性下的差别）和**水墨两档**（官网暗 / 云盘浅）。

## 关于水墨图案的两个 SVG 弧线坑

画残月时踩过两次，记在这里免得重犯：

1. **弧半径必须 ≥ 弦长一半**。起点 (28,2)、终点 (28,38) 相距 36，半径写 14.5 小于 18 时，SVG 规范按最短直径处理，弧不成立，整块空白。
2. **两段弧围月牙，内弧的 sweep 必须反向**。若和外弧同为 `sweep=1`，两弧同向凸出，围出来是实心椭圆（看着像满月）。

正确写法：外弧 `A18,18 0 0,1`（凸到 x=46）、内弧 `A22,22 0 0,0`（凸到 x≈37.4），月牙最厚 8.65px。

## 关于组件来源

组件先有两个真实产品在用，再从里面往外抽——比凭空设计一堆用不上的组件靠谱。所以这个库的组件是跟着官网/云盘的实际页面长的，不是一次性铺满。