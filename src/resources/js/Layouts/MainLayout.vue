<script setup>
import { Head } from '@inertiajs/vue3'
import VideoBackground from './VideoBackground.vue'
import { usePage } from '@inertiajs/vue3'

const props = defineProps({
    videoUrl: String,
    posterUrl: String,
    // Дефолтные значения только если страница не передала свои
    title: {
        type: String,
        default: 'Караваев Вадим | Портфолио Fullstack разработчика'
    },
    description: {
        type: String,
        default: 'Портфолио разработчика Караваева Вадима. Laravel, Vue, Docker. Создаю современные веб-приложения.'
    }
})
</script>

<template>
    <div class="relative min-h-screen">
        <Head>
            <!-- Используем переданный title, если есть -->
            <title>{{ title }}</title>
            <meta name="description" :content="description" />

            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta name="theme-color" content="#1f2937" />
            <meta name="format-detection" content="telephone=no" />

            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="website" />
            <meta property="og:title" :content="title" />
            <meta property="og:description" :content="description" />
            <meta property="og:image" content="/images/og-image.jpg" />
            <meta property="og:url" content="https://starscy.ru" />

            <!-- Twitter -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" :content="title" />
            <meta name="twitter:description" :content="description" />
            <meta name="twitter:image" content="/images/og-image.jpg" />

            <!-- Robots -->
            <meta name="robots" content="index, follow" />
            <meta name="yandex" content="index, follow" />

            <!-- Canonical -->
            <link rel="canonical" href="https://starscy.ru" />

            <!-- Favicon -->
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>

        <Transition name="page" mode="out-in">
            <div class="relative z-10" :key="$page.url">
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style>
/* Теперь name="fade" совпадает с классами */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
