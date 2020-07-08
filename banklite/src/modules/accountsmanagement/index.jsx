import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik';
import * as Yup from 'yup';
// import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import {allowNumbersOnly} from '../../shared/utils';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'
import Alert from 'react-bootstrap/Alert'
import "./accountsmanagement.scss"; 

class AccountManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showCreateGL:false,
            showEditGL:false,
            CurrentPage: 1,
            PageSize: 25,
            typeToShow: "all",
            accountTypeToFetch:0
        }

        
    }

    componentDidMount(){
       this.getGLAccounts();
    }

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {CurrentPage, BranchId,ClientState} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        let payload ={
            PageSize: sizeOfPage,
            CurrentPage:this.state.CurrentPage,
            AccountTypeId: this.state.accountTypeToFetch
        }

        // this.getGLAccounts();
        if(tempData){
            dispatch(acoountingActions.getGLAccounts(payload, tempData));
        }else{
            dispatch(acoountingActions.getGLAccounts(payload));
        }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);

        let payload ={
            PageSize: this.state.PageSize,
            CurrentPage:nextPage,
            AccountTypeId: this.state.accountTypeToFetch
        }

        if(tempData){
            dispatch(acoountingActions.getGLAccounts(payload,tempData));
        }else{
            dispatch(acoountingActions.getGLAccounts(payload));
        }
    }

    getGLAccounts = (tempData) =>{
        const {dispatch} = this.props;
        let payload ={
            PageSize: this.state.PageSize,
            CurrentPage:this.state.CurrentPage,
            AccountTypeId: this.state.accountTypeToFetch
        }

        if(tempData){
            dispatch(acoountingActions.getGLAccounts(payload, tempData));
        }else{
            dispatch(acoountingActions.getGLAccounts(payload));
        }
        
    }

    submitNewGLAccountDetails = async (newGlPayload)=>{
        const {dispatch} = this.props;

        await dispatch(acoountingActions.createGLAccount(newGlPayload));
    }

    submitUpdatedGLAccountDetails = async (updatedGlPayload)=>{
        const {dispatch} = this.props;

        await dispatch(acoountingActions.updateGLAccount(updatedGlPayload));
    }

    handleClose = () => this.setState({showCreateGL:false});
    
    handleShow = () => this.setState({showCreateGL:true});


    handleEditGlClose = () => this.setState({showEditGL:false});
    
    handleEditGlShow = (glIdToEdit, accountToEdit) => this.setState({showEditGL:true, glIdToEdit, accountToEdit});

    filterWithType = (typeToShow, filterType)=>{

        let getGLAccountsRequest = this.props.getGLAccounts;

            let allAccountsData = (this.props.getGLAccounts.request_data!==undefined && this.props.getGLAccounts.request_data.response!==undefined)
            ? this.props.getGLAccounts.request_data.response.data :null;
        // let saveRequestData= getGLAccountsRequest.request_data!==undefined?getGLAccountsRequest.request_data.tempData:null;

        this.setState({accountTypeToFetch:filterType},
            ()=>this.getGLAccounts(allAccountsData)
        )
        // if(typeToShow===this.state.typeToShow){
        //     this.setState({typeToShow: "all"})
        // }else{
        //     this.setState({typeToShow})
        // }
        this.setState({typeToShow})
        // this.getGLAccounts
        
    }

    returnGLTypeCount =(glType, glAccountsStats, isAll)=>{
        let filteredStat,
             allCount=0;
            if(isAll===undefined || isAll===null){
                if(glAccountsStats.length>=0){
                    
                    filteredStat = glAccountsStats.filter(eachStat=>eachStat.accountTypeDesctiption===glType);
                    
                    if(filteredStat!==undefined && filteredStat.length>=1){
                    
                        return filteredStat[0].count;
                    }
                    else{
                        return 0;
                    }
                }else{
                    return 0;
                }
            }
            else{
                glAccountsStats.forEach(function(eachCount){
                    allCount +=eachCount.count;
                })

                return allCount;
            }
            

    }

    renderAllGL = ()=>{

        let getGLAccountsRequest = this.props.getGLAccounts,
            {CurrentPage, PageSize, typeToShow} = this.state,
            createGLAccountRequest = this.props.createGLAccount,
            updateGLAccount = this.props.updateGLAccount;

        let saveRequestData= getGLAccountsRequest.request_data!==undefined?getGLAccountsRequest.request_data.tempData:null;
        
        switch(getGLAccountsRequest.request_status){
            case (accountingConstants.GET_GLACCOUNTS_PENDING):
                
                if(saveRequestData===null || saveRequestData===undefined){
                    return (
                        <div className="loading-content"> 
                            {createGLAccountRequest.request_status === accountingConstants.CREATE_GLACCOUNTS_SUCCESS && 
                                <Alert variant="success">
                                    {createGLAccountRequest.request_data.response.data.message}
                                </Alert>
                            }
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
                                    <select id="toshow" 
                                        // value={this.state.PageSize}
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
                                        <th>GLCode</th>
                                        <th>Account Name</th>
                                        <th>Account Type</th>
                                        <th>Account Usage</th>
                                        <th>In Use</th>
                                        <th>Manual Entries Allowed</th>
                                        {/* <th>Actions</th> */}
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
                                    </tr>
                                </tbody>
                            </TableComponent>
                            <div className="loading-text mb-20">Please wait... </div>
                        </div>
                    )
                }
                else{
                    let unfilteredAccounTypes =[],
                        countOfAccounTypes ={},
                        accounTypes =[],
                        {accounTypesData} = this.state;
                    let getGLAccountsData = (saveRequestData.result!==undefined)?saveRequestData.result:saveRequestData,
                        getGLAccountsDataCount =0 ,
                        getGLAccountsStatsData = (saveRequestData.result2!==undefined)?saveRequestData.result2:saveRequestData;
                        // console.log("cdfdfdf", saveRequestData);
                        getGLAccountsData.map((eachGL, index)=>{
                            if(accounTypes.indexOf(eachGL.accountTypeDescription)===-1){
                                accounTypes.push(eachGL.accountTypeDescription)
                            }
                            unfilteredAccounTypes.push(eachGL.accountTypeDescription)
                        })

                        if (unfilteredAccounTypes instanceof Array) { 
                            unfilteredAccounTypes.forEach(function (v, i) {
                                if (!countOfAccounTypes[v]) { 
                                    countOfAccounTypes[v] = [i]; 
                                } else { 
                                    countOfAccounTypes[v].push(i); 
                                }
                            });
                            Object.keys(countOfAccounTypes).forEach(function (v) {
                                countOfAccounTypes[v] = {"index": countOfAccounTypes[v], "length": countOfAccounTypes[v].length};
                            });
                        }
                    return(
                        <div>
                            {createGLAccountRequest.request_status === accountingConstants.CREATE_GLACCOUNTS_SUCCESS && 
                                <Alert variant="success">
                                    {createGLAccountRequest.request_data.response.data.message}
                                </Alert>
                            }

                            {updateGLAccount.request_status === accountingConstants.UPDATE_GLACCOUNTS_SUCCESS && 
                                <Alert variant="success">
                                    {updateGLAccount.request_data.response.data.message}
                                </Alert>
                            }
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
                                    <select id="toshow" 
                                        value={this.state.PageSize}
                                        onChange={(e)=>this.setPagesize(e, getGLAccountsData)}
                                        className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <div className="filter-nav">
                                 {/* <div className="filter-nav"> */}
                                    <div className={typeToShow === "all" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("all",0)}>
                                        All({this.returnGLTypeCount("All", getGLAccountsStatsData, "all")})
                                </div>
                                    <div className={typeToShow === "assets" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("assets",1)}>
                                        Asset({this.returnGLTypeCount("Asset", getGLAccountsStatsData)})
                                </div>
                                    <div className={typeToShow === "liability" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("liability",2)}>
                                        Liability({this.returnGLTypeCount("Liability", getGLAccountsStatsData)})
                                </div>
                                    <div className={typeToShow === "equity" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("equity",3)}>
                                        Equity({this.returnGLTypeCount("Equity", getGLAccountsStatsData)})
                                </div>
                                    <div className={typeToShow === "income" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("income",4)}>
                                        Income({this.returnGLTypeCount("Income", getGLAccountsStatsData)})
                                </div>
                                    <div className={typeToShow === "expense" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("expense",5)}>
                                        Expense({this.returnGLTypeCount("Expense", getGLAccountsStatsData)})
                                </div>

                                
                                {/* {accounTypes!==undefined &&

                                    accounTypes.map((eachType, index)=>{
                                        
                                        let typeDataLength = countOfAccounTypes[eachType].length;
                                        return(
                                            <div key={index}
                                                    className={typeToShow===eachType?'active-type':''}
                                                    onClick={(e)=>this.filterWithType(eachType)} >
                                                        {eachType} ({typeDataLength}) 
                                            </div>
                                        )
                                    })
                                
                                } */}
                            </div>
                            <div className="loading-text mb-20">Please wait...</div>
                            <div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>GLCode</th>
                                            <th>Account Name</th>
                                            <th>Account Type</th>
                                            <th>Account Usage</th>
                                            <th>In Use</th>
                                            <th>Manual Entries Allowed</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getGLAccountsData.map((eachGL, index)=>{
                                                return (
                                                    <tr key={index} className={eachGL.accountUsageId===1?"heading-row":""}>
                                                        <td>{eachGL.glCode}</td>
                                                        <td>{eachGL.accountName}</td>
                                                        <td>{eachGL.accountTypeDescription}</td>
                                                        <td>{eachGL.accountUsageDescription}</td>
                                                        {eachGL.accountUsageId===1 && <td></td>}
                                                        {eachGL.accountUsageId!==1 &&
                                                        <td>{eachGL.inUse.toString()==="true"?"In Use":"Not In Use"}</td>
                                                        }
                                                        {eachGL.accountUsageId===1 && <td></td>}
                                                        {eachGL.accountUsageId!==1 &&
                                                            <td>{eachGL.manualEntriesAllowed.toString()==="true"?"Allowed":"Not Allowed"}</td>
                                                        }
                                                        <td>
                                                            <DropdownButton
                                                                size="sm"
                                                                title="Actions"
                                                                key="glAccountActions"
                                                                // drop="left"
                                                                className="customone"
                                                            >
                                                                <Dropdown.Item eventKey="1" >Edit</Dropdown.Item>
                                                            </DropdownButton>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                </TableComponent>
                               
                
                            </div>
                        </div>
                    )
                }
            
            case (accountingConstants.GET_GLACCOUNTS_SUCCESS):
                let getGLAccountsData = getGLAccountsRequest.request_data.response.data.result,
                    getGLAccountsStatsData = getGLAccountsRequest.request_data.response.data.result2,
                    accounTypes =[],
                    unfilteredAccounTypes =[],
                    countOfAccounTypes ={},
                    {accounTypesData} = this.state;

                    getGLAccountsData.map((eachGL, index)=>{
                        if(accounTypes.indexOf(eachGL.accountTypeDescription)===-1){
                            accounTypes.push(eachGL.accountTypeDescription)
                        }
                        unfilteredAccounTypes.push(eachGL.accountTypeDescription)
                    })

                    if (unfilteredAccounTypes instanceof Array) { 
                        unfilteredAccounTypes.forEach(function (v, i) {
                            if (!countOfAccounTypes[v]) { 
                                countOfAccounTypes[v] = [i]; 
                            } else { 
                                countOfAccounTypes[v].push(i); 
                            }
                        });
                        Object.keys(countOfAccounTypes).forEach(function (v) {
                            countOfAccounTypes[v] = {"index": countOfAccounTypes[v], "length": countOfAccounTypes[v].length};
                        });
                    }
                   

                if(getGLAccountsData!==undefined){
                    if(getGLAccountsData.length>=1){
                        
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
                                        <select id="toshow" 
                                            onChange={(e)=>this.setPagesize(e, getGLAccountsRequest.request_data.response.data)}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={getGLAccountsRequest.request_data.response.data.totalPages}
                                            currPage={getGLAccountsRequest.request_data.response.data.currentPage}
                                            currRecordsCount={getGLAccountsData.length}
                                            totalRows={getGLAccountsRequest.request_data.response.data.totalRows}
                                            tempData={getGLAccountsRequest.request_data.response.data}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>
                                {createGLAccountRequest.request_status === accountingConstants.CREATE_GLACCOUNTS_SUCCESS && 
                                    <Alert variant="success">
                                        {createGLAccountRequest.request_data.response.data.message}
                                    </Alert>
                                }

                                {updateGLAccount.request_status === accountingConstants.UPDATE_GLACCOUNTS_SUCCESS && 
                                    <Alert variant="success">
                                        {updateGLAccount.request_data.response.data.message}
                                    </Alert>
                                }
                                <div className="filter-nav">
                                    <div className={typeToShow === "all" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("all",0)}>
                                        All({this.returnGLTypeCount("All", getGLAccountsStatsData, "all")})
                                </div>
                                    <div className={typeToShow === "assets" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("assets",1)}>
                                        Asset({this.returnGLTypeCount("Asset", getGLAccountsStatsData)})
                                </div>
                                    <div className={typeToShow === "liability" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("liability",2)}>
                                        Liability({this.returnGLTypeCount("Liability", getGLAccountsStatsData)})
                                </div>
                                    <div className={typeToShow === "equity" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("equity",3)}>
                                        Equity({this.returnGLTypeCount("Equity", getGLAccountsStatsData)})
                                </div>
                                    <div className={typeToShow === "income" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("income",4)}>
                                        Income({this.returnGLTypeCount("Income", getGLAccountsStatsData)})
                                </div>
                                    <div className={typeToShow === "expense" ? 'active-type' : ''}
                                        onClick={(e) => this.filterWithType("expense",5)}>
                                        Expense({this.returnGLTypeCount("Expense", getGLAccountsStatsData)})
                                </div>
                                    {/* {accounTypes!==undefined &&

                                    accounTypes.map((eachType, index)=>{
                                        
                                        let typeDataLength = countOfAccounTypes[eachType].length;
                                        return(
                                            <div key={index}
                                                    className={typeToShow===eachType?'active-type':''}
                                                    onClick={(e)=>this.filterWithType(eachType)} >
                                                        {eachType} ({typeDataLength}) 
                                            </div>
                                        )
                                    })
                                
                                } */}
                                </div>
                
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>GLCode</th>
                                            <th>Account Name</th>
                                            <th>Account Type</th>
                                            <th>Account Usage</th>
                                            <th>In Use</th>
                                            <th>Manual Entries Allowed</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getGLAccountsData.map((eachGL, index)=>{
                                                // if(typeToShow === eachGL.accountTypeDescription){
                                                    return (
                                                        <tr key={index} className={eachGL.accountUsageId===1?"heading-row":""}>
                                                            <td>{eachGL.glCode}</td>
                                                            <td>{eachGL.accountName}</td>
                                                            <td>{eachGL.accountTypeDescription}</td>
                                                            <td>{eachGL.accountUsageDescription}</td>
                                                            {eachGL.accountUsageId===1 && <td></td>}
                                                            {eachGL.accountUsageId!==1 &&
                                                                <td>{eachGL.inUse.toString()==="true"?"In Use":"Not In Use"}</td>
                                                            }
                                                            {eachGL.accountUsageId===1 && <td></td>}
                                                            {eachGL.accountUsageId!==1 &&
                                                                <td>{eachGL.manualEntriesAllowed.toString()==="true"?"Allowed":"Not Allowed"}</td>
                                                            }
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="glAccountActions"
                                                                    // drop="left"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" onClick={()=>this.handleEditGlShow(eachGL.glCode, eachGL.accountTypeDescription)}>Edit</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    )
                                                // }

                                                // if(typeToShow === "all"){
                                                //     return (
                                                //         <tr key={index}>
                                                //             <td>{eachGL.glCode}</td>
                                                //             <td>{eachGL.accountName}</td>
                                                //             <td>{eachGL.accountTypeDescription}</td>
                                                //             <td>{eachGL.accountUsageDescription}</td>
                                                //             <td>{eachGL.inUse.toString()==="true"?"In Use":"Not In Use"}</td>
                                                //             <td>{eachGL.manualEntriesAllowed.toString()==="true"?"Allowed":"Not Allowed"}</td>
                                                //             <td>
                                                //                 <DropdownButton
                                                //                     size="sm"
                                                //                     title="Actions"
                                                //                     key="glAccountActions"
                                                //                     // drop="left"
                                                //                     className="customone"
                                                //                 >
                                                //                     <Dropdown.Item eventKey="1" onClick={()=>this.handleEditGlShow(eachGL.glCode, eachGL.accountTypeDescription)}>Edit</Dropdown.Item>
                                                //                 </DropdownButton>
                                                //             </td>
                                                //         </tr>
                                                //     )
                                                // }
                                            })
                                        }
                                        
                                    </tbody>
                                </TableComponent>
                                <div className="footer-with-cta toleft">
                                    <Button onClick={this.handleShow}>Add a new account</Button>
                                </div>
                
                            </div>
                        )
                    }else{
                        return(
                            <div className="no-records">
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
                                        
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>GLCode</th>
                                            <th>Account Name</th>
                                            <th>Account Type</th>
                                            <th>Account Usage</th>
                                            <th>In Use</th>
                                            <th>Manual Entries Allowed</th>
                                            {/* <th>Actions</th> */}
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
                                        </tr>
                                    </tbody>
                                </TableComponent>
                                <div className="footer-with-cta toleft">
                                    <Button variant="primary" onClick={this.handleShow} className="btn btn-primary">Create GL Account</Button>
                                </div>
                            </div>
                        )
                    }
                }else{
                    return null;
                }
            case (accountingConstants.GET_GLACCOUNTS_FAILURE):
                    return (
                        <div className="loading-content"> 
                            <div>{getGLAccountsRequest.request_data.error}</div>
                        </div>
                    )
            default :
            return null;
        }
        
    }

    newGLAccountPopUp = () =>{
        let allAccountTypes =[
            {value: '1', label: 'Asset'},
            {value: '2', label: 'Liability'},
            {value: '3', label: 'Equity'},
            {value: '4', label: 'Income'},
            {value: '5', label: 'Expense'},
        ],
        accountUsage=[
            {value: '1', label: 'Header'},
            {value: '2', label: 'Detail'}
        ],
        glAccountValidationSchema = Yup.object().shape({
            accountNotes: Yup.string()
              .min(1, 'Min of two characters'),
            accountUsage: Yup.string()
              .min(1, 'Please provide valid symbol')
              .required('Please select usage'),
            accountType: Yup.string()
              .min(1, 'Min of two characters')
              .required('Please select type'),
            accountName: Yup.string()
                .min(2, 'Min of two characters')
                .max(30, 'Max Limit reached')
                .required('Please provide name'),
            glCode: Yup.string()
                    .min(2, 'Min of two characters')
                    .max(30, 'Max Limit reached')
                    .matches(/^[0-9]*$/, 'Numbers only')
                    .required('Please provide name'),
        });
        const {showCreateGL, selectedAccType, selectedUsageOption} = this.state;
        let createGLAccountRequest = this.props.createGLAccount;

        let allAccountsData = (this.props.getGLAccounts.request_data!==undefined && this.props.getGLAccounts.request_data.response!==undefined)
            ? this.props.getGLAccounts.request_data.response.data :null;
        
        
        return(
            <Modal show={showCreateGL} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                <Modal.Header>
                    <Modal.Title>Create new GL Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            accountNotes: '',
                            allowManualEntry: false,
                            // allowManualEntry: '',
                            accountUsage: '',
                            accountType: '',
                            accountName: '',
                            glCode: '',
                        }}
                        validationSchema={glAccountValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values
                            
                            let newgLPayload = {
                                glCode: values.glCode,
                                accountName: values.accountName,
                                accountTypeId: parseInt(selectedAccType.value),
                                accountUsageId: parseInt(selectedUsageOption.value),
                                manualEntriesAllowed: values.allowManualEntry,
                                notes: values.accountNotes,
                            };
                        
                            // console.log("popopop",newgLPayload);
                            this.submitNewGLAccountDetails(newgLPayload)
                                .then(
                                    () => {
                                        if(this.props.createGLAccount.request_status === accountingConstants.CREATE_GLACCOUNTS_SUCCESS){
                                           resetForm();
                                           this.handleClose();
                                            
                                            setTimeout(() => {
                                                this.getGLAccounts(allAccountsData); 
                                                this.props.dispatch(acoountingActions.createGLAccount("CLEAR"))
                                            }, 2000);
                                        }
                                        // else{
                                        //     setTimeout(() => {
                                        //         this.props.dispatch(acoountingActions.createGLAccount("CLEAR"))
                                        //     }, 2000);
                                        // }
                                        
                                        

                                    }
                                )
                            
                                
                           

                        }}
                    >
                        {({ handleSubmit,
                            handleChange,
                            handleBlur,
                            resetForm,
                            setFieldValue,
                            setFieldTouched,
                            values,
                            touched,
                            isValid,
                            errors, }) => (
                                <Form noValidate 
                                        onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">GL Code</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="glCode"
                                                value={allowNumbersOnly(values.glCode)}
                                                onChange={handleChange} 
                                                className={errors.glCode && touched.glCode ? "is-invalid": null}
                                                required />
                                                {errors.glCode && touched.glCode ? (
                                                    <span className="invalid-feedback">{errors.glCode}</span>
                                                ) : null} 
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Account Name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="accountName"
                                                value={values.accountName}
                                                onChange={handleChange} 
                                                className={errors.accountName && touched.accountName ? "is-invalid": null}
                                                required />
                                                {errors.accountName && touched.accountName ? (
                                                    <span className="invalid-feedback">{errors.accountName}</span>
                                                ) : null} 
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="countriesList">
                                                <Form.Label className="block-level">Account Type</Form.Label>
                                                <Select
                                                    options={allAccountTypes}
                                                    onChange={(selectedAccType) => {
                                                        this.setState({ selectedAccType });
                                                        errors.accountType = null
                                                        values.accountType = selectedAccType.value
                                                        setFieldValue('accountType', selectedAccType.value);
                                                    }}
                                                    onBlur={() => setFieldTouched('accountType', true)}
                                                    className={errors.accountType && touched.accountType ? "is-invalid" : null}
                                                    // value={values.accountUsage}
                                                    name="accountType"
                                                    // value={values.currencyCode}
                                                    required
                                                />
                                                {errors.accountType && touched.accountType ? (
                                                    <span className="invalid-feedback">{errors.accountType}</span>
                                                ) : null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="countriesList">
                                                <Form.Label className="block-level">Account Usage</Form.Label>
                                                <Select
                                                    options={accountUsage}
                                                    onChange={(selectedUsageOption) => {
                                                        this.setState({ selectedUsageOption });
                                                        errors.accountUsage = null
                                                        values.accountUsage = selectedUsageOption.value
                                                        setFieldValue('accountUsage', selectedUsageOption.value);
                                                    }}
                                                    onBlur={() => setFieldTouched('accountUsage', true)}
                                                    className={errors.accountUsage && touched.accountUsage ? "is-invalid" : null}
                                                    
                                                    
                                                    name="accountUsage"
                                                    
                                                    required
                                                />
                                                {errors.accountUsage && touched.accountUsage ? (
                                                    <span className="invalid-feedback">{errors.accountUsage}</span>
                                                ) : null}
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    
                                    <Form.Group className="table-helper">
                                        <input type="checkbox"
                                         name="allowManualEntry" 
                                         onChange={handleChange} 
                                         checked={values.allowManualEntry? values.allowManualEntry:null}
                                         value={values.allowManualEntry}
                                         id="allowManualEntry"/>
                                        <label htmlFor="allowManualEntry">Manual Entries allowed</label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="block-level">Notes</Form.Label>
                                        <Form.Control name="accountNotes"
                                         as="textarea" rows="3" 
                                         onChange={handleChange} 
                                         value={values.accountNotes}
                                        />
                                    </Form.Group>
                                        
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
                                            disabled={createGLAccountRequest.is_request_processing}>
                                                {createGLAccountRequest.is_request_processing?"Please wait...": "Save"}
                                            </Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                    {/* {createGLAccountRequest.request_status === accountingConstants.CREATE_GLACCOUNTS_SUCCESS && 
                        <Alert variant="success">
                           {createGLAccountRequest.request_data.response.data.message}
                        </Alert>
                    } */}
                    {createGLAccountRequest.request_status === accountingConstants.CREATE_GLACCOUNTS_FAILURE && 
                        <Alert variant="danger">
                          {createGLAccountRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    editGLAccountPopUp = () =>{
        let allAccountTypes =[
            {value: '1', label: 'Asset'},
            {value: '2', label: 'Liability'},
            {value: '3', label: 'Equity'},
            {value: '4', label: 'Income'},
            {value: '5', label: 'Expense'},
        ],
        accountUsage=[
            {value: '1', label: 'Header'},
            {value: '2', label: 'Detail'}
        ],
        glAccountValidationSchema = Yup.object().shape({
            accountNotes: Yup.string()
              .min(1, 'Min of two characters'),
            accountUsage: Yup.string()
              .min(1, 'Please provide valid response'),
            accountType: Yup.string()
              .min(1, 'Min of two characters'),
            accountName: Yup.string()
                .min(2, 'Min of two characters')
                .max(30, 'Max Limit reached')
                .required('Please provide name'),
            glCode: Yup.string()
                    .min(2, 'Min of two characters')
                    .max(30, 'Max Limit reached')
                    .matches(/^[0-9]*$/, 'Numbers only')
                    .required('Please provide GL Code'),
        });
        let {showEditGL, glIdToEdit, selectedAccType, selectedUsageOption} = this.state;
        let gLAccountsList = this.props.getGLAccounts.request_data.response.data.result,
            selectGlAcc;
        
            let updateGLAccount = this.props.updateGLAccount;

            selectGlAcc = gLAccountsList.filter((account, index)=>account.glCode===glIdToEdit)[0];

            let allAccountsData = (this.props.getGLAccounts.request_data!==undefined && this.props.getGLAccounts.request_data.response!==undefined)
            ? this.props.getGLAccounts.request_data.response.data :null;
            
        if(selectGlAcc!==undefined){
            return(
                <Modal show={showEditGL} onHide={this.handleEditGlClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                    <Modal.Header>
                        <Modal.Title>Editing A General Ledger Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                accountNotes: '',
                                allowManualEntry: selectGlAcc.manualEntriesAllowed,
                                // accountUsage: selectGlAcc.accountUsageId,
                                accountUsage: '',
                                accountType: '',
                                accountName: selectGlAcc.accountName,
                                glCode: selectGlAcc.glCode,

                            }}
                            validationSchema={glAccountValidationSchema}
                            onSubmit={(values, { resetForm }) => {
                                
                                
                                let updatedGlPayload = {
                                    glCode: values.glCode,
                                    accountName: values.accountName,
                                    accountTypeId: selectedAccType!=undefined? parseInt(selectedAccType.value): selectGlAcc.accountTypeId,
                                    accountUsageId:selectedUsageOption!=undefined? parseInt(selectedUsageOption.value): selectGlAcc.accountUsageId,
                                    manualEntriesAllowed: values.allowManualEntry,
                                    notes: values.accountNotes,
                                    idToUpdate: selectGlAcc.id
                                };
                                
                                this.submitUpdatedGLAccountDetails(updatedGlPayload)
                                    .then(
                                        () => {
                                            if(this.props.updateGLAccount.request_status === accountingConstants.UPDATE_GLACCOUNTS_SUCCESS){
                                                // resetForm();
                                                this.handleEditGlClose();
                                                setTimeout(() => {
                                                    this.getGLAccounts(allAccountsData); 
                                                    this.props.dispatch(acoountingActions.updateGLAccount("CLEAR"));
                                                    
                                                }, 2000);
                                            }else{
                                                setTimeout(() => {
                                                    this.props.dispatch(acoountingActions.updateGLAccount("CLEAR"))
                                                }, 2000);
                                            }
                                            
                                            

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
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">GL Code</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    name="glCode"
                                                    value={values.glCode}
                                                    onChange={handleChange} 
                                                    className={errors.glCode && touched.glCode ? "is-invalid": null}
                                                    required />
                                                    {errors.glCode && touched.glCode ? (
                                                        <span className="invalid-feedback">{errors.glCode}</span>
                                                    ) : null} 
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Account Name</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    name="accountName"
                                                    value={values.accountName}
                                                    onChange={handleChange} 
                                                    className={errors.accountName && touched.accountName ? "is-invalid": null}
                                                    required />
                                                    {errors.accountName && touched.accountName ? (
                                                        <span className="invalid-feedback">{errors.accountName}</span>
                                                    ) : null} 
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group controlId="countriesList">
                                                    <Form.Label className="block-level">Account Type</Form.Label>
                                                    <Select
                                                        options={allAccountTypes}
                                                        onChange={(selectedAccType) => {
                                                            this.setState({ selectedAccType });
                                                            // errors.accountType = null
                                                            values.accountType = selectedAccType.value
                                                        }}
                                                        isDisabled={true}
                                                        className={errors.accountType && touched.accountType ? "is-invalid" : null}
                                                        defaultValue ={{label:selectGlAcc.accountTypeDescription, value: selectGlAcc.accountTypeId}}
                                                        name="accountType"
                                                        required
                                                    />
                                                    {errors.accountType && touched.accountType ? (
                                                        <span className="invalid-feedback">{errors.accountType}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label className="block-level">Account Usage</Form.Label>
                                                    <Select
                                                        options={accountUsage}
                                                        onChange={(selectedUsageOption) => {
                                                            this.setState({ selectedUsageOption });
                                                            // errors.accountUsage = null
                                                            values.accountUsage = selectedUsageOption.value
                                                        }}
                                                        isDisabled={true}
                                                        className={errors.accountUsage && touched.accountUsage ? "is-invalid" : null}
                                                        defaultValue ={{label:selectGlAcc.accountUsageDescription, value: selectGlAcc.accountUsageId}}
                                                        
                                                        name="accountUsage"
                                                        required
                                                    />
                                                    {errors.accountUsage && touched.accountUsage ? (
                                                        <span className="invalid-feedback">{errors.accountUsage}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        
                                        <Form.Group className="table-helper">
                                            <input type="checkbox"
                                            name="allowManualEntry" 
                                            onChange={handleChange} 
                                            checked={values.allowManualEntry? values.allowManualEntry:null}
                                            value={values.allowManualEntry}
                                            id="allowManualEntry"/>
                                            <label htmlFor="allowManualEntry">Manual Entries allowed</label>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="block-level">Notes</Form.Label>
                                            <Form.Control name="accountNotes"
                                            as="textarea" rows="3" 
                                            onChange={handleChange} 
                                            value={values.accountNotes}
                                            />
                                        </Form.Group>
                                            
                                       
                                        <div className="footer-with-cta toleft">
                                            <Button variant="secondary" className="grayed-out" onClick={this.handleEditGlClose}>Cancel</Button>
                                            <Button
                                                type="submit"
                                                
                                                disabled={updateGLAccount.is_request_processing}>
                                                    {updateGLAccount.is_request_processing?"Please wait...": "Update"}
                                                </Button>
                                        </div>
                                    </Form>
                                )}
                        </Formik>
                        {/* {updateGLAccount.request_status === accountingConstants.UPDATE_GLACCOUNTS_SUCCESS && 
                            <Alert variant="success">
                            {updateGLAccount.request_data.response.data.message}
                            </Alert>
                        } */}
                        {updateGLAccount.request_status === accountingConstants.UPDATE_GLACCOUNTS_FAILURE && 
                            <Alert variant="danger">
                            {updateGLAccount.request_data.error}
                            </Alert>
                        }
                    </Modal.Body>
                </Modal>
            )
        }
    }



    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    {this.newGLAccountPopUp()}
                    {
                        this.props.getGLAccounts.request_status ===accountingConstants.GET_GLACCOUNTS_SUCCESS
                        && this.editGLAccountPopUp()
                    }
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Account Management</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink to={'/balancesheet'}>Balance Sheet</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/profit-loss'}>Profit & Loss</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/trial-balance'}>Trial Balance</NavLink>
                                        </li>
                                        <li>
                                            {/* <NavLink to={'/accounts/journal'}>Journal Entries</NavLink> */}
                                            <NavLink to={'/journals'}>Journal Entries</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/accounts'}>Charts of Accounts</NavLink>
                                            {/* <ul>
                                                <li>
                                                    <NavLink to={'/accounts/charts/all'}>All</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/liabilities'}>Liabilities</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/equity'}>Equity</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/income'}>Income</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/expenses'}>Expenses</NavLink>
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
                                                {this.renderAllGL()}
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
        getGLAccounts : state.accountingReducers.getGLAccountsReducer,
        createGLAccount : state.accountingReducers.createGLAccountsReducer,
        updateGLAccount : state.accountingReducers.updateGLAccountReducer,
    };
}

export default connect(mapStateToProps)(AccountManagement);