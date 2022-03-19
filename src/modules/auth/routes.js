export default [
  {
    path: '/auth',
    component: () => import('./pages/layout'),
    children: [
      {
        path: 'signIn',
        name: 'SignIn',
        component: () => import('./pages/signIn'),
      },
      {
        path: 'signUp',
        name: 'SignUp',
        component: () => import('./pages/signUp'),
      },
      {
        path: 'confirm',
        name: 'ConfirmEmail',
        component: () => import('./pages/confirmEmail'),
        props: true,
      },
    ],
  },
]
