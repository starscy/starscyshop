<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

onMounted(() => {
    if (!localStorage.getItem('cookie_consent')) {
        showBanner.value = true
    }
})

const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true')
    showBanner.value = false
}
</script>

<template>
    <div v-if="showBanner" class="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-xl z-50">
        <div class="rounded-2xl backdrop-blur-xl p-5 border border-white/20 bg-gray-900/80 text-white shadow-2xl flex flex-col sm:flex-row items-center gap-4">
            <p class="text-sm text-gray-300 flex-1">
                🍪 Мы используем куки для работы сайта и вашего удобства.
            </p>
            <button @click="acceptCookies"
                    class="px-6 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/30 transition-all text-sm font-medium whitespace-nowrap">
                Понятно
            </button>
        </div>
    </div>
</template>
