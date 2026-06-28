<script setup lang="ts">
defineProps<{
  username: string;
  avatar: string;
  content: string;
}>();
</script>

<template>
  <div
    class="mb-2 rounded-lg border-l-4 border-cyan-500 bg-slate-800/60 p-3"
  >

    <div class="flex items-center gap-2">

      <span class="text-lg">
        {{ avatar }}
      </span>

      <span class="font-medium text-cyan-400">
        {{ username }}
      </span>

    </div>

    <p
      class="mt-1 line-clamp-2 text-sm text-slate-400"
    >
      {{ content }}
    </p>

  </div>
</template>
