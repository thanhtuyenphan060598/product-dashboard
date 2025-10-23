<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <ProductDashboardHeader />
      <SelectedProductCard :product="selectedProduct" />
      <SalesSummary :available-count="availableProductsCount" :total-value="totalAvailablePrice" />

      <template v-if="products.length > 0">
        <ProductGrid
          :products="products"
          :selected-product="selectedProduct"
          @select="selectProduct"
          @view-details="viewDetails"
        />
      </template>
      <EmptyState v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useLoadProducts } from '@/hooks/useLoadProducts'
import ProductDashboardHeader from './dashboard/ProductDashboardHeader.vue'
import SelectedProductCard from './dashboard/SelectedProductCard.vue'
import SalesSummary from './dashboard/SalesSummary.vue'
import ProductGrid from './dashboard/ProductGrid.vue'
import EmptyState from './dashboard/EmptyState.vue'
import type { Product } from '@/types.ts'

const { loadProducts } = useLoadProducts()
const products = ref<Product[]>([])
const selectedProduct = ref<Product | null>(null)

// Computed properties
const availableProductsCount = computed(() => {
  return products.value.filter((p) => p.status === 'available').length
})

const totalAvailablePrice = computed(() => {
  return products.value.filter((p) => p.status === 'available').reduce((sum, p) => sum + p.price, 0)
})

// Methods
const selectProduct = (product: Product) => {
  selectedProduct.value = product
}

const viewDetails = (product: Product) => {
  alert(
    `Product Details:\n\nName: ${product.name}\nPrice: $${product.price}\nStock: ${product.stock}\nStatus: ${product.status}`,
  )
}

onMounted(async () => {
  const res = await loadProducts()
  products.value = res
})
</script>

<style scoped>
/* Custom animation for selected product */
@keyframes pulse-once {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-once {
  animation: pulse-once 0.5s ease-in-out;
}

img.error-image {
  filter: grayscale(100%);
  opacity: 0.8;
}
</style>
