/**
 * 北冥 UI · FlipSurface —— 两页之间的翻页 / 转场
 *
 * 一个组件、五个变体，覆盖我们实际用得到的所有「换页」场景：
 *
 *   vertical  上下翻（日历式，绕上边框）        —— 官网登录卡那种活页纸
 *   book      书的左右翻页（绕左边框）          —— 内容分章、文档预览
 *   cover     覆盖翻页（新页从侧边压进来）      —— 视频转场里的「推入覆盖」
 *   windmill  风车式选择翻阅（反向对转 + 缩放） —— 在多个面板/选项之间切
 *   curl      仿真书页（绕右边框翻起 + 卷曲明暗）—— 最像真纸的一种
 *
 * 组件只负责「怎么动」；外观（底色、圆角、阴影）全部来自 --bm-* token，
 * 所以水墨和中性两套皮肤下都成立。
 *
 * ── 用法 ──────────────────────────────────────────────
 *   const [side, setSide] = useState<'front' | 'back'>('front')
 *   <FlipSurface
 *     variant="vertical"
 *     flipped={side === 'back'}
 *     front={<LoginForm />}
 *     back={<RegisterForm />}
 *   />
 *
 * 要点：front / back 是「同一张纸的两面」，不是两个独立页面。
 * 两面的高度自动取较高者，翻动过程不会跳；容器不裁切，纸能甩到外面。
 */

import type { CSSProperties, ReactNode } from 'react'

export type FlipVariant = 'vertical' | 'book' | 'cover' | 'windmill' | 'curl'

export interface FlipSurfaceProps {
  /** 变体：怎么翻 */
  variant?: FlipVariant
  /** 是否翻到背面 */
  flipped?: boolean
  /** 正面内容 */
  front: ReactNode
  /** 背面内容 */
  back: ReactNode
  /** 翻动时长（ms）。3D 翻页 620~760 建议值；cover 可以更快（420~520） */
  duration?: number
  /** 宽高。给一个固定高度能让两面严格等高；不给则由较高的那面撑开 */
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  className?: string
  /** 翻到背面时给正面加 aria-hidden，反之亦然（键盘/读屏不会读到背面） */
  respectA11y?: boolean
}

const DEFAULT_DURATION: Record<FlipVariant, number> = {
  vertical: 640,
  book: 700,
  cover: 480,
  windmill: 520,
  curl: 760,
}

export function FlipSurface({
  variant = 'vertical',
  flipped = false,
  front,
  back,
  duration,
  width,
  height,
  className = '',
  respectA11y = true,
}: FlipSurfaceProps) {
  const ms = duration ?? DEFAULT_DURATION[variant]
  // windmill 是两面各自转、不是一张纸转，所以不加 preserve-3d 的双面遮挡
  const isWindmill = variant === 'windmill'

  return (
    <div
      className={`bm-flip ${className}`}
      data-variant={variant}
      style={{
        width,
        height,
        // 时长从 JS 传进 CSS，避免每个变体各写一遍
        ['--bm-flip-duration' as string]: `${ms}ms`,
      } as CSSProperties}
    >
      <div
        className={`bm-flip-leaf ${flipped ? 'is-flipped' : ''}`}
        style={{ transitionDuration: `${ms}ms` }}
      >
        <div
          className={`bm-flip-face is-front ${isWindmill ? '' : ''}`}
          style={{ transitionDuration: `${ms}ms` }}
          aria-hidden={respectA11y ? flipped : undefined}
        >
          {front}
        </div>
        <div
          className="bm-flip-face is-back"
          style={{ transitionDuration: `${ms}ms` }}
          aria-hidden={respectA11y ? !flipped : undefined}
        >
          {back}
        </div>
      </div>
    </div>
  )
}
