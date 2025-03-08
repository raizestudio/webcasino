<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Interfaces
import type { IMessage } from '@/interfaces/chat/IChat'

// Stores
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()




const messages = ref<IMessage[]>([])
const messageInput = ref('')
const ws = ref<WebSocket | null>(null)
const chatContainer = ref<HTMLElement | null>(null)


onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    ws.value = new WebSocket(`ws://127.0.0.1:8000/ws/chat/lobby/?token=${token}`)

  } else {
    ws.value = new WebSocket(`ws://127.0.0.1:8000/ws/chat/lobby/`)

  }

  ws.value.onopen = () => {
    console.log('WebSocket connected!')
  }

  ws.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    messages.value.push(data)

    // Scroll to bottom after new message
    nextTick(() => {
      chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight, behavior: 'smooth' })
    })
  }

  ws.value.onclose = () => {
    console.log('WebSocket disconnected!')
  }

  ws.value.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
})

onUnmounted(() => {
  ws.value?.close()
})

// Send message function
const sendMessage = () => {
  if (ws.value && messageInput.value.trim() !== '') {
    ws.value.send(JSON.stringify({ message: messageInput.value }))
    messageInput.value = ''

    // Scroll to bottom after sending message
    nextTick(() => {
      chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight, behavior: 'smooth' })
    })
  }
}

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
</script>

<template>
  <div class="flex flex-col gap-4 px-2 py-4 shadow-[-4px_0px_6px_-2px_rgba(0,0,0,0.1)] basis-1/4">
    <span>Chat</span>
    <div
      ref="chatContainer"
      class="h-[calc(100vh-200px)] overflow-y-auto flex flex-col justify-end"
    >
      <div v-for="(msg, index) in messages" :key="index" class="chat chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              :src="`${apiProtocol}://${apiHost}:${apiPort}/media/${msg.avatar}`"
            />
          </div>
        </div>
        <div class="chat-header">
          {{ msg.user }}
          <time class="text-xs opacity-50">{{ msg.created_at }}</time>
        </div>
        <div class="chat-bubble">{{ msg.message }}</div>
        <div class="opacity-50 chat-footer">Delivered</div>
      </div>
    </div>
    <div class="flex gap-2">
      <input
        v-model="messageInput"
        @keyup.enter="sendMessage"
        type="text"
        class="w-full input"
        :placeholder="usersStore.isAuth ? 'Type your message...' : 'You need to login to send message'"
        :disabled="!usersStore.isAuth"
      />
      <button @click="sendMessage" class="btn" :disabled="!usersStore.isAuth">Send</button>
    </div>
  </div>
</template>
