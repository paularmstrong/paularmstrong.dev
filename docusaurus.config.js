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
        { to: 'pages/about', label: 'About', position: 'left' },
        {
          href: 'https://github.com/paularmstrong',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/paularmstrong',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/paularmstrong',
            },
            {
              label: 'Twitch',
              href: 'https://twitch.tv/paularmstrongdev',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UCo9XLvVgs9wFVP-S5gLyXwA',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paul Armstrong. Built with Docusaurus.`,
    },
  },
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
