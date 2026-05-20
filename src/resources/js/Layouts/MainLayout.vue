<script setup>
import VideoBackground from "./VideoBackground.vue";

const props = defineProps({
    videoUrl: String,
    posterUrl: String
})
</script>

<template>
    <div class="relative min-h-screen">
        <VideoBackground :video-url="videoUrl" :poster-url="posterUrl" />
        <div class="relative z-10">
            <slot />
        </div>
    </div>
</template>
