<script setup>

</script>

<template>
  <main class="flex h-full flex-col items-center justify-center px-4 py-12 overflow-y-auto">
    <!-- Card Container -->
    <div class="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
      
      <!-- Logo -->
      <div
        class="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-4xl shadow-lg shadow-blue-500/20 animate-bounce"
      >
        💬
      </div>

      <!-- App Name -->
      <h1 class="text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
        UsApp
      </h1>

      <!-- Tagline -->
      <h2 class="mt-3 text-2xl font-bold text-white">
        Usap Tayo,
        <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Dito.</span>
      </h2>

      <!-- Description -->
      <p class="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
        Connect with friends and communities through conversations that matter. Select an option below to get started.
      </p>

      <!-- Buttons Section -->
      <div class="mt-8 flex w-full flex-col gap-3">
        <template v-if="currentUser">
          <!-- User status preview -->
          <div class="mb-2 p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 text-left w-full">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-2xl border border-cyan-500/30">
              {{ currentUser.avatar }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-xs font-semibold text-white/90">Signed in as</p>
              <p class="truncate text-sm font-bold text-cyan-300">{{ currentUser.username }}</p>
            </div>
          </div>

          <NuxtLink
            to="/chat"
            class="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.02] active:scale-95 text-center"
          >
            Open Chat Room
          </NuxtLink>
          <button
            @click="handleLogout"
            class="w-full rounded-2xl border border-white/10 py-3.5 font-semibold text-white/90 transition hover:bg-white/5 text-center"
          >
            Sign Out
          </button>
        </template>
        <template v-else>
          <NuxtLink
            to="/login"
            class="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.02] active:scale-95 text-center"
          >
            Log In
          </NuxtLink>

          <NuxtLink
            to="/register"
            class="w-full rounded-2xl border border-white/10 py-3.5 font-semibold text-white/90 transition hover:bg-white/5 text-center"
          >
            Create an Account
          </NuxtLink>
        </template>
      </div>

    </div>
  </main>
</template>

