import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik';
import * as Yup from 'yup';
// import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'
import Alert from 'react-bootstrap/Alert'
import "./accountsmanagement.scss"; 

class AccountManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showCreateGL:false,
            showEditGL:false,
            CurrentPage: 1,
            PageSize: 25,
        }

        
    }

    componentDidMount(){
       this.getGLAccounts();
    }

    getGLAccounts = () =>{
        const {dispatch} = this.props;
        let payload ={
            PageSize: this.state.PageSize,
            CurrentPage:this.state.CurrentPage
        }
        dispatch(acoountingActions.getGLAccounts(payload));
    }

    submitNewGLAccountDetails = async (newGlPayload)=>{
        const {dispatch} = this.props;

        await dispatch(acoountingActions.createGLAccount(newGlPayload));
    }

    submitUpdatedGLAccountDetails = async (updatedGlPayload)=>{
        const {dispatch} = this.props;

        await dispatch(acoountingActions.updateGLAccount(updatedGlPayload));
    }

    handleClose = () => this.setState({showCreateGL:false});
    
    handleShow = () => this.setState({showCreateGL:true});


    handleEditGlClose = () => this.setState({showEditGL:false});
    
    handleEditGlShow = (glIdToEdit, accountToEdit) => this.setState({showEditGL:true, glIdToEdit, accountToEdit});


    renderAllGL = ()=>{

        let getGLAccountsRequest = this.props.getGLAccounts,
            {CurrentPage, PageSize} = this.state;
        
        switch(getGLAccountsRequest.request_status){
            case (accountingConstants.GET_GLACCOUNTS_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            
            case (accountingConstants.GET_GLACCOUNTS_SUCCESS):
                let getGLAccountsData = getGLAccountsRequest.request_data.response.data;

                if(getGLAccountsData!==undefined){
                    if(getGLAccountsData.length>=1){
                        
                        return(
                            <div>
                                
                                <div className="heading-with-cta">
                                    {/* <h3 className="section-title">Chart of Accounts</h3> */}
                
                                </div>
                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" 
                                        className="countdropdown form-control form-control-sm"
                                        value={PageSize}
                                        onChange={(event)=>{
                                            this.setState({PageSize: event.target.value})
                                            let payload={
                                                CurrentPage,
                                                PageSize: event.target.value
                                            }
                                            this.props.dispatch(acoountingActions.getGLAccounts(payload))
                                        }}>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    <div className="move-page-actions">
                                        <div className="each-page-action">
                                            <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                        </div>
                                        <div className="page-count">
                                            <span>1-20</span>  of <span>20000</span>
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                    </div>
                                </div>
                
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>GLCode</th>
                                            <th>Account Name</th>
                                            <th>Account Type</th>
                                            <th>Account Usage</th>
                                            <th>In Use</th>
                                            <th>Manual Entries Allowed</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getGLAccountsData.map((eachGL, index)=>{
                                                return (
                                                    <tr key={index}>
                                                        <td>{eachGL.glCode}</td>
                                                        <td>{eachGL.accountName}</td>
                                                        <td>{eachGL.accountTypeDescription}</td>
                                                        <td>{eachGL.accountUsageDescription}</td>
                                                        <td>{eachGL.inUse.toString()}</td>
                                                        <td>{eachGL.manualEntriesAllowed.toString()}</td>
                                                        <td>
                                                            <DropdownButton
                                                                size="sm"
                                                                title="Actions"
                                                                key="glAccountActions"
                                                                // drop="left"
                                                                className="customone"
                                                            >
                                                                <Dropdown.Item eventKey="1" onClick={()=>this.handleEditGlShow(eachGL.glCode, eachGL.accountTypeDescription)}>Edit</Dropdown.Item>
                                                            </DropdownButton>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                </TableComponent>
                                <div className="footer-with-cta toleft">
                                    <Button onClick={this.handleShow}>Add a new account</Button>
                                </div>
                
                            </div>
                        )
                    }else{
                        return(
                            <div className="no-records">
                                No GL Accounts have been created
                                <div className="footer-with-cta centered">
                                    <Button variant="primary" onClick={this.handleShow} className="btn btn-primary">Create GL Account</Button>
                                </div>
                            </div>
                        )
                    }
                }else{
                    return null;
                }
            case (accountingConstants.GET_GLACCOUNTS_FAILURE):
                    return (
                        <div className="loading-content"> 
                            <div>An error occured please try again</div>
                        </div>
                    )
            default :
            return null;
        }
        
    }

    newGLAccountPopUp = () =>{
        let allAccountTypes =[
            {value: '1', label: 'Asset'},
            {value: '2', label: 'Liability'},
            {value: '3', label: 'Equity'},
            {value: '4', label: 'Income'},
            {value: '5', label: 'Expense'},
        ],
        accountUsage=[
            {value: '1', label: 'Header'},
            {value: '2', label: 'Detail'}
        ],
        glAccountValidationSchema = Yup.object().shape({
            accountNotes: Yup.string()
              .min(1, 'Min of two characters'),
            accountUsage: Yup.string()
              .min(1, 'Please provide valid symbol'),
            accountType: Yup.string()
              .min(1, 'Min of two characters'),
            accountName: Yup.string()
                .min(2, 'Min of two characters')
                .max(30, 'Max Limit reached')
                .required('Please provide name'),
            glCode: Yup.string()
                    .min(2, 'Min of two characters')
                    .max(30, 'Max Limit reached')
                    .matches(/^[0-9]*$/, 'Numbers only')
                    .required('Please provide name'),
        });
        const {showCreateGL, selectedAccType, selectedUsageOption} = this.state;
        let createGLAccountRequest = this.props.createGLAccount;
        return(
            <Modal show={showCreateGL} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                <Modal.Header>
                    <Modal.Title>Create new GL Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            accountNotes: '',
                            allowManualEntry: '',
                            accountUsage: '',
                            accountType: '',
                            accountName: '',
                            glCode: '',
                        }}
                        validationSchema={glAccountValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values
                            
                            let newgLPayload = {
                                glCode: values.glCode,
                                accountName: values.accountName,
                                accountTypeId: parseInt(selectedAccType.value),
                                accountUsageId: parseInt(selectedUsageOption.value),
                                manualEntriesAllowed: values.allowManualEntry,
                                notes: values.accountNotes,
                            };
                        
                            
                            this.submitNewGLAccountDetails(newgLPayload)
                                .then(
                                    () => {
                                        if(this.props.createGLAccount.request_status === accountingConstants.CREATE_GLACCOUNTS_SUCCESS){
                                           resetForm();
                                            this.getGLAccounts(); 
                                            setTimeout(() => {
                                                this.props.dispatch(acoountingActions.createGLAccount("CLEAR"))
                                            }, 3000);
                                        }else{
                                            setTimeout(() => {
                                                this.props.dispatch(acoountingActions.createGLAccount("CLEAR"))
                                            }, 2000);
                                        }
                                        
                                        

                                    }
                                )
                            
                                
                           

                        }}
                    >
                        {({ handleSubmit,
                            handleChange,
                            handleBlur,
                            resetForm,
                            values,
                            touched,
                            isValid,
                            errors, }) => (
                                <Form noValidate 
                                        onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">GL Code</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="glCode"
                                                value={values.glCode}
                                                onChange={handleChange} 
                                                className={errors.glCode && touched.glCode ? "is-invalid": null}
                                                required />
                                                {errors.glCode && touched.glCode ? (
                                                    <span className="invalid-feedback">{errors.glCode}</span>
                                                ) : null} 
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Account Name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="accountName"
                                                value={values.accountName}
                                                onChange={handleChange} 
                                                className={errors.accountName && touched.accountName ? "is-invalid": null}
                                                required />
                                                {errors.accountName && touched.accountName ? (
                                                    <span className="invalid-feedback">{errors.accountName}</span>
                                                ) : null} 
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="countriesList">
                                                <Form.Label className="block-level">Account Type</Form.Label>
                                                <Select
                                                    options={allAccountTypes}
                                                    onChange={(selectedAccType) => {
                                                        this.setState({ selectedAccType });
                                                        errors.accountType = null
                                                        values.accountType = selectedAccType.value
                                                    }}
                                                    className={errors.accountType && touched.accountType ? "is-invalid" : null}
                                                    // value={values.accountUsage}
                                                    name="accountType"
                                                    // value={values.currencyCode}
                                                    required
                                                />
                                                {errors.accountType && touched.accountType ? (
                                                    <span className="invalid-feedback">{errors.accountType}</span>
                                                ) : null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="countriesList">
                                                <Form.Label className="block-level">Account Usage</Form.Label>
                                                <Select
                                                    options={accountUsage}
                                                    onChange={(selectedUsageOption) => {
                                                        this.setState({ selectedUsageOption });
                                                        errors.accountUsage = null
                                                        values.accountUsage = selectedUsageOption.value
                                                    }}
                                                    className={errors.accountUsage && touched.accountUsage ? "is-invalid" : null}
                                                    
                                                    
                                                    name="accountUsage"
                                                    
                                                    required
                                                />
                                                {errors.accountUsage && touched.accountUsage ? (
                                                    <span className="invalid-feedback">{errors.accountUsage}</span>
                                                ) : null}
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    
                                    <Form.Group className="table-helper">
                                        <input type="checkbox"
                                         name="allowManualEntry" 
                                         onChange={handleChange} 
                                         checked={values.allowManualEntry? values.allowManualEntry:null}
                                         value={values.allowManualEntry}
                                         id="allowManualEntry"/>
                                        <label htmlFor="allowManualEntry">Manual Entries allowed</label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="block-level">Notes</Form.Label>
                                        <Form.Control name="accountNotes"
                                         as="textarea" rows="3" 
                                         onChange={handleChange} 
                                         value={values.accountNotes}
                                        />
                                    </Form.Group>
                                        
                                    {/* <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Decimal Digits</Form.Label>
                                <span className="form-text">2</span>
                            </Col>
                            <Col>
                                <Form.Label className="block-level">Symbol Position</Form.Label>
                                <Form.Control as="select" size="sm">
                                    <option>Before Number</option>
                                    <option>After Number</option>
                                </Form.Control>
                            </Col>
                        </Form.Row> */}
                                    {/* <div className="footer-with-cta toleft">
                            <input type="checkbox" name="" id="isBaseCurrency"/>
                            <label htmlFor="isBaseCurrency">Base Currency</label>
                        </div> */}
                                    <div className="footer-with-cta toleft">
                                        <Button variant="secondary" className="grayed-out" onClick={this.handleClose}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={createGLAccountRequest.is_request_processing}>
                                                {createGLAccountRequest.is_request_processing?"Please wait...": "Save"}
                                            </Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                    {createGLAccountRequest.request_status === accountingConstants.CREATE_GLACCOUNTS_SUCCESS && 
                        <Alert variant="success">
                           {createGLAccountRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {createGLAccountRequest.request_status === accountingConstants.CREATE_GLACCOUNTS_FAILURE && 
                        <Alert variant="danger">
                          {createGLAccountRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    editGLAccountPopUp = () =>{
        let allAccountTypes =[
            {value: '1', label: 'Asset'},
            {value: '2', label: 'Liability'},
            {value: '3', label: 'Equity'},
            {value: '4', label: 'Income'},
            {value: '5', label: 'Expense'},
        ],
        accountUsage=[
            {value: '1', label: 'Header'},
            {value: '2', label: 'Detail'}
        ],
        glAccountValidationSchema = Yup.object().shape({
            accountNotes: Yup.string()
              .min(1, 'Min of two characters'),
            accountUsage: Yup.string()
              .min(1, 'Please provide valid response'),
            accountType: Yup.string()
              .min(1, 'Min of two characters'),
            accountName: Yup.string()
                .min(2, 'Min of two characters')
                .max(30, 'Max Limit reached')
                .required('Please provide name'),
            glCode: Yup.string()
                    .min(2, 'Min of two characters')
                    .max(30, 'Max Limit reached')
                    .matches(/^[0-9]*$/, 'Numbers only')
                    .required('Please provide GL Code'),
        });
        let {showEditGL, glIdToEdit, selectedAccType, selectedUsageOption} = this.state;
        let gLAccountsList = this.props.getGLAccounts.request_data.response.data,
            selectGlAcc;
        
            let updateGLAccount = this.props.updateGLAccount;

            selectGlAcc = gLAccountsList.filter((account, index)=>account.glCode===glIdToEdit)[0];
            
        if(selectGlAcc!==undefined){
            return(
                <Modal show={showEditGL} onHide={this.handleEditGlClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                    <Modal.Header>
                        <Modal.Title>Editing A General Ledger Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                accountNotes: '',
                                allowManualEntry: selectGlAcc.manualEntriesAllowed,
                                // accountUsage: selectGlAcc.accountUsageId,
                                accountUsage: '',
                                accountType: '',
                                accountName: selectGlAcc.accountName,
                                glCode: selectGlAcc.glCode,

                            }}
                            validationSchema={glAccountValidationSchema}
                            onSubmit={(values, { resetForm }) => {
                                
                                
                                let updatedGlPayload = {
                                    glCode: values.glCode,
                                    accountName: values.accountName,
                                    accountTypeId: selectedAccType!=undefined? parseInt(selectedAccType.value): selectGlAcc.accountTypeId,
                                    accountUsageId:selectedUsageOption!=undefined? parseInt(selectedUsageOption.value): selectGlAcc.accountUsageId,
                                    manualEntriesAllowed: values.allowManualEntry,
                                    notes: values.accountNotes,
                                    idToUpdate: selectGlAcc.id
                                };
                                
                                this.submitUpdatedGLAccountDetails(updatedGlPayload)
                                    .then(
                                        () => {
                                            if(this.props.updateGLAccount.request_status === accountingConstants.UPDATE_GLACCOUNTS_SUCCESS){
                                                resetForm();
                                                
                                                setTimeout(() => {
                                                    this.getGLAccounts(); 
                                                    this.props.dispatch(acoountingActions.updateGLAccount("CLEAR"));
                                                    this.handleEditGlClose();
                                                }, 3000);
                                            }else{
                                                setTimeout(() => {
                                                    this.props.dispatch(acoountingActions.updateGLAccount("CLEAR"))
                                                }, 2000);
                                            }
                                            
                                            

                                        }
                                    )
                                
                                    
                            

                            }}
                        >
                            {({ handleSubmit,
                                handleChange,
                                handleBlur,
                                resetForm,
                                values,
                                touched,
                                isValid,
                                errors, }) => (
                                    <Form noValidate 
                                            onSubmit={handleSubmit}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">GL Code</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    name="glCode"
                                                    value={values.glCode}
                                                    onChange={handleChange} 
                                                    className={errors.glCode && touched.glCode ? "is-invalid": null}
                                                    required />
                                                    {errors.glCode && touched.glCode ? (
                                                        <span className="invalid-feedback">{errors.glCode}</span>
                                                    ) : null} 
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Account Name</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    name="accountName"
                                                    value={values.accountName}
                                                    onChange={handleChange} 
                                                    className={errors.accountName && touched.accountName ? "is-invalid": null}
                                                    required />
                                                    {errors.accountName && touched.accountName ? (
                                                        <span className="invalid-feedback">{errors.accountName}</span>
                                                    ) : null} 
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group controlId="countriesList">
                                                    <Form.Label className="block-level">Account Type</Form.Label>
                                                    <Select
                                                        options={allAccountTypes}
                                                        onChange={(selectedAccType) => {
                                                            this.setState({ selectedAccType });
                                                            // errors.accountType = null
                                                            values.accountType = selectedAccType.value
                                                        }}
                                                        className={errors.accountType && touched.accountType ? "is-invalid" : null}
                                                        defaultValue ={{label:selectGlAcc.accountTypeDescription, value: selectGlAcc.accountTypeId}}
                                                        name="accountType"
                                                        required
                                                    />
                                                    {errors.accountType && touched.accountType ? (
                                                        <span className="invalid-feedback">{errors.accountType}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label className="block-level">Account Usage</Form.Label>
                                                    <Select
                                                        options={accountUsage}
                                                        onChange={(selectedUsageOption) => {
                                                            this.setState({ selectedUsageOption });
                                                            // errors.accountUsage = null
                                                            values.accountUsage = selectedUsageOption.value
                                                        }}
                                                        className={errors.accountUsage && touched.accountUsage ? "is-invalid" : null}
                                                        defaultValue ={{label:selectGlAcc.accountUsageDescription, value: selectGlAcc.accountUsageId}}
                                                        
                                                        name="accountUsage"
                                                        required
                                                    />
                                                    {errors.accountUsage && touched.accountUsage ? (
                                                        <span className="invalid-feedback">{errors.accountUsage}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        
                                        <Form.Group className="table-helper">
                                            <input type="checkbox"
                                            name="allowManualEntry" 
                                            onChange={handleChange} 
                                            checked={values.allowManualEntry? values.allowManualEntry:null}
                                            value={values.allowManualEntry}
                                            id="allowManualEntry"/>
                                            <label htmlFor="allowManualEntry">Manual Entries allowed</label>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="block-level">Notes</Form.Label>
                                            <Form.Control name="accountNotes"
                                            as="textarea" rows="3" 
                                            onChange={handleChange} 
                                            value={values.accountNotes}
                                            />
                                        </Form.Group>
                                            
                                       
                                        <div className="footer-with-cta toleft">
                                            <Button variant="secondary" className="grayed-out" onClick={this.handleEditGlClose}>Cancel</Button>
                                            <Button
                                                type="submit"
                                                
                                                disabled={updateGLAccount.is_request_processing}>
                                                    {updateGLAccount.is_request_processing?"Please wait...": "Update"}
                                                </Button>
                                        </div>
                                    </Form>
                                )}
                        </Formik>
                        {updateGLAccount.request_status === accountingConstants.UPDATE_GLACCOUNTS_SUCCESS && 
                            <Alert variant="success">
                            {updateGLAccount.request_data.response.data.message}
                            </Alert>
                        }
                        {updateGLAccount.request_status === accountingConstants.UPDATE_GLACCOUNTS_FAILURE && 
                            <Alert variant="danger">
                            {updateGLAccount.request_data.error}
                            </Alert>
                        }
                    </Modal.Body>
                </Modal>
            )
        }
    }



    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    {this.newGLAccountPopUp()}
                    {
                        this.props.getGLAccounts.request_status ===accountingConstants.GET_GLACCOUNTS_SUCCESS
                        && this.editGLAccountPopUp()
                    }
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Account Management</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink to={'/balancesheet'}>Balance Sheet</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/profit-loss'}>Profit & Loss</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/trial-balance'}>Trial Balance</NavLink>
                                        </li>
                                        <li>
                                            {/* <NavLink to={'/accounts/journal'}>Journal Entries</NavLink> */}
                                            <NavLink to={'/journals'}>Journal Entries</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/accounts'}>Charts of Accounts</NavLink>
                                            {/* <ul>
                                                <li>
                                                    <NavLink to={'/accounts/charts/all'}>All</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/liabilities'}>Liabilities</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/equity'}>Equity</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/income'}>Income</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/expenses'}>Expenses</NavLink>
                                                </li>
                                            </ul> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderAllGL()}
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
        getGLAccounts : state.accountingReducers.getGLAccountsReducer,
        createGLAccount : state.accountingReducers.createGLAccountsReducer,
        updateGLAccount : state.accountingReducers.updateGLAccountReducer,
    };
}

export default connect(mapStateToProps)(AccountManagement);