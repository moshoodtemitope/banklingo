import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// // import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import { Formik } from 'formik';
import * as Yup from 'yup';
import { getDateFromISO} from '../../shared/utils';
import { routes} from '../../services/urls';
import "./customerprofile.scss"; 
import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'

class ViewCustomerAttachments extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:'',
            PageSize: 200,
            CurrentPage: 1,
            showAddAttachment:false,
            filename:null,
            docuploaded:'',
            isDocAdded: null
        }

       
    }

    componentDidMount(){
        this.loadInitialCustomerData()
    }

    loadInitialCustomerData = ()=>{
        let { PageSize, CurrentPage } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        this.getAClientAttachments(this.clientEncodedKey, params);
        
    }

    handleAttachmentBoxClose = () => this.setState({showAddAttachment:false});
    handleAttachmentBoxShow = () => this.setState({showAddAttachment:true});

    getAClientAttachments = (clientEncodedKey , params)=>{
        const { dispatch } = this.props;

        dispatch(clientsActions.getAClientAttachments(clientEncodedKey,params));
    }

    handleAddAttachment = async (addAttachmentPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(clientsActions.creatAClientAttachment(addAttachmentPayload));
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
            dispatch(clientsActions.getAClientAttachments(this.clientEncodedKey,params, tempData));
            
        }else{
            dispatch(clientsActions.getAClientAttachments(this.clientEncodedKey,params));
        }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        
        let params= `PageSize=${PageSize}&CurrentPage=${nextPage}`;

        if(tempData){
            dispatch(clientsActions.getAClientAttachments(this.clientEncodedKey,params, tempData));
        }else{
            dispatch(clientsActions.getAClientAttachments(this.clientEncodedKey,params));
        }
    }

    HandleFileUpLoad = (event) => {
        let filename = event.target.files[0].name,
            ext = event.target.files[0].type;
        

       
     
 
        this.setState({docuploaded: event.target.files[0], filename,isDocAdded:true});
    }

    addNewAttachmentBox = ()=>{
        const {showAddAttachment, docuploaded,isDocAdded} = this.state;
        let  createAClientAttachmentsRequest = this.props.createAClientAttachmentsReducer;
        let addCustomerAttachmentsValidationSchema = Yup.object().shape({
            Title:  Yup.string()
                    .min(2, 'Valid response required')
                    .required('Required'),
            Description: Yup.string()
                    .required('Required')
                    .min(3, 'Valid response required'),
            
           });
        return(
            <Modal show={showAddAttachment} onHide={this.handleAttachmentBoxClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Formik
                    initialValues={{
                        Description:"",
                        Title:""
                    }}

                    validationSchema={addCustomerAttachmentsValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        // let addCustomerAttachmentPayload = {
                        //     comment:values.comment,
                        //     ClientEncodedKey:this.clientEncodedKey
                        // }

                        if(docuploaded!==''){
                            this.setState({isDocAdded:true});

                            const attachmentFormData = new FormData();
                            attachmentFormData.append('DocumentFile', this.state.docuploaded);
                            attachmentFormData.append('ClientEncodedKey', this.clientEncodedKey);
                            attachmentFormData.append('Description', values.Description);
                            attachmentFormData.append('Title', values.Title);


                            // return false;

                            this.handleAddAttachment(attachmentFormData)
                                .then(
                                    () => {

                                        if (this.props.createAClientAttachmentsReducer.request_status === clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_SUCCESS) {
                                            resetForm();
                                            // value = {null}

                                            setTimeout(() => {
                                                this.props.dispatch(clientsActions.creatAClientAttachment("CLEAR"))
                                                this.setState({docuploaded: '', filename:'', isDocAdded:false});
                                                this.handleAttachmentBoxClose();
                                                this.loadInitialCustomerData();
                                            }, 3000);
                                        }

                                        

                                    }
                                )
                        }else{
                            this.setState({isDocAdded:false})
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
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                                className="">
                                <Modal.Header>
                                    <Modal.Title>Upload Document</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group>
                                        <Form.Label className="block-level">Title</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            onChange={handleChange}
                                            name="Title"
                                            value={values.Title}
                                            className={errors.Title && touched.Title ? "is-invalid form-control form-control-sm" : null} />
                                            
                                            {errors.Title && touched.Title ? (
                                            <span className="invalid-feedback">{errors.Title}</span>
                                            ) : null}
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label className="block-level">Description</Form.Label>
                                        <Form.Control as="textarea"
                                            rows="3"
                                            onChange={handleChange}
                                            name="Description"
                                            value={values.Description}
                                            className={errors.Description && touched.Description ? "is-invalid form-control form-control-sm" : null} />

                                        {errors.Description && touched.Description ? (
                                            <span className="invalid-feedback">{errors.Description}</span>
                                        ) : null}
                                        <div className="footer-with-cta">
                                            <label htmlFor="file-upload3" className="btn btn-primary">Choose file</label>
                                            <input name="docuploaded"  type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/>
                                        </div>

                                        {this.state.filename!==null && 
                                
                                            <div className="filename">
                                              File: <span>{this.state.filename}</span>  
                                            </div>
                                        }
                                    </Form.Group>
                                    {isDocAdded ===false &&
                                        <Alert variant="danger" className="w-65 mlr-auto">
                                            Please upload document
                                        </Alert>
                                    }
                                </Modal.Body>
                                <Modal.Footer>

                                    <Button variant="light" onClick={this.handleAttachmentBoxClose}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="success"
                                        type="submit"
                                        disabled={createAClientAttachmentsRequest.is_request_processing}
                                    >
                                        {createAClientAttachmentsRequest.is_request_processing?"Please wait...":"Upload attachment"}
                                        
                                    </Button>

                                </Modal.Footer>

                                {createAClientAttachmentsRequest.request_status === clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_SUCCESS && 
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {createAClientAttachmentsRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {createAClientAttachmentsRequest.request_status === clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_FAILURE && 
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {createAClientAttachmentsRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        )}
                </Formik>

                
            </Modal>
        )
    }

    renderAttachementWrap =()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){

                    return(
                        <div>
                            {this.addNewAttachmentBox()}
                            {this.renderClientAttachments()}
                        </div>
                    )
                    
                }
    }

    renderClientAttachments=()=>{
        let getAClientAttachmentsRequest =  this.props.getAClientAttachmentsReducer;

        let saveRequestData= getAClientAttachmentsRequest.request_data!==undefined?getAClientAttachmentsRequest.request_data.tempData:null;
        if(getAClientAttachmentsRequest.request_status===clientsConstants.GET_A_CLIENT_ATTACHMENTS_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
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
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Filename</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Date</th>
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
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                        <Form className="one-liner"></Form>
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
                                    <th>Title</th>
                                    <th>Filename</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   saveRequestData.map((eachAttachment, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachAttachment.title} </td>
                                                <td>{eachAttachment.fileName} </td>
                                                <td>{eachAttachment.description} </td>
                                                <td>{eachAttachment.createdByUserName} </td>
                                                <td>{getDateFromISO(eachAttachment.timeStamp)} </td>
                                                <td>
                                                    {(eachAttachment.linkIdentifier!=="" && eachAttachment.linkIdentifier!==null && eachAttachment.linkIdentifier!==undefined) &&
                                                        <DropdownButton
                                                            size="sm"
                                                            title="Actions"
                                                            key="editUser"
                                                            className="customone"
                                                        >
                                                            <a  className="dropdown-item" 
                                                                    href={`${routes.GET_DOWNLOAD}FileType=CLIENT&EncodedKey=${this.clientEncodedKey}&Link=${eachAttachment.linkIdentifier}`}
                                                                // <NavLink download className="dropdown-item" to={`${routes.GET_DOWNLOAD}filetype=CLIENT&identifier=${eachAttachment.linkIdentifier}&link=treble`}>Download</NavLink>
                                                                >Download</a>
                                                            
                                                        </DropdownButton>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                        </div>
                    </div>
                )
            }
        }

        if(getAClientAttachmentsRequest.request_status===clientsConstants.GET_A_CLIENT_ATTACHMENTS_SUCCESS){
            let getAClientAttachmentsInfo = getAClientAttachmentsRequest.request_data.response.data;
            let getAClientAttachmentsData = getAClientAttachmentsRequest.request_data.response.data.result;

            if(getAClientAttachmentsData.length>=1){


                return(
                    <div>
                        <div className="heading-with-cta ">
                        <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setPagesize(e, getAClientAttachmentsData)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getAClientAttachmentsInfo.totalPages}
                                    currPage={getAClientAttachmentsInfo.currentPage}
                                    currRecordsCount={getAClientAttachmentsInfo.length}
                                    totalRows={getAClientAttachmentsInfo.totalRows}
                                    tempData={getAClientAttachmentsData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.loadNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Filename</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   getAClientAttachmentsData.map((eachAttachment, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachAttachment.title} </td>
                                                <td>{eachAttachment.fileName} </td>
                                                <td>{eachAttachment.description} </td>
                                                <td>{eachAttachment.createdByUserName} </td>
                                                <td>{getDateFromISO(eachAttachment.timeStamp)} </td>
                                                <td>
                                                    {(eachAttachment.linkIdentifier!=="" && eachAttachment.linkIdentifier!==null && eachAttachment.linkIdentifier!==undefined) &&
                                                        <DropdownButton
                                                            size="sm"
                                                            title="Actions"
                                                            key="editUser"
                                                            className="customone"
                                                        >
                                                            
                                                            <a  className="dropdown-item" 
                                                                    href={`${routes.GET_DOWNLOAD}FileType=CLIENT&EncodedKey=${this.clientEncodedKey}&Link=${eachAttachment.linkIdentifier}`}
                                                                // <NavLink download className="dropdown-item" to={`${routes.GET_DOWNLOAD}filetype=CLIENT&identifier=${eachAttachment.linkIdentifier}&link=treble`}>Download</NavLink>
                                                                >Download</a>
                                                            
                                                            
                                                        </DropdownButton>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                        </div>
                    </div>
                )
            }else{

                return(
                    <div className="no-records">
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
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Filename</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Date</th>
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
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                        </div>
                    </div>
                )
            }

           
        }

        if(getAClientAttachmentsRequest.request_status===clientsConstants.GET_A_CLIENT_ATTACHMENTS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientAttachmentsRequest.request_data.error}</div>
            </div>
            )
        }
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
                                            {this.renderAttachementWrap()}
                                            
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
        getAClientAttachmentsReducer: state.clientsReducers.getAClientAttachmentsReducer,
        createAClientAttachmentsReducer: state.clientsReducers.createAClientAttachmentsReducer,
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps) (ViewCustomerAttachments);