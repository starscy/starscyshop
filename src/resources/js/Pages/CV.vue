<script setup>
import {Head, Link} from '@inertiajs/vue3'
import Layout from '@/Layouts/MainLayout.vue'
import {useGoldTheme} from '@/Composables/styles/useGoldTheme'

const {theme} = useGoldTheme()

// Данные из вашего резюме
const personal = {
    name: 'Караваев Вадим Геннадьевич',
    title: 'Fullstack-разработчик (PHP / JS)',
    age: 36,
    city: 'Серпухов (Московская область)',
    phone: '+7 (999) 970-34-75',
    email: 'karavaev199030@gmail.com',
    telegram: '@Vadim_Karavaev',
    github: 'github.com/starscy',
    photo: '/images/avatar.jpg',
    salary: '100 000 ₽ на руки'
}

const experience = [
    {
        period: 'Ноябрь 2024 — Май 2026',
        company: 'Синергиум (Санкт-Петербург)',
        role: 'Программист многостраничных сайтов',
        description: [
            'Поддержка 9+ проектов на Laravel, доработка самописной админки, написание unit-тестов.',
            'Оптимизировал запросы и внедрил кэширование, снизив утилизацию CPU с 90% до 30% в период новогодних пиков.',
            'Устранил переполнение памяти Redis, внедрив TTL для ключей.',
            'Внедрил валидацию данных и обработку ошибок, сократив на 100% падения сайта из-за действий контент-менеджеров.',
            'Разработал новый корпоративный сайт на MODX 3 за 3 месяца с сохранением SEO-позиций.'
        ]
    },
    {
        period: 'Август 2023 — Сентябрь 2024',
        company: 'Возим (Москва)',
        role: 'Web-разработчик',
        description: [
            'Разработка модулей на Laravel + Inertia + React (SSR) с серверным рендерингом и MUI-компонентами.',
            'Создал и поддерживал приватную UI-библиотеку в Verdaccio, ускорив разработку фич на 40%.',
            'Настроил сбор метрик (производительность, ошибки), участвовал в SEO-продвижении, создавал A/B-тесты.',
            'Участие в разработке личного кабинета пользователя.'
        ]
    }
]

// Добавляем ваши личные проекты из PDF
const personalProjects = [
    {name: 'finance-bot', desc: 'Простой Telegram-бот для подсчета расходов и доходов'},
    {name: 'wikiApp', desc: 'Агрегатор статей Wikipedia (Laravel + API)'},
    {name: 'Console-snake', desc: 'Змейка в консоли (чистый PHP)'}
]

const skills = {
    backend: ['PHP (OOP, паттерны)', 'Laravel (Eloquent, Queues, Redis)', 'Filament', 'MODX 3', 'Unit-тесты (PHPUnit, Mockery)'],
    frontend: ['JavaScript (ES6+)', 'React (Hooks, Context, SSR)', 'Vue 3 (Composition API, Pinia)', 'TypeScript', 'Inertia.js'],
    ui: ['MUI', 'Tailwind CSS', 'Bootstrap', 'BEM', 'SASS', 'Storybook'],
    devops: ['Docker (сборка, отладка)', 'Linux / Ubuntu', 'MySQL / PostgreSQL', 'Swagger / OpenAPI', 'Git (Git Flow, MR/PR)']
}
</script>

<template>
    <Layout
        title="Караваев Вадим | Резюме Fullstack-разработчика"
        description="Резюме Караваева Вадима. Fullstack-разработчик с опытом 3+ года. Laravel, Vue, React, Docker."
    >
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
        </Head>

        <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

            <!-- Шапка профиля -->
            <div class="relative rounded-3xl backdrop-blur-xl p-8 md:p-12 shadow-2xl mb-12"
                 :class="[theme.bg, theme.border]">

                <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <!-- Фото -->
                    <div class="flex-shrink-0">
                        <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4"
                             :class="`border-${theme.name === 'gold' ? 'yellow' : theme.name}-500/50`">
                            <img :src="personal.photo" alt="Караваев Вадим"
                                 class="w-full h-full object-cover"
                                 @error="$event.target.src = 'https://ui-avatars.com/api/?name=Вадим+Караваев&background=random&size=200'"
                            />
                        </div>
                    </div>

                    <!-- Инфо -->
                    <div class="flex-1 text-center md:text-left">
                        <h1 class="text-4xl md:text-5xl font-bold text-white">{{ personal.name }}</h1>
                        <p class="text-xl md:text-2xl text-gray-300 mt-2">{{ personal.title }}</p>

                        <div class="mt-4 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-400">
                            <span class="flex items-center gap-2"><i
                                class="fas fa-map-marker-alt text-gray-500"></i> {{ personal.city }}</span>
                            <span class="flex items-center gap-2"><i
                                class="fas fa-calendar text-gray-500"></i> {{ personal.age }} лет</span>
                            <span class="flex items-center gap-2"><i
                                class="fas fa-phone text-gray-500"></i> {{ personal.phone }}</span>
                            <span class="flex items-center gap-2"><i
                                class="fas fa-envelope text-gray-500"></i> {{ personal.email }}</span>
                        </div>

                        <!-- БЛОК КОНТАКТОВ (Сделал их яркими и белыми) -->
                        <div class="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                            <a :href="`https://${personal.github}`" target="_blank"
                               class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-white transition-colors"
                               :class="[theme.border, `hover:bg-${theme.name === 'gold' ? 'yellow' : theme.name}-500/20`]">
                                <i class="fab fa-github"></i> GitHub
                            </a>
                            <a :href="`https://t.me/${personal.telegram.replace('@', '')}`" target="_blank"
                               class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-white transition-colors"
                               :class="[theme.border, `hover:bg-${theme.name === 'gold' ? 'yellow' : theme.name}-500/20`]">
                                <i class="fab fa-telegram"></i> Telegram
                            </a>
                            <a :href="`mailto:${personal.email}`"
                               class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-white transition-colors"
                               :class="[theme.border, `hover:bg-${theme.name === 'gold' ? 'yellow' : theme.name}-500/20`]">
                                <i class="fas fa-paper-plane"></i> Написать
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- О себе -->
            <div class="rounded-2xl backdrop-blur-xl p-8 mb-8" :class="[theme.bg, theme.border]">
                <h2 class="text-2xl font-bold text-white mb-4">О себе</h2>
                <p class="text-gray-300 leading-relaxed">
                    Fullstack-разработчик с опытом 3+ года. Начал путь в IT как новичок, за это время вырос до решения
                    архитектурных задач и оптимизации высоконагруженных систем. Умею работать как с современным стеком
                    (Inertia, TypeScript, Docker), так и с корпоративными CMS (MODX 3). Ценю чистый код,
                    документирование и автоматизацию.
                </p>
            </div>

            <!-- Опыт работы -->
            <div class="rounded-2xl backdrop-blur-xl p-8 mb-8" :class="[theme.bg, theme.border]">
                <h2 class="text-2xl font-bold text-white mb-6">Опыт работы</h2>
                <div class="space-y-8">
                    <div v-for="(job, index) in experience" :key="index"
                         class="relative pl-6 border-l-2 border-gray-600">
                        <div class="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gray-500"></div>
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 class="text-xl font-semibold text-white">{{ job.role }}</h3>
                            <span class="text-sm text-gray-400">{{ job.period }}</span>
                        </div>
                        <p class="text-gray-300 font-medium mb-3">{{ job.company }}</p>
                        <ul class="list-disc list-inside space-y-1 text-gray-400 text-sm">
                            <li v-for="(item, i) in job.description" :key="i">{{ item }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Личные проекты -->
            <div class="rounded-2xl backdrop-blur-xl p-8 mb-8" :class="[theme.bg, theme.border]">
                <h2 class="text-2xl font-bold text-white mb-6">Личные проекты</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(project, index) in personalProjects" :key="index"
                         class="p-4 rounded-xl border border-gray-600/50 hover:border-gray-400/80 transition-colors">
                        <h4 class="text-white font-semibold text-lg">{{ project.name }}</h4>
                        <p class="text-gray-400 text-sm mt-1">{{ project.desc }}</p>
                    </div>
                </div>
            </div>

            <!-- Навыки -->
            <div class="rounded-2xl backdrop-blur-xl p-8" :class="[theme.bg, theme.border]">
                <h2 class="text-2xl font-bold text-white mb-6">Ключевые навыки</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-white font-semibold mb-3 flex items-center gap-2"><i
                            class="fas fa-code text-white/80"></i> Бэкенд</h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="skill in skills.backend" :key="skill"
                                  class="px-3 py-1 rounded-full text-xs font-medium border border-white/20 bg-white/10 text-white">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-white font-semibold mb-3 flex items-center gap-2"><i
                            class="fas fa-paint-brush text-white/80"></i> Фронтенд</h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="skill in skills.frontend" :key="skill"
                                  class="px-3 py-1 rounded-full text-xs font-medium border border-white/20 bg-white/10 text-white">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-white font-semibold mb-3 flex items-center gap-2"><i
                            class="fas fa-palette text-white/80"></i> UI / Дизайн-системы</h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="skill in skills.ui" :key="skill"
                                  class="px-3 py-1 rounded-full text-xs font-medium border border-white/20 bg-white/10 text-white">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-white font-semibold mb-3 flex items-center gap-2"><i
                            class="fas fa-server text-white/80"></i> DevOps & Инфраструктура</h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="skill in skills.devops" :key="skill"
                                  class="px-3 py-1 rounded-full text-xs font-medium border border-white/20 bg-white/10 text-white">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Кнопка назад -->
            <div class="mt-10 text-center">
                <Link href="/" class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-arrow-left"></i> Вернуться на главную
                </Link>
            </div>
        </div>
    </Layout>
</template>
