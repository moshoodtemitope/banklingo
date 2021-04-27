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

export const LOAN_MODULE_MENU_LINKS = [
  {
    label: 'All',
    url: '/all-loans/all',
    exact: false,
  },
  {
    label: 'Pending Approval',
    url: '/all-loans/pending',
    exact: false,
  },
  {
    label: 'Approve',
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
    label: 'Loans',
    url: '/reports/loans/',
    exact: false,
  },
];

export const LOAN_REPORTS_MENU_LINKS = [
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
