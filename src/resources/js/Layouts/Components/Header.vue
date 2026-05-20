<script setup>
import { useAuth } from '@/Composables/useAuth'
import { onMounted, computed } from 'vue'
import UserMenu from "../../Components/Admin/UserMenu.vue";
import { useOnlineUsers } from '@/Composables/useOnlineUsers'
import {useRealTimeClock} from "@/Composables/useRealTimeClock.js";

const { isAuthenticated, userName, userEmail, logout, loadFromStorage } = useAuth()
const { totalUsers, onlineUsers, loading } = useOnlineUsers()

const isLoggedIn = computed(() => isAuthenticated.value)

const handleLogout = async () => {
    await logout()
}

onMounted(() => {
    loadFromStorage()
})

const {formattedTime, formattedDate} = useRealTimeClock(60000)
</script>

<template>
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-gray-900 border-b border-white/10 shadow-lg">
        <nav class="container mx-auto px-4 py-3 lg:py-4">
            <div class="flex flex-wrap justify-between items-center">
                <!-- Логотип -->
                <a href="/" class="flex items-center gap-3 group">
                    <div class="relative">
                        <svg class="w-10 h-10 lg:w-12 lg:h-12 text-yellow-400 animate-pulse group-hover:animate-spin transition-all duration-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                        </svg>
                        <div class="absolute -top-2 -right-2">
                            <svg class="w-3 h-3 text-yellow-300 animate-ping" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-lg lg:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,0,0.3)] tracking-wide">
                            Звёздный шопинг
                        </span>
                        <span class="text-xs lg:text-sm text-gray-300 -mt-1 tracking-wider">в Серпухове</span>
                    </div>
                </a>
                <!-- Часы и дата -->
                <div class="flex items-center gap-3 bg-gray-800/50 rounded-full px-5 py-2 border border-yellow-500/30">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span class="text-yellow-400 font-mono text-xl tracking-wider">{{ formattedTime() }}</span>
                    <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>

                <!-- Правая панель: часы + статистика + меню -->
                <div class="flex items-center gap-4">
                    <!-- Блок со статистикой пользователей -->
                    <div class="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-gray-800/30 border border-white/5">
                        <!-- Всего пользователей -->
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <div class="flex flex-col">
                                <span class="text-xs text-gray-400">Всего</span>
                                <span class="text-sm font-bold text-white">{{ totalUsers.toLocaleString() }}</span>
                            </div>
                        </div>

                        <div class="w-px h-6 bg-white/10"></div>

                        <!-- Онлайн сейчас -->
                        <div class="flex items-center gap-2">
                            <div class="relative">
                                <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-xs text-gray-400">Онлайн</span>
                                <div class="flex items-center gap-1">
                                    <span class="text-sm font-bold text-green-400">{{ onlineUsers }}</span>
                                    <span class="text-xs text-gray-500">чел</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Компактная версия для планшетов -->
                    <div class="hidden md:flex lg:hidden items-center gap-2 px-2 py-1 rounded-lg bg-gray-800/30">
                        <svg class="w-3 h-3 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span class="text-xs text-white">{{ onlineUsers }}</span>
                    </div>

                    <!-- UserMenu (как был) -->
                    <UserMenu
                        v-if="isLoggedIn"
                        :user-name="userName"
                        :user-email="userEmail"
                        @logout="handleLogout"
                    />
                    <a
                        v-else
                        href="/login"
                        class="group relative px-5 py-2 rounded-xl overflow-hidden bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <span class="relative text-yellow-300 font-medium z-10">Войти</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 group-hover:translate-x-full transition-transform duration-500"></div>
                    </a>
                </div>
            </div>
        </nav>
    </header>
</template>
