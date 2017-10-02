export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
           // pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0,
          },
        },
      },

      {
        path: 'admin',
        data: {
          menu: {
            title: 'general.menu.admin',
            icon: 'ion-locked',
           // pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 200,
          },
        },
        children: [
          {
            path: 'permissions',
            data: {
              menu: {
                title: 'general.menu.permissions',
              },
            },
          },
          {
            path: 'roles',
            data: {
              menu: {
                title: 'general.menu.roles',
              },
            },
          },
          {
            path: 'users',
            data: {
              menu: {
                title: 'general.menu.users',
              },
            },
          },
        ],
      },         
    ],
  },
];
