import React, { Component } from 'react'
import {Icon} from 'react-icons-kit'
import {arrowDownBig} from 'react-icons-kit/metrize/arrowDownBig'
import {arrowUpBig} from 'react-icons-kit/metrize/arrowUpBig'
import {ic_more_vert} from 'react-icons-kit/md/ic_more_vert'
import {toDateReadable} from 'Utils/helpers'
import {pencil2} from 'react-icons-kit/icomoon/pencil2'
import {bin} from 'react-icons-kit/icomoon/bin'
import {connect} from 'react-redux'
import CommentForm from './CommentForm';

 class Comment extends Component {
    state={
        options: false,
        edit: false,
        comment: {
            text: '',
            time: '',
        }
    }
    componentDidMount = () => {
        this.setState({
            comment:{
                text: this.props.data.body,
                time: this.props.data.timestamp
            }
        })
    }
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
        this.toggleOptions()
    }

    editComment = () => {
        this.toggleOptions()
        this.toggleForm()
    }

    toggleOptions = () => {
        this.setState({
            options: !this.state.options
        })
    }
    toggleForm = (comment, time) => {
        this.setState({
            edit: !this.state.edit,
            comment: {
                text: comment,
                time: time
            }
        })
    }
    render() {
        const{edit, comment} = this.state
        const{data} = this.props
        return (
                <div className="comment">
                    <h6>{data.author}</h6>
                    <h6>{toDateReadable(comment.time)}</h6>
                    {edit ? <CommentForm comment={data} offForm={(comment,time) => this.toggleForm(comment, time)}/> : <p> {comment.text} </p>}
                   
                    <div className="actions">
                            <div>
                                <Icon icon={arrowUpBig} className="up" size={16} onClick={() => this.voteCommentUp(data.id)}/>
                                <Icon icon={arrowDownBig} size={16} className="down" onClick={() => this.voteCommentDown(data.id)} /> 
                                <span>{data.voteScore}</span>
                            </div>

                            {data.author === this.props.user &&
                                <div className="options-container">
                                    <Icon icon={ic_more_vert} size={16} onClick={() => this.toggleOptions() }  className="options-button"/>
                                    {this.state.options &&
                                        <div className="options">
                                            {data.author === this.props.user &&
                                                <React.Fragment>
                                                    <div onClick={() => this.setState({edit: true})}><Icon icon={pencil2}/> Edit</div>
                                                    <div onClick={() => this.deleteComment(data.id)}><Icon icon={bin}/> Delete</div>
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

const mapStateToProps = ({user}) =>{
    return {
        user: user
    }
}
export default connect(mapStateToProps)(Comment)