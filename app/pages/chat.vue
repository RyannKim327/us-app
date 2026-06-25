<template>
  <div class="h-dvh w-dvw flex overflow-hidden bg-slate-950 text-white relative">
    <!-- Mobile Sidebar Backdrop -->
    <div
      v-if="isMobileSidebarOpen"
      @click="isMobileSidebarOpen = false"
      class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-30 flex w-72 shrink-0 flex-col border-r border-white/10 bg-slate-900/80 backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0"
      :class="isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Sidebar Header -->
      <div class="flex h-16 items-center justify-between border-b border-white/10 px-6">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 text-base">💬</span>
          <span>UsApp</span>
        </NuxtLink>
        <button
          @click="isMobileSidebarOpen = false"
          class="rounded-lg p-1.5 hover:bg-white/10 md:hidden"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Search channels -->
      <div class="px-4 py-3">
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-white/40">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search channels..."
            class="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder-white/30 outline-none transition focus:border-white/20 focus:bg-white/10"
          />
        </div>
      </div>

      <!-- Scrollable lists -->
      <div class="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <!-- Channels list -->
        <div>
          <div class="flex items-center justify-between px-3 mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-white/40">Channels & Groups</span>
            <button
              @click="openCreateGroupModal"
              class="rounded p-1 hover:bg-white/10 text-cyan-400 transition hover:scale-105"
              title="Create new group"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div class="space-y-1">
            <button
              v-for="chan in filteredChannels"
              :key="chan.id"
              @click="selectChannel(chan.id)"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm transition"
              :class="activeChannelId === chan.id ? 'bg-gradient-to-r from-blue-600/40 to-cyan-500/20 border-l-4 border-cyan-400 text-white font-medium shadow-inner' : 'hover:bg-white/5 text-white/70 hover:text-white'"
            >
              <span class="text-lg shrink-0">
                {{ chan.type === 'global' ? '🌐' : '👥' }}
              </span>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm">{{ chan.name }}</p>
                <p class="truncate text-[10px] text-white/40" v-if="chan.description">
                  {{ chan.description }}
                </p>
              </div>
              <span
                v-if="chan.memberCount"
                class="text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded-full"
              >
                {{ chan.memberCount }}
              </span>
            </button>
          </div>
        </div>

        <!-- Online Users list -->
        <div>
          <div class="flex items-center justify-between px-3 mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-white/40">Online users ({{ onlineUsers.length + 1 }})</span>
          </div>

          <div class="space-y-2">
            <!-- Current user item -->
            <div class="flex items-center gap-3 px-3 py-1.5" v-if="currentUser">
              <div class="relative shrink-0">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-xl border border-cyan-500/30">
                  {{ currentUser.avatar }}
                </div>
                <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-slate-900"></span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-xs font-semibold text-white">{{ currentUser.username }} <span class="text-[9px] text-cyan-300 bg-cyan-950 px-1 rounded">You</span></p>
                <p class="truncate text-[10px] text-white/50">Online</p>
              </div>
            </div>

            <!-- Other online users -->
            <div
              v-for="user in onlineUsers"
              :key="user.id"
              class="flex items-center gap-3 px-3 py-1.5 hover:bg-white/5 rounded-lg transition"
            >
              <div class="relative shrink-0">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-xl border border-white/5">
                  {{ user.avatar }}
                </div>
                <span
                  class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-slate-900"
                  :class="user.status === 'online' ? 'bg-green-500' : user.status === 'away' ? 'bg-amber-500' : 'bg-slate-500'"
                ></span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-xs font-medium text-white/90">{{ user.username }}</p>
                <p class="truncate text-[10px] text-white/40" v-if="user.statusText">
                  {{ user.statusText }}
                </p>
                <p class="truncate text-[10px] text-white/40" v-else>
                  {{ user.status === 'online' ? 'Online' : user.status === 'away' ? 'Away' : 'Offline' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Profile Footer -->
      <div class="mt-auto border-t border-white/10 bg-slate-950/40 p-4" v-if="currentUser">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 min-w-0">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              {{ currentUser.avatar }}
            </div>
            <div class="min-w-0">
              <p class="truncate text-sm font-bold text-white">{{ currentUser.username }}</p>
              <p class="truncate text-[10px] text-blue-200/60">{{ currentUser.email }}</p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-red-300 transition"
            title="Log Out"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Chat Window -->
    <main class="flex flex-1 flex-col h-full bg-slate-900/40 relative">
      <!-- Top header bar -->
      <header class="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-6 z-10">
        <div class="flex items-center gap-3 min-w-0">
          <button
            @click="isMobileSidebarOpen = true"
            class="mr-2 rounded-xl p-1.5 hover:bg-white/10 md:hidden"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <span class="text-2xl shrink-0">
            {{ activeChannel?.type === 'global' ? '🌐' : '👥' }}
          </span>
          <div class="min-w-0">
            <h1 class="truncate text-base font-bold text-white">{{ activeChannel?.name }}</h1>
            <p class="truncate text-xs text-white/50" v-if="activeChannel?.description">
              {{ activeChannel.description }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 border border-cyan-400/20">
            <span class="h-2 w-2 rounded-full bg-cyan-400"></span>
            {{ activeChannel?.memberCount || 1 }} active users
          </span>
        </div>
      </header>

      <!-- Message Area -->
      <div
        ref="messageContainer"
        class="flex-1 overflow-y-auto px-6 py-6 space-y-4"
      >
        <div
          v-for="(msg, index) in activeChannelMessages"
          :key="msg.id"
          class="flex flex-col"
        >
          <!-- System Message -->
          <div v-if="msg.isSystem" class="my-4 mx-auto w-fit">
            <div class="rounded-full bg-white/5 border border-white/10 px-4 py-1 text-[11px] text-white/60 backdrop-blur flex items-center gap-1.5">
              <span>⚙️</span>
              <span>{{ msg.content }}</span>
            </div>
          </div>

          <!-- Normal Message -->
          <div
            v-else
            class="flex gap-3 group max-w-[80%]"
            :class="msg.senderId === currentUser?.id ? 'self-end flex-row-reverse' : 'self-start'"
          >
            <!-- Avatar -->
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl select-none">
              {{ msg.senderAvatar }}
            </div>

            <!-- Content Bubble Wrapper -->
            <div class="space-y-1" :class="msg.senderId === currentUser?.id ? 'text-right' : 'text-left'">
              <!-- Username + Time -->
              <div class="flex items-center gap-2 text-xs">
                <span class="font-bold text-white/80" v-if="msg.senderId !== currentUser?.id">
                  {{ msg.senderName }}
                </span>
                <span class="text-[10px] text-white/40">
                  {{ formatTime(msg.timestamp) }}
                </span>
              </div>

              <!-- Message Bubble -->
              <div
                class="rounded-2xl px-4 py-2.5 text-sm break-words whitespace-pre-wrap shadow-lg"
                :class="msg.senderId === currentUser?.id
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-tr-none'
                  : 'bg-white/10 text-white border border-white/5 rounded-tl-none'"
              >
                {{ msg.content }}
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="activeChannelMessages.length === 0" class="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
          <div class="text-5xl mb-4">💬</div>
          <h3 class="text-lg font-bold">No messages here yet</h3>
          <p class="text-xs text-white/60 max-w-xs mt-1">Be the first to start the conversation! Type a message below and hit send.</p>
        </div>
      </div>

      <!-- Bottom Chat Bar Input -->
      <footer class="p-4 border-t border-white/10 bg-slate-900/40 backdrop-blur-md">
        <form @submit.prevent="handleSend" class="relative">
          <!-- Emoji Picker Panel -->
          <div
            v-if="showEmojiPicker"
            class="absolute bottom-16 left-0 z-20 w-64 rounded-2xl border border-white/15 bg-slate-900 p-3 shadow-2xl backdrop-blur"
          >
            <div class="flex justify-between items-center mb-2 px-1">
              <span class="text-[10px] font-bold text-white/40 uppercase">Quick Emojis</span>
              <button @click="showEmojiPicker = false" class="text-white/40 hover:text-white text-xs">Close</button>
            </div>
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="emoji in quickEmojis"
                :key="emoji"
                type="button"
                @click="insertEmoji(emoji)"
                class="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/15 text-lg transition"
              >
                {{ emoji }}
              </button>
            </div>
          </div>

          <!-- Input bar wrapper -->
          <div class="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 focus-within:border-white/20 focus-within:bg-white/10 transition">
            <!-- Action items -->
            <div class="flex items-center">
              <button
                type="button"
                @click="showEmojiPicker = !showEmojiPicker"
                class="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-white transition"
                title="Add Emoji"
              >
                😊
              </button>
              <button
                type="button"
                @click="triggerMockAttach"
                class="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-white transition"
                title="Attach file (demo)"
              >
                📎
              </button>
            </div>

            <!-- TextInput -->
            <input
              ref="chatInput"
              v-model="messageInput"
              type="text"
              placeholder="Type your message..."
              class="flex-1 bg-transparent border-0 outline-none px-2 py-2 text-sm text-white placeholder-white/30"
              @keydown.esc="showEmojiPicker = false"
            />

            <!-- Send button -->
            <button
              type="submit"
              :disabled="!messageInput.trim()"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 transition hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:active:scale-100 shadow"
            >
              <svg class="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </footer>
    </main>

    <!-- Create Group Channel Modal -->
    <div
      v-if="isCreateGroupModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
    >
      <div class="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h3 class="text-xl font-bold text-white mb-2">Create New Channel</h3>
        <p class="text-xs text-white/50 mb-6">Channels are where your group members hang out. Create one for a specific topic or project.</p>

        <form @submit.prevent="handleCreateGroup" class="space-y-4">
          <div>
            <label for="group-name" class="block text-xs font-semibold text-white/80 mb-2">Channel Name</label>
            <input
              id="group-name"
              v-model="groupForm.name"
              type="text"
              required
              placeholder="e.g. Design Team"
              class="w-full rounded-2xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/30 focus:bg-white/10"
            />
          </div>

          <div>
            <label for="group-desc" class="block text-xs font-semibold text-white/80 mb-2">Description (Optional)</label>
            <textarea
              id="group-desc"
              v-model="groupForm.description"
              rows="3"
              placeholder="What is this channel about?"
              class="w-full rounded-2xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/30 focus:bg-white/10 resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="closeCreateGroupModal"
              class="rounded-xl border border-white/10 py-3 px-5 text-sm font-semibold transition hover:bg-white/5 text-white/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-xl bg-white py-3 px-5 text-sm font-bold text-blue-600 shadow transition hover:scale-105 active:scale-95"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useChat } from '~/composables/useChat'

const {
  currentUser,
  channels,
  onlineUsers,
  activeChannelId,
  activeChannel,
  activeChannelMessages,
  sendMessage,
  createChannel,
  logout,
  initializeState
} = useChat()

// Refs
const isMobileSidebarOpen = ref(false)
const isCreateGroupModalOpen = ref(false)
const showEmojiPicker = ref(false)
const searchQuery = ref('')
const messageInput = ref('')
const messageContainer = ref(null)
const chatInput = ref(null)

// Emojis list
const quickEmojis = [
  '👋', '👍', '😊', '😂', '🔥', '🎉',
  '❤️', '🚀', '💯', '🤔', '👀', '💡',
  '💻', '🙌', '✨', '✔️', '💀', '😱'
]

// Modal forms
const groupForm = reactive({
  name: '',
  description: ''
})

// Lifecycle
onMounted(() => {
  initializeState()
  if (!currentUser.value) {
    navigateTo('/login')
    return
  }
  
  // Initial scroll
  scrollToBottom()
  
  // Set intervals to simulate active users status changes
  const interval = setInterval(() => {
    if (onlineUsers.value.length > 0 && Math.random() > 0.6) {
      const user = onlineUsers.value[Math.floor(Math.random() * onlineUsers.value.length)]
      const statuses = ['online', 'away']
      user.status = statuses[Math.floor(Math.random() * statuses.length)]
      
      const phrases = [
        'Coding in Nuxt...',
        'Brb, getting coffee ☕',
        'Follow the white rabbit',
        'At your service.',
        'Baking some bread',
        'Reviewing PRs 📂',
        'In a meeting 🔇',
        'Eating noodles 🍜'
      ]
      user.statusText = user.status === 'online' ? phrases[Math.floor(Math.random() * phrases.length)] : 'Away'
    }
  }, 12000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})

// Scroll helper
const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

// Watch active messages to scroll to bottom on new additions
watch(() => activeChannelMessages.value.length, () => {
  scrollToBottom()
})

// Watch active channel ID to scroll to bottom and close mobile menu
watch(activeChannelId, () => {
  scrollToBottom()
  isMobileSidebarOpen.value = false
})

// Computed
const filteredChannels = computed(() => {
  if (!searchQuery.value.trim()) return channels.value
  const query = searchQuery.value.toLowerCase()
  return channels.value.filter(c => c.name.toLowerCase().includes(query) || (c.description && c.description.toLowerCase().includes(query)))
})

// Actions
const selectChannel = (id) => {
  activeChannelId.value = id
}

const handleSend = () => {
  if (!messageInput.value.trim()) return
  sendMessage(activeChannelId.value, messageInput.value.trim())
  messageInput.value = ''
  showEmojiPicker.value = false
  if (chatInput.value) {
    chatInput.value.focus()
  }
}

const insertEmoji = (emoji) => {
  messageInput.value += emoji
  showEmojiPicker.value = false
  if (chatInput.value) {
    chatInput.value.focus()
  }
}

const triggerMockAttach = () => {
  alert('📎 Attachment demo: File upload successfully simulated!')
}

const openCreateGroupModal = () => {
  groupForm.name = ''
  groupForm.description = ''
  isCreateGroupModalOpen.value = true
}

const closeCreateGroupModal = () => {
  isCreateGroupModalOpen.value = false
}

const handleCreateGroup = () => {
  if (!groupForm.name.trim()) return
  createChannel(groupForm.name, groupForm.description)
  isCreateGroupModalOpen.value = false
}

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

// Time formatter helper
const formatTime = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>
