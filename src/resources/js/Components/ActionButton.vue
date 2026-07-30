<script setup>
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    href: { type: String, required: true },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    titleSub: { type: String, default: '' },   // <--- Вторая строка для заголовка
    subtitle: { type: String, default: '' },
    theme: { type: Object, required: true },
    iconColor: { type: String, default: '#fbbf24' },
    mutedColor: { type: String, default: 'rgba(251, 191, 36, 0.6)' },
    isExternal: { type: Boolean, default: false }
})
</script>

<template>
    <component
        :is="isExternal ? 'a' : Link"
        :href="href"
        :target="isExternal ? '_blank' : undefined"
        class="group relative overflow-hidden rounded-2xl backdrop-blur-md px-8 py-6 text-center transition-all duration-300 hover:scale-105"
        :class="[theme.bg, theme.border, theme.borderHover]"
    >
        <!-- Градиентная рамка при ховере -->
        <div class="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
            <div
                class="w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                :class="`bg-gradient-to-r ${theme.gradientBtn}`"
            ></div>
        </div>

        <!-- Внутренний прозрачный фон -->
        <div class="absolute inset-0 rounded-2xl bg-gray-900/40 backdrop-blur-md"></div>

        <div class="relative flex flex-col items-center justify-center gap-2">
            <div class="flex items-center justify-center gap-3">
                <!-- Иконка -->
                <svg :style="{ color: iconColor }"
                     class="w-8 h-8 transition-colors duration-300"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path :d="icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>

                <!-- Заголовок (первая строка) -->
                <span class="text-2xl font-semibold tracking-wide text-white transition-colors duration-300">
                    {{ title }}
                </span>

                <!-- Стрелка -->
                <svg class="w-6 h-6 text-white transition-transform duration-300 transform group-hover:translate-x-2"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </div>

            <!-- Вторая строка заголовка (если передана) -->
            <p v-if="titleSub" class="text-base font-normal text-gray-300 transition-colors duration-300">
                {{ titleSub }}
            </p>

            <!-- Основной подзаголовок (нижний) -->
            <p v-if="subtitle" class="text-sm mt-1 transition-colors duration-300" :style="{ color: mutedColor }">
                {{ subtitle }}
            </p>
        </div>
    </component>
</template>
