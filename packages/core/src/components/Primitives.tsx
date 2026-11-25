/**
 * 北冥 UI · Input / Textarea / Field / Card / Badge
 *
 * 这些是**中性**组件：不含任何风格倾向，配色全部来自 --bm-* token。
 * 它们在任何风格下都成立 —— 换个 theme 包，外观就跟着变。
 *
 * 风格专属的东西（墨痕分隔线、朱砂印章、水墨图案）不在这里，
 * 在对应的 theme 包里。例如 theme-ink 提供 InkStroke / Seal / Ornaments。
 */

import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

/* ─────────────── Input ─────────────── */

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  invalid?: boolean
  /** 左侧图标槽 */
  leftIcon?: ReactNode
  /** 右侧图标槽 */
  rightIcon?: ReactNode
}

export function Input({ invalid = false, leftIcon, rightIcon, className = '', ...rest }: InputProps) {
  return (
    <div className="relative inline-flex w-full items-center">
      {leftIcon && (
        <span className="pointer-events-none absolute left-3 flex text-[var(--bm-text-muted)]" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <input
        {...rest}
        aria-invalid={invalid || undefined}
        style={{ borderRadius: 'var(--bm-radius-sm, 10px)' }}
        className={[
          'h-9 w-full text-sm',
          'bg-[var(--bm-surface-sunken)] text-[var(--bm-text)]',
          'border transition-[border-color,box-shadow] duration-150 outline-none',
          'placeholder:text-[var(--bm-text-muted)]',
          'focus-visible:ring-2',
          invalid
            ? 'border-[var(--bm-danger)] focus-visible:ring-[var(--bm-danger)]'
            : 'border-[var(--bm-border)] focus-visible:border-[var(--bm-border-strong)] focus-visible:ring-[var(--bm-ring)]',
          leftIcon ? 'pl-9' : 'pl-3',
          rightIcon ? 'pr-9' : 'pr-3',
          className,
        ].filter(Boolean).join(' ')}
      />
      {rightIcon && (
        <span className="absolute right-3 flex text-[var(--bm-text-muted)]" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </div>
  )
}

/* ─────────────── Textarea ─────────────── */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export function Textarea({ invalid = false, className = '', ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      aria-invalid={invalid || undefined}
      style={{ borderRadius: 'var(--bm-radius, 14px)' }}
      className={[
        'w-full p-3 text-sm leading-relaxed',
        'bg-[var(--bm-surface-sunken)] text-[var(--bm-text)]',
        'border transition-[border-color,box-shadow] duration-150 outline-none resize-y',
        'placeholder:text-[var(--bm-text-muted)] focus-visible:ring-2',
        invalid
          ? 'border-[var(--bm-danger)] focus-visible:ring-[var(--bm-danger)]'
          : 'border-[var(--bm-border)] focus-visible:border-[var(--bm-border-strong)] focus-visible:ring-[var(--bm-ring)]',
        className,
      ].filter(Boolean).join(' ')}
    />
  )
}

/* ─────────────── Field ─────────────── */

export interface FieldProps {
  label?: string
  /** 字段说明，常驻在输入框下方 */
  hint?: string
  /** 错误信息；有值时输入框自动标红 */
  error?: string
  required?: boolean
  htmlFor?: string
  children: ReactNode
  className?: string
}

export function Field({ label, hint, error, required, htmlFor, children, className = '' }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-[var(--bm-text-secondary)]">
          {label}
          {required && <span className="ml-0.5 text-[var(--bm-danger)]">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p role="alert" className="text-xs text-[var(--bm-danger)]">{error}</p>
      ) : hint ? (
        <p className="text-xs text-[var(--bm-text-muted)]">{hint}</p>
      ) : null}
    </div>
  )
}

/* ─────────────── Card ─────────────── */

export interface CardProps {
  children: ReactNode
  /** ink = 实心面板；glass = 半透明叠在背景图上 */
  variant?: 'ink' | 'glass'
  /** 悬浮时抬升 */
  interactive?: boolean
  /**
   * 角落装饰。卡片是方框，加一笔角花就活了。
   * none 保持素净；corner 右下角一笔；spray 四角淡墨点
   */
  flourish?: 'none' | 'corner' | 'spray'
  className?: string
  onClick?: () => void
}

export function Card({
  children, variant = 'ink', interactive = false,
  flourish = 'none', className = '', onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{ borderRadius: 'var(--bm-radius-lg, 20px)' }}
      className={[
        // 大圆角：卡片是面板，圆角要够，避免方正板的死气
        'relative isolate overflow-hidden border',
        variant === 'glass'
          ? 'bg-[var(--bm-surface)]/80 backdrop-blur-md border-[var(--bm-border)]'
          : 'bg-[var(--bm-surface)] border-[var(--bm-border)]',
        'shadow-[var(--bm-shadow)]',
        interactive
          ? 'cursor-pointer transition-[transform,border-color,box-shadow] duration-300 ' +
            'hover:-translate-y-1 hover:border-[var(--bm-border-strong)] hover:shadow-[var(--bm-shadow-lg)]'
          : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {flourish === 'corner' && (
        <svg
          viewBox="0 0 80 80"
          className="pointer-events-none absolute -bottom-1 -right-1 h-16 w-16 text-[var(--bm-text)] opacity-[0.07]"
          aria-hidden="true"
        >
          <path d="M78,78 C78,44 58,18 20,6" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M78,60 C74,40 62,24 44,14" stroke="currentColor" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <circle cx="66" cy="22" r="3.5" fill="currentColor" opacity="0.8" />
        </svg>
      )}
      {flourish === 'spray' && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-[var(--bm-text)] opacity-[0.045]"
          aria-hidden="true"
        >
          <g fill="currentColor">
            <circle cx="8" cy="10" r="9" />
            <circle cx="94" cy="88" r="13" />
            <circle cx="88" cy="12" r="5" />
            <circle cx="12" cy="86" r="4" />
          </g>
        </svg>
      )}
      {children}
    </div>
  )
}

/* ─────────────── Badge ─────────────── */

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  /** 前置小圆点，适合在线状态 */
  dot?: boolean
  /**
   * 点缀。徽章很小，加一个 2px 的小图形就够灵动，别喧宾夺主。
   * seal: 左侧一道朱砂竖笔（像小印章边）
   * wing: 右上一撇（像飞白收笔）
   * none: 素
   */
  accent?: 'none' | 'seal' | 'wing'
  className?: string
}

const TONE: Record<BadgeTone, string> = {
  neutral: 'text-[var(--bm-text-secondary)] border-[var(--bm-border)] bg-[var(--bm-surface-hover)]',
  accent: 'text-[var(--bm-accent)] border-[var(--bm-accent)]/30 bg-[var(--bm-accent)]/10',
  success: 'text-[var(--bm-success)] border-[var(--bm-success)]/30 bg-[var(--bm-success)]/10',
  warning: 'text-[var(--bm-warning)] border-[var(--bm-warning)]/30 bg-[var(--bm-warning)]/10',
  danger: 'text-[var(--bm-danger)] border-[var(--bm-danger)]/30 bg-[var(--bm-danger)]/10',
}

export function Badge({
  children, tone = 'neutral', dot = false, accent = 'none', className = '',
}: BadgeProps) {
  return (
    <span
      style={{ borderRadius: 'var(--bm-radius-pill, 999px)' }}
      className={[
        // 全圆角（pill）+ 左右不对称内边距，看得出是"手贴上去的签"
        'relative inline-flex items-center gap-1.5 border py-[0.1875rem] pl-2.5 pr-2 text-xs font-medium',
        TONE[tone], className,
      ].filter(Boolean).join(' ')}
    >
      {/* 朱砂竖笔：靠左，颜色跟当前 tone */}
      {accent === 'seal' && (
        <svg
          viewBox="0 0 6 16"
          className="pointer-events-none absolute -left-0.5 top-1/2 h-3.5 w-1.5 -translate-y-1/2"
          aria-hidden="true"
        >
          <path d="M3.4,1 C4.6,5.5 2.0,10 3.6,15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </svg>
      )}
      {/* 飞白一撇：压在右上角，轻微越界才有贴纸感 */}
      {accent === 'wing' && (
        <svg
          viewBox="0 0 18 10"
          className="pointer-events-none absolute -right-1 -top-1.5 h-2 w-3.5 rotate-12"
          aria-hidden="true"
        >
          <path d="M1.2,7.6 C6,3.2 11,1.4 16.6,1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      )}
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}
