export const LOAD_CATEGORY      = 'LOAD_CATEGORY'
export const LOAD_POSTS         = 'LOAD_POSTS'
export const ORDER_POST         = 'ORDER_POST'
export const LOAD_POST          = 'LOAD_POST'
export const LOAD_COMMENTS      = 'LOAD_COMMENTS'
export const SET_USER           = 'SET_USER'
export const GET_POST_VOTES     = 'GET_POST_VOTES'
export const ADD_POST           = 'ADD_POST'
export const REMOVE_POST        = 'REMOVE_POST'
export const GET_COMMENT_VOTES  = 'GET_COMMENT_VOTES'
export const ADD_COMMENT        = 'ADD_COMMENT'
export const REMOVE_COMMENT     = 'REMOVE_COMMENT'

//CATEGORY
export function loadCategory (categories) {
    return {
        type: LOAD_CATEGORY,
        categories
    }
}


//POSTS
export function loadPosts (posts) {
    return {
        type: LOAD_POSTS,
        posts
    }
}

export function loadPost (post) {
    return {
        type: LOAD_POST,
        post
    }
}

export function orderPosts (order) {
    return {
        type: ORDER_POST,
        order
    }
}

//COMMENTS
export function loadComments (comments) {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

//USERS
export function setUSer (user){
    return{
        type: SET_USER,
        user
    }
}