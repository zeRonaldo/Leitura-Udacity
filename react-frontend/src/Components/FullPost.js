import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {Icon} from 'react-icons-kit'
import {bubbles4} from 'react-icons-kit/icomoon/bubbles4'
import {arrowDownBig} from 'react-icons-kit/metrize/arrowDownBig'
import {arrowUpBig} from 'react-icons-kit/metrize/arrowUpBig'

import { fetchPost, votePost, deletePost} from 'Utils/api'
import { loadPost } from 'Actions'
import {withRouter} from 'react-router-dom'

class FullPost extends Component {
    state = { 
        redirect : false
    }

    componentDidMount= () => {
        console.log(this.props.match)
        this.getPosts()
    }


    redirect_to_home = () =>{
        this.setState({ 
            redirect: true,
        })
    }

    getPosts = () => {
        const { postId } = this.props.match.params
        const { loadPost } = this.props
        fetchPost(postId).then(dados => {
            loadPost(dados)
        })
    }

    deletePost = (id) =>{
        deletePost(id).then(dados => {
            this.redirect_to_home()
        })
    }

    voteUp = (id) => {
        votePost(id, "upVote").then(dados => {
            this.getPosts()
        })
    }

    voteDown = (id) => {
        votePost(id, "downVote").then(dados => {
            this.getPosts()
        })
    }

    render() {
        const {post} = this.props

        return (
            <div className="container">
                <div className="post">
                    {Object.entries(post).length > 0 &&
                        (
                        <React.Fragment>
                            <div className="head-info">
                                <Link to={`/${post.category}`}>
                                    <h5>{post.category}</h5>
                                </Link>
                                
                                    <h4>{post.title}</h4>
                            
                                <h6>{post.author}</h6>
                                <h6>{post.timestamp}</h6>
                            </div>
                            <div className="text">
                                
                                    <p> {post.body} </p>
                            
                                
                            </div>
                            <div className="actions">
                                <Link to={`/${post.category}/${post.id}#comment-section`}>
                                    <div><Icon icon={bubbles4} size={24}/> <span>{post.commentCount}</span></div>
                                </Link>
                                <div><Icon icon={arrowUpBig} size={24} className="up" onClick={() => this.voteUp(post.id)}/><Icon icon={arrowDownBig} size={24} className="down" onClick={() => this.voteDown(post.id)}/> <span>{post.voteScore}</span></div>
                                
                            </div>
                        </React.Fragment>
                        
                        )}
                </div>
            </div>
            
        )
    }
}

function mapStateToProps ({ post }) {
    
    return {
        post:post
    }
}

function mapDispatchToProps (dispatch) {
    return {
      loadPost: (data) => dispatch(loadPost(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPost))