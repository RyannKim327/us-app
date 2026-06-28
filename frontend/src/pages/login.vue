<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useChat } from '../composables/useChat'

const { currentUser, login, initializeState } = useChat()
const router = useRouter()

const form = reactive({
  email: '',
  password: 'password123' // default password for mock purposes
})

const isLoading = ref(false)
const errorMsg = ref('')

onMounted(() => {
  initializeState()
  if (currentUser.value) {
    router.push('/chat')
  }
})

const quickFill = (email: string) => {
  form.email = email
  form.password = 'password123'
}

const handleLogin = async () => {
  isLoading.value = true
  errorMsg.value = ''
  
  // Artificial delay for realism
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const result = login(form.email, form.password)
  isLoading.value = false
  
  if (result.success) {
    router.push('/chat')
  } else {
    errorMsg.value = result.error || 'Failed to login'
  }
}
</script>

<template>
  <main class="flex h-full flex-col items-center px-4 py-12 overflow-y-auto">
    <div class="w-full max-w-md space-y-6">
      <!-- Header -->
      <div class="flex flex-col items-center text-center">
        <RouterLink to="/" class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-3xl shadow-lg shadow-blue-500/25 transition hover:scale-110">
          💬
        </RouterLink>
        <h2 class="mt-6 text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
          Welcome back
        </h2>
        <p class="mt-1 text-sm text-white/60">
          Log in to your UsApp account to continue conversations.
        </p>
      </div>

      <!-- Card -->
      <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
        <form class="space-y-5" @submit.prevent="handleLogin">
          <!-- Alert for Error -->
          <div v-if="errorMsg" class="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-300 flex items-start gap-2 animate-pulse">
            <svg class="h-4 w-4 shrink-0 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMsg }}</span>
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-xs font-semibold text-white/80 mb-2">Email Address</label>
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
                autocomplete="email"
                placeholder="you@example.com"
                class="w-full rounded-2xl border border-white/10 bg-slate-950/40 py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-400/50 focus:bg-slate-950/60"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-xs font-semibold text-white/80">Password</label>
              <span class="text-[10px] text-cyan-400 hover:underline cursor-pointer">Forgot password?</span>
            </div>
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
                autocomplete="current-password"
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
              <!-- Loading spinner -->
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
            <span>{{ isLoading ? 'Logging in...' : 'Log In' }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-5">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/5"></div>
          </div>
          <div class="relative flex justify-center text-[10px]">
            <span class="bg-slate-900 border border-white/10 px-3 py-0.5 rounded-full text-white/50 backdrop-blur">OR</span>
          </div>
        </div>

        <!-- Quick Demo Accounts -->
        <div class="space-y-2">
          <p class="text-center text-[10px] text-white/40 uppercase tracking-wider font-bold">Quick Demo Accounts</p>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="quickFill('sarah@usapp.io')"
              type="button"
              class="rounded-xl border border-white/5 bg-white/5 py-2 px-3 text-center text-xs transition hover:bg-white/10 text-white/80"
            >
              👩‍💻 Sarah (Tech)
            </button>
            <button
              @click="quickFill('neo@usapp.io')"
              type="button"
              class="rounded-xl border border-white/5 bg-white/5 py-2 px-3 text-center text-xs transition hover:bg-white/10 text-white/80"
            >
              🕶️ Neo (Neo)
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Links -->
      <p class="text-center text-sm text-white/60">
        Don't have an account?
        <RouterLink to="/register" class="font-bold text-cyan-400 hover:underline">
          Register now
        </RouterLink>
      </p>
    </div>
  </main>
</template>

