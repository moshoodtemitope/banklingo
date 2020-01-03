import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';

import Modal from 'react-bootstrap/Modal'

// import DatePicker from "react-datepicker";
import DatePicker from '../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'

import { Formik, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';

import Select from 'react-select';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'
import Alert from 'react-bootstrap/Alert'
import "./accountsmanagement.scss"; 

class JournalEntries extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            show:false,
            CurrentPage: 1,
            PageSize: 25,
        }

        

        
    }

    componentDidMount(){
        this.getJournalEntries();
     }
 
     getJournalEntries = () =>{
         const {dispatch} = this.props;
         let payload ={
             PageSize: this.state.PageSize,
             CurrentPage:this.state.CurrentPage
         }
         dispatch(acoountingActions.getJournalEntries(payload));
     }

     createJournalEntry = async(journalPayload) =>{
        const {dispatch} = this.props;
        
        await dispatch(acoountingActions.createJournalEntry(journalPayload));
    }

    // handleDatePicker=(dateofEntry)=>{
    //     // dateofEntry.setHours( dateofEntry.getHours() + 1 );
    //     console.log('entry date, ',dateofEntry, typeof dateofEntry)
    //     this.setState ({dateofEntry : dateofEntry});
    //     // this.props.onChange(this.props.id, dateofEntry);
    // }

    handleDateChange(e){
        e.preventDefault();

        // const name = e.target.name;
        // console.log('entry date, ',e.target.value)
        // if(name === 'bvn'){
        //     this.setState({bvn: e.target.value.replace(/\D/,'')})
        //     if(this.state.bvn.length === 10)
        //     console.log('entry date, ',e.target.value)
        // }
        
        
    }



    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

    validate = (values) => {
        const errors = {};
        
        

        if (!values.entryAmount) {
            errors.entryAmount = 'Required';
        } else if (parseFloat(values.entryAmount)<1) {
            errors.entryAmount = 'Amount must be greater than zero';
        }

        if (!values.glAcountlId) {
            errors.glAcountlId = 'Required';
        } 

        if (!values.entryTypeId) {
            errors.entryTypeId = 'Required';
        }

        if (!values.branchId) {
            errors.branchId = 'Required';
        }

        if (!values.entryDate) {
            errors.entryDate = 'Required';
        }

        if(values.entryNotes!=='' && values.entryNotes.length<=2) {
            errors.entryNotes = 'Please provide detail notes';
        }
       
        
        //...
        console.log('dsdsds', values.entryNotes.length);
        return errors;
        };

    addNewJournal = ()=>{
        const {show} = this.state;
        let createJournalEntryRequest = this.props.createJournalEntry,
            getJournalEntriesRequest = this.props.getJournalEntries,
            
            allGlAccounts =[],
            allBranches =[],
            entryTypes =[
                {value: '1', label: 'Credit'},
                {value: '2', label: 'Debit'},
            ];

            getJournalEntriesRequest.request_data.response2.data.map((channel, id)=>{
                allGlAccounts.push({label: channel.accountDescription, value:channel.id});
            })

            getJournalEntriesRequest.request_data.response3.data.map((branch, id)=>{
                allBranches.push({label: branch.name, value:branch.id});
            })
        


        return(
            <Modal show={show} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-60w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>New Journal Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validate={this.validate}
                        initialValues={{
                            glAcountlId: '',
                            entryTypeId: '',
                            branchId: '',
                            entryAmount: '',
                            entryDate: '',
                            entryNotes: '',
                        }}
                        // validationSchema={createJournalEntrySchema}
                        onSubmit={(values, { resetForm }, errors,) => {
                            // same shape as initial values
                            
                            let newJournalEntryPayload = {
                                jornalEntryModel: [
                                    {
                                        glAccountId: values.glAcountlId,
                                        amount: parseFloat(values.entryAmount),
                                        journalEntryType: parseInt(values.entryTypeId),
                                        branchId: values.branchId,
                                    }
                                ],
                                notes: values.entryNotes,
                                bookingDate: values.entryDate.toISOString(),
                            };

                            

                            this.createJournalEntry(newJournalEntryPayload)
                                .then(
                                    () => {
                                        if (this.props.createJournalEntry.request_status === accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS) {
                                            resetForm();
                                            this.getJournalEntries();
                                            setTimeout(() => {
                                                this.props.dispatch(acoountingActions.createJournalEntry("CLEAR"))
                                            }, 3000);
                                        } else {
                                            setTimeout(() => {
                                                this.props.dispatch(acoountingActions.createJournalEntry("CLEAR"))
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
                            setFieldValue,
                            touched,
                            isValid,
                            errors, }) => (
                                <Form noValidate
                                    onSubmit={handleSubmit}>

                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">GL Account</Form.Label>
                                            <Select
                                                options={allGlAccounts}
                                                
                                                onChange={(selectedGlAccount) => {
                                                    this.setState({ selectedGlAccount });
                                                    errors.glAcountlId = null
                                                    values.glAcountlId = selectedGlAccount.value


                                                }}
                                                className={errors.glAcountlId && touched.glAcountlId ? "is-invalid" : null}

                                                name="glAcountlId"
                                                required
                                            />
                                            {errors.glAcountlId && touched.glAcountlId ? (
                                                <span className="invalid-feedback">{errors.glAcountlId}</span>
                                            ) : null}
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Branch</Form.Label>
                                            <Select
                                                options={allBranches}
                                                
                                                onChange={(selectedBranch) => {
                                                    this.setState({ selectedBranch });
                                                    errors.branchId = null
                                                    values.branchId = selectedBranch.value


                                                }}
                                                className={errors.branchId && touched.branchId ? "is-invalid" : null}

                                                name="branchId"
                                            />
                                            {errors.branchId && touched.branchId ? (
                                                <span className="invalid-feedback">{errors.branchId}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Journal Entry Type</Form.Label>
                                            <Select
                                                options={entryTypes}
                                                
                                                onChange={(selectedType) => {
                                                    this.setState({ selectedType });
                                                    errors.entryTypeId = null
                                                    values.entryTypeId = selectedType.value


                                                }}
                                                className={errors.entryTypeId && touched.entryTypeId ? "is-invalid" : null}

                                                name="entryTypeId"
                                                required
                                            />
                                            {errors.entryTypeId && touched.entryTypeId ? (
                                                <span className="invalid-feedback">{errors.entryTypeId}</span>
                                            ) : null}
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Amount</Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={handleChange}
                                                value={values.entryAmount}
                                                className={errors.entryAmount && touched.entryAmount ? "is-invalid" : null}
                                                name="entryAmount" required />
                                            {errors.entryAmount && touched.entryAmount ? (
                                                <span className="invalid-feedback">{errors.entryAmount}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="debitLocation" className={errors.entryDate && touched.entryDate ? "has-invaliderror" : null}>
                                                <Form.Label className="block-level">Booking Date (Entry Date)</Form.Label>
                                                <DatePicker placeholderText="Choose entry date" 
                                                    
                                                    // onChange={this.handleDatePicker}
                                                    // onChangeRaw={(e) => this.handleDateChange(e)}
                                                    dateFormat="d MMMM, yyyy"
                                                    className="form-control form-control-sm"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    name="entryDate"
                                                    value={values.entryDate}
                                                    onChange={setFieldValue}
                                                    maxDate={new Date()}
                                                    className={errors.entryDate && touched.entryDate ? "is-invalid form-control form-control-sm" : "form-control form-control-sm"}
                                                    
                                                />
                                                {errors.entryDate && touched.entryDate ? (
                                                    <span className="invalid-feedback">{errors.entryDate}</span>
                                                ) : null}
                                            </Form.Group>
                                        </Col>
                                        <Col></Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            
                                            <Form.Label className="block-level">Notes</Form.Label>
                                            <Form.Control as="textarea" rows="3" 
                                                onChange={handleChange}
                                                name="entryNotes"
                                                value={values.entryNotes}
                                                className={errors.entryNotes && touched.entryNotes ? "is-invalid form-control form-control-sm" : null}/>
                                            
                                            {errors.entryNotes && touched.entryNotes ? (
                                                <span className="invalid-feedback">{errors.entryNotes}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>
                                    <div className="footer-with-cta toleft">
                                        <Button variant="secondary" className="grayed-out" onClick={this.handleClose}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            
                                            disabled={createJournalEntryRequest.is_request_processing}>
                                                {createJournalEntryRequest.is_request_processing?"Please wait...": "Create Entry"}
                                            </Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                    {createJournalEntryRequest.request_status === accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS &&
                        <Alert variant="success">
                            {createJournalEntryRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {createJournalEntryRequest.request_status === accountingConstants.CREATE_JOURNAL_ENTRY_FAILURE &&
                        <Alert variant="danger">
                            {createJournalEntryRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
                
            </Modal>
        )
    }

    renderAllJournals =()=>{
        let getJournalEntriesRequest = this.props.getJournalEntries,
            {CurrentPage, PageSize} = this.state;
        
        switch(getJournalEntriesRequest.request_status){
            case (accountingConstants.GET_JOURNAL_ENTRY_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            
            case (accountingConstants.GET_JOURNAL_ENTRY_SUCCESS):
                let JournalEntriesData = getJournalEntriesRequest.request_data.response.data;

                if(JournalEntriesData!==undefined){
                    if(JournalEntriesData.result.length>=1){
                        return(
                            <div>
                                <div className="heading-with-cta">
                                    {/* <h3 className="section-title">Journal Entries</h3> */}
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown">
                                            <Form.Label> </Form.Label>
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">Filter</Button>
                                    </Form>
                                    <Button
                                        onClick={this.state.show === false ? this.handleShow : null}
                                    >New Journal Entry</Button>
                                </div>
                                <div className="heading-with-cta toleft"><Button >Edit Columns</Button></div>

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
                                            this.props.dispatch(acoountingActions.getJournalEntries(payload))
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
                                            <th>Entry Id</th>
                                            <th>Booking Date (Entry Date)</th>
                                            <th>Transaction ID</th>
                                            <th>GL Account Name</th>
                                            <th>Debit Amount</th>
                                            <th>Credit Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>023839</td>
                                            <td>some text</td>
                                            <td>text text</td>
                                            <td>Yes</td>
                                            <td>30</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>023839</td>
                                            <td>Debit</td>
                                            <td>text text</td>
                                            <td>Yes</td>
                                            <td>30</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>023839</td>
                                            <td>Debit</td>
                                            <td>text text</td>
                                            <td>Yes</td>
                                            <td>30</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>023839</td>
                                            <td>Debit</td>
                                            <td>text text</td>
                                            <td>Yes</td>
                                            <td>30</td>
                                        </tr>
                                    </tbody>
                                </TableComponent>
                            </div>
                        )
                    }else{
                        return(
                            <div className="no-records">
                                No Journal Entry has been created
                                <div className="footer-with-cta centered">
                                    <Button variant="primary"  onClick={this.state.show === false ? this.handleShow : null} className="btn btn-primary">New Journal Entry</Button>
                                </div>
                            </div>
                        )
                    }

                }else{
                    return null;
                }

            case (accountingConstants.GET_JOURNAL_ENTRY_FAILURE):
                    return (
                        <div className="loading-content"> 
                            <div>An error occured please try again</div>
                        </div>
                    )
            default :
            return null;
        }
    }

    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                {
                    this.props.getJournalEntries.request_status ===accountingConstants.GET_JOURNAL_ENTRY_SUCCESS
                    && this.addNewJournal()
                }
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Accounting</h2>
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
                                        {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderAllJournals()}
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
        createJournalEntry : state.accountingReducers.createJournalEntriesReducer,
        getJournalEntries : state.accountingReducers.getJournalEntriesReducer,
    };
}

export default connect(mapStateToProps)(JournalEntries);