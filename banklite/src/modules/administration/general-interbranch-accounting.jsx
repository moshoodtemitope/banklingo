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
        this.getOrganizationDetails();
        this.getInterBranchGLs()
    }

    getOrganizationDetails = ()=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getOrganizationDetails());
    }

    

    showNew =()=>{
        this.setState({showNewConfig: true})
    }
    hideNew =()=>{
        this.setState({showNewConfig: false})
    }


    getInterBranchGLs = ()=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getInterBranchTransferList());
    }

    processInterbranchGlActions = async (payload,action)=>{
        const {dispatch} = this.props;

        await dispatch(administrationActions.interbranchGlActions(payload, action));
    }

    renderInterBranchTrasferGlDetails =()=>{
        let getInterBranchTransferListRequest = this.props.getInterBranchTransferListReducer;
        
        switch (getInterBranchTransferListRequest.request_status){
            case (administrationConstants.GET_ALL_INTER_BRANCH_GL_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )

            case(administrationConstants.GET_ALL_INTER_BRANCH_GL_SUCCESS):
                let organizationDetails = getInterBranchTransferListRequest.request_data.response.data,
                    interbranchGLs = getInterBranchTransferListRequest.request_data.response2.data,
                    adminUpdateOrganizationDetailsRequest = this.props.adminUpdateOrganizationDetails,
                orgDetailsValidationSchema = Yup.object().shape({
                    institutionName: Yup.string()
                      .min(2, 'Min of two characters')
                      .max(50, 'Max Limit reached')
                      .required('Please provide name'),
                   
                });
                    if(interbranchGLs!==""){
                        return(
                            <div>
                               
                                <Formik
                                    initialValues={{
                                        
                                    }}
                                    validationSchema={orgDetailsValidationSchema}
                                    onSubmit={(values, { resetForm }) => {
                                        let updateOrgPayload = {
                                            email: values.institutionEmail,
                                            organizationName: values.institutionName,
                                            streetAddress: values.streetAddress,
                                            city: values.institutionCity,
                                            state: values.institutionState,
                                            country: values.institutionCountry,
                                            localDateFormat: values.institutionDateFormat,
                                            localDateTimeFormat: values.institutionDateTimeFormat,
                                        };

                                        this.updateOrgDetails(updateOrgPayload)
                                            .then(
                                                () => {
                                                    // resetForm();
                                                    setTimeout(() => {
                                                        // this.getOrganizationDetails();
                                                        this.props.dispatch(administrationActions.updateOrganizationDetails("CLEAR"))
                                                    }, 3000);

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
                                        <Form
                                            className="form-content w-60 card"
                                            noValidate
                                            onSubmit={handleSubmit}>

                                             <div className="normal-heading">Inter-Branch Transfer GL Account Rules</div>

                                             <Form.Row>
                                                <Col>
                                                    
                                                </Col>
                                                 <Col>
                                                 </Col>
                                                 <Col>
                                                 </Col>
                                             </Form.Row>

                                            <Form.Group controlId="institutionName">
                                                <Form.Label className="block-level">Institution Name</Form.Label>
                                                <Form.Control
                                                    name="institutionName"
                                                    onChange={handleChange}
                                                    value={values.institutionName}
                                                    className={errors.institutionName && touched.institutionName ? "is-invalid" : null}
                                                    type="text" />

                                                {errors.institutionName && touched.institutionName ? (
                                                    <span className="invalid-feedback">{errors.institutionName}</span>
                                                ) : null}
                                            </Form.Group>
                                            
                                           
                                            
                                            <div className="form-ctas horizontal">
                                                <Button variant="success"
                                                    className="mr-20px"
                                                    type="submit"
                                                    disabled={adminUpdateOrganizationDetailsRequest.is_request_processing}>
                                                    {adminUpdateOrganizationDetailsRequest.is_request_processing ? "Please wait..." : "Update"}
                                                </Button>
                                                {/* <Button variant="light" type="button"> Cancel</Button> */}
                                            </div>
                                            {adminUpdateOrganizationDetailsRequest.request_status === administrationConstants.UPDATE_ORGANIZATION_DETAILS_SUCCESS &&
                                                <Alert variant="success">
                                                    {adminUpdateOrganizationDetailsRequest.request_data.response.data.message}
                                                </Alert>
                                            }
                                            {adminUpdateOrganizationDetailsRequest.request_status === administrationConstants.UPDATE_ORGANIZATION_DETAILS_FAILURE &&
                                                <Alert variant="danger">
                                                    {adminUpdateOrganizationDetailsRequest.request_data.error}
                                                </Alert>
                                            }
                                        </Form>

                                    )}
                                </Formik>

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
                    <div className="loading-content errormsg"> 
                        <div>{getInterBranchTransferListRequest.request_data.error}</div>
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
                    currencyList=[{label:"", value:""}],
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
                                    console.log("here", interbranchPayload);

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
                                                    }, 3000);
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
                                    className="form-content w-60 card no-mb"
                                    noValidate
                                    onSubmit={handleSubmit}>

                                     <div className="normal-heading">Inter-Branch Transfer GL Account Rules</div>

                                     <Form.Row className="vertical-center">
                                        <Col>
                                            {allConfigs !=="" &&
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
                                             {allConfigs ==="" &&
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
                                            {allConfigs ==="" &&
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
                                                {this.state.showNewConfig && this.renderNewInterBranchTransferGl()}
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