import * as React from 'react';
import { connect } from 'react-redux';
import MainHeader from "../elements/mainheader/mainheader";
import MainMenu from "../elements/mainmenu/mainmenu";
import { history } from '../../_helpers/history';
import {authActions} from '../../redux/actions/auth/auth.action';

class InnerPageContainer extends React.Component{
    constructor(props) {
        super(props);
        let user = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : {};

        // console.log("user is", user.BranchId)
        // if(user.BranchId)
        if(Object.keys(user).length<=1){
            history.push('/');
       }
    
    }


    componentDidMount(){
        this.resfreshTokenTimer();
    }
    

    callRefeshToken= async(refreshTokenPayload)=>{
        const {dispatch} = this.props;
        await dispatch(authActions.ResfreshToken(refreshTokenPayload));
    }

    refreshTokenTask =()=>{
        
        let userInfo = JSON.parse(localStorage.getItem("user"));
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
        let user = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : {};

        // console.log("user is", user.BranchId)
        // if(user.BranchId)
        if(Object.keys(user).length<=1){
            history.push('/');
       }
        return (
            
                <div className="innerpage-wrap">
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
