<script setup lang="ts">
import type { Reaction } from "../interfaces";

defineProps<{
  reactions: Reaction[];
}>();

const emit = defineEmits<{
  (e: "react", emoji: string): void;
}>();

const availableReactions = [
  "👍",
  "❤️",
  "😂",
  "🔥",
  "👀",
];
</script>

<template>
  <div class="mt-2 flex flex-wrap items-center gap-2">

    <button
      v-for="reaction in reactions"
      :key="reaction.emoji"
      @click="emit('react', reaction.emoji)"
      class="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-sm transition hover:border-cyan-500 hover:bg-slate-700"
    >
      {{ reaction.emoji }}
      {{ reaction.count }}
    </button>

    <div class="flex gap-1">

      <button
        v-for="emoji in availableReactions"
        :key="emoji"
        @click="emit('react', emoji)"
        class="rounded-full p-1 opacity-60 transition hover:bg-slate-700 hover:opacity-100"
      >
        {{ emoji }}
      </button>

    </div>

  </div>
</template>
