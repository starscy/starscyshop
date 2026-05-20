<script setup>
import {Head, Link} from '@inertiajs/vue3'
import Layout from '@/Layouts/MainLayout.vue'
import {computed} from 'vue'
import {useAuth} from '@/Composables/useAuth'

defineProps({
    videoUrl: String,
    posterUrl: String
})

const {isAuthenticated, userName} = useAuth()
// Приветствие в зависимости от времени суток
const greeting = computed(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Доброе утро'
    if (hour < 18) return 'Добрый день'
    return 'Добрый вечер'
})
</script>

<template>
    <Layout
        :video-url="videoUrl"
        :poster-url="posterUrl"
        title="Звёздный шопинг в Серпухове | Главная"
        description="Лучшие товары в Серпухове. Покупайте и продавайте с удовольствием. Тысячи объявлений от местных продавцов."
    >
        <div class="flex flex-col items-center justify-center min-h-screen px-4">
            <div class="text-center mb-12 animate-fadeIn">
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl">
                    Звёздный шопинг в Серпухове
                </h1>
                <p class="text-xl md:text-2xl text-gray-100 drop-shadow-lg">
                    Покупайте и продавайте вещи в своём городе. Быстро. Удобно.
                </p>
            </div>

            <div class="flex flex-col gap-6 w-full max-w-md animate-slideUp">
                <!-- Кнопка каталога -->
                <Link
                    href="/products"
                    class="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
                           px-8 py-6 text-center transition-all duration-300
                           hover:bg-white/20 hover:border-white/40 hover:scale-105
                           hover:shadow-2xl active:scale-95"
                >
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"></div>
                    </div>

                    <div class="relative flex items-center justify-center gap-3">
                        <svg class="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 1.5M17 13l1.5 1.5M9 21h6M12 18v3M4 5h16"></path>
                        </svg>
                        <span class="text-2xl font-semibold text-white tracking-wide">
                            Смотреть каталог
                        </span>
                        <svg
                            class="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-300"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>

                    <p class="relative text-sm text-white/70 mt-2 group-hover:text-white/90 transition-colors">
                        Тысячи товаров от местных продавцов
                    </p>
                </Link>

                <!-- Кнопка "Войти" для неавторизованных -->
                <Link
                    v-if="!isAuthenticated"
                    href="/login"
                    class="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-md border border-white/20
                           px-8 py-6 text-center transition-all duration-300
                           hover:bg-white/10 hover:border-white/40 hover:scale-105
                           hover:shadow-2xl active:scale-95"
                >
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl"></div>
                    </div>

                    <div class="relative flex items-center justify-center gap-3">
                        <svg class="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span class="text-2xl font-semibold text-white tracking-wide">
                            Войти в аккаунт
                        </span>
                        <svg
                            class="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-300"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>

                    <p class="relative text-sm text-white/70 mt-2 group-hover:text-white/90 transition-colors">
                        Войдите в свой профиль для управления товарами
                    </p>
                </Link>

                <!-- Кнопка "Профиль" для авторизованных -->
                <Link
                    v-else
                    href="/admin/products"
                    class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md border border-white/30 px-8 py-6"
                >
                    <div class="relative flex items-center justify-center gap-3">
                        <p class="text-2xl font-semibold text-white tracking-wide">
                            {{ greeting }},
                            <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {{ userName }}
                            </span>
                        </p>
                        <svg
                            class="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-300"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>

                    <p class="relative text-sm text-white/70 mt-2">
                        Перейти в профиль →
                    </p>
                </Link>
            </div>
        </div>
    </Layout>
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

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.8s ease-out;
}

.animate-slideUp {
    animation: slideUp 0.6s ease-out 0.2s both;
}
</style>
