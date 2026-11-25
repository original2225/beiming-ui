import type { ThemeDefinition } from '@beiming-ui/core/tokens'
import { ink, rice, themes, defaultTheme } from './theme'

export { ink, rice, themes, defaultTheme }
export type { ThemeDefinition }

/** 皮肤名列表，方便做切换器 */
export const themeNames = themes.map((t) => t.name)
