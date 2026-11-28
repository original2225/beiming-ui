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
import {
  Button, Input, Field, Card, Badge,
  Select, Checkbox, Switch, RadioGroup, Slider,
  Alert, Spinner, Skeleton, Progress, Tooltip,
  FlipSurface,
} from '@beiming-ui/core'
import type { FlipVariant } from '@beiming-ui/core'
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
    note: '水墨 · 暗档 · 圆角 14 · 行楷标题',
    inkOnly: true,
  },
  {
    key: 'neutral-light',
    title: '素 · 亮',
    subtitle: 'theme-neutral',
    theme: neutralLight,
    note: '中性极简 · 圆角 10 · 全无衬线 · 零装饰',
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
  const [tab, setTab] = useState<'styles' | 'ink' | 'motion'>('styles')
  const [showNeutralDark, setShowNeutralDark] = useState(false)

  const panes = tab === 'styles'
    ? (showNeutralDark ? [...STYLE_PANES, { key: 'nd', title: '素 · 暗', subtitle: 'theme-neutral', theme: neutralDark, note: '中性 · 暗档 · 圆角 10' }] : STYLE_PANES)
    : INK_PANES

  return (
    <div className="min-h-full bg-[var(--bm-bg)] text-[var(--bm-text)]">
      <header className="sticky top-0 z-10 border-b border-[var(--bm-border)] bg-[var(--bm-bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <Seal text="冥" size="md" />
            <div>
              <h1 className="text-base font-bold" style={{ fontFamily: 'var(--bm-font-display)' }}>北冥 UI · 预览台</h1>
              <p className="text-xs text-[var(--bm-text-muted)]">v0.2 · core 中性 + 多风格共存</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex border border-[var(--bm-border)] p-0.5" style={{ borderRadius: 'var(--bm-radius, 14px)' }}>
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
              <button
                onClick={() => setTab('motion')}
                className={`rounded px-2.5 py-1 transition-colors ${tab === 'motion' ? 'bg-[var(--bm-surface-hover)] font-medium' : 'text-[var(--bm-text-muted)]'}`}
              >
                转场动效
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
        {tab === 'motion' && <MotionGallery />}
        <p className="bm-spread mb-5 text-xs text-[var(--bm-text-muted)]">
          {tab === 'styles'
            ? '同一批 core 组件，在两种风格下应当完全不同 —— 这就是「风格住在 theme 里，不在组件里」。'
            : '水墨风格的暗档给官网、浅档给云盘。组件、圆角、字体、墨痕印章完全一致，只有色值不同。'}
        </p>

        <div className="bm-stagger grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {panes.map(({ key, ...rest }) => <ThemePane key={key} {...rest} />)}
        </div>

        <footer className="mt-8 border-t border-[var(--bm-border)] pt-5 text-xs text-[var(--bm-text-muted)]">
          core：{['Button', 'Input', 'Textarea', 'Field', 'Card', 'Badge', 'Select', 'Checkbox', 'Switch', 'RadioGroup', 'Slider', 'Alert', 'Spinner', 'Skeleton', 'Progress', 'Tooltip'].join(' / ')}
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
          <h2 className="text-sm font-bold" style={{ fontFamily: 'var(--bm-font-display)' }}>{title}</h2>
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
            <Button variant="outline" size="sm">描边</Button>
            <Button variant="soft" size="sm">柔色</Button>
            <Button variant="ink" size="sm">墨底</Button>
            <Button variant="danger" size="sm">危险</Button>
            <Button variant="seal" size="sm">印章</Button>
            <Button variant="link" size="sm">文字</Button>
          </div>
          <p className="mt-1.5 text-[0.625rem] text-[var(--bm-text-muted)]">点任意按钮看水波涟漪</p>
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
          <Label>表单控件</Label>
          <div className="space-y-2.5">
            <Select
              options={[
                { value: 'survival', label: '生存模式' },
                { value: 'creative', label: '创造模式' },
                { value: 'adventure', label: '冒险模式', disabled: true },
              ]}
              defaultValue="survival"
              aria-label="游戏模式"
            />
            <Slider defaultValue={62} showValue />
            <div className="flex flex-wrap items-center gap-3">
              <Checkbox defaultChecked label="记住我" />
              <Switch defaultChecked label="开启通知" />
            </div>
            <RadioGroup
              direction="horizontal"
              defaultValue="a"
              options={[
                { value: 'a', label: '正式服' },
                { value: 'b', label: '测试服' },
              ]}
            />
          </div>
        </div>

        <div>
          <Label>反馈</Label>
          <div className="space-y-2">
            <Alert tone="success" title="提交成功">你的入服申请已进入审核队列。</Alert>
            <Alert tone="warning" onClose={() => {}}>规则版本已更新，请重新确认。</Alert>
            <div className="flex items-center gap-3">
              <Spinner size="sm" />
              <Spinner />
              <Tooltip content="悬停显示提示">
                <Button variant="secondary" size="sm">悬浮我</Button>
              </Tooltip>
            </div>
            <div className="space-y-1.5">
              <Progress value={68} showLabel />
              <Progress indeterminate tone="accent" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton circle width="2rem" height="2rem" />
              <div className="flex-1 space-y-1.5">
                <Skeleton height="0.6rem" className="w-3/4" />
                <Skeleton height="0.6rem" className="w-1/2" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label>卡片 / 徽章</Label>
          <Card interactive flourish={inkOnly ? 'corner' : 'none'} className="p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold">主服状态</span>
              <Badge tone="success" dot accent="wing">在线</Badge>
            </div>
            <p className="text-[0.6875rem] text-[var(--bm-text-muted)]">12 / 60 人 · 生存模式</p>
          </Card>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge accent="seal">默认</Badge>
            <Badge tone="accent" accent="wing">主色</Badge>
            <Badge tone="warning" accent="seal">警告</Badge>
            <Badge tone="danger" dot>危险</Badge>
          </div>
        </div>

        {inkOnly && (
          <>
            <div>
              <Label>水墨装饰 · 仅 theme-ink 有</Label>
              <InkStroke className="bm-breath h-6" />
              <div className="mt-2 flex items-center gap-2">
                <Seal text="北" size="sm" />
                <Seal text="冥" size="sm" />
                <SealFrame className="h-7 w-7 text-[var(--bm-danger)]">印</SealFrame>
              </div>
            </div>

            <div>
              <Label>动效 · 呼吸 / 漂移 / 流光</Label>
              <div className="space-y-2">
                {/* 呼吸：印章慢慢起伏 */}
                <div className="flex items-center gap-3">
                  <Seal text="呼吸" size="sm" className="bm-breath" />
                  <span className="text-[0.625rem] text-[var(--bm-text-muted)]">bm-breath · 6s 循环</span>
                </div>
                {/* 漂移：图案在纸面上轻微移动 */}
                <div className="flex items-center gap-3">
                  <WhaleMark className="bm-drift h-6 w-12" />
                  <span className="text-[0.625rem] text-[var(--bm-text-muted)]">bm-drift · 14s 循环</span>
                </div>
                {/* 流光：一道光走过分隔线 */}
                <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-[var(--bm-border)]">
                  <div className="bm-shimmer absolute inset-y-0 left-0 w-1/2 text-[var(--bm-accent)]" />
                </div>
                <p className="text-[0.625rem] text-[var(--bm-text-muted)]">bm-shimmer · 2.6s 循环</p>
                {/* 淡光：主按钮待办态 */}
                <Button size="sm" variant="soft" className="bm-glow">bm-glow · 待办提示</Button>
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

/* ── 转场动效预览 ───────────────────────────────────── */

const MOTION_DEFS: { variant: FlipVariant; title: string; desc: string }[] = [
  { variant: 'vertical', title: '上下翻 · 日历式', desc: '绕上边框转，注册页从后面翻上来盖住登录页 —— 官网登录卡用的这个' },
  { variant: 'book', title: '书的左右翻页', desc: '绕左边框（书脊）转，右缘抬起向左翻过去' },
  { variant: 'cover', title: '覆盖翻页', desc: '不转 3D，新页带着左缘投影从右侧压进来（视频转场常用）' },
  { variant: 'windmill', title: '风车式选择翻阅', desc: '两面反向对转 + 缩放淡出淡入，适合在多个面板间切' },
  { variant: 'curl', title: '仿真书页', desc: '绕右边框翻起，带卷曲高光与折痕阴影，最像真纸' },
]

function MotionGallery() {
  const [state, setState] = useState<Record<string, boolean>>({})
  return (
    <section className="mb-8">
      <h2 className="mb-1 text-sm font-bold" style={{ fontFamily: 'var(--bm-font-display)' }}>
        FlipSurface · 五种翻页 / 转场
      </h2>
      <p className="mb-5 text-xs text-[var(--bm-text-muted)]">
        同一个组件、五个变体。点「翻」看动效；点两面任意位置也能翻。结构走 core，颜色走 token，
        所以下面每张卡都能同时在水墨与中性皮肤下成立。
      </p>

      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {MOTION_DEFS.map(({ variant, title, desc }) => {
          const flipped = !!state[variant]
          return (
            <div key={variant} className="overflow-hidden border border-[var(--bm-border)]"
                 style={{ borderRadius: 'var(--bm-radius, 14px)' }}>
              <div className="flex items-center justify-between gap-2 border-b border-[var(--bm-border)] bg-[var(--bm-surface)] px-3 py-2">
                <h3 className="text-xs font-bold">{title}</h3>
                <button
                  type="button"
                  onClick={() => setState((s) => ({ ...s, [variant]: !s[variant] }))}
                  className="shrink-0 border border-[var(--bm-border)] px-2 py-0.5 text-[0.6875rem] transition-colors hover:bg-[var(--bm-surface-hover)]"
                  style={{ borderRadius: 'var(--bm-radius-sm, 10px)' }}
                >
                  {flipped ? '翻回' : '翻'}
                </button>
              </div>

              {/* 舞台：给足内边距，纸翻到卡片外面时才看得见 */}
              <div className="bg-[var(--bm-bg)] px-4 py-6">
                <FlipSurface
                  variant={variant}
                  flipped={flipped}
                  height={200}
                  front={
                    <button
                      type="button"
                      onClick={() => setState((s) => ({ ...s, [variant]: true }))}
                      className="flex size-full flex-col items-center justify-center gap-1.5 p-4 text-center"
                    >
                      <span className="text-xs font-semibold">正面 · 登录</span>
                      <span className="text-[0.6875rem] text-[var(--bm-text-muted)]">点我翻过去 →</span>
                    </button>
                  }
                  back={
                    <button
                      type="button"
                      onClick={() => setState((s) => ({ ...s, [variant]: false }))}
                      className="flex size-full flex-col items-center justify-center gap-1.5 p-4 text-center"
                    >
                      <span className="text-xs font-semibold">背面 · 注册</span>
                      <span className="text-[0.6875rem] text-[var(--bm-text-muted)]">← 点我翻回来</span>
                    </button>
                  }
                />
              </div>

              <p className="border-t border-[var(--bm-border)] px-3 py-2 text-[0.6875rem] leading-relaxed text-[var(--bm-text-muted)]">
                {desc}
              </p>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-[0.6875rem] leading-relaxed text-[var(--bm-text-muted)]">
        实现要点：全部用 CSS transition 驱动 transform（不用 keyframes），
        切状态那一帧不碰布局属性，所以不会出现「两页一起塌回文档流」；
        绕边转 180° 后必须补同轴向位移把纸拉回原位（绕上边框 → <code>rotateX(-180deg) translateY(-100%)</code>，
        绕左边框 → <code>rotateY(-180deg) translateX(-100%)</code>，绕右边框 → <code>translateX(100%)</code>；符号与直觉相反，别照字面推），且位移要写在 rotate 之后。
      </p>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[0.6875rem] uppercase tracking-wider text-[var(--bm-text-muted)]">{children}</p>
}