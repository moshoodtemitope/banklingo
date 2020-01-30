import * as React from "react";
// import {Router} from "react-router";
import { connect } from 'react-redux';
import {Fragment} from "react";
import AdminNav from './_menu'

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as Yup from 'yup';
import "./administration.scss"; 

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'

import Alert from 'react-bootstrap/Alert'
class NewTxtChannels extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
        this.getAllGLAccounts();
     }

    getAllGLAccounts = () =>{
        const {dispatch} = this.props;

        dispatch(acoountingActions.getAllGLAccounts());
    }

    validationSchema = Yup.object().shape({
        TxtChannelId: Yup.string()
          .matches(/^[0-9]*$/, 'Invalid repsonse')
          .required('Please provide GL Account'),
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
        let adminCreateTransactionChannelRequest = this.props.adminCreateTransactionChannel,
        getAllGLAccountsRequest = this.props.getAllGLAccountsReducer;

        switch(getAllGLAccountsRequest.request_status){
            case (accountingConstants.GET_ALL_GLACCOUNTS_PENDING):
                return (
                    <div className="loading-content card"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            case (accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS):
                
                let allGlAccounts = []
                    , glAccountsList;
                    glAccountsList= getAllGLAccountsRequest.request_data.response.data;

                    glAccountsList.map((channel, id)=>{
                        allGlAccounts.push({label: channel.accountDescription, value:channel.accountTypeId});
                    })

                if(getAllGLAccountsRequest.request_data.response.data.length>=1){
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
                                    glId: parseInt(values.TxtChannelId)
                                }


                                
                                this.handleNewTransactionalChannel(transactionChannelPayload)
                                    .then(
                                        () => {
                                            if(this.props.adminCreateTransactionChannel.request_status===
                                                administrationConstants.CREATE_TRANSACTION_CHANNEL_SUCCESS){
                                                    
                                                    resetForm();
                                                }
                                            
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
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                Accounting
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Form.Row>
                                                    
                                                    <Col>
                                                        <Form.Label className="block-level">GL Account</Form.Label>
                                                        <Select
                                                            options={allGlAccounts}
                                                            onChange={(selectedAccType) => {
                                                                this.setState({ selectedAccType });
                                                                errors.TxtChannelId = null
                                                                values.TxtChannelId = selectedAccType.value
                                                            }}
                                                            className={errors.TxtChannelId && touched.TxtChannelId ? "is-invalid" : null}
                                                            // value={values.accountUsage}
                                                            name="TxtChannelId"
                                                            // value={values.currencyCode}
                                                            required
                                                        />
                                                        {errors.TxtChannelId && touched.TxtChannelId ? (
                                                                <span className="invalid-feedback">{errors.TxtChannelId}</span>
                                                        ) : null}
                                                    </Col>
                                                    <Col>
                                                        {/* <Form.Group controlId="TxtChannelId">
                                                            <Form.Label className="block-level">GL Account</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={values.TxtChannelId}
                                                                className={errors.TxtChannelId && touched.TxtChannelId ? "is-invalid" : null}
                                                                name="TxtChannelId" required />

                                                            {errors.TxtChannelId && touched.TxtChannelId ? (
                                                                <span className="invalid-feedback">{errors.TxtChannelId}</span>
                                                            ) : null}
                                                        </Form.Group> */}

                                                    </Col>
                                                </Form.Row>
                                            </Accordion.Collapse>
                                        </Accordion>
                                        <Form.Row>
                                            
                                            <Col></Col>
                                        </Form.Row>

                                        

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
                }else{
                    return(
                        <div className="loading-content card"> 
                            <div>No GL Account found</div>
                        </div>
                    )
                }
            
            case (accountingConstants.GET_ALL_GLACCOUNTS_FAILURE):
                return (
                    <div className="loading-content card"> 
                        <div>{getAllGLAccountsRequest.request_data.error}</div>
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
        getAllGLAccountsReducer : state.accountingReducers.getAllGLAccountsReducer,
    };
}

export default connect(mapStateToProps) (NewTxtChannels);