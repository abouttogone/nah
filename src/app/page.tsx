'use client'

import 'vercel-toast/css'
import {createToast} from 'vercel-toast'

import {FiClipboard} from 'react-icons/fi'
import {BiCheckDouble} from 'react-icons/bi'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {ChangeEvent, useState} from 'react'

import InnerHTML from 'dangerously-set-html-content'
import {useInputFocusRef, useDebounce, useKeyPress, useClipboard} from '@poiler/utils'

export default function Home() {
	const focusedInput = useInputFocusRef()
	const [data, setdata] = useState([])
	const [loading, setLoading] = useState(false)

	const debouncedSearch = useDebounce(function handleSearch(query: string) {
		fetch(`https://search.brave.com/api/suggest?q=${query}&rich=false&source=web`)
			.then((e) => e.json())
			.then((e) => {
				setdata(e[1])
			})
			.catch(() => {
				createToast('Failed to fetch ❌ ! ', {timeout: 3000, type: 'dark'})
			})
			.finally(() => {
				setLoading(false)
			})
	}, 500)

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length <= 0) {
			return setdata([])
		}
		setLoading(true)
		debouncedSearch(e.target.value)
	}

	useKeyPress('Escape', () => {
		setdata([])
	})

	useKeyPress('/', () => {
		focusedInput.current?.focus()
	})

	return (
		<main className='h-screen flex items-center flex-col justify-center'>
			<div className='cont w-1/3'>
				<input
					placeholder='Press / to Search'
					onChange={handleChange}
					ref={focusedInput}
					type='text'
					className='bg-gray-900 border-2 outline-none rounded-lg p-2 w-full sticky top-5 h-12'
				/>

				<ul
					style={{opacity: data.length > 0 || loading ? 1 : 0}}
					className='bg-gray-900 w-full border-2 border-t-0 h-72 rounded-lg overflow-y-auto transition sticky top-[80px]'>
					{loading ? (
						<span className='w-full flex items-center justify-center h-full'>
							<AiOutlineLoading3Quarters size={30} className='animate-spin opacity-75' />
						</span>
					) : (
						data.map((e: string) => <UL key={e} query={focusedInput.current?.value!} text={e} />)
					)}
				</ul>
			</div>
		</main>
	)
}

const UL = ({text, query}: {text: string; query: string}) => {
	const {copied, copyToClipboard} = useClipboard()

	function handleCopy(text: string) {
		copyToClipboard(text)
		createToast('Text copied to clipboard ✅ ! ', {timeout: 3000, type: 'dark'})
	}

	return (
		<li
			key={text}
			onClick={() => {
				handleCopy(text)
			}}
			className=' group p-3 pr-5 flex justify-between items-center cursor-pointer hover:bg-gray-800'>
			<InnerHTML html={text.replaceAll(query, `<span>${query}</span>`)} />

			{copied ? (
				<BiCheckDouble className='transition opacity-0 group-hover:opacity-100' />
			) : (
				<FiClipboard className='transition opacity-0 group-hover:opacity-100' />
			)}
		</li>
	)
}
