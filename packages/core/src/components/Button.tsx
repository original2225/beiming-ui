/**
 * 北冥 UI · Button
 *
 * 参 Linear 的紧字距、参 Stripe 的轻字重、参 Vercel 的边界克制度，
 * 但配色与圆角走当前皮肤。
 */

import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'seal'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** 只显示图标时，给出无障碍标签 */
  iconOnly?: boolean
  loading?: boolean
  fullWidth?: boolean
  disabled?: boolean
  children?: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
}

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[0.8125rem] gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-6 text-[0.9375rem] gap-2',
}

export function Button({
  variant = 'primary', size = 'md', loading = false, fullWidth = false,
  disabled = false, children, className = '', onClick, type = 'button', iconOnly = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-[var(--bm-radius)] font-medium ' +
    'transition-[background-color,border-color,box-shadow,transform] duration-150 ' +
    'select-none whitespace-nowrap focus-visible:outline-none ' +
    'disabled:pointer-events-none disabled:opacity-50 ' +
    // 参 Linear：按下时 1px 位移 + 内阴影，点击有实感
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
      'font-[var(--bm-font-display,serif)] tracking-wider ' +
      'shadow-[0_2px_6px_rgba(185,58,58,0.35)] ' +
      'hover:rotate-0 hover:scale-[1.02] ' +
      'focus-visible:ring-2 focus-visible:ring-[var(--bm-danger)]',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      className={[
        base, SIZE[size], variants[variant],
        fullWidth ? 'w-full' : '',
        iconOnly ? 'aspect-square px-0' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {loading && (
        <span
          className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}