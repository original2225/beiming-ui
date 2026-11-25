/**
 * 北冥 UI · Input / Field / Card / Badge / InkStroke / Seal
 *
 * 放在一个文件里是因为它们互为最小依赖单元；registry 分发时会按 item 拆开。
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

/* ─────────────── InkStroke（墨痕分隔线 · 北冥特色）─────────────── */

export interface InkStrokeProps {
  className?: string
  /** 颜色类；默认用当前皮肤的弱化文字色 */
  color?: string
}

export function InkStroke({ className = '', color = 'text-[var(--bm-text-muted)]' }: InkStrokeProps) {
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className={`h-8 w-full ${color} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0,14 C150,10 250,18 400,12 C550,6 650,20 800,13 C950,6 1050,16 1200,12 L1200,16 C1050,20 950,10 800,17 C650,24 550,10 400,16 C250,22 150,14 0,18 Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ─────────────── Seal（朱砂印章 · 北冥特色）─────────────── */

export interface SealProps {
  text?: string
  /** sm = 1.5rem，md = 2rem，lg = 2.5rem */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SEAL_SIZE = { sm: 'h-6 w-6 text-[0.65rem]', md: 'h-8 w-8 text-[0.8rem]', lg: 'h-10 w-10 text-base' }

export function Seal({ text = '印', size = 'md', className = '' }: SealProps) {
  return (
    <span
      className={[
        'inline-flex select-none items-center justify-center rounded-sm',
        'bg-[var(--bm-danger)] text-white leading-none',
        'border border-[var(--bm-danger)]/40 shadow-sm -rotate-6',
        SEAL_SIZE[size], className,
      ].filter(Boolean).join(' ')}
    >
      {text}
    </span>
  )
}