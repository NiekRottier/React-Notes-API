import React from "react";
import "./styles.css";

export class Delete extends React.Component {
    constructor(){
        super()
        console.log("Created Delete");
    }

    // DELETE functions
    deleteNote = (id) => {
        fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${id}`, { method: 'DELETE' })
            .then(() => this.deletedNote(id))
            .catch((error) => console.log(error));
    }

    deletedNote = (id) => {
        console.log(`Deleted Note - ID: ${id}`);
        this.props.resetActiveNote()
        this.props.reloadNotes()
    }

    render(){
        return(
            <input type="button" name="Delete" value="Delete" onClick={() => this.deleteNote(this.props.note.id)} />
        )
    }
}