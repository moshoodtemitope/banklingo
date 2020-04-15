import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./styles.scss"; 
import { numberWithCommas , getDateFromISO} from '../../shared/utils';


import {productActions} from '../../redux/actions/products/products.action';
import {productsConstants} from '../../redux/actiontypes/products/products.constants'

class ViewDepositProduct extends React.Component {
    constructor(props) {
        super(props);
        // this.userEncodedKey = this.props.match.params.userid;
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            PageSize: 100,
            CurrentPage: 1,
        }
        // console.log('props are', this.props.match.params)
    }

    componentDidMount() {
        // this.loadInitialUserData();
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.match.params.userid !== this.props.match.params.userid) {
        
    //         this.userEncodedKey = nextProps.match.params.userid;
    //     }

    // }


    loadInitialUserData = ()=>{
        let { PageSize, CurrentPage} = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

       
    }

    



    
    renderPage = ()=>{
        let getSingleDepositProductRequest = this.props.getSingleDepositProductsReducer;



        if(getSingleDepositProductRequest.request_status===productsConstants.GET_A_DEPOSIT_PRODUCT_SUCCESS){
            let 
            getSingleDepositProductData = getSingleDepositProductRequest.request_data.response.data;
                    
                    return(
                        <div className="row">

                            <div className="col-sm-12">
                                <div className="middle-content">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            
                                            <div className="main-details mt-20">
                                                <div className="overview-wrap profile-overview">
                                                    <div className="each-overview">
                                                        <h6>General Information</h6>
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>

                                                                <tr>
                                                                    <td>Description</td>
                                                                    <td>{getSingleDepositProductData.description}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Currency</td>
                                                                    <td>{getSingleDepositProductData.currencyCode}</td>
                                                                </tr>

                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="leftside-items">
                                               
                                               
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
            }
    }
    

    render() {
        
        return (
            <Fragment>
                {/* <InnerPageContainer {...this.props}> */}
                    <div className="content-wrapper">
                        <div className="module-content">
                            <div className="content-container">
                                {this.renderPage()}
                            </div>
                        </div>
                    </div>
                {/* </InnerPageContainer> */}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        getSingleDepositProductsReducer: state.productReducers.getSingleDepositProductsReducer, 
    };
}

export default connect(mapStateToProps)(ViewDepositProduct);