import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import  TableComponent from '../../shared/elements/table'
import "./styles.scss"; 
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'




import ViewUser from '.'




class AccountContainer extends React.Component {
    constructor(props) {
        super(props);

        // this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:'',
        }
        

        
    }


    

    render() {
        
        let {generatedRoutes} = this.state;
        return (
             <Fragment>
                    <div className="content-wrapper">
                        
                        {this.props.children}
                        <Route  exact path='/user/:userid'  component={ViewUser} /> 
                        
                        
                        
                    </div>
             </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(AccountContainer);