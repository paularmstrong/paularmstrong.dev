import type { Builder, Handler } from 'onerepo';

export const command = 'astro';

export const description = 'Run Astro stuff in a fun fashion';

export const builder: Builder = (yargs) => yargs.usage(`$0 ${command}`);

export const handler: Handler = async (argv, { graph }) => {
	const { '--': rest = [] } = argv;

	await graph.packageManager.run({
		name: 'Run astro',
		cmd: 'astro',
		args: rest,
		opts: { stdio: 'inherit' },
	});
};
