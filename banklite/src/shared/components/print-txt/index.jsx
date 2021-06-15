import * as React from 'react';


import { Fragment } from "react";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';


import Button from 'react-bootstrap/Button'
import TransactionDetails from './txt-info'

import "./index.scss"; 
class PrintTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            transactionDetails:""
        }
        
        

        // this.clientEncodedKey = this.props.clientEncodedKey? this.props.clientEncodedKey :null
        // this.clientName = this.props.clientName? this.props.clientName :""

    }

    componentDidMount(){
        
    }

   
 
    handleBeforeGetContent = () => {
        console.log("here", this.props.transactionDetails)
        return new Promise((resolve, reject) => {
          this.setState({ transactionDetails: this.props.transactionDetails }, () => resolve());
        });
    }

    setComponentRef = (ref: TransactionDetails) => {
        this.componentRef = ref;
      }
    
      reactToPrintContent = () => {
        return this.componentRef;
      }
   

    renderDetails = () => {
        
       
       
                
                

                
                    
            return(
                <div className="slidein-wrap">
                    <div className="slide-wrap-overlay"></div>
                    <div className="slidein-form" >
                        
                        { this.props.transactionDetails &&
                        <div className="slidein-formwrap">



                            <TransactionDetails updated={this.state.transactionDetails} transactionDetails = {this.props.transactionDetails} ref={this.setComponentRef}/>
                            {/* <TransactionDetails transactionDetails = {this.props.transactionDetails} ref={el => (this.componentRef = el)}/> */}
                            {/* <Viewer fileUrl="/path/to/document.pdf" /> */}

                            
                            <div className="mt-50">
                                <div className="footer-with-cta">
                                    <Button variant="secondary" onClick={this.props.closePrint} >Close</Button>


                                    <ReactToPrint
                                        onBeforeGetContent = {this.handleBeforeGetContent}
                                        // content={() => this.componentRef}>
                                            content={this.reactToPrintContent}>
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