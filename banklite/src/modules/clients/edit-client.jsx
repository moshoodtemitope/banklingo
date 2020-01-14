import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'

import { Formik } from 'formik';
import * as Yup from 'yup';

import DatePicker from '../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select';

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants';

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./clients.scss"; 
class EditAClient extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
        this.getAClient();
        console.log("=++++++======", this.props)
    }

    getAClient = ()=>{
        const {dispatch} = this.props;
       
        dispatch(clientsActions.getAClient(this.props.match.params.encodedkey));
    }

    handleUpdateCustomer = async (updateCustomerpayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(clientsActions.updateAClient(updateCustomerpayload));
    }                                   


    updateCustomerValidationSchema = Yup.object().shape({
        FName: Yup.string()
            .min(1, 'Valid Response required')
            .max(50, 'Max limit reached')
            .required('Required'),
        LName:  Yup.string()
            .min(1, 'Valid response required')
            .max(50, 'Max limit reached')
            .required('Required'),
        MName:  Yup.string()
            .min(1, 'Valid response required')
            .max(50, 'Max limit reached'),
        custType:  Yup.string()
            .min(1, 'Valid response required'),
        addressLine1: Yup.string()
            .min(2, 'Valid response required')
            .max(70, 'Max limit reached'),
        addressLine2:  Yup.string()
            .min(2, 'Valid response required')
            .max(70, 'Max limit reached'),
        addressCity: Yup.string()
            .min(2, 'Valid response required')
            .max(40, 'Max limit reached'),
        addressState:  Yup.string()
            .min(2, 'Valid response required')
            .max(40, 'Max limit reached'),
        addressCountry:  Yup.string()
            .min(2, 'Valid response required')
            .max(35, 'Max limit reached'),
        zipCode:  Yup.string()
            .min(2, 'Valid response required')
            .max(10, 'Max limit reached'),
        contactMobile:  Yup.string()
            .min(8, 'Valid response required')
            .max(17, 'Max limit reached'),
        contactEmail:  Yup.string()
            .min(8, 'Valid response required')
            .max(50, 'Max limit reached'),
        nextOfKinFullName:  Yup.string()
            .min(2, 'Valid response required')
            .max(50, 'Max limit reached'),
        nextOfKinAddress:  Yup.string()
            .min(2, 'Valid response required')
            .max(50, 'Max limit reached'),
        nextOfKinMobile:  Yup.string()
            .min(11, 'Valid response required')
            .max(16, 'Max limit reached'),
        notes:  Yup.string()
            .min(3, 'Valid response required'),
      });

    renderUpdateCustomer = ()=>{
        let updateAClientRequest = this.props.updateAClient,
            getAClientRequest = this.props.getAClient;

        switch(getAClientRequest.request_status){
            case (clientsConstants.GET_A_CLIENT_PENDING):
                return (
                    <div className="loading-content card"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )

            case (clientsConstants.GET_A_CLIENT_SUCCESS):
                
                let allCustomerData = getAClientRequest.request_data.response.data;
                    console.log('Customer is', allCustomerData);
                    if(Object.keys(allCustomerData).length>=1){
                        
                        return (
                            <Formik
                                initialValues={{
                                    FName: allCustomerData.firstName,
                                    LName: allCustomerData.lastName,
                                    MName: allCustomerData.middleName?allCustomerData.middleName:'',
                                    custType: '',
                                    addressLine1: allCustomerData.address.addressLine1?allCustomerData.address.addressLine1:'',
                                    addressLine2: allCustomerData.address.addressLine2?allCustomerData.address.addressLine2:'',
                                    addressCity: allCustomerData.address.addressCity?allCustomerData.address.addressCity:'',
                                    addressState: allCustomerData.address.addressState?allCustomerData.address.addressState:'',
                                    addressCountry: allCustomerData.address.addressCountry?allCustomerData.address.addressCountry:'',
                                    zipCode: allCustomerData.address.zipCode?allCustomerData.address.zipCode:'',
                                    contactMobile: allCustomerData.contact.contactMobile?allCustomerData.contact.contactMobile:'',
                                    contactEmail:allCustomerData.contact.contactEmail?allCustomerData.contact.contactEmail:'',
                                    nextOfKinFullName: '',
                                    nextOfKinAddress: '',
                                    nextOfKinMobile: '',
                                    gender:'',
                                    dateOfBirth:'',
                                    custType:1,
                                    notes:allCustomerData.notes.notes?allCustomerData.notes.notes:'',
                                }}
                
                                validationSchema={this.updateCustomerValidationSchema}
                                onSubmit={(values, { resetForm }) => {
                
                                    let updateCustomerPayload = {
                                        clientTypeId:values.custType,
                                        // clientTypeId:values.custType,
                                        firstName:values.FName,
                                        middleName:values.MName,
                                        lastName:values.LName,
                                        address :{
                                            addressLine1: values.addressLine1,
                                            addressLine2: values.addressLine2,
                                            addressCity: values.addressCity,
                                            addressState: values.addressState,
                                            addressCountry: values.addressCountry,
                                            zipCode: values.zipCode,
                                        },
                                        contact: {
                                            contactMobile: values.contactMobile,
                                            contactEmail: values.contactEmail
                                        },
                                        nexOfKin: {
                                            nextOfKinFullName: values.nextOfKinFullName,
                                            nextofKinHomeAddress: values.nextOfKinAddress,
                                            nextOfKinMobileNumber: values.nextOfKinMobile,
                                        },
                                        gender:values.gender?values.gender:'',
                                        dateOfBirth: values.dateOfBirth?values.dateOfBirth.toISOString():'',
                                        notes: values.notes,
                                        encodedKey:this.props.match.params.encodedkey
                                    }
                
                
                
                                    this.handleUpdateCustomer(updateCustomerPayload)
                                        .then(
                                            () => {
                
                                                // if (this.props.updateAClient.request_status === clientsConstants.UPDATE_A_CLIENT_SUCCESS) {
                                                //     resetForm();
                                                // }
                
                                                setTimeout(() => {
                                                    this.props.dispatch(clientsActions.updateAClient("CLEAR"))
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
                                    setFieldValue,
                                    touched,
                                    isValid,
                                    errors, }) => (
                                        <Form 
                                            noValidate 
                                            onSubmit={handleSubmit}
                                            className="form-content card">
                                            <div className="form-heading">
                                                <h3>Editing -{allCustomerData.firstName} {allCustomerData.lastName}</h3>
                                            </div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">First Name</Form.Label>
                                                    <Form.Control type="text"
                                                        name="FName"
                                                        onChange={handleChange} 
                                                        value={values.FName}
                                                        className={errors.FName && touched.FName ? "is-invalid": null}
                                                        required  />
                                                    {errors.FName && touched.FName ? (
                                                        <span className="invalid-feedback">{errors.FName}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Last Name</Form.Label>
                                                    <Form.Control type="text"
                                                         name="LName"
                                                         onChange={handleChange} 
                                                         value={values.LName}
                                                         className={errors.LName && touched.LName ? "is-invalid": null}
                                                         required />
                                                    {errors.LName && touched.LName ? (
                                                        <span className="invalid-feedback">{errors.LName}</span>
                                                    ) : null}
                                                </Col>
                                                
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Middle Name</Form.Label>
                                                    <Form.Control type="text"
                                                         name="MName"
                                                         onChange={handleChange} 
                                                         value={values.MName}
                                                         className={errors.MName && touched.MName ? "is-invalid h-38px": "h-38px"}
                                                         required />
                                                    {errors.MName && touched.MName ? (
                                                        <span className="invalid-feedback">{errors.MName}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Customer Type</Form.Label>
                                                    {/* <Select
                                                            options={allCustomerTypes}
                                                            onChange={(selectedCustType) => {
                                                                this.setState({ selectedCustType });
                                                                errors.custType = null
                                                                values.custType = selectedCustType.value
                                                            }}
                                                            className={errors.custType && touched.custType ? "is-invalid" : null}
                                                            // value={values.accountUsage}
                                                            name="custType"
                                                            // value={values.currencyCode}
                                                            required
                                                        />
                                                        {errors.custType && touched.custType ? (
                                                                <span className="invalid-feedback">{errors.custType}</span>
                                                        ) : null} */}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    {/* <Form.Label className="block-level">Gender</Form.Label> */}
                                                    <Form.Check type="radio"
                                                        name="gender"
                                                        onChange={handleChange} 
                                                        label="Female"
                                                        id="choose-female"
                                                        value={values.gender}
                                                          />
                                                    <Form.Check type="radio"
                                                        name="gender"
                                                        onChange={handleChange} 
                                                        label="Male"
                                                        id="choose-male"
                                                        value={values.gender}
                                                          />
                                                    {errors.gender && touched.gender ? (
                                                        <span className="invalid-feedback">{errors.gender}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="debitLocation" className={errors.dateOfBirth && touched.dateOfBirth ? "has-invaliderror fullwidthdate" : "fullwidthdate"}>
                                                        <Form.Label className="block-level">Date of Birth</Form.Label>
                                                        <DatePicker placeholderText="Choose  date"

                                                            // onChange={this.handleDatePicker}
                                                            // onChangeRaw={(e) => this.handleDateChange(e)}
                                                            dateFormat="d MMMM, yyyy"
                                                            className="form-control form-control-sm"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            name="dateOfBirth"
                                                            value={values.dateOfBirth}
                                                            onChange={setFieldValue}
                                                            maxDate={new Date()}
                                                            className={errors.dateOfBirth && touched.dateOfBirth ? "is-invalid form-control form-control-sm h-38px" : "form-control form-control-sm h-38px"}

                                                        />
                                                        {errors.dateOfBirth && touched.dateOfBirth ? (
                                                            <span className="invalid-feedback">{errors.dateOfBirth}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                </Col>
                                                
                                            </Form.Row>
                                            <Accordion defaultActiveKey="0">
                                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                    Address
                                            </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <div className="each-formsection">
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Label className="block-level">Street Address - Line 1</Form.Label>
                                                                <Form.Control type="text"
                                                                    name="addressLine1"
                                                                    onChange={handleChange} 
                                                                    value={values.addressLine1}
                                                                    className={errors.addressLine1 && touched.addressLine1 ? "is-invalid": null} />
                                                                {errors.addressLine1 && touched.addressLine1 ? (
                                                                    <span className="invalid-feedback">{errors.addressLine1}</span>
                                                                ) : null}
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="block-level">Street Address - Line 2</Form.Label>
                                                                <Form.Control type="text"
                                                                    name="addressLine2"
                                                                    onChange={handleChange} 
                                                                    value={values.addressLine2}
                                                                    className={errors.addressLine2 && touched.addressLine2 ? "is-invalid": null} />
                                                                {errors.addressLine2 && touched.addressLine2 ? (
                                                                    <span className="invalid-feedback">{errors.addressLine2}</span>
                                                                ) : null}
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Label className="block-level">City</Form.Label>
                                                                <Form.Control type="text"
                                                                    name="addressCity"
                                                                    onChange={handleChange} 
                                                                    value={values.addressCity}
                                                                    className={errors.addressCity && touched.addressCity ? "is-invalid": null} />
                                                                {errors.addressCity && touched.addressCity ? (
                                                                    <span className="invalid-feedback">{errors.addressCity}</span>
                                                                ) : null}
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="block-level">State/Province/Region</Form.Label>
                                                                <Form.Control type="text" 
                                                                     name="addressState"
                                                                     onChange={handleChange} 
                                                                     value={values.addressState}
                                                                     className={errors.addressState && touched.addressState ? "is-invalid": null} />
                                                                 {errors.addressState && touched.addressState ? (
                                                                     <span className="invalid-feedback">{errors.addressState}</span>
                                                                 ) : null}
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Label className="block-level">Zip Postal Code</Form.Label>
                                                                <Form.Control type="text" 
                                                                    name="zipCode"
                                                                    onChange={handleChange} 
                                                                    value={values.zipCode}
                                                                    className={errors.zipCode && touched.zipCode ? "is-invalid": null} />
                                                                {errors.zipCode && touched.zipCode ? (
                                                                    <span className="invalid-feedback">{errors.zipCode}</span>
                                                                ) : null}
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="block-level">Country</Form.Label>
                                                                <Form.Control type="text" 
                                                                    name="addressCountry"
                                                                    onChange={handleChange} 
                                                                    value={values.addressCountry}
                                                                    className={errors.addressCountry && touched.addressCountry ? "is-invalid": null} />
                                                                {errors.addressCountry && touched.addressCountry ? (
                                                                    <span className="invalid-feedback">{errors.addressCountry}</span>
                                                                ) : null}
                                                            </Col>
                                                        </Form.Row>
                                                    </div>
                                                </Accordion.Collapse>
                                            </Accordion>
                                            <Accordion defaultActiveKey="0">
                                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                    Contact
                                            </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <div className="each-formsection">
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Label className="block-level">Phone Number</Form.Label>
                                                                <Form.Control type="text" 
                                                                    name="contactMobile"
                                                                    onChange={handleChange} 
                                                                    value={values.contactMobile}
                                                                    className={errors.contactMobile && touched.contactMobile ? "is-invalid": null} />
                                                                {errors.contactMobile && touched.contactMobile ? (
                                                                    <span className="invalid-feedback">{errors.contactMobile}</span>
                                                                ) : null}
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="block-level">Email Address</Form.Label>
                                                                <Form.Control type="text" 
                                                                    name="contactEmail"
                                                                    onChange={handleChange} 
                                                                    value={values.contactEmail}
                                                                    className={errors.contactEmail && touched.contactEmail ? "is-invalid": null} />
                                                                {errors.contactEmail && touched.contactEmail ? (
                                                                    <span className="invalid-feedback">{errors.contactEmail}</span>
                                                                ) : null}
                                                            </Col>
                                                        </Form.Row>
                                                    </div>
                                                </Accordion.Collapse>
                                            </Accordion>
                                            <Accordion defaultActiveKey="0">
                                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                    Next of Kin
                                            </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <div className="each-formsection">
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Label className="block-level">Next of Kin Fullname</Form.Label>
                                                                <Form.Control type="text" 
                                                                    name="nextOfKinFullName"
                                                                    onChange={handleChange} 
                                                                    value={values.nextOfKinFullName}
                                                                    className={errors.nextOfKinFullName && touched.nextOfKinFullName ? "is-invalid": null} />
                                                                {errors.nextOfKinFullName && touched.nextOfKinFullName ? (
                                                                    <span className="invalid-feedback">{errors.nextOfKinFullName}</span>
                                                                ) : null}
                                                            </Col>
                                                            <Col>
                                                                <Form.Label className="block-level">Next of Kin Home Address</Form.Label>
                                                                <Form.Control type="text" 
                                                                    name="nextOfKinAddress"
                                                                    onChange={handleChange} 
                                                                    value={values.nextOfKinAddress}
                                                                    className={errors.nextOfKinAddress && touched.nextOfKinAddress ? "is-invalid": null} />
                                                                {errors.nextOfKinAddress && touched.nextOfKinAddress ? (
                                                                    <span className="invalid-feedback">{errors.nextOfKinAddress}</span>
                                                                ) : null}
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Col>
                                                                <Form.Label className="block-level">Next of Kin Phone Number</Form.Label>
                                                                <Form.Control type="text" 
                                                                    name="nextOfKinMobile"
                                                                    onChange={handleChange} 
                                                                    value={values.nextOfKinMobile}
                                                                    className={errors.nextOfKinMobile && touched.nextOfKinMobile ? "is-invalid": null} />
                                                                {errors.nextOfKinMobile && touched.nextOfKinMobile ? (
                                                                    <span className="invalid-feedback">{errors.nextOfKinMobile}</span>
                                                                ) : null}
                                                            </Col>
                                                            <Col></Col>
                                                        </Form.Row>
                                                    </div>
                                                </Accordion.Collapse>
                                            </Accordion>
                                            <Accordion defaultActiveKey="0">
                                            <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                Notes
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <div className="each-formsection">
                                                   <Form.Group >
                                                            <Form.Label className="block-level">Notes</Form.Label>
                                                            <Form.Control as="textarea"
                                                                    rows="3"
                                                                    onChange={handleChange}
                                                                    name="notes"
                                                                    value={values.notes}
                                                                    className={errors.notes && touched.notes ? "is-invalid form-control form-control-sm" : null}/>
                                                                
                                                                {errors.notes && touched.notes ? (
                                                                    <span className="invalid-feedback">{errors.notes}</span>
                                                                ) : null}
                                                   </Form.Group>
                                                </div>
                                            </Accordion.Collapse>
                                        </Accordion>
                
                
                
                
                
                
                                            <div className="footer-with-cta toleft">
                                                {/* <Button variant="light" className="btn btn-light">
                                                    Cancel</Button> */}
                                                <NavLink to={'/active-clients'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                                <Button variant="success" type="submit"
                                                    disabled={updateAClientRequest.is_request_processing} 
                                                    className="ml-20"   
                                                    > 
                                                        {updateAClientRequest.is_request_processing?"Please wait...": "Update Customer"}
                                                </Button>
                
                                                
                                            </div>
                                            {updateAClientRequest.request_status === clientsConstants.UPDATE_A_CLIENT_SUCCESS && 
                                                <Alert variant="success">
                                                    {updateAClientRequest.request_data.response.data.message}
                                                </Alert>
                                            }
                                            {updateAClientRequest.request_status === clientsConstants.UPDATE_A_CLIENT_FAILURE && 
                                                <Alert variant="danger">
                                                    {updateAClientRequest.request_data.error}
                                            
                                                </Alert>
                                            }
                                        </Form>
                                    )}
                            </Formik>
                        )
                    }else{
                        return(
                            <div className="loading-content card"> 
                                <div>The requsted Customer could not be found</div>
                            </div>
                        )
                    }
                    
            case (clientsConstants.GET_A_CLIENT_FAILURE):
                return (
                    <div className="loading-content card"> 
                        <div>{getAClientRequest.request_data.error}</div>
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
                                                
                                                {/* <div className="footer-with-cta toleft">
                                                    <Button variant="secondary" className="grayed-out">Rearrange</Button>
                                                    <Button >Add Channel</Button>
                                                </div> */}
                                                {this.renderUpdateCustomer()}
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
        getAClient : state.clientsReducers.getAClientReducer,
        updateAClient : state.clientsReducers.updateAClientReducer,
    };
}

export default connect(mapStateToProps)(EditAClient);