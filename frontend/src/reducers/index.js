import { combineReducers } from 'redux'
function getSortedPosts ( posts, sortBy ) {
    switch( sortBy ){
        case 'Date Ascending':
            posts.sort(function(a, b) {
                var x = a.timestamp,
                    y = b.timestamp;
                return (( x > y ) ? -1 : ( x < y ) ? 1 : 0 )
            })
            return posts
        case 'Date Descending':
            posts.sort(function(a, b) {
                var x = a.timestamp,
                    y = b.timestamp;
                return (( x < y ) ? -1 : ( x > y ) ? 1 : 0 )
            })
            return posts
        case 'Score Ascending':
            posts.sort(function(a, b) {
                var x = a.voteScore,
                    y = b.voteScore;
                return (( x < y ) ? -1 : ( x > y ) ? 1 : 0 )
            })
            return posts
        case 'Score Descending':
            posts.sort(function(a, b) {
                var x = a.voteScore,
                    y = b.voteScore;
                return (( x > y ) ? -1 : ( x < y ) ? 1 : 0 )
            })
            return posts
        default:
            return posts
    }
}
function categories ( state = {}, action){
    // console.log('reducer', action)
    switch (action.type) {
        case 'GET_CATEGORIES':
            const { categories } = action
            return {
                ...state,
                categories
            }
        default:
            return state
    }
}
function posts ( state = {}, action){
    switch( action.type ){
        case 'GET_POSTS':
            const { posts } = action
            return {
                ...state,
                posts
            }
        case 'INCREMENT_COMMENT_COUNT':
            const currentPosts = state.posts
            let parentId = action.data.parentId;
            currentPosts.map(( currentPost, index ) => {
                if ( currentPost.id === parentId ) {
                    currentPost.commentCount += 1
                }
            })
            console.log('--',currentPosts)
            return {
                ...state,
                posts: currentPosts
            }
        case 'SORT_ALL_POSTS':
            const { sortBy } = action,
                originalPosts = state.posts.slice(0)
            let array = []
                array = getSortedPosts( originalPosts, sortBy )
            return {
                ...state,
                posts: array
            }
        case 'ADD_POST':
            const { res } = action
            let newPost = action.post,
                postState = state.posts.slice(0),
                postArr = [],
                allPostsArr = [],
                sortedPosts = [];
            postArr.push({...newPost, ...res})
            allPostsArr = postArr.concat(postState)
            sortedPosts = getSortedPosts( allPostsArr, action.sortBy.sortBy)
            return {
                ...state,
                posts: sortedPosts
            }
        case 'UPDATE_POST':
            let postId = action.id,
                dataUpdate = action.data,
                allPosts = state.posts,
                editedPost = allPosts.filter( post => post.id === postId),
                allSortedPosts;
            allPosts.map((post, index)=>{
                if(post.id===postId){
                    allPosts[index] = {...editedPost[ 0 ], ...dataUpdate}
                }
            })
            allSortedPosts = getSortedPosts( allPosts, action.sortBy)
            return {
                ...state,
                posts: allSortedPosts
            }
        default:
            return state
    }
}
function comments ( state = {}, action){
    switch( action.type ){
        case 'GET_COMMENTS':
            const { comments, id } = action
            return {
                ...state,
                [id]: comments
            }
        case 'UPDATE_COMMENT':
            let commentId = action.id,
                currentParentId = action.parentId,
                dataUpdate = action.data,
                allComments = state,
                commentList = allComments[ currentParentId ];
            commentList.map((comment, index)=>{
                if( comment.id === commentId){
                    commentList[index] = {...comment, ...dataUpdate}
                }
            })
            return {
                ...state,
                [currentParentId]: commentList
            }

        case 'ADD_COMMENT':
        const newComment = action.comment,
            { res } = action;
        let existingComments = state;
        let parentId = newComment.parentId,
            commentsList = existingComments[ parentId ];
        commentsList.push({...newComment, ...res})
            return {
                ...state,
                comments: commentsList
            }
        case 'ADD_EMPTY_POSTID':
        let postId = action.id;
            return {
                ...state,
                [postId]: []
            }
        default:
            return state
    }
}
function category ( state = {}, action){
    switch( action.type ){
        case 'UPDATE_CATEGORY':
            const { category } = action
            return {
                ...state,
                category
            }
        default: 
            return state
        }
}
function sortBy ( state = {}, action){
    switch( action.type ){
        case 'SORT_BY_VALUE':
            return {
                ...state,
                sortBy: action.value
            }
        default:
            return state
    }
}
// export default categories
export default combineReducers({
    categories,
    posts,
    comments,
    category,
    sortBy
})