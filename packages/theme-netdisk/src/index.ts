import type { ThemeDefinition } from '@beiming-ui/core/tokens'
import { light, dark, themes, defaultTheme } from './theme'

export { light, dark, themes, defaultTheme }
export type { ThemeDefinition }

export const themeNames = themes.map((t) => t.name)
