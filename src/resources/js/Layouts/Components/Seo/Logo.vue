<script setup>
const props = defineProps({
    className: { type: String, default: '' }
})
</script>

<template>
    <div :class="`flex items-center gap-2 ${props.className}`">
        <!-- Анимированная звезда (SVG + CSS) -->
        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-twinkle" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"/>
            <circle class="animate-ping-slow" cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/>
        </svg>

        <!-- Текст логотипа -->
        <span class="text-lg sm:text-xl font-semibold bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent tracking-tight">
      Звёздный шопинг в Серпухове
    </span>
    </div>
</template>

<style scoped>
@keyframes twinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.95); }
}
@keyframes ping-slow {
    0% { transform: scale(1); opacity: 0.6; }
    70% { transform: scale(2.5); opacity: 0; }
    100% { transform: scale(3); opacity: 0; }
}
.animate-twinkle {
    animation: twinkle 2.5s ease-in-out infinite;
    filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.6));
}
.animate-ping-slow {
    animation: ping-slow 2.5s ease-out infinite;
    transform-origin: center;
}
</style>
