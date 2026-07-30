import './bootstrap'
import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'

import VideoBackground from '@/Layouts/VideoBackground.vue'

createInertiaApp({
    resolve: async (name) => {
        if (name === 'Auth/Login') {
            const page = await import('./Pages/Auth/Login.vue')
            return page.default
        }
        if (name === 'Auth/Register') {
            const page = await import('./Pages/Auth/Register.vue')
            return page.default
        }
        return resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'))
    },
    setup({ el, App, props, plugin }) {
        // Получаем videoUrl и posterUrl из пропсов страницы
        const videoUrl = props.initialPage.props?.videoUrl || '/videos/hero-bg.mp4'
        const posterUrl = props.initialPage.props?.posterUrl || '/images/hero-poster.webp'

        const app = createApp({
            render: () => h('div', { class: 'relative min-h-screen' }, [
                // Видео на уровне корня — живёт всё время
                h(VideoBackground, { videoUrl, posterUrl }),
                // Слот для страниц
                h(App, { ...props })
            ])
        })
            .use(plugin)
            .use(ZiggyVue)

        app.mount(el)
    },
    progress: {
        color: '#4B5563',
    },
})
