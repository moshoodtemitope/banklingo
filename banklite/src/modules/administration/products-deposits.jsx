import * as React from "react";
// import {Router} from "react-router";

import { connect } from 'react-redux';
import {Fragment} from "react";
import AdminNav from './_menu'

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
// import  SidebarElement from '../../shared/elements/sidebar'

import { productActions } from '../../redux/actions/products/products.action';
import { productsConstants } from '../../redux/actiontypes/products/products.constants'
import "./administration.scss"; 
class ProductDeposits extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
            isRefresh:false,
            FullDetails:false
        }

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getDepositProducts(params);
    }

    getDepositProducts = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(productActions.getDepositProducts(paramters));
    }

    setPagesize = (PageSize, tempData)=>{
        
        const {dispatch} = this.props;


        let sizeOfPage = PageSize.target.value,
            {FullDetails, CurrentPage} = this.state;

        this.setState({PageSize: sizeOfPage, isRefresh: true});

        let params= `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        if(tempData){
            
            dispatch(productActions.getDepositProducts(params,tempData));
        }else{
            dispatch(productActions.getDepositProducts(params));
        }
       
        // dispatch(productActions.getDepositProducts(params));
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if(tempData){
            dispatch(productActions.getDepositProducts(params,tempData));
        }else{
            dispatch(productActions.getDepositProducts(params));
        }
    }

    setShowDetails = (FullDetails, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let showDetails = FullDetails.target.checked,
            {CurrentPage, PageSize} = this.state;

        this.setState({FullDetails: showDetails});

        let params= `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        // this.getDepositProducts(params);

        if(tempData){
            
            dispatch(productActions.getDepositProducts(params,tempData));
        }else{
            dispatch(productActions.getDepositProducts(params));
        }
    }

    renderDepositProducts=()=>{
        let getDepositProductsRequestData = this.props.getDepositProductsRequest,
            {isRefresh} = this.state;


            let saveRequestData= getDepositProductsRequestData.request_data!==undefined?getDepositProductsRequestData.request_data.tempData:null;

            if(getDepositProductsRequestData.request_status ===productsConstants.GET_DEPOSIT_PRODUCTS_PENDING){
                if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
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
                                        <th>Product Name</th>
                                        <th>Product Code</th>
                                        <th>Product Type</th>
                                        <th>Last Modified</th>
                                        <th>Active</th>
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
                            <div className="loading-text">Please wait... </div>
                            {/* <div className="footer-with-cta toleft">
                                <NavLink to={'/administration/products/newloan-product'} className="btn btn-primary">New Deposit Product</NavLink>

                            </div> */}
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
                                        value={this.state.PageSize}
                                        className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="loading-text">Please wait... </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Deposit Product Name</th>
                                        <th>Deposit Product Code</th>
                                        <th>Deposit Product Type</th>
                                        <th>Last Modified</th>
                                        <th>Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {saveRequestData.map((eachDepositProduct, index)=>{
                                        return(
                                            <Fragment key={index}>
                                                <tr>
                                                    <td>
                                                        <NavLink className="dropdown-item" to={`/administration/products/deposit/edit/${eachDepositProduct.productEncodedKey}`}>{eachDepositProduct.productName}</NavLink>
                                                        
                                                    </td>
                                                    <td>{eachDepositProduct.currencyCode}</td>
                                                    <td>{eachDepositProduct.productCode}</td>
                                                    <td>{eachDepositProduct.depositAccountTypeDescription}</td>
                                                    <td>{eachDepositProduct.lastModified}</td>
                                                    <td>{eachDepositProduct.isActive.toString()==="true"?"Active":"Not Active"}</td>
                                                </tr>
                                            </Fragment>
                                            
                                        )
                                    })}
                                    
                                </tbody>
                            </TableComponent>
                            <div className="footer-with-cta toleft">
                                <NavLink to={'/administration/products/newdeposits-product'} className="btn btn-primary">New Deposit Product</NavLink>

                            </div>
                        </div>
                    )
                }
            }

            if(getDepositProductsRequestData.request_status ===productsConstants.GET_DEPOSIT_PRODUCTS_SUCCESS){
                let allDepositProductsData = getDepositProductsRequestData.request_data.response.data;
                if(allDepositProductsData!==undefined){
                   if(allDepositProductsData.result.length>=1){
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
                                            onChange={(e)=>this.setPagesize(e, allDepositProductsData.result)}
                                            // onChange={this.setPagesize}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={allDepositProductsData.totalPages}
                                            currPage={allDepositProductsData.currentPage}
                                            currRecordsCount={allDepositProductsData.result.length}
                                            totalRows={allDepositProductsData.totalRows}
                                            tempData={allDepositProductsData.result}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>
                                <div className="table-helper mb-10">
                                    <input type="checkbox" name="" 
                                        onChange={(e)=>this.setShowDetails(e, allDepositProductsData.result)}
                                        
                                        checked={this.state.FullDetails}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show full details</label>
                                </div>

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Currency</th>
                                            <th>Product Code</th>
                                            <th>Product Type</th>
                                            <th>Last Modified</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allDepositProductsData.result.map((eachDepositProduct, index)=>{
                                            return(
                                                <Fragment key={index}>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/depositproduct/${eachDepositProduct.productEncodedKey}`}>{eachDepositProduct.productName}</NavLink>
                                                            
                                                        </td>
                                                        <td>{eachDepositProduct.currencyCode}</td>
                                                        <td>{eachDepositProduct.productCode}</td>
                                                        <td>{eachDepositProduct.depositAccountTypeDescription}</td>
                                                        <td>{eachDepositProduct.lastModified}</td>
                                                        <td>{eachDepositProduct.isActive.toString()==="true"?"Active":"Not Active"}</td>
                                                        <td>
                                                            <DropdownButton
                                                                size="sm"
                                                                title="Actions"
                                                                key="editRole"
                                                                className="customone"
                                                            >
                                                                <NavLink className="dropdown-item" to={`/administration/products/deposit/edit/${eachDepositProduct.productEncodedKey}`}>Edit</NavLink>
                                                                {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                                            </DropdownButton>
                                                        </td>
                                                    </tr>
                                                </Fragment>
                                                
                                            )
                                        })}
                                        
                                    </tbody>
                                </TableComponent>
                                <div className="footer-with-cta toleft">
                                    <NavLink to={'/administration/products/newdeposits-product'} className="btn btn-primary">New Deposit Product</NavLink>

                                </div>
                            </div>
                        )
                   }
                   else{
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
                                    
                                </div>
                            </div>


                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Currency</th>
                                        <th>Product Code</th>
                                        <th>Product Type</th>
                                        <th>Last Modified</th>
                                        <th>Active</th>
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
                                <NavLink to={'/administration/products/newdeposits-product'} className="btn btn-primary">New Deposit Product</NavLink>

                            </div>
                        </div>
                    )
                   }
                }else{
                    return null
                }
            }

            if (getDepositProductsRequestData.request_status === productsConstants.GET_DEPOSIT_PRODUCTS_FAILURE){
                return (
                    <div className="loading-content errormsg">
                        <div>{getDepositProductsRequestData.request_data.error}</div>
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
                                                <h2>Administration</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                <AdminNav />
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/administration/products'}>Loans</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/products/deposits'}>Deposits</NavLink>
                                                {/* <NavLink to={'/administration/administration-generalcurrency'}>Currency</NavLink> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderDepositProducts()}
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
        getDepositProductsRequest: state.productReducers.getDepositProductsReducer,
    };
}

export default connect(mapStateToProps)(ProductDeposits);