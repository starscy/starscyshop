<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { usePage } from '@inertiajs/vue3'

const { component } = usePage()

// Показывать оверлей только при смене компонента
const showOverlay = ref(false)

watch(() => component.value, () => {
    showOverlay.value = true
    setTimeout(() => showOverlay.value = false, 500)
})
</script>

<template>
    <div class="transition-container">
        <!-- Оверлей только когда showOverlay === true -->
        <div
            v-if="showOverlay"
            class="transition-overlay"
        ></div>
        <slot />
    </div>
</template>

<style scoped>
.transition-overlay {
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
    pointer-events: none;
    z-index: 999;
    animation: fadeOut 0.5s ease-out forwards;
}
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; visibility: hidden; }
}
</style>
