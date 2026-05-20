import { ref, onMounted, onUnmounted } from 'vue'

export function useRealTimeClock(updateInterval = 1000) {
    const currentTime = ref(new Date())
    let timerId = null

    const updateTime = () => {
        currentTime.value = new Date()
    }

    const startClock = () => {
        if (timerId) clearInterval(timerId)
        updateTime() // сразу показываем текущее время
        timerId = setInterval(updateTime, updateInterval)
    }

    const stopClock = () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        }
    }

    // Форматирование времени (без лишних вычислений)
    const formattedTime = () => {
        const time = currentTime.value
        return time.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: updateInterval === 1000 ? '2-digit' : undefined
        })
    }

    const formattedDate = () => {
        return currentTime.value.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    if (typeof window !== 'undefined') {
        onMounted(startClock)
        onUnmounted(stopClock)
    }

    return {
        currentTime,
        formattedTime,
        formattedDate,
        startClock,
        stopClock
    }
}
