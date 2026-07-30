<script setup>
import { reactive, ref } from 'vue'
import { Link, Head, router } from '@inertiajs/vue3'
import { useAuth } from '../../Composables/useAuth.js'
import { useTheme } from '@/Composables/styles/useTheme'
import Layout from '@/Layouts/MainLayout.vue'

const props = defineProps({
    videoUrl: String,
    posterUrl: String
})

const { theme } = useTheme()
const processing = ref(false)
const errors = ref({})

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const { register } = useAuth()

const submit = async () => {
    processing.value = true
    errors.value = {}

    const result = await register(form)

    if (result.success) {
        router.visit('/admin/products')
    } else {
        errors.value = result.errors || { email: 'Ошибка регистрации' }
    }

    processing.value = false
}
</script>

<template>
    <Layout
        :video-url="videoUrl"
        :poster-url="posterUrl"
        title="Регистрация | Звёздный шопинг в Серпухове"
        description="Создайте аккаунт на Звёздном шопинге в Серпухове. Начинайте продавать и покупать товары уже сегодня."
    >
        <div class="flex items-center justify-center min-h-screen px-4 py-8">
            <div class="max-w-md w-full auth-card-enter-active">
                <!-- Карточка с динамической темой -->
                <div
                    class="relative rounded-2xl backdrop-blur-xl p-8 shadow-2xl transition-all duration-500"
                    :class="[theme.bg, theme.border, `hover:${theme.borderHover}`]"
                >
                    <!-- Динамические блики -->
                    <div
                        class="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                        :class="`bg-${theme.name === 'gold' ? 'yellow-500' : theme.name}-500/20`"
                    ></div>
                    <div
                        class="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl"
                        :class="`bg-${theme.name === 'gold' ? 'yellow-600' : theme.name}-600/20`"
                    ></div>

                    <!-- Кнопка назад -->
                    <Link href="/" class="absolute top-4 left-4 text-gray-400 hover:text-theme transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                    </Link>

                    <div class="text-center">
                        <!-- Звезда с динамическим цветом -->
                        <div class="flex justify-center mb-4 auth-form-item" style="animation-delay: 0s">
                            <div
                                class="p-3 rounded-2xl border transition-all duration-300"
                                :class="[`bg-gradient-to-br ${theme.gradientBlur}`, theme.border, `hover:${theme.borderHover}`]"
                            >
                                <svg
                                    class="w-10 h-10 animate-pulse transition-colors duration-300"
                                    :class="theme.text"
                                    fill="currentColor" viewBox="0 0 24 24"
                                >
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-3xl font-extrabold text-white tracking-tight auth-form-item" style="animation-delay: 0.05s">
                            Создать аккаунт
                        </h2>
                        <p class="mt-2 text-gray-400 auth-form-item" style="animation-delay: 0.1s">
                            Присоединяйтесь к звёздному сообществу
                        </p>
                    </div>

                    <form class="mt-8 space-y-6" @submit.prevent="submit">
                        <div class="space-y-4">
                            <!-- Имя -->
                            <div class="auth-form-item" style="animation-delay: 0.15s">
                                <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Имя</label>
                                <input
                                    id="name"
                                    v-model="form.name"
                                    type="text"
                                    required
                                    class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500
                                           focus:outline-none focus:ring-2 transition-all duration-300"
                                    :class="[
                                        theme.inputBg,
                                        errors.name ? 'border-red-500' : theme.border,
                                        `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`,
                                        `focus:border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`
                                    ]"
                                    placeholder="Ваше имя"
                                />
                                <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
                            </div>

                            <!-- Email -->
                            <div class="auth-form-item" style="animation-delay: 0.2s">
                                <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500
                                           focus:outline-none focus:ring-2 transition-all duration-300"
                                    :class="[
                                        theme.inputBg,
                                        errors.email ? 'border-red-500' : theme.border,
                                        `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`,
                                        `focus:border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`
                                    ]"
                                    placeholder="your@email.com"
                                />
                                <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
                            </div>

                            <!-- Пароль -->
                            <div class="auth-form-item" style="animation-delay: 0.25s">
                                <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Пароль</label>
                                <input
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    required
                                    class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500
                                           focus:outline-none focus:ring-2 transition-all duration-300"
                                    :class="[
                                        theme.inputBg,
                                        errors.password ? 'border-red-500' : theme.border,
                                        `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`,
                                        `focus:border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`
                                    ]"
                                    placeholder="••••••••"
                                />
                                <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
                            </div>

                            <!-- Подтверждение пароля -->
                            <div class="auth-form-item" style="animation-delay: 0.3s">
                                <label for="password_confirmation" class="block text-sm font-medium text-gray-300 mb-1">
                                    Подтверждение пароля
                                </label>
                                <input
                                    id="password_confirmation"
                                    v-model="form.password_confirmation"
                                    type="password"
                                    required
                                    class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500
                                           focus:outline-none focus:ring-2 transition-all duration-300"
                                    :class="[
                                        theme.inputBg,
                                        theme.border,
                                        `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`,
                                        `focus:border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`
                                    ]"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <!-- Кнопка регистрации с градиентом темы -->
                        <button
                            type="submit"
                            :disabled="processing"
                            class="group relative w-full flex justify-center items-center gap-2 py-3 px-4
                                   rounded-xl text-white font-semibold
                                   transform transition-all duration-300 hover:scale-105 active:scale-95
                                   shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                                   auth-form-item"
                            :class="[
                                `bg-gradient-to-r ${theme.gradientBtn}`,
                                `hover:${theme.gradientBtnHover}`,
                                `hover:shadow-${theme.name === 'gold' ? 'yellow' : theme.name}-500/25`
                            ]"
                            style="animation-delay: 0.35s"
                        >
                            <svg v-if="processing" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span v-else>{{ processing ? 'Регистрация...' : 'Зарегистрироваться' }}</span>
                            <svg v-if="!processing" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>

                        <!-- Ссылка на вход -->
                        <div class="text-center auth-form-item" style="animation-delay: 0.4s">
                            <Link
                                href="/login"
                                class="text-sm transition-colors duration-200"
                                :class="[theme.text, theme.textHover]"
                            >
                                Уже есть аккаунт? Войдите
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
.auth-form-item {
    opacity: 0;
    animation: slideUpFade 0.4s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}

@keyframes slideUpFade {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
