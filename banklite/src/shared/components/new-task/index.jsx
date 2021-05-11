import * as React from 'react';

import { connect } from 'react-redux';
import { Fragment } from "react";
import { Link } from 'react-router-dom';


import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AsyncSelect from 'react-select/async';
import Alert from 'react-bootstrap/Alert'
import DatePicker from '../../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

import { numberWithCommas, getDateFromISO} from '../../utils';
import { clientsActions } from '../../../redux/actions/clients/clients.action';
import { clientsConstants } from '../../../redux/actiontypes/clients/clients.constants'

import { dashboardActions } from '../../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../../redux/actiontypes/dashboard/dashboard.constants'

import "./index.scss"; 
class CreateNewTask extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        }

        this.clientEncodedKey = this.props.clientEncodedKey? this.props.clientEncodedKey :null
        this.clientName = this.props.clientName? this.props.clientName :""

    }

    componentDidMount(){
    
    }

   
    getSearchForCustomerOptionValue = (option) => option.clientEncodedKey; 
    getSearchOptionForCustomerLabel = (option) => option.searchText;

    getSearchForUserOptionValue = (option) => option.searchItemEncodedKey; 
    getSearchOptionForUserLabel = (option) => option.searchText;

    noOptionsForCustomerMessage(inputValue) {
        
        return "No Customers found"
    }

    noOptionsForUserMessage(inputValue) {
        
        return "No User found"
    }

    getSearchedCustomerResults = async (inputValue)=> {
        const {dispatch} = this.props;

        if (!inputValue || inputValue.length===0) {
          return null;
        }
       

         await dispatch(dashboardActions.searchForCustomer(inputValue));

        
    }

    getSearchedUserResults = async (inputValue)=> {
        const {dispatch} = this.props;

        if (!inputValue || inputValue.length===0) {
          return null;
        }
       

         await dispatch(dashboardActions.globalSearchAnItem(inputValue));

        
    }

    handleSelectedCustomer =(inputValue)=>{
        
        
       
        this.setState({
            selectedCustomer: inputValue
        });
        
    }

    handleSelectedUser =(inputValue)=>{
        
        
       console.log("selected user", inputValue)
        this.setState({
            selectedUser: inputValue
        });
        
    }

    handleSearchCustomerChange =(inputValue)=>{
        const customerSearchText = inputValue.replace(/\W/g, '');

        this.setState({customerSearchText})

    }

    handleOpenTill = async (requestPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(clientsActions.openATill(requestPayload));
    } 

    handleSearchUserChange =(inputValue)=>{
        const customerUserText = inputValue.replace(/\W/g, '');

        this.setState({customerUserText})

    }

    loadSearchResults = (inputValue, callback) => {
        return this.getSearchedCustomerResults(inputValue)
                .then(()=>{
                    if(this.props.searchForCustomerReducer.request_status===dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS){
                        let searchResults = this.props.searchForCustomerReducer.request_data.response.data.filter(eachItem=>eachItem.searchItemType===0);
                        this.setState({defaultOptions:searchResults })

                        
                        return searchResults;
                    }
                })
    }

    loadUserSearchResults = (inputValue, callback) => {
        return this.getSearchedUserResults(inputValue)
                .then(()=>{
                    if(this.props.globalSearchAnItemReducer.request_status===dashboardConstants.GLOBAL_SEARCH_ITEM_SUCCESS){
                        
                        let searchResults = this.props.globalSearchAnItemReducer.request_data.response.data.filter(eachItem=>eachItem.searchItemType===1);
                        this.setState({defaultUserOptions:searchResults })

                        
                        return searchResults;
                    }
                })
    }

    handleCreateATask = async (requestPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(clientsActions.createClientTask(requestPayload));
    } 

    renderNewTaskBox = (transactionDetails) => {
        
        let 
            validationSchema = Yup.object().shape({
                summary: Yup.string()
                    .required('Required'),
                assignedToEncodedKey: Yup.string()
                    .required('Required'),
                dueDate: Yup.string()
                    .required('Required'),
            });
               
        let createAClientTaskRequest =  this.props.createAClientTaskReducer;  
        let {
            selectedCustomer,
            defaultUserOptions,
            selectedUser,
            defaultOptions} = this.state;
                
                

                
                    
            return(
                <div className="slidein-wrap">
                    <div className="slide-wrap-overlay"></div>
                    <div className="slidein-form" ref={this.setWrapperRef}>
                        <div className="slide-in-heading">
                            <h3>Creating Task</h3> 
                            <div className="close-slidein" onClick={this.props.closeNewTask}>X</div>
                        </div>
                        
                        <div className="slidein-formwrap">
                            <Formik
                                initialValues={{
                                    
                                    summary:"",
                                    assignedToEncodedKey:"",
                                    clientEncodedKey:"",
                                    dueDate:"",
                                    notes:"",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    
                                    let requestPayload = {
                                        summary: values.summary,
                                        assignedToEncodedKey: values.assignedToEncodedKey,
                                        assignedToUserName: selectedUser.searchText,
                                        // clientEncodedKey: values.clientEncodedKey!==""? values.clientEncodedKey: null,
                                        dueDate: values.dueDate.toISOString(),
                                        notes: values.notes!==""? values.notes: null,
                                    }

                                    if(this.clientEncodedKey){
                                        requestPayload.clientEncodedKey = this.clientEncodedKey;
                                    }else{
                                        requestPayload.clientEncodedKey = values.clientEncodedKey!==""? values.clientEncodedKey: null;
                                    }

                                    this.handleCreateATask(requestPayload)
                                            .then(()=>{
                                                if(this.props.createAClientTaskReducer.request_status===clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS){
                                                    resetForm()

                                                    this.setState({selectedUser:null, selectedCustomer: null})
                                                    const {dispatch} = this.props;
                                                    let params = `PageSize=20&CurrentPage=1`;
                                                    if(this.props.source==="dashboard"){
                                                        dispatch(dashboardActions.getDashboardData())
                                                    }
                                                    if(this.props.source==="client"){
                                                        dispatch(dashboardActions.getAClientTask(this.clientEncodedKey, params))
                                                    }
                                                    this.setState({
                                                        defaultOptions: null,
                                                        defaultUserOptions: null,
                                                        selectedUser: null,
                                                        selectedCustomer:null
                                                    })

                                                    // setTimeout(() => {
                                                        
                                                    // }, timeout);

                                                    // if(this.props.source==="mytasks"){
                                                    //     dispatch(dashboardActions.getAClientTask(this.clientEncodedKey, params))
                                                    // }
                                                }
                                            })
                                    

                                    



                                }}
                            >
                                {({ handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    resetForm,
                                    setFieldValue,
                                    setFieldTouched,
                                    values,
                                    touched,
                                    isValid,
                                    errors, }) => (
                                    <Form noValidate
                                        onSubmit={handleSubmit}>

                                        <Form.Group>
                                            <Form.Label className="block-level">Summary</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="summary"
                                                value={values.summary}
                                                onChange={handleChange}
                                                placeholder="Summary"
                                                className={errors.summary && touched.summary ? "is-invalid" : null}
                                                required />

                                            {errors.summary && touched.summary ? (
                                                <span className="invalid-feedback">{errors.summary}</span>
                                            ) : null}
                                        </Form.Group>
                                        {!this.clientEncodedKey &&
                                        <Form.Group>
                                            <div className="withasync">
                                                <Form.Label className="block-level">Linked To</Form.Label>
                                                <div>
                                                    <div>
                                                        <AsyncSelect
                                                            cacheOptions
                                                            value={selectedCustomer}
                                                            // getOptionLabel={e => e.clientName}
                                                            getOptionLabel={this.getSearchOptionForCustomerLabel}
                                                            getOptionValue={this.getSearchForCustomerOptionValue}
                                                            // getOptionValue={e => e.clientEncodedKey}
                                                            noOptionsMessage={this.noOptionsForCustomerMessage}
                                                            loadOptions={this.loadSearchResults}
                                                            defaultOptions={defaultOptions}
                                                            name="clientEncodedKey"
                                                            placeholder="Search Client Name"
                                                            className={errors.clientEncodedKey && touched.clientEncodedKey ? "is-invalid custom" : null}
                                                            onChange={(e) => {

                                                                setFieldValue("clientEncodedKey", e.clientEncodedKey)
                                                                this.handleSelectedCustomer(e)

                                                            }}
                                                            // onChange={this.handleSelectedCustomer}
                                                            // onChange={(selectedCustomer) => {
                                                            //     this.setState({ selectedCustomer });
                                                            //     errors.clientEncodedKey = null
                                                            //     values.clientEncodedKey = selectedCustomer.value
                                                            //     setFieldValue('clientEncodedKey', selectedCustomer.value);
                                                            // }}
                                                            onInputChange={this.handleSearchCustomerChange}
                                                        />


                                                        {errors.clientEncodedKey && touched.clientEncodedKey ? (
                                                            <span className="invalid-feedback">{errors.clientEncodedKey}</span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </Form.Group>
                                        }
                                        {this.clientEncodedKey &&
                                            <Form.Group>
                                                <Form.Label className="block-level">Linked To</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="clientEncodedKey"
                                                    value={this.clientName}
                                                    disabled ={true}
                                                    onChange={handleChange}
                                                    placeholder=""
                                                    className={errors.clientEncodedKey && touched.clientEncodedKey ? "is-invalid" : null}
                                                    required />

                                                
                                            </Form.Group>
                                        
                                        }

                                        <Form.Group>
                                            <div className="withasync">
                                                <Form.Label className="block-level">Assigned To</Form.Label>
                                                <div>
                                                    <div>
                                                        <AsyncSelect
                                                            cacheOptions
                                                            value={selectedUser}
                                                            // getOptionLabel={e => e.clientName}
                                                            getOptionLabel={this.getSearchOptionForUserLabel}
                                                            getOptionValue={this.getSearchForUserOptionValue}
                                                            // getOptionValue={e => e.clientEncodedKey}
                                                            noOptionsMessage={this.noOptionsForUserMessage}
                                                            loadOptions={this.loadUserSearchResults}
                                                            defaultOptions={defaultUserOptions}
                                                            name="assignedToEncodedKey"
                                                            placeholder="Search user"
                                                            className={errors.assignedToEncodedKey && touched.assignedToEncodedKey ? "is-invalid custom" : null}
                                                            onChange={(e) => {
                                                                console.log("here", e.searchItemEncodedKey)
                                                                setFieldValue("assignedToEncodedKey", e.searchItemEncodedKey)
                                                                this.handleSelectedUser(e)

                                                            }}
                                                            // onChange={this.handleSelectedCustomer}
                                                            // onChange={(selectedCustomer) => {
                                                            //     this.setState({ selectedCustomer });
                                                            //     errors.assignedToEncodedKey = null
                                                            //     values.assignedToEncodedKey = selectedCustomer.value
                                                            //     setFieldValue('assignedToEncodedKey', selectedCustomer.value);
                                                            // }}
                                                            onInputChange={this.handleSearchUserChange}
                                                        />


                                                        {errors.assignedToEncodedKey && touched.assignedToEncodedKey ? (
                                                            <span className="invalid-feedback">{errors.assignedToEncodedKey}</span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </Form.Group>
                                       
                                        <Form.Group className="withdate">
                                            <Form.Label className="block-level">Due Date</Form.Label>
                                            <DatePicker
                                                placeholderText="Choose  date"
                                                autoComplete="new-password"
                                                dateFormat="d MMMM, yyyy"
                                                className="form-control form-control-sm"
                                                peekNextMonth
                                                showMonthDropdown
                                                name="dueDate"
                                                value={values.dueDate}
                                                onChange={setFieldValue}
                                                showYearDropdown
                                                dropdownMode="select"
                                                minDate={new Date()}
                                                className={errors.dueDate && touched.dueDate ? "is-invalid form-control form-control-sm" : "form-control form-control-sm"}
                                            />
                                            {errors.dueDate && touched.dueDate ? (
                                                <span className="invalid-feedback">{errors.dueDate}</span>
                                            ) : null}

                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="block-level">Notes</Form.Label>
                                            <Form.Control as="textarea"
                                                rows="3"
                                                onChange={handleChange}
                                                name="notes"
                                                value={values.notes}
                                                className={errors.notes && touched.notes ? "is-invalid form-control form-control-sm" : null}
                                            />
                                            {errors.notes && touched.notes ? (
                                                <span className="invalid-feedback">{errors.notes}</span>
                                            ) : null}
                                        </Form.Group>
                                                   

                                        <div className="mt-50">
                                            <div className="footer-with-cta">
                                                <Button variant="secondary" 
                                                    disabled={createAClientTaskRequest.is_request_processing}
                                                    onClick={this.props.closeNewTask}>
                                                    Cancel
                                                </Button>
                                                {/* {createAClientTaskRequest.request_status !== clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS &&  */}
                                                    <Button
                                                        type="submit"
                                                        disabled={createAClientTaskRequest.is_request_processing}
                                                    >
                                                        
                                                        {createAClientTaskRequest.is_request_processing ? "Please wait..." : "Save Task"}
                                                    </Button>
                                                {/* } */}
                                                
                                            </div>
                                        </div>
                                        {createAClientTaskRequest.request_status === clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS && 
                                            <Alert variant="success">
                                                {createAClientTaskRequest.request_data.response.data.message && createAClientTaskRequest.request_data.response.data.message}
                                                {!createAClientTaskRequest.request_data.response.data.message && `Task was successfully created`}
                                            </Alert>
                                        }
                                        {createAClientTaskRequest.request_status === clientsConstants.CREATE_A_CLIENT_TASK_FAILURE && 
                                            <Alert variant="danger">
                                                {createAClientTaskRequest.request_data.error}
                                            </Alert>
                                        }



                                        


                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )
    }
    






    render() {
        
        let {openedState} = this.state;

        return (
            <Fragment>
                {this.props.showNewTask=== true && this.renderNewTaskBox(this.props.customerDetails)}
            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    return {
        createAClientTaskReducer: state.clientsReducers.createAClientTaskReducer,
        searchForCustomerReducer : state.dashboardReducers.searchForCustomerReducer,
        globalSearchAnItemReducer : state.dashboardReducers.globalSearchAnItemReducer,
    };
}

export default connect(mapStateToProps)(CreateNewTask);