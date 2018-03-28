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
import { getCategories, getPosts, getComments, postNewComment, incrementCommentCount } from '../actions'

const headers = {
    'Authorization': 'whatever-you-want',
    'Accept': 'application/json'
}
class Post extends React.Component {
    state = {
        newCommentToggle: false
    }

    handleAddNewPost() {
        this.setState({ newPostToggle: true })
    }
    handleCloseAddNewPost() {
        this.setState({ newPostToggle: false })
    }
    handleAddNewComment() {
        this.setState({ newCommentToggle: true })
    }
    handleCloseAddNewComment() {
        this.setState({ newCommentToggle: false })
    }
    render () {
        const { post } = this.props
        let date = new Date(post.timestamp)
        return (
        <div>
        <Card>
            <CardTitle 
                title={post.title} 
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
                {/* <Badge primary={true} badgeStyle={{top: 12, right: 12}}> */}
                    <IconButton>
                        <ThumbUp />
                    </IconButton>
                {/* </Badge> */}
                {/* <Badge primary={true} badgeStyle={{top: 12, right: 12}}> */}
                    <IconButton>
                        <ThumbDown />
                    </IconButton>
                {/* </Badge> */}
                <div style={{ float: 'right', padding: '20px' }}>
                <IconButton iconStyle={{ width: '20', height: '20' }}>
                    <ModeEdit/>
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
            {/* <Comments comments={this.props.comments} id={post.id} fetchComments={this.props.fetchComments}/>
            { this.state.newCommentToggle && <NewComment incrementingCommentCount={this.props.incrementingCommentCount} id={post.id} open={this.state.newCommentToggle} close={this.handleCloseAddNewComment.bind(this)} postingNewComment={this.props.postingNewComment}/>} */}
        </Card></div>)
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
})
function mapDispatchToProps (dispatch) {
    return {
        fetchCategories: (data) => dispatch(getCategories(data)),
        fetchPosts: (data) => dispatch(getPosts(data)),
        fetchComments: (data) => dispatch(getComments(data)),
        postingNewComment: (data) => dispatch(postNewComment(data)),
        incrementingCommentCount: (data) => dispatch(incrementCommentCount(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);