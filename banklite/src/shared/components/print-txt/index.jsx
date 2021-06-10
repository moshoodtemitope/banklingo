import * as React from 'react';


import { Fragment } from "react";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';


import Button from 'react-bootstrap/Button'
import TransactionDetails from './txt-info'

import "./index.scss"; 
class PrintTransaction extends React.Component {
    constructor(props) {
        super(props);
        
        
        

        // this.clientEncodedKey = this.props.clientEncodedKey? this.props.clientEncodedKey :null
        // this.clientName = this.props.clientName? this.props.clientName :""

    }

    componentDidMount(){
        
    }

   
 

   

    renderDetails = () => {
        
       
       
                
                

                
                    
            return(
                <div className="slidein-wrap">
                    <div className="slide-wrap-overlay"></div>
                    <div className="slidein-form" >
                        
                        { this.props.transactionDetails &&
                        <div className="slidein-formwrap">



                            <TransactionDetails transactionDetails = {this.props.transactionDetails} ref={el => (this.componentRef = el)}/>


                            
                            <div className="mt-50">
                                <div className="footer-with-cta">
                                    <Button variant="secondary" onClick={this.props.closePrint} >Close</Button>


                                    <ReactToPrint content={() => this.componentRef}>
                                        <PrintContextConsumer>
                                            {({ handlePrint }) => (

                                                <Button onClick={handlePrint}>Print</Button>
                                            )}
                                        </PrintContextConsumer>
                                    </ReactToPrint>


                                </div>
                            </div>

                        </div>
                        }
                    </div>
                </div>
            )
    }
    






    render() {
        
        

        return (
            <Fragment>
                {this.props.showPrint=== true && this.renderDetails()}
            </Fragment>
        );
    }
}



export default PrintTransaction;