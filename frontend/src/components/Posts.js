import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { updateCategory } from '../actions'

class Posts extends React.Component {
    componentDidMount() {
        let category = "all"
        if ( this.props.match ) {
            category = this.props.match.params.categories
            this.props.updateCurrentCategory(category)
        } else {
            this.props.updateCurrentCategory(category)
        }
    }
    componentWillReceiveProps( newProps ) {
        let category = "all"
        if ( newProps.match ) {
            category = newProps.match.params.categories
            this.props.updateCurrentCategory(category)
        } else {
            this.props.updateCurrentCategory(category)
        }
    }
    render () {
        const { posts } = this.props.posts;
        let match = this.props.match ? this.props.match.params.categories : '',
            filteredPosts = match !== '' && posts ? posts.filter(post => post.deleted === false && post.category === match ) : posts;
        return (
            <div>
                { filteredPosts && filteredPosts !== [] && filteredPosts.length !== 0 && filteredPosts.filter(po => po.deleted === false ).map((post, index) => {
                    return (<Post post={post} key={index}/>)
                })}
                {filteredPosts && filteredPosts.length ===0 && <div>Sorry, no Posts to display</div>}
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