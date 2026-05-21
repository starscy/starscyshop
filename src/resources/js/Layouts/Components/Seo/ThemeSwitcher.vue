<script setup>
import { useGoldTheme } from '@/Composables/styles/useGoldTheme'

const { setTheme, resetToAutoTheme, currentThemeName } = useGoldTheme()

const themes = [
    { name: 'amber', label: '☀️', color: 'rgb(245, 158, 11)' },
    { name: 'blue', label: '🌞', color: 'rgb(59, 130, 246)' },
    { name: 'purple', label: '🌅', color: 'rgb(168, 85, 247)' },
    { name: 'gold', label: '🌙', color: 'rgb(245, 158, 11)' }
]
</script>

<template>
    <div class="flex flex-col items-center gap-3">
        <div class="flex gap-2 justify-center flex-wrap">
            <button
                v-for="t in themes"
                :key="t.name"
                @click="setTheme(t.name, true)"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
                :style="currentThemeName === t.name
                    ? { backgroundColor: t.color, color: 'black', boxShadow: `0 0 12px ${t.color}` }
                    : { backgroundColor: '#374151', color: '#9ca3af' }"
            >
                {{ t.label }}
            </button>
        </div>

        <button
            @click="resetToAutoTheme"
            class="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                   bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-white cursor-pointer"
        >
            🔄 Авто (по времени суток)
        </button>
    </div>
</template>
