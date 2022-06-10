import BasicLayout from '/@/layouts/BasicLayout/index.vue';
import BlankLayout from '/@/layouts/BlankLayout.vue';

export const accessRoutes = [
  {
    path: '/',
    name: 'app',
    component: BasicLayout,
    redirect: '/home',
    meta: { title: '管理平台', icon: 'jiedianguanli' },
    children: [
      {
        path: '/home',
        component: () => import('/@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: 'liulanqi',
          breadcrumb: true,
        },
      },

      {
        path: '/table',
        name: 'others',
        meta: {
          title: '多级菜单',
          icon: 'xitongrizhi',
        },
        component: () => import('/@/views/table/index.vue'),
        children: [
          // {
          //   path: '/sys/account',
          //   name: 'account',
          //   component: () => import('/@/views/account/index.vue'),
          //   meta: { title: '用户管理', keepAlive: true, breadcrumb: true, hidden: true },
          // },
          {
            path: '/table',
            name: 'table',
            component: () => import('/@/views/table/index.vue'),
            meta: { title: '表单', keepAlive: true, breadcrumb: true },
          },
        ],
      },
    ],
  },
];

export const publicRoutes = [
  {
    path: '/redirect',
    component: BlankLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('/@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('/@/views/404.vue'),
  },
];

const constantRoutes = [
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
  },
  ...accessRoutes,
  ...publicRoutes,
];

// /**
//  * 基础路由
//  * @type { *[] }
//  */
// export const constantRouterMap = [];

export default constantRoutes;
