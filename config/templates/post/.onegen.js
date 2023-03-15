import { fileURLToPath } from 'node:url';
import path from 'node:path';

function slugify(str) {
	return str
		.replace(/[^A-Za-z0-9 -]+/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase();
}

export default {
	outDir: ({ name }) => path.join(fileURLToPath(import.meta.url), '..', '..', '..', '..', 'blog'),
	prompts: [
		{
			name: 'title',
			type: 'input',
			message: 'What is the title of the post?',
		},
		{
			name: 'slug',
			type: 'input',
			message: 'What should the post slug be?',
			default: ({ title }) => slugify(title),
			transformer: (input) => slugify(input),
		},
		{
			name: 'description',
			message: 'What is the post’s description?',
		},
		{
			name: 'pubDate',
			message: 'When do you want this published?',
			type: 'input',
			default: () => new Date().toISOString().split('T')[0],
		},
	],
};
