import * as React from 'react';
// import { NavLink} from 'react-router-dom';
import {Fragment} from "react";
import Table from 'react-bootstrap/Table'

import "./tables.scss";

class TableComponent extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            user:''
        }

    }


    renderTable(tableConfig){

        return(

                <Table striped hover className={this.props.classnames}>
                    {this.props.children}
                </Table>
        )


    }


    componentDidMount() {
    }


    render() {


        return (
            <Fragment>

                <div className="tablecomponent-container">
                    <div className="container">
                        <div className={this.props.overflow?"row none-overflow":"row"}>
                            {this.renderTable()}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}




export default TableComponent;
