import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { IMessage } from '@/interfaces/chat/IChat'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<IMessage[]>([])

  function addMessage(message: IMessage) {
    messages.value.push(message)
  }

  return { messages, addMessage }
})