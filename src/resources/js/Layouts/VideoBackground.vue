<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
    videoUrl: String,
    posterUrl: String
})

const videoError = ref(false)
const videoRef = ref(null)

const handleVideoError = () => {
    videoError.value = true
}

const tryPlayVideo = () => {
    if (!videoRef.value || videoError.value) return

    // Пытаемся запустить видео
    videoRef.value.play().catch((err) => {
        // Если браузер заблокировал автозапуск — просто показываем постер
        console.warn('Автозапуск видео заблокирован браузером:', err)
        // Не ставим videoError = true, чтобы видео могло запуститься позже
    })
}

// При монтировании компонента — пробуем запустить
onMounted(() => {
    tryPlayVideo()
})

// Если videoUrl изменился — перезагружаем и пробуем снова
watch(() => props.videoUrl, (newUrl) => {
    if (newUrl) {
        videoError.value = false
        // Даём время на загрузку нового источника
        setTimeout(() => {
            tryPlayVideo()
        }, 300)
    }
})
</script>

<template>
    <div class="fixed inset-0 -z-10">
        <video
            ref="videoRef"
            preload="metadata"
            v-if="!videoError && videoUrl"
            :src="videoUrl"
            class="w-full h-full object-cover transition-opacity duration-500"
            autoplay
            muted
            loop
            playsinline
            :poster="posterUrl"
            @error="handleVideoError"
        />
        <div
            v-else
            class="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
        />
        <div class="absolute inset-0 bg-black/50 dark:bg-black/70" />
    </div>
</template>
