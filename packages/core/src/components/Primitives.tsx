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
        className={[
          'h-9 w-full rounded-[var(--bm-radius)] text-sm',
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
      className={[
        'w-full rounded-[var(--bm-radius)] p-3 text-sm leading-relaxed',
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
  className?: string
  onClick?: () => void
}

export function Card({ children, variant = 'ink', interactive = false, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        'rounded-[var(--bm-radius)] border',
        variant === 'glass'
          ? 'bg-[var(--bm-surface)]/80 backdrop-blur-md border-[var(--bm-border)]'
          : 'bg-[var(--bm-surface)] border-[var(--bm-border)]',
        'shadow-[var(--bm-shadow)]',
        interactive
          ? 'cursor-pointer transition-[transform,border-color,box-shadow] duration-200 ' +
            'hover:-translate-y-0.5 hover:border-[var(--bm-border-strong)] hover:shadow-[var(--bm-shadow-lg)]'
          : '',
        className,
      ].filter(Boolean).join(' ')}
    >
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
  className?: string
}

const TONE: Record<BadgeTone, string> = {
  neutral: 'text-[var(--bm-text-secondary)] border-[var(--bm-border)] bg-[var(--bm-surface-hover)]',
  accent: 'text-[var(--bm-accent)] border-[var(--bm-accent)]/30 bg-[var(--bm-accent)]/10',
  success: 'text-[var(--bm-success)] border-[var(--bm-success)]/30 bg-[var(--bm-success)]/10',
  warning: 'text-[var(--bm-warning)] border-[var(--bm-warning)]/30 bg-[var(--bm-warning)]/10',
  danger: 'text-[var(--bm-danger)] border-[var(--bm-danger)]/30 bg-[var(--bm-danger)]/10',
}

export function Badge({ children, tone = 'neutral', dot = false, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        TONE[tone], className,
      ].filter(Boolean).join(' ')}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}
