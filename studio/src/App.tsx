/**
 * 北冥 UI · 预览台
 *
 * 并列对比同一套组件在三种皮肤下的表现：
 *   官网·墨（默认暗） | 官网·纸（浅，登录注册用） | 网盘·浅（默认）
 * 目的不是「好看」，而是验证同一份组件代码在三种皮肤下都不塌。
 */

import { useState } from 'react'
import { Plus, ArrowRight, Download, Trash2, Search, X } from 'lucide-react'
import {
  Button, Input, Field, Card, Badge, InkStroke, Seal,
  MountainRange, PeakMark, CloudScroll, CloudPair, WaveLines,
  Bamboo, PlumBranch, MoonCrescent, FlyingBirds, WhaleMark,
  SealFrame, InkSplat, BrushStroke, CornerFlourish,
} from '@beiming-ui/core'
import {
  ink as officialInk, rice as officialRice, defaultTheme as officialDefault,
} from '@beiming-ui/theme-official-site'
import {
  light as netdiskLight, dark as netdiskDark, defaultTheme as netdiskDefault,
} from '@beiming-ui/theme-netdisk'
import type { ThemeDefinition } from '@beiming-ui/core'

interface PaneDef {
  key: string
  title: string
  subtitle: string
  theme: ThemeDefinition
  note: string
}

const BASE_PANES: PaneDef[] = [
  {
    key: 'off-ink',
    title: '官网 · 墨',
    subtitle: '默认暗色',
    theme: officialInk,
    note: '靛蓝 #2E5A6B · 圆角 8 · 衬线标题',
  },
  {
    key: 'off-rice',
    title: '官网 · 纸',
    subtitle: '登录/注册用',
    theme: officialRice,
    note: '靛蓝 #2E5A6B · 圆角 8 · 浅纸面',
  },
  {
    key: 'net-light',
    title: '网盘 · 浅',
    subtitle: '默认浅色',
    theme: netdiskLight,
    note: '蓝紫 #5B6CFF · 圆角 12 · 无衬线',
  },
]

const NET_DARK_PANE: PaneDef = {
  key: 'net-dark',
  title: '网盘 · 暗',
  subtitle: '暗色变体',
  theme: netdiskDark,
  note: '蓝紫提亮 #7D8BFF · 圆角 12',
}

export default function App() {
  const [showOfficial, setShowOfficial] = useState(true)
  const [showNetDark, setShowNetDark] = useState(false)

  const panes = showOfficial ? BASE_PANES : BASE_PANES.slice(2)
  const all = showNetDark ? [...panes, NET_DARK_PANE] : panes

  return (
    <div className="min-h-full bg-[var(--bm-bg)] text-[var(--bm-text)]">
      <header className="sticky top-0 z-10 border-b border-[var(--bm-border)] bg-[var(--bm-bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <Seal text="冥" size="md" />
            <div>
              <h1 className="font-[var(--bm-font-display)] text-base font-bold">北冥 UI · 预览台</h1>
              <p className="text-xs text-[var(--bm-text-muted)]">
                一套通用组件 · 两套特化并存 · v0.1
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--bm-text-secondary)]">
            <label className="flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={showOfficial}
                onChange={(e) => setShowOfficial(e.target.checked)}
                className="accent-[var(--bm-accent)]"
              />
              官网两套
            </label>
            <label className="flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={showNetDark}
                onChange={(e) => setShowNetDark(e.target.checked)}
                className="accent-[var(--bm-accent)]"
              />
              网盘暗色
            </label>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-6 py-8">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {all.map(({ key, ...rest }) => (
            <ThemePane key={key} {...rest} />
          ))}
        </div>

        <footer className="mt-10 border-t border-[var(--bm-border)] pt-5 text-xs text-[var(--bm-text-muted)]">
          默认主题 · 官网 <code className="text-[var(--bm-accent)]">{officialDefault}</code>
          {' / '}
          网盘 <code className="text-[var(--bm-accent)]">{netdiskDefault}</code>
        </footer>
      </main>
    </div>
  )
}

function Figure({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-[var(--bm-radius)] border border-[var(--bm-border)] bg-[var(--bm-surface-sunken)] px-1.5 py-2">
      <div className="flex h-12 w-full items-center justify-center overflow-hidden">{children}</div>
      <span className="text-[0.625rem] text-[var(--bm-text-muted)]">{label}</span>
    </div>
  )
}

function ThemePane({ title, subtitle, theme, note }: PaneDef) {
  const id = theme.name
  return (
    <section
      data-bm-theme={theme.name}
      className="overflow-hidden rounded-lg border border-[var(--bm-border)]"
    >
      <div className="border-b border-[var(--bm-border)] bg-[var(--bm-surface)] px-4 py-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-[var(--bm-font-display)] text-sm font-bold">{title}</h2>
          <span className="text-[0.6875rem] text-[var(--bm-text-muted)]">{subtitle}</span>
        </div>
        {note && <p className="mt-0.5 text-[0.6875rem] text-[var(--bm-text-muted)]">{note}</p>}
      </div>

      <div className="space-y-4 bg-[var(--bm-bg)] p-4">
        <div>
          <p className="mb-2 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">按钮 · 六变体</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">主要</Button>
            <Button variant="secondary" size="sm">次要</Button>
            <Button variant="ghost" size="sm">幽灵</Button>
            <Button variant="danger" size="sm">危险</Button>
            <Button variant="seal" size="sm">印章</Button>
            <Button variant="link" size="sm">文字</Button>
          </div>

          <p className="mb-2 mt-3 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">按钮 · 带图标</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" leftIcon={<Plus />}>新建</Button>
            <Button variant="secondary" size="sm" leftIcon={<Download />}>下载</Button>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight />}>继续</Button>
            <Button variant="secondary" size="sm" iconOnly aria-label="搜索"><Search /></Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="删除"><Trash2 /></Button>
            <Button size="sm" loading>提交中</Button>
            <Button variant="secondary" size="sm" disabled>禁用</Button>
          </div>

          <p className="mb-2 mt-3 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">按钮 · 四尺寸</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">极小</Button>
            <Button size="sm">小</Button>
            <Button size="md">中</Button>
            <Button size="lg">大</Button>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">表单</p>
          <div className="space-y-2.5">
            <Field label="用户名" hint="3-32 位" htmlFor={`n-${id}`}>
              <Input id={`n-${id}`} placeholder="huachan" />
            </Field>
            <Field label="密码" error="至少 10 位，需含字母和数字" htmlFor={`p-${id}`}>
              <Input id={`p-${id}`} type="password" placeholder="••••••••••" invalid />
            </Field>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">卡片 / 徽章</p>
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
            <Badge tone="danger">危险</Badge>
          </div>
        </div>

        <div>
          <p className="mb-1 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">墨痕 / 印章</p>
          <InkStroke className="h-6" />
          <div className="mt-2 flex gap-2">
            <Seal text="北" size="sm" />
            <Seal text="冥" size="sm" />
          </div>
        </div>

        <div>
          <p className="mb-2 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">水墨图案 · 十四种</p>

          <div className="grid grid-cols-3 gap-2">
            <Figure label="远山">
              <MountainRange className="h-12 w-full" />
            </Figure>
            <Figure label="单峰">
              <PeakMark className="h-12 w-full opacity-70" />
            </Figure>
            <Figure label="祥云">
              <CloudScroll className="h-12 w-full opacity-80" />
            </Figure>

            <Figure label="双云">
              <CloudPair className="h-12 w-full opacity-80" />
            </Figure>
            <Figure label="水波">
              <WaveLines className="h-12 w-full opacity-80" />
            </Figure>
            <Figure label="竹">
              <Bamboo className="h-12 w-full opacity-80" />
            </Figure>

            <Figure label="梅枝">
              <PlumBranch className="h-12 w-full opacity-80" />
            </Figure>
            <Figure label="残月">
              <MoonCrescent className="h-12 w-full opacity-85" />
            </Figure>
            <Figure label="飞鸟">
              <FlyingBirds className="h-12 w-full opacity-80" />
            </Figure>

            <Figure label="鲸">
              <WhaleMark className="h-12 w-full opacity-80" />
            </Figure>
            <Figure label="印框">
              <SealFrame className="h-12 w-12 text-[var(--bm-danger)]">北</SealFrame>
            </Figure>
            <Figure label="墨点">
              <InkSplat className="h-12 w-full opacity-80" />
            </Figure>

            <Figure label="笔触">
              <BrushStroke className="h-12 w-full opacity-70" />
            </Figure>
            <Figure label="角花">
              <CornerFlourish className="h-12 w-full opacity-70" />
            </Figure>
            <Figure label="—">
              <span className="text-[0.625rem] text-[var(--bm-text-muted)]">currentColor 跟随皮肤</span>
            </Figure>
          </div>
        </div>
      </div>
    </section>
  )
}