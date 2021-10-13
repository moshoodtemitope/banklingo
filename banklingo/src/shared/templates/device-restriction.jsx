import * as React from 'react';
import "./styles.scss"; 

import warning from '../../assets/img/alert.svg'
class DeviceRestriction extends React.Component{
    
    render() {
        return (
            
                <div className="devicerestriction-wrap">
                    <img src={warning} alt="" />
                    <h4>For optimal performance and experience, please switch to a PC</h4>
                    
                </div>
        );
    }
}

export default DeviceRestriction;
