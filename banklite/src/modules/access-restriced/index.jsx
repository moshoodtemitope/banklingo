import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import "./pagenotfound.scss"; 
class AccessRestricted extends React.Component {
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
                    <div className="notfound-wrap">
                        <div className="container">
                            <div className="notfound-msg">
                                <h2>You do not have access to this feature</h2>
                            </div>
                            
                        </div>
                        
                    </div>
                </InnerPageContainer>
            </Fragment>
        );
    }
}

export default AccessRestricted;