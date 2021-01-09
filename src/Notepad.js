import React from "react";
import "./styles.css"

import { Notedetails } from "./Notedetails";

export class Notepad extends React.Component {
    constructor(){
        super()
        console.log("Created Notepad");
        this.state = {
            notes : [],
            activeNote : 0
        }

        this.loadNotes()
    }

    // Fetches data from API, gets the JSON and sends it to loadedNotes()
    loadNotes(){
        let headers = { 'Accept': 'application/json' };
        fetch("http://docent.cmi.hro.nl/bootb/demo/notes/", { headers })
            .then((response) => response.json())
            .then((data) => this.loadedNotes(data))
            .catch((error) => console.log(error))
    }

    // Sets the state.notes to the API data
    loadedNotes(data){
        console.log("Data loaded!");
        console.log(data.items);
        this.setState({
            notes : data.items
        })
    }

    // Fetches data from API, gets the JSON and sends it to loadedNotes()
    loadActiveNote(index){
        let activeNoteLink = this.state.notes[index]._links.self.href;

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

    editNotes(id){
        console.log(`Editted Note - ID: ${id}`);
    }

    deleteNotes(id){
        console.log(`Deleted Note - ID: ${id}`);
    }

    render(){
        let notes = this.state.notes.map((note, index) => (
            <div key={index} onClick={() => this.loadActiveNote(index)}>{note.title}</div>
        ));

        return (
            <div className="notepad">
                <p>Number of notes: {this.state.notes.length}</p>
                <div className="row-container">
                    <div className="notes">{notes}</div>
                    <Notedetails note={this.state.activeNote} editNotes={this.editNotes} deleteNotes={this.deleteNotes} />
                </div>
            </div>
        )
    }
}