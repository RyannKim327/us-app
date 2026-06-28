<script setup lang="ts">
const emit = defineEmits<{
  (e: "insert", markdown: string): void;
}>();

const buttons = [
  {
    label: "B",
    markdown: "****",
    title: "Bold",
  },
  {
    label: "I",
    markdown: "**",
    title: "Italic",
  },
  {
    label: "</>",
    markdown: "``",
    title: "Code",
  },
  {
    label: "•",
    markdown: "- ",
    title: "List",
  },
];
</script>

<template>
  <div
    class="flex gap-2 border-b border-slate-800 bg-slate-900/60 px-4 py-2"
  >
    <button
      v-for="button in buttons"
      :key="button.title"
      @click="emit('insert', button.markdown)"
      class="rounded-lg border border-slate-700 px-3 py-1 transition hover:border-cyan-500 hover:bg-slate-800"
    >
      {{ button.label }}
    </button>
  </div>
</template>
