<script setup lang="ts">
import { computed, ref } from "vue";

import Sidebar from "../components/Sidebar.vue";
import ChatHeader from "../components/ChatHeader.vue";
import ChatBody from "../components/ChatBody.vue";
import ChatInput from "../components/ChatInput.vue";
import GroupInfoModal from "../components/GroupInfoModal.vue";

import groups from "../data/groups";
import users from "../data/users";
import messages from "../data/messages";
import reports from "../data/reports";

const selectedGroup = ref(1);
const infoOpen = ref(false);

// Demo current user
const currentUser = users[0];

const currentGroup = computed(() =>
  groups.find(g => g.id === selectedGroup.value)!
);

const groupMessages = computed(() =>
  messages.filter(m => m.groupId === selectedGroup.value)
);

const groupReports = computed(() =>
  reports.filter(r =>
    groupMessages.value.some(m => m.id === r.messageId)
  )
);

function send(message: string) {
  console.log(message);
}

function reply(id: number) {
  console.log("reply", id);
}

function report(id: number) {
  console.log("report", id);
}

function react(payload: any) {
  console.log(payload);
}
</script>

<template>
  <div class="flex h-full">

    <Sidebar
      :groups="groups"
      :users="users"
      :selected-group-id="selectedGroup"
      @select-group="selectedGroup = $event"
      @create-group="console.log('create')"
    />

    <main class="flex flex-1 flex-col">

      <ChatHeader
        :group="currentGroup"
        @info="infoOpen = true"
      />

      <div class="min-h-0 flex-1 overflow-hidden">

        <ChatBody
          :messages="groupMessages"
          :users="users"
          @reply="reply"
          @report="report"
          @react="react"
        />

      </div>

      <div class="border-t border-slate-800 p-5">

        <ChatInput
          @send="send"
        />

      </div>

    </main>

    <GroupInfoModal
      :open="infoOpen"
      :group="currentGroup"
      :reports="groupReports"
      :is-admin="currentUser.role === 'admin'"
      @close="infoOpen = false"
    />

  </div>
</template>
