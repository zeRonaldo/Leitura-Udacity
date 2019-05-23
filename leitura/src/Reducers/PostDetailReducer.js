import {
    DETAIL_GET_POST
    , DETAIL_GET_ALL_COMMENTS
    , DETAIL_OPEN_DIALOG_COMMENT
    , DETAIL_POST_HANDLE_CHANGE
    , DETAIL_GET_COMMENT
    , DETAIL_ADD_COMMENT
    , DETAIL_EDIT_COMMENT
    , DETAIL_REMOVE_COMMENT
    , DETAIL_COMMENT_FORM_CLEAN
} from '../Actions/ActionsTypes';
import { Post, Comment } from '../Model/';

const INITIAL_STATE = {
    Post
    , Comment
    , comments: []
    , fieldsErros: []
    , openDialogState: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DETAIL_GET_POST:
            return { ...state, Post: { ...action.payload } }
        case DETAIL_GET_ALL_COMMENTS:
            return { ...state, comments: [...action.payload] }
        case DETAIL_OPEN_DIALOG_COMMENT:
            return { ...state, openDialogState: action.payload }
        case DETAIL_POST_HANDLE_CHANGE:
            return { ...state, Comment: { ...state.Comment, [action.field]: action.payload } }
        case DETAIL_GET_COMMENT:
            return { ...state, Comment: { ...action.payload } }
        case DETAIL_ADD_COMMENT:
            return { ...state, comments: [...state.comments, action.payload] }
        case DETAIL_EDIT_COMMENT:
            return { ...state, comments: state.comments.map(c => (c.id === action.payload.id ? action.payload : c)) }
        case DETAIL_REMOVE_COMMENT:
            return { ...state, comments: [...state.comments.filter(c => action.payload.id !== c.id)] }
        case DETAIL_COMMENT_FORM_CLEAN:
            return { ...state, Comment, fieldsErros: [] }
        default:
            return state;
    }
}

