import * as React from 'react';
// import { NavLink} from 'react-router-dom';
import {Fragment} from "react";
import Table from 'react-bootstrap/Table'

import "./tables.scss"; 

class TablePagination extends React.Component{
    constructor(props) {
        super(props);
        
        this.state={
            user:''
        }
       
    }



  
    componentDidMount() {
    }

    renderPagination =(
                        totalPages = this.props.totalPages,
                        currPage= this.props.currPage,
                        currRecordsCount= this.props.currRecordsCount, 
                        totalRows= this.props.totalRows, 
                        tempData=(this.props.tempData.result!==undefined)?this.props.tempData.result:this.props.tempData, 
                        pagesCountToshow=this.props.pagesCountToshow, 
                        refreshFunc= this.props.refreshFunc
                        )=>{

        
        let isMorePagesLeft,
            isPreviousPagesLeft,          
            pagingTemplate=[],
            pagesToshow =pagesCountToshow||4;

            if(currRecordsCount===totalRows){
                isMorePagesLeft = false;
            }

            if(currRecordsCount<totalRows){
                if(currPage<totalPages){
                    isMorePagesLeft = true;
                }
                else{
                    isMorePagesLeft = false;
                }
            }

            if(currPage>=2 && currRecordsCount<totalRows){
                isPreviousPagesLeft = true;
            }else{
                isPreviousPagesLeft = false;
            }

            if(totalPages<=pagesToshow){
                if(totalPages>=1){
                    let {activePage}= this.state;
                    for(let eachPage=1; eachPage<=totalPages ; eachPage++){
                        console.log("here", eachPage);
                        pagingTemplate.push(<span 
                                                key={`${eachPage}-int`}
                                                className={currPage===eachPage?"each-pagenum active":"each-pagenum"}
                                                onClick={()=>
                                                    {
                                                        this.setState({activePage:eachPage})
                                                        refreshFunc(eachPage,tempData)
                                                    }
                                                }
                                                >{eachPage}</span>
                                            );
                    }
                }else{
                    if(tempData.length>=1){
                        pagingTemplate.push(<span 
                            key={`${totalPages}-int`}
                            className="each-pagenum"
                            onClick={()=>refreshFunc(1,tempData)}
                            >1</span>
                        );
                    }
                }
            }else{
                for(let eachPage=1; eachPage<=pagesToshow; eachPage++){
                    if(eachPage<pagesToshow-1){
                        pagingTemplate.push(<span 
                                                key={`${eachPage}-int`}
                                                className="each-pagenum"
                                                onClick={()=>refreshFunc(eachPage,tempData)}
                                                >{eachPage}</span>
                                            );
                    }
                    if(eachPage===pagesToshow-1){
                        pagingTemplate.push(<span 
                                                key={`${eachPage}-int`}
                                                className="middot"
                                                onClick={()=>refreshFunc(eachPage,tempData)}
                                                >...</span>
                                            );
                    }
                    if(eachPage===pagesToshow){
                        pagingTemplate.push(<span 
                                                key={`${eachPage}-int`}
                                                className="each-pagenum"
                                                onClick={()=>refreshFunc(totalPages,tempData)}
                                                >{totalPages}</span>
                                            );
                    }
                }
            }

        return(
            <div className={(isMorePagesLeft===true || tempData.length>=1)?"move-page-actions":"move-page-actions unaallowed"}>
                <div 
                    className={isPreviousPagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isPreviousPagesLeft===true?()=>refreshFunc(1,tempData):null}>
                    <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                </div>
                <div 
                    className={isPreviousPagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isPreviousPagesLeft===true?()=>refreshFunc(currPage-1,tempData):null}>
                    <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                </div>

                {/* {currPage===1 && 
                    <div className="page-count">
                        <span>{currPage}-{currRecordsCount}</span>  of <span>{totalRows}</span>
                    </div>
                } */}
                 <div className="page-count">
                     {pagingTemplate}
                 </div>
                

                {/* {
                    (totalPages>4 && (totalPages-currPage)>=4) &&
                    <div className="page-count">
                        <span className="each-pagenum" onClick={refreshFunc(currPage,tempData)} >{currPage}</span>
                        <span className="each-pagenum" onClick={refreshFunc(currPage+1,tempData)}>{currPage+1}</span>
                        <span className="each-pagenum" onClick={refreshFunc(currPage+2,tempData)}>{currPage+2}</span>
                        <span className="middot" onClick={refreshFunc(currPage+4,tempData)}>{currPage+2}>...</span>
                        <span className="each-pagenum" onClick={refreshFunc(totalPages,tempData)}>{totalPages}</span>
                    </div>
                }
                {totalPages<=4 && 
                    <div className="page-count">
                        {pagingTemplate}
                    </div>
                } */}
                
                
                
                
                <div 
                    className={isMorePagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isMorePagesLeft===true?()=>refreshFunc(currPage+1,tempData):null}>
                    <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                </div>
                <div 
                    className={isMorePagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isMorePagesLeft===true?()=>refreshFunc(totalPages,tempData):null}>
                    <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                </div>
            </div>
        )
    }


    render() {
        
        
        return (
            <Fragment>
                {this.renderPagination()}
            </Fragment>
        );
    }
}




export default TablePagination;