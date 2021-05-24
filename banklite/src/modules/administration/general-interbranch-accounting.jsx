import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import Col from 'react-bootstrap/Col'
import Modal from "react-bootstrap/Modal";
import AdminNav from './_menu'
import GeneralNav from './menus/_general-menu'
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class InterbranchGlAccounting extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showNewConfig: false
        }

        
    }

    componentDidMount(){
        
        this.getInterBranchGLs()
    }

    

    

    showNew =()=>{
        this.setState({showNewConfig: true})
    }
    hideNew =()=>{
        this.setState({showNewConfig: false})
    }

    handleClose = () => this.setState({showRemoveConfig:false});
    
    handleShow = (configToRemove) => this.setState({showRemoveConfig:true,configToRemove});

    confirmRemoveConfig = (configToRemove)=>{
        let requestTracker = this.props.interbranchGlActionsReducer,
            {showRemoveConfig}= this.state;
        console.log("kikiki", configToRemove);
        return(
            <Modal show={showRemoveConfig} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>Remove Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="text-center ">Are you sure you want to remove Interbranch GL Transfer configuration for
                        <div className="config-wrap"> 
                            <span>{configToRemove.sourceBranchName} branch(source) </span>to 
                            <span> {configToRemove.destinationBranchName} branch(destination) ?</span></div>
                    
                    </div>
                    {requestTracker.request_status === administrationConstants.INTER_BRANCHGL_ACTION_SUCCESS &&
                        <Alert variant="success">
                            {requestTracker.request_data.response.data.message}
                        </Alert>
                    }
                    {requestTracker.request_status === administrationConstants.INTER_BRANCHGL_ACTION_FAILURE &&
                        <Alert variant="danger">
                            {requestTracker.request_data.error}
                        </Alert>
                    }
                    {this.props.interbranchGlActionsReducer.request_status !== administrationConstants.INTER_BRANCHGL_ACTION_SUCCESS &&
                        <div className="footer-with-cta toleft">
                            <Button variant="secondary" className="grayed-out" onClick={this.handleClose}>Cancel</Button>
                            <Button
                                type="button"
                                onClick={()=>{
                                    let payload = {
                                        interBranchControlId:configToRemove.id
                                    }
                                    this.processInterbranchGlActions(payload, "remove")
                                    .then(
                                        () => {
                                            // resetForm();
                                            if(this.props.interbranchGlActionsReducer.request_status === administrationConstants.INTER_BRANCHGL_ACTION_SUCCESS){
                                                setTimeout(() => {
                                                    // this.getOrganizationDetails();
                                                    this.setState({showRemoveConfig:false})
                                                    this.props.dispatch(administrationActions.interbranchGlActions("CLEAR"))
                                                    this.props.dispatch(administrationActions.getInterBranchTransferList())
                                                }, 5000);
                                            }

                                        })
                                }}
                                disabled={requestTracker.is_request_processing}>
                                {requestTracker.is_request_processing ? "Please wait..." : "Remove"}
                            </Button>
                        </div>
                    }

                    {this.props.interbranchGlActionsReducer.request_status === administrationConstants.INTER_BRANCHGL_ACTION_SUCCESS &&
                        <div className="footer-with-cta toleft">
                            <Button 
                                 
                                onClick={()=>{
                                    this.setState({showRemoveConfig:false})
                                    this.props.dispatch(administrationActions.interbranchGlActions("CLEAR"))
                                    this.props.dispatch(administrationActions.getInterBranchTransferList())
                                }}>Okay</Button>
                        </div>
                    }

                </Modal.Body>
            </Modal>
        )
    }


    getInterBranchGLs = ()=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getInterBranchTransferList());
    }

    processInterbranchGlActions = async (payload,action)=>{
        const {dispatch} = this.props;

        await dispatch(administrationActions.interbranchGlActions(payload, action));
    }

    renderAllInterBranch =(getInterBranchTransferListRequest)=>{
        let 
                    allConfigs = getInterBranchTransferListRequest.request_data.response2.data.result,
                    allBranches = getInterBranchTransferListRequest.request_data.response.data,
                    allCurrencies = getInterBranchTransferListRequest.request_data.response3.data,
                    allGLAccounts = getInterBranchTransferListRequest.request_data.response4.data,
                    branchList=[{label:"", value:""}],
                    glList=[{label:"", value:""}],
                    currencyList=[{label:"", value:""}];

                    allBranches.map((eachData)=>{
                        branchList.push({
                            label:eachData.name,
                            value:eachData.id
                        })
                    })
                    allCurrencies.map((eachData)=>{
                        currencyList.push({
                            label:`${eachData.name}(${eachData.symbol})`,
                            value:eachData.code
                        })
                    })
                    allGLAccounts.map((eachData)=>{
                        glList.push({
                            label:`${eachData.accountDescription}`,
                            value:eachData.id
                        })
                    })

                    let allBranchesOptionData = allBranches.filter(eachData=>eachData.encodedKey==="0000-0000-0000-0000"||eachData.name==="All Branches")[0];
                    

            return(
                <div className="all-interbranch">
                    {allConfigs.map((eachInterbranch, index)=>{
                        
                        
                        // console.log("eachInterbranch", eachInterbranch)
                        return (
                            <Form.Row className="vertical-center" key={index}>
                                <Col>
                                    {(eachInterbranch.sourceBranchId!==-30) &&
                                        <Form.Group>
                                            {/* <Form.Label className="block-level">Preset</Form.Label> */}
                                            <Select
                                                options={[]}
                                                defaultValue={{
                                                    label:eachInterbranch.sourceBranchName,
                                                    value:eachInterbranch.sourceBranchId
                                                }}
                                                isDisabled={true}
                                                onChange={() => {
                                                    
                                                }}
                                            />
                                            
                                        </Form.Group>
                                    }
                                    {(eachInterbranch.sourceBranchId===-30) &&
                                        <Form.Group>
                                            <Form.Label className="block-level bolden">{allBranchesOptionData.name}</Form.Label>
                                        </Form.Group>
                                    }
                                </Col>
                                <Col>
                                    {(eachInterbranch.destinationBranchId!==-30) &&
                                        <Form.Group>
                                            {/* <Form.Label className="block-level">Preset</Form.Label> */}
                                            <Select
                                                defaultValue={{
                                                    label:eachInterbranch.destinationBranchName,
                                                    value:eachInterbranch.destinationBranchId
                                                }}
                                                isDisabled={true}
                                                options={[]}
                                                onChange={() => {
                                                }}
                                            />
                                            
                                        </Form.Group>
                                    }
                                    {(eachInterbranch.destinationBranchId===-30) &&
                                        <Form.Group>
                                            <Form.Label className="block-level bolden">{allBranchesOptionData.name}</Form.Label>
                                        </Form.Group>
                                    }
                                </Col>
                                <Col>
                                    <Form.Group>
                                        {/* <Form.Label className="block-level">Preset</Form.Label> */}
                                        <Select
                                            defaultValue={{
                                                label:eachInterbranch.currencyName,
                                                value:eachInterbranch.currencyCode
                                            }}
                                            isDisabled={true}
                                            options={[]}
                                            onChange={() => {
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="">
                                        {/* <Form.Label className="block-level">Preset</Form.Label> */}
                                        <Select
                                            defaultValue={{
                                                label:eachInterbranch.glAccount,
                                                value:eachInterbranch.glAccountId
                                            }}
                                            options={[]}
                                            isDisabled={true}
                                            onChange={() => {
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <div className="ctas-flexed">
                                        <div className="removed-btn" onClick={()=>this.handleShow(eachInterbranch)} >-</div>
                                        <div className="add-new-btn" onClick={this.showNew}> +</div>
                                    </div>
                                </Col>
                            </Form.Row>
                        )
                        

                       

                    })}
                </div>
            )
    }

    renderInterBranchTrasferGlDetails =()=>{
        let getInterBranchTransferListRequest = this.props.getInterBranchTransferListReducer;
        
        switch (getInterBranchTransferListRequest.request_status){
            case (administrationConstants.GET_ALL_INTER_BRANCH_GL_PENDING):
                return (
                    <div
                        className="form-content w-65 card">

                        <div className="normal-heading">Inter-Branch Transfer GL Account Rules</div>

                        <div className="loading-content">
                            <div className="loading-text">Please wait... </div>
                        </div>

                    </div>
                    
                )

            case(administrationConstants.GET_ALL_INTER_BRANCH_GL_SUCCESS):
                let 
                    allConfigs = getInterBranchTransferListRequest.request_data.response2.data,
                    allBranches = getInterBranchTransferListRequest.request_data.response.data,
                    allCurrencies = getInterBranchTransferListRequest.request_data.response3.data,
                    allGLAccounts = getInterBranchTransferListRequest.request_data.response4.data,
                    branchList=[{label:"", value:""}],
                    glList=[{label:"", value:""}],
                    currencyList=[{label:"", value:""}];

                    allBranches.map((eachData)=>{
                        branchList.push({
                            label:eachData.name,
                            value:eachData.id
                        })
                    })
                    allCurrencies.map((eachData)=>{
                        currencyList.push({
                            label:`${eachData.name}(${eachData.symbol})`,
                            value:eachData.code
                        })
                    })
                    allGLAccounts.map((eachData)=>{
                        glList.push({
                            label:`${eachData.accountDescription}`,
                            value:eachData.id
                        })
                    })
               
                    if(allConfigs!=="" && allConfigs.result.length>=1){
                        let allInterBranchGls = allConfigs.result;
                        // console.log("lalala", allInterBranchGls);
                        return(
                            <div>
                               
                                <div
                                    className="form-content w-65 card">

                                        <div className="normal-heading">Inter-Branch Transfer GL Account Rules</div>

                                        {this.renderAllInterBranch(getInterBranchTransferListRequest)}

                                        {this.state.showNewConfig && this.renderNewInterBranchTransferGl()}
                                        {this.state.showRemoveConfig && this.confirmRemoveConfig(this.state.configToRemove) }
                                </div>  


                            </div>
                        )
                    }else{
                        if(!this.state.showNewConfig){
                            return (
                                <div className="form-content w-60 card">
                                    <div className="nodata text-center">
                                        No InterBranchGL Configured yet.
                                    </div>
                                    <div className="footer-with-cta centered">
                                        <Button onClick={this.showNew}>Add New</Button>
                                    </div>
                                </div>
                            );
                        }else{
                            return null;
                        }
                    }


            case (administrationConstants.GET_ALL_INTER_BRANCH_GL_FAILURE):
                return (
                    <div
                        className="form-content w-65 card">

                        <div className="normal-heading">Inter-Branch Transfer GL Account Rules</div>

                        <div className="loading-content errormsg">
                            <div>{getInterBranchTransferListRequest.request_data.error}</div>
                        </div>

                    </div>
                    
                )
            default :
            return null;
        }
    }

    renderNewInterBranchTransferGl =()=>{
        let getInterBranchTransferListRequest = this.props.getInterBranchTransferListReducer;
        

                let allBranches = getInterBranchTransferListRequest.request_data.response.data,
                    allConfigs = getInterBranchTransferListRequest.request_data.response2.data,
                    allCurrencies = getInterBranchTransferListRequest.request_data.response3.data,
                    allGLAccounts = getInterBranchTransferListRequest.request_data.response4.data,
                    requestTracker = this.props.interbranchGlActionsReducer,
                    branchList=[{label:"", value:""}],
                    glList=[{label:"", value:""}],
                    currencyList=[{label:"All Currencies", value:"000"}],
                    validationSchema = Yup.object().shape({
                        firstBranchId: Yup.string()
                            .required('Required'),
                        secondBranchId: Yup.string()
                            .required('Required'),
                        currencyCode: Yup.string()
                            .required('Required'),
                        glAccountId: Yup.string()
                            .required('Required'),
                    });
                    allBranches.map((eachData)=>{
                        branchList.push({
                            label:eachData.name,
                            value:eachData.id
                        })
                    })
                    allCurrencies.map((eachData)=>{
                        currencyList.push({
                            label:`${eachData.name}(${eachData.symbol})`,
                            value:eachData.code
                        })
                    })
                    allGLAccounts.map((eachData)=>{
                        glList.push({
                            label:`${eachData.accountDescription}`,
                            value:eachData.id
                        })
                    })
                    
                let allBranchesOptionData = allBranches.filter(eachData=>eachData.encodedKey==="0000-0000-0000-0000"||eachData.name==="All Branches")[0];
                    
                return(
                    <div>
                       
                        <Formik
                            initialValues={{
                                firstBranchId: allConfigs !== "" ? "": `${allBranchesOptionData.id}`,
                                secondBranchId: allConfigs !== "" ? "": `${allBranchesOptionData.id}`,
                                currencyCode:"",
                                glAccountId:"",
                            }}
                            // validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                if (values.firstBranchId !== "" && values.secondBranchId !== "" && values.currencyCode !== "" && values.glAccountId !== "") {
                                    let interbranchPayload = {
                                        firstBranchId: parseInt(values.firstBranchId),
                                        secondBranchId: parseInt(values.secondBranchId),
                                        currencyCode: values.currencyCode,
                                        glAccountId: parseInt(values.glAccountId)
                                    };
                                    // console.log("here", interbranchPayload);

                                    // return false;


                                    this.processInterbranchGlActions(interbranchPayload, "create")
                                        .then(
                                            () => {
                                                // resetForm();
                                                if(this.props.interbranchGlActionsReducer.request_status === administrationConstants.INTER_BRANCHGL_ACTION_SUCCESS){
                                                    setTimeout(() => {
                                                        // this.getOrganizationDetails();
                                                        this.setState({showNewConfig:false})
                                                        this.props.dispatch(administrationActions.interbranchGlActions("CLEAR"))
                                                        this.props.dispatch(administrationActions.getInterBranchTransferList())
                                                    }, 5000);
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
                                setFieldValue,
                                values,
                                touched,
                                isValid,
                                errors, }) => (
                                <Form
                                    // className="form-content w-65 card no-mb"
                                    className="mt-20"
                                    noValidate
                                    onSubmit={handleSubmit}>
                                    {this.props.interbranchGlActionsReducer.request_status !== administrationConstants.INTER_BRANCHGL_ACTION_SUCCESS &&
                                        <div>
                                            <div className="normal-heading">Add new Inter-Branch Transfer GL Account Rules</div>

                                            <Form.Row className="vertical-center">
                                                <Col>
                                                    {(allConfigs !== "" && allConfigs.result.length >= 1) &&
                                                        <Form.Group>
                                                            {/* <Form.Label className="block-level">Preset</Form.Label> */}
                                                            <Select
                                                                options={branchList}
                                                                onChange={(selectedBranch1) => {
                                                                    this.setState({ selectedBranch1 });
                                                                    errors.firstBranchId = ""
                                                                    values.firstBranchId = selectedBranch1.value
                                                                }}
                                                                className={errors.firstBranchId && touched.firstBranchId ? "is-invalid" : null}

                                                                name="firstBranchId"
                                                                required
                                                            />
                                                            {errors.firstBranchId && touched.firstBranchId ? (
                                                                <span className="invalid-feedback">{errors.firstBranchId}</span>
                                                            ) : null}
                                                        </Form.Group>
                                                    }
                                                    {(allConfigs === "" || (allConfigs !== "" && allConfigs.result.length < 1)) &&
                                                        <Form.Label className="block-level bolden">{allBranchesOptionData.name}</Form.Label>
                                                    }
                                                </Col>
                                                <Col>
                                                    {allConfigs !== "" &&
                                                        <Form.Group>
                                                            {/* <Form.Label className="block-level">Preset</Form.Label> */}
                                                            <Select
                                                                options={branchList}
                                                                onChange={(selectedBranch2) => {
                                                                    this.setState({ selectedBranch2 });
                                                                    errors.secondBranchId = ""
                                                                    values.secondBranchId = selectedBranch2.value
                                                                }}
                                                                className={errors.secondBranchId && touched.secondBranchId ? "is-invalid" : null}

                                                                name="secondBranchId"
                                                                required
                                                            />
                                                            {errors.secondBranchId && touched.secondBranchId ? (
                                                                <span className="invalid-feedback">{errors.secondBranchId}</span>
                                                            ) : null}
                                                        </Form.Group>
                                                    }
                                                    {allConfigs === "" &&
                                                        <Form.Label className="block-level bolden">{allBranchesOptionData.name}</Form.Label>
                                                    }
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        {/* <Form.Label className="block-level">Preset</Form.Label> */}
                                                        <Select
                                                            options={currencyList}
                                                            onChange={(selectedCurrency) => {
                                                                this.setState({ selectedCurrency });
                                                                errors.currencyCode = ""
                                                                values.currencyCode = selectedCurrency.value
                                                            }}
                                                            className={errors.currencyCode && touched.currencyCode ? "is-invalid" : null}

                                                            name="currencyCode"
                                                            required
                                                        />
                                                        {errors.currencyCode && touched.currencyCode ? (
                                                            <span className="invalid-feedback">{errors.currencyCode}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        {/* <Form.Label className="block-level">Preset</Form.Label> */}
                                                        <Select
                                                            options={glList}
                                                            onChange={(selectedGl) => {

                                                                this.setState({ selectedGl });
                                                                errors.glAccountId = ""
                                                                values.glAccountId = selectedGl.value
                                                            }}
                                                            className={errors.glAccountId && touched.glAccountId ? "is-invalid" : null}

                                                            name="glAccountId"
                                                            required
                                                        />
                                                        {errors.glAccountId && touched.glAccountId ? (
                                                            <span className="invalid-feedback">{errors.glAccountId}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>







                                            <div className="form-ctas horizontal">
                                                <Button variant="success"
                                                    className="mr-20px"
                                                    type="submit"
                                                    disabled={requestTracker.is_request_processing}>
                                                    {requestTracker.is_request_processing ? "Please wait..." : "Save"}
                                                </Button>
                                                {/* <Button variant="light" type="button"> Cancel</Button> */}
                                            </div>
                                        </div>
                                    }
                                    {requestTracker.request_status === administrationConstants.INTER_BRANCHGL_ACTION_SUCCESS &&
                                        <Alert variant="success">
                                            {requestTracker.request_data.response.data.message}
                                        </Alert>
                                    }
                                    {requestTracker.request_status === administrationConstants.INTER_BRANCHGL_ACTION_FAILURE &&
                                        <Alert variant="danger">
                                            {requestTracker.request_data.error}
                                        </Alert>
                                    }
                                </Form>

                            )}
                        </Formik>

                    </div>
                )
    }

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
                                                <NavLink to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/txt-channels'}>Transaction Channels</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/customer-types'}>Client Types</NavLink>
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
                                                {this.renderInterBranchTrasferGlDetails()}
                                                
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
        getInterBranchTransferListReducer : state.administrationReducers.getInterBranchTransferListReducer,
        interbranchGlActionsReducer : state.administrationReducers.interbranchGlActionsReducer,
        
        adminGetOrganizationDetails : state.administrationReducers.adminGetOrganizationDetailsReducer,
        adminUpdateOrganizationDetails : state.administrationReducers.adminUpdateOrganizationDetailsReducer
    };
}

export default connect(mapStateToProps)(InterbranchGlAccounting);