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





import ViewUser from '.'
import MyProfile from './myprofile'
import ViewUserTasks from './my-tasks'




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
                        <Route  path='/user/:userid' render={(props) => <ViewUser {...props} />} /> 
                        <Route  exact path='/my-profile'  render={(props) => <MyProfile {...props} />} /> 
                        <Route   path='/my-profile/tasks'  render={(props) => <ViewUserTasks {...props} />} /> 
                        {/* <Route exact path='/user/:userid/tasks'  component={AccountContainer} />  */}
                        
                        
                        
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