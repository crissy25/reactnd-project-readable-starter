import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import uuid from 'uuid'
import { incrementCommentCount, postNewComment } from '../actions/index'
import { connect } from 'react-redux'
class NewComment extends React.Component {
    state = {
        author: 'default',
        comment: 'default'
    }
    handleCommentPost() {
        let data = {
            id: uuid(),
            parentId: this.props.id,
            timestamp: Date.now(),
            body: this.state.comment,
            author: this.state.author,
            voteScore: 0,
            deleted: false,
            parentDeleted: false
          }
        this.props.postingNewComment(data)
        this.props.incrementingCommentCount(data)
        this.props.close()
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value })
    }
    handleCommentBody(e) {
        this.setState({ comment: e.target.value })
    }
    render () {
        const actions = [
                <FlatButton label="Post" onClick={this.handleCommentPost.bind(this)} secondary={true} />,
                <FlatButton label="Close" onClick={this.props.close}/>
            ]
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog
                        title={'New Comment'}
                        actions={actions}
                        open={this.props.open}
                        onClose={this.props.close}
                        autoScrollBodyContent={true}
                    >
                        <span style={{ marginRight: 20 }}>
                            <TextField
                            required
                            hintText="Enter your Name"
                            floatingLabelText="Name"
                            onChange={(e) => this.handleAuthorChange(e)}
                            />
                        </span>
                        <div>
                            <TextField
                            required
                            multiLine={true}
                            fullWidth={true}
                            floatingLabelText="Content"
                            hintText="Enter your post"
                            rows={1}
                            rowsMax={7}
                            onChange={(e) => this.handleCommentBody(e)}
                            />
                        </div>      
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default connect(undefined,{
    incrementingCommentCount: incrementCommentCount,
    postingNewComment: postNewComment
})(NewComment);