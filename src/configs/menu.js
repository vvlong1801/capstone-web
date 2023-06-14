export const appMenu = [
  {
    label: "Home",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-th-large",
        to: "/dashboard",
        role: ["admin", "superAdmin", "creator"]
      },
    ],
  },
  {
    label: "Challenges",
    items: [
      {
        label: "Challenges",
        icon: "pi pi-fw pi-box",
        to: "/challenges",
      },
      {
        label: "Members",
        icon: "pi pi-fw pi-users",
        to: "/members",
      },
      {
        label: "Invitations",
        icon: "pi pi-fw pi-directions",
        to: "/invitations",
      },
      {
        label: "Feedbacks",
        icon: "pi pi-fw pi-comments",
        to: "/feedbacks",
      },
    ],
  },
  {
    label: "Sources",
    items: [
      {
        label: "Exercises",
        icon: "pi pi-fw pi-clone",
        to: "/exercises",
      },
      {
        label: "Equipments",
        icon: "pi pi-fw pi-database",
        to: "/equipments",
      },
      {
        label: "Muscles",
        icon: "pi pi-fw pi-database",
        to: "/muscles",
      },
    ],
  },
];
