module.exports = {
  title: 'Paul Armstrong',
  tagline: 'Personal site of Paul Armstrong',
  url: 'https://paularmstrong.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'paularmstrong', // Usually your GitHub org/user name.
  projectName: 'paularmstrong.dev', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: 'Paul Armstrong',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg'
      },
      links: [
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/paularmstrong',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/paularmstrong'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/paularmstrong'
            },
            {
              label: 'Twitch',
              href: 'https://twitch.tv/paularmstrongdev'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paul Armstrong. Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Paul Armstrong. Built with Docusaurus.`
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
