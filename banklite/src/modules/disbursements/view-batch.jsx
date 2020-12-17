import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

import { history } from '../../_helpers/history';
import  TableComponent from '../../shared/elements/table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss"; 
import { numberWithCommas, getDateFromISO, allowNumbersOnly} from '../../shared/utils';
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal'
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert'


import DisbursementNav from './_menu'
import { disbursementActions } from '../../redux/actions/disbursment/disbursment.action';
import { disbursmentConstants } from '../../redux/actiontypes/disbursment/disbursment.constants'
class ViewADisbursmentBatch extends React.Component {
    constructor(props) {
        super(props);
        this.batchRef = this.props.match.params.batchRef;
        this.state={
            user:JSON.parse(localStorage.getItem('lingoAuth')),
            FullDetails:true,
            PageSize: 100,
            CurrentPage: 1,
            showActionConfirmation:false,
            showActionState:false,
            actionStateCta:"",
            batchComment:"",
            securityCode:""
        }
       
        this.userPermissions =  JSON.parse(localStorage.getItem("x-u-perm"));
    }

    componentDidMount() {
        this.loadInitialData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.batchRef !== this.props.match.params.batchRef) {
        
            this.batchRef = nextProps.match.params.batchRef;
        }

    }

    loadInitialData = ()=>{
        
        this.getADisbursementBatch(this.batchRef);
    }

    getADisbursementBatch = (batchRef)=>{
        const {dispatch} = this.props;

        dispatch(disbursementActions.getADisbursementBatch(batchRef));
    }

    performActionOnDisbursementBatch = async (batchActionPayload,action)=>{
        const {dispatch} = this.props;

        await dispatch(disbursementActions.performActionOnDisbursementBatch(batchActionPayload, action))
    }

    handleShowActionState = (securityCode, comment)=>{
        let{actionState} = this.state;
        if(actionState==="validate"){
            let batchActionPayload ={
                batchReference: this.batchRef
            }
            this.performActionOnDisbursementBatch(batchActionPayload,"validate")
                    .then(()=>{
                        setTimeout(() => {
                            
                            if(this.props.performActionOnDisbursementBatchReducer.request_status ===disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS){
                                this.handleCloseActionState();
                                this.loadInitialData()
                                const {dispatch} = this.props;
                                this.setState({securityCode:""})
                             dispatch(disbursementActions.performActionOnDisbursementBatch("CLEAR"))
                            }
                            
                        }, 3000);
                        
                    })
        }
        if(actionState==="confirm"){
            let batchActionPayload ={
                batchReference: this.batchRef,
                securityCode
            }
            this.performActionOnDisbursementBatch(batchActionPayload,"confirm")
                    .then(()=>{
                        setTimeout(() => {
                            
                            if(this.props.performActionOnDisbursementBatchReducer.request_status ===disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS){
                                this.handleCloseActionState();
                                this.handleCloseActionConfirmation()
                                this.loadInitialData()
                                const {dispatch} = this.props;
                            
                                dispatch(disbursementActions.performActionOnDisbursementBatch("CLEAR"))
                            }
                            
                        }, 4000);
                        
                    })
        }
        if(actionState!=="confirm" && actionState !=="validate"){
            let batchActionPayload ={
                batchReference: this.batchRef,
                securityCode,
                comment
            }
            // console.log("state odf batch is", actionState);

            this.performActionOnDisbursementBatch(batchActionPayload,actionState)
                    .then(()=>{
                        setTimeout(() => {
                            
                            if(this.props.performActionOnDisbursementBatchReducer.request_status ===disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS){
                                this.handleCloseActionState();
                                this.handleCloseActionConfirmation()
                                this.loadInitialData()
                                const {dispatch} = this.props;
                            
                                dispatch(disbursementActions.performActionOnDisbursementBatch("CLEAR"))
                            }
                            
                        }, 4000);
                        
                    })
        }
        if(actionState==="validate"){
            this.setState({showActionState:true, showActionConfirmation:false})
        }
    }
    handleCloseActionState = ()=>{
        let performActionOnDisbursementBatchRequest = this.props.performActionOnDisbursementBatchReducer;
        if(performActionOnDisbursementBatchRequest.is_request_processing ===false){
            this.setState({showActionState:false, actionState:""})
        }
    }

    handleShowActionConfirmation = (actionState,actionStateHeading,actionStateMsg,actionStateCta )=>{
        const {dispatch} = this.props;
                            
        dispatch(disbursementActions.performActionOnDisbursementBatch("CLEAR"))
        this.setState({actionState,actionStateHeading,actionStateCta,actionStateMsg, showActionConfirmation:true })
    }

    handleCloseActionConfirmation = ()=>{
        this.setState({showActionConfirmation:false })
    }

    renderActionConfirmation = ()=>{
        let {actionStateMsg,actionStateHeading, showActionConfirmation, actionState}= this.state;

        let processDisburmentValidationSchema;
        let performActionOnDisbursementBatchRequest = this.props.performActionOnDisbursementBatchReducer;
        if(actionState==="confirm"){
            processDisburmentValidationSchema = Yup.object().shape({
                securityCode: Yup.string()
                    .required('required'),
            })
        }
        
        if(actionState==="approvereview" || actionState==="rejectreview" 
            || actionState==="reject" || actionState==="approve"){
            processDisburmentValidationSchema = Yup.object().shape({
                securityCode: Yup.string()
                    .required('required'),
                actionComments: Yup.string()
            })
        }
        return(
            <Modal show={showActionConfirmation} onHide={this.handleCloseActionConfirmation} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>{actionStateHeading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {actionState==="validate" &&
                        <div className="text-center">
                            {actionStateMsg}
                        </div>
                    }
                    {actionState!=="validate" &&
                        <div>
                        <Formik
                            initialValues={{
                                securityCode: '',
                                actionComments: '',
                            }}
                            validationSchema={processDisburmentValidationSchema}
                            onSubmit={(values, { resetForm }) => {
                                
                               this.handleShowActionState(values.securityCode,values.actionComments )
                            }}
                        >
                            {({ handleSubmit,
                                handleChange,
                                handleBlur,
                                resetForm,
                                values,
                                setFieldValue,
                                setFieldTouched,
                                touched,
                                isValid,
                                errors, }) => (
                                    <Form noValidate
                                        onSubmit={handleSubmit}>

                                       
                                        
                                        {(actionState === "approvereview" || actionState === "rejectreview"
                                            || actionState === "reject" || actionState === "approve") &&
                                            <Form.Group controlId="actionComments">
                                                <Form.Label className="block-level">Comments</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows="2"
                                                    name="actionComments"
                                                    onChange={handleChange}
                                                    value={values.actionComments}
                                                    className={errors.actionComments && touched.actionComments ? "is-invalid" : null} />

                                                {errors.actionComments && touched.actionComments ? (
                                                    <span className="invalid-feedback">{errors.actionComments}</span>
                                                ) : null}
                                            </Form.Group>
                                        }
                                        <Form.Group controlId="securityCode">
                                            <Form.Label className="block-level">Security Code </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="securityCode"
                                                maxLength="6"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={allowNumbersOnly(values.securityCode, 6)}
                                                className={errors.securityCode && touched.securityCode ? "is-invalid withcustom" : "withcustom"} />

                                            {errors.securityCode && touched.securityCode ? (
                                                <span className="invalid-feedback">{errors.securityCode}</span>
                                            ) : null}
                                        </Form.Group>
                                        
                                        {performActionOnDisbursementBatchRequest.request_status === disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_FAILURE &&
                                            <Alert variant="danger">
                                                {performActionOnDisbursementBatchRequest.request_data.error}
                                            </Alert>
                                        }
                                        {performActionOnDisbursementBatchRequest.request_status === disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS &&
                                            <Alert variant="success">
                                                {
                                                    this.props.performActionOnDisbursementBatchReducer.request_data.response.data.totalAmount !==undefined &&
                                                
                                                    <div>
                                                        Total amount in batch : {this.props.performActionOnDisbursementBatchReducer.request_data.response.data.totalAmount}
                                                    </div>
                                                }

                                                { this.props.performActionOnDisbursementBatchReducer.request_data.response.data.totalFees !==undefined &&
                                                    <div>
                                                        Total Fee : {this.props.performActionOnDisbursementBatchReducer.request_data.response.data.totalFees}
                                                    
                                                    </div>
                                                }

                                                { this.props.performActionOnDisbursementBatchReducer.request_data.response.data.message !==undefined &&
                                                    <div>
                                                       {this.props.performActionOnDisbursementBatchReducer.request_data.response.data.message}
                                                    
                                                    </div>
                                                }


                                            </Alert>
                                        }




                                        { performActionOnDisbursementBatchRequest.request_status !== disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS &&
                                            <div className="footer-with-cta toleft">
                                                <Button
                                                    variant="secondary"
                                                    type="button"
                                                    disabled={performActionOnDisbursementBatchRequest.is_request_processing}
                                                    onClick={this.handleCloseActionConfirmation}
                                                >
                                                    Cancel
                                                </Button>

                                                <Button
                                                    variant="success"
                                                    disabled={performActionOnDisbursementBatchRequest.is_request_processing}
                                                    type="submit"
                                                >
                                                    Proceed
                                                </Button>
                                            </div>
                                        }

                                    </Form>
                                )}
                        </Formik>
                            {/* <Form.Group >
                                                                        
                                <Form.Label className="block-level">Security Code</Form.Label>
                                <Form.Control type="password"
                                    name="securityCode"
                                    onChange={(e)=>this.setState({securityCode: e.target.value})}
                                    placeholder="Enter your security code"
                                    value={allowNumbersOnly(securityCode)}
                                    // className={errors.securityCode && touched.securityCode ? "is-invalid" : null}
                                    required />
                                
                                
                            </Form.Group>
                            <Form.Group >
                                                                        
                                <Form.Label className="block-level">Comment</Form.Label>
                                <Form.Control 
                                    as="textarea"
                                    name="actionComment"
                                    rows="2"
                                    onChange={(e)=>this.setState({securityCode: e.target.value})}
                                    placeholder="Enter your security code"
                                    value={allowNumbersOnly(securityCode)}
                                    // className={errors.securityCode && touched.securityCode ? "is-invalid" : null}
                                    required />
                                
                                
                            </Form.Group> */}
                        </div>
                    }
                    
                </Modal.Body>
                {actionState==="validate" &&
                    <Modal.Footer>

                        <Button 
                            variant="secondary"
                            type="button"
                            onClick={this.handleCloseActionConfirmation}
                        >
                            Cancel
                            
                            
                        </Button>
                        <Button 
                            variant="success"
                            type="button"
                            onClick={this.handleShowActionState}
                        >
                            Yes
                            
                            
                        </Button>

                    </Modal.Footer>
                }
            </Modal>
        )
    }

    renderActionStatus = ()=>{
        let {actionStateHeading, actionState, showActionState, actionStateCta}= this.state;
        let performActionOnDisbursementBatchRequest = this.props.performActionOnDisbursementBatchReducer;
        return(
            <Modal show={showActionState} onHide={this.handleCloseActionState} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>{actionStateHeading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(actionState==="validate" &&  performActionOnDisbursementBatchRequest.is_request_processing ===true) &&
                            <div className="text-center">
                                Please wait...
                            </div>
                    }
                    {performActionOnDisbursementBatchRequest.request_status === disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_FAILURE &&
                        <Alert variant="danger">
                            {performActionOnDisbursementBatchRequest.request_data.error}
                        </Alert>
                    }
                    {performActionOnDisbursementBatchRequest.request_status === disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS &&
                        <Alert variant="success">
                            <div>
                                Total amount in batch : {this.props.performActionOnDisbursementBatchReducer.request_data.response.data.totalAmount}
                            </div>
                            <div>
                                Total Fee : {this.props.performActionOnDisbursementBatchReducer.request_data.response.data.totalFees}
                                {/* Total Fee : {postDisbursementRequest.request_data.response.data.totalFees} */}
                            </div>


                        </Alert>
                    }
                    
                </Modal.Body>
                {performActionOnDisbursementBatchRequest.is_request_processing !==true &&
                    <Modal.Footer>

                        <Button 
                            variant="secondary"
                            type="button"
                            onClick={this.handleCloseActionState}
                        >
                            Cancel
                            
                            
                        </Button>
                        {actionState==="validate" &&
                            <Button 
                                variant="success"
                                type="button"
                                onClick={this.handleCloseActionState}
                            >
                                {actionStateCta!==""? actionStateCta : "Okay"}
                                
                                
                            </Button>
                        }
                        {(actionState!=="validate" && performActionOnDisbursementBatchRequest.request_status !== disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS) &&
                            <Button 
                                variant="success"
                                type="submit"
                            >
                                {actionStateCta!==""? actionStateCta : "Proceed"}
                                
                                
                            </Button>
                        }
                        {(actionState!=="validate" && performActionOnDisbursementBatchRequest.request_status === disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS) &&
                            <Button 
                                variant="success"
                                type="button"
                                onClick={this.handleCloseActionState}
                            >
                                {actionStateCta!==""? actionStateCta : "Okay"}
                                
                                
                            </Button>
                        }

                    </Modal.Footer>
                }
            </Modal>
        )
    }

    clearDeleteData = ()=>{
        const {dispatch} = this.props;

        dispatch(disbursementActions.deleteADisbursement("CLEAR"));
    }

    handleCloseDelete = () =>{
        let deleteADisbursementRequest = this.props.deleteADisbursementReducer;
        if(deleteADisbursementRequest.request_status !== disbursmentConstants.DELETE_A_BATCH_PENDING){
            this.setState({confirmDeleteBatch:false})
        }
    }
    handleShowDelete = ()=>{
        this.clearDeleteData();
        this.setState({confirmDeleteBatch:true})
    }

    deleteABatch = async (batchInfo) => {
        const { dispatch } = this.props;

        await dispatch(disbursementActions.deleteADisbursement(batchInfo));
    }

    performDeletion = (batchInfo)=>{
        this.deleteABatch(batchInfo)
                .then(()=>{
                    setTimeout(() => {
                        if (this.props.deleteADisbursementReducer.request_status === disbursmentConstants.DELETE_A_BATCH_SUCCESS) {
                            this.clearDeleteData();
                            this.setState({securityCode:""})
                            this.handleCloseDelete();
                            history.push("/disbursements/initiated")
                            // this.loadInitialData();
                        }
                    }, 2000);
                    
                })
    }

    deleteABatchConfirm = () =>{
        let {confirmDeleteBatch, batchToDelete, securityCode, batchIdToDelete} = this.state;
        let deleteADisbursementRequest = this.props.deleteADisbursementReducer;
        
        
        return(
            <Modal show={confirmDeleteBatch} onHide={this.handleCloseDelete}  size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                <Modal.Header>
                    Delete Batch 
                </Modal.Header>
                <Modal.Body>
                    
                    
                    {deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_PENDING && 
                        <div className="text-center ">
                            Deleting Batch - {batchIdToDelete}
                            
                        </div>
                    }
                    {(deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_RESET 
                        || deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_FAILURE) &&
                            <Form.Group >
                                                                    
                                <Form.Label className="block-level">Security Code</Form.Label>
                                <Form.Control type="password"
                                    name="securityCode"
                                    onChange={(e)=>this.setState({securityCode: e.target.value})}
                                    placeholder="Enter your security code"
                                    value={allowNumbersOnly(securityCode)}
                                    // className={errors.securityCode && touched.securityCode ? "is-invalid" : null}
                                    required />
                                
                                
                            </Form.Group>
                    }
                    {deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_FAILURE && 
                        <div className="text-center errortxt">
                            {deleteADisbursementRequest.request_data.error}
                        </div>
                    }
                    {deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_SUCCESS && 
                       <div className="text-center">
                           {deleteADisbursementRequest.request_data.response.data.message}
                        </div>
                    }
                </Modal.Body>
                {(deleteADisbursementRequest.request_status !== disbursmentConstants.DELETE_A_BATCH_SUCCESS) && 
                    <Modal.Footer>
                        <div className="footer-with-cta toleft">
                            <Button 
                                variant="secondary"
                                type="button"
                                onClick={this.handleCloseDelete}
                                disabled={deleteADisbursementRequest.is_request_processing}
                            >
                                Cancel
                                
                                
                            </Button>
                            
                            <Button 
                                variant="success"
                                type="submit"
                                disabled={deleteADisbursementRequest.is_request_processing}
                                onClick={()=>{ 
                                    if(securityCode!==""){
                                        let payload={
                                            batchReference: batchToDelete,
                                            securityCode: securityCode.replace(/\D/g, '')
                                        }
                                        this.performDeletion(payload)
                                    }
                                    
                                }}
                            >
                                Confirm Delete
                                
                                
                            </Button>
                        </div>

                    </Modal.Footer>
                }
                {(deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_SUCCESS ) && 
                    <Modal.Footer>

                        
                        <Button 
                            variant="success"
                            type="button"
                            onClick={this.handleCloseDelete}
                        >
                            Okay
                            
                            
                        </Button>

                    </Modal.Footer>
                }
            </Modal>
        )
    }


    

    renderHeadingCtas =()=>{
        let allUSerPermissions =[];
        let getADisbursementBatchRequest = this.props.getADisbursementBatchReducer;
        let batchDetails = getADisbursementBatchRequest.request_data.response.data.batchInfo;
        this.userPermissions.map(eachPermission=>{
            allUSerPermissions.push(eachPermission.permissionCode)
        })
        return(
            <div className="ctas-wrap">
                <div className="heading-ctas">
                    <ul className="nav">
                        
                        {   (allUSerPermissions.indexOf("bnk_review_disbursements") >-1 && batchDetails.batchStatus!==5 && batchDetails.batchStatus!==6 && batchDetails.batchStatus!==7) &&
                            <li>
                                <DropdownButton
                                    size="sm"
                                    title="Perform Batch Action"
                                    key="inActiveCurrency"
                                    className="customone"
                                    alignRight
                                >
                                    {(allUSerPermissions.indexOf("bnk_initiate_disbursements") >-1 && batchDetails.batchStatus===0) &&
                                        <Dropdown.Item eventKey="1" 
                                        onClick={()=>
                                            this.handleShowActionConfirmation("validate",
                                                                                `Validate Batch - ${batchDetails.id}`,
                                                                                `Please confirm that you want to validate Batch - ${batchDetails.id}`,
                                                                                ""
                                                                                )       
                                        } >Validate Batch</Dropdown.Item>
                                    }
                                    {(allUSerPermissions.indexOf("bnk_initiate_disbursements") >-1 && batchDetails.batchStatus===0) &&
                                        <Dropdown.Item eventKey="1" 
                                                onClick={()=>{
                                                    this.handleShowDelete();
                                                    this.setState({batchToDelete:batchDetails.batchReference, batchIdToDelete:batchDetails.id})}}
                                        >Delete Batch</Dropdown.Item>
                                    }
                                    {(allUSerPermissions.indexOf("bnk_initiate_disbursements") >-1 && batchDetails.batchStatus===1) &&
                                        <Dropdown.Item eventKey="1"
                                                        onClick={()=>
                                                            this.handleShowActionConfirmation("confirm",
                                                                                                `Request approval for Batch - ${batchDetails.id}`,
                                                                                                `Please confirm that you want to request approval for Batch - ${batchDetails.id}`,
                                                                                                ""
                                                                                                )       
                                                        } 
                                        >Request Approval</Dropdown.Item>
                                    }
                                    {(allUSerPermissions.indexOf("bnk_review_disbursements") >-1 && batchDetails.batchStatus===2) &&
                                        <Dropdown.Item eventKey="1"
                                                        onClick={()=>
                                                            this.handleShowActionConfirmation("approvereview",
                                                                                                `Approve review for Batch - ${batchDetails.id}`,
                                                                                                `Please confirm that you want to approve review for Batch - ${batchDetails.id}`,
                                                                                                ""
                                                                                                )       
                                                        } 
                                                    >Approve review</Dropdown.Item>
                                    }
                                    {(allUSerPermissions.indexOf("bnk_review_disbursements") >-1 && batchDetails.batchStatus===2) &&
                                        <Dropdown.Item eventKey="1" 
                                                        onClick={()=>
                                                            this.handleShowActionConfirmation("rejectreview",
                                                                                                `Reject review for Batch - ${batchDetails.id}`,
                                                                                                `Please confirm that you want to reject review for Batch - ${batchDetails.id}`,
                                                                                                ""
                                                                                                )       
                                                        } 
                                        >Reject review</Dropdown.Item>
                                    }
                                    {(allUSerPermissions.indexOf("bnk_approve_disburmsements") >-1 && batchDetails.batchStatus===4) &&
                                        <Dropdown.Item eventKey="1" 
                                                        onClick={()=>
                                                            this.handleShowActionConfirmation("approve",
                                                                                                `Approve Batch - ${batchDetails.id}`,
                                                                                                `Please confirm that you want to approve disburment for Batch - ${batchDetails.id}`,
                                                                                                ""
                                                                                                )       
                                                        } 
                                        >Approve Batch</Dropdown.Item>
                                    }
                                    {(allUSerPermissions.indexOf("bnk_approve_disburmsements") >-1 && batchDetails.batchStatus===4) &&
                                        <Dropdown.Item eventKey="1" 
                                                        onClick={()=>
                                                            this.handleShowActionConfirmation("reject",
                                                                                                `Reject Batch - ${batchDetails.id}`,
                                                                                                `Please confirm that you want to reject disburment for Batch - ${batchDetails.id}`,
                                                                                                ""
                                                                                                )       
                                                        }
                                        >Reject Batch</Dropdown.Item>
                                    }
                                    
                                    
                                </DropdownButton>
                            </li>
                        }
                        
                        
                        
                        
                    </ul>
                </div>
            </div>
        )
    }

    

    renderBatchInfo = ()=>{
        let getADisbursementBatchRequest = this.props.getADisbursementBatchReducer;
            let {showActionConfirmation, showActionState, confirmDeleteBatch} = this.state;

            if(getADisbursementBatchRequest.request_status===disbursmentConstants.GET_A_DISBURSMENT_BATCH_SUCCESS){

                    let batchDetails = getADisbursementBatchRequest.request_data.response.data;

                    
                    return(
                        <div className="row">
                            {this.renderHeadingCtas()}
                            <div className="col-sm-12">
                                <div className="middle-content">
                                    <div className="row">
                                        <div className="col-sm-12">
                                        {confirmDeleteBatch && this.deleteABatchConfirm()}
                                            {showActionConfirmation && this.renderActionConfirmation()}
                                            {showActionState && this.renderActionStatus()}
                                            <div className="main-details mt-20">
                                                <div className="overview-wrap profile-overview">
                                                    <div className="each-overview">
                                                        
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>
                                                                <tr>
                                                                    <td>Batch ID</td>
                                                                    <td>{batchDetails.batchInfo.id}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total records</td>
                                                                    <td>{batchDetails.disbursementItems.length}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Initiated by</td>
                                                                    <td>{batchDetails.batchInfo.initiatedBy}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Approved by</td>
                                                                    <td>{batchDetails.batchInfo.approvedBy}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Amount</td>
                                                                    <td>{numberWithCommas(batchDetails.batchInfo.totalAmount, true, true)}</td>
                                                                </tr>
                                                                
                                                                

                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                    <div className="each-overview">
                                                        
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>
                                                                
                                                                <tr>
                                                                    <td>Batch Description</td>
                                                                    <td>{batchDetails.batchInfo.batchDescription}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Batch Status</td>
                                                                    <td>{batchDetails.batchInfo.batchStatusDescription}</td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                    <td>Date Initiated</td>
                                                                    <td>{getDateFromISO(batchDetails.batchInfo.dateInitiated, true)}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Last Updated</td>
                                                                    <td>{getDateFromISO(batchDetails.batchInfo.lastUpdated, true)}</td>
                                                                </tr>
                                                                

                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                    
                                                   
                                                    
                                                </div>
                                            </div>
                                            <div className="main-details">
                                                
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Account Number</th>
                                                            <th>Bank Name</th>
                                                            <th>Bank Code</th>
                                                            <th>Recipient Name</th>
                                                            <th>Amount</th>
                                                            <th>Remarks</th>
                                                            <th>Response Message</th>
                                                            {/* <th>Disbursment Status</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {batchDetails.disbursementItems!==null && (batchDetails.disbursementItems.length>=1) &&
                                                            batchDetails.disbursementItems.map((eachAccount, index)=>{
                                                               
                                                                    return(
                                                                        <tr key={index}>
                                                                            <td>{eachAccount.accountNumber}</td>
                                                                            <td>{eachAccount.destinationBank}</td>
                                                                            <td>{eachAccount.destinationBankCode}</td>
                                                                            <td>{eachAccount.recipientName}</td>
                                                                            <td>{numberWithCommas(eachAccount.amount, true, true)}</td>
                                                                            <td>{eachAccount.remarks}</td>
                                                                            <td>{eachAccount.responseMessage}</td>
                                                                        </tr>
                                                                    ) 
                                                                
                                                            })
                                                        }


                                                       
                                                    </tbody>
                                                </TableComponent>
                                            </div>
                                        </div>
                                       
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
            }
    }

    renderBatchBrief = ()=>{
        let getADisbursementBatchRequest = this.props.getADisbursementBatchReducer;
        let batchDetails = getADisbursementBatchRequest.request_data.response.data;
        
        return(
            <div>
                <div className="module-title">
                    
                    <div className="content-container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="">
                                    <h2>Partial Application</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="module-submenu">
                    <div className="content-container">
                        <DisbursementNav />
                    </div>
                </div>
            </div>
            
        )
    }

    renderPage = ()=>{
        let getADisbursementBatchRequest = this.props.getADisbursementBatchReducer;
        if(getADisbursementBatchRequest.request_status===disbursmentConstants.GET_A_DISBURSMENT_BATCH_PENDING){
            return (
                <div className="loading-content">
                    <div className="loading-text">Please wait... </div>
                </div>
            )
        }
        if(getADisbursementBatchRequest.request_status===disbursmentConstants.GET_A_DISBURSMENT_BATCH_SUCCESS){
            return(
                <div>
                     {this.renderBatchBrief()}
                    <div className="content-container">

                        {this.renderBatchInfo()}
                    </div>
                </div>
            )
        }

        if(getADisbursementBatchRequest.request_status===disbursmentConstants.GET_A_DISBURSMENT_BATCH_FAILURE){
            return(
                <div className="loading-content errormsg"> 
                    <div>
                        {getADisbursementBatchRequest.request_data.error}
                    </div>
                </div>
            )
        }
    }
    

    render() {
        
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        {/* <CustomerHeading {...this.props}/> */}
                        <div className="module-content">
                           {this.renderPage()}
                        </div>
                    </div>
                </InnerPageContainer>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        getAClientReducer: state.clientsReducers.getAClientReducer,
        postNewDisbursementBatchReducer: state.disbursmentReducers.postNewDisbursementBatchReducer,
        getADisbursementBatchReducer: state.disbursmentReducers.getADisbursementBatchReducer,
        performActionOnDisbursementBatchReducer: state.disbursmentReducers.performActionOnDisbursementBatchReducer,
        deleteADisbursementReducer : state.disbursmentReducers.deleteADisbursementReducer,
    };
}

export default connect(mapStateToProps)(ViewADisbursmentBatch);