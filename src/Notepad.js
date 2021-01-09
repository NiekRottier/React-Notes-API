import React from "react";
import "./styles.css"
import qs from "qs";

import { Notedetails } from "./Notedetails";

export class Notepad extends React.Component {
    constructor(){
        super()
        console.log("Created Notepad");
        
        let queryStringId = qs.parse(window.location.search, { ignoreQueryPrefix: true }).id
        console.log(`Query string id: ${queryStringId}`);

        if (queryStringId) {
            this.state = { activeNote : queryStringId }
            this.loadActiveNote(this.state.activeNote)
        } else {
            this.state = { activeNote : 0 }
        }
    }

    // Fetches data from API, gets the JSON and sends it to loadedActiveNotes()
    loadActiveNote = (id) => {
        let headers = { 'Accept': 'application/json' };

        fetch(`http://docent.cmi.hro.nl/bootb/demo/notes/${id}`, { headers })
            .then((response) => response.json())
            .then((data) => this.loadedActiveNote(data))
            .catch((error) => console.log(error))
    }

    // Sets the state.activeNote to the API data
    loadedActiveNote(data){
        console.log("Data loaded!");
        console.log(data);
        this.setState({
            activeNote : data
        })
    }

    resetActiveNote = () =>{
        this.setState({ activeNote : 0 })
    }

    render(){
        let notes = this.props.notes.map((note, index) => (
            <div key={index} onClick={() => this.loadActiveNote(note.id)}>{note.title}</div>
        ));

        console.log("RENDER");

        return (
            <div className="notepad">
                <p>Number of notes: {this.props.notes.length}</p>
                <div className="row-container">
                    <div className="notes">{notes}</div>
                    
                    <Notedetails note={this.state.activeNote} resetActiveNote={this.resetActiveNote}
                        reloadNotes={this.props.reloadNotes} reloadActiveNote={this.loadActiveNote} />
                </div>
            </div>
        )
    }
}