import React from "react";
import "./styles.css";

export class Namechanger extends React.Component {
    constructor(){
        super()
        console.log("Created Namechanger");
    }

    render(){
        return (
            <div className="namechanger">
                {/* <label>Change name:</label> */}
                <input type="text" maxLength="40" placeholder="Type your name here.."
                    onChange={(event) => this.props.changeName(event)} />
            </div>
        )
    }
}