import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {Icon} from 'react-icons-kit'
import {bubbles4} from 'react-icons-kit/icomoon/bubbles4'
import {arrowDownBig} from 'react-icons-kit/metrize/arrowDownBig'
import {arrowUpBig} from 'react-icons-kit/metrize/arrowUpBig'
import { fetchPosts, votePost, deletePost} from 'Utils/api'
import { loadPosts, orderPosts } from 'Actions'
import { toDateReadable } from 'Utils/helpers';
import {ic_more_vert} from 'react-icons-kit/md/ic_more_vert'
import {pencil2} from 'react-icons-kit/icomoon/pencil2'
import {bin} from 'react-icons-kit/icomoon/bin'

class Post extends Component {
    state={
        options: false
    }

    voteUp = (id) => {
        votePost(id, "upVote").then(dados => {
            this.getPosts();
        })
    }

    voteDown = (id) => {
        votePost(id, "downVote").then(dados => {
            this.getPosts();
        })
    }

    getPosts = () => {
        const { loadPosts } = this.props
        fetchPosts().then(dados => {
          loadPosts(dados)
        })
    }
    
    deletePost = (id) =>{
        deletePost(id).then(dados => {
            this.props.history.push("/");
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
            <div className="post" key={post.timeStamp}>
                <div className="head-info">
                    <Link to={`/${post.category}/`}>
                        <h5>{post.category}</h5>
                    </Link>
                    <Link to={`/${post.category}/${post.id}`}>
                        <h4>{post.title}</h4>
                    </Link>
                    <h6>{post.author}</h6>
                    <h6>{toDateReadable(post.timestamp)}</h6>
                </div>
                <div className="text">
                    <Link to={`/${post.category}/${post.id}`}>
                        <p>
                           {post.body}
                        </p>
                    </Link>
                    
                </div>
                <div className="actions">
                    <Link to={`/${post.category}/${post.id}#comment-section`}>
                        <div><Icon icon={bubbles4} size={24}/> <span>{post.commentCount}</span></div>
                    </Link>
                    <div><Icon icon={arrowUpBig} size={24} className="up" onClick={() => this.voteUp(post.id)}/><Icon icon={arrowDownBig} size={24} className="down" onClick={() => this.voteDown(post.id)}/> <span>{post.voteScore}</span></div>
                    {post.author === this.props.user &&
                                <div className="options-container">
                                    <Icon icon={ic_more_vert} size={16} onClick={() => this.toggleOptions() } className="options-button"/>
                                    {this.state.options &&
                                        <div className="options">
                                            {post.author === this.props.user &&
                                                <React.Fragment>
                                                    <div ><Icon icon={pencil2}/> Edit</div>
                                                    <div onClick={() => this.deleteComment(post.id)}><Icon icon={bin}/> Delete</div>
                                                </React.Fragment>
                                            }
                                        </div>
                                    }
                                </div>
                        }
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({user}) => {
    return{
        user: user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      loadPosts: (data) => dispatch(loadPosts(data)),
      setOrderPosts: (data) => dispatch(orderPosts(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))