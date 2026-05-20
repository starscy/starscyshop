<script setup>
import { Head } from '@inertiajs/vue3'
import VideoBackground from './VideoBackground.vue'
import {onMounted} from "vue";

const props = defineProps({
    videoUrl: String,
    posterUrl: String,
    title: {
        type: String,
        default: 'Барахолка Серпухов'
    },
    description: {
        type: String,
        default: 'Лучшие товары в Серпухове. Покупайте и продавайте с удовольствием. Тысячи объявлений от местных продавцов.'
    }
})

onMounted(() => {
    const videoUrl = 'https://starscy.ru/videos/hero-bg.mp4'
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'video'
    link.href = videoUrl
    document.head.appendChild(link)
})
</script>

<template>
    <div class="relative min-h-screen">
        <Head>
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

        <VideoBackground :video-url="videoUrl" :poster-url="posterUrl" />
        <div class="relative z-10">
            <slot />
        </div>
    </div>
</template>
