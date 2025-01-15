<script setup>
defineProps({
  label: {
    type: String,
    default: null
  },
  labelFor: {
    type: String,
    default: null
  },
  help: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="mb-6 last:mb-0">
    <label v-if="label" :for="labelFor" class="block font-bold mb-2">{{ label }}</label>
    <div>
      <slot />
    </div>
    <div v-if="help" class="text-xs text-gray-500 dark:text-slate-400 mt-1">
      {{ help }}
    </div>
  </div>
</template>
