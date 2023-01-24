import { createRouter, createWebHistory } from 'vue-router'
import TableView from '@/views/TableView.vue'
import LoginView from '@/views/LoginView.vue'
import MainView from '@/views/MainView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/~s339112/lab4/', // '/'
      name: 'Graphic',
      component: MainView
    },
    {
      path: '/~s339112/lab4/table',
      name: 'Results',
      component: TableView
    },
    {
      path: '/~s339112/lab4/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/~s339112/lab4/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
  }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/~s339112/lab4/login', '/~s339112/lab4/register']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    return '/~s339112/lab4/login'
  }  

})





export default router
