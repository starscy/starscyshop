<!-- resources/js/Components/FiltersSection.vue -->
<script setup>
import { computed } from 'vue'
import { useGoldTheme } from '@/Composables/styles/useGoldTheme'

const props = defineProps({
    categories: Array,
    filters: Object
})

const emit = defineEmits(['update:category', 'update:sortBy', 'update:direction', 'reset'])

const { theme } = useGoldTheme()

// Состояния фильтров (двусторонняя привязка через computed)
const categoryId = computed({
    get: () => props.filters.category_id,
    set: (val) => emit('update:category', val)
})

const sortBy = computed({
    get: () => props.filters.sort_by,
    set: (val) => emit('update:sortBy', val)
})

const direction = computed({
    get: () => props.filters.direction,
    set: (val) => emit('update:direction', val)
})

const hasActiveFilters = computed(() => {
    return categoryId.value !== null || sortBy.value !== null
})

// Переключение направления сортировки
const toggleDirection = () => {
    direction.value = direction.value === 'asc' ? 'desc' : 'asc'
    emit('update:direction', direction.value)
}
</script>

<template>
    <div class="rounded-2xl shadow-2xl p-6 mb-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
         :class="[theme.bg, theme.border]">

        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
            <!-- Категория -->
            <div class="md:col-span-5">
                <label class="block text-xs font-semibold uppercase tracking-wider mb-2 transition-colors"
                       :class="theme.text">
                    <svg class="inline-block w-3.5 h-3.5 mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" />
                        <rect x="5" y="4" width="4" height="4" rx="1" />
                        <rect x="15" y="4" width="4" height="4" rx="1" />
                        <rect x="5" y="14" width="4" height="4" rx="1" />
                        <rect x="15" y="14" width="4" height="4" rx="1" />
                    </svg>
                    Категория
                </label>
                <div class="relative">
                    <select
                        v-model="categoryId"
                        @change="$emit('update:category', categoryId)"
                        class="w-full rounded-xl py-3.5 px-4 appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2"
                        :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500/50`, 'text-white', 'text-sm']"
                    >
                        <option :value="null" class="bg-gray-800">📁 Все категории</option>
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id" class="bg-gray-800">
                            {{ cat.name }}
                        </option>
                    </select>
                    <!-- Кастомная стрелка -->
                    <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
                         :class="theme.text">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Сортировка по -->
            <div class="md:col-span-4">
                <label class="block text-xs font-semibold uppercase tracking-wider mb-2 transition-colors"
                       :class="theme.text">
                    <svg class="inline-block w-3.5 h-3.5 mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    Сортировка
                </label>
                <div class="relative">
                    <select
                        v-model="sortBy"
                        @change="$emit('update:sortBy', sortBy)"
                        class="w-full rounded-xl py-3.5 px-4 appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2"
                        :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500/50`, 'text-white', 'text-sm']"
                    >
                        <option :value="null" class="bg-gray-800">📌 По умолчанию</option>
                        <option value="name" class="bg-gray-800">📝 Названию</option>
                        <option value="price" class="bg-gray-800">💰 Цене</option>
                        <option value="created_at" class="bg-gray-800">🕐 Дате добавления</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
                         :class="theme.text">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Направление (иконка asc/desc с анимацией) -->
            <div class="md:col-span-2">
                <label class="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-0">Направление</label>
                <button
                    @click="toggleDirection"
                    :disabled="!sortBy"
                    class="group w-full rounded-xl py-3.5 px-4 transition-all duration-300 flex items-center justify-center gap-3
                           disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
                    :class="[sortBy ? theme.inputBg : 'bg-gray-800/30', theme.border, sortBy ? 'cursor-pointer' : 'cursor-not-allowed']"
                >
                    <!-- Анимированная иконка направления -->
                    <div class="relative w-5 h-5">
                        <!-- Стрелка вверх (asc) -->
                        <svg
                            class="absolute inset-0 w-5 h-5 transition-all duration-300"
                            :class="[
                                direction === 'asc' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
                                sortBy ? theme.text : 'text-gray-500'
                            ]"
                            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                        <!-- Стрелка вниз (desc) -->
                        <svg
                            class="absolute inset-0 w-5 h-5 transition-all duration-300"
                            :class="[
                                direction === 'desc' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                                sortBy ? theme.text : 'text-gray-500'
                            ]"
                            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <span class="text-sm font-medium" :class="sortBy ? theme.text : 'text-gray-500'">
                        {{ direction === 'asc' ? 'По возрастанию' : 'По убыванию' }}
                    </span>
                </button>
            </div>

            <!-- Кнопка сброса -->
            <div class="md:col-span-1">
                <button
                    @click="$emit('reset')"
                    :disabled="!hasActiveFilters"
                    class="w-full rounded-xl py-3.5 px-3 transition-all duration-300 flex items-center justify-center gap-1.5
                           disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                    :class="[
                        hasActiveFilters ? 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400'
                                        : 'bg-gray-800/30 text-gray-600'
                    ]"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span class="text-xs font-medium">Сброс</span>
                </button>
            </div>
        </div>

        <!-- Активные фильтры (chip'ы) -->
        <div v-if="hasActiveFilters" class="mt-5 pt-4 flex flex-wrap gap-2 border-t" :class="theme.border">
            <span class="text-xs text-gray-400 mr-1">Активные фильтры:</span>

            <div v-if="categoryId" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                 :class="[theme.bg, theme.border, theme.text]">
                <span>📁 {{ categories.find(c => c.id === categoryId)?.name }}</span>
                <button @click="$emit('update:category', null)" class="hover:text-white transition-colors text-sm">×</button>
            </div>

            <div v-if="sortBy" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                 :class="[theme.bg, theme.border, theme.text]">
                <span>📊 {{ sortBy === 'name' ? 'Названию' : sortBy === 'price' ? 'Цене' : 'Дате' }}</span>
                <span class="text-xs">{{ direction === 'asc' ? '↑' : '↓' }}</span>
                <button @click="$emit('reset')" class="hover:text-white transition-colors text-sm">×</button>
            </div>
        </div>
    </div>
</template>
