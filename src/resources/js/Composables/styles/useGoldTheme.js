// composables/styles/useGoldTheme.js
import { ref, computed } from 'vue'

const themes = {
    gold: {
        name: 'gold',
        bg: 'bg-gray-900/80',
        bgDark: 'bg-gray-900',
        border: 'border-yellow-500/30',
        borderHover: 'hover:border-yellow-400/50',
        gradientBtn: 'from-yellow-600 to-yellow-500',
        gradientBtnHover: 'from-yellow-500 to-yellow-400',
        gradientBlur: 'from-yellow-500/10 to-yellow-600/10',
        text: 'text-yellow-400',
        textHover: 'hover:text-yellow-300',
        inputBg: 'bg-gray-800/50',
        css: {
            '--theme-primary': '245, 158, 11',
            '--theme-primary-light': '253, 224, 71',
        }
    },
    amber: {  // Утро
        name: 'amber',
        bg: 'bg-gray-900/80',
        bgDark: 'bg-gray-900',
        border: 'border-amber-500/30',
        borderHover: 'hover:border-amber-400/50',
        gradientBtn: 'from-amber-600 to-amber-500',
        gradientBtnHover: 'from-amber-500 to-amber-400',
        gradientBlur: 'from-amber-500/10 to-amber-600/10',
        text: 'text-amber-400',
        textHover: 'hover:text-amber-300',
        inputBg: 'bg-gray-800/50',
        css: {
            '--theme-primary': '245, 158, 11',
            '--theme-primary-light': '251, 191, 36',
        }
    },
    blue: {  // День
        name: 'blue',
        bg: 'bg-gray-900/80',
        bgDark: 'bg-gray-900',
        border: 'border-blue-500/30',
        borderHover: 'hover:border-blue-400/50',
        gradientBtn: 'from-blue-600 to-blue-500',
        gradientBtnHover: 'from-blue-500 to-blue-400',
        gradientBlur: 'from-blue-500/10 to-blue-600/10',
        text: 'text-blue-400',
        textHover: 'hover:text-blue-300',
        inputBg: 'bg-gray-800/50',
        css: {
            '--theme-primary': '59, 130, 246',
            '--theme-primary-light': '96, 165, 250',
        }
    },
    purple: {  // Вечер
        name: 'purple',
        bg: 'bg-gray-900/80',
        bgDark: 'bg-gray-900',
        border: 'border-purple-500/30',
        borderHover: 'hover:border-purple-400/50',
        gradientBtn: 'from-purple-600 to-purple-500',
        gradientBtnHover: 'from-purple-500 to-purple-400',
        gradientBlur: 'from-purple-500/10 to-purple-600/10',
        text: 'text-purple-400',
        textHover: 'hover:text-purple-300',
        inputBg: 'bg-gray-800/50',
        css: {
            '--theme-primary': '168, 85, 247',
            '--theme-primary-light': '192, 132, 252',
        }
    }
}

// Определение темы по времени суток
function getThemeByTime() {
    const hour = new Date().getHours()
    if (hour >= 0 && hour < 6) return 'gold'      // Ночь
    if (hour >= 6 && hour < 12) return 'amber'    // Утро
    if (hour >= 12 && hour < 18) return 'blue'    // День
    return 'purple'                                 // Вечер
}

// Реактивная текущая тема
const currentThemeName = ref('gold')

// Загрузка из localStorage или автоопределение
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('app_theme')
    const manualOverride = localStorage.getItem('app_theme_manual')

    if (saved && manualOverride === 'true') {
        // Пользователь выбрал вручную
        currentThemeName.value = saved
    } else {
        // Авто по времени
        currentThemeName.value = getThemeByTime()
    }
}

// Применение CSS-переменных
function applyTheme(themeName) {
    const theme = themes[themeName]
    if (!theme?.css || typeof window === 'undefined') return
    const root = document.documentElement
    Object.entries(theme.css).forEach(([key, value]) => {
        root.style.setProperty(key, value)
    })
}

// Инициализация
if (typeof window !== 'undefined') {
    applyTheme(currentThemeName.value)

    // Запускаем проверку времени каждую минуту (для автосмены)
    setInterval(() => {
        const manualOverride = localStorage.getItem('app_theme_manual')
        if (manualOverride !== 'true') {
            // Только если нет ручного выбора
            const newTheme = getThemeByTime()
            if (newTheme !== currentThemeName.value) {
                currentThemeName.value = newTheme
                localStorage.setItem('app_theme', newTheme)
                applyTheme(newTheme)
            }
        }
    }, 60000) // каждую минуту
}

// Смена темы (ручной выбор)
export function setTheme(themeName, isManual = true) {
    if (themes[themeName]) {
        currentThemeName.value = themeName
        if (typeof window !== 'undefined') {
            localStorage.setItem('app_theme', themeName)
            localStorage.setItem('app_theme_manual', isManual ? 'true' : 'false')
            applyTheme(themeName)
        }
    }
}

// Сброс к авторежиму
export function resetToAutoTheme() {
    const autoTheme = getThemeByTime()
    if (typeof window !== 'undefined') {
        localStorage.removeItem('app_theme_manual')
        localStorage.setItem('app_theme', autoTheme)
        currentThemeName.value = autoTheme
        applyTheme(autoTheme)
    }
}

export const currentTheme = computed(() => themes[currentThemeName.value])

export function useGoldTheme() {
    return {
        theme: currentTheme,
        setTheme,
        resetToAutoTheme,
        currentThemeName,
    }
}

export const THEME_COLOR_MAP = {
    gold: 'yellow',
    amber: 'amber',
    blue: 'blue',
    purple: 'purple'
}

export function getTwClasses(themeName) {
    const color = THEME_COLOR_MAP[themeName] || themeName
    return {
        text: `text-${color}-400`,
        textHover: `hover:text-${color}-300`,
        border: `border-${color}-500/30`,
        borderHover: `hover:border-${color}-400/50`,
        ring: `focus:ring-${color}-500`,
        gradientFrom: `from-${color}-600`,
        gradientTo: `to-${color}-500`,
        bgSoft: `bg-${color}-500/10`,
    }
}
