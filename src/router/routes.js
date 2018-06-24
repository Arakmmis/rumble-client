export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [{ path: '', component: () => import('pages/index') }]
  },

  {
    path: '/game/:room',
    component: () => import('layouts/game'),
    children: [{ path: '', component: () => import('pages/game') }]
  },

  {
    path: '/profile',
    component: () => import('layouts/main'),
    children: [{ path: '', component: () => import('pages/profile') }]
  },

  {
    path: '/admin',
    component: () => import('layouts/dashboard'),
    children: [
      { path: '', component: () => import('pages/home') },
      { path: 'builder', component: () => import('pages/builder') }
    ]
  },

  {
    // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
