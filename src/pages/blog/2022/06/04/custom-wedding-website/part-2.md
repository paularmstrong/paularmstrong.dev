---
layout: '~/layouts/BlogPost.astro'
title: 'Creating a modern wedding website in 2022 Part 2: Setting up the repository and Firebase'
description: Don’t go with those junk off-the-shelf websites with all the upsells on them. Make your wedding website yourself.
authors: paularmstrong
pubDate: 2022-06-12T00:00
tags:
  - parcel
  - preact
  - tailwindcss
  - firebase
draft: true
---

:::info[Multi-part series]

Previously in this series, we [introduced the reasoning and requirements](index.mdx) and [chose tools that we will use to build](part-1.mdx) our custom wedding website.

:::

## Create a bare repo

First, [initialize a blank repository on Github](https://github.com/new) and name it `wedding-app`. I chose to keep my repository private, just in case I accidentally push some personal info. Once that's created, set up your repo locally and connect it to the Github remote:

```bash
mkdir wedding-app
cd wedding-app
git init
git remote add origin git@github.com:YOURNAME/wedding-app.git
```

## Initializing Firebase

Setting up a Firebase project was _actually_ a delightful experience.

First, create the project in the [Firebase console](https://console.firebase.google.com/u/0/). This step just takes a couple clicks.

After creating the project in the Firebase console, you need to hook something up to actually deploy and work with configurations from the command-line.

If you don't have it already, install `firebase-tools` and log into the commandline interface:

```bash npm2yarn
npm install -g firebase-tools
firebase login
```

Once installed, we can log into firebase and initialize the database. Run the following command, select your project, and customize as you want. I didn't change any of the defaults to get started.

```bash
firebase init firestore
```

Next, we are going to want hosting, because it's free. Again, run the init and walk through the wizard.

```bash
firebase init hosting
```

From there, the initialization script actually walked through a few questions which didn't seem patronizing for a _wizard_. Then it noticed that the origin for my git repo pointed to Github, so it asked if I wanted to set up automated Github actions to deploy on merge to `main` and stage deploys for PRs. _Heck yes!_

<!-- truncate -->

## Setting up Parcel & Tailwindcss

```bash npm2yarn
npm install --save preact preact-router
npm install --save-dev autoprefixer parcel postcss tailwindcss
```

:::danger[Typescript]

I used Typescript, but you really don't have to. In fact, I didn't require that static types were correct at all. It was mostly just a helper to have automcomplete for working with Firebase. From here on out, I'll actually just strip all the types out and use `.js` & `.jsx` instead of `.ts` & `.tsx`.

:::

Next we need some basic setup for Parcel, Preact, and Tailwind. Create the following files following this structure, with copypasta contents to follow:

```
wedding-app/
├─ src/
│  ├─ index.html
│  ├─ index.css
│  └─ index.jsx
├─ package.json
└─ tailwind.config.js
```

<code>src/index.html</code> This will be the main entrypoint for Parcel to run its development server and build for production.

- Line 8: Parcel will pick up reference to your CSS files and compile them as necessary
- Line 11: This will be the root element that we use for the Preact application
- Line 12: Parcel will pick up references to JavaScript files (or Typescript) and compile them

```html title="src/index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Kelly & Paul’s wedding</title>

		// highlight-next-line
		<link rel="stylesheet" href="./index.css" />
	</head>
	<body>
		// highlight-start
		<div id="root"></div>
		<script type="module" src="./index.jsx"></script>
		// highlight-end
	</body>
</html>
```

### Tailwindcss

If you prefer a more in-depth setup, checkout [Tailwindcss‘s installation guide](https://tailwindcss.com/docs/installation).

```css title="src/index.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js title="tailwind.config.js"
module.exports = {
	content: ['./src/**/*.{html,ts,tsx}'],
};
```

```tsx title="src/index.jsx"
import { h, render } from 'preact';
import { App } from './App';

const root = document.getElementById('root');
render(<App />, root!);
```

```json title="package.json"
{
	"name": "wedding-app",
	"private": true,
	// highlight-start
	"scripts": {
		"start": "parcel src/index.html",
		"build": "rm -rf dist && NODE_ENV=production parcel build ./src/*.html --public-url /"
	}
	// highlight-end
}
```
