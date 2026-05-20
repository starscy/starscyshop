<script setup>
import { ref, computed } from 'vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    userName: {
        type: String,
        default: 'Пользователь'
    },
    userEmail: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['logout'])

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}

const handleLogout = () => {
    closeMenu()
    emit('logout')
}

const userInitial = computed(() => {
    return props.userName ? props.userName.charAt(0).toUpperCase() : 'З'
})

const displayName = computed(() => {
    if (props.userName && props.userName !== 'Гость') {
        return props.userName.length > 20 ? props.userName.substring(0, 20) + '...' : props.userName
    }
    return 'Администратор'
})

// Закрываем меню при клике вне его
const handleClickOutside = (event) => {
    if (isMenuOpen.value && !event.target.closest('.relative')) {
        closeMenu()
    }
}

// Добавляем/удаляем слушатель кликов
if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside)
}
</script>

<template>
    <nav class="flex items-center">
        <div class="relative">
            <!-- Кнопка профиля -->
            <button
                @click="toggleMenu"
                class="flex items-center gap-3 px-4 py-2 rounded-xl
                       bg-gray-800/50 hover:bg-gray-700/50
                       border border-yellow-500/30 hover:border-yellow-400/50
                       backdrop-blur-sm transition-all duration-300
                       hover:scale-105 active:scale-95 group"
            >
                <!-- Анимированная звезда вместо аватара -->
                <div class="relative">
                    <!-- Маленькая мерцающая звезда -->
                    <div class="absolute -top-1 -right-1">
                        <svg class="w-2 h-2 text-yellow-300 animate-ping" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                        </svg>
                    </div>
                </div>

                <div class="hidden md:flex flex-col items-start">
                    <span class="text-sm font-semibold text-yellow-400 leading-tight">{{ displayName }}</span>
                </div>

                <svg
                    class="w-4 h-4 text-yellow-400 transition-transform duration-300"
                    :class="{ 'rotate-180': isMenuOpen }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <!-- Выпадающее меню -->
            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0 -translate-y-2"
                enter-to-class="transform scale-100 opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="transform scale-100 opacity-100 translate-y-0"
                leave-to-class="transform scale-95 opacity-0 -translate-y-2"
            >
                <div
                    v-if="isMenuOpen"
                    class="absolute right-0 mt-2 w-64
                           bg-gray-900/95 backdrop-blur-xl
                           border border-yellow-500/30
                           rounded-2xl shadow-2xl
                           overflow-hidden z-50"
                >
                    <!-- Информация о пользователе -->
                    <div class="px-4 py-3 border-b border-yellow-500/20">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <svg class="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                                </svg>
                                <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-yellow-400">{{ displayName }}</p>
                                <p class="text-xs text-gray-400 truncate">{{ userEmail || '' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Ссылки меню -->
                    <div class="py-2">
                        <Link
                            href="/admin/products"
                            class="flex items-center gap-3 px-4 py-2.5
                                   text-sm text-gray-300 hover:text-yellow-400
                                   hover:bg-yellow-500/10
                                   transition-all duration-200"
                            @click="closeMenu"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>Мои товары</span>
                        </Link>

                        <Link
                            href="/admin/profile"
                            class="flex items-center gap-3 px-4 py-2.5
                                   text-sm text-gray-300 hover:text-yellow-400
                                   hover:bg-yellow-500/10
                                   transition-all duration-200"
                            @click="closeMenu"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Профиль</span>
                        </Link>

                        <Link
                            href="/admin/settings"
                            class="flex items-center gap-3 px-4 py-2.5
                                   text-sm text-gray-300 hover:text-yellow-400
                                   hover:bg-yellow-500/10
                                   transition-all duration-200"
                            @click="closeMenu"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Настройки</span>
                        </Link>
                    </div>

                    <hr class="border-yellow-500/20">

                    <!-- Кнопка выхода -->
                    <button
                        @click="handleLogout"
                        class="flex items-center gap-3 w-full px-4 py-3
                               text-sm text-red-400 hover:text-red-300
                               hover:bg-red-500/10
                               transition-all duration-200
                               group"
                    >
                        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Выйти из аккаунта</span>
                    </button>
                </div>
            </transition>
        </div>
    </nav>
</template>
