import React from 'react'
import {Card, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import EditComment from './EditComment'
import { deleteComment, upVoteComment, downVoteComment } from '../actions/index'
import { connect } from 'react-redux'
class Comment extends React.Component {
    state = {
        commentEditToggle: false
    }
    handleCommentEdit() {
        this.setState({ commentEditToggle: true })
    }
    handleCloseCommentEdit() {
        this.setState({ commentEditToggle: false })
    }
    handleCommentDelete() {
        this.props.deletingComment(this.props.comment.id, this.props.comment.parentId)
    }
    handleUpVoteComment() {
        let data = {
            option: "upVote"
        }
        this.props.upVotingComment(this.props.comment.id, data, this.props.comment.parentId)
    }
    handleDownVoteComment() {
        let data = {
            option: "downVote"
        }
        this.props.downVotingComment(this.props.comment.id, data, this.props.comment.parentId)
    }
    render () {
        const { comment } = this.props
        return (
            <div>
                <Card containerStyle={{ paddingLeft : '20px'}}>
                    <CardText>
                    <span style={{ fontWeight: 'bold' }}>{comment.author}</span>
                    <span>  </span>
                    <span>{comment.body}</span>
                    </CardText>
                    <Card>
                    <span style={{ marinBottom: 10, paddingLeft: 20, paddingBottom: 15, fontWeight: 'bold'}}>{comment.voteScore}</span>
                            <IconButton iconStyle={{ width: '20', height: '20' }} onClick={this.handleUpVoteComment.bind(this)}>
                                <ThumbUp/>
                            </IconButton>
                            <IconButton iconStyle={{ width: '20', height: '20' }} onClick={this.handleDownVoteComment.bind(this)}>
                                <ThumbDown/>
                            </IconButton>
                        <div style={{ float: 'right', paddingBottom: '20px', paddingRight: '10px' }}>
                            <IconButton iconStyle={{ width: '20', height: '20' }} onClick={this.handleCommentEdit.bind(this)}>
                                <ModeEdit />
                            </IconButton>
                            <IconButton iconStyle={{ width: '20', height: '20' }} onClick = {this.handleCommentDelete.bind(this)}>
                                <Delete />
                            </IconButton>
                        </div>
                    </Card>
                    { this.state.commentEditToggle && <EditComment comment={comment} id={comment.id} parentId={comment.parentId} open={this.state.commentEditToggle} close={this.handleCloseCommentEdit.bind(this)}/>}
                </Card>
            </div>
        )
    }
}

export default connect(undefined,{
    deletingComment: deleteComment,
    upVotingComment: upVoteComment,
    downVotingComment: downVoteComment
})(Comment);
