<script setup lang="ts">
import GroupList from "./GroupList.vue";
import OnlineUsers from "./OnlineUsers.vue";

import type { Group, User } from "../interfaces";

defineProps<{
  groups: Group[];
  users: User[];
  selectedGroupId: number;
}>();

const emit = defineEmits<{
  (e: "select-group", id: number): void;
  (e: "create-group"): void;
}>();
</script>

<template>
  <aside
    class="flex h-full w-80 flex-col border-r border-slate-800 bg-slate-950/60 backdrop-blur-xl"
  >

    <!-- Logo -->

    <div
      class="border-b border-slate-800 p-6"
    >
      <h1
        class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-black text-transparent"
      >
        Us-APP
      </h1>

      <p class="mt-1 text-sm text-slate-500">
        Anonymous Communities
      </p>
    </div>

    <!-- Groups -->

    <div
      class="flex-1 overflow-hidden p-5"
    >
      <GroupList
        :groups="groups"
        :selected-group-id="selectedGroupId"
        @select="emit('select-group', $event)"
        @create="emit('create-group')"
      />
    </div>

    <!-- Divider -->

    <div
      class="mx-5 border-t border-slate-800"
    />

    <!-- Users -->

    <div
      class="h-72 overflow-hidden p-5"
    >
      <OnlineUsers
        :users="users"
      />
    </div>

  </aside>
</template>
