<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Dashboard Title -->
      <h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
        Product Dashboard
      </h1>

      <!-- Selected Product Display -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div
          v-if="selectedProduct"
          class="sticky top-1 z-[9999] bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 flex items-center gap-3 animate-pulse-once"
        >
          <span class="text-lg font-semibold text-indigo-600">Selected:</span>
          <span class="text-xl md:text-2xl font-bold text-gray-800">
            {{ selectedProduct.name }}
          </span>
        </div>
      </transition>

      <!-- Sales Summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Available Products Card -->
        <div
          class="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <div class="text-5xl">📦</div>
          <div class="flex-1">
            <div class="text-sm text-gray-500 mb-1">Available Products</div>
            <div class="text-3xl font-bold text-gray-800">
              {{ availableProductsCount }}
            </div>
          </div>
        </div>

        <!-- Total Value Card -->
        <div
          class="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <div class="text-5xl">💰</div>
          <div class="flex-1">
            <div class="text-sm text-gray-500 mb-1">Total Value</div>
            <div class="text-3xl font-bold text-gray-800">
              ${{ totalAvailablePrice.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
          :class="{
            'ring-4 ring-indigo-500 ring-offset-2': selectedProduct?.id === product.id,
            'opacity-60': product.status === 'out-of-stock',
          }"
          @click="selectProduct(product)"
        >
          <!-- Product Image -->
          <div class="relative h-48 overflow-hidden group">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              @error="handleImageError($event, product)"
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

            <p class="text-2xl font-bold text-indigo-600 mb-2">
              ${{ product.price.toLocaleString() }}
            </p>

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
              @click.stop="viewDetails(product)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="products.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📦</div>
        <p class="text-white text-xl font-semibold">No products available</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useLoadProducts } from '@/hooks/useLoadProducts'

const DEFAULT_IMAGE =
  'https://i0.wp.com/collaborate4kids.com/wp-content/uploads/2024/12/dummy_product.jpg?fit=300%2C300&ssl=1'

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

const handleImageError = (event: ImageErrorEvent, product: Product): void => {
  console.warn(`Failed to load image for product: ${product.name}`)
  event.target.src = DEFAULT_IMAGE
  event.target.classList.add('error-image')
  event.target.onerror = null
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
