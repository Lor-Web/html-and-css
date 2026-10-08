import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from '@/app/ThemeProvider'
import { AppRouter } from '@/app/router'

export default function App() {
  return (
    <JotaiProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </JotaiProvider>
  )
}
