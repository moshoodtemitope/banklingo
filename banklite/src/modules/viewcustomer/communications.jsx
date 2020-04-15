import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'

import Button from 'react-bootstrap/Button'

import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
import Form from 'react-bootstrap/Form'
import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
class ViewCustomerCommunications extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:'',
            NotificationType:0,
            PageSize: 200,
            CurrentPage: 1,
        }

       
    }

    componentDidMount(){
        this.loadInitialCustomerData()
    }

    loadInitialCustomerData = ()=>{
        let { PageSize, CurrentPage,NotificationType } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&NotificationType=${NotificationType}`;

        this.getACustomerCommunications(this.clientEncodedKey, params);
        
    }

    getACustomerCommunications = (clientEncodedKey , params)=>{
        const { dispatch } = this.props;

        dispatch(clientsActions.getAClientCommunications(clientEncodedKey,params));
    } 

    setPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;

        let {CurrentPage,NotificationType } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&NotificationType=${NotificationType}`;
        // this.getLoans(params);

        if(tempData){
            dispatch(clientsActions.getAClientCommunications(this.clientEncodedKey,params, tempData));
            
        }else{
            dispatch(clientsActions.getAClientCommunications(this.clientEncodedKey,params));
        }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize, NotificationType} = this.state;

        
        let params = `PageSize=${PageSize}&CurrentPage=${nextPage}&NotificationType=${NotificationType}`;
        if(tempData){
            dispatch(clientsActions.getAClientCommunications(this.clientEncodedKey,params, tempData));
        }else{
            dispatch(clientsActions.getAClientCommunications(this.clientEncodedKey,params));
        }
    }


    renderCommunicationsWrap =()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){

                    return(
                        <div>
                            {this.renderClientCommunicatons()}
                        </div>
                    )
                    
                }
    }

    renderClientCommunicatons=()=>{
        let getAClientCommunicationsRequest =  this.props.getAClientCommunicationsReducer;
        let saveRequestData= getAClientCommunicationsRequest.request_data!==undefined?getAClientCommunicationsRequest.request_data.tempData:null;
        if(getAClientCommunicationsRequest.request_status===clientsConstants.GET_A_CLIENT_COMMUNICATIONS_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={this.setPagesize}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>

                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Sent By</th>
                                    <th>Destination</th>
                                    <th>Message</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Date Sent</th>
                                    <th>Failure reason</th>
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
                                </tr>
                            </tbody>
                        </TableComponent>
                        
                    </div>
                )
            }else{
                return(
                    <div>
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                        <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>

                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Sent By</th>
                                    <th>Destination</th>
                                    <th>Message</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Date Sent</th>
                                    <th>Failure reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   saveRequestData.map((eachCommunication, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachCommunication.id} </td>
                                                <td>{eachCommunication.sentBy} </td>
                                                <td>{eachCommunication.destination} </td>
                                                <td>{eachCommunication.message} </td>
                                                <td>{eachCommunication.communicationTypeDescription} </td>
                                                <td>{eachCommunication.communicationStateDescription} </td>
                                                <td>{eachCommunication.dateSent} </td>
                                                <td>{eachCommunication.failureReason} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                    </div>
                )
            }
        }

        if(getAClientCommunicationsRequest.request_status===clientsConstants.GET_A_CLIENT_COMMUNICATIONS_SUCCESS){
            let getAClientCommunicationsInfo = getAClientCommunicationsRequest.request_data.response.data;
            let getAClientCommunicationsData = getAClientCommunicationsRequest.request_data.response.data.result;

            if(getAClientCommunicationsData.length>=1){


                return(
                    <div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setPagesize(e, getAClientCommunicationsData)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getAClientCommunicationsInfo.totalPages}
                                    currPage={getAClientCommunicationsInfo.currentPage}
                                    currRecordsCount={getAClientCommunicationsInfo.length}
                                    totalRows={getAClientCommunicationsInfo.totalRows}
                                    tempData={getAClientCommunicationsData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.loadNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Sent By</th>
                                    <th>Destination</th>
                                    <th>Message</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Date Sent</th>
                                    <th>Failure reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   getAClientCommunicationsData.map((eachCommunication, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachCommunication.id} </td>
                                                <td>{eachCommunication.sentBy} </td>
                                                <td>{eachCommunication.destination} </td>
                                                <td>{eachCommunication.message} </td>
                                                <td>{eachCommunication.communicationTypeDescription} </td>
                                                <td>{eachCommunication.communicationStateDescription} </td>
                                                <td>{eachCommunication.dateSent} </td>
                                                <td>{eachCommunication.failureReason} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                    </div>
                )
            }else{

                return(
                    <div className="no-records">
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setPagesize(e, getAClientCommunicationsData)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>

                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Sent By</th>
                                    <th>Destination</th>
                                    <th>Message</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Date Sent</th>
                                    <th>Failure reason</th>
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
                                </tr>
                            </tbody>
                        </TableComponent>
                    </div>
                )
            }

            // return(
            //     <div>
            //         <div className="pagination-wrap">
            //             <label htmlFor="toshow">Show</label>
            //             <select id="toshow" className="countdropdown form-control form-control-sm">
            //                 <option value="10">10</option>
            //                 <option value="25">25</option>
            //                 <option value="50">50</option>
            //                 <option value="200">200</option>
            //             </select>

            //         </div>
            //         <TableComponent classnames="striped bordered hover">
            //             <thead>
            //                 <tr>
            //                     <th>Type</th>
            //                     <th>Sent Date</th>
            //                     <th>Sent By</th>
            //                     <th>State</th>
            //                     <th>Destination</th>
            //                     <th>Message</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 <tr>
            //                     <td>Email</td>
            //                     <td>25-03-2019</td>
            //                     <td>Mambu</td>
            //                     <td>Failed</td>
            //                     <td>text text text text</td>
            //                     <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,  dolore nulla natus tempora in delectus iure quis fugiat esse .</td>
            //                 </tr>
            //                 <tr>
            //                     <td>Web Hook</td>
            //                     <td>25-03-2019</td>
            //                     <td>Mambu</td>
            //                     <td>Sent</td>
            //                     <td>text text text text</td>
            //                     <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,  dolore nulla natus tempora in delectus iure quis fugiat esse .</td>
            //                 </tr>
            //                 <tr>
            //                     <td>Web Hook</td>
            //                     <td>25-03-2019</td>
            //                     <td>Mambu</td>
            //                     <td>Sent</td>
            //                     <td>text text text text</td>
            //                     <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,  dolore nulla natus tempora in delectus iure quis fugiat esse .</td>
            //                 </tr>
            //                 <tr>
            //                     <td>SMS</td>
            //                     <td>25-03-2019</td>
            //                     <td>Mambu</td>
            //                     <td>Sent</td>
            //                     <td>text text text text</td>
            //                     <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,  dolore nulla natus tempora in delectus iure quis fugiat esse .</td>
            //                 </tr>
            //             </tbody>
            //         </TableComponent>
            //     </div>
            // )
        }

        if(getAClientCommunicationsRequest.request_status===clientsConstants.GET_A_CLIENT_COMMUNICATIONS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientCommunicationsRequest.request_data.error}</div>
            </div>
            )
        }
    }



    render() {
        
        return (
            <Fragment>
                
                    <div className="content-wrapper">
                        
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            
                                            
                                            {this.renderCommunicationsWrap()}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        getAClientCommunicationsReducer: state.clientsReducers.getAClientCommunicationsReducer,
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps) (ViewCustomerCommunications);