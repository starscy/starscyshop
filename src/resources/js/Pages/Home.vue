<script setup>
import Layout from '@/Layouts/MainLayout.vue'
import { computed } from 'vue'
import { useAuth } from '@/Composables/useAuth'
import { useGoldTheme } from '@/Composables/styles/useGoldTheme'
import ThemeSwitcher from '../Layouts/Components/Seo/ThemeSwitcher.vue'
import ActionButton from '@/Components/ActionButton.vue'

defineProps({
    videoUrl: String,
    posterUrl: String
})

const { isAuthenticated, userName } = useAuth()
const { theme } = useGoldTheme()

const greeting = computed(() => {
    const hour = new Date().getHours()
    if (hour >= 0 && hour < 6) return 'Доброй ночи'
    if (hour >= 6 && hour < 12) return 'Доброе утро'
    if (hour >= 12 && hour < 18) return 'Добрый день'
    return 'Добрый вечер'
})

// Иконки (SVG paths)
const icons = {
    projects: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    contact: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    admin: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
}
</script>

<template>
    <Layout
        :video-url="videoUrl"
        :poster-url="posterUrl"
        title="Караваев Вадим | Портфолио Fullstack разработчика"
        description="Портфолио разработчика Караваева Вадима. Laravel, Vue, Docker. Создаю современные веб-приложения."
    >
        <div class="flex flex-col items-center justify-center min-h-screen px-4">
            <div class="text-center mb-12 animate-fadeIn">
                <p class="text-xl md:text-2xl text-gray-400 tracking-widest uppercase mb-2">
                    {{ greeting }}, меня зовут
                </p>
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl">
                    Караваев Вадим
                </h1>
                <p class="text-2xl md:text-3xl font-medium text-white drop-shadow-lg">
                    Fullstack Web Developer
                </p>
                <p class="text-lg md:text-xl text-gray-300 mt-2 drop-shadow-lg max-w-2xl mx-auto">
                    Специализируюсь на создании высоко нагруженных приложений на Laravel, Vue.js и Docker.
                </p>
                <div class="mt-6">
                    <ThemeSwitcher/>
                </div>
            </div>

            <div class="flex flex-col gap-4 w-full max-w-md animate-slideUp">
                <ActionButton
                    href="/cv"
                    :icon="icons.projects"
                    title="Мои проекты"
                    subtitle="Посмотрите, что я умею делать"
                    :theme="theme"
                />
                <ActionButton
                    href="/contact"
                    :icon="icons.contact"
                    title="Связаться со мной"
                    subtitle="Напишите мне для сотрудничества"
                    :theme="theme"
                />
                <ActionButton
                    :href="isAuthenticated ? '/admin/products' : '/login'"
                    :icon="icons.admin"
                    :title="isAuthenticated ? `Админ-панель (${userName})` : 'Войти в админ-панель'"
                    :subtitle="isAuthenticated ? 'Управляйте товарами и заказами' : 'Войдите, чтобы управлять сайтом'"
                    :theme="theme"
                />
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
