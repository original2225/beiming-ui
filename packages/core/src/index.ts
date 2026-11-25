/**
 * @beiming-ui/core
 *
 * 通用组件与语义 token 契约。不含任何品牌配色 ——
 * 配色由 @beiming-ui/theme-official-site 或 @beiming-ui/theme-netdisk 提供。
 */

export { Button } from './components/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button'

export {
  Input, Textarea, Field, Card, Badge, InkStroke, Seal,
} from './components/Primitives'
export type {
  InputProps, TextareaProps, FieldProps, CardProps, BadgeProps, BadgeTone,
  InkStrokeProps, SealProps,
} from './components/Primitives'

export { themeToCss, themesToCss } from './tokens'
export type { ThemeTokens, ThemeDefinition } from './tokens'
