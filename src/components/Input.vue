<template>
  <div :class="wrapperClass">
    <label :for="id" class="text-sm text-gray-600 leading-7">
      {{ label }}
      <span :class="{ 'label-error': hasError }" v-if="hasError">
        ( {{ error }} )
      </span>
    </label>
    <input
      :id="id"
      class="w-full px-3 py-1 text-base text-gray-700 bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 leading-8 transition-colors duration-200 ease-in-out"
      v-bind="$attrs"
      :class="{ 'has-error': hasError }"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: {
      type: [String, Object, Array],
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    wrapperClass: {
      type: String,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="postcss" scoped>
.label-error {
  @apply text-red-500;
}

.has-error {
  @apply border-red-500 bg-red-200;
}
</style>
