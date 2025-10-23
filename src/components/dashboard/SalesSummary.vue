<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <!-- Available Products Card -->
    <div
      class="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <div class="text-5xl">📦</div>
      <div class="flex-1">
        <div class="text-sm text-gray-500 mb-1">Available Products</div>
        <div class="text-3xl font-bold text-gray-800">
          {{ availableCount }}
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
        <div class="text-3xl font-bold text-gray-800">${{ totalValue.toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  availableCount: number
  totalValue: number
}>()
</script>
