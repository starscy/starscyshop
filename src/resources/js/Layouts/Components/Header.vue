<script setup>
import {useAuth} from '@/Composables/useAuth'
import {onMounted, computed} from 'vue'
import UserMenu from "../../Components/Admin/UserMenu.vue";
import Logo from "./Seo/Logo.vue";

const {isAuthenticated, userName, logout, loadFromStorage} = useAuth()

const isLoggedIn = computed(() => isAuthenticated.value)

const handleLogout = async () => {
    await logout()
}

onMounted(() => {
    loadFromStorage()
})
</script>

<template>
    <header class="sticky top-0 z-50">
        <nav class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-white/10 px-4 lg:px-6 py-3">
            <div class="flex flex-wrap justify-between items-center mx-auto">

                <!-- Логотип по центру на мобильных, слева на десктопе -->
                <a href="/" class="flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
                    <Logo class="hover:opacity-90 transition-opacity" />
                </a>

                <!-- Правая часть: меню / вход -->
                <div class="flex items-center lg:order-2 gap-2">
                    <UserMenu v-if="isLoggedIn" :user-name="userName" @logout="handleLogout" />
                    <a v-else href="/login"
                       class="text-gray-300 hover:text-white hover:bg-white/10 font-medium rounded-lg text-sm px-4 py-2 transition-all">
                        Войти
                    </a>
                </div>

            </div>
        </nav>

        <!-- Тонкий звёздный градиент-подсветка снизу панели -->
        <div class="h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
    </header>
</template>
