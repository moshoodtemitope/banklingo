import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
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
import Modal from 'react-bootstrap/Modal'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class GeneralTxtChannels extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showEdit: false
        }

        
    }

    componentDidMount(){
        this.getTransactionChannels();
    }

    

    handleCloseEdit = () => this.setState({showEdit:false});

    handleShowEdit = (encodedKey) => this.setState({showEdit:true, encodedKey});


    getTransactionChannels = ()=>{
        const {dispatch} = this.props;
        let payload ={
            PageSize:20,
            CurrentPage:1
        }
        dispatch(administrationActions.getTransactionChannels(payload));
    }

    renderAllChannels =()=>{
        let adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels;

            switch (adminGetTransactionChannelsRequest.request_status){
                case (administrationConstants.GET_TRANSACTION_CHANNELS_PENDING):
                    return (
                        <div className="loading-content"> 
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
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
                                        {/* <td></td> */}
                                        <td></td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                case(administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS):
                    let allChannelsData = adminGetTransactionChannelsRequest.request_data.response.data;
                        
                        if(allChannelsData!==undefined){
                            if(allChannelsData.length>=1){
                                return (
                                    <div>
                                        {/* <div className="table-helper">
                                            <input type="checkbox" name="" id="showDeactivted" />
                                            <label htmlFor="showDeactivted">Show deactivated transaction channels</label>
                                        </div> */}
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Created</th>
                                                    <th>Created by</th>
                                                    <th>Active</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allChannelsData.map((eachChannel, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>{eachChannel.name}</td>
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
                                        {/* No Channels have been created */}
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
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
                                                    {/* <td></td> */}
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
            selectTxtChannel = txtChannelList.filter((channel, index)=>channel.encodedKey===encodedKey)[0];
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
                                                    
                                                    
                                                    setTimeout(() => {
                                                        this.getTransactionChannels(); 
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
                                    <ul className="nav">
                                        <li>
                                            {/* <NavLink to={'/administration-generalorganization'}>General</NavLink> */}
                                            <NavLink to={'/administration/general'}>General</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/organization'}>Organization</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/access'}>Access</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/products'}>Products</NavLink>
                                        </li> 
                                        <li>
                                            <NavLink to={'/administration/sms'}>SMS</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/email'}>Email</NavLink>
                                        </li>
                                    </ul>
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                                {/* <NavLink to={'/administration/administration-generalcurrency'}>Currency</NavLink> */}
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
                                            {/* <li>
                                                <NavLink to={'/administration/general/branding'}>Branding</NavLink>
                                            </li> */}
                                        </ul>
                                    </div>
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