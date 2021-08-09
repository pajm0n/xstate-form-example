<template>
  <div :class="wrapperClass">
    <label :for="id" class="text-sm text-gray-600 leading-7">
      {{ label }}
      <span :class="{ 'label-error': hasError }" v-if="hasError">
        ( {{ error }} )
      </span>
    </label>

    <textarea
      :id="id"
      v-bind="$attrs"
      v-model="text"
      class="w-full h-32 px-3 py-1 text-base text-gray-700 bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 leading-6 transition-colors duration-200 ease-in-out"
      :class="{ 'has-error': hasError }"
    ></textarea>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "Textarea",
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
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const text = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    return {
      text,
    };
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
