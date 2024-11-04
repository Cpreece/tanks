import {createRouter, createWebHistory} from 'vue-router'
import HighScores from '../views/HighScores.vue'
import TankView from '../views/tanks.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tanks',
      component: TankView
    },
    {
      path: '/highscores',
      name: 'highscores',
      component: HighScores
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
}
)

export default router
