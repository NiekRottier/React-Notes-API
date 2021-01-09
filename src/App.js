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
            user : "unknown"
        }
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
                    <CreateNote author={this.state.user} />
                </div>

                {/* <p>Wanna see your notes?</p> */}
                <Notepad />
            </div>
        )
    }
}