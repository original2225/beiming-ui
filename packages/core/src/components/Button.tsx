/**
 * 北冥 UI · Button
 *
 * 参 Linear 的紧字距与按下位移、参 Stripe 的轻字重、参 Vercel 的边界克制度。
 * 配色与圆角全部走当前皮肤，组件本身不含任何色值。
 */

import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'

export type ButtonVariant =
  | 'primary'   // 主操作：实色
  | 'secondary' // 次要：描边 + 浅底
  | 'ghost'     // 幽灵：无底无边
  | 'danger'    // 危险
  | 'seal'      // 印章风：朱砂底、微偏转、像盖上去的
  | 'link'      // 文字按钮：只有字
  | 'outline'   // 描边：透明底 + 主色边，比 secondary 更轻
  | 'soft'      // 柔色：主色 12% 底的实心片，比 ghost 有存在感
  | 'ink'       // 墨底：用 text 色做底（暗色皮肤下是白片、浅色下是黑片），对比最强

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** 左侧图标（lucide 图标或任意节点） */
  leftIcon?: ReactNode
  /** 右侧图标 */
  rightIcon?: ReactNode
  /** 只显示图标时，由 aria-label 提供无障碍名称 */
  iconOnly?: boolean
  loading?: boolean
  /** 点击水波涟漪（默认开）。关掉用于密集工具栏，避免频繁动效 */
  ripple?: boolean
  fullWidth?: boolean
  disabled?: boolean
  children?: ReactNode
  className?: string
  'aria-label'?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
}

interface SizeSpec {
  h: string
  px: string
  text: string
  gap: string
  iconSize: string
}

const SIZE: Record<ButtonSize, SizeSpec> = {
  xs: { h: 'h-6', px: 'px-2', text: 'text-[0.75rem]', gap: 'gap-1', iconSize: '[&_svg]:size-3' },
  sm: { h: 'h-8', px: 'px-3', text: 'text-[0.8125rem]', gap: 'gap-1.5', iconSize: '[&_svg]:size-3.5' },
  md: { h: 'h-9', px: 'px-4', text: 'text-sm', gap: 'gap-2', iconSize: '[&_svg]:size-4' },
  lg: { h: 'h-11', px: 'px-6', text: 'text-[0.9375rem]', gap: 'gap-2', iconSize: '[&_svg]:size-[1.125rem]' },
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  ripple = true,
  fullWidth = false,
  disabled = false,
  children,
  className = '',
  onClick,
  type = 'button',
  iconOnly = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const spec = SIZE[size]
  const isLink = variant === 'link'
  const [ripples, setRipples] = useState<Ripple[]>([])

  // 涟漪从点击处起，覆盖到按钮最远角
  const spawnRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || variant === 'link' || loading || disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // 半径取到最远角，才盖得住整块
    const size = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y),
    ) * 2
    const id = Date.now() + Math.random()
    setRipples((r) => [...r, { id, x, y, size }])
    // 动画 620ms，到点清掉，避免节点堆积
    window.setTimeout(() => {
      setRipples((r) => r.filter((p) => p.id !== id))
    }, 680)
  }, [ripple, variant, loading, disabled])

  const base =
    'inline-flex items-center justify-center font-medium ' +
    'transition-[background-color,border-color,box-shadow,transform,color] duration-150 ' +
    'select-none whitespace-nowrap focus-visible:outline-none ' +
    'disabled:pointer-events-none disabled:opacity-50 ' +
    // 参 Linear：按下时 1px 位移，点击有实感
    'active:translate-y-px'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-[var(--bm-accent)] text-[var(--bm-accent-foreground)] ' +
      'hover:bg-[var(--bm-accent-hover)] ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-ring)]',
    secondary:
      'bg-[var(--bm-surface-hover)] text-[var(--bm-text)] ' +
      'border border-[var(--bm-border)] hover:border-[var(--bm-border-strong)] ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-ring)]',
    ghost:
      'bg-transparent text-[var(--bm-text-secondary)] ' +
      'hover:bg-[var(--bm-surface-hover)] hover:text-[var(--bm-text)] ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-ring)]',
    danger:
      'bg-[var(--bm-danger)] text-white hover:opacity-90 ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-danger)]',
    // 印章风：朱砂底、偏转、像盖上去的
    seal:
      'bg-[var(--bm-danger)] text-white -rotate-2 ' +
      'tracking-wider ' +
      'shadow-[0_2px_6px_rgba(185,58,58,0.35)] ' +
      'hover:rotate-0 hover:scale-[1.02] ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-danger)]',
    // 文字按钮：不带高度与左右内边距，避免与 SIZE 打架
    link:
      'bg-transparent text-[var(--bm-accent)] hover:text-[var(--bm-accent-hover)] ' +
      'underline-offset-4 hover:underline ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-ring)]',
    // 描边：透明底，只有一圈主色边
    outline:
      'bg-transparent text-[var(--bm-accent)] border border-[var(--bm-accent)]/45 ' +
      'hover:bg-[var(--bm-accent)]/8 hover:border-[var(--bm-accent)] ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-ring)]',
    // 柔色：主色淡底实心片
    soft:
      'bg-[var(--bm-accent)]/12 text-[var(--bm-accent)] border border-transparent ' +
      'hover:bg-[var(--bm-accent)]/20 ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-ring)]',
    // 墨底：用正文色做底，是全场对比最强的那个
    ink:
      'bg-[var(--bm-text)] text-[var(--bm-bg)] ' +
      'hover:opacity-88 ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-ring)]',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={(e) => {
        spawnRipple(e)
        onClick?.(e)
      }}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      style={{
        borderRadius: 'var(--bm-radius-sm, 10px)',
        ...(variant === 'seal' ? { fontFamily: 'var(--bm-font-display, serif)' } : null),
      }}
      className={[
        base,
        spec.text,
        spec.gap,
        spec.iconSize,
        isLink ? 'h-auto px-0' : [spec.h, spec.px].join(' '),
        // 涟漪要裁切，否则会溢出按钮边界
        ripple && !isLink ? 'bm-ripple-host' : '',
        variants[variant],
        fullWidth ? 'w-full' : '',
        iconOnly ? 'aspect-square px-0' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="bm-ripple"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
          }}
          aria-hidden="true"
        />
      ))}
      {loading ? (
        <span
          className="inline-block size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        leftIcon && (
          <span className="inline-flex shrink-0 items-center" aria-hidden="true">{leftIcon}</span>
        )
      )}
      {children}
      {rightIcon && !loading && (
        <span className="inline-flex shrink-0 items-center" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  )
}