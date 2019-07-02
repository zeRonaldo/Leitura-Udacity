import React, { Component } from 'react'
import {Icon} from 'react-icons-kit'
import {arrowDownBig} from 'react-icons-kit/metrize/arrowDownBig'
import {arrowUpBig} from 'react-icons-kit/metrize/arrowUpBig'

export default class Comment extends Component {

    changeComment = commentId =>{
        this.props.onChangeComment(commentId)
    }

    voteCommentUp = commentId => {
        this.props.onVoteComment(commentId, "upVote")
    }

    voteCommentDown = commentId => {
        this.props.onVoteComment(commentId, "downVote")
    }

    deleteComment = commentId => {
        this.props.onDeleteComment(commentId)
    }

    render() {
        const{data} = this.props
        return (
                <div className="comment">
                    <h6>{data.author}</h6>
                    <h6>{data.timestamp}</h6>
                    <p> {data.body} </p>
                    <div className="actions">
                            <div><Icon icon={arrowUpBig} className="up" size={16} onClick={() => this.voteCommentUp(data.id)}/><Icon icon={arrowDownBig} size={16} className="down" onClick={() => this.voteCommentDown(data.id)} /> <span>{data.voteScore}</span></div>
                             
                    
                    </div>
                </div>
        )
    }
}
