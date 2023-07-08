'use client'

import {useThemeStore} from '@/app/store/theme'
import React from 'react'

export default function Navbar() {
	const {theme, setTheme} = useThemeStore()

	function handleClick() {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<>
			<button
				onClick={handleClick}
				className='ml-auto block px-7 py-3 mt-2 mr-2 rounded-lg  bg-slate-700 hover:bg-slate-600'>
				Change it !
			</button>
		</>
	)
}
