export const CLIENTS_MODULE_MENU_LINKS = [
  {
    label: 'All',
    url: '/clients',
    exact: false,
  },
  {
    label: 'Active',
    url: '/active-clients',
    exact: false,
  },
  {
    label: 'Inactive',
    url: '/inactive-clients',
    exact: false,
  },
  {
    label: 'Pending Approval',
    url: '/clients-pending-approval',
    exact: false,
  },
  {
    label: 'Exited',
    url: '/clients-exited',
    exact: false,
  },
  {
    label: 'Blacklisted',
    url: '/clients-blacklisted',
    exact: false,
  },
];

export const GROUP_MODULE_MENU_LINKS = [
  {
    label: 'All',
    url: '/groups',
    exact: false,
  },
  // {
  //   label: 'Active',
  //   url: '/groups/active',
  //   exact: false,
  // },
  // {
  //   label: 'Inactive',
  //   url: '/groups/inactive',
  //   exact: false,
  // },
  // {
  //   label: 'Pending Approval',
  //   url: '/groups/pending-approval',
  //   exact: false,
  // },
  // {
  //   label: 'Exited',
  //   url: '/groups/exited',
  //   exact: false,
  // },
  // {
  //   label: 'Blacklisted',
  //   url: '/groups/blacklisted',
  //   exact: false,
  // },
];

export const LOAN_MODULE_MENU_LINKS = [
  {
    label: 'All',
    url: '/all-loans/all',
    exact: false,
  },
  {
    label: 'Partial Applications',
    url: '/all-loans/partial-application',
    exact: false,
  },
  {
    label: 'Pending Approval',
    url: '/all-loans/pending',
    exact: false,
  },
  {
    label: 'Approved',
    url: '/all-loans/approved',
    exact: true,
  },
  {
    label: 'Rejected',
    url: '/all-loans/rejected',
    exact: false,
  },
  {
    label: 'Active',
    url: '/all-loans/active',
    exact: false,
  },
  {
    label: 'In Arrears',
    url: '/all-loans/arrears',
    exact: false,
  },
  {
    label: 'Closed',
    url: '/all-loans/closed',
    exact: false,
  },
  {
    label: 'Closed Written Off',
    url: '/all-loans/closed-off',
    exact: false,
  },
  {
    label: 'Closed Withdrawn',
    url: '/all-loans/closed-withdrawn',
    exact: false,
  },
];




export const DEPOSIT_MODULE_MENU_LINKS = [
  {
    label: 'All',
    url: '/deposits/all',
    exact: false,
  },
  {
    label: 'Pending Approval',
    url: '/deposits/pending-approval',
    exact: false,
  },
  {
    label: 'In Active',
    url: '/deposits/approved',
    exact: true,
  },
  {
    label: 'Active',
    url: '/deposits/active',
    exact: false,
  },
  {
    label: 'Rejected',
    url: '/deposits/rejected',
    exact: false,
  },
  {
    label: 'Locked',
    url: '/deposits/locked',
    exact: false,
  },
  {
    label: 'Matured',
    url: '/deposits/matured',
    exact: false,
  },
  {
    label: 'Closed',
    url: '/deposits/closed',
    exact: false,
  }
];

export const REPORTS_MENU_LINKS = [
  
  {
    label: 'Clients/Groups',
    url: '/reports/clients/',
    exact: false,
  },
  {
    label: 'Loans',
    url: '/reports/loans/',
    exact: false,
  },
  {
    label: 'Deposits',
    url: '/reports/deposits/performance',
    exact: false,
  },
  {
    label: 'Accounting',
    url: '/reports/accounting/',
    exact: false,
  },
  {
    label: 'Users',
    url: '/reports/users/',
    exact: false,
  },
  {
    label: 'Transactions',
    url: '/reports/transactions/tellers',
    exact: false,
  },
];

export const CLIENTS_REPORTS_MENU_LINKS = [
  {
    label: 'Clients',
    url: '/reports/clients/',
    exact: true,
  },
  {
    label: 'Groups',
    url: '/reports/clients/groups',
    exact: false,
  },
];
export const LOAN_REPORTS_MENU_LINKS = [
  {
    label: 'Loan Accounts',
    url: '/reports/loans/accounts',
    exact: true,
  },
  {
    label: 'Account Statement',
    url: '/reports/loans/statements',
    exact: true,
  },
  {
    label: 'Loan Balances',
    url: '/reports/loans/balances',
    exact: true,
  },
  {
    label: 'Account Officer Performance',
    url: '/reports/loans/officer-performance',
    exact: true,
  },
  {
    label: 'Loan Schedules',
    url: '/reports/loans/',
    exact: true,
  },
  {
    label: 'Loan PAR',
    url: '/reports/loans/loans-par',
    exact: false,
  },
  
  
];
export const DEPOSITS_REPORTS_MENU_LINKS = [
  {
    label: 'Deposit Accounts',
    url: '/reports/deposits/',
    exact: true,
  },
  {
    label: 'Account Statements',
    url: '/reports/deposits/statements',
    exact: true,
  },
  {
    label: 'Deposit Balances',
    url: '/reports/deposits/balances',
    exact: true,
  },
  {
    label: 'Account Officer Performance',
    url: '/reports/deposits/performance',
    exact: true,
  },
];

export const ACCOUNTING_REPORTS_MENU_LINKS = [
  {
    label: 'Journal',
    url: '/reports/accounting',
    exact: true,
  },
  {
    label: 'Trial Balance (Analysis)',
    url: '/reports/accounting/trial-balance-analysis',
    exact: true,
  },
  {
    label: 'Trial Balance',
    url: '/reports/accounting/trial-balance',
    exact: true,
  }
];

export const USERS_REPORTS_MENU_LINKS = [
  {
    label: 'All Users',
    url: '/reports/users',
    exact: true,
  },
  {
    label: 'Account Officers',
    url: '/reports/users/officers',
    exact: true,
  },
  {
    label: 'Tellers',
    url: '/reports/users/tellers',
    exact: true,
  }
];

export const TRANSACTION_REPORTS_MENU_LINKS = [
  {
    label: 'Teller Transactions',
    url: '/reports/transactions/tellers',
    exact: true,
  },
  {
    label: 'Deposit Transactions',
    url: '/reports/transactions/deposit',
    exact: true,
  },
  {
    label: 'Loan Transactions',
    url: '/reports/transactions/loans',
    exact: true,
  }
];
