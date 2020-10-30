module.exports = {
  title: 'Paul Armstrong',
  tagline: 'Personal site of Paul Armstrong',
  url: 'https://paularmstrong.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'paularmstrong', // Usually your GitHub org/user name.
  projectName: 'paularmstrong.dev', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: 'Paul Armstrong',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: 'blog', label: 'Blog', position: 'left' },
        { to: 'pages/protips/index', label: 'ProTips', position: 'left' },
        { to: 'pages/about', label: 'About', position: 'right' },
        {
          href: 'https://github.com/paularmstrong',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'GitHub',
          items: [
            {
              html: `<a href="https://github.com/paularmstrong" target="_blank" rel="noopener noreferrer" aria-label="@paularmstrong on GitHub">@paularmstrong</a>`,
            },
          ],
        },
        {
          title: 'Twitter',
          items: [
            {
              html: `<a href="https://twitter.com/paularmstrong" target="_blank" rel="noopener noreferrer" aria-label="@paularmstrong on Twitter">@paularmstrong</a>`,
            },
          ],
        },
        {
          title: 'Twitch',
          items: [
            {
              html: `<a href="https://twitch.tv/paularmstrongdev" target="_blank" rel="noopener noreferrer" aria-label="@paularmstrongdev on Twitch">@paularmstrongdev</a>`,
            },
          ],
        },
        {
          title: 'Youtube',
          items: [
            {
              html: `<a href="https://www.youtube.com/channel/UCo9XLvVgs9wFVP-S5gLyXwA" target="_blank" rel="noopener noreferrer" aria-label="@paularmstrongdev on Youtube">@paularmstrongdev</a>`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paul Armstrong. Built with Docusaurus.`,
    },
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Paul Armstrong. Built with Docusaurus.`,
          },
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: 'pages',
          routeBasePath: 'pages',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
