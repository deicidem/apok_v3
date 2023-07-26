import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          redirect: { name: 'plan' },
        },
        {
          name: 'tasks',
          path: 'tasks',
          component: () => import('@/views/MainView.vue'),
          meta: {
            requiresAuth: true,
            requiresVerification: true,
          },
        },
        {
          name: 'plan',
          path: 'plan',
          component: () => import('@/views/SidebarViews/SidebarNotifications.vue'),
        },
        {
          name: 'search',
          path: 'search',
          component: () => import('@/views/MainView.vue'),
          meta: { dependsOn: 'needVerificationToViewDzzs' },
        },
        {
          name: 'results',
          path: 'results',
          component: () => import('@/views/MainView.vue'),
          meta: { dependsOn: 'needVerificationToViewDzzs' },
        },
        {
          name: 'notifications',
          path: 'notifications',
          component: () => import('@/views/MainView.vue'),
          meta: {
            requiresAuth: true,
            requiresVerification: true,
          },
        },
        {
          name: 'user',
          path: 'user',
          component: () => import('@/views/MainView.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'files',
          path: 'files',
          component: () => import('@/views/MainView.vue'),
          meta: {
            requiresAuth: true,
            requiresVerification: true,
          },
        },
        {
          name: 'area',
          path: 'area',
          component: () => import('@/views/MainView.vue'),
        },
        {
          name: 'groups',
          path: 'groups',
          component: () => import('@/views/MainView.vue'),
          meta: {
            requiresAuth: true,
            requiresVerification: true,
          },
        },
        {
          name: 'dzzs',
          path: 'dzzs',
          component: () => import('@/views/MainView.vue'),
          meta: {
            requiresAuth: true,
            requiresVerification: true,
          },
        },
      ],
    },
  ],
});

export default router;
