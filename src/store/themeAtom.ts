import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { AppThemeMode } from '@/theme/antdTheme'

function getInitialTheme(): AppThemeMode {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('markup-lab:theme')
  if (saved === '"dark"' || saved === 'dark') return 'dark'
  if (saved === '"light"' || saved === 'light') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const themeModeAtom = atomWithStorage<AppThemeMode>(
  'markup-lab:theme',
  getInitialTheme(),
)

export const toggleThemeAtom = atom(null, (get, set) => {
  set(themeModeAtom, get(themeModeAtom) === 'light' ? 'dark' : 'light')
})
