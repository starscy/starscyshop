<script setup>
import { onMounted, ref } from 'vue'
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
        <!-- Видео фон -->
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

        <!-- Затемнение -->
        <div class="absolute inset-0 bg-black/50 dark:bg-black/70" />

        <!-- Контент -->
        <div class="relative z-10 flex flex-col items-center justify-center h-full px-4">
            <!-- Заголовок -->
            <div class="text-center mb-12 animate-fadeIn">
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl">
                    Добро пожаловать
                </h1>
                <p class="text-xl md:text-2xl text-gray-100 max-w-2xl drop-shadow-lg">
                    Лучшие товары в Серпухове. Быстро. Удобно. Надёжно.
                </p>
            </div>

            <!-- Крупные кнопки-блоки -->
            <div class="flex flex-col gap-6 w-full max-w-md">
                <!-- Кнопка "Смотреть каталог" -->
                <a
                    href="/products"
                    class="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
                           px-8 py-6 text-center transition-all duration-300
                           hover:bg-white/20 hover:border-white/40 hover:scale-105
                           hover:shadow-2xl active:scale-95"
                >
                    <!-- Эффект свечения при наведении -->
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"></div>
                    </div>

                    <!-- Иконка и текст -->
                    <div class="relative flex items-center justify-center gap-3">
                        <svg class="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 1.5M17 13l1.5 1.5M9 21h6M12 18v3M4 5h16"></path>
                        </svg>
                        <span class="text-2xl font-semibold text-white tracking-wide">
                            Смотреть каталог
                        </span>
                        <svg class="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>

                    <!-- Подпись -->
                    <p class="relative text-sm text-white/70 mt-2 group-hover:text-white/90 transition-colors">
                        Тысячи товаров от местных продавцов
                    </p>
                </a>

                <!-- Кнопка "Войти" -->
                <a
                    href="/login"
                    class="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-md border border-white/20
                           px-8 py-6 text-center transition-all duration-300
                           hover:bg-white/10 hover:border-white/40 hover:scale-105
                           hover:shadow-2xl active:scale-95"
                >
                    <!-- Эффект свечения -->
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl"></div>
                    </div>

                    <!-- Иконка и текст -->
                    <div class="relative flex items-center justify-center gap-3">
                        <svg class="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span class="text-2xl font-semibold text-white tracking-wide">
                            Войти в аккаунт
                        </span>
                        <svg class="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>

                    <!-- Подпись -->
                    <p class="relative text-sm text-white/70 mt-2 group-hover:text-white/90 transition-colors">
                        Войдите в свой профиль для управления товарами
                    </p>
                </a>
            </div>
        </div>

        <!-- Скролл-индикатор -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div class="flex flex-col items-center gap-2 text-white/60">
                <span class="text-sm">Листайте вниз</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 1s ease-out;
}
</style>
