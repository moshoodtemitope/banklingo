import * as React from 'react';

import { connect } from 'react-redux';
import { Fragment } from "react";
// import ReactToPrint, { PrintContextConsumer } from 'react-to-print';


import Button from 'react-bootstrap/Button'
import TransactionDetails from './txt-info'
import {dashboardConstants} from '../../../redux/actiontypes/dashboard/dashboard.constants'

import '@react-pdf-viewer/core/lib/styles/index.css';

import PrintReport from '../../../shared/components/print-report';
// Import styles
import '@react-pdf-viewer/print/lib/styles/index.css';

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

   

    
    
    renderReportPrint = (url)=>{
        return(
          <PrintReport fileUrl={url} defaultScale={50} />
        )
    }

    renderDetails = () => {
        
       
       
                
                

                
                    
            return(
                <div className="slidein-wrap">
                    <div className="slide-wrap-overlay"></div>
                    <div className="slidein-form" >
                        
                        { this.props.transactionDetails &&
                        <div className="slidein-formwrap">

                            <div className="slide-in-heading">
                                <h3>Transaction Receipt</h3>
                                {/* <div className="close-slidein" onClick={this.props.closePrint}>X</div> */}
                            </div>
                            <div className="formdetails">
                            {(this.props.getAReportReducer.request_status === dashboardConstants.GET_A_REPORT_SUCCESS) &&
                                this.renderReportPrint(this.props.getAReportReducer.request_data.url)
                            }
                            </div>

                            {/* <TransactionDetails updated={this.state.transactionDetails} transactionDetails = {this.props.transactionDetails} ref={this.setComponentRef}/> */}
                            {/* <TransactionDetails transactionDetails = {this.props.transactionDetails} ref={el => (this.componentRef = el)}/> */}
                            {/* <Viewer fileUrl="/path/to/document.pdf" /> */}
                            
                            {this.props.getAReportReducer.request_status === dashboardConstants.GET_A_REPORT_PENDING &&
                                <div className='loading-content'>
                                    <div className='loading-text'>Loading receipt... </div>
                                </div>
                            }
                            {!this.props.getAReportReducer.is_request_processing &&
                            <div className="mt-50">
                                <div className="footer-with-cta">
                                    <Button variant="secondary"
                                        // disabled={this.props.getAReportReducer.is_request_processing}
                                        onClick={this.props.closePrint}
                                    >
                                        Close</Button>


                                    


                                </div>
                            </div>
                            }

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

function mapStateToProps(state) {
    return {
      getAReportReducer: state.dashboardReducers.getAReportReducer,
    };
  }

export default  connect(mapStateToProps)(PrintTransaction);