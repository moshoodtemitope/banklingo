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
        permissionCode: "bnk_view_charts_of_account",
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
        permissionName: "View All Users",
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