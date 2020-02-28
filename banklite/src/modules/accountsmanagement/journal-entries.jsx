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
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'

import { Formik, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Select from 'react-select';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import {getDateFromISO, numberWithCommas} from '../../shared/utils';
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
            totalComparison:null
        }

        

        
    }

    componentDidMount(){
        this.getJournalEntries();
     }
 
     getJournalEntries = (tempData) =>{
         const {dispatch} = this.props;
         let payload ={
             PageSize: this.state.PageSize,
             CurrentPage:this.state.CurrentPage
         }
         if(tempData){
            dispatch(acoountingActions.getJournalEntries(payload, tempData));
         }else{
            dispatch(acoountingActions.getJournalEntries(payload));
         }
         
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

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        let sizeOfPage = PageSize.target.value,
            {CurrentPage, BranchId,ClientState} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;
        // this.getJournalEntries(params);
        let getJournalEntriesRequest = this.props.getJournalEntries;
        let saveRequestData= getJournalEntriesRequest.request_data!==undefined?getJournalEntriesRequest.request_data.tempData:null;
        // this.getJournalEntries(saveRequestData);

        const {dispatch} = this.props;
         let payload ={
             PageSize: this.state.PageSize,
             CurrentPage:this.state.CurrentPage
         }
         if(tempData){
            dispatch(acoountingActions.getJournalEntries(payload, tempData));
         }else{
            dispatch(acoountingActions.getJournalEntries(payload));
         }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);

        let payload ={
            PageSize: this.state.PageSize,
            CurrentPage:nextPage
        }

        if(tempData){
            dispatch(acoountingActions.getJournalEntries(payload,tempData));
        }else{
            dispatch(acoountingActions.getJournalEntries(payload));
        }
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
        const {show, totalComparison} = this.state
        let checkTotals =false;
        let createJournalEntryRequest = this.props.createJournalEntry,
            getJournalEntriesRequest = this.props.getJournalEntries,
            
            allGlAccounts =[],
            allBranches =[],
            entryTypes =[
                {value: 1, label: 'Credit'},
                {value: 2, label: 'Debit'},
            ];
            let saveRequestData= (this.props.getJournalEntries.request_data!==undefined && this.props.getJournalEntries.request_data.response!==undefined)
                                    ? this.props.getJournalEntries.request_data.response.data :null;

            getJournalEntriesRequest.request_data.response2.data.map((channel, id)=>{
                allGlAccounts.push({label: channel.accountDescription, value:channel.id});
            })

            getJournalEntriesRequest.request_data.response3.data.map((branch, id)=>{
                allBranches.push({label: branch.name, value:branch.id});
            })
        const createJournalEntrySchema = Yup.object().shape({
            jornalEntries: Yup.array()
                            .of(
                                Yup.object().shape({
                                    entryAmount: Yup.string()
                                        .required('Required'),
                                    glAcountlId: Yup.string()
                                        .required('Required'),
                                    entryTypeId: Yup.string()
                                        .required('Required'),
                                    branchId: Yup.string()
                                        .required('Required'),
                                })
                            ),
                
                entryDate: Yup.string()
                  .required('Required'),
              });
        
        let jornalEntries=[
            {
                glAcountlId: '',
                entryTypeId: '',
                branchId: '',
                entryAmount: '',
                removable: false
            },
            {
                glAcountlId: '',
                entryTypeId: '',
                branchId: '',
                entryAmount: '',
                removable: false
            }
        ]

        return(
            <Modal show={show} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-60w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>New Journal Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        // validate={this.validate}
                        initialValues={{
                            entryDate: '',
                            entryNotes: '',
                            jornalEntries
                        }}
                        validationSchema={createJournalEntrySchema}
                        onSubmit={(values, { resetForm }, errors,) => {
                            // same shape as initial values
                            
                            let debitTotal =0,
                                creditTotal=0,
                                jornalEntryModel =[]
                                values.jornalEntries.forEach(eachEntry=>{
                                    if(eachEntry.entryTypeId===1){
                                        creditTotal+=parseFloat(eachEntry.entryAmount);
                                    }else{
                                        debitTotal +=parseFloat(eachEntry.entryAmount);
                                    }
                                    jornalEntryModel.push({
                                                    glAccountId: eachEntry.glAcountlId,
                                                    amount: parseFloat(eachEntry.entryAmount.replace(/,/g, '')),
                                                    journalEntryType: eachEntry.entryTypeId,
                                                    branchId: eachEntry.branchId,
                                                })
                                })

                                if(creditTotal!==debitTotal){
                                    console.log("#####",creditTotal);
                                    console.log("+++++",debitTotal);
                                    this.setState({totalComparison:false});
                                }else{
                                    this.setState({totalComparison:true});
                                    checkTotals = true
                                }

                                
                            
                            if(checkTotals){
                                let newJournalEntryPayload = {
                                    jornalEntryModel: [
                                        // {
                                        //     glAccountId: values.glAcountlId,
                                        //     amount: parseFloat(values.entryAmount),
                                        //     journalEntryType: parseInt(values.entryTypeId),
                                        //     branchId: values.branchId,
                                        // }
                                        ...jornalEntryModel
                                    ],
                                    notes: values.entryNotes,
                                    bookingDate: values.entryDate.toISOString(),
                                };

                                

                                this.createJournalEntry(newJournalEntryPayload)
                                    .then(
                                        () => {
                                            if (this.props.createJournalEntry.request_status === accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS) {
                                                resetForm();
                                                this.handleClose();
                                                setTimeout(() => {
                                                    this.getJournalEntries(saveRequestData);
                                                    // this.props.dispatch(acoountingActions.createJournalEntry("CLEAR"))
                                                    
                                                    
                                                }, 2000);
                                            } else {
                                                setTimeout(() => {
                                                    // this.props.dispatch(acoountingActions.createJournalEntry("CLEAR"))
                                                }, 2000);
                                            }



                                        }
                                    )
                            }

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
                                    
                                    <FieldArray
                                        name="jornalEntries"
                                        render={({ insert, remove, push }) => (
                                            <div>
                                                {values.jornalEntries.length > 0 &&
                                                    values.jornalEntries.map((entry, index) => (
                                                        // <div className="row" key={index}>
                                                            <Form.Row key={index}>
                                                                

                                                                <Col>
                                                                    <Form.Label className="block-level" htmlFor={`jornalEntries.${index}.branchId`}>Branch</Form.Label>
                                                                    <Select
                                                                        options={allBranches}
                                                                        onBlur={handleBlur}
                                                                        className={(errors.jornalEntries && typeof errors.jornalEntries[index] !== 'undefined') 
                                                                                    && errors.jornalEntries[index].hasOwnProperty('branchId') 
                                                                                    && (touched.jornalEntries && typeof touched.jornalEntries[index] !== 'undefined')
                                                                                     && touched.jornalEntries[index].branchId ? "is-invalid" : null}
                                                                        onChange={(selectedBranch) => {
                                                                           
                                                                            
                                                                            
                                                                            this.setState(
                                                                                Object.defineProperty({}, `selectedBranch-${index}`, {
                                                                                  value: selectedBranch,
                                                                                  enumerable: true
                                                                                })
                                                                            );
                                                                            values.jornalEntries[index].branchId = selectedBranch.value

                                                                            if( errors.jornalEntries && errors.jornalEntries[index] !==undefined){
                                                                                if(errors.jornalEntries[index].branchId){
                                                                                    delete errors.jornalEntries[index].branchId
                                                                                }
                                                                            }
                                                                              
                                                                            if( touched.jornalEntries && touched.jornalEntries[index] !==undefined){
                                                                                touched.jornalEntries[index].branchId  = null
                                                                            }
                                                                            


                                                                        }}
                                                                        

                                                                        name={`jornalEntries.${index}.branchId`}
                                                                    />
                                                                    {errors.jornalEntries &&
                                                                    errors.jornalEntries[index] &&
                                                                    errors.jornalEntries[index].branchId &&
                                                                    touched.jornalEntries &&
                                                                    touched.jornalEntries[index].branchId && (
                                                                        <span className="invalid-feedback">{errors.jornalEntries[index].branchId}</span>
                                                                        
                                                                    )}
                                                            </Col>
                                                            <Col>
                                                                    <Form.Label className="block-level" htmlFor={`jornalEntries.${index}.glAcountlId`}>GL Account</Form.Label>
                                                                    <Select
                                                                        options={allGlAccounts}
                                                                        onBlur={handleBlur}
                                                                        
                                                                        className={(errors.jornalEntries && typeof errors.jornalEntries[index] !== 'undefined') 
                                                                                    && errors.jornalEntries[index].hasOwnProperty('glAcountlId') 
                                                                                    && (touched.jornalEntries && typeof touched.jornalEntries[index] !== 'undefined')
                                                                                     && touched.jornalEntries[index].hasOwnProperty('glAcountlId') ? "is-invalid" : null}
                                                                        onChange={(selectedGlAccount) => {
                                                                            this.setState(
                                                                                Object.defineProperty({}, `selectedGlAccount-${index}`, {
                                                                                  value: selectedGlAccount,
                                                                                  enumerable: true
                                                                                })
                                                                            );
                                                                            
                                                                            
                                                                            values.jornalEntries[index].glAcountlId = selectedGlAccount.value 
                                                                            

                                                                            if( errors.jornalEntries && errors.jornalEntries[index] !==undefined){
                                                                                if(errors.jornalEntries[index].glAcountlId){
                                                                                    delete errors.jornalEntries[index].glAcountlId;
                                                                                }
                                                                                // errors.jornalEntries[index].glAcountlId  = null
                                                                            }
                                                                              
                                                                            if( touched.jornalEntries && touched.jornalEntries[index] !==undefined){
                                                                                touched.jornalEntries[index].glAcountlId  = null
                                                                            }
                                                                        }}
                                                                        // className={errors.glAcountlId && touched.glAcountlId ? "is-invalid" : null}
                                                                        
                                                                        name={`jornalEntries.${index}.glAcountlId`}
                                                                        
                                                                    />
                                                                    {errors.jornalEntries &&
                                                                    errors.jornalEntries[index] &&
                                                                    errors.jornalEntries[index].glAcountlId &&
                                                                    touched.jornalEntries &&
                                                                    touched.jornalEntries[index].glAcountlId && (
                                                                        <span className="invalid-feedback">{errors.jornalEntries[index].glAcountlId}</span>
                                                                        // <div className="field-error">
                                                                        //     {errors.jornalEntries[index].glAccountId}
                                                                        // </div>
                                                                    )}
                                                                </Col>
                                                            <Col>
                                                                <Form.Label className="block-level"
                                                                    htmlFor={`jornalEntries.${index}.entryTypeId`}>Journal Entry Type</Form.Label>
                                                                <Select
                                                                    options={entryTypes}
                                                                    onBlur={handleBlur}
                                                                    className={(errors.jornalEntries && typeof errors.jornalEntries[index] !== 'undefined') &&  errors.jornalEntries[index].entryTypeId && touched.jornalEntries &&  touched.jornalEntries[index].entryTypeId ? "is-invalid" : null}
                                                                    onChange={(selectedType) => {
                                                                        
                                                                       
                                                                        
                                                                        if( errors.jornalEntries && errors.jornalEntries[index] !==undefined){
                                                                            if(errors.jornalEntries[index].entryTypeId){
                                                                                delete errors.jornalEntries[index].entryTypeId;
                                                                            }
                                                                            // errors.jornalEntries[index].entryTypeId  = null
                                                                            
                                                                        }

                                                                        if( touched.jornalEntries && touched.jornalEntries[index] !==undefined){
                                                                            touched.jornalEntries[index].entryTypeId  = null
                                                                        }

                                                                        console.log("type is",selectedType.value, typeof selectedType.value);
                                                                        
                                                                        // values.jornalEntries[index].entryTypeId = selectedType.value
                                                                        values.jornalEntries[index].entryTypeId = parseInt(selectedType.value)

                                                                        
                                                                       

                                                                    }}
                                                                    
                                                                    

                                                                    name={`jornalEntries.${index}.entryTypeId`}
                                                                    
                                                                />
                                                                {/* {errors.entryTypeId && touched.entryTypeId ? (
                                                                    <span className="invalid-feedback">{errors.entryTypeId}</span>
                                                                ) : null} */}

                                                                    {errors.jornalEntries &&
                                                                    errors.jornalEntries[index] &&
                                                                    errors.jornalEntries[index].entryTypeId &&
                                                                    touched.jornalEntries &&
                                                                    touched.jornalEntries[index].entryTypeId && (
                                                                        <span className="invalid-feedback">{errors.jornalEntries[index].entryTypeId}</span>
                                                                        // <div className="field-error">
                                                                        //     {errors.jornalEntries[index].glAccountId}
                                                                        // </div>
                                                                    )}
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="block-level"
                                                                    htmlFor={`jornalEntries.${index}.entryAmount`}>Amount</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    // onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    value={numberWithCommas(values.jornalEntries[index].entryAmount)}
                                                                    className={(errors.jornalEntries && typeof errors.jornalEntries[index] !== 'undefined') && errors.jornalEntries[index].entryAmount && touched.jornalEntries && touched.jornalEntries[index].entryAmount ? "is-invalid withcustom" : "withcustom"}
                                                                    
                                                                    name={`jornalEntries.${index}.entryAmount`}
                                                                    required />
                                                                {errors.jornalEntries &&
                                                                    errors.jornalEntries[index] &&
                                                                    errors.jornalEntries[index].entryAmount &&
                                                                    touched.jornalEntries &&
                                                                    touched.jornalEntries[index].entryAmount && (
                                                                        <span className="invalid-feedback">{errors.jornalEntries[index].entryAmount}</span>
                                                                       
                                                                )}
                                                            </Col>
                                                            {
                                                               entry.removable===true &&
                                                                <Button
                                                                        type="button"
                                                                        variant="secondary"
                                                                        className="remove-btn"
                                                                        onClick={() => remove(index)}>-
                                                                    </Button>
                                                            }
                                                            
                                                            </Form.Row>
                                                        /* </div> */
                                                    ))}
                                                    
                                                        <div className="footer-with-cta toleft">
                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                                className="addnew-btn"
                                                                onClick={() => push(
                                                                    { glAcountlId: "", entryTypeId: "", branchId:"", entryAmount:"", removable:true}
                                                                )}>
                                                                    <span>+</span>New
                                                            </Button>
                                                        </div>
                                                  
                                            </div>
                                        )}
                                    />

                                    
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
                    {/* {createJournalEntryRequest.request_status === accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS &&
                        <Alert variant="success">
                            {createJournalEntryRequest.request_data.response.data.message}
                        </Alert>
                    } */}
                    {createJournalEntryRequest.request_status === accountingConstants.CREATE_JOURNAL_ENTRY_FAILURE &&
                        <Alert variant="danger">
                            {createJournalEntryRequest.request_data.error}
                        </Alert>
                    }
                    {totalComparison===false &&
                         <Alert variant="danger">
                             Total Debit amount and Credit amount must be equal
                         </Alert>
                    }
                </Modal.Body>
                
            </Modal>
        )
    }

    renderAllJournals =()=>{
        let getJournalEntriesRequest = this.props.getJournalEntries,
            createJournalEntryRequest = this.props.createJournalEntry,
            {CurrentPage, PageSize} = this.state;
        
        let saveRequestData= getJournalEntriesRequest.request_data!==undefined?getJournalEntriesRequest.request_data.tempData:null;
        
        switch(getJournalEntriesRequest.request_status){
            case (accountingConstants.GET_JOURNAL_ENTRY_PENDING):
                if(saveRequestData===undefined){
                    
                    return (
                        <div className="loading-content"> 
                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" 
                                        value={this.state.PageSize}
                                        className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Entry Id</th>
                                        <th>Transaction Id</th>
                                        <th>Booking Date (Entry Date)</th>
                                        <th>GL Account Name</th>
                                        <th>Debit Amount</th>
                                        <th>Credit Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
    
                                </tbody>
                            </TableComponent>
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                }else{
                    let getJournalData = (saveRequestData.result!==undefined)?saveRequestData.result:saveRequestData;
                    return(
                        <div>
                            {createJournalEntryRequest.request_status === accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS &&
                                <Alert variant="success">
                                    {createJournalEntryRequest.request_data.response.data.message}
                                </Alert>
                            }


                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" 
                                        onChange={this.setPagesize}
                                        value={this.state.PageSize}
                                        className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <div className="loading-text">Please wait... </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Entry Id</th>
                                        <th>Transaction Id</th>
                                        <th>Booking Date (Entry Date)</th>
                                        <th>GL Account Name</th>
                                        <th>Debit Amount</th>
                                        <th>Credit Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {getJournalData.map((eachJournal, key)=>{
                                    return(
                                        <tr key={key}>
                                            <td>{eachJournal.id}</td>
                                            <td>{eachJournal.transactionReference}</td>
                                            {/* <td>{getDateFromISO(eachJournal.bookingDate)}</td> */}
                                            <td>{eachJournal.bookingDate}</td>
                                            <td>{eachJournal.accountName}</td>
                                            <td>{eachJournal.debitAmount}</td>
                                            <td>{eachJournal.creditAmount}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </TableComponent>
                            
                        </div>
                    )
                }
                
            
            case (accountingConstants.GET_JOURNAL_ENTRY_SUCCESS):
                let JournalEntriesData = getJournalEntriesRequest.request_data.response.data;

                if(JournalEntriesData!==undefined){
                    if(JournalEntriesData.result.length>=1){
                        return(
                            <div>
                                <div className="heading-with-cta toleft">
                                   
                                    <Button
                                        onClick={this.state.show === false ? this.handleShow : null}
                                    >New Journal Entry</Button>
                                </div>
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            onChange={(e)=>this.setPagesize(e, JournalEntriesData)}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={JournalEntriesData.totalPages}
                                            currPage={JournalEntriesData.currentPage}
                                            currRecordsCount={JournalEntriesData.result.length}
                                            totalRows={JournalEntriesData.totalRows}
                                            tempData={JournalEntriesData.result}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Entry Id</th>
                                            <th>Transaction Id</th>
                                            <th>Booking Date (Entry Date)</th>
                                            <th>GL Account Name</th>
                                            <th>Debit Amount</th>
                                            <th>Credit Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {JournalEntriesData.result.map((eachJournal, key)=>{
                                        return(
                                            <tr key={key}>
                                                <td>{eachJournal.id}</td>
                                                <td>{eachJournal.transactionReference}</td>
                                                <td>{eachJournal.bookingDate}</td>
                                                {/* <td>{getDateFromISO(eachJournal.bookingDate)}</td> */}
                                                <td>{eachJournal.accountName}</td>
                                                <td>{eachJournal.debitAmount}</td>
                                                <td>{eachJournal.creditAmount}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </TableComponent>
                            </div>
                        )
                    }else{
                        return(
                            <div className="no-records">
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" className="countdropdown form-control form-control-sm">
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
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Entry Id</th>
                                            <th>Transaction Id</th>
                                            <th>Booking Date (Entry Date)</th>
                                            <th>GL Account Name</th>
                                            <th>Debit Amount</th>
                                            <th>Credit Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    </tbody>
                                </TableComponent>
                                <div className="footer-with-cta toleft">
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
                            <div>{getJournalEntriesRequest.request_data.error}</div>
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