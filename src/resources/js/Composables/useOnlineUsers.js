// resources/js/Composables/useOnlineUsers.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useOnlineUsers() {
    const totalUsers = ref(0)
    const onlineUsers = ref(0)
    const loading = ref(true)
    let intervalId = null

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/users/stats')
            const data = await response.json()
            totalUsers.value = data.total
            onlineUsers.value = data.online
            loading.value = false
        } catch (error) {
            console.error('Failed to fetch user stats:', error)
            loading.value = false
        }
    }

    const startPolling = () => {
        if (intervalId) clearInterval(intervalId)
        fetchStats() // сразу загружаем
        intervalId = setInterval(fetchStats, 30000) // каждые 30 секунд
    }

    const stopPolling = () => {
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    if (typeof window !== 'undefined') {
        onMounted(startPolling)
        onUnmounted(stopPolling)
    }

    return {
        totalUsers,
        onlineUsers,
        loading,
        fetchStats,
        startPolling,
        stopPolling
    }
}
