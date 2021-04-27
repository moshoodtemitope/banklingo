import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from '../_menu'
import BranchClosureMenu from '../menus/_branch_closure_menu'
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../../shared/templates/authed-pagecontainer'
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../../shared/elements/table'
import  TablePagination from '../../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Formik } from 'formik';
import * as Yup from 'yup';

import DatePicker from '../../../_helpers/datepickerfield';
import DatePickerFieldType from '../../../_helpers/DatePickerFieldType';

import {branchActions,branchConstants} from '../../../redux/actions/administration/branch-management.actions';
import Alert from 'react-bootstrap/Alert'
// import  SidebarElement from '../../shared/elements/sidebar'
import "../administration.scss"; 
import { getDateFromISO } from "../../../shared/utils";
class OrganizationBranchesClosed extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            FullDetails: false,
            CurrentPage:1,
            CurrentSelectedPage:1,
            BranchClosureStatus:2,
            showUpdatePop: false,
            branchToUpdate: null
        }

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage, BranchClosureStatus}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchClosureStatus=${BranchClosureStatus}`;
        this.getClosures(params);
    }

    getClosures = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(branchConstants.getBranchesClosed(paramters));
    }

    setPagesize = (PageSize, tempData)=>{
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {FullDetails, CurrentPage, CurrentSelectedPage, BranchClosureStatus} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&BranchClosureStatus=${BranchClosureStatus}`;
        

        if(tempData){
            dispatch(branchConstants.getBranchesClosed(params, tempData));
        }else{
            dispatch(branchConstants.getBranchesClosed(params));
        }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize, BranchClosureStatus} = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}&BranchClosureStatus=${BranchClosureStatus}`;
        // this.getTransactionChannels(params);


        if(tempData){
            dispatch(branchConstants.getBranchesClosed(params,tempData));
        }else{
            dispatch(branchConstants.getBranchesClosed(params));
        }
    }

    setShowDetails = (FullDetails,tempData)=>{
        const {dispatch} = this.props;
        // console.log('----here', PageSize.target.value);
        let showDetails = FullDetails.target.checked,
            {CurrentPage, CurrentSelectedPage, PageSize, BranchClosureStatus} = this.state;

        this.setState({FullDetails: showDetails});

        let params= `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&BranchClosureStatus=${BranchClosureStatus}`;
        
        if(tempData){
            dispatch(branchConstants.getBranchesClosed(params, tempData));
        }else{
            dispatch(branchConstants.getBranchesClosed(params));
        }
        
    }

    renderAllBranches =()=>{
        let getBranchClosuresRequest = this.props.getBranchClosuresReducer;

        let saveRequestData= getBranchClosuresRequest.request_data!==undefined?getBranchClosuresRequest.request_data.tempData:null;

            switch (getBranchClosuresRequest.request_status){
                case (branchConstants.GET_BRANCHES_CLOSED_PENDING):
                    
                    if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
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
                                            <th>Branch Name</th>
                                            <th>Branch ID</th>
                                            <th>Date Closed</th>
                                            <th></th>
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
                                <div className="loading-text">Please wait... </div>
                            </div>
                        )
                    }else{
                        return(
                            <div>
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
                                            // onChange={this.setPagesize}
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
                                            <th>Branch Name</th>
                                            <th>Branch ID</th>
                                            <th>Date Closed</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.map((eachBranch, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachBranch.branchName}</td>
                                                            <td>{eachBranch.branchId}</td>
                                                            <td>{getDateFromISO(eachBranch.dateOpenedFor)}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink>
                                                                    {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </TableComponent>
                            </div>
                        )
                    }
                
                case(branchConstants.GET_BRANCHES_CLOSED_SUCCESS):
                    let allBranchesData = getBranchClosuresRequest.request_data.response.data;
                    if(allBranchesData!==undefined){
                        if(allBranchesData.result.length>=1){
                            return(
                                <div>
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
                                                onChange={(e)=>this.setPagesize(e, allBranchesData.result)}
                                                value={this.state.PageSize}
                                                className="countdropdown form-control form-control-sm">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="200">200</option>
                                            </select>
                                            <TablePagination
                                                    totalPages={allBranchesData.totalPages}
                                                    currPage={allBranchesData.currentPage}
                                                    currRecordsCount={allBranchesData.result.length}
                                                    totalRows={allBranchesData.totalRows}
                                                    tempData={allBranchesData.result}
                                                    pagesCountToshow={4}
                                                    refreshFunc={this.loadNextPage}
                                                />
                                        </div>
                                    </div>
                                    <div className="table-helper mb-10">
                                        <input type="checkbox" name="" 
                                             onChange={(e)=>this.setShowDetails(e, allBranchesData.result)}
                                           
                                            checked={this.state.FullDetails}
                                            id="showFullDetails" />
                                        <label htmlFor="showFullDetails">Show full details</label>
                                    </div>
                                    
                                    <TableComponent classnames="striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th>Branch Name</th>
                                                <th>Branch ID</th>
                                                <th>Date Closed</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allBranchesData.result.map((eachBranch, index)=>{
                                                    return(
                                                        <Fragment key={index}>
                                                            <tr>
                                                            <td>{eachBranch.branchName}</td>
                                                            <td>{eachBranch.branchId}</td>
                                                            <td>{getDateFromISO(eachBranch.dateOpenedFor)}</td>
                                                                <td>
                                                                    <DropdownButton
                                                                        size="sm"
                                                                        title="Actions"
                                                                        key="activeCurrency"
                                                                        className="customone"
                                                                    >
                                                                        <Dropdown.Item eventKey="1" onClick={()=> this.handleShowUpdatePop(eachBranch)} >Open branch</Dropdown.Item>
                                                                    </DropdownButton>
                                                                </td>
                                                            </tr>
                                                        </Fragment>
                                                    )
                                                })
                                            }
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
                                            
                                        </div>
                                    </div>
                                    <TableComponent classnames="striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th>Branch Name</th>
                                                <th>Branch ID</th>
                                                <th>Date Closed</th>
                                                {/* <th></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </TableComponent>
                                    
                                </div>
                            )
                        }
                    }else{
                        return null;
                    }

                case (branchConstants.GET_BRANCHES_CLOSED_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{getBranchClosuresRequest.request_data.error}</div>
                        </div>
                    )
                default :
                return null;
            }
    }

    clearAllData = () => {
        this.props.dispatch(branchConstants.openABranch('CLEAR'));
    };

    handleCloseUpdatePop = () => {
        if (this.props.openABranchReducer.is_request_processing === false) {
            this.setState({ showUpdatePop: false, branchToUpdate: null });
        }
    };

    handleShowUpdatePop = (branchToUpdate) => {
        this.clearAllData();
        this.setState({ showUpdatePop: true, branchToUpdate });
    };

    updateABranchStatus = async (payload) => {
        const { dispatch } = this.props;

        await dispatch(branchConstants.openABranch(payload));
    };

    closeABranchPopUp = () => {
        let { showUpdatePop, branchToUpdate } = this.state;
        let updateABranchRequest = this.props.openABranchReducer;

        

        let checkValidationSchema = Yup.object().shape({
            closureDate: Yup.string().required('Required'),
        });
        return (
            <Modal
                show={showUpdatePop}
                onHide={this.handleCloseUpdatePop}
                size='lg'
                centered='true'
                dialogClassName='modal-40w withcentered-heading'
                animation={true}
            >
                <Modal.Header>
                    <Modal.Title>Open {branchToUpdate.branchName} branch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            closureDate: '',
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload = {
                                branchEncodedKey: branchToUpdate.branchEncodedKey,
                                closureDate: values.closureDate.toISOString(),
                                note: values.note,
                            };

                            this.updateABranchStatus(requestPayload).then(() => {
                                if (
                                    this.props.openABranchReducer.request_status ===
                                    branchConstants.OPEN_A_BRANCH_SUCCESS
                                ) {
                                    resetForm();
                                    this.loadInitialData();
                                }
                            });
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            setFieldTouched,
                            resetForm,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => {
                            return (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group
                                        controlId='debitLocation'
                                        className={
                                            errors.closureDate && touched.closureDate
                                                ? 'has-invaliderror fullwidthdate'
                                                : 'fullwidthdate'
                                        }
                                    >
                                        <Form.Label className='block-level'>
                                            Closure Date
                                        </Form.Label>
                                        <DatePicker
                                            placeholderText='Choose date'
                                            autoComplete='new-date'
                                            // onChange={this.handleDatePicker}
                                            // onChangeRaw={(e) => this.handleDateChange(e)}
                                            dateFormat={window.dateformat}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode='select'
                                            name='closureDate'
                                            value={values.closureDate}
                                            onChange={setFieldValue}
                                            maxDate={new Date()}
                                            className={
                                                errors.closureDate && touched.closureDate
                                                    ? 'is-invalid form-control form-control-sm h-38px'
                                                    : 'form-control form-control-sm h-38px'
                                            }
                                            customInput={
                                                <DatePickerFieldType placeHolder='Choose date' />
                                            }
                                        />
                                        {errors.closureDate && touched.closureDate ? (
                                            <span className='invalid-feedback'>
                                                {errors.closureDate}
                                            </span>
                                        ) : null}
                                    </Form.Group>
                                  

                                    <div className='footer-with-cta toleft'>
                                        <Button
                                            disabled={updateABranchRequest.is_request_processing}
                                            variant='secondary'
                                            className='grayed-out'
                                            onClick={this.handleCloseUpdatePop}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type='submit'
                                            disabled={updateABranchRequest.is_request_processing}
                                        >
                                            {updateABranchRequest.is_request_processing
                                                ? 'Please wait...'
                                                : 'Open Branch'}
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                    {updateABranchRequest.request_status ===
                        branchConstants.OPEN_A_BRANCH_SUCCESS && (
                            <Alert variant='success'>
                                {updateABranchRequest.request_data.response.data.message}
                            </Alert>
                        )}
                    {updateABranchRequest.request_status ===
                        branchConstants.OPEN_A_BRANCH_FAILURE && (
                            <Alert variant='danger'>
                                {updateABranchRequest.request_data.error}
                            </Alert>
                        )}
                </Modal.Body>
            </Modal>
        );
    };

    



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
                                                <h2>Opened Branches</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <AdminNav />
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/administration/organization'}>Branches</NavLink>
                                            </li>
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink  to={'/administration/organization/branch-closures'}>Branch Closures</NavLink>
                                            </li>
                                            {/* <li>
                                                <NavLink to={'/administration/organization/centers'}>Centers</NavLink>
                                                
                                            </li> */}
                                        </ul>
                                    </div>
                                    <BranchClosureMenu />
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderAllBranches()}
                                               
                                                
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
        getBranchClosuresReducer : state.administrationReducers.getBranchesClosedReducer,
        openABranchReducer : state.administrationReducers.openABranchReducer,
    };
}

export default connect(mapStateToProps)(OrganizationBranchesClosed);