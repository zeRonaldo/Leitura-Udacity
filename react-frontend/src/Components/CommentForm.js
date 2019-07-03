import React, { Component } from 'react'
import { addComments, editComment } from 'Utils/api';
import { connect } from 'react-redux';
import { loadComments } from 'Actions';
import { fetchComents } from 'Utils/api'
import { hashCode } from 'Utils/helpers'

class CommentForm extends Component {
    state = {
        text: '',
        author: 'thingone',
        id: ''
    }
    clearForm = () => {
        this.setState({
            text:'',
            author: this.props.user,
            id:''
        })
    }

    AddComment = (e) => {
        const {post, loadComments} = this.props
        const {text, author} = this.state
        const id = hashCode()

        e.preventDefault()

        addComments(id, Date.now() , text , author, post.id).then(
            fetchComents(post.id).then(dados => {
                loadComments(dados)
            })
        )
        this.clearForm()
    }
    EditComment = (e) => {
        const {text, author, id} = this.state
        const{post, offForm} = this.props
        e.preventDefault()

        editComment(id, Date.now(), text, author).then(() => {
            offForm() 
            fetchComents(post.id).then( dados => {
                console.log(dados) 
                loadComments(dados)
            })
        }
        )
    }

    handleComment = (e) => {
        const{comment} = this.props

        if(comment){
            console.log("EDITANDO")
            this.EditComment(e)
        }else{
            console.log("CRIANDO")
            this.AddComment(e)
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
    componentDidMount = () =>{
        const {comment} = this.props

        if(comment){
            this.setState({
                text: comment.body,
                author: this.props.user,
                id: comment.id
            })
        }else{
            this.setState({
                author: this.props.user
            })
        }
        

    }

    render() {
        return (
            <div className="container">
                <div className="new-comment">
                    <form id="comment" onSubmit= {(e) => this.handleComment(e)}>
                        <textarea 
                        form ="comment" 
                        name="text" 
                        id="text" 
                        rows="3"
                        placeholder="Write Something..."
                        onChange={(e) => this.handleInputChange(e)}
                        value={this.state.text}
                        />
                        <input type="submit" />
                    </form> 
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({post, user, comments}) => {
    return{
        post: post,
        user: user,
        comments: comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
      loadComments: (data) => dispatch(loadComments(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentForm)