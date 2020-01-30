import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'

import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button'
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'
import "./administration.scss"; 
class UploadData extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            
        }

        
    }

    componentDidMount(){
        
    }

   

    renderCurrencies =()=>{
        return (
            <div>
                <Accordion defaultActiveKey="0">

                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                        Import Data
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            
                           
                        </div>
                    </Accordion.Collapse>
                </Accordion>

                <Accordion>
                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                        Import Event
                     </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            

                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        )
    }

    renderUploadDataWrap =()=>{

        return(
            <div>
                
                <Accordion defaultActiveKey="0">

                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                    Import Data
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            
                        </div>
                    </Accordion.Collapse>
                </Accordion>

                <Accordion defaultActiveKey="0">
                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                        Import Event
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div>

                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        )
    }

    handleClose = () => this.setState({showNewCurrencyForm:false});
    
    handleShow = () => this.setState({showNewCurrencyForm:true});

    

   

    updateCurrencyDetails = async (updateCurrencyPayload)=>{
        const {dispatch} = this.props;

        await dispatch(administrationActions.updateCurrency(updateCurrencyPayload));
    }

   

   

    

    render() {
        
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                   
                    
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Administration</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                <AdminNav />
                                   
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderUploadDataWrap()}
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

function mapStateToProps(state) {
    return {
        
        
        
        
    };
}

export default  connect(mapStateToProps) (UploadData);