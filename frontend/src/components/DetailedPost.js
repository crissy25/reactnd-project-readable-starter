import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
const style = {
    height: '100%',
    width: '80%',
    margin: 'auto',
    minHeight:'50px'
}
class DetailedPost extends Component {
    render() {
        const { posts } = this.props.posts;
        let id = this.props.match ? this.props.match.params.id : '',
            filteredPost = id !== '' && posts ? posts.filter( post => post.id === id) : "";
        return (
            <div>
                <MuiThemeProvider>
                    <Paper style={{...style, ...{padding: '10px'}}} zDepth={2}>
                        <b>Single Post Display</b>
                    </Paper>
                    <Paper  style={style} zDepth={5}>
                    {filteredPost && filteredPost !== "" && filteredPost.length !== 0 && <Post post={filteredPost[0]}/>}
                    {filteredPost && filteredPost.length ===0 && <div>Sorry this post is no longer available</div>}
                    </Paper>
                </MuiThemeProvider>
            </div>
    );
  }
}
const mapStateToProps = ({ posts }) => ({
    posts
})
export default connect(mapStateToProps)(DetailedPost);