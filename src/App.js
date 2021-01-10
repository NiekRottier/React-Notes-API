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
            fetchLink : "http://docent.cmi.hro.nl/bootb/demo/notes/?start=1&limit=5",
            notes : [],
            paginationData : {}
        }

        this.loadNotes()
    }

    setFetchLink = (link) => {
        this.setState({ fetchLink : link })
        console.log(`Set fetchLink to ${link}`);

        this.loadNotes(link)
    }

    // Fetches data from API, gets the JSON and sends it to loadedNotes()
    loadNotes = (link = this.state.fetchLink) => {
        let headers = { 'Accept': 'application/json' };

        fetch(link, { headers })
            .then((response) => response.json())
            .then((data) => this.loadedNotes(data))
            .catch((error) => console.log(error))
    }

    // Sets the state.notes to the API data
    loadedNotes(data){
        console.log("Overview data loaded!");
        this.setState({
            notes : data.items,
            paginationData : data.pagination
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
                <Notepad notes={this.state.notes}  reloadNotes={this.loadNotes} 
                    pagination={this.state.paginationData} setFetchLink={this.setFetchLink} />
            </div>
        )
    }
}