import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {Icon} from 'react-icons-kit'
import {bubbles4} from 'react-icons-kit/icomoon/bubbles4'
import {arrowDownBig} from 'react-icons-kit/metrize/arrowDownBig'
import {arrowUpBig} from 'react-icons-kit/metrize/arrowUpBig'
import { fetchPosts, votePost} from 'Utils/api'
import { loadPosts, orderPosts } from 'Actions'

class Post extends Component {

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
                    <h6>27/08/2019</h6>
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
                    
                </div>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(loadPosts(data)),
      setOrderPosts: (data) => dispatch(orderPosts(data)),
    }
}

export default connect(null, mapDispatchToProps)(Post)