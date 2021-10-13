import * as React from 'react';
import InAppHeader from "../../elements/inapp-header";



import "./index.scss"; 

class OnboardingContainer extends React.Component{
    constructor(props) {
        super(props);
        
        this.spuser= (localStorage.getItem('cardgen-auth')!==undefined && localStorage.getItem('cardgen-auth')!==null)? JSON.parse(localStorage.getItem('cardgen-auth')): "";
        
    }

    

    render() {
        
        
        
        
        return (
            
                <div className="page-wrap">
                    <InAppHeader />
                    <div className="page-wrapper">
                        {this.props.children}
                    </div>
                   
                    
                </div>
        );
    }
}

export default OnboardingContainer;