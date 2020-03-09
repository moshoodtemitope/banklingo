import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../redux/actiontypes/dashboard/dashboard.constants'

import "./activities.scss"; 
class Activties extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
            isRefresh:false
        }
        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getActivitiesData(params);
    }

    getActivitiesData = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(dashboardActions.getActivitiesData(paramters));
    }

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let {CurrentPage}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage, isRefresh: true});
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;


        if(tempData){
            dispatch(dashboardActions.getActivitiesData(params, tempData));
        }else{
            dispatch(dashboardActions.getActivitiesData(params));
        }
        
       
        // dispatch(dashboardActions.getActivitiesData(params));
    }

    loadNextPage = (nextPage, tempData)=>{
        console.log("dsdsd", nextPage);
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        let params = `PageSize=${PageSize}&CurrentPage=${nextPage}`;
        

        if(tempData){
           dispatch(dashboardActions.getActivitiesData(params,tempData));
        }else{
           dispatch(dashboardActions.getActivitiesData(params));
        }
    }

    renderActivities=()=>{
        let getActivitiesRequestData = this.props.getActivitiesRequest,
            {isRefresh} = this.state;

        let saveRequestData= getActivitiesRequestData.request_data!==undefined?getActivitiesRequestData.request_data.tempData:null;
        if(getActivitiesRequestData.request_status ===dashboardConstants.GET_ACTIVITIES_DATA_PENDING
            ){
                if(saveRequestData===undefined){
                    return(
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
                                    <select id="toshow"

                                        className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25" >25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Date Created</th>
                                        <th>Username</th>
                                        <th>Action</th>
                                        <th>Affected Customer</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
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
                }else{
                    let getActivitiesData = (saveRequestData.result!==undefined)?saveRequestData.result:saveRequestData;
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
                                        <th>Id</th>
                                        <th>Date Created</th>
                                        <th>Username</th>
                                        <th>Action</th>
                                        <th>Affected Customer</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.result.map((eachActivity, index)=>{
                                            return(
                                                <Fragment key={index}>
                                                    <tr>
                                                        <td>{eachActivity.id}</td>
                                                        <td>{eachActivity.creationDate}</td>
                                                        <td>{eachActivity.userName}</td>
                                                        <td>{eachActivity.action}</td>
                                                        <td>{eachActivity.affectedCustomerName}</td>
                                                    </tr>
                                                </Fragment>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </TableComponent>

                        </div>
                    )
                }
        }

        if(getActivitiesRequestData.request_status ===dashboardConstants.GET_ACTIVITIES_DATA_SUCCESS
            ){
                let allActivitiesData = getActivitiesRequestData.request_data.response.data;

                if(allActivitiesData.result!==undefined){
                    if(allActivitiesData.result.length>=1){
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
                                                onChange={(e)=>this.setPagesize(e, allActivitiesData)}
                                                value={this.state.PageSize}
                                                className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={allActivitiesData.totalPages}
                                            currPage={allActivitiesData.currentPage}
                                            currRecordsCount={allActivitiesData.result.length}
                                            totalRows={allActivitiesData.totalRows}
                                            tempData={allActivitiesData.result}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Date Created</th>
                                            <th>Username</th>
                                            <th>Action</th>
                                            <th>Affected Customer</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allActivitiesData.result.map((eachActivity, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachActivity.id}</td>
                                                            <td>{eachActivity.creationDate}</td>
                                                            <td>{eachActivity.userName}</td>
                                                            <td>{eachActivity.action}</td>
                                                            <td>{eachActivity.affectedCustomerName}</td>
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
                                        <select id="toshow"
                                                // onChange={this.setPagesize}
                                                value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25" >25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Date Created</th>
                                            <th>Username</th>
                                            <th>Action</th>
                                            <th>Affected Customer</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
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
                    return null
                }
        }

        if (getActivitiesRequestData.request_status === dashboardConstants.GET_ACTIVITIES_DATA_FAILURE
        ) {
            return (
                <div className="loading-content errormsg">
                    <div>{getActivitiesRequestData.request_data.error}</div>
                </div>
            )
        }

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
                                                <h2>System Activities</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderActivities()}
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
        getActivitiesRequest: state.dashboardReducers.getActivitiesReducer,
    };
}

export default connect(mapStateToProps)(Activties);