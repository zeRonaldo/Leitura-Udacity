import React, { Component } from 'react';
import {connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import Post from './Post';
import { fetchPosts} from 'Utils/api'
import { loadPosts } from 'Actions'
import { capitalize } from 'Utils/helpers'

class PostList extends Component {

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        const { loadPosts } = this.props
        fetchPosts().then(dados => {
          loadPosts(dados)
        })
    }

    render() {
        const {posts, match} = this.props
        
        console.log("match length: ", Object.entries(match).length)
        return (
            <main>
                <div className="container">
                     {Object.entries(match.params).length !== 0 && <h2>{(match.params.category)}</h2>}
                     {(Object.entries(posts).length !== 0 && posts.constructor === Array) 
                        ? (
                             posts.map((post, index) => {
                                 return <Post post={post} key={index}/>
                                })
                        ): (
                            <div className="post" key="0">
                                <h6 className="end">No posts</h6>
                            </div>
                        )
                        }
                        {(Object.entries(posts).length !== 0 && posts.constructor === Array) && (
                            <div className="post" key="0">
                                <h6 className="end">No more posts</h6>
                            </div>
                        )}
                </div>
            </main>
        )
    }
}


const orderPostToShow = (posts, order) =>{
    if(order === 'orderUp'){
        posts = posts.slice().sort((a,b) => {
            return (a.voteScore - b.voteScore);
        }); 
    }
    else if(order === 'orderDown'){
        posts = posts.slice().sort((a,b) => {
            return (b.voteScore - a.voteScore);
        })
    }

    return posts

}

function mapStateToProps ({ posts, orderPost, category }, props) {
    
    posts = orderPostToShow(posts, orderPost.order)

    if (props.filter){
        posts = posts.filter(e => e.category === props.filter.params.category)
    }

    const _category = category.map(data => {
        return {value:data.name, text: capitalize(data.path)}
    })

    return { posts, orderPost:orderPost, category:_category };
}

function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(loadPosts(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))