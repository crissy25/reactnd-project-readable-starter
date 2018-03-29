import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import EditComment from './EditComment'
import { deleteComment } from '../actions/index';
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
        // this.props.deletingComment(this.props.comment.id, this.props.comment.parentId)
        console.log('Clicked')
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
                    <span style={{ marinBottom: 10, marginRight: 10, fontWeight: 'bold'}}>{comment.voteScore}</span>
                            <IconButton iconStyle={{ width: '20', height: '20' }}>
                                <ThumbUp/>
                            </IconButton>
                            <IconButton iconStyle={{ width: '20', height: '20' }}>
                                <ThumbDown/>
                            </IconButton>
                        <div style={{ float: 'right', padding: '20px' }}>
                        <IconButton iconStyle={{ width: '20', height: '20' }}>
                            <ModeEdit onClick={this.handleCommentEdit.bind(this)}/>
                        </IconButton>
                        <IconButton iconStyle={{ width: '20', height: '20' }}>
                            <Delete onClick = {this.handleCommentDelete.bind(this)}/>
                        </IconButton>
                        </div>
                    </Card>
                    { this.state.commentEditToggle && <EditComment comment={comment} id={comment.id} parentId={comment.parentId} open={this.state.commentEditToggle} close={this.handleCloseCommentEdit.bind(this)}/>}
                </Card>
            </div>
        )
    }
}

// export default connect(undefined,{
//     deletingComment: deleteComment
// })(Comment);
export default Comment;