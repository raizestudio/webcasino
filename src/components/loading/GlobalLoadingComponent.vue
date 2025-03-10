<script setup lang="ts"></script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex h-3 bg-primary">
      <div></div>
    </div>
    <div class="relative flex flex-col justify-center items-center gap-6 grow">
      <h1 class="text-5xl font-black font-kneewave z-10">WebCasino</h1>

      <div id="loading-wrapper" class="absolute h-full w-full bg-base-100"></div>
    </div>
  </div>
</template>

<style scoped>
#loading-wrapper {
  background-image: url('/src/assets/images/fabric.jpg');
  background-blend-mode: overlay;
  background-size: 50rem;
  opacity: 0.15;
}
</style>
