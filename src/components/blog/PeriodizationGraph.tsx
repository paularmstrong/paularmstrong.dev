import { onMount, createSignal } from 'solid-js';
import clsx from 'clsx';

const bars: Record<string, { height: string; title: string }> = {
	base: { height: 'h-[33%]', title: 'Base' },
	build: { height: 'h-[100%]', title: 'Build' },
	specialization: { height: 'h-[75%]', title: 'Specialization' },
	maintenance: { height: 'h-[45%]', title: 'Maintenance' },
	recovery: { height: 'h-[10%]', title: 'Recovery' },
} as const;

export function PeriodizationGraph() {
	let containerRef: HTMLDivElement;
	let listRef: HTMLUListElement;
	const [getHighlighted, setHighlighted] = createSignal<keyof typeof bars | void>();
	const graphObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const atTop = entry.intersectionRatio < 0.8;
				containerRef.classList.toggle('pt-28', atTop);
				containerRef.classList.toggle('md:pt-32', atTop);
				listRef.classList.toggle('md:h-32', atTop);
				listRef.classList.toggle('h-20', atTop);
				listRef.classList.toggle('h-48', !atTop);
				listRef.classList.toggle('md:h-64', !atTop);
				if (entry.intersectionRatio >= 1) {
					setHighlighted();
				}
			});
		},
		{ threshold: [0, 0.5, 0.6, 0.7, 0.8, 0.9, 1], rootMargin: '0px 0px 0px 0px' },
	);

	onMount(() => {
		graphObserver.observe(containerRef);
		document.querySelector('html')!.classList.add('scroll-pt-28', 'md:scroll-pt-36');
		const sections = document.querySelectorAll(
			Object.keys(bars)
				.map((k) => `#${k}`)
				.join(','),
		);

		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.find((entry) => {
					if (entry.isIntersecting) {
						setHighlighted(entry.target.id);
						return;
					}
				});
			},
			{ rootMargin: `100px 0px -${Math.max(window.innerHeight - 300, 0)}px 0px`, threshold: 0.1 },
		);
		sections.forEach((s) => sectionObserver.observe(s));

		const endObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const atEnd = entry.isIntersecting;

					if (atEnd) {
						setHighlighted();
					}

					containerRef.classList.toggle('-top-24', !atEnd);
					containerRef.classList.toggle('md:-top-32', !atEnd);
					containerRef.classList.toggle('-top-64', !!atEnd);
				});
			},
			{ rootMargin: `${window.innerHeight * 3}px 0px -${Math.max(window.innerHeight - 300, 0)}px 0px`, threshold: 0.1 },
		);
		endObserver.observe(document.getElementById('periodization-end')!);
	});

	return (
		<div class="not-prose contents">
			<figure
				ref={containerRef!}
				class="sticky -top-24 z-10 flex h-48 w-full flex-col items-end border-b border-slate-300 bg-slate-100/80 py-4 backdrop-blur-sm transition-all duration-200 dark:border-slate-700 dark:bg-slate-900/70 md:-top-32 md:h-64"
			>
				<ul
					class="flex h-48 w-full items-end gap-x-2 pb-8 pt-2 transition-all duration-200 md:h-64 md:gap-x-4 md:pt-4"
					ref={listRef!}
				>
					{Object.entries(bars).map(([key, { height, title }]) => (
						<Bar height={height} href={`#${key}`} highlighted={getHighlighted() === key}>
							{title}
						</Bar>
					))}
				</ul>
			</figure>
		</div>
	);
}

interface BarProps {
	children: string;
	height: string;
	highlighted: boolean;
	href: string;
}

function Bar(props: BarProps) {
	return (
		<li
			class={clsx(
				'relative grow transition-all duration-200',
				props.height,
				props.highlighted ? 'basis-[40%]' : 'basis-[15%]',
			)}
			aria-current={props.highlighted ? 'step' : false}
		>
			<a
				class={clsx(
					'absolute inset-0 flex items-end justify-center rounded transition-all duration-200 hover:bg-teal-500/60 dark:hover:bg-teal-300/80',
					props.highlighted
						? 'bg-teal-500 text-lg dark:bg-teal-300'
						: 'bg-teal-300/60 text-xs dark:bg-teal-300/70 md:text-sm',
				)}
				href={props.href}
			>
				<span class="relative top-8 block font-bold text-black dark:text-white">{props.children}</span>
			</a>
		</li>
	);
}
