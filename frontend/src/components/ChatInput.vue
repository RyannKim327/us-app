<script setup lang="ts">
import { ref } from "vue";

import MarkdownToolbar from "./MarkdownToolbar.vue";
import ReplyPreview from "./ReplyPreview.vue";

const emit = defineEmits<{
  (e: "send", message: string): void;
}>();

const message = ref("");

const reply = ref<{
  username: string;
  avatar: string;
  content: string;
} | null>(null);

function insert(markdown: string) {
  message.value += markdown;
}

function send() {
  if (!message.value.trim()) return;

  emit("send", message.value);

  message.value = "";
}
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"
  >
    <MarkdownToolbar @insert="insert" />

    <ReplyPreview
      v-if="reply"
      :username="reply.username"
      :avatar="reply.avatar"
      :content="reply.content"
      class="m-4"
    />

    <textarea
      v-model="message"
      rows="4"
      placeholder="Write something to the community..."
      class="min-h-32 w-full resize-none bg-transparent p-4 outline-none"
      @keydown.enter.exact.prevent="send"
      @keydown.shift.enter.stop
    />

    <div
      class="flex items-center justify-between border-t border-slate-800 p-4"
    >
      <span class="text-sm text-slate-500">
        Markdown supported (bold, italic, code, lists)
      </span>

      <button
        @click="send"
        class="rounded-xl bg-cyan-500 px-6 py-2 font-semibold transition hover:bg-cyan-400"
      >
        Send
      </button>
    </div>
  </div>
</template>
