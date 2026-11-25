/**
 * @beiming-ui/theme-ink · 水墨专属装饰组件
 *
 * InkStroke（墨痕分隔线）和 Seal（朱砂印章）是「水墨」这一风格的标志物，
 * 不是通用组件 —— 中性风格里不该出现墨痕和印章。
 * 所以它们和 14 种水墨图案一起住在这个 theme 包里。
 */

import type { ReactNode } from 'react'

/* ─────────────── InkStroke · 墨痕分隔线─────────────── */

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

/* ─────────────── Seal · 朱砂印章─────────────── */

export interface SealProps {
  text?: string
  /** sm = 1.5rem，md = 2rem，lg = 2.5rem */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SEAL_SIZE = { sm: 'h-6 w-6 text-[0.65rem]', md: 'h-8 w-8 text-[0.8rem]', lg: 'h-10 w-10 text-base' }

export function Seal({ text = '印', size = 'md', className = '' }: SealProps) {
  return (
    <span className={['inline-flex', className].filter(Boolean).join(' ')}>
      {/* 倾斜放在内层：外层留给 bm-breath / bm-drift 这类动画，
          否则两处 transform 会互相覆盖（同一元素只能有一个 transform） */}
      <span
        className={[
          'inline-flex select-none items-center justify-center rounded-[0.35rem]',
          'bg-[var(--bm-danger)] text-white leading-none',
          'border border-[var(--bm-danger)]/40 shadow-sm -rotate-6',
          SEAL_SIZE[size],
        ].join(' ')}
      >
        {text}
      </span>
    </span>
  )
}