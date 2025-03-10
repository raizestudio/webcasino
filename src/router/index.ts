import { createRouter, createWebHistory } from 'vue-router'

// Components
import HomeView from '@/views/HomeView.vue'
import GamesView from '@/views/GamesView.vue'
import SlotGameView from '@/views/SlotGameView.vue'
import TableGameView from '@/views/TableGameView.vue'
import ProfileView from '@/views/users/ProfileView.vue'

// Api
import { authenticateUserFromToken } from '@/api/auth'

// Stores
import { useCoreStore } from '@/stores/core'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { pageName: "Home" } },
    {
      path: '/users/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/users/:id',
      name: 'profile_id',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    { path: '/games', name: 'games', component: GamesView, meta: { requiresAuth: true } },
    { path: '/games/slots/:id', name: 'game_slot', component: SlotGameView },
    { path: '/games/table/:id', name: 'game_table', component: TableGameView },
  ],
})

router.beforeEach(async (to, from, next) => {
  const coreStore = useCoreStore()
  const usersStore = useUsersStore()
  const authStore = useAuthStore()

  // Start global loading
  coreStore.setGlobalLoading(true)

  authStore.setIPInfo()

  // If already authenticated, proceed
  if (usersStore.isAuth) {
    coreStore.setGlobalLoading(false)
    return next()
  }

  const token = localStorage.getItem('token')

  // If there's a token, try to authenticate
  if (token) {
    try {
      const user = await authenticateUserFromToken(token)
      if (user) {
        usersStore.login(user)
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.log(`Error authenticating, removing token: ${error}`)
      localStorage.removeItem('token')
    }
  }

  // Redirect to home if authentication is required and user is not authenticated
  if (to.meta.requiresAuth && !usersStore.isAuth) {
    coreStore.setGlobalLoading(false)
    return next({ name: 'home' })
  }

  // Stop global loading before navigating
  coreStore.setGlobalLoading(false)
  next()
})

export default router
