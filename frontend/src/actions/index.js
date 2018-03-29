import * as API from './API'

const getCategoriesSuccess = (categories) => {
    return{
        type: 'GET_CATEGORIES',
        categories
    }
}
export const getCategories = () => dispatch => (
    API.getCategories()
    .then(data => 
        dispatch(getCategoriesSuccess(data.categories)))
)

const getPostsSuccess = (posts) => {
    return {
        type: 'GET_POSTS',
        posts
    }
}
export const getPosts = () => dispatch => (
    API.getAllPosts().then(posts => 
        dispatch(getPostsSuccess(posts))
    )
)

export const sortAllPosts = (sortBy) => {
    return {
        type: 'SORT_ALL_POSTS',
        sortBy
    }
}
    
export const updateCategory = (category) => {
    return {
        type: 'UPDATE_CATEGORY',
        category
    }
}
const postNewPostSuccess = (post, res, sortBy) => {
    return {
        type: 'ADD_POST',
        post,
        res,
        sortBy
    }
}
export const postNewPost = (data, sortBy) => dispatch => (
    API.postPost(data)
    .then(res => {
        dispatch(postNewPostSuccess(data, res, sortBy))
    })
)

export const addEmptyPostId = (id) => {
    return{
        type: 'ADD_EMPTY_POSTID',
        id
    }
}

export const sortByValue = (value) => {
    return {
        type: 'SORT_BY_VALUE',
        value
    }
}
const getCommentsSuccess = (comments, id) => {
    console.log('action',comments)
    return {
        type: 'GET_COMMENTS',
        comments,
        id
    }
}
export const getComments = (id) => dispatch => (
    API.getComments(id).then(comments => 
        dispatch(getCommentsSuccess(comments, id))
    )
)

const postNewCommentSuccess = (comment, res) => {
    console.log('response', res)
    return {
        type: 'ADD_COMMENT',
        comment,
        res
    }
}
export const postNewComment = (data) => dispatch => (
    API.postComment(data)
    .then(res => {
        dispatch(postNewCommentSuccess(data, res))
    })
)

export const incrementCommentCount = (data) => {
    return {
        type: 'INCREMENT_COMMENT_COUNT',
        data
    }
}

const updatePostSuccess = (id, data, sortBy) => {
    return {
        type: 'UPDATE_POST',
        id,
        data,
        sortBy
    }
}
export const updatePost = (id, data, sortBy) => dispatch => (
    API.updatePost(id, data)
    .then(res => {
        dispatch(updatePostSuccess(id, data, sortBy))
    })
)

const updateCommentSuccess = (id, data, parentId) => {
    return {
        type: 'UPDATE_COMMENT',
        id,
        data,
        parentId
    }
}
export const updateComment = (id, data, parentId) => dispatch => (
    API.updateComment(id, data)
    .then(res => {
        dispatch(updateCommentSuccess(id, data, parentId))
    })
)

// const deletePostSuccess = (id) => {
//     return {
//         type: 'DELETE_POST',
//         id
//     }
// }
// export const deletePost = (id) => dispatch => (
//     API.deletePost(id)
//     .then(res => {
//         dispatch(deletePostSuccess(id))
//     })
// )

const deleteCommentSuccess = (id, parentId) => {
    return {
        type: 'DELETE_COMMENT',
        id,
        parentId
    }
}
export const deleteComment = (id, parentId) => dispatch => (
    API.deleteComment(id)
    .then(res => {
        dispatch(deleteCommentSuccess(id, parentId))
    })
)