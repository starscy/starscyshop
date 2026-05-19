<script setup>
import {useAuth} from '@/Composables/useAuth'
import {onMounted, computed} from 'vue'
import UserMenu from "../../Components/Admin/UserMenu.vue";

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
    <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto">
                <a href="/" class="flex items-center">
<!--                    <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9"-->
<!--                         alt="Барахолка Серпухов"/>-->
                    <span
                        class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Барахолка Серпухов</span>
                </a>

                <div class="flex items-center lg:order-2">
                    <UserMenu
                        v-if="isLoggedIn"
                        :user-name="userName"
                        @logout="handleLogout"
                    />
                    <a
                        v-else
                        href="/login"
                        class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Войти</a>
                </div>

            </div>
        </nav>
    </header>
</template>
