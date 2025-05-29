import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: '🐢Turtle 个人写作平台',
    tagline: '大道至简',
    favicon: 'img/favicon.ico',

    // 在此处设置您网站的生产url
    url: 'https://turtle.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/turtle/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'xilio1', // Usually your GitHub org/user name.
    projectName: 'turtle', // Usually your repo name.
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh',
        locales: ['en', 'zh'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/xilio1/turtle/tree/main',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    //editUrl: '',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/logo.svg',
        navbar: {
            title: 'Turtle个人写作平台',
            logo: {
                alt: 'turtle Logo',
                src: 'img/logo.svg',
            },
            items: [
                // {
                //     type: 'docSidebar',
                //     sidebarId: 'javaSidebar',
                //     position: 'left',
                //     label: 'Java',
                // },

            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: '友情链接',
                    items: [
                        {
                            label: '博客站点',
                            href: 'https://www.xilio.cn',
                        },
                    ],
                },
                {
                    title: '更多',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/xilio1/',
                        },
                        {
                            label: 'Gitee',
                            href: 'https://gitee.com/xilio',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} xilio`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
