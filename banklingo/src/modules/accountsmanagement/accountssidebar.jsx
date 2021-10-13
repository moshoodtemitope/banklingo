import * as React from 'react';
// import { NavLink} from 'react-router-dom';
import { NavLink} from 'react-router-dom';
import  SidebarElement from '../../shared/elements/sidebar'

class AccountsSidebar extends React.Component{
    constructor(props) {
        super(props);
        
        this.state={
            user:''
        }
       
    }




    render() {
        
        
        return (
            <SidebarElement>
                <ul>
                    <li>
                        <NavLink to={'/accounts/balancesheet'}>Balance Sheet</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/accounts/profit-loss'}>Profit & Loss</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/accounts/trial-balance'}>Trial Balance</NavLink>
                    </li>
                    <li>
                        {/* <NavLink to={'/accounts/journal'}>Journal Entries</NavLink> */}
                        <NavLink to={'/journals'}>Journal Entries</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/accounts'}>Charts of Accounts</NavLink>
                        <ul>
                            <li>
                                <NavLink to={'/accounts/charts/all'}>All</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/accounts/charts/liabilities'}>Liabilities</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/accounts/charts/equity'}>Equity</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/accounts/charts/income'}>Income</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/accounts/charts/expenses'}>Expenses</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </SidebarElement>
        );
    }
}




export default AccountsSidebar;