import {create} from 'zustand'

interface themeContext {
	theme: 'light' | 'dark'
	setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<themeContext>((set) => ({
	theme: 'dark',
	setTheme: (theme) => {
		set({theme: theme})
	},
}))
