import * as React from "react";

// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
// import Select from 'react-select';
import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import RemoveIco from '../../assets/img/remove_icon.png';
import { numberWithCommas } from "../../shared/utils";
import "./administration.scss"; 
class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            selectBranchesToAdd:[],
            selectTxtnLimitsToAdd:[],
            submitError:""
        }

        this.selectBranchesToAdd = [];
        this.selectBranchesList = [];

        this.selectTxtnLimitsToAdd = [];
        this.selectTxtnLimitsList = [];
        
    }
    selectRef = null;
    selectRef2 = null;

    componentDidMount() {

        // this.getAllPermissions();
        this.fetchUser(this.props.match.params.encodedKey);
    }

    fetchUser =(encodedKey)=>{
        this.props.dispatch(administrationActions.updateAUser("CLEAR"));
        this.getAUser(encodedKey)
            .then(()=>{
                if(this.props.adminGetAUserRequest.request_status === administrationConstants.GET_A_USER_SUCCESS){
                    let adminGetAUser = this.props.adminGetAUserRequest;
                    let userData = adminGetAUser.request_data.response.data;
                    
                    userData.branchAccessModels.map((eachItem, index)=>{
                        this.selectBranchesToAdd.push({label:eachItem.branchName, value: eachItem.branchEncodedKey})
                        this.selectBranchesList.push(eachItem.branchEncodedKey)
                    })

                    userData.transactionAccessRightModels.map((eachItem, index)=>{
                        let itemToUpdate =  {label: eachItem.name, value: eachItem.transactionAccessRightOptions, amount:eachItem.amount.toString()}

                        this.selectTxtnLimitsToAdd.push(itemToUpdate)
                        this.selectTxtnLimitsList.push({transactionAccessRightOptions:eachItem.transactionAccessRightOptions, amount: eachItem.amount})
                        
                        // this.selectBranchesToAdd.push({label:eachItem.branchName, value: eachItem.branchEncodedKey})
                        // this.selectBranchesList.push(eachItem.branchEncodedKey)
                    })

                    

                    this.setState({selectTxtnLimitsToAdd: this.selectTxtnLimitsToAdd})
                    this.setState({selectBranchesToAdd: this.selectBranchesToAdd})
                }
            })
    }

    getAUser =  async(encodedKey)=>{
        const {dispatch} = this.props;
       
        await dispatch(administrationActions.getAUser(encodedKey, true));
    }

    

    updateUserRequest = async (payload)=>{
        const {dispatch} = this.props;
        
        await dispatch(administrationActions.updateAUser(payload));
    }

    updateBranchList = (branchToUpdate, operation) =>{
        // console.log("branch info", branchToUpdate);
        if(operation==="add"){
            if(this.selectBranchesList.indexOf(branchToUpdate.value)===-1){
                this.selectBranchesToAdd.push(branchToUpdate)
                this.selectBranchesList.push(branchToUpdate.value)
                this.setState({selectBranchesToAdd: this.selectBranchesToAdd})
            }
        }
       
        

        if(operation==="remove"){
            // let idToRemove = branchToUpdate.value;
            let idToRemove = this.selectBranchesList.indexOf(branchToUpdate.value);
            let branchFiltered = this.selectBranchesToAdd.filter(branch=>branch.value!==branchToUpdate.value);
            // console.log("remove info", idToRemove);
            if (idToRemove !== -1) {
                this.selectBranchesList.splice(idToRemove, 1);
                this.selectBranchesToAdd = [];
                this.selectBranchesToAdd.push(...branchFiltered)
                this.setState({selectBranchesToAdd: this.selectBranchesToAdd})
            }
            
            // console.log("filtered info", this.selectBranchesToAdd);
            // this.selectBranchesToAdd.push(branchToAdd)
            
        }
        console.log("data returned", this.selectBranchesList);

    }

    updateLimitsList = (itemToUpdate, operation) =>{
       
        if(operation==="add"){
            let filteredItemsToAdd = this.selectTxtnLimitsList.filter(item=>item.transactionAccessRightOptions===parseInt(itemToUpdate.value));
            if(filteredItemsToAdd.length===0){
                // if(this.selectTxtnLimitsList.indexOf(itemToUpdate.value)===-1){
                this.selectTxtnLimitsToAdd.push(itemToUpdate)
                this.selectTxtnLimitsList.push({transactionAccessRightOptions:itemToUpdate.value, amount: parseFloat(itemToUpdate.amount.replace(/,/g, ''))})
                this.setState({selectTxtnLimitsToAdd: this.selectTxtnLimitsToAdd})
            }
        }
       
        

        if(operation==="remove"){
            // let idToRemove = itemToUpdate.value;
            // let idToRemove = this.selectTxtnLimitsList.indexOf(itemToUpdate.value);
            let idToRemove = this.selectTxtnLimitsList.filter(item=>item.transactionAccessRightOptions===parseInt(itemToUpdate.value));
            let itemFiltered = this.selectTxtnLimitsToAdd.filter(item=>item.value!==itemToUpdate.value);
            // console.log("remove info", idToRemove);
            
            // if (idToRemove.length >= 1) {
            // if (idToRemove !== -1) {
                this.selectTxtnLimitsList.splice(idToRemove[0], 1);
                this.selectTxtnLimitsToAdd = [];
                this.selectTxtnLimitsToAdd.push(...itemFiltered)
                this.setState({selectTxtnLimitsToAdd: this.selectTxtnLimitsToAdd})
            // }
            
            // console.log("filtered info", this.selectTxtnLimitsToAdd);
            // this.selectTxtnLimitsToAdd.push(branchToAdd)
        }


        
    }

    renderUpdateUserForm =(userData,roles, branches)=>{
        
        let adminUpdateAUserRequest = this.props.adminUpdateAUserRequest,
            allRoles =[],
            {submitError} = this.state,
            allBranches =[],
            updateUserValidationSchema = Yup.object().shape({
                firstName: Yup.string()
                    .min(2, 'Valid firstname required')
                    .max(40, 'Max limit reached')
                    .required('Required'),
                lastName: Yup.string()
                    .min(2, 'Valid lasttname required')
                    .max(40, 'Max limit reached')
                    .required('Required'),
                title: Yup.string()
                    .min(2, 'Valid title required')
                    .max(40, 'Max limit reached')
                    .required('Required'),
                roleId: Yup.string()
                    // .min(1, 'Valid Role required')
                    // .max(40, 'Max limit reached')
                    .required('Required'),
                addressLine1: Yup.string()
                    .min(2, 'Valid address required')
                    .max(100, 'Max limit reached'),
                addressLine2: Yup.string()
                    .min(2, 'Valid address required')
                    .max(100, 'Max limit reached'),
                addressCity: Yup.string()
                    .min(2, 'Valid address city required')
                    .max(100, 'Max limit reached'),
                addressState: Yup.string()
                    .min(2, 'Valid address state required')
                    .max(100, 'Max limit reached'),
                addressCountry: Yup.string()
                    .min(1, 'Valid address Country required')
                    .max(100, 'Max limit reached'),
                zipCode: Yup.string()
                    .min(2, 'Valid Zip Code  required')
                    .max(100, 'Max limit reached'),
                contactMobile: Yup.string()
                    .min(7, 'Valid Contact mobile  required')
                    .max(100, 'Max limit reached'),
                contactEmail: Yup.string()
                    .email('Valid email  required')
                    .max(100, 'Max limit reached'),
                userName: Yup.string()
                    .min(2, 'Valid Username  required')
                    .max(100, 'Max limit reached')
                    .required('Required'),
                emailAddress: Yup.string()
                    .email('Valid email  required')
                    .max(100, 'Max limit reached')
                    .required('Required'),
                password: Yup.string()
                    .min(2, 'Valid password  required')
                    .max(100, 'Max limit reached')
                    // .required('Required')
                    ,
                branchId: Yup.string()
                    // .min(1, 'Branch  required')
                    // .max(100, 'Max limit reached')
                    .required('Required'),
                // note:  Yup.string()
                //     .min(5, 'Provide detailed notes'),
            });
            
            let allLimits = [
                {
                    label: "Select",
                    value:""
                },
                {
                    label: "Approve Loan",
                    value:0
                },
                {
                    label: "Disburse Loan",
                    value:1
                },
                {
                    label: "Apply Fee",
                    value:2
                },
                {
                    label: "Make Deposit",
                    value:3
                },
                {
                    label: "Make Withdrawal",
                    value:4
                },
                {
                    label: "Make Repayment",
                    value:5
                },
                
            ];

            let allReturnedBranches = userData.branchAccessModels;

            // allReturnedBranches.map((eachItem, index)=>{
            //     this.selectBranchesToAdd.push({})
            // })
            roles.map((eachRole, index)=>{
                allRoles.push({value:eachRole.roleId, label:eachRole.name})
            })

            branches.map((eachBranch, index)=>{
                allBranches.push({value:eachBranch.encodedKey, id:eachBranch.id, label:eachBranch.name})
            })

            let currentRole = roles.filter(eachrole=>eachrole.roleId===userData.roleId)[0],
                userAddress=userData.address,
                userContact=userData.contact,
                currentBranch;
                if(userData.branchId!==null){
                    currentBranch = branches.filter(branch=>branch.id===userData.branchId)[0];
                }else{
                    currentBranch =null
                }
                

                

        return(
            <Formik
                initialValues={{
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    title: userData.title,
                    roleId: userData.roleId,
                    userIsTeller: userData.isTeller,
                    userIsAccountOfficer: userData.isAccountOfficer,
                    userIsAdministrator: userData.isAdministrator,
                    userIsPortalAdministrator: userData.isPortalAdministrator,
                    userHasApiAccessRight: userData.isAccountOfficer,
                    canAccessAllBranches: userData.canAccessAllBranches!==null? userData.canAccessAllBranches :false,
                    note: userData.notes.notes!==null?userData.notes.notes:'',
                    addressLine1: userAddress.addressLine1!==null?userAddress.addressLine1:'',
                    addressLine2: userAddress.addressLine2!==null?userAddress.addressLine2:'',
                    addressCity: userAddress.addressCity!==null?userAddress.addressCity:'',
                    addressState: userAddress.addressState!==null?userAddress.addressState:'',
                    addressCountry: userAddress.addressCountry!==null?userAddress.addressCountry:'',
                    zipCode: userAddress.zipCode!==null?userAddress.zipCode:'',
                    contactMobile: userContact.contactMobile!==null?userContact.contactMobile:'',
                    contactEmail: userContact.contactEmail!==null?userContact.contactEmail:'',
                    userName: userData.userName,
                    emailAddress: userData.emailAddress,
                    password: '',
                    amountLimit:'',
                    branchId: userData.branchId!==null? userData.branchId :'',
                }}
                // validateOnBlur={true}
                // validateOnChange={true}
                // validationSchema={updateUserValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    let allErrors = "";
                    if(values.canAccessAllBranches ===false && this.selectBranchesList.length===0){
                        allErrors += "Select allowed branches"
                    }else{
                        allErrors =""
                    }

                    // console.log("kjkhgh", )

                    this.setState({submitError:allErrors});
                    if (allErrors === "") {
                        let branchesChosen = [];
                        this.selectBranchesList.map(eachBranch=>branchesChosen.push({branchEncodedKey : eachBranch}))

                        let updateNewUserPayload = {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            title: values.title,
                            roleId: parseInt(values.roleId),
                            isAccountOfficer: values.userIsAccountOfficer,
                            isTeller: values.userIsTeller,
                            isApiAccess: values.userHasApiAccessRight,
                            isPortalAdministrator: values.userIsPortalAdministrator,
                            isAdministrator: values.userIsAdministrator,
                            contact:{
                                // contactMobile:values.contactMobile,
                                // contactEmail:values.contactEmail,
                            },
                            address:{
                                // addressLine1: values.addressLine1,
                                // addressLine2: values.addressLine2,
                                // addressCity: values.addressCity,
                                // addressState: values.addressState,
                                // addressCountry: values.addressCountry,
                                // zipCode: values.zipCode,
                            },
                            userName: values.userName,
                            emailAddress: values.emailAddress,
                            password: values.password,
                            branchId: values.branchId,
                            note: values.note,
                            encodedKey: this.props.match.params.encodedKey,
                            canAccessAllBranches: values.canAccessAllBranches !== "" ? values.canAccessAllBranches : null,
                            transactionAccessRightModels: this.selectTxtnLimitsList.length >= 1 ? this.selectTxtnLimitsList : null,
                            branchAccessModels: (values.canAccessAllBranches === true || this.selectBranchesList.length === 0) ? null : branchesChosen
                        };
                        if(values.addressLine1!==''){
                            updateNewUserPayload.address.addressLine1 =values.addressLine1;
                        }
                        if(values.addressLine2!==''){
                            updateNewUserPayload.address.addressLine2 =values.addressLine2;
                        }
                        if(values.addressCity!==''){
                            updateNewUserPayload.address.addressCity =values.addressCity;
                        }
                        if(values.addressState!==''){
                            updateNewUserPayload.address.addressState =values.addressState;
                        }
                        if(values.addressCountry!==''){
                            updateNewUserPayload.address.addressCountry =values.addressCountry;
                        }
                        if(values.zipCode!==''){
                            updateNewUserPayload.address.zipCode =values.zipCode;
                        }

                        if(values.contactMobile!==''){
                            updateNewUserPayload.contact.contactMobile =values.contactMobile;
                        }

                        if(values.contactEmail!==''){
                            updateNewUserPayload.contact.contactEmail =values.contactEmail;
                        }


                        // console.log("test values", updateNewUserPayload);

                        // return false;
                        

                        this.updateUserRequest(updateNewUserPayload)
                            .then(
                                () => {

                                    if (this.props.adminUpdateAUserRequest.request_status === administrationConstants.UPDATE_A_USER_SUCCESS) {


                                        setTimeout(() => {
                                            // this.props.dispatch(administrationActions.updateAUser("CLEAR"));
                                            // resetForm();
                                        }, 3000);
                                    } else {
                                        setTimeout(() => {
                                            // this.props.dispatch(administrationActions.updateAUser("CLEAR"))
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
                    values,
                    touched,
                    setFieldTouched,
                    setFieldValue,
                    isValid,
                    errors, }) => (
                        <Form noValidate 
                            onSubmit={handleSubmit} 
                            className="form-content card">
                            <div className="form-heading">
                                <h3>Editing {userData.name}</h3>
                            </div>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">First Names</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={handleChange}
                                        value={values.firstName}
                                        className={errors.firstName && touched.firstName ? "is-invalid": null}
                                        name="firstName" />
                                    {errors.firstName && touched.firstName ? (
                                        <span className="invalid-feedback">{errors.firstName}</span>
                                    ) : null}
                                </Col>
                                <Col>
                                    <Form.Label className="block-level">Last Name</Form.Label>
                                    <Form.Control type="text"
                                        onChange={handleChange}
                                        value={values.lastName}
                                        className={errors.lastName && touched.lastName ? "is-invalid": null}
                                        name="lastName" />
                                    {errors.lastName && touched.lastName ? (
                                        <span className="invalid-feedback">{errors.lastName}</span>
                                    ) : null}
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">Title</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={handleChange}
                                        value={values.title}
                                        className={errors.title && touched.title ? "is-invalid": null}
                                        name="title"  />
                                    {errors.title && touched.title ? (
                                        <span className="invalid-feedback">{errors.title}</span>
                                    ) : null}
                                </Col>
                                <Col>
                                    <Form.Label className="block-level">Role</Form.Label>
                                    <select id="roleId"
                                        onChange={handleChange}
                                        name="roleId"
                                        value={values.roleId}
                                        defaultValue={currentRole? currentRole.roleId : ""}
                                        className={errors.roleId && touched.roleId ? "is-invalid form-control form-control-sm h-38px" : "form-control form-control-sm h-38px"}
                                    >
                                        {
                                            allRoles.map((eachRole, index)=>{
                                                return(
                                                    <option key={index} value={eachRole.value}>{eachRole.label}</option>
                                                )
                                            })
                                        }
                                        
                                    </select>
                                    {errors.roleId && touched.roleId ? (
                                        <span className="invalid-feedback">{errors.roleId}</span>
                                    ) : null}
                                    {/* <Select
                                        options={allRoles}
                                        defaultValue ={{
                                                        label: currentRole? currentRole.name : null, 
                                                        value: currentRole? currentRole.roleId : null
                                                    }}
                                        onChange={(selectedRole) => {
                                            setFieldValue('roleId', selectedRole.value)
                                            this.setState({ selectedRole });
                                            errors.roleId = null
                                            values.roleId = selectedRole.value
                                            
                                        }}
                                        onBlur={() => setFieldTouched('roleId', true)}
                                        className={errors.roleId && touched.roleId ? "is-invalid" : null}
                                        name="roleId"
                                        
                                    />
                                    {errors.roleId && touched.roleId ? (
                                        <span className="invalid-feedback">{errors.roleId}</span>
                                    ) : null}  */}
                                    
                                </Col>
                            </Form.Row>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    User Rights
                                                        </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        <Form.Row>

                                            <Col>
                                                <Form.Label>Type</Form.Label>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="userIsAdministrator" 
                                                        checked={values.userIsAdministrator? values.userIsAdministrator:null}
                                                        name="userIsAdministrator"
                                                        onChange={handleChange} 
                                                        value={values.userIsAdministrator}  />
                                                    <label htmlFor="userIsAdministrator">Administrator</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="userIsTeller" 
                                                        checked={values.userIsTeller? values.userIsTeller:null}
                                                        name="userIsTeller"
                                                        onChange={handleChange} 
                                                        value={values.userIsTeller} />
                                                    <label htmlFor="userIsTeller">Teller</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="userIsAccountOfficer" 
                                                        checked={values.userIsAccountOfficer? values.userIsAccountOfficer:null}
                                                        name="userIsAccountOfficer"
                                                        onChange={handleChange} 
                                                        value={values.userIsAccountOfficer}/>
                                                    <label htmlFor="userIsAccountOfficer">Account Officer</label>
                                                </div>
                                            </Col>
                                            <Col>
                                                {/* <Form.Label>Access Rights</Form.Label> */}
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="userIsPortalAdministrator" 
                                                        checked={values.userIsPortalAdministrator? values.userIsPortalAdministrator:null}
                                                        name="userIsPortalAdministrator"
                                                        onChange={handleChange} 
                                                        value={values.userIsPortalAdministrator} />
                                                    <label htmlFor="userIsPortalAdministrator">Portal Administrator</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                            id="userHasApiAccessRight" 
                                                            checked={values.userHasApiAccessRight? values.userHasApiAccessRight:null}
                                                            name="userHasApiAccessRight"
                                                            onChange={handleChange} 
                                                            value={values.userHasApiAccessRight} />
                                                    <label htmlFor="userHasApiAccessRight">API Access</label>
                                                </div>
                                            </Col>
                                        </Form.Row>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Transation Limits
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div className="each-formsection">
                                        
                                        {/* <Form.Row> */}
                                        
                                        <div className="wrap-selection">
                                            <div className="option-select flexed">
                                                <div className="maininfo">
                                                    <Form.Label className="block-level">Select Transaction</Form.Label>
                                                    <Select
                                                        options={allLimits}
                                                        ref={ref => {
                                                            this.selectRef = ref;
                                                        }}
                                                        onChange={(limitToAdd) => {
                                                            this.setState({ limitToAdd });
                                                            if(limitToAdd){
                                                                errors.limitToAdd = null
                                                                values.limitToAdd = limitToAdd.value
                                                            }
                                                        }}
                                                        className={errors.limitToAdd && touched.limitToAdd ? "is-invalid h-38px" : "h-38px"}
                                                        // value="limitToAdd"
                                                        name="limitToAdd"
                                                        // value={values.branchToAdd || ''}
                                                        required
                                                    />
                                                    {errors.limitToAdd && touched.limitToAdd ? (
                                                        <span className="invalid-feedback">{errors.limitToAdd}</span>
                                                    ) : null}
                                                </div>
                                                <div className="other-info-wrapper">
                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={(e)=> {
                                                            this.setState({amountLimitError: false})
                                                            setFieldValue("amountLimit", e.target.value)
                                                        }}
                                                        value={numberWithCommas(values.amountLimit)}
                                                        className={((errors.amountLimit && touched.amountLimit) || this.state.amountLimitError===true) ? "is-invalid h-38px": "h-38px"}
                                                        name="amountLimit"  />
                                                    {/* {errors.amountLimit && touched.amountLimit ? (
                                                        <span className="invalid-feedback">{errors.amountLimit}</span>
                                                    ) : null} */}
                                                </div>
                                            </div>
                                            <div className="add-option-cta">
                                                <Button variant="success" 
                                                    className="btn btn-secondary"
                                                    onClick={()=>{
                                                        
                                                        if(this.state.limitToAdd && values.amountLimit!=="" && values.amountLimit!==undefined){
                                                            this.setState({amountLimitError: false})
                                                            // errors.amountLimit = false;
                                                            this.updateLimitsList({...this.state.limitToAdd,amount: values.amountLimit}, "add")
                                                            setFieldValue("amountLimit", "");
                                                            this.selectRef.select.clearValue();
                                                            
                                                        }else{
                                                            this.setState({amountLimitError: true})
                                                            // errors.amountLimit = true;
                                                            // touched.amountLimit = true;
                                                        }
                                                    }}
                                                >
                                                    Add Limit
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        
                                            <div className="options-list">
                                                <div className="title-txt">All Transaction Limits</div>
                                                <div className="each-option-wrap">
                                                    {this.selectTxtnLimitsList.length>=1 && 
                                                        <div>
                                                            {
                                                                this.state.selectTxtnLimitsToAdd.map((eachItem, index) => {
                                                                    return (
                                                                        <div className="each-option-added" key={index}>
                                                                            <div className="each-option-txt">{eachItem.label} (Limit:{numberWithCommas(eachItem.amount, true)})</div>
                                                                            <div className="remove-option-cta" onClick={() => this.updateLimitsList(eachItem, "remove")}> <img src={RemoveIco} alt=""/></div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                    
                                                </div>
                                            </div>
                                        
                                            
                                        {/* </Form.Row> */}
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>


                           
                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Contact
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Mobile Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.contactMobile}
                                                    className={errors.contactMobile && touched.contactMobile ? "is-invalid": null}
                                                    name="contactMobile" />
                                                    {errors.contactMobile && touched.contactMobile ? (
                                                        <span className="invalid-feedback">{errors.contactMobile}</span>
                                                    ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Email Address</Form.Label>
                                                <Form.Control type="email"
                                                    onChange={handleChange}
                                                    value={values.contactEmail}
                                                    className={errors.contactEmail && touched.contactEmail ? "is-invalid": null}
                                                    name="contactEmail" />
                                                {errors.contactEmail && touched.contactEmail ? (
                                                    <span className="invalid-feedback">{errors.contactEmail}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            
                                            <Col>
                                                <Form.Label className="block-level">Address Line1</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressLine1}
                                                    className={errors.addressLine1 && touched.addressLine1 ? "is-invalid" : null}
                                                    name="addressLine1" />
                                                {errors.addressLine1 && touched.addressLine1 ? (
                                                    <span className="invalid-feedback">{errors.addressLine1}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                            <Form.Label className="block-level">Address Line2</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressLine2}
                                                    className={errors.addressLine2 && touched.addressLine2 ? "is-invalid" : null}
                                                    name="addressLine2" />
                                                {errors.addressLine2 && touched.addressLine2 ? (
                                                    <span className="invalid-feedback">{errors.addressLine2}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            
                                            <Col>
                                                <Form.Label className="block-level">Address City</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressCity}
                                                    className={errors.addressCity && touched.addressCity ? "is-invalid" : null}
                                                    name="addressCity" />
                                                {errors.addressCity && touched.addressCity ? (
                                                    <span className="invalid-feedback">{errors.addressCity}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                            <Form.Label className="block-level">Address State</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressState}
                                                    className={errors.addressState && touched.addressState ? "is-invalid" : null}
                                                    name="addressState" />
                                                {errors.addressState && touched.addressState ? (
                                                    <span className="invalid-feedback">{errors.addressState}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            
                                            <Col>
                                                <Form.Label className="block-level">Address Country</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressCountry}
                                                    className={errors.addressCountry && touched.addressCountry ? "is-invalid" : null}
                                                    name="addressCountry" />
                                                {errors.addressCountry && touched.addressCountry ? (
                                                    <span className="invalid-feedback">{errors.addressCountry}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                            <Form.Label className="block-level">Zip Code</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.zipCode}
                                                    className={errors.zipCode && touched.zipCode ? "is-invalid" : null}
                                                    name="zipCode" />
                                                {errors.zipCode && touched.zipCode ? (
                                                    <span className="invalid-feedback">{errors.zipCode}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Login Details
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.userName}
                                                    className={errors.userName && touched.userName ? "is-invalid": null}
                                                    name="userName" />
                                                    {errors.userName && touched.userName ? (
                                                        <span className="invalid-feedback">{errors.userName}</span>
                                                    ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">User Email Address</Form.Label>
                                                <Form.Control type="email"
                                                    onChange={handleChange}
                                                    value={values.emailAddress}
                                                    className={errors.emailAddress && touched.emailAddress ? "is-invalid": null}
                                                    name="emailAddress" />
                                                {errors.emailAddress && touched.emailAddress ? (
                                                    <span className="invalid-feedback">{errors.emailAddress}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            
                                            <Col>
                                                <Form.Label className="block-level">Password</Form.Label>
                                                <Form.Control 
                                                    type="password"
                                                    onChange={(e)=> {
                                                        
                                                        setFieldValue("password", "")
                                                    }}
                                                    value={values.password}
                                                    disabled = {true}
                                                    className={errors.password && touched.password ? "is-invalid" : null}
                                                    name="password" />
                                                {errors.password && touched.password ? (
                                                    <span className="invalid-feedback">{errors.password}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Branch</Form.Label>
                                                <select id="branchId"
                                                    onChange={handleChange}
                                                    name="branchId"
                                                    value={values.branchId}
                                                    defaultValue={currentBranch? currentBranch.id:""}
                                                    className={errors.branchId && touched.branchId ? "is-invalid form-control form-control-sm h-38px" : "form-control form-control-sm h-38px"}
                                                >
                                                    {
                                                        allBranches.map((eachBranch, index) => {
                                                            return (
                                                                <option key={index} value={eachBranch.id}>{eachBranch.label}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                                {errors.branchId && touched.branchId ? (
                                                    <span className="invalid-feedback">{errors.branchId}</span>
                                                ) : null}
                                                {/* <Select
                                                    options={allBranches}
                                                    defaultValue ={{label:currentBranch!==null?currentBranch.name:null, 
                                                                    value:currentBranch!==null? currentBranch.id:null}}
                                                    onChange={(selectedBranch) => {
                                                        setFieldValue('branchId', selectedBranch.value)
                                                        this.setState({ selectedBranch });
                                                        errors.branchId = null
                                                        values.branchId = selectedBranch.value;
                                                        
                                                        
                                                    }}
                                                    onBlur={() => setFieldTouched('branchId', true)}
                                                    className={errors.branchId && touched.branchId ? "is-invalid" : null}
                                                    
                                                    name="branchId"
                                                    
                                                />
                                                {errors.branchId && touched.branchId ? (
                                                    <span className="invalid-feedback">{errors.branchId}</span>
                                                ) : null}  */}
                                            </Col>
                                        </Form.Row>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>
                            
                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Access Rights
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div className="each-formsection">
                                        <Form.Row>
                                            <Col>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="canAccessAllBranches" 
                                                        checked={values.canAccessAllBranches? values.canAccessAllBranches:null}
                                                        name="canAccessAllBranches"
                                                        onChange={handleChange} 
                                                        value={values.canAccessAllBranches}  />
                                                    <label className="mb-0" htmlFor="canAccessAllBranches">Can access all branches</label>
                                                </div>
                                            </Col>
                                            <Col></Col>
                                        </Form.Row>
                                        {/* <Form.Row> */}
                                        {values.canAccessAllBranches===false &&
                                            <div className="wrap-selection">
                                                <div className="option-select">
                                                    <Form.Label className="block-level">Branch</Form.Label>
                                                    <Select
                                                        options={allBranches}
                                                        ref={ref => {
                                                            this.selectRef2 = ref;
                                                        }}
                                                        onChange={(branchToAdd) => {
                                                            this.setState({ branchToAdd });
                                                            if(branchToAdd){
                                                                errors.branchToAdd = null
                                                                values.branchToAdd = branchToAdd.value
                                                            }
                                                        }}
                                                        className={errors.branchToAdd && touched.branchToAdd ? "is-invalid" : null}
                                                        // value="branchToAdd"
                                                        name="branchToAdd"
                                                        // value={values.branchToAdd || ''}
                                                        required
                                                    />
                                                    {errors.branchToAdd && touched.branchToAdd ? (
                                                        <span className="invalid-feedback">{errors.branchToAdd}</span>
                                                    ) : null}
                                                </div>
                                                <div className="add-option-cta">
                                                    <Button variant="success" 
                                                        className="btn btn-secondary"
                                                        onClick={()=>{
                                                            if(this.state.branchToAdd){
                                                                this.setState({submitError:""})
                                                                this.updateBranchList(this.state.branchToAdd, "add")
                                                                this.selectRef2.select.clearValue();
                                                            }
                                                        }}
                                                    >
                                                        Add branch
                                                    </Button>
                                                </div>
                                            </div>
                                        }
                                        {values.canAccessAllBranches===false &&
                                            <div className="options-list">
                                                <div className="title-txt">Branch Access</div>
                                                <div className="each-option-wrap">
                                                    {this.selectBranchesList.length>=1 && 
                                                        <div>
                                                            {
                                                                this.state.selectBranchesToAdd.map((eachBranch, index) => {
                                                                    return (
                                                                        <div className="each-option-added" key={index}>
                                                                            <div className="each-option-txt">{eachBranch.label}</div>
                                                                            <div className="remove-option-cta" onClick={() => this.updateBranchList(eachBranch, "remove")}> <img src={RemoveIco} alt=""/></div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                    
                                                </div>
                                                {submitError!=="" && <div className="errormsg">{submitError}</div>}
                                            </div>
                                        }
                                            
                                        {/* </Form.Row> */}
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>
                            

                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Notes
                                                        </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div className="each-formsection">
                                        <Form.Group>
                                            <Form.Control 
                                                as="textarea" rows="3"
                                                onChange={handleChange}
                                                value={values.note}
                                                className={errors.note && touched.note ? "is-invalid" : null}
                                                name="note"
                                            />
                                            {errors.note && touched.note ? (
                                                <span className="invalid-feedback">{errors.note}</span>
                                            ) : null}
                                        </Form.Group>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>



                            <div className="footer-with-cta toleft">
                                {/* <Button variant="secondary" className="grayed-out">Cancel</Button> */}
                                {/* <NavLink to={'/administration/access/users'} className="btn btn-secondary grayed-out">Cancel</NavLink> */}
                                <Button variant="light" 
                                                        className="btn btn-secondary grayed-out"
                                                        onClick={()=>this.props.history.goBack()}
                                                >
                                                    Cancel</Button>
                                <Button 
                                    type="submit"
                                    disabled={adminUpdateAUserRequest.is_request_processing} 
                                    className="mr-20">{adminUpdateAUserRequest.is_request_processing?'Please wait...': 'Update User'}</Button>
                            </div>
                            {adminUpdateAUserRequest.request_status === administrationConstants.UPDATE_A_USER_SUCCESS && 
                                <Alert variant="success">
                                    {adminUpdateAUserRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {adminUpdateAUserRequest.request_status === administrationConstants.UPDATE_A_USER_FAILURE && 
                                <Alert variant="danger">
                                    {adminUpdateAUserRequest.request_data.error}
                            
                                </Alert>
                            }
                            {submitError!=="" &&
                                <Alert variant="danger">
                                    {submitError}
                                </Alert>
                            }
                        </Form>
                    )}
            </Formik>
        )
    }

    renderUpdateUser = ()=>{
        let adminGetAUser = this.props.adminGetAUserRequest;
            switch (adminGetAUser.request_status){
                case (administrationConstants.GET_A_USER_PENDING):
                    return (
                        <div className="loading-content"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                
                case(administrationConstants.GET_A_USER_SUCCESS):
                    let userData = adminGetAUser.request_data.response.data,
                        rolesDataData = adminGetAUser.request_data.response2.data,
                        branchesData = adminGetAUser.request_data.response3.data;
                        if(rolesDataData!==undefined && branchesData!==undefined){
                            if(rolesDataData.length>=1){
                                if(branchesData.length>=1){
                                    return(
                                        this.renderUpdateUserForm(userData, rolesDataData, branchesData)
                                    )
                                }else{
                                    return(
                                        <div className="no-records">
                                            No Branches has been created
                                            <div className="footer-with-cta centered">
                                                <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">Add Role</NavLink>
                                            </div>
                                        </div>
                                    )
                                }
                            }else{
                                return(
                                    <div className="no-records">
                                        No Role has been created
                                        <div className="footer-with-cta centered">
                                            <NavLink to={'/administration/access/new-role'} className="btn btn-primary">Add Role</NavLink>
                                        </div>
                                    </div>
                                )
                            }

                        }else{
                            return null;
                        }
                case (administrationConstants.GET_A_USER_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{adminGetAUser.request_data.error}</div>
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
                    <div className="content-wrapper">
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="full-pageforms w-60">
                                               {this.renderUpdateUser()}
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
        adminGetAUserRequest : state.administrationReducers.adminGetAUserReducer,
        adminUpdateAUserRequest : state.administrationReducers.adminUpdateAUserReducer,
        
    };
}

export default connect(mapStateToProps)(EditUser);