export const ClientStateConstants={
    ALL_CLIENTS:0,  ACTIVE:1, PENDING_APPROVAL:3,INACTIVE:4, BLACKLISTED:6, EXITED:7
}

export const LoanStateConstants={
    ALL_LOANS:0,  PARTIAL_APPLICATION:1, PENDING_APPROVAL:2, APPROVED:3, REJECTED:4, ACTIVE:5, IN_ARREARS:6, CLOSED:7,CLOSED_WRITTEN_OFF:8,CLOSED_WITHDRAWN:9
}


export const LoanSubStateConstants={
   All:-1, Pending_1stLevel_Approval:3,Pending_2ndLevel_Approval:4,Pending_Client_Acceptance:6
}


export const ClientClassificationConstants={
    INDIVIDUAL:0,  GROUP:1
}



export const LoanPendingApprovalSubStateConstants={
    ALL:0,  PENDING_APPROVAL_LEVEL_1:3, PENDING_APPROVAL_LEVEL_2:4, PEMDING_CLIENT_APPROVAL:6
}



export const DepositStateConstants={
    ALL:0,  
    Partial_Application:1, 
    Pending_Approval:2, 
    Approved:3, 
    REJECTED:4, 
    ACTIVE:5, 
    IN_ARREARS:6, 
    CLOSED:7,
    CLOSED_WRITTEN_OFF:8,
    DORMANT:9,
    LOCKED:10,
    MARTURED:11,
}