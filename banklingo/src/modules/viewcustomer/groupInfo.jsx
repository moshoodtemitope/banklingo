import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'

import  ActivitiesBox from '../../shared/elements/activities'
import PictureIco from '../../assets/img/picture.svg';
// import  SidebarElement from '../../shared/elements/sidebar'
import "./customerprofile.scss";
import { numberWithCommas, getDateFromISO} from '../../shared/utils';

import {CustomerAccountSummarySection} from "./components/customer-account-summary-component";
import {ContactInformationSection} from "./components/customer-contact-information-component";

import {GeneralInfomationSection} from "./components/customer-general-information-component";



import Alert from 'react-bootstrap/Alert'
import {clientsActions} from '../../redux/actions/clients/clients.action';

import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'

class ViewGroupCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:JSON.parse(localStorage.getItem('lingoAuth')),
            FullDetails:true,
            PageSize: 100,
            CurrentPage: 1,
            showAddSignature:false,
            invalidImageUpload:false,
            // previewSignatureStyles:""
        }
        // console.log('props are', this.props.match.params)
    }

    componentDidMount() {
        this.loadInitialCustomerData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {

            this.clientEncodedKey = nextProps.match.params.id;
        }

    }

    loadInitialCustomerData = ()=>{
        let { PageSize, CurrentPage,FullDetails } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&FullDetails=${FullDetails}`;

        this.getClientActivities(this.clientEncodedKey, params);
    }


    getClientActivities = (clientEncodedKey, params)=>{
        const {dispatch} = this.props;

        dispatch(clientsActions.getAClientActivities(clientEncodedKey, params));
    }

    closeAddSignature = ()=> {
        this.props.dispatch(clientsActions.addAClientSignature(null,"CLEAR"))
        this.setState({showAddSignature: false, previewSignatureStyles:null})
    }

    displayAddSignature = ()=> {
        this.setState({showAddSignature: true})
    }

    closeAddPhoto = ()=> {
        this.props.dispatch(clientsActions.addAClientSignature(null,"CLEAR"))
        this.setState({showAddPhoto: false, previewPhotoStyles:null})
    }

    displayAddPhoto = ()=> {
        this.setState({showAddPhoto: true})
    }

    uploadSignatureRequest = ()=>{
        const {dispatch} = this.props;
        let params = {
            base64String: this.state.imageData
        }
        dispatch(clientsActions.addAClientSignature(this.clientEncodedKey, params));
    }

    uploadPhotoRequest = ()=>{
        const {dispatch} = this.props;
        let params = {
            base64String: this.state.imageData
        }
        dispatch(clientsActions.addAClientPassport(this.clientEncodedKey, params));
    }

    isFileImage=(file)=> {
        const acceptedImageTypes = ['image/jpeg', 'image/png'];
     
        return file && acceptedImageTypes.includes(file['type'])
    }

    HandleSignatureUpLoad = (event) => {
        const file = document.getElementById('photo-upload').files[0];
        // this.setState({previewStyles: ""})
        if(this.isFileImage(file)){
            this.setState({docuploaded: event.target.files[0]});
        
        
        
            this.setState({invalidImageUpload:false})
            const reader = new FileReader();
            
            let preViewStyle;
            reader.addEventListener("load",  ()=> {
                

                preViewStyle = {
                    background: `url(${reader.result})`,
                    height:'150px',
                    width:'150px',
                    backgroundSize: `100% 100%`,
                    backgroundPosition: `center center`,
                    backgroundRepeat: `no-repeat`
                }
                
                this.setState({previewSignatureStyles:preViewStyle, imageData: reader.result})
            }, false);

            
            if (file) {
                reader.readAsDataURL(file);
            }
        }else{
            this.setState({invalidImageUpload:true})
        }
        
    }

    HandlePhotoUpLoad = (event) => {
        const file = document.getElementById('photo-upload').files[0];
        // this.setState({previewStyles: ""})
        if(this.isFileImage(file)){
            this.setState({docuploaded: event.target.files[0]});
        
        
        
            this.setState({invalidImageUpload:false})
            const reader = new FileReader();
            
            let preViewStyle;
            reader.addEventListener("load",  ()=> {
                

                preViewStyle = {
                    background: `url(${reader.result})`,
                    height:'150px',
                    width:'150px',
                    backgroundSize: `100% 100%`,
                    backgroundPosition: `center center`,
                    backgroundRepeat: `no-repeat`
                }
                
                this.setState({previewPhotoStyles:preViewStyle, imageData: reader.result})
            }, false);

            
            if (file) {
                reader.readAsDataURL(file);
            }
        }else{
            this.setState({invalidImageUpload:true})
        }
        
    }

    renderUploadSignature = ()=>{
        
        let addAClientSignatureReducer =  this.props.addAClientSignatureReducer;
                
                
        let {previewSignatureStyles, invalidImageUpload} = this.state;
                
                    
            return(
                <div className="slidein-wrap">
                    <div className="slide-wrap-overlay"></div>
                    <div className="slidein-form" ref={this.setWrapperRef}>
                        <div className="slide-in-heading">
                            <h3>Upload Signature</h3> 
                            <div className="close-slidein" onClick={this.closeAddSignature}>X</div>
                        </div>
                        
                        <div className="slidein-formwrap">
                            
                            <div className="upload-wrap">
                                
                                <label htmlFor="photo-upload" className="upload-photo" style={previewSignatureStyles}>
                                    {!previewSignatureStyles &&
                                        <div>
                                            Upload Passport Photo
                                            </div>
                                    }

                                </label>
                                {previewSignatureStyles && <small>Click the photo to upload another one</small>}
                                <input type="file" name="" accept="image/*" id="photo-upload" onChange={this.HandleSignatureUpLoad} />
                                
                                {invalidImageUpload &&
                                    <Alert variant="danger">
                                        Please upload a valid image
                                    </Alert>
                                }
                            </div>
                       
                            <div className="footer-with-cta mb-20">
                                {addAClientSignatureReducer.request_status !== clientsConstants.ADD_A_CLIENT_SIGNATURE_SUCCESS && 
                                    <Button
                                        type="submit"
                                        disabled={addAClientSignatureReducer.is_request_processing}
                                        onClick = {()=>{
                                            if(previewSignatureStyles && !invalidImageUpload){
                                                this.uploadSignatureRequest()
                                            }
                                        }}
                                    >
                                        
                                        {addAClientSignatureReducer.is_request_processing ? "Please wait..." : "Upload"}
                                    </Button>
                                }
                                <Button variant="secondary" 
                                    disabled={addAClientSignatureReducer.is_request_processing}
                                    onClick={this.closeAddSignature}>
                                    Cancel
                                </Button>
                            </div>
                                    
                            {addAClientSignatureReducer.request_status === clientsConstants.ADD_A_CLIENT_SIGNATURE_SUCCESS && 
                                <Alert variant="success">
                                    {addAClientSignatureReducer.request_data.response.data.message && addAClientSignatureReducer.request_data.response.data.message}
                                    {!addAClientSignatureReducer.request_data.response.data.message && "Signature was uploaded"}
                                </Alert>
                            }
                            {addAClientSignatureReducer.request_status === clientsConstants.ADD_A_CLIENT_SIGNATURE_FAILURE && 
                                <Alert variant="danger">
                                    {addAClientSignatureReducer.request_data.error}
                                </Alert>
                            }
                                        
                        </div>
                    </div>
                </div>
            )
        
    }

    renderUploadPhoto = ()=>{
        
        let addAClientPassportReducer =  this.props.addAClientPassportReducer;
                
                
        let {previewPhotoStyles, invalidImageUpload} = this.state;
                
                    
            return(
                <div className="slidein-wrap">
                    <div className="slide-wrap-overlay"></div>
                    <div className="slidein-form" ref={this.setWrapperRef}>
                        <div className="slide-in-heading">
                            <h3>Upload Photo</h3> 
                            <div className="close-slidein" onClick={this.closeAddPhoto}>X</div>
                        </div>
                        
                        <div className="slidein-formwrap">
                            
                            <div className="upload-wrap">
                                
                                <label htmlFor="photo-upload" className="upload-photo" style={previewPhotoStyles}>
                                    {!previewPhotoStyles &&
                                        <div>
                                            Upload Photo
                                            </div>
                                    }

                                </label>
                                {previewPhotoStyles && <small>Click the photo to upload another one</small>}
                                <input type="file" name="" accept="image/*" id="photo-upload" onChange={this.HandlePhotoUpLoad} />
                                
                                {invalidImageUpload &&
                                    <Alert variant="danger">
                                        Please upload a valid image
                                    </Alert>
                                }
                            </div>
                       
                            <div className="footer-with-cta mb-20">
                                {addAClientPassportReducer.request_status !== clientsConstants.ADD_A_CLIENT_PASSPORT_SUCCESS && 
                                    <Button
                                        type="submit"
                                        disabled={addAClientPassportReducer.is_request_processing}
                                        onClick = {()=>{
                                            if(previewPhotoStyles && !invalidImageUpload){
                                                this.uploadPhotoRequest()
                                            }
                                        }}
                                    >
                                        
                                        {addAClientPassportReducer.is_request_processing ? "Please wait..." : "Upload"}
                                    </Button>
                                }
                                <Button variant="secondary" 
                                    disabled={addAClientPassportReducer.is_request_processing}
                                    onClick={this.closeAddPhoto}>
                                    Cancel
                                </Button>
                            </div>
                                    
                            {addAClientPassportReducer.request_status === clientsConstants.ADD_A_CLIENT_PASSPORT_SUCCESS && 
                                <Alert variant="success">
                                    {addAClientPassportReducer.request_data.response.data.message && addAClientPassportReducer.request_data.response.data.message}
                                    {!addAClientPassportReducer.request_data.response.data.message && "Photo was uploaded"}
                                </Alert>
                            }
                            {addAClientPassportReducer.request_status === clientsConstants.ADD_A_CLIENT_PASSPORT_FAILURE && 
                                <Alert variant="danger">
                                    {addAClientPassportReducer.request_data.error}
                                </Alert>
                            }
                                        
                        </div>
                    </div>
                </div>
            )
        
    }

    renderCustomerActivities =()=>{
        let getAClientActivitiesRequest = this.props.getAClientActivitiesReducer;


        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING){
            return(
                <div className="loading-text">Please wait... </div>
            )
        }


        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_SUCCESS){
            let customerActivitiesData = getAClientActivitiesRequest.request_data.response.data;
            if(customerActivitiesData.result.length>=1){
                return(
                    <div className="activities-wrap">

                        {
                            customerActivitiesData.result.map((eachActivity,  index)=>{
                                return(
                                    <div className="each-activity" key={index}>
                                        <span>
                                            {/* <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink> */}
                                        </span>
                                        <span className="activity-action">{eachActivity.action}</span>
                                        <div>
                                            <span className="action-date">{eachActivity.creationDate}</span>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }else{
                return(
                    <div className="activities-wrap">
                        <div>No activities to display</div>
                    </div>
                )
            }
        }



        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_FAILURE){

            return(
                <div className="loading-content errormsg">
                <div>{getAClientActivitiesRequest.request_data.error}</div>
            </div>
            )
        }
    }

    renderPage = ()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){


                    let   customerLoanAccounts = getClientLoansRequest.request_data.response.data;
                    let   customerDepositAccounts = getClientDepositsRequest.request_data.response.data;
                    let getAClientRequest = this.props.getAClientReducer;
                    let customerDetails = getAClientRequest.request_data.response.data;
                    let passport = getAClientRequest.request_data.response.base64Image,
                        manadateData = getAClientRequest.request_data.response.mandate,
                        passportStyle="";

                        if(passport!==null){
                            passportStyle = {
                                background: `url(data:image/png;base64,${passport})`,
                                height:'100px',
                                backgroundSize: `100% 100%`,
                                backgroundPosition: `center center`,
                                backgroundRepeat: `no-repeat`
                            }
                        }
                    let customerTypeVal = this.state.user.custTypes.filter(eachType=>eachType.id===customerDetails.clientTypeId)[0];
                    
                    return(
                        <div className="row">
                            {this.state.showAddSignature && this.renderUploadSignature()}
                            {this.state.showAddPhoto && this.renderUploadPhoto()}


                            <div className="col-sm-12">
                                <div className="middle-content">
                                    <div className="row">
                                        <div className="col-sm-8">

                                            <CustomerAccountSummarySection customerLoanAccounts={customerLoanAccounts} customerDepositAccounts={customerDepositAccounts}/>
                                      
                                            <div className="main-details mt-20">
                                                <div className="overview-wrap profile-overview">
                                                    <div className="each-profile-column">
                                                        <GeneralInfomationSection customerDetails={customerDetails}/>
                                                    </div>
                                                    <div className="each-profile-column">
                                                        <ContactInformationSection customerDetails={customerDetails}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="leftside-items">
                                                
                                                
                                                    {/* <div className="each-card mb-20">
                                                        <div className="each-card-content">
                                                            <div className="mandate-imgs">
                                                                <div className="each-mandate">
                                                                    {manadateData.isPassportAvailable &&
                                                                        <img src={manadateData.passport} alt=""/>
                                                                    }
                                                                    {!manadateData.isPassportAvailable &&
                                                                        <img className="no-mandate" src={PictureIco} alt=""/>
                                                                    }
                                                                    <div className="mandate-title">Customer Photo</div>
                                                                    <Button
                                                                        variant="success btn-sm"
                                                                        onClick={this.displayAddPhoto}
                                                                    >
                                                                        {!manadateData.isPassportAvailable ? "Upload Photo": "Update Photo"} 
                                                                        
                                                                    </Button>
                                                                </div>
                                                                <div className="each-mandate">
                                                                    {manadateData.isSignatureAvailable &&
                                                                        <img src={manadateData.signature} alt=""/>
                                                                    }
                                                                    {!manadateData.isSignatureAvailable &&
                                                                        <img className="no-mandate" src={PictureIco} alt=""/>
                                                                    }
                                                                    <div className="mandate-title">Customer Signature</div>
                                                                    <Button
                                                                        variant="success btn-sm"
                                                                        onClick={this.displayAddSignature}
                                                                    >
                                                                       {!manadateData.isSignatureAvailable ? "Upload Signature": "Update Signature"} 
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="each-card mb-20">
                                                        <div className="each-card-content">
                                                            <div className="mandate-imgs">
                                                                <div className="each-mandate">
                                                                    {passport &&
                                                                        <img src={`data:image/png;base64,${passport}`} alt=""/>
                                                                    }
                                                                    {!passport &&
                                                                        <img className="no-mandate" src={PictureIco} alt=""/>
                                                                    }
                                                                    <div className="mandate-title">Customer Biometric ID Photo</div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                
                                                

                                                <ActivitiesBox
                                                    activityType = "client"
                                                    clientEncodedKey={this.clientEncodedKey}
                                                />
                                                {/* <h6>Latest Activity </h6>
                                                {this.renderCustomerActivities()} */}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
            }
    }


    render() {

        return (
            <Fragment>
                {/* <InnerPageContainer {...this.props}> */}
                    <div className="content-wrapper">
                        
                        {/* <CustomerHeading {...this.props}/> */}
                        <div className="module-content">
                            <div className="content-container">
                                {this.renderPage()}
                            </div>
                        </div>
                    </div>
                {/* </InnerPageContainer> */}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getAClientActivitiesReducer: state.clientsReducers.getAClientActivitiesReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        
        addAClientSignatureReducer: state.clientsReducers.addAClientSignatureReducer,
        addAClientPassportReducer: state.clientsReducers.addAClientPassportReducer,
    };
}

export default connect(mapStateToProps)(ViewGroupCustomer);
