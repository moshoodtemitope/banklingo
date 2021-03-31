import * as React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import {Fragment} from "react";
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
// import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import {NavLink} from 'react-router-dom';
import { history } from '../../../_helpers/history';
import {authActions} from '../../../redux/actions/auth/auth.action';

import AsyncSelect from 'react-select/async';

import {saveRouteForRedirect} from "../../utils";
// import {Nav, NavDropdown, Navbar, Form, Button, FormControl} from 'react-bootstrap'

import {administrationActions} from '../../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../../redux/actiontypes/administration/administration.constants'

import {dashboardActions} from '../../../redux/actions/dashboard/dashboard.action';
import {dashboardConstants} from '../../../redux/actiontypes/dashboard/dashboard.constants'

import {quickMenuList} from '../mainmenu/menu'
import {quickCreateMenuList} from '../mainmenu/menu'
import "./mainheader.scss"; 
class MainHeader extends React.Component{
    constructor(props) {
        super(props);
        let user = localStorage.getItem('lingoAuth')? JSON.parse(localStorage.getItem('lingoAuth')) : {};

        this.userPermissions =  JSON.parse(localStorage.getItem("x-u-perm"));
        // this.allPermissionsList;
        // console.log("user is", user.BranchId)
        // if(user.BranchId)
        if(Object.keys(user).length<=1){
            history.push('/');
       }
        this.state={
            user:JSON.parse(localStorage.getItem('lingoAuth')),
            activeBranch:JSON.parse(localStorage.getItem('lingoAuth')).BranchName,
            showDropdown: false,
            selectedOption: "",
        }
       if(Object.keys(this.props.user).length<=1){
            history.push('/');
       }
       
    
    }

    componentDidMount(){
        this.getCustomerTypes();
        document.addEventListener("mousedown",this.handleBodyClick, false);
    }

    // componentWillMount(){
    //     document.addEventListener("mousedown",this.handleBodyClick, false);
    // }
    componentWillUnmount(){
        document.removeEventListener("mousedown",this.handleBodyClick, false);
    }


    

   

    handleCurrentBranchClicked = () =>{
        let {user} = this.state;
        if(user.AllowableBranches.length>1){
            this.setState({showDropdown: true})
        }
        
    }

    chooseBranch = (e)=>{
        
        let user = JSON.parse(localStorage.getItem('lingoAuth'));
            user.BranchId = e.target.value;
            // localStorage.setItem('lingoAuth', JSON.stringify(user));
            let selectedBranch = user.AllowableBranches.filter(branch=>branch.id===parseInt(e.target.value))[0].name;
            user.BranchName = selectedBranch;
            localStorage.setItem('lingoAuth', JSON.stringify(user));
        this.setState({showDropdown: false, 
                        activeBranch: selectedBranch
                    })
            window.location.reload();
    }

    logout =()=>{
        const { dispatch } = this.props;
        // let currentRoute = window.location.pathname;

        // dispatch(authActions.Logout("timeout",currentRoute));
        // console.log("----------+++---")
        dispatch(authActions.Logout());
        
        localStorage.removeItem("user");
        history.push('/');
    }

    getCustomerTypes = ()=>{
        const {dispatch} = this.props;
        
        dispatch(administrationActions.getAllCustomerTypes());
    }

    renderCreateMenu =()=>{
        let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;

        let allMenu = quickCreateMenuList,
            allMenuGroups = [],
            allUSerPermissionNames = [],
            allQuickMenus=[],
            allUSerPermissions =[];

        allMenu.map(eachMenu=>{
            if(allMenuGroups.indexOf(eachMenu.permissionName)===-1){
                allMenuGroups.push(eachMenu.permissionName)
            }
            
        })

        this.userPermissions.map(eachPermission=>{
            // if(allUSerPermissionNames.indexOf(eachPermission.groupName)===-1){
            //     allUSerPermissionNames.push(eachPermission.groupName)
            // }
            if(allUSerPermissionNames.indexOf(eachPermission.permissionName)===-1){
                allUSerPermissionNames.push(eachPermission.permissionName)
            }
            allUSerPermissions.push(eachPermission.permissionCode)
        })

        if(allUSerPermissionNames.length>=1){
            let menuToAdd;
            allUSerPermissionNames.map(eachPermission=>{
                menuToAdd =  allMenuGroups.filter(eachMenuGroup=>eachMenuGroup ===eachPermission)[0];
                if(menuToAdd!==undefined){
                    allQuickMenus.push(menuToAdd)
                }
                
            })
        }

        

        switch(adminGetCustomerTypesRequest.request_status){
            case (administrationConstants.GET_ALL_CUSTOMERTYPES_SUCCESS):{
                let allCustomerTypesData = adminGetCustomerTypesRequest.request_data.response.data||adminGetCustomerTypesRequest.request_data.response,
                    allCustomerTypes=[];
                    // console.log("====", allCustomerTypesData);
                // if(allCustomerTypesData.length>=1){
                    if(allQuickMenus.length >=1){
                        return(
                        
                            <DropdownButton
                                size="sm"
                                variant="secondary"
                                title="Create"
                                className="headingmenu-dropdown"
                                >
                                    {
                                        allCustomerTypesData.map((eachType, id)=>{
                                            // allCustomerTypes.push({label: eachType.name, value:eachType.id});
                                            let custType = eachType.name.split(' ').join('');
                                            if(allUSerPermissions.indexOf("bnk_create_client") > -1){
                                                return(
                                                    <NavLink className="menu-grouplist" key={id} exact to={`/clients/new/${custType}/${eachType.encodedKey}`}>{eachType.name}</NavLink>
                                                )
                                            }else{
                                                return null;
                                            }
                                            //  return( <NavLink to={'/dashboard'}>dsdhsjdhshjd</NavLink>)
                                        })
                                    }

                                    {
                                        allMenu.map((eachGroup, menuIdx) =>{
                                            if(allUSerPermissionNames.indexOf(eachGroup.permissionName)> -1 ){
                                                return(
                                                    <NavLink key={menuIdx} to={eachGroup.menuRoute}>{eachGroup.mainMenu}</NavLink>
                                                )
                                            }
                                        })
                                    }
                                    
                                    {/* <NavLink exact to={'/all-loans/newloan-account'}>Loan Account</NavLink>
                                    <NavLink to={'/deposits/newaccount'}>Deposit Account</NavLink>
                                    <NavLink to={'/administration/access/new-user'}>User</NavLink> */}
                                </DropdownButton>
                        )
                    }else{
                        return null
                    }
                // }
            }
            default :
            return null;
        }
        // return( <NavLink to={'/dashboard'}>dsdhsjdhshjd</NavLink>)
    }

    renderAllowableBranches =()=>{
        let {AllowableBranches} = this.state.user;
        return(
            <select name="" id="" onBlur={this.chooseBranch} onChange={this.chooseBranch}>
                {
                    AllowableBranches.map(eachBranch=>{
                        return(
                            <option key={eachBranch.id} value={eachBranch.id}>{eachBranch.name}</option>
                        )
                        
                    })
                }
                
            </select>
        )
    }

    getSearchOptionValue = (option) => option.searchItemEncodedKey; // maps the result 'id' as the 'value'

    getSearchOptionLabel = (option) => option.searchText; // maps the result 'name' as the 'label'
    
    goToSelectedSearchResult =(selectedResultData)=>{


        let resultType = selectedResultData.searchItemType,
            searchItemEncodedKey = selectedResultData.searchItemEncodedKey,
            clientEncodedKey = selectedResultData.clientEncodedKey;
            

            // public enum SearchItemType
            // {
            //     [Description("Client")]
            //     CLIENT = 0,
            //     [Description("User")]
            //     USER = 1,
            //     [Description("Loan")]
            //     LOAN = 2,
            //     [Description("Deposit")]
            //     DEPOSIT = 3,
            //     [Description("Loan Product")]
            //     LOAN_PRODUCT = 4,
            //     [Description("Deposit Product")]
            //     DEPOSIT_PRODUCT = 5,
            //     [Description("Branch")]
            //     BRANCH = 6
            // }

            if(resultType===0){
                history.push({
                    pathname:`/customer/${searchItemEncodedKey}`
                });
            }
            if(resultType===1){
                history.push(`/user/${searchItemEncodedKey}`);
            }
            if(resultType===2 && clientEncodedKey!=="" && clientEncodedKey!==null){
                history.push(`/customer/${clientEncodedKey}/loanaccount/${searchItemEncodedKey}`);
            }

            if(resultType===3 && clientEncodedKey!=="" && clientEncodedKey!==null){
                history.push(`/customer/${clientEncodedKey}/savingsaccount/${searchItemEncodedKey}`);
            }
            this.props.dispatch(dashboardActions.globalSearchAnItem("CLEAR"));
            // if(resultType===4 && clientEncodedKey!=="" && clientEncodedKey!==null){
            //     history.push(`/customer/${clientEncodedKey}/savingsaccount/${searchItemEncodedKey}`);
            // }
    }

    handleSearchInputChange = (selectedOption, {action})=> { 
        this.setState({
            selectedOption: selectedOption
        });
        // this is for update action on selectedOption
        // will use the noop defaultProp if the dev didn't define the prop, so no need to conditionally call
        this.goToSelectedSearchResult(selectedOption);
    }

    getSearchedItemResults = async (inputValue)=> {
        const {dispatch} = this.props;

        if (!inputValue || inputValue.length===0) {
          return null;
        }
        // const response = await fetch(
        //   `${this.state.searchApiUrl}?search=${inputValue}&limit=${this.state.limit}`
        // );

         await dispatch(dashboardActions.globalSearchAnItem(inputValue));

        
        
        // const json = await response.json();
        // return json.results;
    }

    


    initiateGlobalSearchItem =(inputValue)=>{
        let globalSearchAnItemRequest = this.props.globalSearchAnItemReducer,
            searchResultsData,
            searchResultsList =[];
        this.props.dispatch(dashboardActions.globalSearchAnItem("CLEAR"));
        if(inputValue.length>=1){
            return this.getSearchedItemResults(inputValue)
                    .then(
                        ()=>{
                        if (globalSearchAnItemRequest.request_status === dashboardConstants.GLOBAL_SEARCH_ITEM_SUCCESS) {
                            // console.log("serch rsulrs", globalSearchAnItemRequest.request_data.response.data);
                            searchResultsData = globalSearchAnItemRequest.request_data.response.data;
                            
                            return searchResultsData;
                        }
                        
                    })
        }else{
            return null;
        }
        
           
        

                
    }

    noOptionsMessage(inputValue) {
        // if (this.props.options.length) return null;
        // if (!inputValue) {
        //   return i18n.get('app.commons.label.search');
        // }
        // return i18n.get('app.commons.errors.emptySearchResult');
        return ""
    }


    //Custom Search Implemetation

    setWrapperRef =(node)=> {
        this.wrapperRef = node;
    }

    handleBodyClick=(event) =>{
        
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.dispatch(dashboardActions.globalSearchAnItem("CLEAR"));
            
        }
    }

    getSearchTermResults = (inputValue)=>{
        let globalSearchAnItemRequest = this.props.globalSearchAnItemReducer,
            searchResultsData,
            searchResultsList =[];
        this.props.dispatch(dashboardActions.globalSearchAnItem("CLEAR"));
        if(inputValue.length>=1){
            return this.getSearchedItemResults(inputValue)
                    .then(
                        ()=>{
                        if (globalSearchAnItemRequest.request_status === dashboardConstants.GLOBAL_SEARCH_ITEM_SUCCESS) {
                            // console.log("serch rsulrs", globalSearchAnItemRequest.request_data.response.data);
                            searchResultsData = globalSearchAnItemRequest.request_data.response.data;
                            
                            return searchResultsData;
                        }
                        
                    })
        }else{
            return null;
        }
    }
    
    handleSearchInput =(searchValue, isClearable)=>{
        
        if(isClearable===true){
            searchValue.target.value = "";
            // this.props.dispatch(dashboardActions.globalSearchAnItem("CLEAR"));
        }

        if(searchValue.target.value.length>=1){
            let searchTerm = searchValue.target.value;
            this.getSearchTermResults(searchTerm);
        }

    }

    clearSearchRecord = (searchValue)=>{
        
        this.props.dispatch(dashboardActions.globalSearchAnItem("CLEAR"));

        if(searchValue.target.value.length>=1){
            let searchTerm = searchValue.target.value;
            this.getSearchTermResults(searchTerm);
        }
    }

    keyPressed = (event)=> {
        if (event.key === "Enter") {
            event.preventDefault();
            if(event.target.value.length>=1){
                let searchTerm = event.target.value;
                this.getSearchTermResults(searchTerm);
            }
        }
    }

    renderSearchResults = ()=>{
        let globalSearchAnItemRequest = this.props.globalSearchAnItemReducer;

        if(globalSearchAnItemRequest.request_status === dashboardConstants.GLOBAL_SEARCH_ITEM_PENDING) {
            return (
                <div className="searchresults-wrap noresult" ref={this.setWrapperRef}>
                    <div className="loading-search">Searching...</div>
                </div>
            )
        }

        if(globalSearchAnItemRequest.request_status === dashboardConstants.GLOBAL_SEARCH_ITEM_SUCCESS) {
            let searchResult =  globalSearchAnItemRequest.request_data.response.data;
             let resultChunk = [];
            
            if(searchResult.length>=1){
                let searchResultType =[];
               
                searchResult.map((eachResult, index)=>{
                    // if(searchResultType.indexOf(eachResult.searchItemTypeDesc)===-1){
                    if(searchResultType.filter(eachType=> eachType.searchType ===eachResult.searchItemType).length<1){
                        searchResultType.push({
                            searchType: eachResult.searchItemType,
                            searchTypeDesc: eachResult.searchItemTypeDesc
                        })

                    }
                })

                // searchResult.map((eachResult, index)=>{
                    
                //     searchResultType.forEach((eachType)=>{
                //         if(eachResult.searchItemType === eachType.searchType){
                //             let resultGroup = [];
                //             resultGroup.push(eachResult)
                //             resultChunk.push({
                //                 resultTypeText:  eachType.searchTypeDesc,
                //                 resultData: resultGroup
                //             })
                //         } 
                //     })
                // })

                searchResultType.forEach((eachType)=>{
                    let resultGroup = [];
                    searchResult.map((eachResult, index)=>{
                        if(eachResult.searchItemType === eachType.searchType){
                            resultGroup.push(eachResult)
                        } 
                    })
                    
                    // resultChunk.forEach((eachChunk)=>{
                        // if(eachChunk.resultTypeText!==eachType.searchTypeDesc){
                            resultChunk.push({
                                resultTypeText:  eachType.searchTypeDesc,
                                resultType:  eachType.searchType,
                                resultData: resultGroup
                            })
                        // }
                    // })
                    
                })

                

                return (
                    <div className="searchresults-wrap" ref={this.setWrapperRef}>
                        {
                            resultChunk.map((eachSearchResult, index)=>{
                                return(
                                    <div className="each-search-resultlist" key={index} >
                                       <h5>{eachSearchResult.resultTypeText}</h5>
                                       <div className="resultlist">
                                        {
                                            eachSearchResult.resultData.map((resultList, resultIndex)=>{
                                                
                                                return(
                                                    <div className="result-details" key={resultIndex} 
                                                        onClick={(e)=>{
                                                            // e.stopPropagation();
                                                            
                                                            this.goToSelectedSearchResult(resultList)
                                                        }}>
                                                        {resultList.searchText}
                                                        <span>{resultList.searchKey!==""?`- ${resultList.searchKey}`:""}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                       </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                )
            }else{
                return (
                    <div className="searchresults-wrap noresult" ref={node=>this.node=node}>
                        <div className="each-search-result">No result found</div>
                    </div>
                )
            }
            
        }

        if(globalSearchAnItemRequest.request_status === dashboardConstants.GLOBAL_SEARCH_ITEM_FAILURE) {
            return (
                <div className="searchresults-wrap noresult" ref={this.setWrapperRef}>
                    <div className="errormsg">{globalSearchAnItemRequest.error}</div>
                </div>
            )
        }

        return null;
    }
    

    renderGlobalSearch =()=>{
        const { selectedOption } = this.state;
        let globalSearchAnItemRequest = this.props.globalSearchAnItemReducer;
        return(
            <Form inline className="searchfieldwrap async-search-wrap">
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2 noborder-input heading-searchInput" /> */}
                {/* <AsyncSelect
                    cacheOptions= {false}
                    value={selectedOption}
                    noOptionsMessage={this.noOptionsMessage}
                    getOptionValue={this.getSearchOptionValue}
                    getOptionLabel={this.getSearchOptionLabel}
                    // defaultOptions={defaultOptions}
                    loadOptions={this.initiateGlobalSearchItem}
                    placeholder=""
                    onChange={this.handleSearchInputChange}
                /> */}
                <Form.Control type="text" 
                    onChange={this.handleSearchInput}
                    onKeyPress={this.keyPressed}
                    onBlur={(e)=>this.handleSearchInput(e, true)}
                    onFocus={this.clearSearchRecord}
                    onClick={this.clearSearchRecord}
                    // value={values.depositProductName}
                    className={(globalSearchAnItemRequest.request_data!==undefined && Object.keys(globalSearchAnItemRequest.request_data).length>=1) ?"h-38px focusedsearch": "h-38px"} 
                />
                {this.renderSearchResults()}
            </Form>
        )
    }

    renderQuickViewMenu = ()=>{
        let allMenu = quickMenuList,
            allMenuGroups = [],
            allUSerPermissionNames = [],
            allQuickMenus=[],
            allUSerPermissions =[];

            allMenu.map(eachMenu=>{
                if(allMenuGroups.indexOf(eachMenu.permissionName)===-1){
                    allMenuGroups.push(eachMenu.permissionName)
                }
                
            })

            this.userPermissions.map(eachPermission=>{
                // if(allUSerPermissionNames.indexOf(eachPermission.groupName)===-1){
                //     allUSerPermissionNames.push(eachPermission.groupName)
                // }
                if(allUSerPermissionNames.indexOf(eachPermission.permissionName)===-1){
                    allUSerPermissionNames.push(eachPermission.permissionName)
                }
                allUSerPermissions.push(eachPermission.permissionCode)
            })
            // this.allPermissionsList = allUSerPermissions;

            // if(allUSerPermissions.length>=1){
            if(allUSerPermissionNames.length>=1){
                let menuToAdd;
                allUSerPermissionNames.map(eachPermission=>{
                    menuToAdd =  allMenuGroups.filter(eachMenuGroup=>eachMenuGroup ===eachPermission)[0];
                    if(menuToAdd!==undefined){
                        allQuickMenus.push(menuToAdd)
                    }
                    
                })
            }
            

            if(allQuickMenus.length>=1){
                // console.log("dnsjndsd", allMenu);
                return(

                    <DropdownButton
                                    size="sm"
                                    variant="secondary"
                                    title="View"
                                    className="headingmenu-dropdown"
                                >
                                    {
                                        allMenu.map((eachGroup, menuIdx) =>{
                                            if(allUSerPermissionNames.indexOf(eachGroup.permissionName)> -1 ){
                                                return(
                                                    <NavLink key={menuIdx} to={eachGroup.menuRoute}>{eachGroup.mainMenu}</NavLink>
                                                )
                                            }
                                        })
                                    }
                                    {/* <NavLink to={'/clients'}>Customers</NavLink>
                                    <NavLink to={'/all-loans'}>Loan Accounts</NavLink>
                                    <NavLink to={'/loan-transactions'}>Loan Transactions</NavLink>
                                    <NavLink to={'/deposits'}>Deposit Accounts</NavLink>
                                    <NavLink to={'/deposit-transactions'}>Deposit Transactions</NavLink>
                                    <NavLink to={'/activities'}>System Activities</NavLink>
                                    <NavLink to={'/branches'}>Branches</NavLink>
                                    <NavLink to={'/user-management'}>Users</NavLink>
                                    <NavLink to={'/communications'}>Communications</NavLink> */}
                                </DropdownButton>
                )
            }else{
                return null;
            }

            // return(
            //     <DropdownButton
            //         size="sm"
            //         variant="secondary"
            //         title="View"
            //         className="headingmenu-dropdown"
            //     >

            //         <NavLink to={'/clients'}>Customers</NavLink>
            //                         <NavLink to={'/all-loans'}>Loan Accounts</NavLink>
            //                         <NavLink to={'/loan-transactions'}>Loan Transactions</NavLink>
            //                         <NavLink to={'/deposits'}>Deposit Accounts</NavLink>
            //                         <NavLink to={'/deposit-transactions'}>Deposit Transactions</NavLink>
            //                         <NavLink to={'/activities'}>System Activities</NavLink>
            //                         <NavLink to={'/branches'}>Branches</NavLink>
            //                         <NavLink to={'/user-management'}>Users</NavLink>
            //                         <NavLink to={'/communications'}>Communications</NavLink>
            //                         </DropdownButton>
            // )
    }

    renderHeadingWrap(){
        // let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;
        const {user} = this.state;
        let {AllowableBranches} = this.state.user;
        let getTenant = localStorage.getItem("lingoAuthTenant")? JSON.parse(localStorage.getItem("lingoAuthTenant")): null;
        return(
            <div className="mainheader-wrap">
                
                <Navbar  >
                {/* <Navbar  expand="lg"> */}
                    {getTenant && <Navbar.Brand as={Link} to="/dashboard">{getTenant.companyName}</Navbar.Brand>}
                    {!getTenant && <Navbar.Brand as={Link} to="/dashboard">Empire Trust</Navbar.Brand>}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="heading-nav">
                        {/* <Nav className="">
                            <Nav.Link href="/"></Nav.Link>
                        </Nav> */}
                        {AllowableBranches.length >=1 &&
                            <div className="user-branch">
                                {this.state.showDropdown===false && 
                                    <div className="branch-text" 
                                        onClick={this.handleCurrentBranchClicked}> <div className="activebranch"></div>  {this.state.activeBranch}</div>
                                }
                                { this.state.showDropdown &&
                                        <div className="branch-dropdown">
                                            {this.renderAllowableBranches()}
                                            
                                        </div>
                                    }
                            </div>
                        }
                        {AllowableBranches.length ===0 &&
                            <div className="user-branch">
                                {this.state.showDropdown===false && 
                                    <div className="branch-text" 
                                        onClick={this.handleCurrentBranchClicked}> <div className="nobranch"></div> No associated branch</div>
                                }
                            </div>
                        }
                        <div className="other-headingitems">
                            
                            {/* <DropdownButton
                                size="sm"
                                variant="secondary"
                                title="Create"
                                className="headingmenu-dropdown"
                            >
                               
                                <NavLink exact to={'/createnewcustomer'}>Customer</NavLink>
                                <NavLink to={'/create-investmentcustomer'}>Investment Customer</NavLink>
                                <NavLink to={'/dashboard'}>MoneyPal-Nano Customer</NavLink>
                                <NavLink to={'/dashboard'}>Payrolla Customer</NavLink>
                                
                                <NavLink to={'/dashboard'}>Group</NavLink>
                                <NavLink to={'/all-loans/newloan-account'}>Loan Account</NavLink>
                                <NavLink to={'/deposits/newaccount'}>Deposit Account</NavLink>
                                <NavLink to={'/administration/access/new-user'}>User</NavLink>
                            </DropdownButton> */}
                            {this.renderQuickViewMenu()}
                            {this.renderCreateMenu()}
                            {this.renderGlobalSearch()}
                            <Form inline>
                                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2 noborder-input heading-searchInput" /> */}
                                <NavDropdown title={user.displayName!==undefined?user.displayName:'Unverified Account'} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={()=> history.push("/my-profile")}>Manage profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=> history.push("/profile/change-password")} >
                                        Change Password
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=> history.push("/profile/change-pin")} >
                                        Change PIN
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item  onClick={()=>this.logout()}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                {/* <Button variant="outline-success">Search</Button> */}
                            </Form>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
                {/* <ul>
                    <li><NavLink to="/">Banklite</NavLink></li>
                    <li><NavLink to="/profile">Segun Owa</NavLink></li>
                </ul> */}
            </div>
        )
    }

  
    


    render() {
        
        
        return (
            <Fragment>
                
                <div className="mainheading content-container">
                    <div className="row">
                        {this.renderHeadingWrap()}

                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        user : state.authReducers.LoginReducer,
        adminGetCustomerTypes : state.administrationReducers.getAllCustomerTypesReducer,
        globalSearchAnItemReducer : state.dashboardReducers.globalSearchAnItemReducer,
    };
}

export default connect(mapStateToProps)(MainHeader);