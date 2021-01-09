import React from "react";
import "./styles.css";

export class Delete extends React.Component {
    constructor(){
        super()
        console.log("Created Edit");
    }

    render(){
        return(
            <input type="button" name="Edit" value="Edit" onClick={() => this.props.editNote(this.props.note.id)} />
            )
    }
}