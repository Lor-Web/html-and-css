import { App as AntApp, ConfigProvider } from 'antd'
import { useAtomValue } from 'jotai'
import { useEffect, type ReactNode } from 'react'
import { themeModeAtom } from '@/store/themeAtom'
import { getAntdTheme } from '@/theme/antdTheme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode = useAtomValue(themeModeAtom)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  return (
    <ConfigProvider theme={getAntdTheme(mode)} wave={{ disabled: false }}>
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  )
}
