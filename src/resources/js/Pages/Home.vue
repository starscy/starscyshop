<script setup>
import { Head, Link } from '@inertiajs/vue3'
import Layout from '@/Layouts/MainLayout.vue'
import { computed } from 'vue'
import { useAuth } from '@/Composables/useAuth'
import { useGoldTheme } from '@/Composables/styles/useGoldTheme'
import ThemeSwitcher from '../Layouts/Components/Seo/ThemeSwitcher.vue'

defineProps({
    videoUrl: String,
    posterUrl: String
})

const { isAuthenticated, userName } = useAuth()
const { theme } = useGoldTheme()

const greeting = computed(() => {
    Date.now()
    const hour = new Date().getHours()
    if (hour >= 0 && hour < 6) return 'Доброй ночи'
    if (hour >= 6 && hour < 12) return 'Доброе утро'
    if (hour >= 12 && hour < 18) return 'Добрый день'
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

                <div class="mt-6">
                    <ThemeSwitcher />
                </div>
            </div>

            <div class="flex flex-col gap-6 w-full max-w-md animate-slideUp">
                <!-- Кнопка каталога (прозрачная, с темной рамкой) -->
                <Link
                    href="/products"
                    class="group relative overflow-hidden rounded-2xl backdrop-blur-md px-8 py-6 text-center transition-all duration-300 hover:scale-105"
                    :class="[theme.bg, theme.border, theme.borderHover]"
                >
                    <!-- Градиентная рамка (псевдо-элемент) -->
                    <div class="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
                        <div
                            class="w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            :class="`bg-gradient-to-r ${theme.gradientBtn}`"
                        ></div>
                    </div>

                    <!-- Внутренний фон (прозрачный, но с размытием) -->
                    <div class="absolute inset-0 rounded-2xl bg-gray-900/40 backdrop-blur-md"></div>

                    <!-- Контент кнопки -->
                    <div class="relative flex items-center justify-center gap-3">
                        <svg :class="`w-8 h-8 text-white/90 group-hover:text-white transition-colors ${theme.text}`"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 1.5M17 13l1.5 1.5M9 21h6M12 18v3M4 5h16"></path>
                        </svg>
                        <span class="text-2xl font-semibold text-white tracking-wide">Смотреть каталог</span>
                        <svg class="w-6 h-6 text-white/90 transform group-hover:translate-x-2 transition-transform duration-300"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <p class="relative text-sm text-white/60 mt-2 group-hover:text-white/80 transition-colors">
                        Тысячи товаров от местных продавцов
                    </p>
                </Link>

                <!-- Кнопка "Войти" (аналогично) -->
                <Link
                    v-if="!isAuthenticated"
                    href="/login"
                    class="group relative overflow-hidden rounded-2xl backdrop-blur-md px-8 py-6 text-center transition-all duration-300 hover:scale-105"
                    :class="[theme.bg, theme.border, theme.borderHover]"
                >
                    <!-- Градиентная рамка при ховере -->
                    <div class="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
                        <div
                            class="w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            :class="`bg-gradient-to-r ${theme.gradientBtn}`"
                        ></div>
                    </div>

                    <!-- Внутренний прозрачный фон -->
                    <div class="absolute inset-0 rounded-2xl bg-gray-900/40 backdrop-blur-md"></div>

                    <!-- Контент -->
                    <div class="relative flex items-center justify-center gap-3">
                        <svg :class="`w-8 h-8 text-white/90 ${theme.text}`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span class="text-2xl font-semibold text-white tracking-wide">Войти в аккаунт</span>
                        <svg :class="`w-6 h-6 text-white/90 transform group-hover:translate-x-2 transition-transform ${theme.text}`"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <p class="relative text-sm text-white/60 mt-2 group-hover:text-white/80 transition-colors">
                        Войдите в свой профиль для управления товарами
                    </p>
                </Link>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.8s ease-out; }
.animate-slideUp { animation: slideUp 0.6s ease-out 0.2s both; }
</style>
