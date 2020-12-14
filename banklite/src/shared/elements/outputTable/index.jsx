import * as React from 'react';

import Button from 'react-bootstrap/Button'
import {  getDateFromISO, numberWithCommas} from '../../../shared/utils';
class OutTable extends React.Component {
    constructor(props) { super(props); };


    performRowAction = (rowIndex)=>{
        this.props.rowAction(rowIndex);
    }
    render() {
        if(!this.props.bulkdata){
            return (
                <div className="table-responsive">
                    

                    

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {
                                    this.props.cols.map((c) => {
                                        return(
                                            <th key={c.key}>{c.name}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((r, i) => {
                                        return(
                                            <tr key={i}>
                                                {this.props.cols.map(c=> {

                                                        
                                                        return (
                                                            <td key={c.key}>
                                                              {r[c.key]}  
                                                              {/* {(this.props.amountIndex && this.props.amountIndex===i && )?numberWithCommas(r[c.key], true, true): r[c.key]  }   */}
                                                            </td>
                                                        )
                                                    }
                                                )}
                                                {(i>=1 && this.props.addRowAction && this.props.rowActionText )  &&
                                                    <td>
                                                        <span className="action-link" onClick={()=>this.props.rowAction(i)}>{this.props.rowActionText}</span>
                                                        
                                                    </td>
                                                }
                                                {(i===0 && this.props.addRowAction) && <td></td>}
                                            </tr>
                                        )
                                    }
                                )}
                        </tbody>
                    </table>
                    
                </div>
            )
        }

        if(this.props.bulkdata){
            
            let allKeys = Object.keys(this.props.bulkdata[0]);
            
            return (
                <div className="table-responsive">
                    

                    

                    <table className="table table-striped">
                        <thead>
                            
                            <tr className="heading-item">
                                {allKeys.map((head, index)=><th key={index}>{head}</th>)}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.bulkdata.map((eachData, index)=>{
                                    return(
                                        <tr className="row-items" key={index}>
                                            {
                                                Object.keys(eachData).map((key, item)=> {

                                                    console.log("oaoaoa", typeof eachData[key]);
                                                    if (typeof eachData[key]==="string" && eachData[key].indexOf(':') > -1 && eachData[key].indexOf('.') > -1 && eachData[key].indexOf('T') > -1 && eachData[key].indexOf('Z') > -1 && eachData[key].indexOf('-') > -1) {
                                                        return (
                                                            <td key={item}>
                                                                
                                                                <span>
                                                                    {new Date(
                                                                        getDateFromISO(eachData[key], null, "returnObject").year,

                                                                        (getDateFromISO(eachData[key], null, "returnObject").month) > 0 ?
                                                                            getDateFromISO(eachData[key], null, "returnObject").month - 1 :
                                                                            getDateFromISO(eachData[key], null, "returnObject").month,

                                                                        getDateFromISO(eachData[key], null, "returnObject").dt
                                                                    ).toLocaleString('en-us', { month: 'long' })
                                                                    }
                                                                </span>
                                                                <span>
                                                                    &nbsp; {getDateFromISO(eachData[key], null, "returnObject").dt},
                                                                </span>
                                                                <span>{getDateFromISO(eachData[key], null, "returnObject").year}</span>
                                                                {/* {eachData[key]} */}
                                                            </td>
                                                        )
                                                    } else {
                                                        return (
                                                            <td key={item}>
                                                                {eachData[key]}
                                                            </td>
                                                        )
                                                    }

                                                    // {
                                                    //     return(
                                                    //         <td key={item} >{eachData[key]}</td>
                                                    //     )
                                                    // }
                                                })
                                            }
                                            {(index>=1 && this.props.addRowAction && this.props.rowActionText )  &&
                                                    <td>
                                                        <span className="action-link" onClick={()=>this.props.rowAction(index)}>{this.props.rowActionText}</span>
                                                        
                                                    </td>
                                                }
                                            {(index===0 && this.props.addRowAction) && <td></td>}
                                            
                                        </tr>
                                    )
                                    
                                })
                            }
                            
                            
                        </tbody>
                    </table>
                    
                </div>
            )
        }
    }
}

export default OutTable;