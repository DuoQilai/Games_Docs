import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Gaming on RISC-V",
    description: "本手册包含了如何在RISC-V开发板上运行游戏",
    base: "/Games_Docs/",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/home/' },
            { text: '文档', link: '/home/Report_LicheePi4A_Celeste' }
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
