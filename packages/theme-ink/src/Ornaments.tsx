/**
 * @beiming-ui/theme-ink · 水墨小图案
 *
 * 全部手写 SVG path，用 currentColor 着色，所以图案自动跟随当前皮肤的
 * text 色（配 opacity 做浓淡），不需要为每套皮肤单独准备素材。
 *
 * 这些是「水墨」这一风格专属的装饰，不属于通用组件。
 * 用别的风格（如中性风）时不需要它们 —— 这正是把它们留在 theme-ink
 * 而不是 core 的原因。
 *
 * 笔法约定（与官网现有 InkWashBg / InkBanner 一致）：
 * - 山、云、水用贝塞尔填充带或多层叠加，靠 opacity 拉开远近
 * - 竹、梅、鸟用 stroke，linecap round，像毛笔提按
 * - 一律 preserveAspectRatio 默认，靠外层给宽高
 *
 * 用法：
 *   <MountainRange className="h-24 w-full opacity-30" />
 *   <SealFrame className="size-10 text-[var(--bm-danger)]">冥</SealFrame>
 */

import type { ReactNode } from 'react'

interface OrnamentProps {
  className?: string
  /** 覆盖透明度（默认由各图案自己给浓淡） */
  opacity?: number
}

const svg = (path: ReactNode, viewBox: string, className: string) => (
  <svg
    viewBox={viewBox}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {path}
  </svg>
)

/* ───────────────────────── 山 ───────────────────────── */

/**
 * 远山三层。最淡的一层在最远，颜色靠 opacity 递进，
 * 三层的波形刻意不同步，叠起来才有空间感。
 */
export function MountainRange({ className = '', opacity }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 240 80"
      preserveAspectRatio="none"
      className={`text-[var(--bm-text)] ${className}`}
      aria-hidden="true"
    >
      <g fill="currentColor">
        {/* 远山：主峰靠右，山脊拉长 */}
        <path
          d="M0,80 C34,52 58,44 84,54 C110,64 130,34 156,30 C182,26 208,44 240,40 L240,80 Z"
          opacity={(opacity ?? 0.16)}
        />
        {/* 中山：峰位左移，与远山错开 */}
        <path
          d="M0,80 C26,62 52,58 78,66 C104,74 128,52 152,50 C180,48 210,62 240,58 L240,80 Z"
          opacity={(opacity ?? 0.16) * 1.9}
        />
        {/* 近山：只在底部起伏，压低不抢戏 */}
        <path
          d="M0,80 C40,74 72,78 108,75 C148,71 178,79 208,76 C222,74 232,77 240,75 L240,80 Z"
          opacity={(opacity ?? 0.16) * 3}
        />
      </g>
    </svg>
  )
}

/** 单峰剪影，用在卡片角上或空状态里当主角 */
export function PeakMark({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g fill="currentColor" opacity={opacity}>
      <path d="M4,68 C18,40 30,26 42,34 C50,40 54,50 62,56 C68,60 74,62 88,64 L88,68 Z" />
      <path d="M46,68 C58,52 70,44 82,50 C88,53 92,58 96,62 L96,68 Z" opacity="0.55" />
    </g>,
    '0 0 100 72',
    `text-[var(--bm-text)] ${className}`,
  )
}

/* ───────────────────────── 云 ───────────────────────── */

/**
 * 祥云：一串高低错落的云头，用 stroke 走笔，收笔略提。
 */
export function CloudScroll({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    >
      <path d="M8,34 C8,26 15,22 21,26 C21,17 31,14 35,21 C37,12 50,12 52,21 C59,17 68,23 65,31" />
      <path d="M65,31 C71,31 74,35 71,39 C68,42 60,42 52,41 C42,40 30,41 20,40 C12,39 6,37 6,33" opacity="0.75" />
    </g>,
    '0 0 80 48',
    `text-[var(--bm-text)] ${className}`,
  )
}

/** 双云错落，做页眉左侧的轻装饰 */
export function CloudPair({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity={opacity}>
      <path d="M4,26 C4,19 10,16 15,19 C15,12 23,10 26,16 C28,9 38,9 39,16 C45,13 52,18 49,24 C54,24 56,27 54,30" />
      <path d="M42,44 C42,39 47,36 50,39 C50,34 56,32 58,37 C60,32 68,32 69,37 C74,35 79,39 77,43" opacity="0.6" />
    </g>,
    '0 0 84 56',
    `text-[var(--bm-text)] ${className}`,
  )
}

/* ───────────────────────── 水 ───────────────────────── */

/** 水波：三条不同频率的波纹，做分隔与底纹 */
export function WaveLines({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={opacity}>
      <path d="M0,8 C8,2 16,14 24,8 C32,2 40,14 48,8 C56,2 64,14 72,8 C80,2 88,14 96,8 C104,2 112,14 120,8" />
      <path d="M0,18 C10,12 18,24 28,18 C38,12 46,24 56,18 C66,12 74,24 84,18 C94,12 102,24 112,18 C116,16 118,17 120,18" opacity="0.6" />
      <path d="M0,28 C12,23 20,33 32,28 C44,23 52,33 64,28 C76,23 84,33 96,28 C108,23 116,32 120,29" opacity="0.32" />
    </g>,
    '0 0 120 36',
    `text-[var(--bm-text)] ${className}`,
  )
}

/* ───────────────────────── 竹 ───────────────────────── */

/**
 * 竹：识别关键在「竹节」——竿在节处断开半格，节上一条短横，
 * 这是竹和普通树枝的区别。叶用两笔撇捺成"个"字，三组错落。
 */
export function Bamboo({ className = '', opacity = 1 }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 88 124"
      fill="none"
      className={`text-[var(--bm-text)] ${className}`}
      aria-hidden="true"
    >
      <g stroke="currentColor" fill="none" strokeLinecap="round" opacity={opacity}>
        {/* 主竿：三段，节处留 3px 空隙 —— 断竿才像竹 */}
        <path d="M34,120 L33,96" strokeWidth="3.6" />
        <path d="M33,93 L32,70" strokeWidth="3.6" />
        <path d="M32,67 L32,44" strokeWidth="3.4" />
        <path d="M32,41 L34,16" strokeWidth="3" />
        {/* 竹节横道：比竿略宽，出头两侧 */}
        <path d="M28.5,94.5 L37.5,94.5" strokeWidth="2.2" />
        <path d="M27.5,68.5 L36.5,68.5" strokeWidth="2.2" />
        <path d="M27.5,42.5 L36.5,42.5" strokeWidth="2.2" />
        {/* 副竿：细一半，节错开 */}
        <path d="M50,120 L49,100" strokeWidth="2.2" opacity="0.75" />
        <path d="M49,97 L48,74" strokeWidth="2.2" opacity="0.75" />
        <path d="M48,71 L48,50" strokeWidth="2" opacity="0.75" />
        <path d="M44.5,98.5 L53.5,98.5" strokeWidth="1.5" opacity="0.6" />
        <path d="M43.5,72.5 L52.5,72.5" strokeWidth="1.5" opacity="0.6" />

        {/* 叶：三组"个"字，右倾一组最大，左垂一组压角 */}
        <path d="M34,40 C46,26 62,18 74,16 C64,30 48,44 36,50 Z" fill="currentColor" stroke="none" opacity="0.92" />
        <path d="M34,50 C46,50 60,56 70,66 C54,68 40,62 33,54 Z" fill="currentColor" stroke="none" opacity="0.8" />
        <path d="M31,66 C18,54 4,52 0,56 C8,66 22,72 32,68 Z" fill="currentColor" stroke="none" opacity="0.62" />
        <path d="M50,48 C62,40 74,38 82,40 C74,50 60,54 51,52 Z" fill="currentColor" stroke="none" opacity="0.5" />
        <path d="M35,14 C44,6 54,3 60,4 C54,12 44,18 36,20 Z" fill="currentColor" stroke="none" opacity="0.45" />
      </g>
    </svg>
  )
}

/* ───────────────────────── 梅 ───────────────────────── */

/**
 * 梅：识别关键靠「五瓣」和「疏枝」。
 * 花瓣要够大（最大直径 26），且瓣间留缺口 —— 否则五瓣糊成一团圆。
 * 枝干一处顿挫，模拟梅枝的硬折。
 */
export function PlumBranch({ className = '', opacity = 1 }: OrnamentProps) {
  const flower = (cx: number, cy: number, r: number, key: string) => (
    <g key={key} transform={`translate(${cx} ${cy})`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy={-r * 0.72}
          rx={r * 0.5}
          ry={r * 0.66}
          fill="currentColor"
          opacity="0.92"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* 花蕊：中心实点 + 五点散蕊 */}
      <circle r={r * 0.22} fill="currentColor" opacity="0.35" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <circle
          key={`s${deg}`}
          cx={Math.cos(((deg - 90) * Math.PI) / 180) * r * 0.3}
          cy={Math.sin(((deg - 90) * Math.PI) / 180) * r * 0.3}
          r={r * 0.07}
          fill="currentColor"
          opacity="0.9"
        />
      ))}
    </g>
  )

  const bud = (cx: number, cy: number, r: number, rot: number, key: string) => (
    <ellipse
      key={key}
      cx={cx}
      cy={cy}
      rx={r * 0.58}
      ry={r}
      fill="currentColor"
      opacity="0.88"
      transform={`rotate(${rot} ${cx} ${cy})`}
    />
  )

  return (
    <svg
      viewBox="0 0 116 98"
      fill="none"
      className={`text-[var(--bm-text)] ${className}`}
      aria-hidden="true"
    >
      <g opacity={opacity}>
        {/* 主枝：起笔粗、中段一处顿挫、收笔细 */}
        <path
          d="M4,94 C20,84 34,70 44,56 C50,48 52,44 60,38 C70,30 82,20 94,12"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M44,56 C46,50 45,46 48,41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        {/* 三杈，越往上越细 */}
        <path d="M58,40 C68,38 78,32 84,24" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" opacity="0.85" />
        <path d="M80,26 C88,28 96,25 102,19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.72" />
        <path d="M26,78 C30,86 37,91 46,93" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.66" />

        {/* 四朵花：右上 13 是主角，其余递减 */}
        {flower(96, 8, 13, 'f1')}
        {flower(80, 32, 10.5, 'f2')}
        {flower(52, 48, 9, 'f3')}
        {flower(20, 70, 7.5, 'f4')}

        {/* 三个花苞 */}
        {bud(104, 22, 4, 30, 'b1')}
        {bud(64, 34, 3.4, -20, 'b2')}
        {bud(34, 56, 3.2, 45, 'b3')}
      </g>
    </svg>
  )
}

/* ───────────────────────── 月 ───────────────────────── */

/**
 * 残月：两段弧围成的月牙。
 *
 * 外弧 M(28,2) → (28,38)，R=18，sweep=1（顺时针），向右凸到 x=46。
 * 内弧 (28,38) → (28,2)，R=22，sweep=0（**逆时针**），也向右凸但只到 x≈37.4。
 * 两弧同向右凸、凸出量差 8.65，中间才留得下那道月牙。
 *
 * 这里踩过两次同一个坑：
 * ① 内弧半径 < 弦长一半（14.5 < 18）→ SVG 规范按最小直径处理，弧不成立，整块空白。
 * ② 内弧 sweep 写 1 → 内弧朝左凸，与右凸的外弧围成实心椭圆，看起来是满月。
 * 半径必须 ≥ 18；内弧 sweep 必须是 0。
 */
export function MoonCrescent({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <path
      d="M28,2 A18,18 0 0,1 28,38 A22,22 0 0,0 28,2 Z"
      fill="currentColor"
      opacity={opacity}
    />,
    '0 0 48 40',
    `text-[var(--bm-text)] ${className}`,
  )
}

/* ───────────────────────── 鸟 ───────────────────────── */

/** 飞鸟三只：只用一笔"人"字形，靠大小拉开远近 */
export function FlyingBirds({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g stroke="currentColor" strokeLinecap="round" fill="none" opacity={opacity}>
      <path d="M6,22 C11,14 15,13 19,18 M19,18 C23,13 27,14 32,22" strokeWidth="2" />
      <path d="M38,12 C42,6 45,5 48,9 M48,9 C51,5 54,6 58,12" strokeWidth="1.6" opacity="0.7" />
      <path d="M56,26 C58,22 60,21 62,24 M62,24 C64,21 66,22 68,26" strokeWidth="1.2" opacity="0.5" />
    </g>,
    '0 0 76 34',
    `text-[var(--bm-text)] ${className}`,
  )
}

/* ───────────────────────── 鲸 ───────────────────────── */

/**
 * 鲸：呼应北冥 logo。
 * 鲸和鱼在剪影上就差三点：头宽而钝（不是尖的）、尾鳍是「横向两瓣」、
 * 下颌到腹有一道长褶。这三点做出来，小尺寸下也不会读成鱼。
 */
export function WhaleMark({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g opacity={opacity}>
      {/* 身体：头端宽钝（左侧 x=14 处近乎垂直的下颌），向尾收细 */}
      <path
        d="M14,18 C14,12 20,8 30,8 C50,8 72,14 92,22 C98,24 100,27 98,31 C94,38 78,43 58,44 C36,45 20,41 15,34 C13,29 14,23 14,18 Z"
        fill="currentColor"
      />
      {/* 尾鳍：横向两瓣，中间 V 形缺口 —— 这是鲸而非鱼的关键 */}
      <path
        d="M98,26 C104,20 112,14 119,13 C115,21 109,26 100,29 Z"
        fill="currentColor"
      />
      <path
        d="M98,31 C105,33 112,38 118,44 C111,44 103,38 98,34 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* 背鳍：小三角，位于背中线偏后 */}
      <path d="M56,9 C59,4 64,3 66,6 C63,8 60,9 58,10 Z" fill="currentColor" opacity="0.78" />
      {/* 胸鳍：向下的一撇 */}
      <path d="M34,42 C36,48 42,52 48,52 C45,47 41,43 37,41 Z" fill="currentColor" opacity="0.72" />
      {/* 腹褶：三道平行弧，鲸的独有特征 */}
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.34">
        <path d="M18,34 C28,39 42,41 56,40" />
        <path d="M20,38 C30,42 44,43 58,42" />
        <path d="M24,41 C34,44 46,45 60,44" />
      </g>
    </g>,
    '0 0 124 56',
    `text-[var(--bm-text)] ${className}`,
  )
}

/* ───────────────────────── 印 ───────────────────────── */

/**
 * 印章框：外框粗、内框细，中间可放字。
 * 与 <Seal> 的区别在于这里是纯轮廓，适合叠在图片或大标题上。
 */
export function SealFrame({
  children,
  className = '',
  opacity = 1,
}: OrnamentProps & { children?: ReactNode }) {
  return (
    <span className={`relative inline-grid place-items-center ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 size-full"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" opacity={opacity}>
          <rect x="3" y="3" width="42" height="42" rx="3" strokeWidth="3" />
          <rect x="8.5" y="8.5" width="31" height="31" rx="1.5" strokeWidth="0.9" opacity="0.55" />
        </g>
      </svg>
      {children && (
        <span className="relative font-[var(--bm-font-display,serif)] text-[0.42em] leading-none tracking-widest">
          {children}
        </span>
      )}
    </span>
  )
}

/* ───────────────────────── 墨点 ───────────────────────── */

/**
 * 墨点：两层不规则轮廓叠出洇开的边，中心实、边缘散。
 */
export function InkSplat({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g fill="currentColor" opacity={opacity}>
      <path d="M18,4 C29,2 37,11 35,22 C34,32 26,38 18,35 C9,32 5,23 7,15 C9,8 13,5 18,4 Z" opacity="0.28" />
      <path d="M19,9 C27,7 33,14 31,22 C30,29 24,33 18,31 C12,29 9,22 11,16 C12,11 15,9 19,9 Z" opacity="0.75" />
      <circle cx="40" cy="9" r="1.6" opacity="0.5" />
      <circle cx="6" cy="30" r="1.1" opacity="0.4" />
    </g>,
    '0 0 44 40',
    `text-[var(--bm-text)] ${className}`,
  )
}

/* ───────────────────────── 笔触 ───────────────────────── */

/**
 * 一道斜笔，带飞白。
 * 主体一条粗线，旁侧两条细线是笔锋散开的毛，收笔处渐细。
 */
export function BrushStroke({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g stroke="currentColor" strokeLinecap="round" fill="none" opacity={opacity}>
      <path d="M6,66 C26,52 50,32 74,12" strokeWidth="7" opacity="0.9" />
      <path d="M14,70 C34,58 56,40 80,22" strokeWidth="2.4" opacity="0.45" />
      <path d="M2,58 C20,44 40,26 62,8" strokeWidth="1.6" opacity="0.3" />
      {/* 收笔的飞白：短促两笔 */}
      <path d="M78,10 C82,7 86,5 90,4" strokeWidth="1.8" opacity="0.6" />
      <path d="M76,16 C80,14 84,12 88,11" strokeWidth="1" opacity="0.35" />
    </g>,
    '0 0 96 76',
    `text-[var(--bm-text)] ${className}`,
  )
}

/* ───────────────────────── 角花 ───────────────────────── */

/**
 * 角花：贴在卡片/面板的一角。
 * 上一版只有一道弧，单看像钩子。这版按「贴角」来画：
 * 主弧从 (60,4) 起、经 (6,4) 拐过角点，再落到 (4,60) —— 正好包住左上角；
 * 弧内叠三片卷叶和一串小墨点，是中式角饰的常见构成。
 * 用时放在左上角，rotate 90/180/270 可复用到其余三角。
 */
export function CornerFlourish({ className = '', opacity = 1 }: OrnamentProps) {
  return svg(
    <g opacity={opacity}>
      {/* 主弧：包住左上角，两端渐细 */}
      <path
        d="M60,5 C34,5 12,14 6,34 C4,42 4,52 5,60"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* 内衬细弧，拉开层次 */}
      <path
        d="M50,11 C30,12 15,22 12,40 C11,47 11,54 12,60"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.42"
      />
      {/* 三片卷叶，沿弧向外翻 */}
      <path d="M30,8 C36,2 44,0 50,1 C46,7 40,11 33,13 Z" fill="currentColor" opacity="0.66" />
      <path d="M10,30 C4,34 1,42 2,49 C8,45 12,39 14,32 Z" fill="currentColor" opacity="0.58" />
      <path d="M22,14 C24,8 29,5 34,5 C32,10 28,14 23,16 Z" fill="currentColor" opacity="0.45" />
      {/* 墨点：沿弧散落，越靠角越密 */}
      <circle cx="18" cy="18" r="2.6" fill="currentColor" opacity="0.7" />
      <circle cx="9" cy="46" r="1.7" fill="currentColor" opacity="0.5" />
      <circle cx="46" cy="4" r="1.4" fill="currentColor" opacity="0.42" />
    </g>,
    '0 0 64 64',
    `text-[var(--bm-text)] ${className}`,
  )
}

/**
 * 全部图案一览，供文档与预览台调用。
 * 加新图案时记得也加进来，否则预览台看不到。
 */
export const ORNAMENTS = {
  MountainRange,
  PeakMark,
  CloudScroll,
  CloudPair,
  WaveLines,
  Bamboo,
  PlumBranch,
  MoonCrescent,
  FlyingBirds,
  WhaleMark,
  SealFrame,
  InkSplat,
  BrushStroke,
  CornerFlourish,
} as const