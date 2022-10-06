import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';

type Theme = 'light' | 'dark' | 'auto' | 'auto-dark' | 'auto-light';
const themes: Array<Partial<Theme>> = ['light', 'dark', 'auto'];

export const ThemeSwitcher: Component = () => {
	const [theme, setTheme] = createSignal<Theme | null>(null);

	onMount(() => {
		setTheme((localStorage?.getItem('theme') as Theme) || 'auto');
	});

	createEffect(() => {
		const t = theme();
		if (!t) {
			return;
		}
		localStorage.setItem('theme', t);
		if (t.endsWith('dark')) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	});

	const toggle = () => {
		const t = theme();
		if (!theme()) {
			return;
		}
		if (t?.startsWith('auto')) {
			setTheme('light');
			return;
		}

		let idx = t ? themes.indexOf(t) : -1;
		idx = idx === themes.length - 1 ? 0 : idx + 1;
		setTheme(themes[idx] as Theme);
	};

	createEffect(() => {
		if (!theme()?.startsWith('auto')) {
			return;
		}

		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('auto-dark');
		} else {
			setTheme('auto-light');
		}

		const listener = (event: MediaQueryListEvent) => {
			setTheme(event.matches ? 'auto-dark' : 'auto-light');
		};

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);

		onCleanup(() => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
		});
	});

	return (
		<div
			role="button"
			aria-label="auto"
			aria-live="polite"
			title="Toggle site theme"
			class="flex flex-row items-center gap-1 rounded py-2 px-4 font-bold text-blue-600 hover:bg-blue-400/20 hover:text-blue-800 dark:text-blue-100 dark:hover:bg-blue-50/20"
			onClick={toggle}
		>
			{theme()?.startsWith('auto') ? (
				<>{theme() === 'auto-light' ? <Sun /> : <Moon />} Auto</>
			) : theme() === 'dark' ? (
				<>
					<Moon /> Dark
				</>
			) : (
				<>
					<Sun /> Light
				</>
			)}
		</div>
	);
};

const Sun: Component = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
		<path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
	</svg>
);

const Moon: Component = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
		<path
			fill-rule="evenodd"
			d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
			clip-rule="evenodd"
		/>
	</svg>
);
