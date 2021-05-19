import React, { Fragment } from "react";
// import { Redirect, Route, Router, Switch } from "react-router-dom";
// import OnboardingRoute from "./onboarding/onboarding.routes";
import AuthenticatedRoutes from "./authenticated-routes";
import DeviceRestriction from "../shared/templates/device-restriction";
class IndexRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      screenWidthSize: window.innerWidth,
    };

    window.addEventListener("resize", () =>
      this.setState({ screenWidthSize: window.innerWidth })
    );
  }

  render() {
    const { screenWidthSize } = this.state;

    let user = {
      name: "Segun Owa",
    };
    let routerLayers;
    routerLayers = (
      <Fragment>
        {/* <OnboardingRoute /> */}
        <AuthenticatedRoutes user={user} />
      </Fragment>
    );
    // if(screenWidthSize>=1024){
    //     routerLayers = (
    //         <Fragment>
    //             {/* <OnboardingRoute /> */}
    //             <AuthenticatedRoutes  user={user}/>
    //         </Fragment>
    //     )
    // }else{
    //     routerLayers =(
    //         <Fragment>
    //             <DeviceRestriction/>
    //         </Fragment>
    //     )
    // }

    return routerLayers;
  }
}

export default IndexRoute;
