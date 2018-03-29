import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './Post'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class DetailedPost extends Component {
    render() {
        const { posts } = this.props.posts;
        let id = this.props.match ? this.props.match.params.id : '',
            filteredPost = id !== '' && posts ? posts.filter( post => post.id === id) : "";
        return (
            <div>
                <MuiThemeProvider>
                    {filteredPost && filteredPost !== "" && <Post post={filteredPost[0]}/>}
                </MuiThemeProvider>
            </div>
    );
  }
}
const mapStateToProps = ({ posts }) => ({
    posts
})
export default connect(mapStateToProps)(DetailedPost);