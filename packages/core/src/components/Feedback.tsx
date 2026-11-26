/**
 * 北冥 UI · 反馈组件
 *
 * Alert / Spinner / Skeleton / Progress / Tooltip
 *
 * 全部中性，形状走大圆角。这批组件的共同点：都在"告知状态"，
 * 所以颜色语义（成功/警告/危险）必须准确，不能只靠形状区分。
 */

import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'

/* ─────────────── Alert ─────────────── */

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
  tone?: AlertTone
  title?: string
  children?: ReactNode
  /** 可关闭，关闭后回调 */
  onClose?: () => void
  /** 左侧图标，不给则按 tone 用默认图标 */
  icon?: ReactNode
  className?: string
}

const ALERT_TONE: Record<AlertTone, { box: string; icon: ReactNode }> = {
  info: {
    box: 'border-[var(--bm-accent)]/30 bg-[var(--bm-accent)]/8 text-[var(--bm-accent)]',
    icon: <path d="M10,2 A8,8 0 1,0 10,18 A8,8 0 1,0 10,2 M10,9 L10,13.5 M10,6.4 L10,6.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />,
  },
  success: {
    box: 'border-[var(--bm-success)]/30 bg-[var(--bm-success)]/8 text-[var(--bm-success)]',
    icon: <path d="M3,10.5 L7.5,15 L17,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  warning: {
    box: 'border-[var(--bm-warning)]/35 bg-[var(--bm-warning)]/10 text-[var(--bm-warning)]',
    icon: <path d="M10,2.5 L18.5,17 L1.5,17 Z M10,8 L10,12 M10,14.2 L10,14.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  danger: {
    box: 'border-[var(--bm-danger)]/30 bg-[var(--bm-danger)]/8 text-[var(--bm-danger)]',
    icon: <path d="M6,6 L14,14 M14,6 L6,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />,
  },
}

export function Alert({
  tone = 'info', title, children, onClose, icon, className = '',
}: AlertProps) {
  const t = ALERT_TONE[tone]
  return (
    <div
      role="alert"
      style={{ borderRadius: 'var(--bm-radius, 14px)' }}
      className={`bm-spread flex gap-2.5 border p-3 ${t.box} ${className}`}
    >
      <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0" aria-hidden="true">
        {icon ?? t.icon}
      </svg>
      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-medium">{title}</p>}
        {children && <div className={`text-[0.8125rem] leading-relaxed ${title ? 'mt-0.5' : ''} opacity-90`}>{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="shrink-0 rounded-full p-0.5 text-current opacity-50 transition-opacity hover:opacity-100"
        >
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
            <path d="M2.5,2.5 L9.5,9.5 M9.5,2.5 L2.5,9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      )}
    </div>
  )
}

/* ─────────────── Spinner ─────────────── */

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** 无障碍标签，默认"加载中" */
  label?: string
}

const SPINNER_SIZE = { sm: 'size-3.5 border-2', md: 'size-5 border-2', lg: 'size-8 border-[3px]' }

export function Spinner({ size = 'md', className = '', label = '加载中' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block animate-spin rounded-full border-current border-t-transparent ${SPINNER_SIZE[size]} ${className}`}
    />
  )
}

/* ─────────────── Skeleton ─────────────── */

export interface SkeletonProps {
  /** 宽（CSS 值或 Tailwind 类） */
  width?: string
  height?: string
  /** 圆形骨架：头像用 */
  circle?: boolean
  className?: string
}

export function Skeleton({ width, height, circle = false, className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius: circle ? '999px' : 'var(--bm-radius-sm, 10px)',
      }}
      className={`bm-shimmer-skeleton relative overflow-hidden bg-[var(--bm-surface-hover)] ${className}`}
    >
      {/* 一道高光横扫，比单纯的闪烁更接近"正在加载" */}
      <span className="absolute inset-0 -translate-x-full animate-[bm-skeleton-sweep_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[var(--bm-text-muted)]/12 to-transparent" />
    </div>
  )
}

/* ─────────────── Progress ─────────────── */

export interface ProgressProps {
  /** 进度值；indeterminate 时可省略 */
  value?: number
  max?: number
  /** 显示百分比文字 */
  showLabel?: boolean
  /** 不确定进度：来回滚动，用于上传等待 */
  indeterminate?: boolean
  tone?: 'accent' | 'success' | 'warning' | 'danger'
  className?: string
}

const PROGRESS_TONE = {
  accent: 'bg-[var(--bm-accent)]',
  success: 'bg-[var(--bm-success)]',
  warning: 'bg-[var(--bm-warning)]',
  danger: 'bg-[var(--bm-danger)]',
}

export function Progress({
  value, max = 100, showLabel = false, indeterminate = false,
  tone = 'accent', className = '',
}: ProgressProps) {
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, ((value ?? 0) / max) * 100))

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--bm-surface-hover)]"
      >
        {indeterminate ? (
          <span className={`absolute inset-y-0 w-1/3 rounded-full ${PROGRESS_TONE[tone]} animate-[bm-progress-slide_1.4s_ease-in-out_infinite]`} />
        ) : (
          <span
            className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ${PROGRESS_TONE[tone]}`}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
      {showLabel && !indeterminate && (
        <span className="w-9 shrink-0 text-right text-[0.75rem] tabular-nums text-[var(--bm-text-secondary)]">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  )
}

/* ─────────────── Tooltip ─────────────── */

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  /** 出现位置 */
  side?: 'top' | 'bottom'
  className?: string
}

export function Tooltip({ content, children, side = 'top', className = '' }: TooltipProps) {
  const [show, setShow] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  // 悬停 200ms 后才出，避免鼠标划过一片按钮时弹个不停
  const enter = () => {
    timer.current = window.setTimeout(() => setShow(true), 200)
  }
  const leave = () => {
    window.clearTimeout(timer.current)
    setShow(false)
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          style={{ borderRadius: 'var(--bm-radius-sm, 10px)' }}
          className={[
            'bm-spread absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap border border-[var(--bm-border)]',
            'bg-[var(--bm-surface)] px-2 py-1 text-[0.75rem] text-[var(--bm-text)] shadow-[var(--bm-shadow-lg)]',
            side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
          ].join(' ')}
        >
          {content}
        </span>
      )}
    </span>
  )
}