import { createRouter, createWebHistory } from "vue-router";

import NotFound from "./pages/NotFound.vue";
import UserAuth from './pages/auth/UserAuth.vue';
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachRegistration from "./pages/coaches/CoachRegisteration.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import store from './store/index';

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
    { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) next('/auth');
  else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) next('/');
  else next();
})

export default router;