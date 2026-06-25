<template>
  <main class="flex h-full flex-col items-center px-4 py-8 overflow-y-auto">
    <div class="w-full max-w-md space-y-6">
      <!-- Header -->
      <div class="flex flex-col items-center text-center">
        <NuxtLink to="/" class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-3xl shadow-lg shadow-blue-500/25 transition hover:scale-110">
          💬
        </NuxtLink>
        <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
          Create account
        </h2>
        <p class="mt-1 text-sm text-white/60">
          Join UsApp and connect with awesome groups today.
        </p>
      </div>

      <!-- Card -->
      <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
        <form class="space-y-4" @submit.prevent="handleRegister">
          <!-- Alert for Error -->
          <div v-if="errorMsg" class="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-300 flex items-start gap-2 animate-pulse">
            <svg class="h-4 w-4 shrink-0 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMsg }}</span>
          </div>

          <!-- Avatar Selection -->
          <div>
            <label class="block text-xs font-semibold text-white/80 mb-2 text-center">Choose Your Avatar</label>
            <div class="flex flex-wrap justify-center gap-2.5 py-2">
              <button
                v-for="avatar in avatars"
                :key="avatar"
                type="button"
                @click="selectedAvatar = avatar"
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950/40 border border-white/5 text-xl transition hover:scale-110 hover:bg-white/10"
                :class="{ 'ring-2 ring-cyan-400 bg-cyan-950/20 border-cyan-400/30 scale-105 shadow-inner shadow-cyan-500/10': selectedAvatar === avatar }"
              >
                {{ avatar }}
              </button>
            </div>
            <div class="mt-2 text-center text-xs text-cyan-400 font-medium flex items-center justify-center gap-1.5">
              <span>Selected avatar:</span>
              <span class="text-xl inline-block animate-bounce">{{ selectedAvatar }}</span>
            </div>
          </div>

          <!-- Username Input -->
          <div>
            <label for="username" class="block text-xs font-semibold text-white/80 mb-1.5">Username / Display Name</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40">
                <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                placeholder="e.g. John Doe"
                class="w-full rounded-2xl border border-white/10 bg-slate-950/40 py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-400/50 focus:bg-slate-950/60"
              />
            </div>
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-xs font-semibold text-white/80 mb-1.5">Email Address</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40">
                <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="john@example.com"
                class="w-full rounded-2xl border border-white/10 bg-slate-950/40 py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-400/50 focus:bg-slate-950/60"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-xs font-semibold text-white/80 mb-1.5">Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40">
                <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full rounded-2xl border border-white/10 bg-slate-950/40 py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-400/50 focus:bg-slate-950/60"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:scale-[1.02] active:scale-95 focus:outline-none disabled:opacity-50"
          >
            <span v-if="isLoading" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
            <span>{{ isLoading ? 'Creating Account...' : 'Register' }}</span>
          </button>
        </form>
      </div>

      <!-- Footer Links -->
      <p class="text-center text-sm text-white/60">
        Already have an account?
        <NuxtLink to="/login" class="font-bold text-cyan-400 hover:underline">
          Log In
        </NuxtLink>
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useChat } from '~/composables/useChat'

const { currentUser, register, initializeState } = useChat()

const avatars = ['🦊', '🐱', '🐼', '🐨', '🦄', '🦁', '👩‍💻', '👨‍💻', '🕶️', '🍿', '🚀', '🎨']
const selectedAvatar = ref('🦊')

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const isLoading = ref(false)
const errorMsg = ref('')

onMounted(() => {
  initializeState()
  if (currentUser.value) {
    navigateTo('/chat')
  }
})

const handleRegister = async () => {
  // Simple checks
  if (form.username.trim().length < 3) {
    errorMsg.value = 'Username must be at least 3 characters.'
    return
  }
  if (!form.email.includes('@')) {
    errorMsg.value = 'Please enter a valid email address.'
    return
  }
  if (form.password.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters.'
    return
  }

  isLoading.value = true
  errorMsg.value = ''

  // Artificial delay for realism
  await new Promise(resolve => setTimeout(resolve, 800))

  const result = register(form.username, form.email, selectedAvatar.value)
  isLoading.value = false

  if (result.success) {
    navigateTo('/chat')
  } else {
    errorMsg.value = result.error || 'Failed to register'
  }
}
</script>
