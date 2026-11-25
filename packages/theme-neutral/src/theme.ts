/**
 * @beiming-ui/theme-neutral · 中性极简风格
 *
 * 这个包存在的意义不是给人用，而是**证明 core 真的没绑风格**：
 * 同一批 Button / Input / Card / Badge，换到这里就一点水墨味都没有 ——
 * 无衬线、无印章、无墨痕、圆角收紧到 6px、色板取中性灰 + 一点蓝。
 *
 * 如果哪天发现某个组件在中性风下不好看，那说明它偷偷带风格了，
 * 应该把风格部分挪回对应的 theme 包。
 */

import type { ThemeDefinition } from '@beiming-ui/core/tokens'

const FONT = '"Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif'

/** 亮色 */
export const neutralLight: ThemeDefinition = {
  name: 'neutral-light',
  label: '素 · 亮',
  mode: 'light',
  radius: '6px',
  fontBody: FONT,
  fontDisplay: FONT,
  tokens: {
    bg: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceSunken: '#F5F5F5',
    surfaceHover: '#F0F0F0',
    border: 'rgba(0, 0, 0, 0.09)',
    borderStrong: 'rgba(0, 0, 0, 0.20)',
    text: '#171717',
    textSecondary: '#4D4D4D',
    textMuted: '#7A7A7A',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    accentForeground: '#FFFFFF',
    danger: '#DC2626',
    success: '#059669',
    warning: '#D97706',
    ring: 'rgba(37, 99, 235, 0.30)',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
    shadowLg: '0 8px 24px rgba(0, 0, 0, 0.10)',
  },
}

/** 暗色 */
export const neutralDark: ThemeDefinition = {
  name: 'neutral-dark',
  label: '素 · 暗',
  mode: 'dark',
  radius: '6px',
  fontBody: FONT,
  fontDisplay: FONT,
  tokens: {
    bg: '#0A0A0A',
    surface: '#141414',
    surfaceSunken: '#0F0F0F',
    surfaceHover: '#1E1E1E',
    border: 'rgba(255, 255, 255, 0.09)',
    borderStrong: 'rgba(255, 255, 255, 0.20)',
    text: '#EDEDED',
    textSecondary: '#A3A3A3',
    textMuted: '#6F6F6F',
    accent: '#3B82F6',
    accentHover: '#60A5FA',
    accentForeground: '#FFFFFF',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    ring: 'rgba(59, 130, 246, 0.40)',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
    shadowLg: '0 8px 24px rgba(0, 0, 0, 0.6)',
  },
}

export const themes = [neutralLight, neutralDark]
export const defaultTheme = neutralLight.name
