import { createRouter, createWebHistory } from "vue-router";

import NotFound from "./pages/NotFound.vue";
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index';

const CoachesList = () => import('./pages/coaches/CoachesList.vue');
const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegisteration.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      name: 'coach-detail',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact',
          name: 'contact-coach',
          component: ContactCoach,
        },
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnAuth: true }
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) next('/auth');
  else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) next('/');
  else next();
})

export default router;