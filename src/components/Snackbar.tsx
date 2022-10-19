import { createEffect, createSignal } from 'solid-js';
import type { Component } from 'solid-js';

interface Props {
	children: string;
}

export const Toast: Component<Props> = (props) => {
	return (
		<aside
			role="status"
			aria-relevant="additions"
			class="rounded bg-slate-300 px-6 py-4 text-slate-900 shadow dark:bg-slate-700 dark:text-slate-50"
		>
			<div aria-atomic="false">{props.children}</div>
		</aside>
	);
};

const [toasts, setToasts] = createSignal<Array<string>>([]);

export function addToast(text: string) {
	setToasts((prev) => {
		return [...prev, text];
	});
}

export function removeToast(text: string) {
	setToasts((prev) => {
		const next = [...prev];
		next.splice(toasts().indexOf(text), 1);
		return next;
	});
}

export const Snackbar: Component<void> = () => {
	const [current, setCurrent] = createSignal<string | null>(null);
	createEffect(() => {
		const visible = toasts()[0];
		if (!visible) {
			return;
		}

		setTimeout(() => {
			setCurrent(visible);
			setTimeout(() => {
				removeToast(visible);
				setCurrent(null);
			}, 5000);
		}, 100);
	});

	return (
		<div class="pointer-events-none fixed inset-0 z-10 flex items-end justify-center p-4 md:p-8">
			{current() ? <Toast>{current()!}</Toast> : null}
		</div>
	);
};
