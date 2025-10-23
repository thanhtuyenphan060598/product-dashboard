<template>
  <div
    class="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
    :class="{
      'ring-4 ring-indigo-500 ring-offset-2': isSelected,
      'opacity-60': product.status === 'out-of-stock',
    }"
    @click="$emit('select', product)"
  >
    <!-- Product Image -->
    <div class="relative h-48 overflow-hidden group">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        @error="handleImageError"
      />

      <!-- Status Badge -->
      <span
        class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
        :class="{
          'bg-green-500 text-white': product.status === 'available',
          'bg-red-500 text-white': product.status === 'out-of-stock',
          'bg-yellow-500 text-white': product.status === 'low-stock',
        }"
      >
        {{ product.status }}
      </span>
    </div>

    <!-- Product Info -->
    <div class="p-5">
      <h3 class="text-xl font-bold text-gray-800 mb-2 truncate">
        {{ product.name }}
      </h3>

      <p class="text-2xl font-bold text-indigo-600 mb-2">${{ product.price.toLocaleString() }}</p>

      <p class="text-sm text-gray-600 mb-4">
        <span class="font-semibold">Stock:</span>
        <span
          :class="{
            'text-yellow-600 font-semibold': product.stock < 10 && product.stock > 0,
            'text-red-600 font-semibold': product.stock === 0,
          }"
        >
          {{ product.stock }} units
        </span>
      </p>

      <!-- View Details Button -->
      <button
        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 active:scale-95"
        @click.stop="$emit('view-details', product)"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@/types.ts'

const DEFAULT_IMAGE =
  'https://i0.wp.com/collaborate4kids.com/wp-content/uploads/2024/12/dummy_product.jpg?fit=300%2C300&ssl=1'

const props = defineProps<{
  product: Product
  isSelected: boolean
}>()

defineEmits<{
  (e: 'select', product: Product): void
  (e: 'view-details', product: Product): void
}>()

const handleImageError = (event: Event) => {
  if (event.target instanceof HTMLImageElement) {
    console.warn(`Failed to load image for product: ${props.product.name}`)
    event.target.src = DEFAULT_IMAGE
    event.target.classList.add('error-image')
    event.target.onerror = null
  }
}
</script>

<style scoped>
img.error-image {
  filter: grayscale(100%);
  opacity: 0.8;
}
</style>
