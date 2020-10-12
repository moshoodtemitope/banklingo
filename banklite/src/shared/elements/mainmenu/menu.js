export const menuList = [
    {
        menuGroup: "Dashboard",
        mainMenu: "Dashboard",
        menuRoute: "/dashboard",
        permissionCode:"universal",
        hasSubMenu: false
    },
    {
        menuGroup: "Clients Management",
        mainMenu: "Clients",
        permissionCode: "bnk_view_clients",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "Active",
                subMmenuRoute: "/active-clients"
            },
            {
                subMenuLabel: "Inactive",
                subMmenuRoute: "/inactive-clients"
            },
            {
                subMenuLabel: "Pending approval",
                subMmenuRoute: "/clients-pending-approval"
            },
            {
                subMenuLabel: "Exited",
                subMmenuRoute: "/clients-exited"
            },
            {
                subMenuLabel: "Blacklisted",
                subMmenuRoute: "/clients-blacklisted"
            },
            {
                subMenuLabel: "All customers",
                subMmenuRoute: "/clients"
            },
        ]
    },
    {
        menuGroup: "Loans Management",
        mainMenu: "Loans",
        permissionCode: "bnk_view_loan_accounts",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "Pending Approval",
                subMmenuRoute: "/all-loans/pending"
            },
            {
                subMenuLabel: "Approved",
                subMmenuRoute: "/all-loans/approved"
            },
            {
                subMenuLabel: "Rejected",
                subMmenuRoute: "/all-loans/rejected"
            },
            {
                subMenuLabel: "Active",
                subMmenuRoute: "/all-loans/active"
            },
            {
                subMenuLabel: "In Arears",
                subMmenuRoute: "/all-loans/arrears"
            },
            {
                subMenuLabel: "Closed",
                subMmenuRoute: "/all-loans/closed"
            },
            {
                subMenuLabel: "Closed Written Off",
                subMmenuRoute: "/all-loans/closed-off"
            },
            {
                subMenuLabel: "Closed Withdrawn",
                subMmenuRoute: "/all-loans/closed-withdrawn"
            },
            {
                subMenuLabel: "All Loans",
                subMmenuRoute: "/all-loans"
            }
        ]
    },
    {
        menuGroup: "Deposits Management",
        mainMenu: "Deposits",
        permissionCode: "bnk_view_deposit_accounts",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "All Deposits",
                subMmenuRoute: "/deposits"
            },
        ]
    },
    
    {
        menuGroup: "Disburments",
        mainMenu: "Disbursement",
        permissionCode: "bnk_view_disbursements",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "All Disbursements",
                subMmenuRoute: "/disbursements"
            },
            {
                subMenuLabel: "Initiate Disbursements",
                subMmenuRoute: "/disbursements/initiate"
            },
            {
                subMenuLabel: "Pending Review",
                subMmenuRoute: "/disbursements/pending-review"
            },
            {
                subMenuLabel: "Pending Approval",
                subMmenuRoute: "/disbursements/pending-approval"
            },
            {
                subMenuLabel: "NIP Request",
                subMmenuRoute: "/disbursements/nip-requests"
            }
        ]
    },
    {
        menuGroup: "Loan Transactions",
        mainMenu: "Loan Transactions",
        permissionCode: "bnk_view_all_loan_transactions",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "All Loan Transactions",
                subMmenuRoute: "/loan-transactions"
            }
        ]
    },

    {
        menuGroup: "Deposit Transactions",
        mainMenu: "Deposit Transactions",
        permissionCode: "bnk_view_all_deposit_transactions",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "All Deposit Transactions",
                subMmenuRoute: "/deposit-transactions"
            }
        ]
    },

    {
        menuGroup: "Activities",
        mainMenu: "Activities",
        permissionCode: "bnk_view_activities",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "All Activities",
                subMmenuRoute: "/activities"
            }
        ]
    },

    {
        menuGroup: "Branches",
        mainMenu: "Branches",
        permissionCode: "bnk_view_branches",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "All Branches",
                subMmenuRoute: "/branches"
            }
        ]
    },
    {
        menuGroup: "User Management",
        mainMenu: "Users",
        permissionCode: "bnk_view_users",
        hasSubMenu: true,
        subMenus: [
            {
                subMenuLabel: "All Users",
                subMmenuRoute: "/user-management"
            }
        ]
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
                subMmenuRoute: "/communications"
            },
            {   
                permissionCode: "bnk_view_email_communications",
                subMenuLabel: "Email",
                subMmenuRoute: "/communications/emails"
            },
            {
                permissionCode: "bnk_view_sms_communications",
                subMenuLabel: "SMS",
                subMmenuRoute: "/communications/sms"
            },
            {
                permissionCode: "bnk_view_web_hooks",
                subMenuLabel: "Web Hooks",
                subMmenuRoute: "/communications/webhooks"
            }
        ]
    },
    {
        menuGroup: "Accounting",
        mainMenu: "Accounting",
        permissionCode: "bnk_view_charts_of_accounts",
        menuRoute: "/accounts",
        hasSubMenu: false
    },
    {
        menuGroup: "Administration",
        mainMenu: "Administration",
        permissionCode:"bnk_manage_organisation",
        menuRoute: "/administration/general",
        hasSubMenu: false
    },
    
]

export const quickMenuList = [
    {
        permissionName: "View Clients",
        mainMenu: "Customers",
        permissionCode: "bnk_view_clients",
        menuRoute: "/clients",
    },
    {
        permissionName: "View Loan Accounts",
        mainMenu: "Loan Accounts",
        permissionCode: "bnk_view_loan_accounts",
        menuRoute: "/all-loans"
    },
    {
        permissionName: "View All Loan Transactions",
        mainMenu: "Loan Transactions",
        permissionCode: "bnk_view_all_loan_transactions",
        menuRoute: "/loan-transactions",
    },
    {
        permissionName: "View Deposit Accounts",
        mainMenu: "Deposit Accounts",
        permissionCode: "bnk_view_deposit_accounts",
        menuRoute: "/deposits",
    },
    {
        permissionName: "View All Deposit Transactions",
        mainMenu: "Deposit Transactions",
        permissionCode: "bnk_view_all_deposit_transactions",
        menuRoute: "/deposit-transactions",
    },
    {
        permissionName: "View Activities",
        mainMenu: "System Activities",
        permissionCode: "bnk_view_activities",
        menuRoute: "/activities",
    },
    {
        permissionName: "View Branches",
        mainMenu: "Branches",
        permissionCode: "bnk_view_branches",
        menuRoute: "/branches",
    },
    {
        permissionName: "View Users",
        mainMenu: "Users",
        permissionCode: "bnk_view_users",
        menuRoute: "/user-management",
    },
    {
        permissionName: "View All Communications",
        mainMenu: "Communications",
        permissionCode: "bnk_view_all_communications",
        menuRoute: "/communications",
    },
]

export const quickCreateMenuList = [
    {
        permissionName: "Create Loan",
        mainMenu: "Loan Account",
        permissionCode: "bnk_create_loan",
        menuRoute: "/all-loans/newloan-account",
    },
    {
        permissionName: "Create Deposit",
        mainMenu: "Deposit Accounts",
        permissionCode: "bnk_create_deposit",
        menuRoute: "/deposits/newaccount"
    },
    {
        permissionName: "Create Client",
        mainMenu: "Create Customer",
        permissionCode: "bnk_create_client",
        menuRoute: "/clients/new"
    },
    {
        permissionName: "Create User",
        mainMenu: "User",
        permissionCode: "bnk_create_user",
        menuRoute: "/administration/access/new-user",
    },
]

export const administrationModuleMenuList = [
    {
        permissionName: "Manage Organisation",
        mainMenu: "General",
        permissionCode: "bnk_manage_organisation",
        menuRoute: "/administration/general",
    },
    {
        permissionName: "Manage Organisation",
        mainMenu: "Organization",
        permissionCode: "bnk_manage_organisation",
        menuRoute: "/administration/organization",
    },

    {
        permissionName: "Access Universal",
        mainMenu: "Access",
        permissionCode: "universal",
        menuRoute: "/administration/access",
    },
    
    {
        permissionName: "Manage Products",
        mainMenu: "Products",
        permissionCode: "bnk_manage_products",
        menuRoute: "/administration/products"
    },
    {
        permissionName: "Manage SMS Provider",
        mainMenu: "SMS",
        permissionCode: "bnk_manage_sms_provider",
        menuRoute: "/administration/sms",
    },
    {
        permissionName: "Manage Email Provider",
        mainMenu: "Email",
        permissionCode: "bnk_manage_email_provider",
        menuRoute: "/administration/email",
    },
]

export const adminGeneralMenuList = [
    {
        permissionName: "Manage Organisation",
        mainMenu: "Organization",
        permissionCode: "bnk_manage_organisation",
        menuRoute: "/administration/general",
    },

    {
        permissionName: "Manage Organisation",
        mainMenu: "Currency",
        permissionCode: "bnk_manage_organisation",
        menuRoute: "/administration/general/currency",
    },
    
    {
        permissionName: "Manage Transaction Channels",
        mainMenu: "Transaction Channels",
        permissionCode: "bnk_manage_transaction_channels",
        menuRoute: "/administration/general/txt-channels"
    },
    {
        permissionName: "Manage Customer Types",
        mainMenu: "Customer Types",
        permissionCode: "bnk_manage_customer_types",
        menuRoute: "/administration/general/customer-types",
    },
    {
        permissionName: "Manage Internal Control",
        mainMenu: "Internal Control",
        permissionCode: "bnk_manage_internal_control",
        menuRoute: "/administration/general/control",
    },
]

export const adminAccessMenuList = [
    {
        permissionName: "Manage Role",
        mainMenu: "Roles",
        permissionCode: "bnk_manage_role",
        menuRoute: "/administration/access",
    },

    {
        permissionName: "Manage Users",
        mainMenu: "Users",
        permissionCode: "bnk_manage_users",
        menuRoute: "/administration/access/users",
    },
    
    {
        permissionName: "Manage Organisation",
        mainMenu: "Preferences",
        permissionCode: "bnk_manage_organisation",
        menuRoute: "/administration/access/preferences"
    },
]

export const communicationsMenuList = [
    {
        permissionName: "View All Communications",
        mainMenu: "All",
        permissionCode: "bnk_view_all_communications",
        menuRoute: "/communications",
    },

    {
        permissionName: "View Email Communications",
        mainMenu: "Emails",
        permissionCode: "bnk_view_email_communications",
        menuRoute: "/communications/emails",
    },
    
    {
        permissionName: "View SMS Communications",
        mainMenu: "SMS",
        permissionCode: "bnk_view_sms_communications",
        menuRoute: "/communications/sms"
    },
    {
        permissionName: "View Web hooks",
        mainMenu: "Webhooks",
        permissionCode: "bnk_view_web_hooks",
        menuRoute: "/communications/webhooks"
    },
]

export const accountsMenuList = [
    {
        permissionName: "View Balance sheet",
        mainMenu: "Balance Sheet",
        permissionCode: "bnk_view_balance_sheet",
        menuRoute: "/balancesheet",
    },

    {
        permissionName: "View Profit and Loss",
        mainMenu: "Profit & Loss",
        permissionCode: "bnk_view_profit_and_loss",
        menuRoute: "/profit-loss",
    },
    
    {
        permissionName: "View Trial Balance",
        mainMenu: "Trial Balance",
        permissionCode: "bnk_view_trial_balance",
        menuRoute: "/trial-balance"
    },
    {
        permissionName: "View Journal Entries",
        mainMenu: "Journal Entries",
        permissionCode: "bnk_view_journal_entries",
        menuRoute: "/journals"
    },
    {
        permissionName: "View Charts of Accounts",
        mainMenu: "Charts of Accounts",
        permissionCode: "bnk_view_charts_of_accounts",
        menuRoute: "/accounts"
    },
]
