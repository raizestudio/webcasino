import { useFetch } from '@vueuse/core'

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
