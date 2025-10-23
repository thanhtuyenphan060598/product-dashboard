<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div
      v-if="product"
      class="sticky top-1 z-[9999] bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 flex items-center gap-3 animate-pulse-once"
    >
      <span class="text-lg font-semibold text-indigo-600">Selected:</span>
      <span class="text-xl md:text-2xl font-bold text-gray-800">
        {{ product.name }}
      </span>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import type { Product } from '@/types'

defineProps<{
  product: Product | null
}>()
</script>

<style scoped>
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
</style>
