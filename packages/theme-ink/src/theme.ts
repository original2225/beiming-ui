/**
 * @beiming-ui/theme-ink · 水墨风格
 *
 * 北冥官网和云盘**共用这一套**。暗色给官网（首页大图需要暗底托住画面），
 * 浅色给云盘（文件列表、表格、路径这类高密度信息在浅底上更耐看）。
 *
 * 两者不是两个品牌的两套皮肤，而是同一风格的两个明暗档 ——
 * 所以组件、圆角、字体、墨痕印章全部一致，只有色值不同。
 */

import type { ThemeDefinition } from '@beiming-ui/core/tokens'

const FONT_BODY = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif'
const FONT_DISPLAY = '"Noto Serif SC", "Songti SC", "SimSun", "STSong", serif'

/** 墨 · 暗色档 */
export const ink: ThemeDefinition = {
  name: 'ink-dark',
  label: '墨',
  mode: 'dark',
  radius: '8px',
  fontBody: FONT_BODY,
  fontDisplay: FONT_DISPLAY,
  tokens: {
    bg: '#1A1A1A',
    surface: '#2D2D2D',
    surfaceSunken: '#242424',
    surfaceHover: '#3D3D3D',
    border: 'rgba(247, 245, 240, 0.08)',
    borderStrong: 'rgba(247, 245, 240, 0.18)',
    text: '#F7F5F0',
    textSecondary: '#B8B3A8',
    textMuted: '#7A7A7A',
    accent: '#2E5A6B',
    accentHover: '#3D7488',
    accentForeground: '#F7F5F0',
    danger: '#B93A3A',
    success: '#4A9B7F',
    warning: '#B87333',
    ring: 'rgba(46, 90, 107, 0.55)',
    shadow: '0 4px 16px rgba(0, 0, 0, 0.28)',
    shadowLg: '0 18px 48px rgba(0, 0, 0, 0.45)',
  },
}

/** 纸 · 浅色档 */
export const rice: ThemeDefinition = {
  name: 'ink-light',
  label: '纸',
  mode: 'light',
  radius: '8px',
  fontBody: FONT_BODY,
  fontDisplay: FONT_DISPLAY,
  tokens: {
    bg: '#F7F5F0',
    surface: '#EDF1F4',
    surfaceSunken: '#FFFFFF',
    surfaceHover: '#E3E9ED',
    border: 'rgba(46, 90, 107, 0.18)',
    borderStrong: 'rgba(46, 90, 107, 0.32)',
    text: '#1F2A30',
    textSecondary: '#4A5A64',
    textMuted: '#6B7B85',
    accent: '#2E5A6B',
    accentHover: '#3D7488',
    accentForeground: '#F7F5F0',
    danger: '#B93A3A',
    success: '#3F7F68',
    warning: '#B87333',
    ring: 'rgba(46, 90, 107, 0.35)',
    shadow: '0 1px 3px rgba(31, 42, 48, 0.10)',
    shadowLg: '0 18px 48px rgba(31, 42, 48, 0.18)',
  },
}

export const themes = [ink, rice]
/** 官网默认暗色 */
export const defaultDark = ink.name
/** 云盘默认浅色 */
export const defaultLight = rice.name
export const defaultTheme = ink.name
