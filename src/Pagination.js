import React from "react";
import "./styles.css";

export class Pagination extends React.Component {
    constructor(){
        super()
        console.log("Created Pagination");
    }

    render(){
        return(
            <div className="pagination">
                <input type="button" value="First" onClick={() => this.props.setFetchLink(this.props.pagination._links.first.href)} />
                <input type="button" value="<" onClick={() => this.props.setFetchLink(this.props.pagination._links.previous.href)} />
                <input type="button" value=">" onClick={() => this.props.setFetchLink(this.props.pagination._links.next.href)} />
                <input type="button" value="Last" onClick={() => this.props.setFetchLink(this.props.pagination._links.last.href)} />
            </div>
        )
    }
}