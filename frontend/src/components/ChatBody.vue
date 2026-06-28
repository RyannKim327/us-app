<script setup lang="ts">
import ChatMessage from "./ChatMessage.vue";

import type { Message, User } from "../interfaces";

const props = defineProps<{
  messages: Message[];
  users: User[];
}>();

const emit = defineEmits<{
  (e: "reply", id: number): void;
  (e: "report", id: number): void;
  (e: "react", payload: { id: number; emoji: string }): void;
}>();

function getUser(id: number) {
  return (
    props.users.find((u) => u.id === id) ??
    ({
      id: 0,
      avatar: "❓",
      username: "Unknown",
      online: false,
      role: "member",
    } as User)
  );
}

function getReply(message: Message) {
  if (message.replyTo == null) return null;

  const reply = props.messages.find((m) => m.id === message.replyTo);

  if (!reply) return null;

  const user = getUser(reply.userId);

  return {
    username: user.username,
    avatar: user.avatar,
    content: reply.content,
  };
}
</script>

<template>
  <div class="flex h-full flex-col gap-6 overflow-y-auto p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-100">
    <ChatMessage
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :user="getUser(message.userId)"
      :reply="getReply(message)"
      @reply="emit('reply', $event)"
      @report="emit('report', $event)"
      @react="emit('react', $event)"
    />
  </div>
</template>
