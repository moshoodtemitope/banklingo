import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";


import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import "./branches.scss"; 
class BranchesManagement extends React.Component {
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
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Branches</h2>
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

export default BranchesManagement;