<script setup lang="ts"></script>

<template>
  <dialog id="support_modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Support</h3>
      <p class="py-4">TODO</p>
      <form class="flex flex-col gap-4">
        <!-- -->
        <button class="btn">
          <span class="loading loading-spinner loading-sm"></span>
        </button>
      </form>
      <!-- <div class="modal-action"> -->

      <!-- </div> -->
    </div>
    <form method="dialog" class="modal-backdrop">
      <!-- if there is a button in form, it will close the modal -->
      <button>close</button>
    </form>
  </dialog>
</template>
