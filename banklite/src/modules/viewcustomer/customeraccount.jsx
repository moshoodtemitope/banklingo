import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// // import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
// import  TableComponent from '../../shared/elements/table'
// import "./administration.scss"; 
class ViewCustomerLoanAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

       
    }

    render() {
        return (
            <Fragment>
                {/* <InnerPageContainer {...this.props}> */}
                    <div className="content-wrapper">
                        {/* <CustomerHeading {...this.props}/> */}
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </InnerPageContainer> */}
            </Fragment>
        );
    }
}

export default ViewCustomerLoanAccount;