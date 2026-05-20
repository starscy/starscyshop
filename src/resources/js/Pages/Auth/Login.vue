<script setup>
import { reactive, ref } from 'vue'
import { Link, Head } from '@inertiajs/vue3'
import { useAuth } from '../../Composables/useAuth.js'
import Layout from '@/Layouts/MainLayout.vue'

const props = defineProps({
    videoUrl: String,
    posterUrl: String
})

const processing = ref(false)
const errors = ref({})

const form = reactive({
    email: '',
    password: '',
    remember: false
})

const { login } = useAuth()

const submit = async () => {
    processing.value = true
    errors.value = {}

    const result = await login(form)

    if (result.success) {
        window.location.href = '/admin/products'
    } else {
        errors.value = result.errors || {email: 'Ошибка входа. Проверьте email и пароль.'}
    }

    processing.value = false
}
</script>

<template>
    <Layout
        :video-url="videoUrl"
        :poster-url="posterUrl"
        title="Вход | Барахолка Серпухов"
        description="Войдите в свой аккаунт на Барахолке Серпухов. Управляйте товарами, общайтесь с покупателями."
    >
        <div class="flex items-center justify-center min-h-screen px-4 py-8">
            <div class="max-w-md w-full animate-fadeInScale">
                <div class="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl
                           transition-all duration-500 hover:shadow-3xl hover:bg-white/15">

                    <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

                    <Link href="/" class="absolute top-4 left-4 text-white/60 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                    </Link>

                    <div class="text-center">
                        <div class="flex justify-center mb-4">
                            <div class="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-3xl font-extrabold text-white tracking-tight animate-slideDown">
                            Вход в аккаунт
                        </h2>
                        <p class="mt-2 text-gray-300">
                            Введите свои данные для входа
                        </p>
                    </div>

                    <form class="mt-8 space-y-6" @submit.prevent="submit">
                        <div class="space-y-4">
                            <div class="animate-slideRight" style="animation-delay: 0.1s">
                                <label for="email" class="block text-sm font-medium text-gray-200 mb-1">Email</label>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl
                                           text-white placeholder-gray-400
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                           transition-all duration-300"
                                    :class="{ 'border-red-500': errors.email }"
                                    placeholder="your@email.com"
                                />
                                <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
                            </div>

                            <div class="animate-slideRight" style="animation-delay: 0.2s">
                                <label for="password"
                                       class="block text-sm font-medium text-gray-200 mb-1">Пароль</label>
                                <input
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    required
                                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl
                                           text-white placeholder-gray-400
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                           transition-all duration-300"
                                    :class="{ 'border-red-500': errors.password }"
                                    placeholder="••••••••"
                                />
                                <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
                            </div>

                            <div class="flex items-center justify-between animate-slideRight"
                                 style="animation-delay: 0.3s">
                                <label class="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        v-model="form.remember"
                                        class="w-4 h-4 bg-white/10 border-white/20 rounded
                                               text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                    />
                                    <span class="ml-2 text-sm text-gray-300">Запомнить меня</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            :disabled="processing"
                            class="group relative w-full flex justify-center items-center gap-2 py-3 px-4
                                   rounded-xl text-white font-semibold
                                   bg-gradient-to-r from-blue-600 to-purple-600
                                   hover:from-blue-500 hover:to-purple-500
                                   transform transition-all duration-300 hover:scale-105 active:scale-95
                                   shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                                   animate-slideUp"
                            style="animation-delay: 0.4s"
                        >
                            <svg v-if="processing" class="animate-spin h-5 w-5 text-white" fill="none"
                                 viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span v-else>{{ processing ? 'Вход...' : 'Войти' }}</span>
                            <svg v-if="!processing" class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>

                        <div class="text-center animate-fadeIn" style="animation-delay: 0.5s">
                            <Link href="/register" class="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                Нет аккаунта? Зарегистрируйтесь
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideRight {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeInScale {
    animation: fadeInScale 0.5s ease-out;
}

.animate-slideDown {
    animation: slideDown 0.4s ease-out;
}

.animate-slideRight {
    animation: slideRight 0.4s ease-out forwards;
    opacity: 0;
}

.animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
    opacity: 0;
}

.animate-fadeIn {
    animation: fadeInScale 0.3s ease-out forwards;
    opacity: 0;
}
</style>
