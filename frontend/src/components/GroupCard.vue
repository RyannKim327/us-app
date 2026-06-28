<script setup lang="ts">
import type { Group } from "../interfaces";

defineProps<{
  group: Group;
  active?: boolean;
}>();

const emit = defineEmits<{
  (e: "select"): void;
}>();
</script>

<template>
  <button
    @click="emit('select')"
    :class="[
      'w-full rounded-xl border p-4 text-left transition-all duration-200',
      active
        ? 'border-cyan-500 bg-cyan-500/10'
        : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/70'
    ]"
  >
    <h3 class="font-semibold text-white">
      {{ group.name }}
    </h3>

    <p class="mt-1 line-clamp-2 text-sm text-slate-400">
      {{ group.description }}
    </p>
  </button>
</template>
