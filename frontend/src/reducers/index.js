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
            return {
                ...state,
                posts: currentPosts
            }
        case 'SORT_ALL_POSTS':
            const { sortBy } = action,
                originalPosts = state.posts.slice(0)
            let array = [];
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
        case 'DELETE_POST':
            let pId = action.id,
                allposts = state.posts;
            allposts.map((post, index)=>{
                if(post.id === pId){
                    allposts[index] = {...post, ...{deleted: true}}
                }
            })
            return {
                ...state,
                [pId]: allposts
            }
        case 'UPVOTE_POST':
            let pId1 = action.id,
                allposts1 = state.posts;
            allposts1.map((post, index)=>{
                if(post.id === pId1){
                    post.voteScore += 1
                    allposts1[index] = {...post}
                }
            })
            return {
                ...state,
                [pId1]: allposts1
            }
        case 'DOWNVOTE_POST':
            let pId2 = action.id,
                allposts2 = state.posts;
            allposts2.map((post, index)=>{
                if(post.id === pId2){
                    post.voteScore -= 1
                    allposts2[index] = {...post}
                }
            })
            return {
                ...state,
                [pId2]: allposts2
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
        case 'DELETE_COMMENT':
            let commId = action.id,
                pId = action.parentId,
                allComm = state,
                commList = allComm[ pId ];
            commList.map((comment, index)=>{
                if(comment.id === commId){
                    commList[index] = {...comment, ...{ deleted: true }}
                }
            })
            return {
                ...state,
                [pId]: commList
            }
        case 'UPVOTE_COMMENT':
            let commId1 = action.id,
                pId1 = action.parentId,
                allComm1 = state,
                commList1 = allComm1[ pId1 ];
            commList1.map((comment, index)=>{
                if(comment.id === commId1){
                    comment.voteScore += 1
                    commList1[index] = {...comment}
                }
            })
            return {
                ...state,
                [pId1]: commList1
            }
        case 'DOWNVOTE_COMMENT':
            let commId2 = action.id,
                pId2 = action.parentId,
                allComm2 = state,
                commList2 = allComm2[ pId2 ];
            commList2.map((comment, index)=>{
                if(comment.id === commId2){
                    comment.voteScore -= 1
                    commList2[index] = {...comment}
                }
            })
            return {
                ...state,
                [pId2]: commList2
            }
        case 'ADD_COMMENT':
        const newComment = action.comment,
            { res } = action;
        let existingComments = state,
        parentId = newComment.parentId,
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

export default combineReducers({
    categories,
    posts,
    comments,
    category,
    sortBy
})