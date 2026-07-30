import './bootstrap'
import '../css/app.css'

import {computed, createApp, h} from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'
import {useTheme} from "@/Composables/styles/useTheme.js";
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
        const { videoByTime } = useTheme()

        // Создаём реактивный computed, который возвращает строку пути
        const videoUrl = computed(() => videoByTime.value)

        const posterUrl = '/images/hero-poster.webp'

        const app = createApp({
            render: () => h('div', { class: 'relative min-h-screen' }, [
                h(VideoBackground, { videoUrl: videoUrl.value, posterUrl }),
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
