import { run } from 'onerepo';
import type { Builder, Handler } from 'onerepo';

export const command = 'astro';

export const description = 'Run Astro stuff in a fun fashion';

export const builder: Builder = (yargs) => yargs.usage(`$0 ${command}`);

export const handler: Handler = async (argv) => {
	const { '--': rest = [] } = argv;

	const [bin] = await run({
		name: 'Get Astro',
		cmd: 'yarn',
		args: ['bin', 'astro'],
		runDry: true,
	});

	await run({
		name: 'Run astro',
		cmd: bin,
		args: rest,
		opts: { stdio: 'inherit' },
	});
};
