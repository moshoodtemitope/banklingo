import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// // import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import { numberWithCommas, getDateFromISO} from '../../shared/utils';

import { Formik } from 'formik';
import * as Yup from 'yup';

import "./customerprofile.scss"; 

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
class ViewCustomerComments extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:'',
            PageSize: 200,
            CurrentPage: 1,
            showAddComment:false
        }
        
       
    }

    componentDidMount(){
        this.loadInitialCustomerData()
    }

    loadInitialCustomerData = ()=>{
        let { PageSize, CurrentPage } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        this.getAClientComments(this.clientEncodedKey, params);
        
    }

    handleAddCustomerComments = async (addCommentsPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(clientsActions.creatAClientComment(addCommentsPayload));
    } 

    handleCommentsBoxClose = () => this.setState({showAddComment:false});
    handleCommentsBoxShow = () => this.setState({showAddComment:true});

    getAClientComments = (clientEncodedKey , params)=>{
        const { dispatch } = this.props;

        dispatch(clientsActions.getAClientComments(clientEncodedKey,params));
    }

    setPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;

        let {CurrentPage,} = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;
        // this.getLoans(params);

        if(tempData){
            dispatch(clientsActions.getAClientComments(this.clientEncodedKey,params, tempData));
            
        }else{
            dispatch(clientsActions.getAClientComments(this.clientEncodedKey,params));
        }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        
        let params= `PageSize=${PageSize}&CurrentPage=${nextPage}`;

        if(tempData){
            dispatch(clientsActions.getAClientComments(this.clientEncodedKey,params, tempData));
        }else{
            dispatch(clientsActions.getAClientComments(this.clientEncodedKey,params));
        }
    }

    renderCommentsWrap =()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){

                    return(
                        <div>
                            {this.renderClientComments()}
                        </div>
                    )
                    
                }
    }

    renderClientComments=()=>{
        let getAClientCommentsRequest =  this.props.getAClientCommentsReducer;

        let saveRequestData= getAClientCommentsRequest.request_data!==undefined?getAClientCommentsRequest.request_data.tempData:null;
        if(getAClientCommentsRequest.request_status===clientsConstants.GET_A_CLIENT_COMMENTS_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div className="loading-content">
                         {this.addNewCommentBox()}
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

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
                        <TableComponent classnames="striped bordered hover ">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td></td> */}
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleCommentsBoxShow}>New Comment</Button>
                        </div>
                        
                    </div>
                )
            }else{
                return(
                    <div>
                        {this.addNewCommentBox()}
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

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
                        <TableComponent classnames="striped bordered hover ">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   saveRequestData.map((eachComments, index)=>{
                                        return(
                                            <tr key={index}>
                                                {/* <td>{eachComments.id} </td> */}
                                                <td>{eachComments.comment} </td>
                                                <td>{getDateFromISO(eachComments.timeStamp)} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                        </div>
                    </div>
                )
            }
        }

        if(getAClientCommentsRequest.request_status===clientsConstants.GET_A_CLIENT_COMMENTS_SUCCESS){
            let getAClientCommentsData = getAClientCommentsRequest.request_data.response.data.result;

            if(getAClientCommentsData.length>=1){


                return(
                    <div>
                        {this.addNewCommentBox()}
                        <div className="heading-with-cta ">
                        <Form className="one-liner">

                        </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setPagesize(e, getAClientCommentsData)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getAClientCommentsData.totalPages}
                                    currPage={getAClientCommentsData.currentPage}
                                    currRecordsCount={getAClientCommentsData.length}
                                    totalRows={getAClientCommentsData.totalRows}
                                    tempData={getAClientCommentsData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.loadNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover ">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   getAClientCommentsData.map((eachComments, index)=>{
                                        return(
                                            <tr key={index}>
                                                {/* <td>{eachComments.id} </td> */}
                                                <td>{eachComments.comment} </td>
                                                <td>{getDateFromISO(eachComments.timeStamp)} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                        </div>
                    </div>
                )
            }else{

                return(
                    <div className="no-records">
                        {this.addNewCommentBox()}
                        <div className="heading-with-cta ">
                        <Form className="one-liner">

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
                        <TableComponent classnames="striped bordered hover w-65">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td></td> */}
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                        </div>
                    </div>
                )
            }

        }

        if(getAClientCommentsRequest.request_status===clientsConstants.GET_A_CLIENT_COMMENTS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientCommentsRequest.request_data.error}</div>
            </div>
            )
        }
    }

    addNewCommentBox = ()=>{
        const {showAddComment} = this.state;
        let  createAClientCommentRequest = this.props.createAClientCommentReducer;
        let addCustomerCommentsValidationSchema = Yup.object().shape({
                comment:  Yup.string()
                    .required('Required'),
            
           });
        return(
            <Modal show={showAddComment} onHide={this.handleCommentsBoxClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Formik
                    initialValues={{
                        comment:""
                    }}

                    validationSchema={addCustomerCommentsValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let addCustomerCommentsPayload = {
                            comment:values.comment,
                            clientEncodedKey:this.clientEncodedKey
                        }




                        this.handleAddCustomerComments(addCustomerCommentsPayload)
                            .then(
                                () => {

                                    if (this.props.createAClientCommentReducer.request_status === clientsConstants.CREATE_A_CLIENT_COMMENT_SUCCESS) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(clientsActions.creatAClientComment("CLEAR"))
                                            this.handleCommentsBoxClose();
                                            this.loadInitialCustomerData();
                                        }, 3000);
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
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                                className="">
                                <Modal.Header>
                                    <Modal.Title>Add comment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group >
                                        <Form.Label className="block-level">Comments</Form.Label>
                                        <Form.Control as="textarea"
                                            rows="3"
                                            onChange={handleChange}
                                            name="comment"
                                            value={values.comment}
                                            className={errors.comment && touched.comment ? "is-invalid form-control form-control-sm" : null} />

                                        {errors.comment && touched.comment ? (
                                            <span className="invalid-feedback">{errors.comment}</span>
                                        ) : null}
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>

                                    <Button variant="light" onClick={this.handleCommentsBoxClose}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="success"
                                        type="submit"
                                        disabled={createAClientCommentRequest.is_request_processing}
                                    >
                                        {createAClientCommentRequest.is_request_processing?"Please wait...":"Save Comment"}
                                        
                                    </Button>

                                </Modal.Footer>

                                {createAClientCommentRequest.request_status === clientsConstants.CREATE_A_CLIENT_COMMENT_SUCCESS && 
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {createAClientCommentRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {createAClientCommentRequest.request_status === clientsConstants.CREATE_A_CLIENT_COMMENT_FAILURE && 
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {createAClientCommentRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        )}
                </Formik>

                
            </Modal>
        )
    }
    
    

    render() {
        return (
            <Fragment>
                
                    <div className="content-wrapper">
                       
                        {/* <CustomerHeading {...this.props}/> */}
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            {this.renderCommentsWrap()}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        getAClientCommentsReducer: state.clientsReducers.getAClientCommentsReducer,
        createAClientCommentReducer: state.clientsReducers.createAClientCommentReducer,
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps) (ViewCustomerComments);