import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Views
import HomeView from '@/views/HomeView.vue'
import GamesView from '@/views/GamesView.vue'
// import SlotGameView from '@/views/SlotGameView.vue'
import ProfileView from '@/views/users/ProfileView.vue'
import InGameView from '@/views/InGameView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import InternalErrorView from '@/views/errors/InternalErrorView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import PoolView from '@/views/PoolView.vue'

// Api
import { authenticateUserFromToken } from '@/api/auth'

// Stores
import { useCoreStore } from '@/stores/core'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'

const routes: Array<RouteRecordRaw> = [
  // Home
  { path: '/', name: 'home', component: HomeView, meta: { pageName: 'Home' } },

  // Users
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

  // Games
  { path: '/games', name: 'games', component: GamesView, meta: { requiresAuth: true } },
  { path: '/games/:category/:id', name: 'game_slot', component: InGameView },

  // Crypto Pools
  { path: '/pools', name: 'pools', component: PoolView },

  // Dashboard
  { path: '/dashboard', name: 'dashboard', component: DashboardView },

  // Errors
  { path: '/500', name: 'InternalError', component: InternalErrorView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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
        usersStore.getPlayerProfile(user.id)
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
