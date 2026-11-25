/**
 * 北冥 UI · 预览台
 *
 * 核心要证明两件事：
 *   1. core 的组件不绑风格 —— 同一份 Button/Input/Card，换 theme 就换外观
 *   2. theme-ink 里官网（暗）和云盘（浅）是同一个风格的两个明暗档
 *
 * 布局：上面一排是「同一组件 × 两种风格」，下面一排是「水墨风格 × 两档明暗」。
 */

import { useState } from 'react'
import { Plus, ArrowRight, Download, Trash2, Search } from 'lucide-react'
import { Button, Input, Field, Card, Badge } from '@beiming-ui/core'
import type { ThemeDefinition } from '@beiming-ui/core'
import {
  ink, rice, InkStroke, Seal,
  MountainRange, PeakMark, CloudScroll, CloudPair, WaveLines,
  Bamboo, PlumBranch, MoonCrescent, FlyingBirds, WhaleMark,
  SealFrame, InkSplat, BrushStroke, CornerFlourish,
} from '@beiming-ui/theme-ink'
import { neutralLight, neutralDark } from '@beiming-ui/theme-neutral'

interface PaneDef {
  key: string
  title: string
  subtitle: string
  theme: ThemeDefinition
  note: string
  /** 是否展示水墨专属装饰 */
  inkOnly?: boolean
}

const STYLE_PANES: PaneDef[] = [
  {
    key: 'ink-dark',
    title: '墨',
    subtitle: 'theme-ink · 官网默认',
    theme: ink,
    note: '水墨 · 暗档 · 圆角 8 · 衬线标题',
    inkOnly: true,
  },
  {
    key: 'neutral-light',
    title: '素 · 亮',
    subtitle: 'theme-neutral',
    theme: neutralLight,
    note: '中性极简 · 圆角 6 · 全无衬线 · 零装饰',
  },
]

const INK_PANES: PaneDef[] = [
  {
    key: 'ink-dark-2',
    title: '墨',
    subtitle: '官网默认 · 暗',
    theme: ink,
    note: '首页大图需要暗底托住画面',
    inkOnly: true,
  },
  {
    key: 'ink-light',
    title: '纸',
    subtitle: '云盘默认 · 浅',
    theme: rice,
    note: '文件列表/表格/路径在浅底上更耐看',
    inkOnly: true,
  },
]

export default function App() {
  const [tab, setTab] = useState<'styles' | 'ink'>('styles')
  const [showNeutralDark, setShowNeutralDark] = useState(false)

  const panes = tab === 'styles'
    ? (showNeutralDark ? [...STYLE_PANES, { key: 'nd', title: '素 · 暗', subtitle: 'theme-neutral', theme: neutralDark, note: '中性 · 暗档 · 圆角 6' }] : STYLE_PANES)
    : INK_PANES

  return (
    <div className="min-h-full bg-[var(--bm-bg)] text-[var(--bm-text)]">
      <header className="sticky top-0 z-10 border-b border-[var(--bm-border)] bg-[var(--bm-bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <Seal text="冥" size="md" />
            <div>
              <h1 className="font-[var(--bm-font-display)] text-base font-bold">北冥 UI · 预览台</h1>
              <p className="text-xs text-[var(--bm-text-muted)]">v0.2 · core 中性 + 多风格共存</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex rounded-[var(--bm-radius)] border border-[var(--bm-border)] p-0.5">
              <button
                onClick={() => setTab('styles')}
                className={`rounded px-2.5 py-1 transition-colors ${tab === 'styles' ? 'bg-[var(--bm-surface-hover)] font-medium' : 'text-[var(--bm-text-muted)]'}`}
              >
                风格对比
              </button>
              <button
                onClick={() => setTab('ink')}
                className={`rounded px-2.5 py-1 transition-colors ${tab === 'ink' ? 'bg-[var(--bm-surface-hover)] font-medium' : 'text-[var(--bm-text-muted)]'}`}
              >
                水墨两档
              </button>
            </div>
            {tab === 'styles' && (
              <label className="flex cursor-pointer items-center gap-1.5 text-[var(--bm-text-secondary)]">
                <input type="checkbox" checked={showNeutralDark} onChange={(e) => setShowNeutralDark(e.target.checked)} className="accent-[var(--bm-accent)]" />
                中性暗档
              </label>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-6 py-8">
        <p className="mb-5 text-xs text-[var(--bm-text-muted)]">
          {tab === 'styles'
            ? '同一批 core 组件，在两种风格下应当完全不同 —— 这就是「风格住在 theme 里，不在组件里」。'
            : '水墨风格的暗档给官网、浅档给云盘。组件、圆角、字体、墨痕印章完全一致，只有色值不同。'}
        </p>

        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {panes.map(({ key, ...rest }) => <ThemePane key={key} {...rest} />)}
        </div>

        <footer className="mt-8 border-t border-[var(--bm-border)] pt-5 text-xs text-[var(--bm-text-muted)]">
          core：{['Button', 'Input', 'Textarea', 'Field', 'Card', 'Badge'].join(' / ')}
          {'　·　water墨专属：'}
          {['InkStroke', 'Seal', '+14 图案'].join(' / ')}
        </footer>
      </main>
    </div>
  )
}

function ThemePane({ title, subtitle, theme, note, inkOnly }: PaneDef) {
  const id = theme.name
  return (
    <section data-bm-theme={theme.name} className="overflow-hidden rounded-lg border border-[var(--bm-border)]">
      <div className="border-b border-[var(--bm-border)] bg-[var(--bm-surface)] px-4 py-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-[var(--bm-font-display)] text-sm font-bold">{title}</h2>
          <span className="text-[0.6875rem] text-[var(--bm-text-muted)]">{subtitle}</span>
        </div>
        {note && <p className="mt-0.5 text-[0.6875rem] text-[var(--bm-text-muted)]">{note}</p>}
      </div>

      <div className="space-y-4 bg-[var(--bm-bg)] p-4">
        <div>
          <Label>按钮</Label>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">主要</Button>
            <Button variant="secondary" size="sm">次要</Button>
            <Button variant="ghost" size="sm">幽灵</Button>
            <Button variant="danger" size="sm">危险</Button>
            <Button variant="link" size="sm">文字</Button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Button size="sm" leftIcon={<Plus />}>新建</Button>
            <Button variant="secondary" size="sm" leftIcon={<Download />}>下载</Button>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight />}>继续</Button>
            <Button variant="secondary" size="sm" iconOnly aria-label="搜索"><Search /></Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="删除"><Trash2 /></Button>
          </div>
        </div>

        <div>
          <Label>表单</Label>
          <div className="space-y-2.5">
            <Field label="用户名" hint="3-32 位" htmlFor={`n-${id}`}>
              <Input id={`n-${id}`} placeholder="huachan" />
            </Field>
            <Field label="密码" error="至少 10 位" htmlFor={`p-${id}`}>
              <Input id={`p-${id}`} type="password" placeholder="••••••••••" invalid />
            </Field>
          </div>
        </div>

        <div>
          <Label>卡片 / 徽章</Label>
          <Card interactive className="p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold">主服状态</span>
              <Badge tone="success" dot>在线</Badge>
            </div>
            <p className="text-[0.6875rem] text-[var(--bm-text-muted)]">12 / 60 人 · 生存模式</p>
          </Card>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge>默认</Badge>
            <Badge tone="accent">主色</Badge>
            <Badge tone="warning">警告</Badge>
          </div>
        </div>

        {inkOnly && (
          <>
            <div>
              <Label>水墨装饰 · 仅 theme-ink 有</Label>
              <InkStroke className="h-6" />
              <div className="mt-2 flex items-center gap-2">
                <Seal text="北" size="sm" />
                <Seal text="冥" size="sm" />
                <SealFrame className="h-7 w-7 text-[var(--bm-danger)]">印</SealFrame>
              </div>
            </div>

            <div>
              <Label>水墨图案</Label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  ['远山', <MountainRange className="h-8 w-full" />],
                  ['单峰', <PeakMark className="h-8 w-full opacity-70" />],
                  ['祥云', <CloudScroll className="h-8 w-full opacity-80" />],
                  ['双云', <CloudPair className="h-8 w-full opacity-80" />],
                  ['水波', <WaveLines className="h-8 w-full opacity-80" />],
                  ['竹', <Bamboo className="h-8 w-full opacity-80" />],
                  ['梅', <PlumBranch className="h-8 w-full opacity-80" />],
                  ['残月', <MoonCrescent className="h-8 w-full opacity-85" />],
                  ['飞鸟', <FlyingBirds className="h-8 w-full opacity-80" />],
                  ['鲸', <WhaleMark className="h-8 w-full opacity-80" />],
                  ['墨点', <InkSplat className="h-8 w-full opacity-80" />],
                  ['笔触', <BrushStroke className="h-8 w-full opacity-70" />],
                ].map(([name, node], i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5 rounded border border-[var(--bm-border)] bg-[var(--bm-surface-sunken)] px-1 py-1">
                    <div className="flex h-8 w-full items-center justify-center overflow-hidden">{node}</div>
                    <span className="text-[0.5625rem] text-[var(--bm-text-muted)]">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!inkOnly && (
          <div>
            <Label>这里没有墨痕、没有印章</Label>
            <p className="text-[0.6875rem] text-[var(--bm-text-muted)]">
              中性风格不提供装饰组件 —— 组件库不该强行给每个风格配一套水墨纹样。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">{children}</p>
}