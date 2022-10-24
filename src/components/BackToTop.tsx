import type { Component } from 'solid-js';

export const BackToTop: Component = () => {
	// eslint-disable-next-line prefer-const
	let link: HTMLAnchorElement | undefined;
	let innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
	let scrollHeight = typeof window !== 'undefined' ? document.documentElement.scrollHeight : 0;
	let ticking = false;

	if (typeof window !== 'undefined') {
		document.addEventListener('scroll', () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					ticking = true;
					if (window.scrollY <= innerHeight / 2 || Math.round(innerHeight * 1.1 + window.scrollY) >= scrollHeight) {
						link!.classList.remove(...fixedClasses);
						link!.classList.add(...hiddenClasses);
						ticking = false;
					} else {
						link!.classList.add(...fixedClasses);
						link!.classList.remove(...hiddenClasses);
						ticking = false;
					}
				});
			}
		});

		window.addEventListener('resize', () => {
			window.requestAnimationFrame(() => {
				innerHeight = window.innerHeight;
				scrollHeight = document.documentElement.scrollHeight;
			});
		});
	}

	return (
		<a
			ref={link!}
			id="to-top"
			href="#top"
			class="fixed bottom-6 right-6 flex translate-y-full flex-col items-center rounded bg-slate-200/60 py-2 px-4 font-bold text-blue-600 opacity-0 shadow-lg outline-none ring-blue-600/70 backdrop-blur-md transition-all duration-700 ease-in-out focus:ring-4 dark:bg-slate-800/60 dark:text-blue-300"
			aria-label="Back to top"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="inline h-6 w-6 fill-current" aria-hidden>
				<path
					fill-rule="evenodd"
					d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
					clip-rule="evenodd"
				/>
			</svg>
			Top
		</a>
	);
};

const fixedClasses = 'opacity-1 translate-y-0'.split(' ');
const hiddenClasses = 'opacity-0 translate-y-full'.split(' ');
