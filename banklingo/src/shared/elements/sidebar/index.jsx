import * as React from 'react';
// import { NavLink} from 'react-router-dom';
import {Fragment} from "react";
import "./sidebar.scss"; 
class SidebarElement extends React.Component{
    constructor(props) {
        super(props);
        
        this.state={
            user:''
        }
       
    }


    

  
    componentDidMount() {
    }


    render() {
        
        
        return (
            <Fragment>
                
                <div className="sidebar-container">
                    {/* <div className="sidebar-heading">{this.props.sidebarTitle}</div> */}
                    <div className="sidebar-content">
                        {this.props.children}
                    </div>
                    
                </div>
            </Fragment>
        );
    }
}




export default SidebarElement;