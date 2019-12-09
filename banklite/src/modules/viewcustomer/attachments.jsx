import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// // import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
class ViewCustomerAttachments extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

       
    }

    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        <CustomerHeading {...this.props}/>
                        

                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <TableComponent classnames="striped bordered hover">
                                                <thead>
                                                    <tr>
                                                        <th>Document</th>
                                                        <th>File Type</th>
                                                        <th>Size</th>
                                                        <th>Last Modified</th>
                                                        <th>Added By</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </TableComponent>
                                            <div className="footer-with-cta toright">
                                                <Button >Upload Document</Button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </InnerPageContainer>
            </Fragment>
        );
    }
}

export default ViewCustomerAttachments;