import * as React from 'react';
// import { NavLink} from 'react-router-dom';
import {Fragment} from "react";

import LeftICo from '../../../assets/img/leftcaret.svg';
import RightICo from '../../../assets/img/rightcaret.svg';

import "./index.scss"; 

class ActivityPagination extends React.Component{
    constructor(props) {
        super(props);
        
        this.state={
            user:''
        }
       
    }



  
    componentDidMount() {
        
    }



    renderPagination =(
                        // totalPages = 3,
                        totalPages = this.props.totalPages,
                        currPage= this.props.currPage,

                        // currPage = 8,
                        //     totalPages=12,
                        currRecordsCount= this.props.currRecordsCount, 
                        totalRows= this.props.totalRows, 
                        tempData=(this.props.tempData.result!==undefined)?this.props.tempData.result:this.props.tempData, 
                        pagesCountToshow=this.props.pagesCountToshow, 
                        refreshFunc= this.props.refreshFunc

                        )=>{

        
       
        let isMorePagesLeft,
            isPreviousPagesLeft,          
            pagingTemplate=[],
            pagesToshow;

            if(pagesCountToshow!==undefined && pagesCountToshow!==null && pagesCountToshow!==""){
                if(pagesCountToshow>=1){
                    pagesToshow = pagesCountToshow;
                }
                
            }else{
                pagesToshow = 4
            }

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
                    // console.log("pages is ", eachPage);
                    
                    if(currPage<3){
                        if(eachPage<pagesToshow-1){
                        
                            pagingTemplate.push(<span 
                                                    key={`${eachPage}-int`}
                                                    className={currPage===eachPage?"each-pagenum active":"each-pagenum"}
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
                                                    className={currPage===totalPages?"each-pagenum active":"each-pagenum"}
                                                    onClick={()=>refreshFunc(totalPages,tempData)}
                                                    >{totalPages}</span>
                                                );
                        }
                    }

                    if(currPage>=3){
                        // if(currPage < totalPages){
                            
                            //show first paginated page based on current page and if current page less than total pages
                            if(eachPage < pagesToshow-2 && currPage < totalPages-1){
                                
                                pagingTemplate.push(<span 
                                                        key={`${currPage}-int`}
                                                        className="each-pagenum active"
                                                        onClick={()=>refreshFunc(currPage,tempData)}
                                                        >{currPage}</span>
                                                    );
                            }

                            //show first paginated page based on current page and if current page is equal to  total pages
                            if(eachPage < pagesToshow-2 && currPage === totalPages){
                            
                                pagingTemplate.push(<span 
                                                        key={`${currPage}-int`}
                                                        className={currPage===eachPage?"each-pagenum active":"each-pagenum"}
                                                        onClick={()=>refreshFunc(currPage-2,tempData)}
                                                        >{currPage-2}</span>
                                                    );
                                pagingTemplate.push(<span 
                                                    key={`${currPage}-int`}
                                                    className={currPage===eachPage?"each-pagenum active":"each-pagenum"}
                                                    onClick={()=>refreshFunc(currPage-1,tempData)}
                                                    >{currPage-1}</span>
                                                );
                            }

                            //show first paginated page based on current page and if current page is equal to  total pages
                            if(eachPage < pagesToshow-2 && currPage === totalPages-1){
                            
                                pagingTemplate.push(<span 
                                                        key={`${currPage}-int`}
                                                        className={currPage===eachPage?"each-pagenum active":"each-pagenum"}
                                                        onClick={()=>refreshFunc(currPage-1,tempData)}
                                                        >{currPage-1}</span>
                                                    );
                                pagingTemplate.push(<span 
                                                    key={`${currPage}-int`}
                                                    className={currPage === totalPages-1?"each-pagenum active":"each-pagenum"}
                                                    onClick={()=>refreshFunc(currPage,tempData)}
                                                    >{currPage}</span>
                                                );
                            }

                            



                             //show second paginated page based on current page and if current page less than total pages
                            if(eachPage === pagesToshow-2 && currPage < totalPages-1){
                            
                                pagingTemplate.push(<span 
                                                        key={`${currPage+1}-int`}
                                                        className={currPage===eachPage?"each-pagenum active":"each-pagenum"}
                                                        onClick={()=>refreshFunc(currPage+1,tempData)}
                                                        >{currPage+1}</span>
                                                    );
                            }

                            //Show Ellipses if current page less than total pages
                            if(eachPage === pagesToshow-1 && currPage < totalPages-3 ){
                                
                                pagingTemplate.push(<span 
                                                        key={`${currPage+1}-int`}
                                                        className="middot"
                                                        onClick={()=>refreshFunc(currPage+2,tempData)}
                                                        >...</span>
                                                    );
                            }

                            //show second to last  paginated page based on current page and if current page less than total pages -3
                            if(eachPage === pagesToshow-1 && currPage === totalPages-3 ){
                                
                                pagingTemplate.push(<span 
                                                        key={`${currPage+1}-int`}
                                                        className={currPage===eachPage?"each-pagenum active":"each-pagenum"}
                                                        onClick={()=>refreshFunc(currPage+2,tempData)}
                                                        >{currPage+2}</span>
                                                    );
                            }


                             //show last  paginated page
                            if(eachPage === pagesToshow){
                                
                                pagingTemplate.push(<span 
                                                        key={`${eachPage}-int`}
                                                        className={currPage===totalPages?"each-pagenum active":"each-pagenum"}
                                                        onClick={()=>refreshFunc(totalPages,tempData)}
                                                        >{totalPages}</span>
                                                    );
                            }
                        // }
                    }
                }
            }

        return(
            <div className={(isMorePagesLeft===true || tempData.length>=1)?"move-page-actions":"move-page-actions unaallowed"}>
                {/* <div 
                    className={isPreviousPagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isPreviousPagesLeft===true?()=>refreshFunc(1,tempData):null}>
                    <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                </div> */}
                <div 
                    className={isPreviousPagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isPreviousPagesLeft===true?()=>refreshFunc(currPage-1,tempData):null}>
                    <img alt="go backward" src={LeftICo} width="6" height="11" />
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

                    <img alt="from next page" src={RightICo} width="12" height="11" />
                    {/* <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" /> */}
                </div>
                {/* <div 
                    className={isMorePagesLeft===true?"each-page-action":"each-page-action unaallowed"}
                    onClick={isMorePagesLeft===true?()=>refreshFunc(totalPages,tempData):null}>
                    <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                </div> */}
            </div>
        )
    }

    renderPagingWrap = ()=>{
        return(
            this.renderPagination()
        )
    }


    render() {
        
        
        return (
            <Fragment>
                {this.renderPagingWrap()}
            </Fragment>
        );
    }
}




export default ActivityPagination;