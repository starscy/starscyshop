<script setup>
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    href: { type: String, required: true },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    theme: { type: Object, required: true },
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

        <!-- Контент -->
        <div class="relative flex items-center justify-center gap-3">
            <svg :class="`w-8 h-8 text-white/90 group-hover:text-white transition-colors ${theme.text}`"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path :d="icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <span class="text-2xl font-semibold text-white tracking-wide">{{ title }}</span>
            <svg class="w-6 h-6 text-white/90 transform group-hover:translate-x-2 transition-transform duration-300"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </div>
        <p v-if="subtitle" class="relative text-sm text-white/60 mt-2 group-hover:text-white/80 transition-colors">
            {{ subtitle }}
        </p>
    </component>
</template>
