/**
 * @beiming-ui/theme-netdisk
 *
 * 网盘特化：蓝紫主色、12px 圆角、无衬线。
 * 取值来自北冥云盘现有的 beiming-theme.json（Cloudreve 主题预设），
 * 这样网盘那边换用这套组件时配色能对上，不会出现两套蓝紫。
 *
 * 与官网的差别不只是配色：
 * - 圆角 8 → 12（Cloudreve/MUI 体系本身偏圆）
 * - 字体：无衬线（网盘信息密度高，衬线在小字号下发虚）
 * - accent 蓝紫 #5B6CFF，比官网的靛蓝更亮、更「工具感」
 */

import type { ThemeDefinition } from '@beiming-ui/core/tokens'

const FONT_BODY = '"Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif'
// 网盘不放衬线标题：文件列表、路径、大小这些要么数字要么西文，衬线会散
const FONT_DISPLAY = '"Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif'

/** 亮色（对应 beiming-theme.json 的 light） */
export const light: ThemeDefinition = {
  name: 'netdisk-light',
  label: '网盘·亮',
  mode: 'light',
  radius: '12px',
  fontBody: FONT_BODY,
  fontDisplay: FONT_DISPLAY,
  tokens: {
    bg: '#F5F6FA',
    surface: '#FFFFFF',
    surfaceSunken: '#FAFBFD',
    surfaceHover: '#EEF0F7',
    border: 'rgba(27, 31, 42, 0.08)',
    borderStrong: 'rgba(27, 31, 42, 0.18)',
    text: '#1B1F2A',
    textSecondary: '#5A6172',
    textMuted: '#878DA0',
    accent: '#5B6CFF',
    accentHover: '#4453D6',
    accentForeground: '#FFFFFF',
    danger: '#E5484D',
    success: '#30A46C',
    warning: '#F5A623',
    ring: 'rgba(91, 108, 255, 0.35)',
    shadow: '0 1px 3px rgba(27, 31, 42, 0.08)',
    shadowLg: '0 12px 32px rgba(27, 31, 42, 0.14)',
  },
}

/** 暗色（对应 beiming-theme.json 的 dark） */
export const dark: ThemeDefinition = {
  name: 'netdisk-dark',
  label: '网盘·暗',
  mode: 'dark',
  radius: '12px',
  fontBody: FONT_BODY,
  fontDisplay: FONT_DISPLAY,
  tokens: {
    bg: '#12141A',
    surface: '#1A1D25',
    surfaceSunken: '#0E1015',
    surfaceHover: '#242833',
    border: 'rgba(255, 255, 255, 0.09)',
    borderStrong: 'rgba(255, 255, 255, 0.18)',
    text: '#E8EAF0',
    textSecondary: '#9AA1B0',
    textMuted: '#6C7383',
    accent: '#7D8BFF',
    accentHover: '#A5B0FF',
    // 亮蓝底上用深字，对比度才够（原 json 里 contrastText 就是 #0d0f14）
    accentForeground: '#0D0F14',
    danger: '#FF6369',
    success: '#3DD68C',
    warning: '#FFB224',
    ring: 'rgba(125, 139, 255, 0.45)',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
    shadowLg: '0 16px 40px rgba(0, 0, 0, 0.55)',
  },
}

export const themes = [light, dark]
// 云盘主用浅色：文件列表、表格、路径这些高密度信息在浅底上更耐看，
// 也贴合 Cloudreve 默认给用户的第一观感（beiming-theme.json 的 light 档）。
export const defaultTheme = light.name