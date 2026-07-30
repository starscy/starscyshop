<script setup>
import { useTheme } from '@/Composables/styles/useTheme'

const { theme } = useTheme()

defineProps({
    text: { type: String, required: true }
})
</script>

<template>
    <h1 :class="[
        'text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 drop-shadow-2xl',
        'animate-fire-text'
    ]"
        :style="{
        '--fire-start': theme.name === 'gold' || theme.name === 'amber' ? '#ea580c' :
                        theme.name === 'blue' ? '#2563eb' :
                        theme.name === 'purple' ? '#7c3aed' : '#ea580c',
        '--fire-mid': theme.name === 'gold' || theme.name === 'amber' ? '#fbbf24' :
                      theme.name === 'blue' ? '#60a5fa' :
                      theme.name === 'purple' ? '#c084fc' : '#fbbf24',
        '--fire-light': theme.name === 'gold' || theme.name === 'amber' ? '#fef08a' :
                        theme.name === 'blue' ? '#93c5fd' :
                        theme.name === 'purple' ? '#e9d5ff' : '#fef08a',
        '--fire-end': '#ffffff'
    }">
        {{ text }}
    </h1>
</template>

<style scoped>
/* ===========================
   ЭФФЕКТ ГОРЯЩИХ БУКВ (ПЛАМЯ)
   =========================== */

.animate-fire-text {
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-image: linear-gradient(135deg,
    var(--fire-start) 0%,
    var(--fire-mid) 30%,
    var(--fire-light) 60%,
    var(--fire-end) 85%,
    var(--fire-mid) 100%
    );
    animation: firePulse 3s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.3));
}

@keyframes firePulse {
    0% {
        background-position: 0% 50%;
        filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.2));
    }
    25% {
        background-position: 100% 50%;
        filter: drop-shadow(0 0 25px rgba(251, 191, 36, 0.4));
    }
    50% {
        background-position: 0% 100%;
        filter: drop-shadow(0 0 35px rgba(251, 191, 36, 0.5));
        transform: scale(1.02);
    }
    75% {
        background-position: 100% 0%;
        filter: drop-shadow(0 0 25px rgba(251, 191, 36, 0.4));
    }
    100% {
        background-position: 0% 50%;
        filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.2));
        transform: scale(1);
    }
}
</style>
