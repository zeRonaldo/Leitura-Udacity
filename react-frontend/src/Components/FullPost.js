import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {Icon} from 'react-icons-kit'
import {bubbles4} from 'react-icons-kit/icomoon/bubbles4'
import {arrowDownBig} from 'react-icons-kit/metrize/arrowDownBig'
import {arrowUpBig} from 'react-icons-kit/metrize/arrowUpBig'

import {ic_more_vert} from 'react-icons-kit/md/ic_more_vert'
import {pencil2} from 'react-icons-kit/icomoon/pencil2'
import {bin} from 'react-icons-kit/icomoon/bin'


import { fetchPost, votePost, deletePost} from 'Utils/api'
import { loadPost } from 'Actions'
import {withRouter} from 'react-router-dom'
import { toDateReadable, isEmpty } from 'Utils/helpers';

class FullPost extends Component {
    state={
        options: false
    }

    componentDidMount= () => {
        this.getPosts()
    }


    redirect_to_home = () =>{
        this.props.history.push("/")
    }

    editPost = (postId) =>{
        this.props.history.push(`/edit/${postId}`)
    }

    getPosts = () => {
        const { postId } = this.props.match.params
        const { loadPost, setEmpty } = this.props
        fetchPost(postId).then(dados => {
            
            loadPost(dados)
            if(isEmpty(dados)){
                console.log("vazio")
                setEmpty()
            }else{
                if(typeof dados.id !== 'string'){
                    console.log("erro", dados.error)
                    setEmpty()
                }
            }
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

    toggleOptions = () => {
        this.setState({
            options: !this.state.options
        })
    }

    render() {
        const {post} = this.props

        return (
            <div className="container">
                <div className="post">
                    {Object.entries(post).length > 0  &&
                        (
                        <React.Fragment>
                            <div className="head-info">
                                <Link to={`/${post.category}`}>
                                    <h5>{post.category}</h5>
                                </Link>
                                
                                    <h4>{post.title}</h4>
                            
                                <h6>{post.author}</h6>
                                <h6>{toDateReadable(post.timestamp)}</h6>
                            </div>
                            <div className="text">
                                
                                    <p> {post.body} </p>
                            
                                
                            </div>
                            <div className="actions">
                                <Link to={`/${post.category}/${post.id}#comment-section`}>
                                    <div><Icon icon={bubbles4} size={24}/> <span>{post.commentCount+this.props.count}</span></div>
                                </Link>
                                <div><Icon icon={arrowUpBig} size={24} className="up" onClick={() => this.voteUp(post.id)}/><Icon icon={arrowDownBig} size={24} className="down" onClick={() => this.voteDown(post.id)}/> <span>{post.voteScore}</span></div>
                                
                                {post.author === this.props.user &&
                                <div className="options-container">
                                    <Icon icon={ic_more_vert} size={16} onClick={() => this.toggleOptions() } className="options-button"/>
                                    {this.state.options &&
                                        <div className="options">
                                            {post.author === this.props.user &&
                                                <React.Fragment>
                                                    <div onClick={() => this.editPost(post.id)}><Icon icon={pencil2}/> Edit</div>
                                                    <div onClick={() => this.deletePost(post.id)}><Icon icon={bin}/> Delete</div>
                                                </React.Fragment>
                                            }
                                        </div>
                                    }
                                </div>
                        }
                            </div>
                        </React.Fragment>
                        
                        )}
                </div>
            </div>
            
        )
    }
}

function mapStateToProps ({ post, user }) {
    
    return {
        post:post,
        user: user
    }
}

function mapDispatchToProps (dispatch) {
    return {
      loadPost: (data) => dispatch(loadPost(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPost))