import React from "react";
import "./styles.css";

import { Delete } from "./Delete";
import { Edit } from "./Edit";

export class Notedetails extends React.Component {
    constructor(){
        super()
        console.log("Created Note");
    }

    render(){
        if (this.props.note && isNaN(this.props.note)) {
            console.log(this.props.note);
            return (
                <div className="note">
                    <h3>{this.props.note.title}</h3>
                    <p>{this.props.note.body}</p>
                    <p>Author: {this.props.note.author}</p>
                    <i>Posted at: {this.props.note.date}</i>

                    <Edit note={this.props.note} reloadNotes={this.props.reloadNotes} reloadActiveNote={this.props.reloadActiveNote}/>
                    <Delete note={this.props.note} resetActiveNote={this.props.resetActiveNote} reloadNotes={this.props.reloadNotes} />
                </div>
            )
        } else { return (<div className="note"> Please select a note from the list </div>) }
    }
}