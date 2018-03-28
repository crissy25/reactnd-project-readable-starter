import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
class Comment extends React.Component {
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
                            <ModeEdit/>
                        </IconButton>
                        <IconButton iconStyle={{ width: '20', height: '20' }}>
                            <Delete/>
                        </IconButton>
                        </div>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default Comment;
