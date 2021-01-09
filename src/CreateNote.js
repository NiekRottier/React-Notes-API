import React from "react";
import "./styles.css";
import ReactModal from "react-modal";

export class CreateNote extends React.Component {
    constructor(){
        super()
        console.log("Created CreateNote");
        this.state = {
            modelOpen : false
        }

        ReactModal.setAppElement('#root');
    }

    openModal = () => {
        this.setState({
            modelOpen : true
        })
        console.log("Opened Modal");
    }

    closeModal = () => {
        this.setState({
            modelOpen : false
        })
        console.log("Closed Modal");
    }

    render(){
        return (
            <div className="createNote">
                <input type="button" value="Create Note" onClick={() => this.openModal()}/>

                {/* Modal and all its settings */}
                <ReactModal 
                    className="modalContent"
                    overlayClassName="modalOverlay"
                    isOpen={this.state.modelOpen}
                    onRequestClose={this.closeModal}>
                           
                    <form className="createNoteForm column-container">
                        <label htmlFor="Title">Title</label>
                        <input type="text" name="Title" />

                        <label htmlFor="Body">Body</label>
                        <input type="text" name="Body" />

                        <input type="submit" name="Submit" value="Submit" readOnly />
                    </form>

                    <small><i>click esc to close</i></small> 
                </ReactModal>
            </div>
        )
    }
}