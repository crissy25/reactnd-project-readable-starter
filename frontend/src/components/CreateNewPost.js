import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewPost from './NewPost'
class CreateNewPost extends Component {
    state = {
        newPostToggle: false
    }
    handleAddNewPost() {
        this.setState({ newPostToggle: true })
    }
    handleCloseAddNewPost() {
        this.setState({ newPostToggle: false })
    }
  render() {
    return (
        <div>
            { this.state.newPostToggle && <NewPost open={this.state.newPostToggle} close={this.handleCloseAddNewPost.bind(this)}/>}
            <div className='open-search' onClick={this.handleAddNewPost.bind(this)}>
                <a className="open-search"></a>
            </div>
        </div>
    );
  }
}
export default CreateNewPost;