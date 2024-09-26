import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Vitepress Template",
    description: "A VitePress Site",
    base: "/Games_Docs/",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: generateSidebar({
            useTitleFromFrontmatter: true,
            useTitleFromFileHeading: true,
            hyphenToSpace: true,
        }),

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
