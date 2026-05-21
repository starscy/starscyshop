<!-- ProductCard.vue -->
<script setup>
import {Link} from '@inertiajs/vue3'
import {useFormatters} from '@/Composables/useFormatters'
import {getTwClasses} from '@/Composables/styles/useGoldTheme'
import {computed} from "vue";

const props = defineProps({
    product: Object,
    themeColor: {type: String, default: 'gold'}
})

const {formatPrice, formatRelativeDate} = useFormatters()
const tw = computed(() => getTwClasses(props.themeColor))
</script>

<template>
    <!-- ✅ Белый фон всегда, бордер по теме -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
         :class="`border ${tw.border} ${tw.borderHover}`">

        <div class="p-4">
            <!-- Заголовок: нейтральный -->
            <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {{ product.name }}
            </h3>

            <!-- Категория: акцент по теме -->
            <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
                <div>
                    <span>Категория:</span>
                    <span class="font-medium ml-1">
            {{ product.category?.name || 'Без категории' }}
          </span>
                </div>
                <div v-if="product.created_at" class="text-gray-400">
                    🆕 {{ formatRelativeDate(product.created_at) }}
                </div>
            </div>

            <!-- Цена и ссылка: по теме -->
            <div class="flex justify-between items-center mt-3">
        <span class="text-xl font-bold" >
          {{ formatPrice(product.price) }}
        </span>

                <Link :href="`/products/${product.id}`"
                      class="inline-flex items-center gap-1 text-sm font-medium group"
                >
                    <span>Подробнее</span>
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    </div>
</template>
