# Modal.vue
<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" @click="handleBackdropClick">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50"></div>

      <!-- Modal content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all"
          @click.stop
        >
          <!-- Header -->
          <div class="mb-4 flex items-center justify-between border-b pb-3">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              <slot name="title"></slot>
            </h3>
            <button
              @click="handleClose"
              class="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="mt-2">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

const handleBackdropClick = (e) => {
  handleClose()
}
</script>