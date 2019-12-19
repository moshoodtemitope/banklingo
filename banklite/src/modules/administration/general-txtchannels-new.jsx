import * as React from "react";
// import {Router} from "react-router";
import { connect } from 'react-redux';
import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
// import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as Yup from 'yup';
import "./administration.scss"; 

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'
class NewTxtChannels extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    validationSchema = Yup.object().shape({
        TxtChannelId: Yup.string()
          .min(2, 'Min of two characters')
          .max(30, 'Max Limit reached')
          .required('Please provide GLId'),
        TxtChannelName: Yup.string()
          .min(2, 'Min of two characters')
          .required('Name is required'),
        TxtChannelKey: Yup.string()
          .min(2, 'Min of two characters')
          .max(30, 'Max Limit reached')
          .required('Key is required')
    });


    handleNewTransactionalChannel = async (transactionChannelPayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(administrationActions.addTransactionChannel(transactionChannelPayload));

        
    }

    renderTxtChannelForm = ()=>{
        let adminCreateTransactionChannelRequest = this.props.adminCreateTransactionChannel;

        return (
            <Formik
                initialValues={{
                    TxtChannelKey: '',
                    TxtChannelName: '',
                    TxtChannelId: '',
                }}
                validationSchema={this.validationSchema}
                onSubmit={(values, { resetForm }) => {
                    let transactionChannelPayload = {
                        key: values.TxtChannelKey,
                        name: values.TxtChannelName,
                        glId: values.TxtChannelId
                    }



                    this.handleNewTransactionalChannel(transactionChannelPayload)
                        .then(
                            () => {
                                resetForm();
                                // console.log('response is', adminCreateCustomerTypeRequest)
                                setTimeout(() => {
                                    this.props.dispatch(administrationActions.addTransactionChannel("CLEAR"))
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
                            className="form-content card"
                            onSubmit={handleSubmit}>
                            <div className="form-heading">
                                <h3>Add Transaction Channel</h3>
                            </div>
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
                                    <Form.Group controlId="TxtChannelId">
                                        <Form.Label className="block-level">ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={handleChange}
                                            value={values.TxtChannelId}
                                            className={errors.TxtChannelId && touched.TxtChannelId ? "is-invalid" : null}
                                            name="TxtChannelId" required />

                                        {errors.TxtChannelId && touched.TxtChannelId ? (
                                            <span className="invalid-feedback">{errors.TxtChannelId}</span>
                                        ) : null}
                                    </Form.Group>

                                </Col>
                            </Form.Row>
                            <Form.Row>
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
                                <Col></Col>
                            </Form.Row>

                            {/* <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Loan Constraints
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection w-40">
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Unconstrained Usage</option>
                                                                    <option>Limited Usage</option>
                                                                </Form.Control>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion> */}

                            {/* <Accordion defaultActiveKey="2">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="2">
                                                            Savings Constraints
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="2">
                                                            <div className="each-formsection w-40">
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Unconstrained Usage</option>
                                                                    <option>Limited Usage</option>
                                                                </Form.Control>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion> */}

                            {/* <Accordion defaultActiveKey="3">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
                                                            Accounting
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="3">
                                                            <div className="each-formsection w-40">
                                                                <Form.Control as="select" size="sm">
                                                                    <option>1100100 - Cash Imprest - Head Office</option>
                                                                    <option>1100100 - Cash Imprest - Akure</option>
                                                                    <option>1100100 - Cash Imprest - Akure</option>
                                                                    <option>1100100 - Cash Imprest - Akure</option>
                                                                </Form.Control>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion> */}

                            {/* <Accordion defaultActiveKey="3">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
                                                            Usage Rights
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="3">
                                                            <div>
                                                                <div className="each-formsection ">
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-1" />
                                                                        <label htmlFor="pick-1">All Users</label>
                                                                    </div>
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-2" />
                                                                        <label htmlFor="pick-2">Chief Financial Officer</label>
                                                                    </div>
                                                                </div>
                                                                <div className="each-formsection two-sided">
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-3" />
                                                                        <label htmlFor="pick-3">Customer Engagement (Document Manager)</label>
                                                                    </div>
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-4" />
                                                                        <label htmlFor="pick-4">Operations - Rectify Adjustment</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion> */}

                            <div className="footer-with-cta toleft">
                                <NavLink to={'/administration/general/txt-channels'} className="btn btn-secondary grayed-out">Cancel</NavLink>

                                <Button
                                    type="submit"
                                    disabled={adminCreateTransactionChannelRequest.is_request_processing}>
                                       {adminCreateTransactionChannelRequest.is_request_processing?"Please wait...": "Create Channel"}
                                </Button>
                            </div>
                            {adminCreateTransactionChannelRequest.request_status === administrationConstants.CREATE_TRANSACTION_CHANNEL_SUCCESS && 
                                <Alert variant="success">
                                    {adminCreateTransactionChannelRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {adminCreateTransactionChannelRequest.request_status === administrationConstants.CREATE_TRANSACTION_CHANNEL_FAILURE && 
                                <Alert variant="danger">
                                    {adminCreateTransactionChannelRequest.request_data.error}
                                </Alert>
                            }
                        </Form>
                    )}
            </Formik>
        )
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
                                                {this.renderTxtChannelForm()}
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
        adminCreateTransactionChannel : state.administrationReducers.adminCreateTransactionChannelReducer,
    };
}

export default connect(mapStateToProps) (NewTxtChannels);