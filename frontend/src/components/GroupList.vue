<script setup lang="ts">
import GroupCard from "./GroupCard.vue";

import type { Group } from "../interfaces";

defineProps<{
  groups: Group[];
  selectedGroupId: number;
}>();

const emit = defineEmits<{
  (e: "select", id: number): void;
  (e: "create"): void;
}>();
</script>

<template>
  <div class="flex h-full flex-col">

    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-white">
        Groups
      </h2>

      <button
        @click="emit('create')"
        class="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500 text-xl font-bold transition hover:bg-cyan-400"
      >
        +
      </button>
    </div>

    <!-- List -->
    <div class="space-y-3 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-100">
      <GroupCard
        v-for="group in groups"
        :key="group.id"
        :group="group"
        :active="selectedGroupId === group.id"
        @select="emit('select', group.id)"
      />
    </div>

  </div>
</template>
