import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button'
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'
import "./administration.scss"; 
class GeneralCurrency extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showNewCurrencyForm:false,
            showEditCurrencyForm:false,
            showRateEdit:false,
            selectedCountry: ""
        }

        
    }

    componentDidMount(){
        this.getAllCurrencies();
    }

    getAllCurrencies = () =>{
        const {dispatch} = this.props;
        dispatch(administrationActions.getAllCurrencies());
    }

    renderCurrencies =()=>{
        return (
            <div>
                <Accordion defaultActiveKey="0">

                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">Currencies In Use
                                                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Symbol</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>NGN</td>
                                        <td>Nigerian naira</td>
                                        <td>&#8358;</td>
                                        <td>
                                            <DropdownButton
                                                size="sm"
                                                title="Actions"
                                                key="activeCurrency"
                                                className="customone"
                                            >
                                                <Dropdown.Item eventKey="1" onClick={this.handleShow}>Edit</Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>XOF</td>
                                        <td>CFA Franc BCEAO</td>
                                        <td>CFA</td>
                                        <td>
                                            <DropdownButton
                                                size="sm"
                                                title="Actions"
                                                key="inActiveCurrency"
                                                className="customone"
                                            >
                                                <Dropdown.Item eventKey="1" onClick={this.handleShow}>Edit</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                            <div className="footer-with-cta toleft">
                                <Button onClick={this.handleShow}>Add Currency</Button>
                            </div>
                        </div>
                    </Accordion.Collapse>
                </Accordion>

                <Accordion>
                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                        Exchange Rates - From Nigerian naira (NGN)
                                                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Buy Rate</th>
                                        <th>Sell Rate</th>
                                        <th>Date Set</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>XOF</td>
                                        <td>CFA Franc BCEAO</td>
                                        <td>Not Set</td>
                                        <td>Not Set</td>
                                        <td>Not Set</td>
                                        <td>
                                            <DropdownButton
                                                size="sm"
                                                title="Actions"
                                                key="setRate"
                                                className="customone"
                                            >
                                                <Dropdown.Item eventKey="3" onClick={this.handleRateShow}>Set Rate</Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                    </tr>

                                </tbody>
                            </TableComponent>

                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        )
    }

    displayAllCurrencies =()=>{

        let getAllBranches =  this.props.adminGetAllCurrencies;
            
        switch(getAllBranches.request_status){
            case (administrationConstants.GET_ALLCURRENCIES_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            case (administrationConstants.GET_ALLCURRENCIES_SUCCESS):
                // contentToDisplay = this.renderCurrencies();
                    let currenciesList = getAllBranches.request_data.response.data;

                return (
                    <div>
                        <Accordion defaultActiveKey="0">

                            <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                Currencies In Use
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div>
                                    <TableComponent classnames="striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th>Code</th>
                                                <th>Name</th>
                                                <th>Symbol</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currenciesList.map((eachCurrency, index)=>{
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachCurrency.code} {eachCurrency.code==="NGN" && <span className="base-currency">Base</span>}</td>
                                                            <td>{eachCurrency.name}</td>
                                                            <td>{eachCurrency.symbol}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" data-currencycode={eachCurrency.code} onClick={()=>this.handleEditCurrencyShow(eachCurrency.code)}>Edit</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })}
                                        </tbody>
                                    </TableComponent>
                                    <div className="footer-with-cta toleft">
                                        <Button onClick={this.handleShow}>Add Currency</Button>
                                    </div>
                                </div>
                            </Accordion.Collapse>
                        </Accordion>

                        <Accordion defaultActiveKey="0">
                            <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                Exchange Rates - From Nigerian naira (NGN)
                                                    </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div>
                                    <TableComponent classnames="striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th>Code</th>
                                                <th>Name</th>
                                                <th>Buy Rate</th>
                                                <th>Sell Rate</th>
                                                <th>Date Set</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {currenciesList.map((eachCurrency, index)=>{
                                            if(eachCurrency.code!=="NGN"){
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachCurrency.code}</td>
                                                            <td>{eachCurrency.name}</td>
                                                            <td>Not set</td>
                                                            <td> Not set </td>
                                                            <td> Not set </td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" data-currencycode={eachCurrency.code} onClick={()=>this.handleRateShow(eachCurrency.code, eachCurrency.name)}>Set Rate</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            }
                                        })}
                                            

                                        </tbody>
                                    </TableComponent>

                                </div>
                            </Accordion.Collapse>
                        </Accordion>
                    </div>
                )
            case (administrationConstants.GET_ALLCURRENCIES_FAILURE):
                    return (
                        <div className="loading-content"> 
                            <div>An error occured please try again</div>
                        </div>
                    )
            default :
            return null;
        }
            
        // return contentToDisplay;
    }

    handleClose = () => this.setState({showNewCurrencyForm:false});
    
    handleShow = () => this.setState({showNewCurrencyForm:true});

    handleEditCurrencyClose = () => this.setState({showEditCurrencyForm:false});
    
    handleEditCurrencyShow = (currencyToEdit) => this.setState({showEditCurrencyForm:true, currencyToEdit});

    handleRateClose = () => this.setState({showRateEdit:false});
    
    handleRateShow = (selectCurrencyForRateSetting, selectCurrencyNameForRateSetting) => this.setState({showRateEdit:true,selectCurrencyNameForRateSetting, selectCurrencyForRateSetting});

    submitNewCurrencyDetails = async (newCurrencyPayload)=>{
        const {dispatch} = this.props;

        await dispatch(administrationActions.addNewCurrency(newCurrencyPayload));
    }

    updateCurrencyDetails = async (updateCurrencyPayload)=>{
        const {dispatch} = this.props;

        await dispatch(administrationActions.updateCurrency(updateCurrencyPayload));
    }

    newCurrencyPopUp = () =>{
        let allCountry =[
            {value: 'NGN', label: 'NGN - Nigeria'},
            {value: 'ERN', label: 'ERN - Eritrean'},
            {value: 'ILS', label: 'ILS - Israeli'},
            {value: 'NIO', label: 'NIO - Cordoba oro'},
        ];
        // currencyValidationSchema = Yup.object().shape({
        //     currencyName: Yup.string()
        //       .min(2, 'Min of two characters')
        //       .max(30, 'Max Limit reached')
        //       .required('Please provide name'),
        //     currencyCode: Yup.string()
        //       .min(1, 'Please provide valid code')
        //       .max(6, 'Max Limit reached')
        //       .required('Code is required'),
        //     currencySymbol: Yup.string()
        //       .min(1, 'Please provide valid symbol')
        //       .max(6, 'Max Limit reached')
        //       .required('Symbol is required')
        // });
        const {showNewCurrencyForm} = this.state;
        let adminCreateNewCurrencyRequest = this.props.adminCreateNewCurrency;
        return(
            <Modal show={showNewCurrencyForm} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                <Modal.Header>
                    <Modal.Title>Add New Currency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            currencyName: '',
                            currencyCode: '',
                            currencySymbol: '',
                        }}
                        // validationSchema={currencyValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values
                            
                            let newCurrencyPayload = {
                                name: values.currencyName,
                                code: values.currencyCode,
                                symbol: values.currencySymbol
                            };
                           
                            
                            this.submitNewCurrencyDetails(newCurrencyPayload)
                                .then(
                                    () => {
                                        resetForm();
                                        setTimeout(() => {
                                            this.getAllCurrencies();
                                            this.props.dispatch(administrationActions.addNewCurrency("CLEAR"))
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
                                <Form noValidate 
                                        onSubmit={handleSubmit}>
                                    <Form.Group controlId="countriesList">
                                        <Form.Label className="block-level">Preset</Form.Label>
                                        <Select
                                            options={allCountry}
                                            onChange={(selectedCountry)=>{
                                                this.setState({selectedCountry});
                                                errors.currencyCode = null
                                                values.currencyCode = selectedCountry.value
                                            }}
                                            className={errors.currencyCode && touched.currencyCode ? "is-invalid": null}
                                            // value="currencyCode"
                                            name ="currencyCode"
                                            // value={values.currencyCode}
                                            required
                                        />
                                        {errors.currencyCode && touched.currencyCode ? (
                                            <span className="invalid-feedback">{errors.currencyCode}</span>
                                        ) : null} 
                                    </Form.Group>
                                    <Form.Group controlId="currencyName">
                                        <Form.Label className="block-level">Name</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="currencyName"
                                            value={values.currencyName}
                                            onChange={handleChange} 
                                            className={errors.currencyName && touched.currencyName ? "is-invalid": null}
                                            required />
                                            {errors.currencyName && touched.currencyName ? (
                                                <span className="invalid-feedback">{errors.currencyName}</span>
                                            ) : null} 
                                    </Form.Group>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Code</Form.Label>
                                            <span className="form-text">{this.state.selectedCountry.value}</span>
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Symbol</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                onChange={handleChange} 
                                                value={values.currencySymbol}
                                                name="currencySymbol"
                                                className={errors.currencySymbol && touched.currencySymbol ? "is-invalid": null}
                                                required/>

                                            {errors.currencySymbol && touched.currencySymbol ? (
                                                <span className="invalid-feedback">{errors.currencySymbol}</span>
                                            ) : null} 
                                        </Col>
                                    </Form.Row>
                                    {/* <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Decimal Digits</Form.Label>
                                <span className="form-text">2</span>
                            </Col>
                            <Col>
                                <Form.Label className="block-level">Symbol Position</Form.Label>
                                <Form.Control as="select" size="sm">
                                    <option>Before Number</option>
                                    <option>After Number</option>
                                </Form.Control>
                            </Col>
                        </Form.Row> */}
                                    {/* <div className="footer-with-cta toleft">
                            <input type="checkbox" name="" id="isBaseCurrency"/>
                            <label htmlFor="isBaseCurrency">Base Currency</label>
                        </div> */}
                                    <div className="footer-with-cta toleft">
                                        <Button variant="secondary" className="grayed-out" onClick={this.handleClose}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={adminCreateNewCurrencyRequest.is_request_processing}>
                                                {adminCreateNewCurrencyRequest.is_request_processing?"Please wait...": "Save"}
                                            </Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                    {adminCreateNewCurrencyRequest.request_status === administrationConstants.CREATE_NEWCURRENCY_SUCCESS && 
                        <Alert variant="success">
                           {adminCreateNewCurrencyRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {adminCreateNewCurrencyRequest.request_status === administrationConstants.CREATE_NEWCURRENCY_FAILURE && 
                        <Alert variant="danger">
                          {adminCreateNewCurrencyRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    editACurrencyPopUp = () =>{
        
        let currencyValidationSchema = Yup.object().shape({
            currencyName: Yup.string()
              .min(2, 'Min of two characters')
              .max(30, 'Max Limit reached')
              .required('Please provide name'),
            currencySymbol: Yup.string()
              .min(1, 'Please provide valid symbol')
              .max(6, 'Max Limit reached')
              .required('Symbol is required')
        });
        const {showEditCurrencyForm, currencyToEdit} = this.state;

        let allCurrencies =  this.props.adminGetAllCurrencies.request_data.response.data,
            currencyDetails;
        
        let adminUpdateCurrencyRequest = this.props.adminUpdateCurrency;

            currencyDetails = allCurrencies.filter((currency, index)=>currency.code===currencyToEdit)[0];

        
        if(currencyDetails!==undefined){
            return(
                
                <Modal show={showEditCurrencyForm} onHide={this.handleEditCurrencyClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                    <Modal.Header>
                        <Modal.Title>Edit Currency</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                currencyName: currencyDetails.name,
                                currencySymbol: currencyDetails.symbol,
                            }}
                            validationSchema={currencyValidationSchema}
                            onSubmit={(values, { resetForm }) => {
                                // same shape as initial values
                                
                                let updateCurrencyPayload = {
                                    name: values.currencyName,
                                    code: currencyToEdit,
                                    symbol: values.currencySymbol
                                };
                            
                                this.updateCurrencyDetails(updateCurrencyPayload)
                                .then(
                                    () => {
                                        // resetForm();
                                        setTimeout(() => {
                                            this.getAllCurrencies();
                                            this.props.dispatch(administrationActions.updateCurrency("CLEAR"))
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
                                    <Form noValidate 
                                            onSubmit={handleSubmit}>
                                        
                                        <Form.Group controlId="currencyName">
                                            <Form.Label className="block-level">Name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="currencyName"
                                                value={values.currencyName}
                                                onChange={handleChange} 
                                                className={errors.currencyName && touched.currencyName ? "is-invalid": null}
                                                required />
                                                {errors.currencyName && touched.currencyName ? (
                                                    <span className="invalid-feedback">{errors.currencyName}</span>
                                                ) : null} 
                                        </Form.Group>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Code</Form.Label>
                                                <span className="form-text">{currencyToEdit}</span>
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Symbol</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    onChange={handleChange} 
                                                    value={values.currencySymbol}
                                                    name="currencySymbol"
                                                    className={errors.currencySymbol && touched.currencySymbol ? "is-invalid": null}
                                                    required/>

                                                {errors.currencySymbol && touched.currencySymbol ? (
                                                    <span className="invalid-feedback">{errors.currencySymbol}</span>
                                                ) : null} 
                                            </Col>
                                        </Form.Row>
                                        {/* <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">Decimal Digits</Form.Label>
                                    <span className="form-text">2</span>
                                </Col>
                                <Col>
                                    <Form.Label className="block-level">Symbol Position</Form.Label>
                                    <Form.Control as="select" size="sm">
                                        <option>Before Number</option>
                                        <option>After Number</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row> */}
                                        {/* <div className="footer-with-cta toleft">
                                <input type="checkbox" name="" id="isBaseCurrency"/>
                                <label htmlFor="isBaseCurrency">Base Currency</label>
                            </div> */}
                                        <div className="footer-with-cta toleft">
                                            <Button variant="secondary" className="grayed-out" onClick={this.handleEditCurrencyClose}>Cancel</Button>
                                            <Button
                                                type="submit"
                                                disabled={adminUpdateCurrencyRequest.is_request_processing}>
                                                {adminUpdateCurrencyRequest.is_request_processing?"Please wait...": "Update"}
                                                </Button>
                                        </div>
                                    </Form>
                                )}
                        </Formik>
                        {adminUpdateCurrencyRequest.request_status === administrationConstants.UPDATE_CURRENCY_SUCCESS && 
                            <Alert variant="success">
                            {adminUpdateCurrencyRequest.request_data.response.data.message}
                            </Alert>
                        }
                        {adminUpdateCurrencyRequest.request_status === administrationConstants.UPDATE_CURRENCY_FAILURE && 
                            <Alert variant="danger">
                            {adminUpdateCurrencyRequest.request_data.error}
                            </Alert>
                        }
                        
                    </Modal.Body>
                </Modal>
            )
        }
    }

    setCurrencyConvertion = async  (conversionPayload)=>{
        const {dispatch} = this.props;

        await dispatch(administrationActions.setCurrencyConversionRate(conversionPayload));
    }

    setCurrencyConversion = () =>{
        let adminSetCurrencyConversionRateRequest =  this.props.adminSetCurrencyConversionRate,

        convertionRateValidationSchema = Yup.object().shape({
            currencyBuyRate: Yup.string()
                .min(1, 'Response required')
                .max(20, 'Max limit reached')
                .matches(/^[0-9]*$/, 'Invalid repsonse')
                .required('Required'),
            currencySellRate:  Yup.string()
                .min(1, 'Response required')
                .max(20, 'Max limit reached')
                .matches(/^[0-9]*$/, 'Invalid repsonse')
                .required('Required')
          });

        const {showRateEdit, selectCurrencyForRateSetting, selectCurrencyNameForRateSetting} = this.state;
        if(selectCurrencyForRateSetting!==undefined){
            return(
                <Modal show={showRateEdit} onHide={this.handleRateClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                    <Modal.Header>
                        <Modal.Title>Set NGN To {selectCurrencyForRateSetting} Exchange Rate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Formik
                        initialValues={{
                            currencyBuyRate: '',
                            currencySellRate: ''
                        }}
                        validationSchema={convertionRateValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            
                            let currencyConvertionPayload = {
                                baseCurrencyCode: 'NGN',
                                currencyCode:selectCurrencyForRateSetting,
                                buyRate: values.currencyBuyRate,
                                sellRate: values.currencySellRate
                            };
                           
                            
                            this.setCurrencyConvertion(currencyConvertionPayload)
                                .then(
                                    () => {
                                        resetForm();
                                        setTimeout(() => {
                                            this.getAllCurrencies()
                                            this.props.dispatch(administrationActions.setCurrencyConversionRate("CLEAR"))
                                            this.handleRateClose();
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
                        <Form noValidate 
                                onSubmit={handleSubmit}>
                            <Form.Group controlId="countriesList">
                                <Form.Label className="block-level">From</Form.Label>
                                <span className="form-text">Nigerian naira</span>
                            </Form.Group>
                            <Form.Group controlId="currencyName">
                                <Form.Label className="block-level">To</Form.Label>
                                    <span className="form-text">{selectCurrencyNameForRateSetting}</span>
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">Buy Rate</Form.Label>
                                    <Form.Control type="text"
                                        name="currencyBuyRate"
                                        value={values.currencyBuyRate}
                                        onChange={handleChange} 
                                        className={errors.currencyBuyRate && touched.currencyBuyRate ? "is-invalid": null}
                                        required  />

                                        {errors.currencyBuyRate && touched.currencyBuyRate ? (
                                            <span className="invalid-feedback">{errors.currencyBuyRate}</span>
                                        ) : null} 
                                </Col>
                                <Col>
                                    <Form.Label className="block-level">Sell Rate</Form.Label>
                                    <Form.Control type="text" 
                                        name="currencySellRate"
                                        value={values.currencySellRate}
                                        onChange={handleChange} 
                                        className={errors.currencySellRate && touched.currencySellRate ? "is-invalid": null}
                                        required
                                    />

                                    {errors.currencySellRate && touched.currencySellRate ? (
                                        <span className="invalid-feedback">{errors.currencySellRate}</span>
                                    ) : null} 
                                </Col>
                            </Form.Row>
                            <div className="footer-with-cta">
                                <span>Exchange margin:{(values.currencySellRate!=='' && values.currencyBuyRate!=='') &&
                                                            <em>{values.currencySellRate - values.currencyBuyRate}</em>
                                                        } </span>
                            </div>
                            <div className="footer-with-cta toleft">
                                <Button variant="secondary" className="grayed-out" onClick={this.handleRateClose}>Cancel</Button>
                                <Button
                                    type="submit"
                                    disabled={adminSetCurrencyConversionRateRequest.is_request_processing}>
                                        {adminSetCurrencyConversionRateRequest.is_request_processing?"Please wait...": "Save Changes"}
                                    </Button>
                            </div>

                            {adminSetCurrencyConversionRateRequest.request_status === administrationConstants.SET_CONVERSION_RATE_SUCCESS && 
                                <Alert variant="success">
                                    {adminSetCurrencyConversionRateRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {adminSetCurrencyConversionRateRequest.request_status === administrationConstants.SET_CONVERSION_RATE_FAILURE && 
                                <Alert variant="danger">
                                    {adminSetCurrencyConversionRateRequest.request_data.error}
                            
                                </Alert>
                            }
                        </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            )
        }
    }

    render() {
        let getAllBranches =  this.props.adminGetAllCurrencies;
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    {this.newCurrencyPopUp()}
                    {this.setCurrencyConversion()}
                    {getAllBranches.request_status===administrationConstants.GET_ALLCURRENCIES_SUCCESS && this.editACurrencyPopUp()}
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
                                            <NavLink to={'/administration/general'}>General</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/organization'}>Organization</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/access'}>Access</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to={'/administration/products'}>Products</NavLink>
                                        </li> */}
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
                                                {this.displayAllCurrencies()}
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
        adminCreateNewCurrency : state.administrationReducers.adminCreateNewCurrencyReducer,
        adminUpdateCurrency : state.administrationReducers.adminUpdateCurrencyReducer,
        adminGetAllCurrencies : state.administrationReducers.adminGetAllCurrenciesReducer,
        adminSetCurrencyConversionRate : state.administrationReducers.adminSetCurrencyConversionRateReducer,
    };
}

export default  connect(mapStateToProps) (GeneralCurrency);