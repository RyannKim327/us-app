<script setup lang="ts">
import type { User } from "../interfaces";

defineProps<{
  user: User;
}>();
</script>

<template>
  <div
    class="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2"
  >
    <div class="relative">

      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xl"
      >
        {{ user.avatar }}
      </div>

      <span
        :class="[
          'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900',
          user.online
            ? 'bg-green-500'
            : 'bg-slate-500'
        ]"
      />
    </div>

    <div class="flex flex-col">

      <span class="font-medium text-white">
        {{ user.username }}
      </span>

      <span
        class="text-xs"
        :class="user.online ? 'text-green-400' : 'text-slate-500'"
      >
        {{ user.online ? "Online" : "Offline" }}
      </span>

    </div>
  </div>
</template>
