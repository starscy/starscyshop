<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const { router } = usePage()

onMounted(() => {
    document.body.classList.add('page-transition-ready')
})

onBeforeUnmount(() => {
    document.body.classList.remove('page-transition-ready')
})
</script>

<template>
    <div class="transition-container">
        <div class="transition-overlay"></div>
        <slot />
    </div>
</template>

<style scoped>
.transition-container {
    position: relative;
    animation: fadeSlideUp 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.transition-overlay {
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
    pointer-events: none;
    z-index: 999;
    animation: fadeOut 0.5s ease-out forwards;
}

@keyframes fadeSlideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; visibility: hidden; }
}
</style>
