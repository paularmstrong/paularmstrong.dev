import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import { SITE_URL } from '../config';

interface Props {
	text: string;
	title: string;
	url: string;
}

export const Share: Component<Props> = (props) => {
	const [shared, setShared] = createSignal(false);
	const type = typeof window !== 'undefined' && typeof navigator?.share === 'function' ? 'share' : 'copy';

	const toggle = async () => {
		if (typeof navigator.share === 'function') {
			await navigator.share({
				text: props.text,
				title: props.title,
				url: props.url,
			});
		} else {
			navigator.clipboard.writeText(`${SITE_URL}${props.url}`);
		}
		setShared(true);
		setTimeout(() => {
			setShared(false);
		}, 5_000);
	};

	return (
		<div
			role="button"
			aria-label="auto"
			aria-live="polite"
			class="flex flex-row items-center gap-1 rounded py-2 px-4 font-bold text-blue-600 hover:bg-blue-400/20 hover:text-blue-800 dark:text-blue-200 dark:hover:bg-blue-500/20 dark:hover:text-blue-100"
			onClick={toggle}
		>
			{shared() ? (
				<>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
						<path
							fill-rule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
							clip-rule="evenodd"
						/>
					</svg>
					{type === 'share' ? 'Shared!' : 'Copied'}
				</>
			) : (
				<>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
						<path
							fill-rule="evenodd"
							d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
							clip-rule="evenodd"
						/>
					</svg>
					Share
				</>
			)}
		</div>
	);
};
