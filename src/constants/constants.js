const Role = {
  OWNER: "superadmin",
  ADMIN: "admin",
  DEPUTY_ADMIN: "deputy_admin",
  CUSTOMER_SUPPORT: "customer_support",
};

export const Roles = [
  { value: 0, role: Role.OWNER, label: "Owner" },
  { value: 1, role: Role.ADMIN, label: "Admin" },
  { value: 2, role: Role.DEPUTY_ADMIN, label: "Deputy Admin" },
  { value: 3, role: Role.CUSTOMER_SUPPORT, label: "Customer Support" },
];

export const modules = [
  {
    value: "DashBoard",
    label: "DashBoard",
    link: "/superadmin/DashBoard",
    src: `${process.env.PUBLIC_URL}/images/si-1.svg`,
  },
  {
    value: "plans",
    label: "Products",
    link: "/superadmin/plans",
    src: `${process.env.PUBLIC_URL}/images/si-2.svg`,
  },
  {
    value: "client",
    label: "Clients",
    link: "/superadmin/clients",
    src: `${process.env.PUBLIC_URL}/images/si-3.svg`,
  },
  {
    value: "subscriptions",
    label: "Subscriptions",
    link: "/superadmin/subscription",
    src: `${process.env.PUBLIC_URL}/images/si-4.svg`,
  },
  {
    value: "invoicing",
    label: "Invoicing",
    link: "/superadmin/invoices",
    src: `${process.env.PUBLIC_URL}/images/si-6.svg`,
  },
  {
    value: "payments",
    label: "Payments",
    link: "/superadmin/payments",
    src: `${process.env.PUBLIC_URL}/images/si-7.svg`,
  },
  {
    value: "events",
    label: "All Events",
    link: "/superadmin/all-activity",
    src: `${process.env.PUBLIC_URL}/images/si-8.svg`,
  },
  {
    value: "contentMgmt",
    label: "Content Mgmt.",
    link: "/superadmin/content-management",
    src: `${process.env.PUBLIC_URL}/images/si-9.svg`,
  },
  {
    value: "reports",
    label: "Reports",
    link: "/superadmin/reports",
    src: `${process.env.PUBLIC_URL}/images/si-10.svg`,
  },
];

export const SuperAdminAccessManagementDefaultRoles = [
  {
    roleId: Role.OWNER,
    Modules: [
      {
        moduleName: "DashBoard",
        access: "full",
      },
      {
        moduleName: "Products",
        access: "full",
        children: [
          {
            moduleName: "Plans",
            access: "full",
          },
          {
            moduleName: "Add-Ons",
            access: "full",
          },
          {
            moduleName: "Coupons",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Clients",
        access: "full",
      },
      {
        moduleName: "Subscriptions",
        access: "full",
      },
      {
        moduleName: "Invoicing",
        access: "full",
      },
      {
        moduleName: "Payments",
        access: "full",
      },
      {
        moduleName: "All Events",
        access: "full",
      },
      {
        moduleName: "Content Mgmt.",
        access: "full",
      },

      {
        moduleName: "Reports",
        access: "full",
        children: [
          {
            moduleName: "Revenue",
            access: "full",
          },
          {
            moduleName: "Subscriptions",
            access: "full",
          },
          {
            moduleName: "Clients",
            access: "full",
          },
          {
            moduleName: "Payments",
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
        moduleName: "DashBoard",
        access: "full",
      },
      {
        moduleName: "Products",
        access: "full",
        children: [
          {
            moduleName: "Plans",
            access: "full",
          },
          {
            moduleName: "Add-Ons",
            access: "full",
          },
          {
            moduleName: "Coupons",
            access: "full",
          },
        ],
      },
      {
        moduleName: "Clients",
        access: "full",
      },
      {
        moduleName: "Invoicing",
        access: "full",
      },
      {
        moduleName: "Payments",
        access: "full",
      },
      {
        moduleName: "All Events",
        access: "full",
      },
      {
        moduleName: "Content Mgmt.",
        access: "full",
      },

      {
        moduleName: "Reports",
        access: "full",
        children: [
          {
            moduleName: "Revenue",
            access: "full",
          },
          {
            moduleName: "Subscriptions",
            access: "full",
          },
          {
            moduleName: "Clients",
            access: "full",
          },
          {
            moduleName: "Payments",
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
        moduleName: "DashBoard",
        access: "view",
      },
      {
        moduleName: "Products",
        access: "full",
        children: [
          {
            moduleName: "Plans",
            access: "view",
          },
          {
            moduleName: "Add-Ons",
            access: "view",
          },
          {
            moduleName: "Coupons",
            access: "view",
          },
        ],
      },
      {
        moduleName: "Clients",
        access: "view",
      },
      {
        moduleName: "Invoicing",
        access: "view",
      },
      {
        moduleName: "Payments",
        access: "view",
      },
      {
        moduleName: "All Events",
        access: "full",
      },
      {
        moduleName: "Content Mgmt.",
        access: "full",
      },

      {
        moduleName: "Reports",
        access: "full",
        children: [
          {
            moduleName: "Revenue",
            access: "no",
          },
          {
            moduleName: "Subscriptions",
            access: "view",
          },
          {
            moduleName: "Clients",
            access: "view",
          },
          {
            moduleName: "Payments",
            access: "no",
          },
        ],
      },
    ],
  },
  {
    roleId: Role.CUSTOMER_SUPPORT,
    Modules: [
      {
        moduleName: "DashBoard",
        access: "no",
      },
      {
        moduleName: "Products",
        access: "full",
        children: [
          {
            moduleName: "Plans",
            access: "view",
          },
          {
            moduleName: "Add-Ons",
            access: "view",
          },
          {
            moduleName: "Coupons",
            access: "no",
          },
        ],
      },
      {
        moduleName: "Clients",
        access: "view",
      },
      {
        moduleName: "Invoicing",
        access: "no",
      },
      {
        moduleName: "Payments",
        access: "no",
      },
      {
        moduleName: "All Events",
        access: "view",
      },
      {
        moduleName: "Content Mgmt.",
        access: "no",
      },

      {
        moduleName: "Reports",
        access: "full",
        children: [
          {
            moduleName: "Revenue",
            access: "no",
          },
          {
            moduleName: "Subscriptions",
            access: "view",
          },
          {
            moduleName: "Clients",
            access: "view",
          },
          {
            moduleName: "Payments",
            access: "no",
          },
        ],
      },
    ],
  },
];

const CareSiteType = {
  CARE_SITE_FACILITIES: "care_site_facilities",
  CARE_SITE_AGENCIES: "care_site_agency",
};

const PermissionAccess = {
  MODIFY_FILE: "MODIFY_FILE",
  VIEW_FILE: "VIEW_FILE",
  DELETE_FILE: "DELETE_FILE",
  CREATE_FILE: "CREATE_FILE",
};

const PlansPermission = {
  CARE_BASE_PLAN: "base_plan",
  CARE_ADVANCE_PLAN: "advance_plan",
  CARE_TURBO_PLAN: "turbo_plan",
};

const ModulePermission = {
  CARE_MODULE_DashBoard: "",
  CARE_MODULE_CLIENT: "",
  CARE_MODULE_CARETEAM: "",
  CARE_MODULE_SCHEDULER: "",
  CARE_MODULE_REPORTS: "",
  CARE_MODULE_MEDICINES: "",
  CARE_MODULE_INVOICING: "",
  CARE_MODULE_SALES_FUNNEL: "",
  CARE_MODULE_MESSAGING: "",
  CARE_MODULE_SETTINGS: "",
  CARE_MODULE_ACCESS_RIGHTS: "",
};

const ClientModule = {
  CARE_CLIENTS: {
    CREATE_GROUP: "",
    CREATE_CLIENT_DETAILS: "",
    VIEW_CLIENT_DETAILS: "",
    EDIT_CLIENT_DETAILS: "",
    DELETE_CLIENT_DETAILS: "",
    CLIENT_MEDICAL_COND_ADD_DOC: "",
    CLIENT_MEDICAL_COND_EDIT_DOC: "",
    CLIENT_MEDICAL_COND_VIEW_DOC: "",
    CLIENT_MEDICAL_COND_DELETE_DOC: "",
    CLIENT_CONTACT_FORM_ADD_DOC: "",
    CLIENT_CONTACT_FORM_EDIT_DOC: "",
    CLIENT_CONTACT_FORM_VIEW_DOC: "",
    CLIENT_CONTACT_FORM_DELETE_DOC: "",
    CLIENT_COMPLIANCE_ADD_DOC: "",
    CLIENT_COMPLIANCE_EDIT_DOC: "",
    CLIENT_COMPLIANCE_VIEW_DOC: "",
    CLIENT_COMPLIANCE_DELETE_DOC: "",
    STORE_CARE_PLAN: "",
    ADD_CARE_PLAN: "",
    DELETE_CARE_PLAN: "",
    EDIT_CARE_PLAN: "",
    VIEW_CARE_PLAN: "",
    CLIENT_JOURNAL_ACTIVITY: "",
    CLIENT_JOURNAL_CARETEAM_MEMBER_NOTES: "",
    CLIENT_JOURNAL_FRIENDS_AND_FAMILY_NOTES: "",
  },
};

const CareTeamModule = {
  CARE_CARETEAM: {
    CREATE_GROUP: "",
    ADD_CARETEAM_DETAILS: "",
    EDIT_CARETEAM_DETAILS: "",
    VIEW_CARETEAM_DETAILS: "",
    SHOW_GENERAL_AVAILABILITY: "",
    ADD_CARETEAM_DOCS: "",
    EDIT_CARETEAM_DOCS: "",
    VIEW_CARETEAM_DOCS: "",
    DELETE_CARETEAM_DOCS: "",
    ADD_CARETEAM_TRAINING_DETAILS: "",
    EDIT_CARETEAM_TRAINING_DETAILS: "",
    VIEW_CARETEAM_TRAINING_DETAILS: "",
    DELETE_CARETEAM_TRAINING_DETAILS: "",
    JOURNAL_NOTES: "",
    JOURNAL_ACTIVITY: "",
  },
};

const Scheduler = {
  TASK_STATUS: "",
  SCHEDULER: "",
  PAYROLL_CALCULATOR: "",
  CREATE_NEW_SHIFT: "",
  CREATE_NEW_TEMPLATE: {
    CLICK_TEMPLATES: "",
    GENERIC_TEMPLATE: "",
    CLIENT_SPECIFIC_TEMPLATE: "",
  },
  FORM_TEMPLATE: "",
  EDIT_TEMPLATE: "",
  DELETE_TEMPLATE: "",
  EDIT_SHIFT: "",
  DELETE_SHIFT: {
    CLICK: "",
    DELETE_SINGLE_SHIFT: "",
    DELETE_ALL_SHIFTS: "",
  },
  OPEN_SHIFT_FUNCTIONALITY: "",
  RECURRING_SHIFT_FUNCTIONALITY: "",
  ACCESS_CARETEAM_SHIFT_NOTES: "",
  CAPTURE_AND_ATTACH_PHOTOS_IN_TASK: "",
  CREATE_AND_COMPLETE_TASKS: "",
};

const Reports = {
  WELLBEING_CHARTS: "",
  PAYROLL_CHARTS: "",
  SEARCH_CARETEAM: "",
  SEARCH_CLIENT: "",
};

export const ComplianceDocsType = [
  { label: "Compliance", value: "Compliance" },
  { label: "Care-plan", value: "Care-plan" },
  { label: "Petty-Cash", value: "Petty-Cash" },
  { label: "Miscellaneous", value: "Miscellaneous" },
];
