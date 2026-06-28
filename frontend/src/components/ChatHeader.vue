<script setup lang="ts">
import type { Group } from "../interfaces";

defineProps<{
  group: Group;
}>();

const emit = defineEmits<{
  (e: "info"): void;
}>();
</script>

<template>
  <header
    class="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/70 px-6 backdrop-blur-xl"
  >
    <div>
      <h1 class="text-2xl font-bold">
        {{ group.emoji }} {{ group.name }}
      </h1>

      <p class="mt-1 text-sm text-slate-400">
        {{ group.description }}
      </p>
    </div>

    <button
      @click="emit('info')"
      class="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-cyan-500 hover:bg-slate-800"
    >
      ℹ Info
    </button>
  </header>
</template>
