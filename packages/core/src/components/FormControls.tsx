/**
 * 北冥 UI · 表单控件
 *
 * Select / Checkbox / Switch / Radio / Slider
 *
 * 全部中性：只引用 --bm-* token，不含任何风格化装饰。
 * 形状走大圆角，没有直角 —— 这一批特别容易做成"方盒子"，注意：
 * - 勾选框不用尖角方框，用 6px 圆角
 * - 单选框用圆形，选中时内圈用主色
 * - 开关轨道全圆，滑块是圆
 */

import { useState, useRef, useEffect, useId } from 'react'
import type { ReactNode } from 'react'

/* ─────────────── Select ─────────────── */

export interface SelectOption {
  value: string
  label: string
  /** 禁用项 */
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  /** 未受控时用 */
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  /** 尺寸 */
  size?: 'sm' | 'md'
  className?: string
  'aria-label'?: string
}

export function Select({
  options, value, defaultValue, onChange, placeholder = '请选择',
  disabled = false, invalid = false, size = 'md', className = '', 'aria-label': ariaLabel,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState(defaultValue ?? '')
  const current = value !== undefined ? value : inner
  const rootRef = useRef<HTMLDivElement>(null)

  // 点外面关掉
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  const pick = (v: string) => {
    if (value === undefined) setInner(v)
    onChange?.(v)
    setOpen(false)
  }

  const selected = options.find((o) => o.value === current)
  const h = size === 'sm' ? 'h-8 text-[0.8125rem]' : 'h-9 text-sm'

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{ borderRadius: 'var(--bm-radius-sm, 10px)' }}
        className={[
          'flex w-full items-center justify-between gap-2 border px-3 outline-none transition-[border-color,box-shadow] duration-150',
          'bg-[var(--bm-surface-sunken)] text-[var(--bm-text)]',
          h,
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          invalid
            ? 'border-[var(--bm-danger)]'
            : open
              ? 'border-[var(--bm-border-strong)] ring-2 ring-[var(--bm-ring)]'
              : 'border-[var(--bm-border)] hover:border-[var(--bm-border-strong)]',
        ].join(' ')}
      >
        <span className={selected ? '' : 'text-[var(--bm-text-muted)]'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg viewBox="0 0 12 12" className={`size-3 shrink-0 text-[var(--bm-text-muted)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path d="M2,4.5 L6,8.5 L10,4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          style={{ borderRadius: 'var(--bm-radius, 14px)' }}
          className="bm-spread absolute z-50 mt-1.5 max-h-64 w-full overflow-auto border border-[var(--bm-border)] bg-[var(--bm-surface)] p-1 shadow-[var(--bm-shadow-lg)]"
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === current}
              disabled={o.disabled}
              onClick={() => !o.disabled && pick(o.value)}
              style={{ borderRadius: 'var(--bm-radius-sm, 10px)' }}
              className={[
                'flex w-full items-center justify-between px-2.5 py-1.5 text-left text-[0.8125rem] transition-colors',
                o.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                o.value === current
                  ? 'bg-[var(--bm-accent)]/12 font-medium text-[var(--bm-accent)]'
                  : 'text-[var(--bm-text)] hover:bg-[var(--bm-surface-hover)]',
              ].join(' ')}
            >
              {o.label}
              {o.value === current && (
                <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                  <path d="M2,6.5 L4.5,9 L10,3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────── Checkbox ─────────────── */

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: ReactNode
  className?: string
}

export function Checkbox({
  checked, defaultChecked = false, onChange, disabled = false, label, className = '',
}: CheckboxProps) {
  const [inner, setInner] = useState(defaultChecked)
  const on = checked !== undefined ? checked : inner
  const id = useId()

  const toggle = () => {
    const next = !on
    if (checked === undefined) setInner(next)
    onChange?.(next)
  }

  return (
    <label htmlFor={id} className={`inline-flex cursor-pointer items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={on}
        disabled={disabled}
        onChange={toggle}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        style={{ borderRadius: '6px' }}
        className={[
          'grid size-[1.125rem] shrink-0 place-items-center border-2 transition-[background-color,border-color] duration-150',
          on
            ? 'border-[var(--bm-accent)] bg-[var(--bm-accent)] text-[var(--bm-accent-foreground)]'
            : 'border-[var(--bm-border-strong)] bg-transparent',
        ].join(' ')}
      >
        {on && (
          <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
            <path d="M1.5,6 L4.4,9 L10.5,2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        )}
      </span>
      {label && <span className="text-sm text-[var(--bm-text)]">{label}</span>}
    </label>
  )
}

/* ─────────────── Switch ─────────────── */

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: ReactNode
  className?: string
}

export function Switch({
  checked, defaultChecked = false, onChange, disabled = false, label, className = '',
}: SwitchProps) {
  const [inner, setInner] = useState(defaultChecked)
  const on = checked !== undefined ? checked : inner
  const id = useId()

  const toggle = () => {
    if (disabled) return
    const next = !on
    if (checked === undefined) setInner(next)
    onChange?.(next)
  }

  return (
    <label htmlFor={id} className={`inline-flex cursor-pointer items-center gap-2.5 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
      <input id={id} type="checkbox" checked={on} disabled={disabled} onChange={toggle} className="sr-only" />
      <span
        aria-hidden="true"
        className={[
          'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200',
          on
            ? 'border-[var(--bm-accent)] bg-[var(--bm-accent)]'
            : 'border-[var(--bm-border-strong)] bg-[var(--bm-surface-hover)]',
        ].join(' ')}
      >
        {/* 滑块：圆形，位置随状态移动 */}
        <span
          className={[
            'absolute size-3.5 rounded-full bg-white shadow-sm transition-transform duration-200',
            on ? 'translate-x-[1.1rem]' : 'translate-x-[0.15rem]',
          ].join(' ')}
        />
      </span>
      {label && <span className="text-sm text-[var(--bm-text)]">{label}</span>}
    </label>
  )
}

/* ─────────────── Radio ─────────────── */

export interface RadioOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** 竖排（默认）或横排 */
  direction?: 'vertical' | 'horizontal'
  className?: string
}

export function RadioGroup({
  options, value, defaultValue, onChange, direction = 'vertical', className = '',
}: RadioGroupProps) {
  const [inner, setInner] = useState(defaultValue ?? '')
  const current = value !== undefined ? value : inner
  const name = useId()

  const pick = (v: string) => {
    if (value === undefined) setInner(v)
    onChange?.(v)
  }

  return (
    <div
      role="radiogroup"
      className={[
        'flex gap-3',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className,
      ].join(' ')}
    >
      {options.map((o) => {
        const on = o.value === current
        return (
          <label
            key={o.value}
            className={`inline-flex items-center gap-2 ${o.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            <input
              type="radio"
              name={name}
              checked={on}
              disabled={o.disabled}
              onChange={() => !o.disabled && pick(o.value)}
              className="sr-only"
            />
            {/* 圆形轨道，选中时中间填主色圆点 */}
            <span
              aria-hidden="true"
              className={[
                'grid size-[1.125rem] shrink-0 place-items-center rounded-full border-2 transition-colors duration-150',
                on ? 'border-[var(--bm-accent)]' : 'border-[var(--bm-border-strong)]',
              ].join(' ')}
            >
              <span
                className={[
                  'size-[0.5rem] rounded-full transition-transform duration-150',
                  on ? 'scale-100 bg-[var(--bm-accent)]' : 'scale-0 bg-transparent',
                ].join(' ')}
              />
            </span>
            <span className="text-sm text-[var(--bm-text)]">{o.label}</span>
          </label>
        )
      })}
    </div>
  )
}

/* ─────────────── Slider ─────────────── */

export interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  disabled?: boolean
  showValue?: boolean
  className?: string
}

export function Slider({
  value, defaultValue = 0, min = 0, max = 100, step = 1,
  onChange, disabled = false, showValue = false, className = '',
}: SliderProps) {
  const [inner, setInner] = useState(defaultValue)
  const v = value !== undefined ? value : inner
  const pct = max > min ? ((v - min) / (max - min)) * 100 : 0

  const set = (n: number) => {
    if (value === undefined) setInner(n)
    onChange?.(n)
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-1">
        {/* 轨道：全圆，已填充部分用主色 */}
        <div className="h-1.5 w-full rounded-full bg-[var(--bm-surface-hover)]" />
        <div
          className="absolute inset-y-0 left-0 h-1.5 rounded-full bg-[var(--bm-accent)]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          disabled={disabled}
          onChange={(e) => set(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
        {/* 滑块：圆形，跟随进度 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-[var(--bm-accent)] bg-[var(--bm-bg)] shadow-sm transition-transform duration-100"
          style={{ left: `calc(${pct}% - 0.5rem)` }}
        />
      </div>
      {showValue && (
        <span className="w-10 shrink-0 text-right text-[0.8125rem] tabular-nums text-[var(--bm-text-secondary)]">{v}</span>
      )}
    </div>
  )
}