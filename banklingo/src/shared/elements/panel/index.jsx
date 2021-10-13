import * as React from 'react';
// import { NavLink} from 'react-router-dom';
import {Fragment} from "react";
import "./panel.scss"; 
class PanelElement extends React.Component{
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
                
                <div className="panel-container">
                    <div className="panel-heading">{this.props.panelTitle}</div>
                    <div className="panel-content">
                        {this.props.children}
                    </div>
                    
                </div>
            </Fragment>
        );
    }
}




export default PanelElement;