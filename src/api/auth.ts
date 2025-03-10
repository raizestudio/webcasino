import { useFetch } from '@vueuse/core'

// Api
import type { ISession } from '@/interfaces/auth/ISession'

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const baseUrl = `${apiProtocol}://${apiHost}:${apiPort}`

export const authenticateUser = async (email: string, password: string) => {
  const { data, error } = await useFetch('http://127.0.0.1:8000/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .post()
    .json()

  if (error.value) {
    console.error('Login failed:', error.value)
    return
  }

  console.log('Login successful:', data.value)
  if (data.value) {
    localStorage.setItem('token', data.value.token)
    return data.value.user
  }
}

export const authenticateUserFromToken = async (token: string) => {
  const { data, error } = await useFetch(`${baseUrl}/auth/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .get()
    .json()

  if (error.value) {
    console.error('Fetch user failed:', error.value)
    return
  }

  console.log('Fetch user successful:', data.value)
  return data.value.user
}

export const logoutUser = async (token: string) => {
  const { data, error } = await useFetch(`${baseUrl}/auth/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .post()
    .json()

  if (error.value) {
    console.error('Logout failed:', error.value)
    return
  }

  console.log('Logout successful:', data.value)
  return data.value
}


export const createSession = async (bodyData: object, token?: string) => {
  const body = JSON.stringify(bodyData)
  const { data, error } = await useFetch(`${baseUrl}/auth/sessions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Token ${token}`,
    },
    body: body
  })
    .post()
    .json()

  if (error.value) {
    console.error('Create session failed:', error.value)
    return
  }

  console.log('Create session successful:', data.value)
  return data.value
}

export const createSessionIpInfo = async (clientId: string) => {
  const { data, error } = await useFetch(`${baseUrl}/auth/sessions/ip-info/?client_id=${clientId}`)
    .get()
    .json()

  if (error.value) {
    console.error('Create session failed:', error.value)
    return
  }

  console.log('Create session successful:', data.value)
  return data.value
}

export const fetchSessions = async (token: string) => {
  const { data, error } = await useFetch(`${baseUrl}/auth/sessions/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .get()
    .json()

  if (error.value) {
    console.error('Fetch session failed:', error.value)
    return
  }

  console.log('Fetch session successful:', data.value)
  return data.value
}