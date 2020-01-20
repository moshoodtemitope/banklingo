import * as React from 'react';
import MainHeader from "../elements/mainheader/mainheader";
import MainMenu from "../elements/mainmenu/mainmenu";


class InnerPageContainer extends React.Component{
    
    render() {
        let user = JSON.parse(localStorage.getItem("user"));

        // console.log("user is", user.BranchId)
        // if(user.BranchId)
        return (
            
                <div className="innerpage-wrap">
                    <MainHeader {...this.props} />
                    <MainMenu />
                    {this.props.children}
                </div>
        );
    }
}

export default InnerPageContainer;
