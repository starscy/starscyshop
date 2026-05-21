<script setup>
import { reactive, ref } from 'vue'
import { Link, Head, router } from '@inertiajs/vue3'
import { useAuth } from '../../Composables/useAuth.js'
import Layout from '@/Layouts/MainLayout.vue'

const props = defineProps({
    videoUrl: String,
    posterUrl: String
})

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
                <!-- Карточка с анимацией выезжания -->
                <div class="relative rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-yellow-500/30 p-8 shadow-2xl
                           transition-all duration-500 hover:border-yellow-400/50 hover:shadow-yellow-500/10">

                    <div class="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
                    <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-600/20 rounded-full blur-3xl"></div>

                    <Link href="/" class="absolute top-4 left-4 text-gray-400 hover:text-yellow-400 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                    </Link>

                    <div class="text-center">
                        <div class="flex justify-center mb-4 auth-form-item" style="animation-delay: 0s">
                            <div class="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30">
                                <svg class="w-10 h-10 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
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
                            <div class="auth-form-item" style="animation-delay: 0.15s">
                                <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Имя</label>
                                <input
                                    id="name"
                                    v-model="form.name"
                                    type="text"
                                    required
                                    class="w-full px-4 py-3 bg-gray-800/50 border rounded-xl
                                           text-white placeholder-gray-500
                                           focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                                           transition-all duration-300"
                                    :class="errors.name ? 'border-red-500' : 'border-yellow-500/30'"
                                    placeholder="Ваше имя"
                                />
                                <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
                            </div>

                            <div class="auth-form-item" style="animation-delay: 0.2s">
                                <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    class="w-full px-4 py-3 bg-gray-800/50 border rounded-xl
                                           text-white placeholder-gray-500
                                           focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                                           transition-all duration-300"
                                    :class="errors.email ? 'border-red-500' : 'border-yellow-500/30'"
                                    placeholder="your@email.com"
                                />
                                <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
                            </div>

                            <div class="auth-form-item" style="animation-delay: 0.25s">
                                <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Пароль</label>
                                <input
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    required
                                    class="w-full px-4 py-3 bg-gray-800/50 border rounded-xl
                                           text-white placeholder-gray-500
                                           focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                                           transition-all duration-300"
                                    :class="errors.password ? 'border-red-500' : 'border-yellow-500/30'"
                                    placeholder="••••••••"
                                />
                                <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
                            </div>

                            <div class="auth-form-item" style="animation-delay: 0.3s">
                                <label for="password_confirmation" class="block text-sm font-medium text-gray-300 mb-1">
                                    Подтверждение пароля
                                </label>
                                <input
                                    id="password_confirmation"
                                    v-model="form.password_confirmation"
                                    type="password"
                                    required
                                    class="w-full px-4 py-3 bg-gray-800/50 border border-yellow-500/30 rounded-xl
                                           text-white placeholder-gray-500
                                           focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                                           transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            :disabled="processing"
                            class="group relative w-full flex justify-center items-center gap-2 py-3 px-4
                                   rounded-xl text-white font-semibold
                                   bg-gradient-to-r from-yellow-600 to-yellow-500
                                   hover:from-yellow-500 hover:to-yellow-400
                                   transform transition-all duration-300 hover:scale-105 active:scale-95
                                   shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed
                                   auth-form-item"
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

                        <div class="text-center auth-form-item" style="animation-delay: 0.4s">
                            <Link href="/login" class="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
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
