// composables/styles/useGoldTheme.js
import { ref, computed } from 'vue'

const themes = {
    gold: {
        name: 'gold',
        // Tailwind-классы для кнопок
        bg: 'bg-gray-900/80',
        border: 'border-yellow-500/30',
        borderHover: 'hover:border-yellow-400/50',
        gradientBtn: 'from-yellow-600 to-yellow-500',
        gradientBtnHover: 'from-yellow-500 to-yellow-400',
        gradientBlur: 'from-yellow-500/10 to-yellow-600/10',
        text: 'text-yellow-400',
        textHover: 'hover:text-yellow-300',
        inputBg: 'bg-gray-800/50',
        // CSS-переменные для глобальных стилей (опционально)
        css: {
            '--theme-primary': '245, 158, 11',
            '--theme-primary-light': '253, 224, 71',
        }
    },
    blue: {
        name: 'blue',
        bg: 'bg-gray-900/80',
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
    purple: {
        name: 'purple',
        bg: 'bg-gray-900/80',
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

const currentThemeName = ref('gold')

// Загрузка из localStorage
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('app_theme')
    if (saved && themes[saved]) {
        currentThemeName.value = saved
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
}

export function setTheme(themeName) {
    if (themes[themeName]) {
        currentThemeName.value = themeName
        if (typeof window !== 'undefined') {
            localStorage.setItem('app_theme', themeName)
            applyTheme(themeName)
        }
    }
}

export const currentTheme = computed(() => themes[currentThemeName.value])

export function useGoldTheme() {
    return {
        theme: currentTheme,
        setTheme,
        currentThemeName,
    }
}
