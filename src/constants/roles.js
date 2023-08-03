export const Role = {
  OWNER: "owner",
  ADMIN: "admin",
  DEPUTY_ADMIN: "deputy_admin",
  CARE_SUPERVISOR: "supervisor",
};

export const modules = [
  {
    value: "dashboard",
    label: "DashBoard",
    link: "/admin/dashboard",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-1.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "client",
    label: "Clients",
    link: "/admin/clients",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-2.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "careteam",
    label: "Care Team",
    link: "/admin/careteam",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-3.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "shift",
    label: "Scheduler",
    link: "/admin/shift",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-4.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "payroll",
    label: "Payroll",
    link: "/admin/payroll",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-4.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "report",
    label: "Report",
    link: "/admin/report",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/Reports.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "medicines",
    label: "Medicines",
    link: "/admin/addmedicines",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-5.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "invoicing",
    label: "Invoicing",
    link: "/admin/invoicing",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-6.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "salesfunnel",
    label: "Sales Funnel",
    link: "/admin/salesfunnel",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-7.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "messaging",
    label: "Messaging",
    link: "/admin/messaging",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-8.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
  {
    value: "userole",
    label: "Access Management",
    link: "/admin/userole",
    src: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/sidebar-icon-8.svg`,
    isAdding: true,
    isEditing: true,
    isDeleting: true,
    isViewing: true,
    isDisabled: false,
    isPermission: false,
    isVerify: false,
    isShow: true,
    isHide: false,
  },
];

export const Roles = [
  { value: 0, role: Role.OWNER, label: "Owner" },
  { value: 1, role: Role.ADMIN, label: "Admin" },
  { value: 2, role: Role.DEPUTY_ADMIN, label: "Deputy Admin" },
  { value: 3, role: Role.CARE_SUPERVISOR, label: "Care Supervisor" },
];

export const AccessManagementDefaultRoles = [
  {
    roleId: Role.OWNER,
    Modules: [
      {
        label: "Dashboard",
        value: "Dashboard",
        access: "full",
      },
      {
        moduleName: "Clients",
        access: "full",
        children: [
          {
            moduleName: "Add Clients",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
          {
            moduleName: "Profile",
            access: "full",
          },
          {
            moduleName: "Contacts",
            access: "full",
          },
          {
            moduleName: "Compliance Docs",
            access: "full",
          },
          {
            moduleName: "Care Plan",
            access: "full",
          },
          {
            moduleName: "Journal",
            access: "full",
          },
        ],
      },
      {
        moduleName: "CareTeam",
        access: "full",
        children: [
          {
            moduleName: "Add CareGiver",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
          {
            moduleName: "Profile",
            access: "full",
          },
          {
            moduleName: "Docs",
            access: "full",
          },
          {
            moduleName: "Training",
            access: "full",
          },
          {
            moduleName: "Journal",
            access: "full",
          },
          {
            moduleName: "Payroll",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Scheduler",
        access: "full",
        children: [
          {
            moduleName: "Scheduler",
            access: "full",
          },
          {
            moduleName: "Task Status",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Reports",
        access: "full",
      },
      {
        moduleName: "Medicines",
        access: "full",
        children: [
          {
            moduleName: "Scheduler",
            access: "full",
          },
          {
            moduleName: "Add Medicines",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Invoicing",
        access: "full",
      },
      {
        moduleName: "Sales Funnel",
        access: "full",
        children: [
          {
            moduleName: "Sales Overview",
            access: "full",
          },
          {
            moduleName: "Move Ins/Outs",
            access: "full",
          },
          {
            moduleName: "Leads Management",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Messaging",
        access: "full",
        children: [
          {
            moduleName: "Chats",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
        ],
      },
    ],
  },
  {
    roleId: Role.ADMIN,
    Modules: [
      {
        moduleName: "Dashboard",
        access: "full",
      },
      {
        moduleName: "Clients",
        access: "full",
        children: [
          {
            moduleName: "Add Clients",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
          {
            moduleName: "Profile",
            access: "full",
          },
          {
            moduleName: "Contacts",
            access: "full",
          },
          {
            moduleName: "Compliance Docs",
            access: "full",
          },
          {
            moduleName: "Care Plan",
            access: "full",
          },
          {
            moduleName: "Journal",
            access: "full",
          },
        ],
      },
      {
        moduleName: "CareTeam",
        access: "full",
        children: [
          {
            moduleName: "Add CareGiver",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
          {
            moduleName: "Profile",
            access: "full",
          },
          {
            moduleName: "Docs",
            access: "full",
          },
          {
            moduleName: "Training",
            access: "full",
          },
          {
            moduleName: "Journal",
            access: "full",
          },
          {
            moduleName: "Payroll",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Scheduler",
        access: "full",
        children: [
          {
            moduleName: "Scheduler",
            access: "full",
          },
          {
            moduleName: "Task Status",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Reports",
        access: "full",
      },
      {
        moduleName: "Medicines",
        access: "full",
        children: [
          {
            moduleName: "Scheduler",
            access: "full",
          },
          {
            moduleName: "Add Medicines",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Invoicing",
        access: "full",
      },
      {
        moduleName: "Sales Funnel",
        access: "full",
        children: [
          {
            moduleName: "Sales Overview",
            access: "full",
          },
          {
            moduleName: "Move Ins/Outs",
            access: "full",
          },
          {
            moduleName: "Leads Management",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Messaging",
        access: "full",
        children: [
          {
            moduleName: "Chats",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
        ],
      },
    ],
  },
  {
    roleId: Role.DEPUTY_ADMIN,
    Modules: [
      {
        moduleName: "Dashboard",
        access: "full",
      },
      {
        moduleName: "Clients",
        access: "full",
        children: [
          {
            moduleName: "Add Clients",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
          {
            moduleName: "Profile",
            access: "full",
          },
          {
            moduleName: "Contacts",
            access: "full",
          },
          {
            moduleName: "Compliance Docs",
            access: "full",
          },
          {
            moduleName: "Care Plan",
            access: "full",
          },
          {
            moduleName: "Journal",
            access: "full",
          },
        ],
      },
      {
        moduleName: "CareTeam",
        access: "full",
        children: [
          {
            moduleName: "Add CareGiver",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
          {
            moduleName: "Profile",
            access: "full",
          },
          {
            moduleName: "Docs",
            access: "full",
          },
          {
            moduleName: "Training",
            access: "full",
          },
          {
            moduleName: "Journal",
            access: "full",
          },
          {
            moduleName: "Payroll",
            access: "no",
          },
        ],
      },
      {
        moduleName: "Scheduler",
        access: "full",
        children: [
          {
            moduleName: "Scheduler",
            access: "full",
          },
          {
            moduleName: "Task Status",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Reports",
        access: "full",
      },
      {
        moduleName: "Medicines",
        access: "full",
        children: [
          {
            moduleName: "Scheduler",
            access: "full",
          },
          {
            moduleName: "Add Medicines",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Invoicing",
        access: "full",
      },
      {
        moduleName: "Sales Funnel",
        access: "full",
        children: [
          {
            moduleName: "Sales Overview",
            access: "full",
          },
          {
            moduleName: "Move Ins/Outs",
            access: "full",
          },
          {
            moduleName: "Leads Management",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Messaging",
        access: "full",
        children: [
          {
            moduleName: "Chats",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
        ],
      },
    ],
  },
  {
    roleId: Role.CARE_SUPERVISOR,
    Modules: [
      {
        moduleName: "Dashboard",
        access: "view",
      },
      {
        moduleName: "Clients",
        access: "full",
        children: [
          {
            moduleName: "Add Clients",
            access: "view",
          },
          {
            moduleName: "Create Groups",
            access: "view",
          },
          {
            moduleName: "Profile",
            access: "full",
          },
          {
            moduleName: "Contacts",
            access: "full",
          },
          {
            moduleName: "Compliance Docs",
            access: "full",
          },
          {
            moduleName: "Care Plan",
            access: "full",
          },
          {
            moduleName: "Journal",
            access: "full",
          },
        ],
      },
      {
        moduleName: "CareTeam",
        access: "full",
        children: [
          {
            moduleName: "Add CareGiver",
            access: "view",
          },
          {
            moduleName: "Create Groups",
            access: "view",
          },
          {
            moduleName: "Profile",
            access: "full",
          },
          {
            moduleName: "Docs",
            access: "full",
          },
          {
            moduleName: "Training",
            access: "full",
          },
          {
            moduleName: "Journal",
            access: "full",
          },
          {
            moduleName: "Payroll",
            access: "no",
          },
        ],
      },
      {
        moduleName: "Scheduler",
        access: "full",
        children: [
          {
            moduleName: "Scheduler",
            access: "full",
          },
          {
            moduleName: "Task Status",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Reports",
        access: "full",
      },
      {
        moduleName: "Medicines",
        access: "full",
        children: [
          {
            moduleName: "Scheduler",
            access: "full",
          },
          {
            moduleName: "Add Medicines",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Invoicing",
        access: "full",
      },
      {
        moduleName: "Sales Funnel",
        access: "full",
        children: [
          {
            moduleName: "Sales Overview",
            access: "full",
          },
          {
            moduleName: "Move Ins/Outs",
            access: "view",
          },
          {
            moduleName: "Leads Management",
            access: "no",
          },
        ],
      },
      {
        moduleName: "Messaging",
        access: "full",
        children: [
          {
            moduleName: "Chats",
            access: "full",
          },
          {
            moduleName: "Create Groups",
            access: "full",
          },
        ],
      },
    ],
  },
];

export const planFeaturesList = [
  {
    label: "Dashboard",
    value: "1",
  },
  {
    label: "Clients",
    value: "2",
  },
  {
    label: "Add Clients",
    value: "3",
  },
  {
    label: "Create Groups",
    value: "4",
  },
  {
    label: "Profile",
    value: "5",
  },
  {
    label: "Contacts",
    value: "6",
  },
  {
    label: "Compliance Docs",
    value: "7",
  },
  {
    label: "Care Plan",
    value: "8",
  },
  {
    label: "Journal",
    value: "9",
  },
  {
    label: "CareTeam",
    value: "10",
  },
  {
    label: "Add CareGiver",
    value: "11",
  },
  {
    label: "Create Groups",
    value: "12",
  },
  {
    label: "Profile",
    value: "13",
  },
  {
    label: "Docs",
    value: "14",
  },
  {
    label: "Training",
    value: "15",
  },
  {
    label: "Journal",
    value: "16",
  },
  {
    label: "Payroll",
    value: "17",
  },
  {
    label: "Scheduler",
    value: "18",
  },
  {
    label: "Scheduler",
    value: "19",
  },
  {
    label: "Task Status",
    value: "20",
  },
  {
    label: "Reports",
    value: "21",
  },
  {
    label: "Medicines",
    value: "22",
  },
  {
    label: "Scheduler",
    value: "23",
  },
  {
    label: "Add Medicines",
    value: "24",
  },
  {
    label: "Invoicing",
    value: "25",
  },
  {
    label: "Sales Funnel",
    value: "26",
  },
  {
    label: "Sales Overview",
    value: "27",
  },
  {
    label: "Move Ins/Outs",
    value: "28",
  },
  {
    label: "Leads Management",
    value: "29",
  },
  {
    label: "Messaging",
    value: "30",
  },
  {
    label: "Chats",
    value: "31",
  },
  {
    label: "Create Groups",
    value: "32",
  },
];

export const currencyList = [
  { value: "CAD", label: "CAD" },
  { value: "GBP", label: "GBP" },
  { value: "USD", label: "USD" },
];

export const billFrequencyList = [
  { value: "Monthly", label: "Monthly" },
  { value: "Yearly", label: "Yearly" },
];

export const discountList = [
  { value: "Fixed", label: "Fixed" },
  { value: "%", label: "%" },
];

export const redemptionListDetails = [
  { value: "one_time", label: "One Time" },
  { value: "indefinite", label: "Indefinite" },
  {
    value: "fewno",
    label: "Few No. of Times (Applied at each time an invoice is issued)",
  },
];

export const taskImages = [
  {
    value: 1,
    Ctg: "Personal Care",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s1.svg`,
  },
  {
    value: 2,
    Ctg: "Health",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s2.svg`,
  },
  {
    value: 3,
    Ctg: "Mobility",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s3.svg`,
  },
  {
    value: 4,
    Ctg: "Diet",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s4.svg`,
  },
  {
    value: 5,
    Ctg: "Companionship",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s5.svg`,
  },
  {
    value: 6,
    Ctg: "PRN Meds",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s6.svg`,
  },
  {
    value: 7,
    Ctg: "Housekeeping",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s7.svg`,
  },
  {
    value: 8,
    Ctg: "Report Incident",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s8.svg`,
  },
];
