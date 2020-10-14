import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import "./pagenotfound.scss"; 
class ForbiddenPage extends React.Component {
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
                                <h2>Forbidden Access: You are authorized to make this request</h2>
                            </div>
                            
                        </div>
                        
                    </div>
                </InnerPageContainer>
            </Fragment>
        );
    }
}

export default ForbiddenPage;