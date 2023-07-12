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
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        to: '/members',
        role: ['admin', 'superAdmin']
      },
      {
        label: 'Creators',
        icon: 'pi pi-fw pi-users',
        to: '/members',
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
        role: ['creator']
      },
      {
        label: 'Invitations',
        icon: 'pi pi-fw pi-directions',
        to: '/invitations',
        role: ['creator']
      },
      {
        label: 'Feedbacks',
        icon: 'pi pi-fw pi-comments',
        to: '/feedbacks',
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
        icon: 'pi pi-fw pi-clone',
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
      }
    ]
  }
];
