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
            filename:null,
            invalidType:false
        }

        
    }

    componentDidMount(){
        
    }

    HandleFileUpLoad = (event) => {
        let filename = event.target.files[0].name,
            ext = event.target.files[0].type;
        
            if(ext!=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                    this.setState({invalidType: true});
            }
            if(ext==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                this.setState({invalidType: false});
            }

        console.log(event.target.files[0]);
     //    console.log(event.target.files[0]);
 
        this.setState({docuploaded: event.target.files[0], filename});
    }

    uploadData = async(payload)=>{
        

        const {dispatch} = this.props;
        
        await dispatch(administrationActions.uploadData(payload));
    }

    prepareUpload =()=>{
        const formData = new FormData();
        formData.append('Document', this.state.docuploaded);
        

        this.uploadData(formData)
            .then(
                ()=>{
                    if (this.props.uploadDataRequest.request_status === administrationConstants.UPLOAD_DATA_SUCCESS) {


                        setTimeout(() => {
                            this.props.dispatch(administrationActions.uploadData("CLEAR"));
                            this.setState({docuploaded: '', filename:''});
                        }, 3000);
                    } else {
                        setTimeout(() => {
                            this.props.dispatch(administrationActions.uploadData("CLEAR"))
                        }, 6000);
                    }
                }
            )
    }

   

    

    renderUploadDataWrap =()=>{
        let uploadDataRequest =  this.props.uploadDataRequest;
        return(
            <div>
                
                <Accordion defaultActiveKey="0">

                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                    Import Data
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="upload-wrap">
                            <div className="card upload-card">
                                <h4>Download Template</h4>
                                <div className="desc-msg">
                                Download your custom Excel template and fill in the details to import
                                </div>
                                <div className="footer-with-cta centered">
                                    
                                    <Button
                                        type="button"><a href="/assets/DataTemplate.xlsx" download>Download Template</a> </Button>
                                </div>
                            </div>
                            <div className="card upload-card">
                                <h4>Validate And Import</h4>
                                <div className="desc-msg">Upload your Excel template file with your data filled-in for validation and import</div>
                                
                                <div className="footer-with-cta centered mb-0">
                                    
                                    {/* <Button
                                        type="submit"> Upload data</Button> */}
                                        {uploadDataRequest.request_status !== administrationConstants.UPLOAD_DATA_PENDING &&
                                            <label htmlFor="file-upload3" className="btn btn-primary">Upload data</label>
                                        }
                                        
                                        {/* <input name="docuploaded" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/> */}
                                        <input name="docuploaded" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/>
                                     
                                </div>
                                {this.state.filename!==null && 
                                
                                    <div className="filename">
                                        {this.state.filename}
                                    </div>
                                }
                                {/* <span className="filename">{this.state.filename}</span> */}
                                {this.state.invalidType===true &&
                                    <Alert variant="danger">
                                        Only XLSX files can be processed. Please select an XLSX file.
                                    </Alert>
                                }
                                
                                {(this.state.filename!==null && this.state.invalidType===false) &&
                                    <div className="footer-with-cta centered mb-0">
                                    
                                        <Button
                                            variant="success"
                                            onClick={this.prepareUpload}
                                            type="submit "> {uploadDataRequest.is_request_processing?'Uploading data...': 'Upload data'}</Button>
                                            
                                    </div>
                                }
                                {uploadDataRequest.request_status === administrationConstants.UPLOAD_DATA_SUCCESS && 
                                    <Alert variant="success" className="mt-20">
                                        {uploadDataRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {uploadDataRequest.request_status === administrationConstants.UPLOAD_DATA_FAILURE && 
                                    <Alert variant="danger" className="mt-20">
                                        {uploadDataRequest.request_data.error}
                                
                                    </Alert>
                                }
                                
                            </div>
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
        
        uploadDataRequest : state.administrationReducers.uploadDataReducer,
    };
}

export default  connect(mapStateToProps) (UploadData);