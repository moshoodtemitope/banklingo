import * as React from 'react';
import MainHeader from "../elements/mainheader/mainheader";
import MainMenu from "../elements/mainmenu/mainmenu";

class InnerPageContainer extends React.Component{
    
    render() {
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
