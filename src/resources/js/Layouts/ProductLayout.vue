<script setup>
import Header from "./Components/Header.vue";
import Footer from "./Components/Footer.vue";
</script>

<template>
    <div class="min-h-screen bg-gray-900">
        <Header />
        <main>
            <slot />
        </main>
    </div>
</template>
