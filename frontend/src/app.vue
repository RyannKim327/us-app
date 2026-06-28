<script setup lang="ts">
</script>

<template>
  <div class="h-dvh w-dvw text-white bg-slate-950 relative overflow-hidden font-sans select-none">
    <!-- Ambient Background Lights -->
    <div class="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
    
    <router-view />
  </div>
</template>
