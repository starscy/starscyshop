import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'

const pages = import.meta.glob('./Pages/**/*.vue')

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

        return resolvePageComponent(`./Pages/${name}.vue`, pages)
    },
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el)
    },
    progress: {
        color: '#4B5563',
    },
})
