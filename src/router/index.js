import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardPage from '@/Admin/DashboardPage.vue'
import AdminDashboard from '@/Admin/AdminDashboard.vue'
import ProductList from '@/Admin/ProductList.vue'
import SubcategoryList from '@/Admin/SubcategoryList.vue'
import MartCoverList from '@/Admin/MartCoverList.vue'
import TodayOrderList from '@/Admin/TodayOrderList.vue'
import TodayReport from '@/report/TodayReport.vue'
import Report from '@/report/Report.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    redirect: '/admindashboard',
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
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
