<script setup>
import {onMounted, ref} from 'vue'
import { Head } from '@inertiajs/vue3'

const props = defineProps({
    videoUrl: String,
    posterUrl: String
})

const videoError = ref(false)

const handleVideoError = () => {
    console.warn('Video failed to load')
    videoError.value = true
}


onMounted(() => {
    console.log('videoUrl:', props.videoUrl)
    console.log('posterUrl:', props.posterUrl)
})
</script>

<template>
    <Head title="Главная | Барахолка Серпухов"/>

    <div class="relative h-screen w-full overflow-hidden bg-gray-900">
        <!-- Видео через динамический :src, не статический src -->
        <video
            v-if="!videoError && videoUrl"
            :src="videoUrl"
            class="absolute inset-0 w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
            :poster="posterUrl"
            @error="handleVideoError"
        />

        <!-- Фолбэк -->
        <div
            v-if="videoError || !videoUrl"
            class="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
        />

        <div class="absolute inset-0 bg-black/40 dark:bg-black/60"/>

        <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
                Добро пожаловать
            </h1>
            <p class="text-lg md:text-xl text-gray-100 max-w-2xl mb-8 drop-shadow-md">
                Лучшие товары в Серпухове. Быстро. Удобно. Надёжно.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
                <a
                    href="/products"
                    class="inline-flex justify-center items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                    Смотреть каталог
                </a>
                <a
                    href="/login"
                    class="inline-flex justify-center items-center px-6 py-3 text-base font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition"
                >
                    Войти
                </a>
            </div>
        </div>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <svg class="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
        </div>
    </div>
</template>
