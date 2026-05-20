<script setup>
import { ref } from 'vue'

const props = defineProps({
    videoUrl: String,
    posterUrl: String
})

const videoError = ref(false)

const handleVideoError = () => {
    videoError.value = true
}
</script>

<template>
    <div class="fixed inset-0 -z-10">
        <video
            preload="metadata"
            v-if="!videoError && videoUrl"
            :src="videoUrl"
            class="w-full h-full object-cover"
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
