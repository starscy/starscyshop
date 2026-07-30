<script setup>
import { Head, Link } from '@inertiajs/vue3'
import Layout from '@/Layouts/MainLayout.vue'
import { useTheme } from '@/Composables/styles/useTheme'
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

// ДОБАВЛЯЕМ ПРОПСЫ ДЛЯ ВИДЕО
const props = defineProps({
    videoUrl: String,
    posterUrl: String
})

const { theme } = useTheme()

const form = ref({
    name: '',
    email: '',
    message: ''
})

const submitting = ref(false)
const success = ref(false)
const error = ref(null)

const submit = async () => {
    submitting.value = true
    success.value = false
    error.value = null

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(form.value)
        })

        if (response.ok) {
            success.value = true
            form.value = { name: '', email: '', message: '' }
        } else {
            const data = await response.json()
            error.value = data.message || 'Произошла ошибка. Попробуйте позже.'
        }
    } catch (e) {
        error.value = 'Ошибка соединения. Проверьте интернет.'
    } finally {
        submitting.value = false
    }
}

const contacts = {
    email: 'karavaev199030@gmail.com',
    telegram: '@Vadim_Karavaev',
    github: 'github.com/starscy',
    phone: '+7 (999) 970-34-75'
}
</script>

<template>
    <!-- ПЕРЕДАЁМ ВИДЕО В LAYOUT -->
    <Layout
        :video-url="videoUrl"
        :poster-url="posterUrl"
        title="Караваев Вадим | Связаться со мной"
        description="Свяжитесь с Караваевым Вадимом для сотрудничества. Fullstack-разработчик."
    >
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        </Head>

        <div class="flex items-center justify-center min-h-screen px-4 py-8">
            <div class="max-w-4xl w-full auth-card-enter-active">

                <!-- Карточка с динамической темой (как в Login) -->
                <div
                    class="relative rounded-2xl backdrop-blur-xl p-8 md:p-12 shadow-2xl transition-all duration-500"
                    :class="[theme.bg, theme.border, `hover:${theme.borderHover}`]"
                >
                    <!-- Динамические космические блики -->
                    <div
                        class="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                        :class="`bg-${theme.name === 'gold' ? 'yellow-500' : theme.name}-500/20`"
                    ></div>
                    <div
                        class="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl"
                        :class="`bg-${theme.name === 'gold' ? 'yellow-600' : theme.name}-600/20`"
                    ></div>

                    <!-- Кнопка назад (как в Login) -->
                    <Link href="/" class="absolute top-4 left-4 text-gray-400 hover:text-theme transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                    </Link>

                    <div class="text-center mb-8">
                        <!-- Звезда с динамическим цветом (как в Login) -->
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
                        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight auth-form-item" style="animation-delay: 0.05s">
                            Связаться со мной
                        </h2>
                        <p class="mt-2 text-gray-400 auth-form-item" style="animation-delay: 0.1s">
                            Есть вопросы или хотите предложить работу? Напишите!
                        </p>
                    </div>

                    <!-- Контент: Контакты + Форма -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 auth-form-item" style="animation-delay: 0.15s">

                        <!-- Прямые контакты -->
                        <div class="space-y-6">
                            <h3 class="text-xl font-bold text-white mb-4">Прямые способы связи</h3>

                            <a :href="`tel:${contacts.phone}`"
                               class="flex items-center gap-4 p-4 rounded-xl border border-gray-600/50 hover:border-gray-400/80 transition-all group">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <i class="fas fa-phone text-2xl text-white"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Телефон</p>
                                    <p class="text-white font-medium">{{ contacts.phone }}</p>
                                </div>
                            </a>

                            <a :href="`mailto:${contacts.email}`"
                               class="flex items-center gap-4 p-4 rounded-xl border border-gray-600/50 hover:border-gray-400/80 transition-all group">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <i class="fas fa-envelope text-2xl text-white"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Email</p>
                                    <p class="text-white font-medium">{{ contacts.email }}</p>
                                </div>
                            </a>

                            <a :href="`https://t.me/${contacts.telegram.replace('@', '')}`" target="_blank"
                               class="flex items-center gap-4 p-4 rounded-xl border border-gray-600/50 hover:border-gray-400/80 transition-all group">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <i class="fab fa-telegram-plane text-2xl text-white"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Telegram</p>
                                    <p class="text-white font-medium">{{ contacts.telegram }}</p>
                                </div>
                            </a>

                            <a :href="`https://${contacts.github}`" target="_blank"
                               class="flex items-center gap-4 p-4 rounded-xl border border-gray-600/50 hover:border-gray-400/80 transition-all group">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <i class="fab fa-github text-2xl text-white"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">GitHub</p>
                                    <p class="text-white font-medium">{{ contacts.github }}</p>
                                </div>
                            </a>
                        </div>

                        <!-- Форма обратной связи -->
                        <div class="space-y-6">
                            <h3 class="text-xl font-bold text-white mb-4">Отправить сообщение</h3>

                            <div v-if="success" class="mb-4 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300">
                                ✅ Сообщение отправлено! Я отвечу в ближайшее время.
                            </div>

                            <div v-if="error" class="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300">
                                ❌ {{ error }}
                            </div>

                            <form @submit.prevent="submit" class="space-y-4">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-300">Ваше имя</label>
                                    <input
                                        id="name"
                                        v-model="form.name"
                                        type="text"
                                        required
                                        class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all mt-1"
                                        :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`]"
                                        placeholder="Иван Иванов"
                                    />
                                </div>

                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-300">Ваш Email</label>
                                    <input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        required
                                        class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all mt-1"
                                        :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`]"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label for="message" class="block text-sm font-medium text-gray-300">Сообщение</label>
                                    <textarea
                                        id="message"
                                        v-model="form.message"
                                        required
                                        rows="4"
                                        class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all mt-1"
                                        :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`]"
                                        placeholder="Напишите, что вас интересует..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    :disabled="submitting"
                                    class="w-full py-3 px-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    :class="[`bg-gradient-to-r ${theme.gradientBtn}`]"
                                >
                                    <span v-if="submitting">
                                        <i class="fas fa-spinner fa-spin mr-2"></i> Отправка...
                                    </span>
                                    <span v-else>Отправить сообщение</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
@keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fadeInScale { animation: fadeInScale 0.5s ease-out; }
.animate-slideDown { animation: slideDown 0.4s ease-out; }

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
