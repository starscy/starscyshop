export const personal = {
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

export const experience = [
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

export const personalProjects = [
    { name: 'finance-bot', desc: 'Простой Telegram-бот для подсчета расходов и доходов' },
    { name: 'wikiApp', desc: 'Агрегатор статей Wikipedia (Laravel + API)' },
    { name: 'Console-snake', desc: 'Змейка в консоли (чистый PHP)' }
]

export const skills = {
    backend: ['PHP (OOP, паттерны)', 'Laravel (Eloquent, Queues, Redis)', 'Filament', 'MODX 3', 'Unit-тесты (PHPUnit, Mockery)'],
    frontend: ['JavaScript (ES6+)', 'React (Hooks, Context, SSR)', 'Vue 3 (Composition API, Pinia)', 'TypeScript', 'Inertia.js'],
    ui: ['MUI', 'Tailwind CSS', 'Bootstrap', 'BEM', 'SASS', 'Storybook'],
    devops: ['Docker (сборка, отладка)', 'Linux / Ubuntu', 'MySQL / PostgreSQL', 'Swagger / OpenAPI', 'Git (Git Flow, MR/PR)']
}
