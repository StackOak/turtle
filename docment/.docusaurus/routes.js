import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/turtle/en/blog',
    component: ComponentCreator('/turtle/en/blog', '808'),
    exact: true
  },
  {
    path: '/turtle/en/blog/archive',
    component: ComponentCreator('/turtle/en/blog/archive', '684'),
    exact: true
  },
  {
    path: '/turtle/en/blog/test',
    component: ComponentCreator('/turtle/en/blog/test', 'd56'),
    exact: true
  },
  {
    path: '/turtle/en/docs',
    component: ComponentCreator('/turtle/en/docs', 'fd9'),
    routes: [
      {
        path: '/turtle/en/docs',
        component: ComponentCreator('/turtle/en/docs', '497'),
        routes: [
          {
            path: '/turtle/en/docs',
            component: ComponentCreator('/turtle/en/docs', 'a65'),
            routes: [
              {
                path: '/turtle/en/docs/turtle/intro',
                component: ComponentCreator('/turtle/en/docs/turtle/intro', '2b6'),
                exact: true,
                sidebar: "javaSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/turtle/en/',
    component: ComponentCreator('/turtle/en/', 'ca7'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
