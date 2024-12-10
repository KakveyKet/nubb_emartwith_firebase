import { createRouter, createWebHistory } from 'vue-router';
import { projectAuth, projectFirestore } from "@/config/config";
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
import SupperAdminDashboard from '@/SuperAdminDashboard/SupperAdminDashboard.vue';
import MartList from '@/SuperAdminDashboard/MartList.vue';
import UserList from '@/SuperAdminDashboard/UserList.vue';
import MainCategoryList from '@/SuperAdminDashboard/MainCategoryList.vue';
import DashboarManagement from '@/SuperAdminDashboard/DashboarManagement.vue';
import UserHistoy from '@/views/UserHistoy.vue';

import AdminProfile from '@/SuperAdminDashboard/AdminProfile.vue';
import ShopDetail from '@/views/ShopDetail.vue';
setPersistence(projectAuth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence:", error);
});
const requireAuth = (to, from, next) => {
  // Return a promise to ensure Vue Router waits for auth check to complete
  return new Promise((resolve) => {
    onAuthStateChanged(projectAuth, async (user) => {
      if (!user) {
        next({ name: 'login' });
        resolve(); // Complete the navigation guard
        return;
      }

      try {
        const userDoc = await getDoc(doc(projectFirestore, "users", user.uid));
        const userData = userDoc.data();

        if (!userData) {
          next({ name: 'login' });
          resolve();
          return;
        }

        // Check user role and navigate accordingly
        switch (userData.role) {
          case 'super admin':
            if (to.name !== 'supperadmin') {
              next({ name: 'supperadmin' });
            } else {
              next();
            }
            break;
          case 'manager':
            if (to.name !== 'dashboard') {
              next({ name: 'dashboard' });
            } else {
              next();
            }
            break;
          default:
            next({ name: 'login' }); // Redirect if role is not recognized
            break;
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        next({ name: 'login' });
      }
      resolve(); // Complete the navigation guard
    });
  });
};



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,

  }, {
    path: '/userhistory',
    name: 'userhistory',
    component: UserHistoy,
  },
  {
    path: '/userregister',
    name: 'userregister',
    component: UserRegister,
  },
  {
    path: '/shopdetail/:id',
    name: 'shopdetail',
    component: ShopDetail,
  },
  {
    path: '/supperadmin',
    name: 'supperadmin',
    component: SupperAdminDashboard,
    beforeEnter: requireAuth,
    children: [
      {
        path: '/martlist',
        name: 'martlist',
        component: MartList,
      },
      {
        path: '/userlist',
        name: 'userlist',
        component: UserList,
      },
      {
        path: '/maincategorylist',
        name: 'maincategorylist',
        component: MainCategoryList,
      },
      {
        path: '/dashboardmanagement',
        name: 'dashboardmanagement',
        component: DashboarManagement,
      },
      {
        path: '/adminprofile',
        name: 'adminprofile',
        component: AdminProfile,
      },
    ],
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
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
