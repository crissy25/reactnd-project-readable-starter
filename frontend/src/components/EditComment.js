import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { updateComment } from '../actions/index'
import { connect } from 'react-redux'
class EditComment extends React.Component {
    state = {
        id: this.props.comment.id,
        body: this.props.comment.body,
        author: this.props.comment.author
    }
    handleCommentSubmit() {
        let data = {
            id: this.state.id,
            body: this.state.body,
            author: this.state.author
          }
        this.props.updatingComment(this.props.id, data, this.props.parentId)
        this.props.close()
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value })
    }
    handleCommentBody(e) {
        this.setState({ body: e.target.value })
    }
    render () {
        const actions = [
            <FlatButton label="Post" onClick={this.handleCommentSubmit.bind(this)} secondary={true} />,
                <FlatButton label="Close" onClick={this.props.close}/>
            ]
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog
                        title={'Edit Post'}
                        actions={actions}
                        open={this.props.open}
                        onClose={this.props.close}
                        autoScrollBodyContent={true}
                    >
                        <span style={{ marginRight: 20 }}>
                            <TextField
                            required
                            value={this.state.author}
                            hintText="Enter your Name"
                            floatingLabelText="Name"
                            onChange={(e) => this.handleAuthorChange(e)}
                            />
                        </span>
                        <div>
                            <TextField
                            required
                            value={this.state.body}
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
    updatingComment: updateComment
})(EditComment);