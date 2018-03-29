import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import uuid from 'uuid';
import { updatePost } from '../actions/index';
import { connect } from 'react-redux'
class EditPost extends React.Component {
    state = {
        id: this.props.post.id,
        title: this.props.post.title,
        body: this.props.post.body,
        author: this.props.post.author
    }
    handlePostSubmit() {
        let data = {
            id: this.state.id,
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
          }
        this.props.updatingPost(this.props.id, data, this.props.parentId)
        this.props.close()
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value })
    }
    handlePostTitle(e) {
        this.setState({ title: e.target.value })
    }
    handlePostBody(e) {
        this.setState({ body: e.target.value })
    }
    render () {
        const actions = [
            <FlatButton label="Post" onClick={this.handlePostSubmit.bind(this)} secondary={true} />,
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
                        <span>
                        <TextField
                        required
                        value={this.state.title}
                        floatingLabelText="Title"
                        hintText="Enter the Title"
                        onChange={(e) => this.handlePostTitle(e)}
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
                        onChange={(e) => this.handlePostBody(e)}
                        />
                        </div>      
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}
const mapStateToProps = ({ sortBy }) => ({
    sortBy
})
export default connect(mapStateToProps,{
    updatingPost: updatePost
})(EditPost);