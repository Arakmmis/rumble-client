export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [{ path: '', component: () => import('pages/index') }]
  },

  {
    path: '/game/:id',
    component: () => import('layouts/game'),
    children: [{ path: '', component: () => import('pages/game') }]
  },

  {
    path: '/profile',
    component: () => import('layouts/main'),
    children: [{ path: '', component: () => import('pages/profile') }]
  },

  {
    // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
