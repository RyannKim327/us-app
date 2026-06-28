<script setup lang="ts">
import UserChip from "./UserChip.vue";

import type { User } from "../interfaces";

defineProps<{
  users: User[];
}>();
</script>

<template>
  <div class="flex h-full flex-col">

    <h2 class="mb-4 text-lg font-semibold text-white">
      Online Users
    </h2>

    <div class="space-y-3 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-100">

      <UserChip
        v-for="user in users"
        :key="user.id"
        :user="user"
      />

    </div>

  </div>
</template>
