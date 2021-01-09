import React from "react";
import "./styles.css"

import { Notedetails } from "./Notedetails";

export class Notepad extends React.Component {
    constructor(){
        super()
        console.log("Created Notepad");
        this.state = {
            activeNote : 0
        }
    }

    // Fetches data from API, gets the JSON and sends it to loadedNotes()
    loadActiveNote(index){
        let activeNoteLink = this.props.notes[index]._links.self.href;

        let headers = { 'Accept': 'application/json' };

        fetch(activeNoteLink, { headers })
            .then((response) => response.json())
            .then((data) => this.loadedActiveNote(data))
            .catch((error) => console.log(error))
    }

    // Sets the state.notes to the API data
    loadedActiveNote(data){
        console.log("Data loaded!");
        console.log(data);
        this.setState({
            activeNote : data
        })
    }

    editNote = (id) => {
        console.log(`Editted Note - ID: ${id}`);
    }

    // DELETE functions
    deleteNote = (id) => {
        fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${id}`, { method: 'DELETE' })
            .then(() => this.deletedNote(id))
            .catch((error) => console.log(error));
    }

    deletedNote = (id) => {
        console.log(`Deleted Note - ID: ${id}`);
        this.setState({ activeNote : 0 })
        this.props.reloadNotes()
    }

    render(){
        let notes = this.props.notes.map((note, index) => (
            <div key={index} onClick={() => this.loadActiveNote(index)}>{note.title}</div>
        ));

        return (
            <div className="notepad">
                <p>Number of notes: {this.props.notes.length}</p>
                <div className="row-container">
                    <div className="notes">{notes}</div>
                    <Notedetails note={this.state.activeNote} editNote={this.editNote} deleteNote={this.deleteNote} />
                </div>
            </div>
        )
    }
}