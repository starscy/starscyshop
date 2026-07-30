<script setup>
import { computed, ref, watch } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import ProductCard from '@/Components/ProductCard.vue'
import Pagination from '@/Components/Pagination.vue'
import ProductLayout from "@/Layouts/ProductLayout.vue"
import FiltersSection from '@/Components/FiltersSection.vue'
import { useTheme} from "@/Composables/styles/useTheme.js";

const props = defineProps({
    products: Object,
    categories: Array,
    filters: Object
})

const { theme } = useTheme()
const loading = ref(false)
const page = usePage()

// Инициализация с дефолтными значениями
const localFilters = ref({
    category_id: page.props.filters?.category_id ?? null,
    sort_by: page.props.filters?.sort_by ?? null,
    direction: page.props.filters?.direction ?? 'asc',
})

// Применение фильтров
const applyFilters = () => {
    loading.value = true
    const queryParams = Object.fromEntries(
        Object.entries(localFilters.value).filter(([_, value]) =>
            value !== null && value !== undefined && value !== ''
        )
    )
    router.get('/products', queryParams, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        onFinish: () => loading.value = false,
        onError: (errors) => {
            console.error('Filter error:', errors)
            loading.value = false
        }
    })
}

// Обработчики обновления фильтров
const updateCategory = (val) => {
    localFilters.value.category_id = val
    applyFilters()
}

const updateSortBy = (val) => {
    localFilters.value.sort_by = val
    applyFilters()
}

const updateDirection = (val) => {
    localFilters.value.direction = val
    applyFilters()
}

const resetFilters = () => {
    localFilters.value = {
        category_id: null,
        sort_by: null,
        direction: 'asc',
    }
    applyFilters()
}

// Синхронизация с пропсами из сервера
watch(
    () => page.props.filters,
    (newFilters) => {
        localFilters.value = {
            category_id: newFilters?.category_id ?? null,
            sort_by: newFilters?.sort_by ?? null,
            direction: newFilters?.direction ?? 'asc',
        }
    },
    { deep: true }
)
</script>

<template>
    <div class="page-enter-active">
        <ProductLayout>
            <!-- Фильтры -->
            <FiltersSection
                :categories="categories"
                :filters="localFilters"
                @update:category="updateCategory"
                @update:sortBy="updateSortBy"
                @update:direction="updateDirection"
                @reset="resetFilters"
            />
            <div class="container mx-auto px-4 py-8 bg-white min-h-screen">

                <!-- Товары -->
                <div v-if="loading" class="text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2"
                         :class="`border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`"></div>
                    <p class="mt-3 text-gray-500">Загрузка товаров...</p>
                </div>

                <div v-else-if="products.data.length === 0" class="text-center py-16 rounded-2xl" :class="theme.inputBg">
                    <svg class="w-20 h-20 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p class="text-gray-400 text-xl font-medium">Товары не найдены</p>
                    <p class="text-gray-500 text-sm mt-1">Попробуйте изменить параметры фильтрации</p>
                </div>

                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ProductCard
                        v-for="product in products.data"
                        :key="product.id"
                        :product="product"
                        :theme-color="theme.name"
                    />
                </div>

                <!-- Пагинация -->
                <div v-if="products.links && products.data.length > 0" class="mt-12">
                    <Pagination :links="products.links" />
                </div>
            </div>
        </ProductLayout>
    </div>
</template>
