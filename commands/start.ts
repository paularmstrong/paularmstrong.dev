import type { Builder, Handler } from 'onerepo';

export const command = ['start', 'dev'];

export const description = 'Run the Netlify dev server';

export const builder: Builder = (yargs) => yargs.usage(`$0 ${command[0]}`);

export const handler: Handler = async (argv, { graph }) => {
	const { '--': rest = [] } = argv;

	await graph.packageManager.run({
		name: 'Run the server',
		cmd: 'ntl',
		args: ['dev', '--filter', 'paularmstrong-dev', ...rest],
		opts: {
			stdio: 'inherit',
		},
		runDry: true,
	});
};
