const path = require("path");

module.exports = {
  title: "Paul Armstrong",
  tagline: "Random thoughts from a Software Engineer specializing in Node.js, JavaScript, and all things web.",
  url: "https://paularmstrong.dev",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "paularmstrong", // Usually your GitHub org/user name.
  projectName: "paularmstrong.dev", // Usually your repo name.
  themeConfig: {
    // colorMode: {
    //   disableSwitch: true,
    // },
    image: "img/og_image.png",
    navbar: {
      title: "Paul Armstrong",
      style: "primary",
      logo: {
        alt: "My Site Logo",
        src: "img/icon.png",
      },
      items: [
        { to: "blog", label: "Blog", position: "left" },
        { to: "pages/about", label: "About", position: "right" },
        {
          href: "https://github.com/paularmstrong",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    sidebar: {
      hideable: true,
    },
    footer: {
      logo: {
        alt: "Paul Armstrong",
        src: "img/logo.svg",
      },
      links: [
        {
          label: "Github @paularmstrong",
          href: "https://github.com/paularmstrong",
        },
        {
          label: "Twitter @paularmstrong",
          href: "https://twitter.com/paularmstrong",
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
      path.resolve(__dirname, "./plugins/goat"),
      {
        goatcounter: "https://paularmstrong.goatcounter.com/count",
      },
    ],
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexPages: true,
        docsRouteBasePath: "/pages",
        docsDir: "pages",
        blogRouteBasePath: "/blog",
      },
    ],
    [
      "./plugins/blog",
      {
        id: "blog",
        routeBasePath: "/blog",
        path: "./blog",
        editUrl: "https://github.com/paularmstrong/paularmstrong.dev/edit/main/",
        feedOptions: {
          type: "all",
          copyright: `Copyright © ${new Date().getFullYear()} Paul Armstrong. Built with Docusaurus.`,
        },
        remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn"), require("@fec/remark-a11y-emoji")],
      },
    ],
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        debug: true,
        blog: false,
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
  scripts: [],
};
