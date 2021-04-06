import * as React from 'react';
import { connect } from 'react-redux';
import MainHeader from "../elements/mainheader/mainheader";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import MainMenu from "../elements/mainmenu/mainmenu";
import { history } from '../../_helpers/history';
import { IdleTimeoutManager } from "idle-timer-manager";
import IdleTimer from 'react-idle-timer';

import {authActions} from '../../redux/actions/auth/auth.action';

class InnerPageContainer extends React.Component{
    constructor(props) {
        super(props);
        let user = localStorage.getItem('lingoAuth')? JSON.parse(localStorage.getItem('lingoAuth')) : {};

        this.state={
            timeout:1000 * 180 * 1,
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false
        }
        this.idleTimer = null

        // console.log("user is", user.BranchId)
        // if(user.BranchId)
        if(Object.keys(user).length<=1){
            history.push('/');
       }
    //    this.autoLogout();
    
    }


    componentDidMount(){
        // this.resfreshTokenTimer();
    }
    

    callRefeshToken= async(refreshTokenPayload)=>{
        const {dispatch} = this.props;
        await dispatch(authActions.ResfreshToken(refreshTokenPayload));
    }

    handleClose = () => {
        this.setState({ showModal: false })
    }

    handleLogout = () => {
        this.setState({ showModal: false })
        this.props.history.push('/')
    }

    onAction = (e)=> {
        // console.log('user did something', e)
        this.setState({ isTimedOut: false })
    }

    onActive =(e)=> {
        // console.log('user is active', e)
        this.setState({ isTimedOut: false })
    }

    onIdle =(e)=> {
        // console.log('user is idle', e)
        const isTimedOut = this.state.isTimedOut
        if (isTimedOut) {
            this.props.history.push('/')
        } else {
            this.setState({ showModal: true })
            this.idleTimer.reset();
            this.setState({ isTimedOut: true })
        }

    }

    autoLogout = ()=>{
        new IdleTimeoutManager({
            timeout: 180, //expired after 10 secs,
            key:"xSessionTracker",
            onExpired: (time) => {
              this.logout();
              
            }
        });
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

    logoutTimerModal = (showModal, handleClose, handleLogout, remainingTime)=>{
        return (
            <Modal show={showModal} onHide={handleClose} className="logout-modal">
                <Modal.Header closeButton>
                <Modal.Title>You Have Been Idle</Modal.Title>
                </Modal.Header>
                <Modal.Body>Should we log you out?</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Stay logged in
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }



    refreshTokenTask =()=>{
        
        let userInfo = JSON.parse(localStorage.getItem('lingoAuth'));
            if(userInfo!==null && userInfo!==undefined){
                let    lastRefreshTime = userInfo.lastLogForAuth;

                let currenTimestamp = Date.now();
                // console.log("calculation", (currenTimestamp -lastRefreshTime)/60000);
                if(((currenTimestamp -lastRefreshTime)/60000)>=3){
                    clearInterval(this.resfreshTokenTimer);
                    let refreshTokenPayload = {
                        username:userInfo.userName,
                        refreshToken:userInfo.refreshToken
                    }
                    // console.log("its time!!");
                    
                    this.callRefeshToken(refreshTokenPayload)
                            .then((response)=>{
                                // console.log("status",response);
                                // this.resfreshTokenTimer();
                            })
                }
            }
    }

    resfreshTokenTimer =()=>{
        
        setInterval(() => {
            this.refreshTokenTask();
        }, 3000);
    }
    
    render() {
        let user = localStorage.getItem('lingoAuth')? JSON.parse(localStorage.getItem('lingoAuth')) : {};

        // console.log("user is", user.BranchId)
        // if(user.BranchId)
        if(Object.keys(user).length<=1){
            history.push('/');
       }
        return (
            
                <div className="innerpage-wrap">
                    <IdleTimer
                        ref={ref => { this.idleTimer = ref }}
                        element={document}
                        onActive={this.onActive}
                        onIdle={this.onIdle}
                        onAction={this.onAction}
                        debounce={250}
                        timeout={this.state.timeout} />

                        {this.logoutTimerModal(this.state.showModal,this.handleClose, this.handleLogout)}
                    <MainHeader {...this.props} />
                    <MainMenu />
                    {this.props.children}
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // user : state.authReducers.LoginReducer
        user : state.authReducers.LoginReducer
    };
}

export default  connect(mapStateToProps)(InnerPageContainer);
