/**
 * @beiming-ui/core
 *
 * 通用组件与语义 token 契约。
 *
 * 这里**只有中性的东西**：组件结构、交互、--bm-* 变量槽位。
 * 一个色值都没有，也没有任何风格化装饰 —— 所以同一批组件
 * 在 theme-ink（水墨）和 theme-neutral（中性极简）下都成立。
 *
 * 风格专属的东西（墨痕、印章、水墨图案）在各 theme 包里。
 */

export { Button } from './components/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button'

export { Input, Textarea, Field, Card, Badge } from './components/Primitives'
export type {
  InputProps, TextareaProps, FieldProps, CardProps, BadgeProps, BadgeTone,
} from './components/Primitives'

/* 表单控件 */
export { Select, Checkbox, Switch, RadioGroup, Slider } from './components/FormControls'
export type {
  SelectProps, SelectOption,
  CheckboxProps, SwitchProps,
  RadioGroupProps, RadioOption,
  SliderProps,
} from './components/FormControls'

/* 反馈 */
export { Alert, Spinner, Skeleton, Progress, Tooltip } from './components/Feedback'
export type {
  AlertProps, AlertTone,
  SpinnerProps, SkeletonProps, ProgressProps, TooltipProps,
} from './components/Feedback'

/* 翻页 / 转场 */
export { FlipSurface } from './components/FlipSurface'
export type { FlipSurfaceProps, FlipVariant } from './components/FlipSurface'

export { themeToCss, themesToCss } from './tokens'
export type { ThemeTokens, ThemeDefinition } from './tokens'