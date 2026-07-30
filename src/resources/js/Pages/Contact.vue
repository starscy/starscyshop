<script setup>
import { Head, Link } from '@inertiajs/vue3'
import Layout from '@/Layouts/MainLayout.vue'
import { useGoldTheme } from '@/Composables/styles/useGoldTheme'
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

const { theme } = useGoldTheme()

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
        // Отправляем данные на API
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

// Данные из вашего резюме (для прямых контактов)
const contacts = {
    email: 'karavaev199030@gmail.com',
    telegram: '@Vadim_Karavaev',
    github: 'github.com/starscy',
    phone: '+7 (999) 970-34-75'
}
</script>

<template>
    <Layout
        title="Караваев Вадим | Связаться со мной"
        description="Свяжитесь с Караваевым Вадимом для сотрудничества. Fullstack-разработчик."
    >
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        </Head>

        <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

            <!-- Заголовок страницы -->
            <div class="text-center mb-12 animate-fadeIn">
                <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl">
                    Связаться со мной
                </h1>
                <p class="text-xl text-gray-300 max-w-2xl mx-auto">
                    Есть вопросы, предложения или хотите предложить работу? Напишите мне!
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">

                <!-- Прямые контакты -->
                <div class="rounded-2xl backdrop-blur-xl p-8" :class="[theme.bg, theme.border]">
                    <h2 class="text-2xl font-bold text-white mb-6">Прямые способы связи</h2>

                    <div class="space-y-6">
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
                </div>

                <!-- Форма обратной связи -->
                <div class="rounded-2xl backdrop-blur-xl p-8" :class="[theme.bg, theme.border]">
                    <h2 class="text-2xl font-bold text-white mb-6">Отправить сообщение</h2>

                    <div v-if="success" class="mb-4 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300">
                        ✅ Сообщение отправлено! Я отвечу в ближайшее время.
                    </div>

                    <div v-if="error" class="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300">
                        ❌ {{ error }}
                    </div>

                    <form @submit.prevent="submit" class="space-y-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Ваше имя</label>
                            <input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                                class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                                :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`]"
                                placeholder="Иван Иванов"
                            />
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Ваш Email</label>
                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                                :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`]"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Сообщение</label>
                            <textarea
                                id="message"
                                v-model="form.message"
                                required
                                rows="5"
                                class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
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

            <!-- Кнопка назад -->
            <div class="mt-12 text-center">
                <Link href="/" class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-arrow-left"></i> Вернуться на главную
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
