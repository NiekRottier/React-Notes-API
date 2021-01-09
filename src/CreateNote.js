import React from "react";
import "./styles.css";
import ReactModal from "react-modal";
// import dateFormat from "dateformat"

export class CreateNote extends React.Component {
    constructor(){
        super()
        console.log("Created CreateNote");
        this.state = {
            modelOpen : false,
            title : "",
            body : "",
            resData : {}
        }

        ReactModal.setAppElement('#root');
    }

    // Open and Close Modal
    openModal = () => {
        this.setState({ modelOpen : true })
        console.log("Opened Modal");
    }

    closeModal = () => {
        this.setState({ modelOpen : false })
        console.log("Closed Modal");
    }

    // Handle Form Changes
    handleTitleChange(event){
        let formTitle = event.target.value
        this.setState({ title : formTitle })
    }
    
    handleBodyChange(event){
        let formBody = event.target.value
        this.setState({ body : formBody })
    }

    // POST request to API
    handleSubmit = () => {
        let requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                'title' : this.state.title,
                'body' : this.state.body,
                'author' : this.props.author
            })
        };

        fetch("http://docent.cmi.hro.nl/bootb/demo/notes/", requestOptions)
            .then(response => response.json())
            .then(data => this.createdNote(data))
            .catch(error => console.log(error));
    }

    createdNote(data){
        console.log("Created a Note");
        // console.log(data);
        this.setState({ resData : data })

        this.props.reloadNotes()
        this.closeModal()
    }

    render(){
        return (
            <div className="createNote">
                <input type="button" value="Create Note" onClick={this.openModal}/>

                {/* Modal and all its settings */}
                <ReactModal 
                    className="modalContent"
                    overlayClassName="modalOverlay"
                    isOpen={this.state.modelOpen}
                    onRequestClose={this.closeModal}>
                           
                    <form className="createNoteForm column-container">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" minLength="3" value={this.state.title} 
                            onChange={(event) => this.handleTitleChange(event)} />

                        <label htmlFor="body">Body</label>
                        <input type="text" name="body" minLength="3" value={this.state.body} 
                            onChange={(event) => this.handleBodyChange(event)} />

                        <p>Author = <i>{this.props.author}</i></p>

                        <input type="button" value="Submit" onClick={this.handleSubmit}/>
                    </form>

                    <small><i>click esc to close</i></small> 
                </ReactModal>
            </div>
        )
    }
}