const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/MarkdownPreview.vue'),
        children: [
          {
            path: '/md/:filename?',
            name: 'Markdown',
            component: () => import('pages/MarkdownPreview.vue'),
            props: true
          }]
      },
    ],
  },
  // {
  //   path: '/md/:filename?',
  //   name: 'Markdown',
  //   component: () => import('pages/MarkdownPreview.vue'),
  //   props: true
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
