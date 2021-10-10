import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '../store/store';
import EmptyLayout from '../layouts/empty.vue';
import DashboardLayout from '../layouts/dashboard.vue';
import PageNotFound from '../views/error/404.vue';
import * as authTypes from '../store/modules/auth/auth-types';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: EmptyLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/home.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/auth/login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/auth/register.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    meta: {
      requiresAuth: true,
    },
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard.vue'),
      },
      {
        path: 'setting',
        name: 'Settings',
        component: () => import('../views/profile/settings.vue'),
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: () => import('../views/portfolio/list.vue'),
      },
      {
        path: 'portfolio/create',
        name: 'CreatePortfolio',
        component: () => import('../views/portfolio/create.vue'),
      },
      {
        path: 'portfolio/:id',
        name: 'PortfolioDetail',
        component: () => import('../views/portfolio/detail.vue'),
      },
      {
        path: 'portfolio/:id/update',
        name: 'PortfolioUpdate',
        component: () => import('../views/portfolio/update.vue'),
      },
      // Stock urls begin here
      {
        path: 'stock',
        name: 'StockList',
        component: () => import('../views/stock/list.vue'),
      },
      {
        path: 'stock/add',
        name: 'AddStock',
        component: () => import('../views/stock/add.vue'),
      },
      {
        path: 'stock/:id',
        name: 'StockDetail',
        component: () => import('../views/stock/detail.vue'),
      },
      {
        path: 'stock/:id/update',
        name: 'StockUpdate',
        component: () => import('../views/stock/update.vue'),
      },
    ],
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const allowedRoutes = ['Login', 'Register', 'Home'];
  if (allowedRoutes.indexOf(to.name) === -1) {
    // Protected routes, load profile data if not available in vuex store
    if (!store.state.auth.profileData) {
      store.dispatch(authTypes.GET_PROFILE_DATA_ACTION);
    }
  }
  next();
})

export default router;
