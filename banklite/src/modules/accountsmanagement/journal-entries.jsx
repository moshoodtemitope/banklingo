import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';

import Modal from 'react-bootstrap/Modal'

// import DatePicker from "react-datepicker";
import DatePicker from '../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

import  DatePickerEx from "react-datepicker";

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
import AccountingNav from './_menu'

class JournalEntries extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            show:false,
            CurrentPage: 1,
            PageSize: 25,
            totalComparison:null,
            endDate: "",
            startDate: "",
            SearchText:""
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
         },
         {CurrentPage,PageSize, BranchId,startDate, endDate, SearchText} = this.state;

         let params= `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
         if(tempData){
            dispatch(acoountingActions.getJournalEntries(params, tempData));
            // dispatch(acoountingActions.getJournalEntries(payload, tempData));
         }else{
            dispatch(acoountingActions.getJournalEntries(params));
            // dispatch(acoountingActions.getJournalEntries(payload));
         }
         
     }

    exportJournalEntries = (tempData) => {
        const { dispatch } = this.props;
        let
            { CurrentPage, PageSize, startDate, endDate, SearchText } = this.state;
        if(endDate!==""){
            endDate = endDate.toISOString()
        }
        if(startDate!==""){
            startDate = startDate.toISOString()
        }
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

        dispatch(acoountingActions.exportJournalEntries(params));


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

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        
        this.setState({ startDate }, ()=>{
            if(this.state.endDate!==""){
                //this.getHistory();
            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
       
        this.setState({ endDate }, ()=>{
                if(this.state.startDate!==""){
                    //this.getHistory();
                }
        });
    }

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        let sizeOfPage = PageSize.target.value,
            {CurrentPage, BranchId,startDate, endDate, SearchText} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
        // this.getJournalEntries(params);
        let getJournalEntriesRequest = this.props.getJournalEntries;
        let saveRequestData= getJournalEntriesRequest.request_data!==undefined?getJournalEntriesRequest.request_data.tempData:null;
        // this.getJournalEntries(saveRequestData);

        const {dispatch} = this.props;
        // let params= `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;
        //  let payload ={
        //      PageSize: sizeOfPage,
        //      CurrentPage:this.state.CurrentPage
        //  }
         if(tempData){
            dispatch(acoountingActions.getJournalEntries(params, tempData));
            // dispatch(acoountingActions.getJournalEntries(payload, tempData));
         }else{
            dispatch(acoountingActions.getJournalEntries(params));
            // dispatch(acoountingActions.getJournalEntries(payload));
         }
    }

    loadNextPage = (nextPage, tempData)=>{
        // console.log("dsdsd", nextPage);
        const {dispatch} = this.props;
        let {PageSize, startDate, endDate, SearchText} = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
        // this.getTransactionChannels(params);
        
        let payload ={
            PageSize: this.state.PageSize,
            CurrentPage:nextPage
        }

        if(tempData){
            dispatch(acoountingActions.getJournalEntries(params,tempData));
            // dispatch(acoountingActions.getJournalEntries(payload,tempData));
        }else{
            dispatch(acoountingActions.getJournalEntries(params));
            // dispatch(acoountingActions.getJournalEntries(payload));
        }
    }

    searchTxtn = (e,tempData)=>{
        e.preventDefault()
        const {dispatch} = this.props;
        let {PageSize,CurrentPage, SearchText, endDate, startDate} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        if(SearchText!=="" || endDate!=="" || startDate!==""){
            if(endDate!==""){
                endDate = endDate.toISOString()
            }
            if(startDate!==""){
                startDate = startDate.toISOString()
            }
            let params= `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

            if(tempData){
                dispatch(acoountingActions.getJournalEntries(params,tempData));
            }else{
                dispatch(acoountingActions.getJournalEntries(params));
            }
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
        // console.log('dsdsds', values.entryNotes.length);
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
                                        console.log("each credit value",eachEntry.entryAmount);
                                        creditTotal+=parseFloat(eachEntry.entryAmount.replace(/,/g, ''));
                                    }else{
                                        console.log("each debit value",eachEntry.entryAmount);
                                        debitTotal +=parseFloat(eachEntry.entryAmount.replace(/,/g, ''));
                                    }
                                    jornalEntryModel.push({
                                                    glAccountId: eachEntry.glAcountlId,
                                                    amount: parseFloat(eachEntry.entryAmount.replace(/,/g, '')),
                                                    journalEntryType: eachEntry.entryTypeId,
                                                    branchId: eachEntry.branchId,
                                                })
                                })

                                if(creditTotal!==debitTotal){
                                    // console.log("Credit total",creditTotal);
                                    // console.log("Debit total",debitTotal);
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
                                                    this.props.dispatch(acoountingActions.createJournalEntry("CLEAR"))
                                                    
                                                    
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
                                        onChange={null}
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
                                        <th>GL Code</th>
                                        <th>Debit Amount (&#8358;)</th>
                                        <th>Credit Amount (&#8358;)</th>
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
                                <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, saveRequestData)} >

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="table-filters">
                                        <DatePickerEx
                                            onChangeRaw={this.handleDateChangeRaw}
                                            onChange={this.handleStartDatePicker}
                                            selected={this.state.startDate}
                                            dateFormat="d MMMM, yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            placeholderText="Start date"
                                            maxDate={new Date()}
                                            // className="form-control form-control-sm h-38px"
                                            className="form-control form-control-sm "

                                        />
                                        <DatePickerEx placeholderText="End  date"
                                            onChangeRaw={this.handleDateChangeRaw}
                                            onChange={this.handleEndDatePicker}
                                            selected={this.state.endDate}
                                            dateFormat="d MMMM, yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            maxDate={new Date()}
                                            // className="form-control form-control-sm h-38px"
                                            className="form-control form-control-sm"

                                        />
                                        <input type="text"
                                            className="form-control-sm search-table form-control"
                                            placeholder="Search text"
                                            value={this.state.SearchText}
                                            onChange={(e) => {
                                                this.setState({ SearchText: e.target.value.trim() })
                                            }}
                                        />
                                        {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" 
                                        onChange={(e)=>this.setPagesize(e, getJournalData)}
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
                                        <th>GL Code</th>
                                        <th>Debit Amount (&#8358;)</th>
                                        <th>Credit Amount (&#8358;)</th>
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
                                            <td>{eachJournal.glCode}</td>
                                            <td>{numberWithCommas(eachJournal.debitAmount, true, true)}</td>
                                            <td>{numberWithCommas(eachJournal.creditAmount, true, true)}</td>
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
                                    <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, JournalEntriesData.result)} >

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="table-filters">
                                            <DatePickerEx
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleStartDatePicker}
                                                selected={this.state.startDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="Start date"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm "

                                            />
                                            <DatePickerEx placeholderText="End  date"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleEndDatePicker}
                                                selected={this.state.endDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm"

                                            />
                                            <input type="text"
                                                className="form-control-sm search-table form-control"
                                                placeholder="Search text"
                                                value={this.state.SearchText}
                                                onChange={(e) => {
                                                    this.setState({ SearchText: e.target.value.trim() })
                                                }}
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                        <div className="actions-wrap">
                                            <Button onClick={this.exportJournalEntries} className="action-icon" variant="outline-secondary" type="button">
                                                <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            onChange={(e)=>this.setPagesize(e, JournalEntriesData)}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="3">3</option>
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
                                            <th>GL Code</th>
                                            <th>Debit Amount (&#8358;)</th>
                                            <th>Credit Amount (&#8358;)</th>
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
                                                <td>{eachJournal.glCode}</td>
                                                <td>{numberWithCommas(eachJournal.debitAmount, true, true)}</td>
                                                <td>{numberWithCommas(eachJournal.creditAmount, true, true)}</td>
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
                                    <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, JournalEntriesData.result)} >

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="table-filters">
                                            <DatePickerEx
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleStartDatePicker}
                                                selected={this.state.startDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="Start date"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm "

                                            />
                                            <DatePickerEx placeholderText="End  date"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleEndDatePicker}
                                                selected={this.state.endDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm"

                                            />
                                            <input type="text"
                                                className="form-control-sm search-table form-control"
                                                placeholder="Search text"
                                                value={this.state.SearchText}
                                                onChange={(e) => {
                                                    this.setState({ SearchText: e.target.value.trim() })
                                                }}
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" className="countdropdown form-control form-control-sm">
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
                                            <th>GL Code</th>
                                            <th>Debit Amount (&#8358;)</th>
                                            <th>Credit Amount (&#8358;)</th>
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
                                    <AccountingNav />
                                    {/* <ul className="nav">
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
                                            <NavLink to={'/journals'}>Journal Entries</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/accounts'}>Charts of Accounts</NavLink>
                                        </li>
                                    </ul> */}
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