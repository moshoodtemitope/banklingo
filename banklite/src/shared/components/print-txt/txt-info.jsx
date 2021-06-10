import * as React from 'react';


import { Fragment } from "react";
import { numberWithCommas } from '../../utils';






import "./index.scss"; 
 
class TransactionDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        console.log("transactionDetails", this.props.transactionDetails);
        return(
            <Fragment>
                <div className="slide-in-heading">
                    <h3>Transaction Receipt</h3>
                    {/* <div className="close-slidein" onClick={this.props.closePrint}>X</div> */}
                </div>
                <div className="formdetails">
                    {this.props.transactionDetails.entryType &&
                        <div className="each-detail">
                            <div className="detail-title">Transaction</div>
                            <div className="detail-value">{this.props.transactionDetails.entryType}</div>
                        </div>
                    }
                    {this.props.transactionDetails.typeDescription &&
                        <div className="each-detail">
                            <div className="detail-title">Transaction Description</div>
                            <div className="detail-value">{this.props.transactionDetails.typeDescription}</div>
                        </div>
                    }
                    {this.props.transactionDetails.transactionId &&
                        <div className="each-detail">
                            <div className="detail-title">Transaction ID</div>
                            <div className="detail-value">{this.props.transactionDetails.transactionId}</div>
                        </div>
                    }
                    {this.props.transactionDetails.transactionAmount &&
                        <div className="each-detail">
                            <div className="detail-title">Transaction Amount</div>
                            <div className="detail-value">{numberWithCommas(this.props.transactionDetails.transactionAmount, true)}</div>
                        </div>
                    }
                    {this.props.transactionDetails.dateCreated &&
                        <div className="each-detail">
                            <div className="detail-title">Transaction Date</div>
                            <div className="detail-value">{this.props.transactionDetails.dateCreated}</div>
                        </div>
                    }


                </div>
            </Fragment>
        )
    }






    // render() {
        

    //     return (
    //         <Fragment>
    //             {this.transactionInfo()}
    //         </Fragment>
    //     );
    // }
}





export default TransactionDetails;