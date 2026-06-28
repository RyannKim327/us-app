<script setup lang="ts">
import ReactionBar from "./ReactionBar.vue";
import ReplyPreview from "./ReplyPreview.vue";

import type { Message, User } from "../interfaces";

defineProps<{
  message: Message;
  user: User;

  reply?: {
    username: string;
    avatar: string;
    content: string;
  } | null;
}>();

const emit = defineEmits<{
  (e: "reply", id: number): void;
  (e: "report", id: number): void;
  (e: "react", payload: { id: number; emoji: string }): void;
}>();
</script>

<template>
  <div class="group flex gap-4">

    <!-- Avatar -->

    <div
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-800 text-2xl"
    >
      {{ user.avatar }}
    </div>

    <!-- Content -->

    <div class="flex-1">

      <div class="flex items-center gap-3">

        <span class="font-semibold text-white">
          {{ user.username }}
        </span>

        <span class="text-xs text-slate-500">
          {{ message.createdAt }}
        </span>

      </div>

      <ReplyPreview
        v-if="reply"
        :username="reply.username"
        :avatar="reply.avatar"
        :content="reply.content"
      />

      <div
        class="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-900/60 p-4"
      >
        {{ message.content }}
      </div>

      <ReactionBar
        :reactions="message.reactions"
        @react="emit('react', { id: message.id, emoji: $event })"
      />

      <!-- Hover actions -->

      <div
        class="mt-2 flex gap-4 opacity-0 transition group-hover:opacity-100"
      >

        <button
          @click="emit('reply', message.id)"
          class="text-sm text-cyan-400 hover:text-cyan-300"
        >
          Reply
        </button>

        <button
          @click="emit('report', message.id)"
          class="text-sm text-red-400 hover:text-red-300"
        >
          Report
        </button>

      </div>

    </div>

  </div>
</template>
