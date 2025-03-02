<script setup lang="ts">
import ChatComponent from '@/components/chat/ChatComponent.vue'
</script>

<template>
  <main class="flex grow">
    <div class="flex flex-col px-10 py-4 grow">
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl font-bold">Featured games</h1>
        <div class="relative flex gap-4 overflow-x-hidden max-w-[calc(100vw-600px)]">
          <div class="gap-4 carousel rounded-box">
            <div class="carousel-item">
              <div class="w-64 shadow-sm card bg-base-100">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Game</h2>
                  <div class="justify-end card-actions">
                    <button class="btn btn-primary">Jouer</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="w-64 shadow-sm card bg-base-100">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Game</h2>
                  <div class="justify-end card-actions">
                    <button class="btn btn-primary">Jouer</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="w-64 shadow-sm card bg-base-100">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Game</h2>
                  <div class="justify-end card-actions">
                    <button class="btn btn-primary">Jouer</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="w-64 shadow-sm card bg-base-100">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Game</h2>
                  <div class="justify-end card-actions">
                    <button class="btn btn-primary">Jouer</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="w-64 shadow-sm card bg-base-100">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Game</h2>
                  <div class="justify-end card-actions">
                    <button class="btn btn-primary">Jouer</button>
                  </div>
                </div>
              </div>
            </div>
            
            
            <div class="carousel-item">
              <div class="w-64 shadow-sm card bg-base-100">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Game</h2>
                  <div class="justify-end card-actions">
                    <button class="btn btn-primary">Jouer</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item">
              <div class="w-64 shadow-sm card bg-base-100">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Game</h2>
                  <div class="justify-end card-actions">
                    <button class="btn btn-primary">Jouer</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <!-- <div class="w-64 shadow-sm card bg-base-100">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">Game</h2>
              <div class="justify-end card-actions">
                <button class="btn btn-primary">Jouer</button>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <!-- <div class="flex flex-col items-center"> -->
      <!-- <div class="flex flex-col w-full"> -->
      <!-- <router-link to="/login" class="px-4 py-2 text-xl font-bold text-center text-gray-700 rounded shadow-md hover:shadow-sm">Poker</router-link> -->
      <!-- <button class="btn">Poker</button> -->
      <!-- <button class="btn" onclick="my_modal_1.showModal()">Poker</button>
          <dialog id="my_modal_1" class="modal">
            <div class="modal-box">
              <h3 class="text-lg font-bold">Hello!</h3>
              <p class="py-4">Press ESC key or click the button below to close</p>
              <div class="modal-action">
                <form method="dialog"> -->
      <!-- if there is a button in form, it will close the modal -->
      <!-- <button class="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div> -->
      <!-- </div> -->
    </div>
    <ChatComponent />
  </main>
</template>
