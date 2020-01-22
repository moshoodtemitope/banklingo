import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss"; 

import {disbursementActions} from '../../redux/actions/disbursment/disbursment.action';
import {disbursmentConstants} from '../../redux/actiontypes/disbursment/disbursment.constants'
class DisbursementManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:30,
            CurrentPage:1,
            showDetails: false
        }

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getDisbursements(params);
    }

    getDisbursements = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(disbursementActions.getDisbursement(paramters));
    }

    setPagesize = (PageSize)=>{
        // console.log('----here', PageSize.target.value);
        let sizeOfPage = PageSize.target.value,
            {CurrentPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;
        this.getDisbursements(params);
    }

    getADisbursment =(transactionReference)=>{
        const {dispatch} =  this.props;

        dispatch(disbursementActions.getDisbursementByRef(transactionReference))
    }

    showDetails = (transactionReference)=>{
        
        this.setState({showDetails: true, transactionReference}, ()=>console.log('dsdsds===='))
        this.getADisbursment(transactionReference);
        // this.getADisbursment(transactionReference);
        
        // let getDisbursementByRefRequest = this.props.getDisbursementByRefReducer;

        // switch (getDisbursementByRefRequest.request_status){
        //     case (disbursmentConstants.GET_DISBURSMENTS_PENDING):
        //         return (
        //             <div className="card form-content">
        //                 <div className="loading-content">
        //                     <div className="loading-text">Please wait... </div>
        //                 </div>
        //             </div>
                   
        //         )
        //     case(disbursmentConstants.GET_DISBURSMENTS_SUCCESS):
        //         let disbursmentData = getDisbursementByRefRequest.request_data.response.data;
                
        //         if(disbursmentData!==undefined){
        //             if(disbursmentData.length>=1){
        //                 return(
        //                     <div className="card form-content">
        //                         {
        //                             disbursmentData.map((eachInfo, index)=>{
        //                                 return(
        //                                     <Col xs={6}>
        //                                         <Form.Label className="block-level">{eachInfo.key}</Form.Label>
        //                                         <span className="form-text disabled-field">{eachInfo.value}}</span>

        //                                     </Col>
        //                                 )
        //                             })
        //                         }
                                
        //                     </div>
        //                 )
        //             }else{
        //                 return(
        //                     <div className="card form-content">
        //                         <div className="no-records">
        //                         No records found
        //                         </div>
        //                     </div>
        //                 )
        //             }
        //         }else{
        //             return null;
        //         }

        //     case (disbursmentConstants.GET_DISBURSMENTS_FAILURE):
        //         return (
        //             <div className="card form-content">
        //                <div className="loading-content errormsg"> 
        //                     <div>{getDisbursementByRefRequest.request_data.error}</div>
        //                 </div>
        //             </div>
                    
        //         )
        //     default :
        //     return null;
        // }
    }


    renderADisbursment =(transactionReference)=>{
        
        
        let getDisbursementByRefRequest = this.props.getDisbursementByRefReducer;

        switch (getDisbursementByRefRequest.request_status){
            case (disbursmentConstants.GET_A_DISBURSMENT_PENDING):
                return (
                    <div className="card form-content details-wrap w-40">
                        <div className="loading-content">
                            <div className="loading-text">Please wait... </div>
                        </div>
                    </div>
                   
                )
            case(disbursmentConstants.GET_A_DISBURSMENT_SUCCESS):
                let disbursmentData = getDisbursementByRefRequest.request_data.response.data;
                
                if(disbursmentData!==undefined){
                    if(disbursmentData.length>=1){
                        return(
                            <div className="">
                                <div className="card form-content details-wrap  w-40">
                                    <div className="form-heading centered mb-20">
                                        <h4>Disbursment details</h4>
                                    </div>
                                    <Row>
                                        {
                                            disbursmentData.map((eachInfo, index)=>{
                                                return(
                                                    <Col xs={6} className="mb-10">
                                                        <div className="dissburseInfo">
                                                            <Form.Label className="block-level">{eachInfo.key}</Form.Label>
                                                            <span className="form-text disabled-field">{
                                                                (eachInfo.value!=='' && eachInfo.value!==null)?
                                                                    (eachInfo.key==="Amount")?`₦${eachInfo.value}`:eachInfo.value
                                                                :'N/A'}
                                                            </span>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="card form-content details-wrap w-40">
                                <div className="no-records">
                                No records found
                                </div>
                            </div>
                        )
                    }
                }else{
                    return null;
                }

            case (disbursmentConstants.GET_A_DISBURSMENT_FAILURE):
                return (
                    <div className="card form-content w-40">
                       <div className="loading-content errormsg"> 
                            <div>{getDisbursementByRefRequest.request_data.error}</div>
                        </div>
                    </div>
                    
                )
            default :
            return null;
        }
    }

    renderAllDisbursments=()=>{
        let getDisbursementsRequest = this.props.getDisbursementsReducer;
            switch (getDisbursementsRequest.request_status){
                case (disbursmentConstants.GET_DISBURSMENTS_PENDING):
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
                                    <div className="move-page-actions">
                                        <div className="each-page-action">
                                            <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                        </div>
                                        <div className="page-count">
                                            <span>1-20</span>  of <span>20000</span>
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>

                                        <th>Transaction Ref</th>
                                        <th>Source Account</th>
                                        <th>Destination Account</th>
                                        <th>Destination Bank</th>
                                        <th>Amount (NGN)</th>
                                        <th>Inititated By</th>
                                        <th>Approved By</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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
                case(disbursmentConstants.GET_DISBURSMENTS_SUCCESS):
                    let allDisbursments = getDisbursementsRequest.request_data.response.data;
                        
                        if(allDisbursments!==undefined){
                            if(allDisbursments.length>=1){
                                return(
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
                                                <select id="toshow" className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                <div className="move-page-actions">
                                                    <div className="each-page-action">
                                                        <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                                    </div>
                                                    <div className="page-count">
                                                        <span>1-20</span>  of <span>20000</span>
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    
                                                    <th>Transaction Ref</th>
                                                    <th>Source Account</th>
                                                    <th>Destination Account</th>
                                                    <th>Destination Bank</th>
                                                    <th>Amount (NGN)</th>
                                                    <th>Inititated By</th>
                                                    <th>Approved By</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allDisbursments.map((eachDisburment, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    
                                                                    <td>
                                                                        <span className="txt-cta" onClick={()=>this.showDetails(eachDisburment.transactionReference)} >{eachDisburment.transactionReference}</span> 
                                                                    </td>
                                                                    <td>{eachDisburment.sourceAccount}</td>
                                                                    <td>{eachDisburment.destinationAccount}</td>
                                                                    {/* <td>{eachDisburment.destinationBank}</td> */}
                                                                    <td>-</td>
                                                                    <td>{eachDisburment.amount}.00</td>
                                                                    {/* <td>{eachDisburment.initiatedBy}</td> */}
                                                                    <td>-</td>
                                                                    {/* <td>{eachDisburment.approvedBy}</td> */}
                                                                    <td>-</td>
                                                                    <td>{eachDisburment.disbursmentStatusDescription}</td>
                                                                </tr>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                                
                                            </tbody>
                                        </TableComponent>
                                    </div>
                                )
                            }else{
                                return(
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
                                                <select id="toshow" className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                <div className="move-page-actions">
                                                    <div className="each-page-action">
                                                        <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                                    </div>
                                                    <div className="page-count">
                                                        <span>1-20</span>  of <span>20000</span>
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>

                                                    <th>Transaction Ref</th>
                                                    <th>Source Account</th>
                                                    <th>Destination Account</th>
                                                    <th>Destination Bank</th>
                                                    <th>Amount (NGN)</th>
                                                    <th>Inititated By</th>
                                                    <th>Approved By</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </TableComponent>
                                    </div>
                                )
                            }
                        }else{
                            return null;
                        }

                case (disbursmentConstants.GET_DISBURSMENTS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{getDisbursementsRequest.request_data.error}</div>
                        </div>
                    )
                default :
                return null;
            }
    }

    render() {
        const {showDetails,transactionReference}  = this.state;
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
                                                <h2>Disbursements</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink exact to={'/disbursements'}>Disbursements</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/initiate'}>Initiate Disbursement</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-approval'}>Pending Approval</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/nip-requests'}>NIP Requests</NavLink>
                                            {/* <ul>
                                                <li>
                                                    <NavLink to={'/disbursements/transfer-requests'}>Transfer Requests</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/disbursements/account-block'}>Account Block</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/disbursements/amount-block'}>Amount Block</NavLink>
                                                </li>
                                            </ul> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderAllDisbursments()}

                                               {showDetails===true && this.renderADisbursment(transactionReference)}
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
        getDisbursementsReducer : state.disbursmentReducers.getDisbursementsReducer,
        getDisbursementByRefReducer : state.disbursmentReducers.getDisbursementByRefReducer,
    };
}

export default connect(mapStateToProps)(DisbursementManagement);