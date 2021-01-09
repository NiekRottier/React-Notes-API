import React from "react";
import "./styles.css";

export class Notedetails extends React.Component {
    constructor(){
        super()
        console.log("Created Note");
    }

    render(){
        if (this.props.note) {
            return (
                <div className="note">
                    <h3>{this.props.note.title}</h3>
                    <p>{this.props.note.body}</p>
                    <p>Author: {this.props.note.author}</p>
                    <i>Posted at: {this.props.note.date}</i>

                    <input type="button" name="Edit" value="Edit" onClick={() => this.props.editNote(this.props.note.id)} />
                    <input type="button" name="Delete" value="Delete" onClick={() => this.props.deleteNote(this.props.note.id)} />
                </div>
            )
        } else { return (<div className="note" />) }
        

    }
}