<script setup>
import { computed, ref, watch } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import ProductCard from '@/Components/ProductCard.vue'
import Pagination from '@/Components/Pagination.vue'
import ProductLayout from "@/Layouts/ProductLayout.vue"
import { useGoldTheme} from "../../Composables/styles/useGoldTheme.js";

const props = defineProps({
    products: Object,
    categories: Array,
    filters: Object
})

const { theme } = useGoldTheme()
const loading = ref(false)
const page = usePage()

const form = ref({
    category_id: page.props.filters?.category_id ?? null,
    sort_by: page.props.filters?.sort_by ?? null,
    direction: page.props.filters?.direction ?? 'asc',
})

const hasActiveFilters = computed(() => {
    return form.value.category_id !== null || form.value.sort_by !== null
})

const applyFilters = () => {
    loading.value = true
    const queryParams = Object.fromEntries(
        Object.entries(form.value).filter(([_, value]) =>
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

const resetFilters = () => {
    form.value = {
        category_id: null,
        sort_by: null,
        direction: 'asc',
    }
    applyFilters()
}

watch(
    () => page.props.filters,
    (newFilters) => {
        form.value = {
            category_id: newFilters?.category_id ?? null,
            sort_by: newFilters?.sort_by ?? null,
            direction: newFilters?.direction ?? 'asc',
        }
    },
    {deep: true}
)
</script>

<template>
    <div class="page-enter-active">
        <ProductLayout>
            <div class="container mx-auto px-4 py-8 bg-white min-h-screen">
                <!-- Фильтры с динамической темой -->
                <div class="rounded-lg shadow-md p-6 mb-8"
                     :class="[theme.bg, theme.border]">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Категория</label>
                            <select
                                v-model="form.category_id"
                                @change="applyFilters"
                                class="w-full rounded-md shadow-sm focus:ring-2 transition-all duration-200"
                                :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`, `focus:border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`, 'text-white']"
                            >
                                <option :value="null">Все категории</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Сортировать по</label>
                            <select
                                v-model="form.sort_by"
                                @change="applyFilters"
                                class="w-full rounded-md shadow-sm focus:ring-2 transition-all duration-200"
                                :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`, `focus:border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`, 'text-white']"
                            >
                                <option :value="null">По умолчанию</option>
                                <option value="name">Названию</option>
                                <option value="price">Цене</option>
                                <option value="created_at">Дате добавления</option>
                            </select>
                        </div>

                        <div v-if="form.sort_by">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Направление</label>
                            <select
                                v-model="form.direction"
                                @change="applyFilters"
                                class="w-full rounded-md shadow-sm focus:ring-2 transition-all duration-200"
                                :class="[theme.inputBg, theme.border, `focus:ring-${theme.name === 'gold' ? 'yellow' : theme.name}-500`, `focus:border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`, 'text-white']"
                            >
                                <option value="asc">По возрастанию</option>
                                <option value="desc">По убыванию</option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-4 pt-4" :class="`border-t ${theme.border}`">
                        <button
                            @click="resetFilters"
                            class="text-sm disabled:opacity-50 transition-colors"
                            :class="[hasActiveFilters ? theme.text : 'text-gray-500', theme.textHover]"
                            :disabled="!hasActiveFilters"
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                </div>

                <!-- Товары -->
                <div v-if="loading" class="text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2"
                         :class="`border-${theme.name === 'gold' ? 'yellow' : theme.name}-500`"></div>
                </div>

                <div v-else-if="products.data.length === 0" class="text-center py-12 rounded-lg" :class="theme.inputBg">
                    <p class="text-gray-400 text-lg">Товары не найдены</p>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ProductCard
                        v-for="product in products.data"
                        :key="product.id"
                        :product="product"
                        :theme-color="theme.name"
                    />
                </div>

                <!-- Пагинация -->
                <div v-if="products.links" class="mt-8">
                    <Pagination :links="products.links"/>
                </div>
            </div>
        </ProductLayout>
    </div>
</template>
