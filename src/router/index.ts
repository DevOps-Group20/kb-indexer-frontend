import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

  if (!requiresAuth) {
    next();
    return;
  }

  const auth = getAuth();
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
    .then(user => {
      if (!user) {
        next('/login');
      } else {
        next();
      }
    })
    .catch(error => {
      console.error(error);
      next(false);
    });
});
