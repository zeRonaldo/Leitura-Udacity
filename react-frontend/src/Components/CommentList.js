import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { fetchPost,fetchComents, deleteComment, voteComment, editComment  } from 'Utils/api'
import {  loadComments, loadPost } from 'Actions'
import {withRouter} from 'react-router-dom'

class CommentList extends Component {
    componentDidMount() {
        this.getComments()
    }


    getPosts = () => {
        const { match, loadPost } = this.props

        fetchPost(match.params.postId).then(dados => {
            loadPost(dados)
        })
    }

    getComments = () => {
        const { match, loadComments } = this.props

        fetchComents(match.params.postId).then(dados => {
            loadComments(dados)
        })
    }

    getComments = () => {
        const { match, loadComments } = this.props

        fetchComents(match.params.postId).then(dados => {
            loadComments(dados)
        })
    }


    deleteComment = commentId => {
        deleteComment(commentId).then(dados => {
            this.getPosts()
            this.getComments()
        })
    }

    voteComment = (id, vote) => {
        voteComment(id, vote).then(dados => {
            this.getPosts()
            this.getComments()
        })
    }

    changeComment = commentId => {
    
        this.setState(
            { 
                openModalComment: true, 
                size:'small',
                commentId:commentId
            }
        )
    }

    render() {
        const{comments} = this.props
        return (
            <div className="container" id="comment-section">
                 {(Object.entries(comments).length !== 0 
                        ? (
                             comments.map((comment, index) => {
                                 return <Comment 
                                            data={comment} 
                                            key={index} 
                                            onDeleteComment={this.deleteComment}
                                            onVoteComment={this.voteComment}
                                            onChangeComment={this.changeComment}
                                            />
                            })
                        ):
                        (
                            <div>
                                <h3>No Comments</h3>
                                <h4>Be the first one to comment this post</h4>
                            </div>
                        ))}
            </div>
        )
    }
}

function mapStateToProps ({comment }) {
    
    
    return {
        comments: comment
    }
}


function mapDispatchToProps (dispatch) {
    return {
      loadComments: (data) => dispatch(loadComments(data)),
      loadPost: (data) => dispatch(loadPost(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList))