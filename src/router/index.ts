import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GamesView from '@/views/GamesView.vue'
import SlotGameView from '@/views/SlotGameView.vue'
import TableGameView from '@/views/TableGameView.vue'
import { useUsersStore } from '@/stores/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView,
      meta: { requiresAuth: true },
    },
    // {
    //   path: '/games/:id',
    //   name: 'game',
    //   component: SlotGameView,
    // },
    {
      path: '/games/slots/:id',
      name: 'game_slot',
      component: SlotGameView,
    },
    {
      path: '/games/table/:id',
      name: 'game_table',
      component: TableGameView,
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { isAuth } = useUsersStore()
  if (
    // make sure the user is authenticated
    to.meta.requiresAuth && 
    !isAuth &&
    to.name !== 'home'
  ) {
    // redirect the user to the login page
    next({ name: 'home' })
  }
    next()
})

export default router
