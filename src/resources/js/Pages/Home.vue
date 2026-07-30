<script setup>
import Layout from '@/Layouts/MainLayout.vue'
import { computed } from 'vue'
import { useAuth } from '@/Composables/useAuth'
import { useTheme } from '@/Composables/styles/useTheme'
import ThemeSwitcher from '../Layouts/Components/Seo/ThemeSwitcher.vue'
import ActionButton from "@/Components/UI/ActionButton.vue";
import Title from "@/Components/UI/Title.vue";
import VisitorCounter from "@/Components/VisitorCounter.vue";

defineProps({
    videoUrl: String,
    posterUrl: String
})

const { isAuthenticated, userName } = useAuth()
const { theme, iconColor, mutedColor } = useTheme()

const currentThemeName = computed(() => theme.value.name)

const greeting = computed(() => {
    const hour = new Date().getHours()
    if (hour >= 22 || hour < 4) return 'Доброй ночи'
    if (hour >= 4 && hour < 10) return 'Доброе утро'
    if (hour >= 10 && hour < 16) return 'Добрый день'
    return 'Добрый вечер'
})

const icons = {
    projects: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    contact: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    admin: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    shop: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 1.5M17 13l1.5 1.5M9 21h6M12 18v3M4 5h16'
}
</script>

<template>
    <Layout
        :video-url="videoUrl"
        :poster-url="posterUrl"
        title="Караваев Вадим | Создание сайтов и Telegram-ботов"
        description="Разработка сайтов, интернет-магазинов и Telegram-ботов под ключ в Серпухове и Москве. Laravel, Vue, Docker. Адаптивно, быстро, с админ-панелью."
    >
        <div class="flex flex-col items-center justify-center min-h-screen px-4">
            <div class="text-center mb-12 animate-fadeIn">
                <p class="text-xl md:text-2xl text-gray-400 tracking-widest uppercase mb-2">
                    {{ greeting }}, меня зовут
                </p>

                <Title text="Караваев Вадим" />

                <p class="text-2xl md:text-3xl font-medium text-white drop-shadow-lg">
                    Fullstack Web Developer
                </p>

                <!-- БОЛЕЕ ЦЕЛЕВОЙ ТЕКСТ ПОД УСЛУГИ -->
                <p class="text-lg md:text-xl text-gray-300 mt-4 drop-shadow-lg max-w-2xl mx-auto">
                    Создам для вас сайт, интернет-магазин или Telegram-бота под ключ.
                    <br>Современный стек, адаптивность и быстрая загрузка.
                </p>

                <div class="mt-6">
                    <ThemeSwitcher :current-theme="currentThemeName" />
                </div>
            </div>

            <!-- КНОПКИ С ПРИЗЫВОМ К ДЕЙСТВИЮ -->
            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 w-full max-w-lg mx-auto animate-slideUp">

                <!-- Кнопка "Заказать" (самая важная) -->
                <ActionButton
                    href="/contact"
                    :icon="icons.contact"
                    title="Заказать разработку"
                    subtitle="Обсудим ваш проект и сроки"
                    :theme="theme"
                    :iconColor="iconColor"
                    :mutedColor="mutedColor"
                    :transparent="true"
                    :extraClass="'px-6 py-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl'"
                />

                <!-- Кнопка "Портфолио" (для доверия) -->
                <ActionButton
                    href="/cv"
                    :icon="icons.projects"
                    title="Моё портфолио"
                    subtitle="Посмотрите мои работы и опыт"
                    :theme="theme"
                    :iconColor="iconColor"
                    :mutedColor="mutedColor"
                    :transparent="true"
                    :extraClass="'px-6 py-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl'"
                />

                <!-- Кнопка "Магазин" (демонстрация) -->
                <ActionButton
                    href="/products"
                    :icon="icons.shop"
                    title="Демо-магазин"
                    subtitle="Живой пример интернет-магазина"
                    :theme="theme"
                    :iconColor="iconColor"
                    :mutedColor="mutedColor"
                    :transparent="true"
                    :extraClass="'px-6 py-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl'"
                />

                <!-- Кнопка "Вход" (для управленцев) -->
                <ActionButton
                    :href="isAuthenticated ? '/admin/products' : '/login'"
                    :icon="icons.admin"
                    title="Демо-админки"
                    :titleSub="isAuthenticated ? userName : 'для клиентов'"
                    :subtitle="isAuthenticated ? 'Ваши товары и заказы' : 'Войдите в админ-панель'"
                    :theme="theme"
                    :iconColor="iconColor"
                    :mutedColor="mutedColor"
                    :transparent="true"
                    :extraClass="'px-6 py-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl'"
                />
            </div>
        </div>

        <VisitorCounter />
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

.perspective-1000 {
    perspective: 1000px;
}
</style>
