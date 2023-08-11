export const appMenu = [
  {
    label: 'Home',
    role: ['admin', 'superAdmin', 'creator'],
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-th-large',
        to: '/dashboard',
        role: ['admin', 'superAdmin', 'creator']
      }
    ]
  },
  {
    label: 'Accounts',
    role: ['admin', 'superAdmin'],
    items: [
      {
        label: 'Workout Users',
        icon: 'pi pi-fw pi-users',
        to: '/workout-users',
        role: ['admin', 'superAdmin']
      },
      {
        label: 'Creators',
        icon: 'pi pi-fw pi-users',
        to: '/creators',
        role: ['admin', 'superAdmin']
      },

      {
        label: 'Personal Trainers',
        icon: 'pi pi-fw pi-users',
        to: '/personal-trainers',
        role: ['admin', 'superAdmin']
      }
    ]
  },
  {
    label: 'Challenges',
    role: ['admin', 'superAdmin', 'creator'],
    items: [
      {
        label: 'Challenges',
        icon: 'pi pi-fw pi-box',
        to: '/challenges',
        role: ['admin', 'superAdmin', 'creator']
      },
      {
        label: 'Members',
        icon: 'pi pi-fw pi-users',
        to: '/members',
        role: ['creator', "superAdmin"]
      },
      {
        label: 'Training',
        icon: 'pi pi-fw pi-ticket',
        to: '/training',
        role: ['creator']
      }
    ]
  },
  {
    label: 'Sources',
    role: ['admin', 'superAdmin', 'creator'],
    items: [
      {
        label: 'Exercises',
        icon: 'pi pi-fw pi-database',
        to: '/exercises',
        role: ['admin', 'superAdmin', 'creator']
      },
      {
        label: 'Equipments',
        icon: 'pi pi-fw pi-database',
        to: '/equipments',
        role: ['admin', 'superAdmin']
      },
      {
        label: 'Muscles',
        icon: 'pi pi-fw pi-database',
        to: '/muscles',
        role: ['admin', 'superAdmin']
      },
      {
        label: 'Tags',
        icon: 'pi pi-fw pi-clone',
        to: '/sources/tags',
        role: ['admin', 'superAdmin']
      },
      {
        label: 'Certificate Issuers',
        icon: 'pi pi-fw pi-clone',
        to: '/sources/certificate-issuers',
        role: ['admin', 'superAdmin']
      },
      {
        label: 'Goals',
        icon: 'pi pi-fw pi-clone',
        to: '/sources/goals',
        role: ['admin', 'superAdmin']
      },
      {
        label: 'Media',
        icon: 'pi pi-fw pi-images',
        to: '/media',
        role: ['creator']
      }
    ]
  },
  {
    label: 'Others',
    role: ['creator'],
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        to: '/profile',
        role: ['creator']
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        to: '/settings'
      }
    ]
  }
];
