export const menuData = [
  {
    name: "Home",
    needLogin: true,
    url: "/ui/home",
  },
  {
    name: "Reports ↡",
    needLogin: true,
    children: [
      {
        name: "Pyramid ↠",
        children: [
          {
            name: "Overall",
            url: "/ui/home",
          },
          {
            name: "By Practice",
            url: "/ui/report/pyramidbypractice",
          },
          {
            name: "By LOB",
            url: "/ui/report/pyramidbylob",
          },
          {
            name: "By Projects",
            url: "/ui/report/pyramidbyprojects",
          },
        ],
      },
      {
        name: "Profiles",
        url: "/ui/data/getAllProfiles",
      },
      {
        name: "Billability Report",
        url: "/ui/report/billabilityreport",
      },
      {
        name: "Drive ↠",
        needLogin: true,
        children: [
          {
            name: "Drive List",
            url: "/ui/reports/interview/alldrives",
          },
          {
            name: "Panel Nominations",
            url: "/ui/drive/allPanelists",
          },
          {
            name: "Associate Participations",
            url: "/ui/drive/allAssociates",
          },
          {
            name: "Panel Availabilities",
            url: "/ui/drive/calendarView",
          },
        ],
      },
      {
        name: "Leaves Report",
        needLogin: true,
        url:"ui/leaves/adminPanel"
      }
    ],
  },
  {
    name: "Forms ↡",
    needLogin: true,
    children: [
      {
        name: "Upload Assignment",
        url: "/ui/forms/uploadAssignment",
      },
      {
        name: "Profiles ↠",
        children: [
          {
            name: "Internal Profile",
            url: "/ui/profiles/internalprofile",
          },
          {
            name: "External Profile",
            url: "/ui/profiles/externalprofile",
          },
        ],
      },
      {
        name: "Billability ↠",
        children: [
          {
            name: "Billable Plans",
            url: "/ui/forms/billability/billableplans",
          },
        ],
      },
      {
        name: "Interview Drives ↠",
        children: [
          {
            name: "Create Drive",
            url: "/ui/forms/interview/newdrive",
          },
          {
            name: "Add My Availability",
            url: "/ui/forms/interview/registerpanelist",
          },
        ],
      },
      {
        name: "My Leaves",
        needLogin: true,
        url: "/ui/leaves/userPanel",
      },
    ],
  },
  {
    name: "Menu 3",
    needLogin: true,
    children: [
      {
        name: "Menu 3.1",
        url: "/ui/page/menu-3-1",
      },
      {
        name: "Menu 3.2",
        url: "/ui/page/menu-3-2",
      },
      {
        name: "Menu 3.3",
        children: [
          {
            name: "Menu 3.3.1",
            url: "/ui/page/menu-3-3-1",
          },
        ],
      },
    ],
  },
  {
    name: "Login",
    needLogin: false,
    url: "/ui/login",
  },
  {
    name: "Register",
    needLogin: false,
    url: "/register",
  },
  {
    name: "Logout",
    needLogin: true,
    url: "/ui/logout",
  },
];
