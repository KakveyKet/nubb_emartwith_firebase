import { createRouter, createWebHistory } from 'vue-router';
import { projectAuth } from "@/config/config"; // Import your Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

// Import your components here
import HomeView from '../views/HomeView.vue';
import DashboardPage from '@/Admin/DashboardPage.vue';
import AdminDashboard from '@/Admin/AdminDashboard.vue';
import ProductList from '@/Admin/ProductList.vue';
import SubcategoryList from '@/Admin/SubcategoryList.vue';
import MartCoverList from '@/Admin/MartCoverList.vue';
import TodayOrderList from '@/Admin/TodayOrderList.vue';
import TodayReport from '@/report/TodayReport.vue';
import Report from '@/report/Report.vue';
import UserForm from '@/Form/UserForm.vue';
import LoginForm from '@/Form/LoginForm.vue';
import UserRegister from '@/user/UserRegiser.vue';
const requireAuth = (to, from, next) => {
  onAuthStateChanged(projectAuth, (user) => {
    if (user) {
      next(); // User is authenticated, proceed to route
    } else {
      next({ name: 'login' });
    }
  });
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userregister',
    name: 'userregister',
    component: UserRegister,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    redirect: '/admindashboard',
    beforeEnter: requireAuth,
    children: [
      {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashboard
      },
      {
        path: '/products',
        name: 'products',
        component: ProductList
      },
      {
        path: '/subcategory',
        name: 'subcategory',
        component: SubcategoryList
      },
      {
        path: '/martcover',
        name: 'martcover',
        component: MartCoverList
      },
      {
        path: '/todayorder',
        name: 'todayorder',
        component: TodayOrderList
      },
      {
        path: '/report',
        name: 'report',
        component: Report,
      },
      {
        path: '/todayreport',
        name: 'todayreport',
        component: TodayReport,
      },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/userform',
    name: 'userform',
    component: UserForm
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
