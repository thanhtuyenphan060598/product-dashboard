<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :is-selected="selectedProduct?.id === product.id"
      @select="$emit('select', $event)"
      @view-details="$emit('view-details', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@/types.ts'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
  selectedProduct: Product | null
}>()

defineEmits<{
  (e: 'select', product: Product): void
  (e: 'view-details', product: Product): void
}>()
</script>
