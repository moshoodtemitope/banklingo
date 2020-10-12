import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Modal from 'react-bootstrap/Modal'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'
import GeneralNav from './menus/_general-menu'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class GeneralTxtChannels extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showEdit: false,
            PageSize: 25,
            CurrentPage:1
        }

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getTransactionChannels(params);
    }
    

    handleCloseEdit = () => this.setState({showEdit:false});

    handleShowEdit = (encodedKey) => this.setState({showEdit:true, encodedKey});

    renderPagination =(totalPages,currPage,currRecordsCount, totalRows, tempData, pagesCountToshow, refreshFunc)=>{
        let isMorePagesLeft,
            pagingTemplate=[],
            pagesToshow =pagesCountToshow||4;

            if(currRecordsCount===totalRows){
                isMorePagesLeft = false;
            }

            if(currRecordsCount<totalRows){
                if(currPage<totalPages){
                    isMorePagesLeft = true;
                }
                else{
                    isMorePagesLeft = false;
                }
            }
            if(totalPages<=pagesToshow){
                for(var eachPage=1; eachPage<=totalPages ; eachPage++){
                    pagingTemplate.push(<span 
                                            className="each-pagenum"
                                            onClick={refreshFunc(eachPage,tempData)}
                                            >{eachPage}</span>
                                        );
                }
            }else{
                for(var eachPage=1; eachPage<=pagesToshow; eachPage++){
                    if(eachPage<pagesToshow-1){
                        pagingTemplate.push(<span 
                                                className="each-pagenum"
                                                onClick={refreshFunc(eachPage,tempData)}
                                                >{eachPage}</span>
                                            );
                    }
                    if(eachPage===pagesToshow-1){
                        pagingTemplate.push(<span 
                                                className="middot"
                                                onClick={refreshFunc(eachPage,tempData)}
                                                >...</span>
                                            );
                    }
                    if(eachPage===pagesToshow){
                        pagingTemplate.push(<span 
                                                className="each-pagenum"
                                                onClick={refreshFunc(totalPages,tempData)}
                                                >{totalPages}</span>
                                            );
                    }
                }
            }

        return(
            <div className={isMorePagesLeft===true?"move-page-actions":"move-page-actions unaallowed"}>
                <div 
                    className={isMorePagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isMorePagesLeft===true?refreshFunc(currPage+1,tempData):null}>
                    <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                </div>
                <div 
                    className={isMorePagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isMorePagesLeft===true?refreshFunc(currPage+1,tempData):null}>
                    <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                </div>

                {/* {currPage===1 && 
                    <div className="page-count">
                        <span>{currPage}-{currRecordsCount}</span>  of <span>{totalRows}</span>
                    </div>
                } */}

                {pagingTemplate}

                {/* {
                    (totalPages>4 && (totalPages-currPage)>=4) &&
                    <div className="page-count">
                        <span className="each-pagenum" onClick={refreshFunc(currPage,tempData)} >{currPage}</span>
                        <span className="each-pagenum" onClick={refreshFunc(currPage+1,tempData)}>{currPage+1}</span>
                        <span className="each-pagenum" onClick={refreshFunc(currPage+2,tempData)}>{currPage+2}</span>
                        <span className="middot" onClick={refreshFunc(currPage+4,tempData)}>{currPage+2}>...</span>
                        <span className="each-pagenum" onClick={refreshFunc(totalPages,tempData)}>{totalPages}</span>
                    </div>
                }
                {totalPages<=4 && 
                    <div className="page-count">
                        {pagingTemplate}
                    </div>
                } */}
                
                
                
                
                <div 
                    className={isMorePagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isMorePagesLeft===true?refreshFunc(currPage+1,tempData):null}>
                    <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                </div>
                <div 
                    className={isMorePagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isMorePagesLeft===true?refreshFunc(currPage+1,tempData):null}>
                    <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                </div>
            </div>
        )
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if(tempData){
            dispatch(administrationActions.getTransactionChannels(params,tempData));
        }else{
            dispatch(administrationActions.getTransactionChannels(params));
        }
    }

    getTransactionChannels = (params)=>{
        const {dispatch} = this.props;
        // let payload ={
        //     PageSize:20,
        //     CurrentPage:1
        // }
        dispatch(administrationActions.getTransactionChannels(params));
    }

    setPagesize = (PageSize, tempData)=>{
        
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {CurrentPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;
        // this.getTransactionChannels(params);


        if(tempData){
            dispatch(administrationActions.getTransactionChannels(params,tempData));
        }else{
            dispatch(administrationActions.getTransactionChannels(params));
        }
    }
    

    renderAllChannels =()=>{
        let adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels;

        let saveRequestData= adminGetTransactionChannelsRequest.request_data!==undefined?adminGetTransactionChannelsRequest.request_data.tempData:null;
        
            switch (adminGetTransactionChannelsRequest.request_status){
                
                case (administrationConstants.GET_TRANSACTION_CHANNELS_PENDING):
                    
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
                                            <th>Name</th>
                                            <th>Channel Code</th>
                                            <th>Created</th>
                                            <th>Created by</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                        
                                    <tbody>
                                        <tr>
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
                        return (
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
                                            <th>Name</th>
                                            <th>Channel Code</th>
                                            <th>Created</th>
                                            <th>Created by</th>
                                            <th>Active</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.map((eachChannel, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachChannel.name}</td>
                                                            <td>{eachChannel.key}</td>
                                                            <td>{eachChannel.dateCreated}</td>
                                                            <td>{eachChannel.createdBy!==null?eachChannel.createdBy:''}</td>
                                                            <td>{eachChannel.objectStateDescription}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    className="customone"
                                                                >
                                                                    {/* <NavLink className="dropdown-item" to={'/administration/general/new-txt-channels'}>Edit</NavLink> */}
                                                                    <Dropdown.Item eventKey="1" onClick={()=>this.handleShowEdit(eachChannel.encodedKey)}>Edit</Dropdown.Item>
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
                case(administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS):
                    let allChannelsData = adminGetTransactionChannelsRequest.request_data.response.data;
                        
                        if(allChannelsData!==undefined){
                            if(allChannelsData.result.length>=1){
                                return (
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
                                                    onChange={(e)=>this.setPagesize(e, allChannelsData.result)}
                                                    value={this.state.PageSize}
                                                    className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                <TablePagination
                                                    totalPages={allChannelsData.totalPages}
                                                    currPage={allChannelsData.currentPage}
                                                    currRecordsCount={allChannelsData.result.length}
                                                    totalRows={allChannelsData.totalRows}
                                                    tempData={allChannelsData.result}
                                                    pagesCountToshow={4}
                                                    refreshFunc={this.loadNextPage}
                                                />
                                                
                                                
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Channel Code</th>
                                                    <th>Created</th>
                                                    <th>Created by</th>
                                                    <th>Active</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allChannelsData.result.map((eachChannel, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>{eachChannel.name}</td>
                                                                    <td>{eachChannel.key}</td>
                                                                    <td>{eachChannel.dateCreated}</td>
                                                                    <td>{eachChannel.createdBy!==null?eachChannel.createdBy:''}</td>
                                                                    <td>{eachChannel.objectStateDescription}</td>
                                                                    <td>
                                                                        <DropdownButton
                                                                            size="sm"
                                                                            title="Actions"
                                                                            className="customone"
                                                                        >
                                                                            {/* <NavLink className="dropdown-item" to={'/administration/general/new-txt-channels'}>Edit</NavLink> */}
                                                                            <Dropdown.Item eventKey="1" onClick={()=>this.handleShowEdit(eachChannel.encodedKey)}>Edit</Dropdown.Item>
                                                                        </DropdownButton>
                                                                    </td>
                                                                </tr>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                                
                                            </tbody>
                                        </TableComponent>
                                        <div className="footer-with-cta toleft">
                                            {/* <Button variant="secondary" className="grayed-out">Rearrange</Button> */}
                                            <NavLink to={'/administration/general/new-txt-channels'} className="btn btn-primary">Add Channel</NavLink>
                                            {/* <Button href="/administration/general/new-txt-channels">Add Channel</Button> */}
                                        </div>
                                    </div>
                                )
                            }
                            else{
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
                                                <select id="toshow" 
                                                    className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                
                                            </div>
                                        </div>
                                        {/* No Channels have been created */}
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Channel Code</th>
                                                    <th>Created</th>
                                                    <th>Created by</th>
                                                    {/* <th>Active</th> */}
                                                    {/* <th></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </TableComponent>
                                        <div className="footer-with-cta toleft">
                                            
                                            <NavLink to={'/administration/general/new-txt-channels'} className="btn btn-primary">Add Channel</NavLink>
                                            
                                        </div>
                                    </div>
                                )
                            }
                        }else{
                            return null;
                        }
                case (administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{adminGetTransactionChannelsRequest.request_data.error}</div>
                        </div>
                    )
                default :
                return null;
            }
    }

    sendTransactionChannelUpdate = async (payload) =>{
        const {dispatch} = this.props;

        await dispatch(administrationActions.updateTransactionChannel(payload));
    }

    editTransactionChannel = ()=>{
        let {showEdit, encodedKey, selectedGlAccount} = this.state,
            adminUpdateTransactionChannelRequest = this.props.adminUpdateTransactionChannel,
            validationSchema = Yup.object().shape({
                TxtChannelId: Yup.string()
                .matches(/^[0-9]*$/, 'Invalid repsonse'),
                // .required('Please provide GL Account'),
                TxtChannelName: Yup.string()
                    .min(2, 'Min of two characters')
                    .required('Name is required'),
                TxtChannelKey: Yup.string()
                    .min(2, 'Min of two characters')
                    .max(30, 'Max Limit reached')
                    .required('Key is required')
            });

        let txtChannelList = this.props.adminGetTransactionChannels.request_data.response.data,
            glAccountList = this.props.adminGetTransactionChannels.request_data.response2.data,
            selectTxtChannel,selectTxtChannelGl,
            allGlAccounts =[];

            glAccountList.map((channel, id)=>{
                allGlAccounts.push({label: channel.accountDescription, value:channel.id});
            })
            selectTxtChannel = txtChannelList.result.filter((channel, index)=>channel.encodedKey===encodedKey)[0];
        if(selectTxtChannel!==undefined){
            selectTxtChannelGl = allGlAccounts.filter((glInfo, index)=>glInfo.value===selectTxtChannel.glAccountId)[0];

                
            
            return(
                <Modal show={showEdit} onHide={this.handleCloseEdit} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                        <Modal.Header>
                            <Modal.Title>Edit Transaction Channel</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={{
                                    TxtChannelKey: selectTxtChannel.key,
                                    TxtChannelName: selectTxtChannel.name,
                                    TxtChannelId: '',
                                }}
                                // validationSchema={(props)=>{
                                //     return Yup.lazy(values => { 

                                //       return  Yup.object().shape({
                                //             TxtChannelId: Yup.string()
                                //             .matches(/^[0-9]*$/, 'Invalid repsonse'),
                                //             // .required('Please provide GL Account'),
                                //             TxtChannelName: Yup.string()
                                //                 .min(2, 'Min of two characters')
                                //                 .required('Name is required'),
                                //             TxtChannelKey: Yup.string()
                                //                 .min(2, 'Min of two characters')
                                //                 .max(30, 'Max Limit reached')
                                //                 .required('Key is required')
                                //         });
                                //     })
                                // }}
                                onSubmit={(values, { resetForm }) => {
                                    
                                    
                                    let updatedTransactionChannelPayload = {
                                        key: values.TxtChannelKey,
                                        name: values.TxtChannelName,
                                        // glId: parseInt(values.TxtChannelId),
                                        glId: selectedGlAccount!=undefined? parseInt(selectedGlAccount.value): selectTxtChannelGl.value,
                                        // glId: parseInt(selectedGlAccount.value),
                                        encodedKey: selectTxtChannel.encodedKey
                                    }
                                
                                    
                                    this.sendTransactionChannelUpdate(updatedTransactionChannelPayload)
                                        .then(
                                            () => {
                                                if(this.props.adminUpdateTransactionChannel.request_status === administrationConstants.UPDATE_TRANSACTION_CHANNEL_SUCCESS){
                                                    const {dispatch} = this.props;
                                                    let {PageSize, CurrentPage}= this.state;
                                                    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

                                                    let adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels;

                                                    let saveRequestData= adminGetTransactionChannelsRequest.request_data!==undefined?adminGetTransactionChannelsRequest.request_data.tempData:null;
                                                    
                                                    setTimeout(() => {
                                                        // this.getTransactionChannels(params); 
                                                        dispatch(administrationActions.getTransactionChannels(params,saveRequestData));
                                                        this.props.dispatch(administrationActions.updateTransactionChannel("CLEAR"));
                                                        this.handleCloseEdit();
                                                    }, 3000);
                                                }else{
                                                    setTimeout(() => {
                                                        this.props.dispatch(administrationActions.updateTransactionChannel("CLEAR"))
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
                                                <Form.Group controlId="TxtChannelName">
                                                        <Form.Label className="block-level">Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={values.TxtChannelName}
                                                            className={errors.TxtChannelName && touched.TxtChannelName ? "is-invalid" : null}
                                                            name="TxtChannelName" required />
                                                        {errors.TxtChannelName && touched.TxtChannelName ? (
                                                            <span className="invalid-feedback">{errors.TxtChannelName}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="TxtChannelKey">
                                                        <Form.Label className="block-level">Key</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={values.TxtChannelKey}
                                                            className={errors.TxtChannelKey && touched.TxtChannelKey ? "is-invalid" : null}
                                                            name="TxtChannelKey" required />

                                                        {errors.TxtChannelKey && touched.TxtChannelKey ? (
                                                            <span className="invalid-feedback">{errors.TxtChannelKey}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">GL Account</Form.Label>
                                                    <Select
                                                        options={allGlAccounts}
                                                        defaultValue ={{label:selectTxtChannelGl.label, value: selectTxtChannelGl.value}}
                                                        onChange={(selectedGlAccount) => {
                                                            this.setState({ selectedGlAccount });
                                                            errors.TxtChannelId = null
                                                            values.TxtChannelId = selectedGlAccount.value
                                                            
                                                            
                                                        }}
                                                        className={errors.TxtChannelId && touched.TxtChannelId ? "is-invalid" : null}
                                                        
                                                        name="TxtChannelId"
                                                        // value={values.currencyCode}
                                                        required
                                                    />
                                                    {errors.TxtChannelId && touched.TxtChannelId ? (
                                                        <span className="invalid-feedback">{errors.TxtChannelId}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                </Col>
                                            </Form.Row>
                                            
                                                
                                        
                                            <div className="footer-with-cta toleft">
                                                <Button variant="secondary" className="grayed-out" onClick={this.handleCloseEdit}>Cancel</Button>
                                                <Button
                                                    type="submit"
                                                    
                                                    disabled={adminUpdateTransactionChannelRequest.is_request_processing}>
                                                        {adminUpdateTransactionChannelRequest.is_request_processing?"Please wait...": "Update"}
                                                    </Button>
                                            </div>
                                        </Form>
                                    )}
                            </Formik>
                            {adminUpdateTransactionChannelRequest.request_status === administrationConstants.UPDATE_TRANSACTION_CHANNEL_SUCCESS && 
                                <Alert variant="success">
                                    {adminUpdateTransactionChannelRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {adminUpdateTransactionChannelRequest.request_status === administrationConstants.UPDATE_TRANSACTION_CHANNEL_FAILURE && 
                                <Alert variant="danger">
                                    {adminUpdateTransactionChannelRequest.request_data.error}
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
                {
                    this.props.adminGetTransactionChannels.request_status ===administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
                    && this.editTransactionChannel()
                }
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
                                    <GeneralNav />
                                    {/* <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                               
                                                <NavLink exact to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                               
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/txt-channels'}>Transaction Channels</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/customer-types'}>Customer Types</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/control'}>Internal Control</NavLink>
                                            </li>
                                           
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                
                                                
                                                {this.renderAllChannels()}
                                                
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
        adminGetTransactionChannels : state.administrationReducers.adminGetTransactionChannelsReducer,
        adminUpdateTransactionChannel : state.administrationReducers.adminUpdateTransactionChannelReducer,
    };
}

export default connect(mapStateToProps)(GeneralTxtChannels);