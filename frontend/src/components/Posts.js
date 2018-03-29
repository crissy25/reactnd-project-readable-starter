import React from 'react';
import { connect } from 'react-redux'
import Post from './Post';
import { updateCategory } from '../actions';

class Posts extends React.Component {
    componentDidMount() {
        console.log('did mount')
        let category = "all"
        if ( this.props.match ) {
            console.log('here1')
            category = this.props.match.params.categories
            this.props.updateCurrentCategory(category)
        } else {
            console.log('here2')
            this.props.updateCurrentCategory(category)
        }
    }
    componentWillReceiveProps( newProps ) {
        console.log('will receive')
        let category = "all"
        if ( newProps.match ) {
            console.log('here3')
            category = newProps.match.params.categories
            this.props.updateCurrentCategory(category)
        } else {
            console.log('here4')
            this.props.updateCurrentCategory(category)
        }
    }
    render () {
        const { posts } = this.props.posts;
        let match = this.props.match ? this.props.match.params.categories : '',
            filteredPosts = match !== '' && posts ? posts.filter(post => post.category === match ) : posts;
        return (
            <div>
                { filteredPosts && filteredPosts !== [] && filteredPosts.length !== 0 && filteredPosts.map((post, index) => {
                    return (<Post post={post} key={index}/>)
                })}
            </div>
        )
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
})

export default connect(
    mapStateToProps,
    {
        updateCurrentCategory: updateCategory
    }
)(Posts);