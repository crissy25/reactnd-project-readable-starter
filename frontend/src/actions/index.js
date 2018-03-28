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
        console.log('POSTS',data, res, sortBy)
        dispatch(postNewPostSuccess(data, res, sortBy))
    })
)
export const sortByValue = (value) => {
    return {
        type: 'SORT_BY_VALUE',
        value
    }
}
// export function postNewPost({ data }) {

//     return {
//         type: 'ADD_COMMENT',
//         comments: data
//     }
// }
//-----

export function getComments({ comments }) {
    // console.log('action', comments)
    return {
        type: 'GET_COMMENTS',
        comments
    }
}

export function postNewComment({ data }) {
    // console.log('action', data)
    return {
        type: 'ADD_COMMENT',
        comments: data
    }
}

export function incrementCommentCount({ data }) {
    // console.log('action', data)
    return {
        type: 'INCREMENT_COMMENT_COUNT',
        data
    }
}