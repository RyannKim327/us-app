<template>
  <div class="flex flex-col h-full w-full items-center overflow-y-auto p-6 scrollbar-none">
    <div class="flex max-w-4xl flex-col items-center text-center">

      <!-- Logo -->
      <div
        class="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur shadow-xl"
      >
        <span class="text-4xl font-black text-cyan-400">U</span>
      </div>

      <!-- Heading -->
      <h1
        class="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent"
      >
        Us-APP
      </h1>

      <!-- Tagline -->
      <h2 class="mt-6 text-3xl font-semibold text-white">
        Join conversations that matter.
      </h2>

      <!-- Description -->
      <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
        Us-APP is an anonymous community platform where people gather in
        discussion rooms based on their interests, profession, course, or
        field of expertise. Share ideas, ask questions, help others, and
        participate in meaningful conversations without revealing your
        identity.
      </p>

      <!-- Buttons -->
      <div class="mt-12 flex flex-col gap-4 sm:flex-row">
        <RouterLink
          to="/login"
          class="rounded-xl bg-cyan-500 px-10 py-3 text-lg font-semibold transition hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
        >
          Login
        </RouterLink>

        <RouterLink
          to="/register"
          class="rounded-xl border border-slate-700 bg-slate-900/60 px-10 py-3 text-lg font-semibold transition hover:border-cyan-500 hover:bg-slate-800 active:scale-95"
        >
          Register
        </RouterLink>
      </div>

      <!-- Features -->
      <div
        class="mt-20 grid w-full max-w-5xl gap-5 md:grid-cols-3"
      >
        <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div class="mb-3 text-3xl">💬</div>
          <h3 class="font-semibold text-lg">Discussion Rooms</h3>
          <p class="mt-2 text-sm text-slate-400">
            Join communities focused on topics that interest you.
          </p>
        </div>

        <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div class="mb-3 text-3xl">🎭</div>
          <h3 class="font-semibold text-lg">Stay Anonymous</h3>
          <p class="mt-2 text-sm text-slate-400">
            Share opinions and ask questions without exposing your identity.
          </p>
        </div>

        <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div class="mb-3 text-3xl">🤝</div>
          <h3 class="font-semibold text-lg">Learn Together</h3>
          <p class="mt-2 text-sm text-slate-400">
            Connect with students, professionals, and communities through
            collaborative discussions.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
