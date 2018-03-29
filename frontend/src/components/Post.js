import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge'
import ModeComment from 'material-ui/svg-icons/editor/mode-comment'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Add from 'material-ui/svg-icons/content/add'
import Comments from './Comments';
import NewComment from './NewComment';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import EditPost from './EditPost';
// import { getComments } from '../actions'

const headers = {
    'Authorization': 'whatever-you-want',
    'Accept': 'application/json'
}
class Post extends React.Component {
    state = {
        newCommentToggle: false,
        postEditToggle: false
    }

    handleAddNewComment() {
        this.setState({ newCommentToggle: true })
    }
    handleCloseAddNewComment() {
        this.setState({ newCommentToggle: false })
    }
    handlePostEdit() {
        this.setState({ postEditToggle: true })
    }
    handleClosePostEdit() {
        this.setState({ postEditToggle: false })
    }
    render () {
        const { post } = this.props
        let date = new Date(post.timestamp)
        return (
        <div>
        <Card>
            <CardTitle 
                title={<Link to={"/posts/"+post.id}>{post.title}</Link>} 
                subtitle={post.author + ' ' + date} 
            />
            <CardText>
                {post.body}
            </CardText>
            <Card>
                <Badge badgeContent={post.commentCount} primary={true} badgeStyle={{top: 12, right: 12}}>
                    <IconButton>
                        <ModeComment/>
                    </IconButton>
                </Badge>
                <span style={{ marinBottom: 10, marginRight: 10, fontWeight: 'bold'}}>{post.voteScore}</span>
                    <IconButton>
                        <ThumbUp />
                    </IconButton>
                    <IconButton>
                        <ThumbDown />
                    </IconButton>
                <div style={{ float: 'right', padding: '20px' }}>
                <IconButton iconStyle={{ width: '20', height: '20' }}>
                    <ModeEdit onClick={this.handlePostEdit.bind(this)} />
                </IconButton>
                <IconButton iconStyle={{ width: '20', height: '20' }}>
                    <Delete/>
                </IconButton>
                <FlatButton
                label="Comment"
                labelPosition="after"
                primary={true}
                icon={<Add />}
                onClick={this.handleAddNewComment.bind(this)}
                />
                </div>
            </Card>
             <Comments id={post.id}/>
            { this.state.newCommentToggle && <NewComment id={post.id} open={this.state.newCommentToggle} close={this.handleCloseAddNewComment.bind(this)}/>}
            { this.state.postEditToggle && <EditPost post={post} id={post.id} open={this.state.postEditToggle} close={this.handleClosePostEdit.bind(this)}/>}
        </Card></div>)
    }
}

export default Post;