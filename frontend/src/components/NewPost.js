import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import uuid from 'uuid'
import { postNewPost, addEmptyPostId } from '../actions'

class NewPost extends React.Component {
    state = {
        author: 'default',
        title: 'default',
        body: 'default'
    }
    handlePostSubmit() {
        let id = uuid(),
            data = {
                id: id,
                timestamp: Date.now(),
                title: this.state.title,
                body: this.state.body,
                author: this.state.author,
                category: this.props.category.category === 'all' ? 'react' : this.props.category.category,
                voteScore: 0,
                deleted: false,
                commentCount: 0
            };
        this.props.postingNewPost(data, this.props.sortBy)
        this.props.addingEmptyPostId(id)
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
                <FlatButton label="Post" secondary={true} onClick={this.handlePostSubmit.bind(this)}/>,
                <FlatButton label="Close" onClick={this.props.close}/>
            ]
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog
                        title={'New Post'}
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
                        <span>
                            <TextField
                            required
                            floatingLabelText="Title"
                            hintText="Enter the Title"
                            onChange={(e) => this.handlePostTitle(e)}
                            />
                        </span>
                        <div>
                            <TextField
                            required
                            multiLine={true}
                            fullWidth={true}
                            floatingLabelText="Content"
                            hintText="Enter your post"
                            onChange={(e) => this.handlePostBody(e)}
                            rows={1}
                            rowsMax={7}
                            />
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}
const mapStateToProps = ({ category, sortBy }) => ({
    category, sortBy
})
export default connect(mapStateToProps,{
    postingNewPost: postNewPost,
    addingEmptyPostId: addEmptyPostId
})(NewPost);