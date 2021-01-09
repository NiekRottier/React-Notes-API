import React from "react";
import "./styles.css";

import { Notepad } from "./Notepad";
import { Namechanger } from "./Namechanger";
import { CreateNote } from "./CreateNote";

export class App extends React.Component {
    constructor(){
        super()
        console.log("Hello World");
        this.state = {
            user : "unknown",
            notes : []
        }

        this.loadNotes()
    }
    
    // Fetches data from API, gets the JSON and sends it to loadedNotes()
    loadNotes = () => {
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

    // Change state.user to whatever is in the Namechanger form 
    changeName = (event) => {
        this.setState({ user: event.target.value })
    }

    render(){
        return (
            <div id="app">
                <h1>{this.state.user}'s notes</h1>
                <div className="row-container">
                    <Namechanger changeName = {this.changeName} />
                    <CreateNote author={this.state.user} reloadNotes={this.loadNotes} />
                </div>

                {/* <p>Wanna see your notes?</p> */}
                <Notepad notes={this.state.notes}/>
            </div>
        )
    }
}