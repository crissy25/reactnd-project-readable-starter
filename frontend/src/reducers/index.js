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
            console.log(posts)
            return {
                ...state,
                posts
            }
        case 'INCREMENT_COMMENT_COUNT':
            const currentPosts = state.posts
            // console.log('>>>', state.posts, action.data[ 0 ].parentId)
            let parentId = action.data[ 0 ].parentId,
                post = currentPosts.filter( post => post.id === parentId );
            currentPosts.map(( currentPost, index ) => {
                if ( currentPost.id === parentId ) {
                    currentPost.commentCount += 1
                }
            })
            // post[0].commentCount = parseInt(post[0].commentCount) + 1
            console.log('--',currentPosts)
            return {
                ...state,
                posts: currentPosts
            }
        case 'SORT_ALL_POSTS':
            const { sortBy } = action,
                originalPosts = state.posts.slice(0)
            let array = []
                console.log('og', originalPosts)
                array = getSortedPosts( originalPosts, sortBy )
                console.log('now', array)
            return {
                ...state,
                posts: originalPosts
            }
        case 'ADD_POST':
            const { res } = action
            let newPost = action.post,
                postArr = [],
                allPostsArr = [],
                sortedPosts = [];
            postArr.push({...newPost, ...res})
            allPostsArr.push(state.posts.concat(postArr))
            sortedPosts = getSortedPosts( allPostsArr, action.sortBy.sortBy)
            console.log(newPost, res, {...newPost, ...res}, postArr, allPostsArr, action.sortBy)
            console.log(sortedPosts)
            
            return {
                ...state,
                posts: state.posts.concat(postArr)
            }
        default:
            return state
    }
}
function comments ( state = { comments: []}, action){
    switch( action.type ){
        case 'GET_COMMENTS':
        const { comments } = action
            let stateComments = state.comments,
                actionComments = comments;
            // console.log( stateComments, actionComments)
            let contains = false, results = [];
            if ( stateComments.length === 0 && actionComments.length !== 0 ){
                // console.log('here')
                results = actionComments
            } else if ( stateComments.length !== 0 && actionComments.length !==0 ){
                for( var i = 0; i < actionComments.length; i++ ){
                    for( var j = 0; j < stateComments.length; j++ ){
                        // console.log('>>', stateComments[ i ].id, actionComments[ j ].id)
                        if( stateComments[ i ].id === actionComments[ j ].id ){
                            contains = true;
                            break;
                        }
                    }
                    if( !contains ){
                        results.push(actionComments[ i ])
                    } else{
                        contains = false
                    }
                }
            }
            
            // console.log('WHAT I GET', results, state.comments)
            return {
                ...state,
                comments: state.comments.concat(results)
            }
        case 'ADD_COMMENT':
        const newComment = action.comments
        // console.log('say what',newComment, state.comments, state.comments.concat(newComment))
            return {
                ...state,
                comments: state.comments.concat(newComment)
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