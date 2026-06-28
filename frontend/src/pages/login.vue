<template>
  <div class="flex flex-col h-full w-full items-center p-6 overflow-y-auto scrollbar-none">
    <div
      class="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/60 p-10 backdrop-blur-xl shadow-2xl"
    >
      <!-- Logo -->
      <div class="mb-8 flex flex-col items-center">
        <div
          class="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800"
        >
          <span class="text-3xl font-black text-cyan-400">U</span>
        </div>

        <h1 class="text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p class="mt-2 text-center text-slate-400">
          Sign in to continue joining anonymous community discussions.
        </p>
      </div>

      <!-- Form -->
      <form class="space-y-5">
        <!-- Email -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Username
          </label>

          <input
            type="text"
            class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <input
            type="password"
            class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <!-- Remember Me -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex cursor-pointer items-center gap-2 text-slate-400">
            <input
              type="checkbox"
              class="rounded border-slate-600 bg-slate-900"
            />

            Remember me
          </label>

          <button
            type="button"
            class="text-cyan-400 transition hover:text-cyan-300"
          >
            Forgot password?
          </button>
        </div>

        <!-- Login -->
        <button
          type="submit"
          class="w-full rounded-xl bg-cyan-500 py-3 text-lg font-semibold transition hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98]"
        >
          Login
        </button>
      </form>

      <!-- Divider -->
      <div class="my-8 flex items-center gap-4">
        <div class="h-px flex-1 bg-slate-800"></div>

        <span class="text-sm text-slate-500">
          OR
        </span>

        <div class="h-px flex-1 bg-slate-800"></div>
      </div>

      <!-- Register -->
      <div class="text-center">
        <span class="text-slate-400">
          Don't have an account?
        </span>

        <RouterLink
          to="/register"
          class="ml-2 font-medium text-cyan-400 transition hover:text-cyan-300"
        >
          Create one
        </RouterLink>
      </div>
    </div>
  </div>
</template>
