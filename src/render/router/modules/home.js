const route = [
  {
    path: '/',
    name: "/",
    redirect: "/home",
  },
  {
    path: '/home',
    name: "home",
    meta: {title: '首页'},
    component: () => import('@/views/home/home.vue'),
  }
]

export default route
