module.exports = {
    title: 'Kea',
    tagline: 'Production ready State Management for React',
    url: 'https://kea.js.org',
    baseUrl: '/',
    favicon: 'img/favicon.ico',
    organizationName: 'keajs',
    projectName: 'kea',
    themeConfig: {
        navbar: {
            title: 'Kea',
            logo: {
                alt: 'Kea Logo',
                src: 'img/logo.svg',
            },
            links: [
                {
                    to: 'docs/installation',
                    activeBasePath: 'docs',
                    label: 'Docs',
                    position: 'left',
                },
                { to: 'blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/keajs/kea',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Installation',
                            to: 'docs/installation',
                        },
                        {
                            label: 'Writing plugins',
                            to: 'docs/writing-plugins',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/invite/docusaurus',
                        },
                    ],
                },
                {
                    title: 'Social',
                    items: [
                        {
                            label: 'Blog',
                            to: 'blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/keajs',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
}