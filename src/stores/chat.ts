import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { IMessage } from '@/interfaces/chat/IChat'

export const useChatStore = defineStore('chat', () => {
  const isChatOpen = ref(false)
  const messages = ref<IMessage[]>([])

  function toggleChat(open: boolean) {
    isChatOpen.value = open
  }

  function addMessage(message: IMessage) {
    messages.value.push(message)
  }

  return { isChatOpen, messages, toggleChat, addMessage }
})
