/**
 * 北冥 UI · Core Token 契约
 *
 * ┌─ 分层（共存，不是顺序）──────────────────────────┐
 * │ packages/core                 语义槽位 + 组件        │  ← 本文件
 * │ packages/theme-official-site  水墨宣纸的取值（平级）  │
 * │ packages/theme-netdisk        蓝紫渐变的取值（平级）  │
 * └─────────────────────────────────────────────────┘
 *
 * core 只声明「需要哪些槽位」，不写任何具体颜色。
 * 两个主题包互不依赖、可同时存在，各自给出同一批槽位的取值；
 * 官网和网盘因此是两个平行的小项目，谁也不必排在谁后面。
 */

/**
 * 一条完整皮肤的取值表。键名固定 = 契约，值由主题包填。
 * 全部必填：漏一项在编译期就报错，不会上线才发现某处透明。
 */
export interface ThemeTokens {
  /** 页面底 */
  bg: string
  /** 卡片/面板底 */
  surface: string
  /** 凹陷底（输入框、代码块、表格斑马行） */
  surfaceSunken: string
  /** 悬浮/选中态底 */
  surfaceHover: string
  /** 细边框 */
  border: string
  /** 强边框（需要强调分界时） */
  borderStrong: string
  /** 正文 */
  text: string
  /** 次要文字 */
  textSecondary: string
  /** 弱化文字（占位符、辅助说明） */
  textMuted: string
  /** 主色（按钮底、链接） */
  accent: string
  /** 主色悬浮 */
  accentHover: string
  /** 主色上的文字 */
  accentForeground: string
  /** 警示色 */
  danger: string
  /** 成功色 */
  success: string
  /** 警告色 */
  warning: string
  /** focus ring */
  ring: string
  /** 小阴影 */
  shadow: string
  /** 大阴影（浮层、弹窗） */
  shadowLg: string
}

/** 一个主题包对外暴露的形状 */
export interface ThemeDefinition {
  /** 皮肤标识，写进 <html data-bm-theme="..."> */
  name: string
  /** 展示用中文名 */
  label: string
  /** light / dark，供少数需要判断明暗的组件用 */
  mode: 'light' | 'dark'
  /** 圆角基准 */
  radius: string
  /** 正文字体栈 */
  fontBody?: string
  /** 标题字体栈（官网用水墨衬线，网盘用无衬线） */
  fontDisplay?: string
  tokens: ThemeTokens
}

/** 把 ThemeDefinition 渲染成 CSS 变量块 */
export function themeToCss(theme: ThemeDefinition): string {
  const lines: string[] = [`  --bm-radius: ${theme.radius};`]
  for (const [k, v] of Object.entries(theme.tokens)) {
    lines.push(`  --bm-${kebab(k)}: ${v};`)
  }
  if (theme.fontBody) lines.push(`  --bm-font-body: ${theme.fontBody};`)
  if (theme.fontDisplay) lines.push(`  --bm-font-display: ${theme.fontDisplay};`)
  return `[data-bm-theme="${theme.name}"] {\n${lines.join('\n')}\n}`
}

/** 一组主题一起渲染（主题包通常有 light/dark 两套皮肤） */
export function themesToCss(themes: ThemeDefinition[]): string {
  return themes.map(themeToCss).join('\n\n')
}

function kebab(s: string): string {
  return s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
}