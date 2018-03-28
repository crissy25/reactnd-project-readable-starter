import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import * as API from '../actions/API';
import { connect } from 'react-redux';
import { getComments } from '../actions';
import Comment from './Comment'
class Comments extends React.Component {
    state = {
        comments: []
    }
    componentWillMount() {
        const { getPostComments, id } = this.props;
        getPostComments(id);
    }
    // componentDidMount() {
    //     if ( this.props.id ) {
    //         API.getComments( this.props.id ).then(( comments ) => {
    //             this.setState({ comments: comments })
    //             this.props.fetchComments({comments})
    //         })
    //     }
    // }
    // componentWillReceiveProps( newProps ) {
    //     console.log( 'testing',newProps.comments )
    //     if ( newProps.comments && newProps.comments.comments){
    //         let newComments = newProps.comments.comments.slice(0),
    //         currentComments = this.state.comments.slice(0),
    //         final = [];
    //         console.log('newComments',newComments)
    //         if ( newComments && newComments.length !==0 && newComments != []) {
    //             // currentComments.map((comment, index) => {
    //             //     console.log('map',this.props.id, comment.id)
    //             //     final = newComments.filter( newComment => newComment. parentId === this.props.id && newComment.id !== comment.id )
    //             // })
    //             // console.log('final',final)
    //             // newComments.map((newComment, index) => {
    //             //     currentComments.map((currentComment, index) => {
    //             //         if ( this.props.id === newComment.parentId && newComment.id === currentComment.id ) {
    //             //             final.push(newComment)
    //             //         } else if ( this.props.id === newComment.parentId && newComment.id !== currentComment.id )
    //             //     })
    //             // })
    //             final = newComments.filter( newComment => newComment.parentId === this.props.id )
    //             console.log( 'final',final, final.length, currentComments.length )
    //             if ( final.length !== currentComments.length ) {
    //                 this.setState({ comments: final})
    //             }
                
    //         }
    //     }
    // }
    render () {
        // const { comments } = this.props
        let commentsArray = this.props.comments[this.props.id]
        console.log( 'here',this.props.comments[this.props.id] )
        return (
            <div>
               {commentsArray && commentsArray !== [] && commentsArray.length !== 0 && commentsArray.map((comment, index) =>{
                   return(
                       <Comment comment={comment} key={index}/>
                    // <div>wee</div>
                   )
                
                })}
                
            </div>
        )
    }
}
const mapStateToProps = ({ comments }) => ({
    comments
})
export default connect(mapStateToProps,{
    getPostComments: getComments
})(Comments);
