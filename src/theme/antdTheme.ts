import type { ThemeConfig } from 'antd'
import { theme as antdTheme } from 'antd'

export type AppThemeMode = 'light' | 'dark'

const shared: ThemeConfig = {
  token: {
    fontFamily: "'Manrope', system-ui, sans-serif",
    borderRadius: 10,
    wireframe: false,
  },
  components: {
    Button: {
      controlHeight: 40,
      fontWeight: 600,
    },
    Card: {
      paddingLG: 20,
    },
    Menu: {
      itemBorderRadius: 10,
    },
  },
}

export function getAntdTheme(mode: AppThemeMode): ThemeConfig {
  const isDark = mode === 'dark'

  return {
    ...shared,
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      ...shared.token,
      colorPrimary: isDark ? '#ff7a45' : '#f06529',
      colorInfo: isDark ? '#5b8cff' : '#2965f1',
      colorSuccess: isDark ? '#34d399' : '#1f9d6a',
      colorBgBase: isDark ? '#0f141c' : '#eef2f7',
      colorBgContainer: isDark ? '#171e2a' : '#ffffff',
      colorTextBase: isDark ? '#e8eef8' : '#1a2332',
      colorBorder: isDark ? 'rgba(232, 238, 248, 0.12)' : 'rgba(26, 35, 50, 0.1)',
    },
  }
}
