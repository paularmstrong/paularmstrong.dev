import { run } from 'onerepo';
import type { Builder, Handler } from 'onerepo';

export const command = ['start', 'dev'];

export const description = 'Run the Netlify dev server';

export const builder: Builder = (yargs) => yargs.usage(`$0 ${command[0]}`);

export const handler: Handler = async (argv) => {
	const { '--': rest = [] } = argv;

	const [bin] = await run({
		name: 'Get netlify bin',
		cmd: 'yarn',
		args: ['bin', 'ntl'],
		runDry: true,
	});

	await run({
		name: 'Run the server',
		cmd: bin,
		args: ['dev', '--filter', 'paularmstrong-dev', ...rest],
		opts: {
			stdio: 'inherit',
		},
		runDry: true,
	});
};
