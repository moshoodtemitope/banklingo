import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
            isRefresh:false,
            endDate: "",
            startDate: "",
            SearchText:""
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

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        
        this.setState({ startDate }, ()=>{
            if(this.state.endDate!==""){
                //this.getHistory();
            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
       
        this.setState({ endDate }, ()=>{
                if(this.state.startDate!==""){
                    //this.getHistory();
                }
        });
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

    searchTxtn = (e,tempData)=>{
        e.preventDefault()
        const {dispatch} = this.props;
        let {PageSize,CurrentPage, SearchText, endDate, startDate} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        if(SearchText!=="" || endDate!=="" || startDate!==""){
            if(endDate!==""){
                endDate = endDate.toISOString()
            }
            if(startDate!==""){
                startDate = startDate.toISOString()
            }
            let params= `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

            if(tempData){
                dispatch(dashboardActions.getActivitiesData(params,tempData));
            }else{
                dispatch(dashboardActions.getActivitiesData(params));
            }
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
                            <div className="loading-text">Please wait... </div>
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
                                        {/* <th>Id</th> */}
                                        <th>Date Created</th>
                                        <th>Username</th>
                                        <th>Action</th>
                                        <th>Affected Customer</th>
                                        <th>Affected Item Name</th>
                                        <th>Affected Item Id</th>
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
                                        <td></td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }else{
                    
                    return(
                        <div className="loading-content">
                            <div className="loading-text">Please wait... </div>
                            <div className="heading-with-cta">
                                <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, saveRequestData)} >

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="table-filters">
                                        <DatePicker
                                            onChangeRaw={this.handleDateChangeRaw}
                                            onChange={this.handleStartDatePicker}
                                            selected={this.state.startDate}
                                            dateFormat="d MMMM, yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            placeholderText="Start date"
                                            maxDate={new Date()}
                                            // className="form-control form-control-sm h-38px"
                                            className="form-control form-control-sm "

                                        />
                                        <DatePicker placeholderText="End  date"
                                            onChangeRaw={this.handleDateChangeRaw}
                                            onChange={this.handleEndDatePicker}
                                            selected={this.state.endDate}
                                            dateFormat="d MMMM, yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            maxDate={new Date()}
                                            // className="form-control form-control-sm h-38px"
                                            className="form-control form-control-sm"

                                        />
                                        <input type="text"
                                            className="form-control-sm search-table form-control"
                                            placeholder="Search text"
                                            value={this.state.SearchText}
                                            onChange={(e) => {
                                                this.setState({ SearchText: e.target.value.trim() })
                                            }}
                                        />
                                        {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
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
                                        {/* <th>Id</th> */}
                                        <th>Date Created</th>
                                        <th>Username</th>
                                        <th>Action</th>
                                        <th>Affected Customer</th>
                                        <th>Affected Item Name</th>
                                        <th>Affected Item Id</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.map((eachActivity, index)=>{
                                            return(
                                                <Fragment key={index}>
                                                    <tr>
                                                        {/* <td>{eachActivity.id}</td> */}
                                                        <td>{eachActivity.creationDate}</td>
                                                        <td>{eachActivity.userName}</td>
                                                        <td>{eachActivity.action}</td>
                                                        <td>{eachActivity.affectedCustomerName}</td>
                                                        <td>{eachActivity.affectedItemName}</td>
                                                        <td>{eachActivity.affectedItemId}</td>
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
                                    <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, allActivitiesData.result)} >

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="table-filters">
                                            <DatePicker
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleStartDatePicker}
                                                selected={this.state.startDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="Start date"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm "

                                            />
                                            <DatePicker placeholderText="End  date"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleEndDatePicker}
                                                selected={this.state.endDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm"

                                            />
                                            <input type="text"
                                                className="form-control-sm search-table form-control"
                                                placeholder="Search text"
                                                value={this.state.SearchText}
                                                onChange={(e) => {
                                                    this.setState({ SearchText: e.target.value.trim() })
                                                }}
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                                onChange={(e)=>this.setPagesize(e, allActivitiesData.result)}
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
                                            {/* <th>Id</th> */}
                                            <th>Date Created</th>
                                            <th>Username</th>
                                            <th>Action</th>
                                            <th>Affected Customer</th>
                                            <th>Affected Item Name</th>
                                            <th>Affected Item Id</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allActivitiesData.result.map((eachActivity, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            {/* <td>{eachActivity.id}</td> */}

                                                            <td>{eachActivity.creationDate}</td>
                                                            <td>{eachActivity.userName}</td>
                                                            <td>{eachActivity.action}</td>
                                                            <td>{eachActivity.affectedCustomerName}</td>
                                                            <td>{eachActivity.affectedItemName}</td>
                                                            <td>{eachActivity.affectedItemId}</td>
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
                                    <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, allActivitiesData.result)} >

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="table-filters">
                                            <DatePicker
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleStartDatePicker}
                                                selected={this.state.startDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="Start date"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm "

                                            />
                                            <DatePicker placeholderText="End  date"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleEndDatePicker}
                                                selected={this.state.endDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm"

                                            />
                                            <input type="text"
                                                className="form-control-sm search-table form-control"
                                                placeholder="Search text"
                                                value={this.state.SearchText}
                                                onChange={(e) => {
                                                    this.setState({ SearchText: e.target.value.trim() })
                                                }}
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
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
                                            {/* <th>Id</th> */}
                                            <th>Date Created</th>
                                            <th>Username</th>
                                            <th>Action</th>
                                            <th>Affected Customer</th>
                                            <th>Affected Item Name</th>
                                            <th>Affected Item Id</th>
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