<script setup>
import { ref, onMounted } from 'vue'
import { Head } from '@inertiajs/vue3'

const props = defineProps({
    videoUrl: String,
    posterUrl: String
})

const videoError = ref(false)

// Обработка ошибки загрузки видео (фолбэк на заглушку)
const handleVideoError = () => {
    console.warn('Video failed to load, showing poster')
    videoError.value = true
}

onMounted(() => {
    // Опционально: предзагрузка видео для ускорения
    // const link = document.createElement('link')
    // link.rel = 'preload'
    // link.as = 'video'
    // link.href = props.videoUrl
    // document.head.appendChild(link)
})
</script>

<template>
    <Head title="Главная | Барахолка Серпухов" />

    <!-- Контейнер на весь экран -->
    <div class="relative h-screen w-full overflow-hidden bg-gray-900">

        <!-- Видео фон -->
        <video
            src="http://localhost:8080/videos/hero-bg.mp4"
            v-if="!videoError"
            class="absolute inset-0 w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
            :poster="posterUrl"
            @error="handleVideoError"
        >
            <source :src="videoUrl" type="video/mp4" />
            Ваш браузер не поддерживает видео.
        </video>

        <!-- Фолбэк: затемнение если видео не загрузилось -->
        <div
            v-if="videoError || !videoUrl"
            class="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
        />

        <!-- Затемняющий оверлей (для читаемости текста) -->
        <div class="absolute inset-0 bg-black/40 dark:bg-black/60" />

        <!-- Контент по центру -->
        <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
                Добро пожаловать
            </h1>
            <p class="text-lg md:text-xl text-gray-100 max-w-2xl mb-8 drop-shadow-md">
                Лучшие товары в Серпухове. Быстро. Удобно. Надёжно.
            </p>

            <!-- Кнопки действий (Flowbite-style) -->
            <div class="flex flex-col sm:flex-row gap-4">
                <a
                    href="/products"
                    class="inline-flex justify-center items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition"
                >
                    Смотреть каталог
                </a>
                <a
                    href="/login"
                    class="inline-flex justify-center items-center px-6 py-3 text-base font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition"
                >
                    Войти
                </a>
            </div>
        </div>

        <!-- Скролл-индикатор (опционально) -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <svg class="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
        </div>
    </div>

    <!-- Секция под видео (если нужен контент ниже) -->
    <!-- <main class="relative z-10 bg-white dark:bg-gray-900 py-16"> ... </main> -->
</template>
