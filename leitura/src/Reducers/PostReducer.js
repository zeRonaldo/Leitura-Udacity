import {
    POST_LOAD_DATA
    , POST_FORM_SAVE
    , POST_HANDLE_CHANGE
    , POST_CHANGE_CATEGORY
    , POST_VALID_FORM
    , POST_CLEAN_FORM
} from '../Actions/ActionsTypes';
import { Post } from '../Model';

const INITIAL_STATE = {
    Post
    , fieldsErros: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_HANDLE_CHANGE:
            return { ...state, Post: { ...state.Post, [action.field]: action.payload } }
        case POST_CHANGE_CATEGORY:
            return { ...state, Post: { ...state.Post, category: action.payload } }
        case POST_LOAD_DATA:
            return { ...state, Post: action.payload }
        case POST_FORM_SAVE:
            return { ...state, Post: { ...state.Post, ...action.payload } }
        case POST_VALID_FORM:
            return { ...state, fieldsErros: action.payload }
        case POST_CLEAN_FORM:
            return { ...state, Post, fieldsErros: [] }
        default:
            return state;
    }
}