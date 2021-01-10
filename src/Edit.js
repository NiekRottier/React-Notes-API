import React from "react";
import "./styles.css";
import ReactModal from "react-modal";

export class Edit extends React.Component {
    constructor(props){
        super(props)
        console.log("Created Edit");
        this.state = {
            modelOpen : false,
            title : props.note.title,
            body : props.note.body,
            author : props.note.author,
            resData : {}
        }

        ReactModal.setAppElement('#root');
    }

    refreshState = () => {
        this.setState({
            title : this.props.note.title,
            body : this.props.note.body,
            author : this.props.note.author
        })
    }

    // Open and Close Modal
    openModal = () => {
        this.setState({ modelOpen : true })
        console.log("Opened Modal");

        this.refreshState()
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

    // EDIT functions
    handleSubmit = (id) => {
        let requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                'title' : this.state.title,
                'body' : this.state.body,
                'author' : this.state.author
            })
        };

        fetch(`http://docent.cmi.hro.nl/bootb/demo/notes/${this.props.note.id}`, requestOptions)
            .then(response => response.json())
            .then(data => this.edittedNote(data))
            .catch(error => console.log(error));
    }

    edittedNote = (data) => {
        console.log(`Editted Note - ID: ${data.id}`);
        this.setState({ resData : data })

        this.props.reloadActiveNote(data.id)
        this.closeModal()
    }

    render(){
        return(
            <div>
                <input type="button" name="Edit" value="Edit" onClick={() => this.openModal()} />

                <ReactModal
                    className="modalContent"
                    overlayClassName="modalOverlay"
                    isOpen={this.state.modelOpen}
                    onRequestClose={this.closeModal}>
                           
                    <form className="noteForm column-container">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" minLength="3" value={this.state.title} 
                            onChange={(event) => this.handleTitleChange(event)} />

                        <label htmlFor="body">Body</label>
                        <input type="text" name="body" minLength="3" value={this.state.body} 
                            onChange={(event) => this.handleBodyChange(event)} />

                        <p>Author = <i>{this.state.author}</i></p>

                        <input type="button" value="Submit" onClick={this.handleSubmit}/>
                    </form>

                    <small><i>click esc to close</i></small> 
                </ReactModal>
            </div>
        )
    }
}