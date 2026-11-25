# 北冥 UI

一套中式水墨气质的 React 组件库。**通用组件 + 两套并列特化**：官网和网盘不是先后关系，是两个平行的小项目，各自取用同一批组件、填自己的配色。

```
packages/
  core/                  通用组件 + 语义 token 契约（不含任何品牌色）
  theme-official-site/   官网特化：水墨宣纸（默认暗色）
  theme-netdisk/         网盘特化：蓝紫工具风（默认浅色）
studio/                  预览台：三栏并列对比同一组件在各地皮肤下的表现
```

## 为什么要这么分层

早先想做"一个库里塞满市面热门组件"，那条路走不通：市面上已有 shadcn/ui（12.5 万 star）占住了"可复制源码 + 人人自定皮肤"的位置，再做一个只会是它的劣化版。

所以这里反过来做：

- **组件是自己的**，走中式水墨这条路 —— 墨痕分隔线、朱砂印章这些别人没有。
- **热门体系只取其法**：Linear 的 1px 按下位移、Stripe 的轻字重与大阴影、Vercel 的极克制边框。抄的是秩序，不是配色身份。
- **配色由主题包给**，core 一个色值都不写。这样加一个新产品 = 加一个 theme 包，不动组件。

## 三层各管什么

| 层 | 只管这些 | 改这里会影响 |
| --- | --- | --- |
| `core` | 组件的 DOM 结构、交互、`--bm-*` 变量槽位 | 所有产品 |
| `theme-official-site` | 官网的色值、圆角、字体 | 只有官网 |
| `theme-netdisk` | 网盘的色值、圆角、字体 | 只有网盘 |

**判别方法**：如果一处改动只对某个产品有意义，它属于那个 theme 包；如果它改变了"这个组件长什么样、怎么响应"，它属于 core。

## 用法

```tsx
// 1. 引入主题 css（一个产品只需要一个）
import '@beiming-ui/theme-official-site/theme.css'

// 2. 给根节点打主题标
<div data-bm-theme="official-ink">
  <Button>主要操作</Button>
</div>
```

`data-bm-theme` 可以打在任意节点上，嵌套生效 —— 预览台就是三栏各打一个，互不干扰。

### 皮肤一览

| 包 | 皮肤名 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme-official-site | `official-ink` | ✅ 官网默认 | 深墨底、靛蓝 #2E5A6B、圆角 8、衬线标题 |
| theme-official-site | `official-rice` | | 浅纸面，登录/注册弹窗用 |
| theme-netdisk | `netdisk-light` | ✅ 网盘默认 | 冷白底、蓝紫 #5B6CFF、圆角 12、无衬线 |
| theme-netdisk | `netdisk-dark` | | 网盘暗色变体 |

## 一条必须遵守的规则

**主题作用域必须自己声明 `background` 和 `color`。**

只定义 CSS 变量是不够的：如果外层是深色页面，浅色主题里的文字会继承外层的浅色文字，出现白底白字。两个 theme.css 末尾都有这段：

```css
[data-bm-theme] {
  background-color: var(--bm-bg);
  color: var(--bm-text);
  font-family: var(--bm-font-body, inherit);
}
```

新增主题包时必须抄这段，否则嵌套在深色页面里的浅色皮肤必然出问题。

## Token 契约

键名固定，全部必填 —— 漏一项编译期就报错，不会上线才发现某处透明。

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

组件里**不允许出现字面色值**。需要新颜色时先问：这是新槽位（加进契约）还是某个产品特有的（放 theme 包）。

## 本地开发

```bash
npm install
npm run dev        # 预览台 → http://localhost:5183
npm run typecheck  # 全部包类型检查
```

## 现状

已有组件：`Button`（5 variant × 3 size）、`Input`、`Textarea`、`Field`、`Card`、`Badge`、`InkStroke`、`Seal`。

后续按需从官网/网盘实际页面里提 —— 先有两个真实产品在跑，再从里面往外抽，比凭空设计一堆用不上的组件靠谱。