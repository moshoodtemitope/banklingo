import * as React from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Fragment} from "react";
import Form from 'react-bootstrap/Form';
import LogoDark from '../../../assets/img/logo-dark.svg';
import Logo1 from '../../../assets/img/logo1.jpg';
import LogoIco from '../../../assets/img/logo-ico.svg';
import ClientLogo from '../../../assets/img/client-logo.svg';
import { history } from './../../../_helpers/history';

import "./index.scss"; 

class InAppHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:"",
            searchTxt:"",
            screenWidthSize: window.innerWidth
        }
   
        window.addEventListener("resize", ()=>this.setState({screenWidthSize: window.innerWidth}));
        
    }

    componentDidMount(){
       
    }



    renderHeading = () =>{
        let getTenant = localStorage.getItem("lingoAuthTenant")? JSON.parse(localStorage.getItem("lingoAuthTenant")): null;
        return(
            <div className="heading-container">
                <div className="main-logo" onClick={()=>history.push('/dashboard')}>
                    {this.props.loggedIn &&
                        <img src={LogoIco} alt=""/>
                    }
                    {!this.props.loggedIn &&
                        <img src={LogoDark} alt=""/>
                    }
                </div>
                {getTenant &&
                    <div className="client-logo">
                        <div className="client-name">{getTenant.companyName}</div>
                       {(getTenant.companyLogo!=="" && getTenant.companyLogo) && <img src={`data:image/jpeg;base64,${getTenant.companyLogo}`}/>}
                    </div>
                }
                
            </div>
        )
    }

   

    


    render() {
        const{screenWidthSize} = this.state
            let {showMenu} = this.state;
        return (
            <Fragment>
                
                <div className="headingwrapper inapp">
                    {this.renderHeading()}
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        // CloseSlideInCheck: state.onboardingReducers.CloseSlideIn
    };
}

export default connect(mapStateToProps)(InAppHeader);