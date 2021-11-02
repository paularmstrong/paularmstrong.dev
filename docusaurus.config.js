module.exports = {
  title: "Paul Armstrong",
  tagline: "Personal site of Paul Armstrong",
  url: "https://paularmstrong.dev",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "paularmstrong", // Usually your GitHub org/user name.
  projectName: "paularmstrong.dev", // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    hideableSidebar: true,
    image: "img/og_image.png",
    navbar: {
      title: "Paul Armstrong",
      logo: {
        alt: "My Site Logo",
        src: "img/icon.png",
      },
      items: [
        { to: "blog", label: "Blog", position: "left" },
        { to: "pages/protips/index", label: "ProTips", position: "left" },
        { to: "pages/about", label: "About", position: "right" },
        {
          href: "https://github.com/paularmstrong",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      logo: {
        alt: "Paul Armstrong",
        src: "img/logo.svg",
      },
      links: [
        {
          title: "GitHub",
          items: [
            {
              html: `<a href="https://github.com/paularmstrong" target="_blank" rel="noopener noreferrer" aria-label="@paularmstrong on GitHub">@paularmstrong</a>`,
            },
          ],
        },
        {
          title: "Twitter",
          items: [
            {
              html: `<a href="https://twitter.com/paularmstrong" target="_blank" rel="noopener noreferrer" aria-label="@paularmstrong on Twitter">@paularmstrong</a>`,
            },
          ],
        },
        {
          title: "Twitch",
          items: [
            {
              html: `<a href="https://twitch.tv/paularmstrongdev" target="_blank" rel="noopener noreferrer" aria-label="@paularmstrongdev on Twitch">@paularmstrongdev</a>`,
            },
          ],
        },
        {
          title: "Youtube",
          items: [
            {
              html: `<a href="https://www.youtube.com/channel/UCo9XLvVgs9wFVP-S5gLyXwA" target="_blank" rel="noopener noreferrer" aria-label="@paularmstrongdev on Youtube">@paularmstrongdev</a>`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paul Armstrong`,
    },
  },
  themes: ["@docusaurus/theme-live-codeblock"],
  plugins: [
    ["@docusaurus/plugin-ideal-image", { disable: false }],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true,
        offlineModeActivationStrategies: ["appInstalled", "queryString"],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/icon.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json", // your PWA manifest
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "#3a57ab",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#3a57ab",
          },
          {
            tagName: "link",
            rel: "apple-touch-icon",
            href: "/img/icon.png",
          },
          {
            tagName: "link",
            rel: "mask-icon",
            href: "/img/logo.svg",
            color: "#3a57ab",
          },
          {
            tagName: "meta",
            name: "msapplication-TileImage",
            content: "/img/icon.png",
          },
          {
            tagName: "meta",
            name: "msapplication-TileColor",
            content: "#3a57ab",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "#3a57ab",
          },
        ],
      },
    ],
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexPages: true,
        docsRouteBasePath: "/pages",
        docsDir: "/pages",
        blogRouteBasePath: "/blog",
      },
    ],
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        debug: true,
        blog: {
          editUrl: "https://github.com/paularmstrong/paularmstrong.dev/edit/main/",
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Paul Armstrong. Built with Docusaurus.`,
          },
          remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn"), require("@fec/remark-a11y-emoji")],
        },
        docs: {
          editUrl: "https://github.com/paularmstrong/paularmstrong.dev/edit/main/",
          sidebarPath: require.resolve("./sidebars.js"),
          path: "pages",
          routeBasePath: "pages",
          remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn"), require("@fec/remark-a11y-emoji")],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  scripts: [
    {
      src: "//gc.zgo.at/count.js",
      async: true,
      "data-goatcounter": "https://paularmstrong.goatcounter.com/count",
    },
  ],
};
