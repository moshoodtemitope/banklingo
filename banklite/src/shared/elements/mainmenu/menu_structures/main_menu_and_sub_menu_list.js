export const main_menu_and_sub_menu_list = [
  {
    menuGroup: "Dashboard",
    mainMenu: "Dashboard",
    menuRoute: "/dashboard",
    permissionCode: "universal",
    hasSubMenu: false,
  },

  {
    menuGroup: "Clients Management",
    mainMenu: "Clients",
    permissionCode: "bnk_view_clients",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "Active",
        subMenuRoute: "/active-clients",
      },
      {
        subMenuLabel: "Inactive",
        subMenuRoute: "/inactive-clients",
      },
      {
        subMenuLabel: "Pending approval",
        subMenuRoute: "/clients-pending-approval",
      },
      {
        subMenuLabel: "Exited",
        subMenuRoute: "/clients-exited",
      },
      {
        subMenuLabel: "Blacklisted",
        subMenuRoute: "/clients-blacklisted",
      },
      {
        subMenuLabel: "All customers",
        subMenuRoute: "/clients",
      },
    ],
  },

  {
    menuGroup: "Loans Management",
    mainMenu: "Loans",
    permissionCode: "bnk_view_loan_accounts",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "Pending Approval",
        subMenuRoute: "/all-loans/pending",
      },
      {
        subMenuLabel: "Approved",
        subMenuRoute: "/all-loans/approved",
      },
      {
        subMenuLabel: "Rejected",
        subMenuRoute: "/all-loans/rejected",
      },
      {
        subMenuLabel: "Active",
        subMenuRoute: "/all-loans/active",
      },
      {
        subMenuLabel: "In Arears",
        subMenuRoute: "/all-loans/arrears",
      },
      {
        subMenuLabel: "Closed",
        subMenuRoute: "/all-loans/closed",
      },
      {
        subMenuLabel: "Closed Written Off",
        subMenuRoute: "/all-loans/closed-off",
      },
      {
        subMenuLabel: "Closed Withdrawn",
        subMenuRoute: "/all-loans/closed-withdrawn",
      },
      {
        subMenuLabel: "All Loans",
        subMenuRoute: "/all-loans/all",
      },
    ],
  },
  {
    menuGroup: "Deposits Management",
    mainMenu: "Deposits",
    permissionCode: "bnk_view_deposit_accounts",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "All Deposits",
        subMenuRoute: "/deposits/all",
      },
    ],
  },

  {
    menuGroup: "Disburments",
    mainMenu: "Disbursement",
    permissionCode: "bnk_view_disbursements",
    hasSubMenu: true,
    allowedPermissions: [
      "bnk_view_disbursements",
      "bnk_initiate_disbursements",
      "bnk_review_disbursements",
      "bnk_approve_disburmsements",
      "bnk_view_nip_requests",
    ],
    subMenus: [
      {
        subMenuLabel: "All Disbursements",
        permissionCode: "bnk_view_disbursements",
        subMenuRoute: "/disbursements/all-items",
      },
      {
        subMenuLabel: "All Batches",
        permissionCode: "bnk_view_disbursements",
        subMenuRoute: "/disbursements/all",
      },
      {
        subMenuLabel: "Partial Applications",
        permissionCode: "bnk_view_disbursements",
        subMenuRoute: "/disbursements/partial",
      },
      {
        subMenuLabel: "Initiate Disbursements",
        permissionCode: "bnk_initiate_disbursements",
        subMenuRoute: "/disbursements/initiate",
      },
      {
        subMenuLabel: "Pending Review",
        permissionCode: "bnk_view_disbursements",
        subMenuRoute: "/disbursements/pending-review",
      },
      {
        subMenuLabel: "Pending Approval",
        permissionCode: "bnk_view_disbursements",
        subMenuRoute: "/disbursements/pending-approval",
      },
      {
        subMenuLabel: "NIP Request",
        permissionCode: "bnk_view_nip_requests",
        subMenuRoute: "/disbursements/nip-requests",
      },
    ],
  },
  {
    menuGroup: "Loan Transactions",
    mainMenu: "Loan Transactions",
    permissionCode: "bnk_view_all_loan_transactions",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "All Loan Transactions",
        subMenuRoute: "/loan-transactions",
      },
    ],
  },
  {
    menuGroup: "Reports",
    mainMenu: "Reports",
    permissionCode: "bnk_view_all_loan_schedules",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "Loans",
        subMenuRoute: "/reports/loans/",
      },
    ],
  },

  {
    menuGroup: "Deposit Transactions",
    mainMenu: "Deposit Transactions",
    permissionCode: "bnk_view_all_deposit_transactions",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "All Deposit Transactions",
        subMenuRoute: "/deposit-transactions",
      },
    ],
  },

  {
    menuGroup: "Administration",
    mainMenu: "Platform",
    permissionCode: "bnk_manage_organisation",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "Company Information",
        subMenuRoute: "/platform/company-info",
      },
      {
        subMenuLabel: "Customer Whitelist",
        subMenuRoute: "/platform/customer-whitelist",
      },
      {
        subMenuLabel: "Payroll Information",
        subMenuRoute: "/platform/payroll-info",
      },
      {
        subMenuLabel: "Bank Information",
        subMenuRoute: "/platform/bank-info",
      },
    ],
  },
  {
    menuGroup: "Administration",
    mainMenu: "All Tasks",
    menuRoute: "/all-tasks",
    permissionCode: "bnk_manage_organisation",
    hasSubMenu: false,
  },

  {
    menuGroup: "Activities",
    mainMenu: "Activities",
    permissionCode: "bnk_view_activities",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "All Activities",
        subMenuRoute: "/activities",
      },
    ],
  },

  {
    menuGroup: "Branches",
    mainMenu: "Branches",
    permissionCode: "bnk_view_branches",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "All Branches",
        subMenuRoute: "/branches",
      },
    ],
  },
  {
    menuGroup: "View All Users",
    mainMenu: "Users",
    permissionCode: "bnk_view_all_users",
    hasSubMenu: true,
    subMenus: [
      {
        subMenuLabel: "All Users",
        subMenuRoute: "/user-management",
      },
    ],
  },
  {
    menuGroup: "Communications",
    mainMenu: "Communications",
    permissionCode: "bnk_view_all_communications",
    hasSubMenu: true,
    subMenus: [
      {
        permissionCode: "bnk_view_all_communications",
        subMenuLabel: "All Communications",
        subMenuRoute: "/communications/all",
      },
      {
        permissionCode: "bnk_view_email_communications",
        subMenuLabel: "Email",
        subMenuRoute: "/communications/emails",
      },
      {
        permissionCode: "bnk_view_sms_communications",
        subMenuLabel: "SMS",
        subMenuRoute: "/communications/sms",
      },
      {
        permissionCode: "bnk_view_web_hooks",
        subMenuLabel: "Web Hooks",
        subMenuRoute: "/communications/webhooks",
      },
    ],
  },
  {
    menuGroup: "Accounting",
    mainMenu: "Accounting",
    permissionCode: "bnk_view_charts_of_accounts",
    hasSubMenu: true,
    allowedPermissions: [
      "bnk_view_balance_sheet",
      "bnk_view_profit_and_loss",
      "bnk_view_trial_balance",
      "bnk_view_journal_entries",
      "bnk_view_charts_of_accounts",
    ],
    subMenus: [
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "Balance Sheet",
        permissionCode: "bnk_view_balance_sheet",
        subMenuRoute: "/balancesheet",
      },
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "Profit & Loss",
        permissionCode: "bnk_view_profit_and_loss",
        subMenuRoute: "/profit-loss",
      },
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "Trial Balance(Basic)",
        permissionCode: "bnk_view_trial_balance",
        subMenuRoute: "/trial-balance-basic",
      },
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "Trial Balance",
        permissionCode: "bnk_view_trial_balance",
        subMenuRoute: "/trial-balance",
      },
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "Journal Entries",
        permissionCode: "bnk_view_journal_entries",
        subMenuRoute: "/journals",
      },
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "Charts of Accounts",
        permissionCode: "bnk_view_charts_of_accounts",
        subMenuRoute: "/accounts",
      },
    ],
  },
  {
    menuGroup: "Administration",
    mainMenu: "Administration",
    permissionCode: "bnk_manage_organisation",
    allowedPermissions: [
      "bnk_manage_organisation",
      "bnk_manage_products",
      "bnk_manage_sms_provider",
      "bnk_manage_email_provider",
      "bnk_manage_role",
      "bnk_manage_users",
    ],
    // menuRoute: "/administration/general",
    hasSubMenu: true,
    subMenus: [
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "General",
        permissionCode: "bnk_manage_organisation",
        subMenuRoute: "/administration/general",
      },
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "Organization",
        permissionCode: "bnk_manage_organisation",
        subMenuRoute: "/administration/organization",
      },

      {
        // permissionName: "Access Universal",
        subMenuLabel: "Access",
        permissionCode: "bnk_manage_role",
        allowedPermissions: [
          "bnk_manage_role",
          "bnk_manage_users",
          "bnk_manage_organisation",
        ],
        subMenuRoute: "/administration/access",
      },

      {
        // permissionName: "Manage Products",
        subMenuLabel: "Products",
        permissionCode: "bnk_manage_products",
        subMenuRoute: "/administration/products",
      },
      {
        // permissionName: "Manage SMS Provider",
        subMenuLabel: "SMS",
        permissionCode: "bnk_manage_sms_provider",
        subMenuRoute: "/administration/sms",
      },
      {
        // permissionName: "Manage Email Provider",
        subMenuLabel: "Email",
        permissionCode: "bnk_manage_email_provider",
        subMenuRoute: "/administration/email",
      },
      {
        // permissionName: "Manage Organisation",
        subMenuLabel: "Platform",
        permissionCode: "bnk_manage_organisation",
        subMenuRoute: "/administration/platform",
      },
    ],
  },
];
