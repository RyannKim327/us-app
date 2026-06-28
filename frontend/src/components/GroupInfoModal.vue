<script setup lang="ts">
import type { Group, Report } from "../interfaces";

defineProps<{
  open: boolean;
  group: Group;
  reports: Report[];
  isAdmin: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Teleport to="body">

    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >

      <div
        class="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900"
      >

        <div class="flex items-center justify-between border-b border-slate-800 p-6">

          <h2 class="text-2xl font-bold text-slate-100">
            {{ group.emoji }} {{ group.name }}
          </h2>

          <button
            @click="emit('close')"
            class="text-2xl text-slate-500 hover:text-white"
          >
            ✕
          </button>

        </div>

        <div class="space-y-6 p-6">

          <div>

            <h3 class="font-semibold text-slate-100">
              Description
            </h3>

            <p class="mt-2 text-slate-400">
              {{ group.description }}
            </p>

          </div>

          <div>

            <h3 class="font-semibold text-slate-100">
              Created
            </h3>

            <p class="mt-2 text-slate-400">
              {{ group.createdAt }}
            </p>

          </div>

          <div v-if="isAdmin">

            <h3 class="mb-3 text-lg font-semibold text-red-400">
              Message Reports
            </h3>

            <div
              v-for="report in reports"
              :key="report.id"
              class="mb-3 rounded-xl border border-red-900 bg-red-950/20 p-4"
            >
              <p class="text-slate-100">
                <strong>Message #{{ report.messageId }}</strong>
              </p>

              <p class="mt-2 text-slate-300">
                {{ report.reason }}
              </p>

              <p class="mt-2 text-xs text-slate-500">
                {{ report.createdAt }}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </Teleport>
</template>
