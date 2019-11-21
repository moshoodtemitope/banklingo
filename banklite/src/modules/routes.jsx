import React, { Fragment} from "react";
// import { Redirect, Route, Router, Switch } from "react-router-dom";
// import OnboardingRoute from "./onboarding/onboarding.routes";
import AuthenticatedRoutes from "./authenticated-routes";
class IndexRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:''
        }
    }

    render(){
        let user ={
            name:'Segun Owa'
        }
        let routerLayers = (
            <Fragment>
                {/* <OnboardingRoute /> */}
                <AuthenticatedRoutes  user={user}/>
            </Fragment>
        )

        return routerLayers;
    }
}

export default IndexRoute;