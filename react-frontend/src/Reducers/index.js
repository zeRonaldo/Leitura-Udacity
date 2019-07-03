import {
    LOAD_CATEGORY,
    LOAD_POSTS,
    LOAD_POST,
    ORDER_POST,
    LOAD_COMMENTS,
    GET_POST_VOTES,
    ADD_POST,
    REMOVE_POST,
    GET_COMMENT_VOTES,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SET_USER
} from 'Actions'
import { combineReducers } from 'redux';


function category (state = [], action){
    
    switch (action.type) {
        
        case LOAD_CATEGORY :
            return action.categories

        default :
            return state
    }
}

function posts (state = [], action){
    
    switch (action.type) {
        
        case LOAD_POSTS :
            return action.posts

        default :
            return state
    }
}

function post (state = {}, action){
    const { post } = action
    switch (action.type) {
        
        case LOAD_POST :
            return post
        
        case GET_POST_VOTES:
            return {
                ...state,
                items: state.items.map(post => {
                    if (post.id === action.postId) {
                        return {
                            ...post,
                            voteScore:
                            action.vote === 'upVote'
                                ? post.voteScore + 1
                                : post.voteScore - 1
                        }
                        }
                    return post
                })
                }

        case ADD_POST:
            const newItems = state.items.slice()  
            newItems.unshift({
                id: action.id,
                timestamp: action.timestamp,
                title: action.title,
                body: action.body,
                author: action.author,
                category: action.category
            })
            return {
                ...state,
                items: newItems
            }

        case REMOVE_POST:
            return {
                ...state,
                items: state.items.filter(post => post.id !== action.postId)
            }

        default :
            return state
    }
}

function orderPost (state = { order: 'orderDown' }, action){
    
    switch (action.type) {
        
        case ORDER_POST :
            return action.order
        
        default :
            return state
    }
}

function comment (state = [], action){
    
    switch (action.type) {
        
        case LOAD_COMMENTS :
            return action.comments
        
        case GET_COMMENT_VOTES:
            return {
                ...state,
                items: state.items.map(comment => {
                    if (comment.id === action.commentId) {
                        return {
                            ...comment,
                            voteScore:
                            action.vote === 'upVote'
                                ? comment.voteScore + 1
                                : comment.voteScore - 1
                        }
                        }
                    return comment
                })
                }

        case ADD_COMMENT:
            const newItems = state.items.slice()  
            newItems.unshift({
                id: action.id,
                timestamp: action.timestamp,
                title: action.title,
                body: action.body,
                author: action.author,
                category: action.category
            })
            return {
                ...state,
                items: newItems
            }

        case REMOVE_COMMENT:
            return {
                ...state,
                items: state.items.filter(comment => comment.id !== comment.postId)
            }
        default :
            return state
    }
}

function user (state = 'thingtwo', action){
    switch(action.type){
        case SET_USER:
            return action.user
        default :
            return state
    }
}

export default combineReducers({ category, posts, orderPost, post, comment, user }) 