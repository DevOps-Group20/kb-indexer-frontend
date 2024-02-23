import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from "firebase/auth";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: () => import('@/pages/LoginPage.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next('/login');
  } else {
    next();
  }
});
