import { useFetch } from '@vueuse/core'

export const authenticateUser = async (email: string, password: string) => {
  const { data, error } = await useFetch('http://127.0.0.1:8000/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .post()
    .json()

  if (error.value) {
    console.error("Login failed:", error.value)
    return
  }

  console.log("Login successful:", data.value)
  if (data.value) {
    localStorage.setItem('token', data.value.token)
    return data.value.user
  }
}