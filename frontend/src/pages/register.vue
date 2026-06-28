<script setup lang="ts">
  import { ref } from "vue";

  const avatars = [
    "😀", "😎", "🤖", "👻", "🐱",
    "🐶", "🦊", "🐼", "🐸", "🐧",
    "🦁", "🐙", "🦄", "🐲", "🍀",
    "⭐",
  ];

  const selectedAvatar = ref(avatars[0]);

  const username = ref("");
  const password = ref("");
  const verifyPassword = ref("");

  function register() {
    console.log({
      avatar: selectedAvatar.value,
      username: username.value,
      password: password.value,
      verifyPassword: verifyPassword.value,
    });
  }
</script>

<template>
  <div class="flex flex-col h-full w-full items-center px-6 py-10 overflow-y-auto scrollbar-none">
    <div
      class="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/60 p-10 backdrop-blur-xl shadow-2xl"
    >
      <!-- Header -->
      <div class="text-center">
        <div
          class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800"
        >
          <span class="text-3xl font-black text-cyan-400">
            {{ selectedAvatar }}
          </span>
        </div>

        <h1 class="text-3xl font-bold">
          Create your account
        </h1>

        <p class="mt-2 text-slate-400">
          Choose an anonymous avatar and start joining community discussions.
        </p>
      </div>

      <!-- Avatar Picker -->
      <div class="mt-8">
        <label class="mb-3 block text-sm font-medium text-slate-300">
          Choose your avatar
        </label>

        <div class="grid grid-cols-4 sm:grid-cols-8 gap-5">
          <button
            v-for="avatar in avatars"
            :key="avatar"
            type="button"
            @click="selectedAvatar = avatar"
            :class="[
              'flex h-13 w-13 items-center justify-center rounded-lg border text-[1rem] transition-all duration-200',
              selectedAvatar === avatar
                ? 'border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20 scale-105'
                : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:scale-105'
            ]"
          >
            {{ avatar }}
          </button>
        </div>
      </div>

      <!-- Form -->
      <form
        class="mt-8 space-y-5"
        @submit.prevent="register"
      >
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Username
          </label>

          <input
            v-model="username"
            type="text"
            placeholder="Choose a username"
            class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Verify Password
          </label>

          <input
            v-model="verifyPassword"
            type="password"
            placeholder="Confirm password"
            class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-xl bg-cyan-500 py-3 text-lg font-semibold transition hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98]"
        >
          Create Account
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <span class="text-slate-400">
          Already have an account?
        </span>

        <RouterLink
          to="/login"
          class="ml-2 font-medium text-cyan-400 transition hover:text-cyan-300"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>
