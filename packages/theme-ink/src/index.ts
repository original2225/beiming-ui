/**
 * @beiming-ui/theme-ink
 *
 * 水墨风格。北冥官网（暗）和云盘（浅）共用这一套 ——
 * 同一个风格的两个明暗档，不是两个品牌的两套皮肤。
 */

export { ink, rice, themes, defaultTheme, defaultDark, defaultLight } from './theme'

// 水墨专属装饰
export { InkStroke, Seal } from './InkExtras'
export type { InkStrokeProps, SealProps } from './InkExtras'

export {
  ORNAMENTS,
  MountainRange, PeakMark,
  CloudScroll, CloudPair,
  WaveLines,
  Bamboo, PlumBranch,
  MoonCrescent, FlyingBirds,
  WhaleMark, SealFrame,
  InkSplat, BrushStroke, CornerFlourish,
} from './Ornaments'

export type { ThemeDefinition } from '@beiming-ui/core/tokens'
