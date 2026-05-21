<script setup>
import { useGoldTheme } from '@/Composables/styles/useGoldTheme'

const { setTheme, currentThemeName } = useGoldTheme()

const themes = [
    { name: 'gold', label: '⭐ Золотая', color: 'rgb(245, 158, 11)' },
    { name: 'blue', label: '💙 Синяя', color: 'rgb(59, 130, 246)' },
    { name: 'purple', label: '💜 Фиолетовая', color: 'rgb(168, 85, 247)' }
]
</script>

<template>
    <div class="flex gap-3 justify-center flex-wrap">
        <button
            v-for="t in themes"
            :key="t.name"
            @click="setTheme(t.name)"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :style="currentThemeName === t.name
                ? { backgroundColor: t.color, color: 'black', boxShadow: `0 0 15px ${t.color}` }
                : { backgroundColor: '#374151', color: '#9ca3af' }"
        >
            {{ t.label }}
        </button>
    </div>
</template>
