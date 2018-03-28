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

class Comments extends React.Component {
    state = {
        comments: []
    }

    componentDidMount() {
        if ( this.props.id ) {
            API.getComments( this.props.id ).then(( comments ) => {
                this.setState({ comments: comments })
                this.props.fetchComments({comments})
            })
        }
    }
    componentWillReceiveProps( newProps ) {
        console.log( 'testing',newProps.comments )
        if ( newProps.comments && newProps.comments.comments){
            let newComments = newProps.comments.comments.slice(0),
            currentComments = this.state.comments.slice(0),
            final = [];
            console.log('newComments',newComments)
            if ( newComments && newComments.length !==0 && newComments != []) {
                // currentComments.map((comment, index) => {
                //     console.log('map',this.props.id, comment.id)
                //     final = newComments.filter( newComment => newComment. parentId === this.props.id && newComment.id !== comment.id )
                // })
                // console.log('final',final)
                // newComments.map((newComment, index) => {
                //     currentComments.map((currentComment, index) => {
                //         if ( this.props.id === newComment.parentId && newComment.id === currentComment.id ) {
                //             final.push(newComment)
                //         } else if ( this.props.id === newComment.parentId && newComment.id !== currentComment.id )
                //     })
                // })
                final = newComments.filter( newComment => newComment.parentId === this.props.id )
                console.log( 'final',final, final.length, currentComments.length )
                if ( final.length !== currentComments.length ) {
                    this.setState({ comments: final})
                }
                
            }
        }
    }
    render () {
        const { comments } = this.state
        return (
            <div>
                {comments && comments !== [] && comments.length !== 0 && comments.map((comment, index) =>{
                    return (
                        <div key={index}>
                            <Card containerStyle={{ paddingLeft : '20px'}}>
                                <CardText>
                                <span style={{ fontWeight: 'bold' }}>{comment.author}</span>
                                <span>  </span>
                                <span>{comment.body}</span>

                                </CardText>
                                {/* <CardActions>
                                    <FlatButton label="Action1" />
                                    <FlatButton label="Action2" />
                                </CardActions>   style={{ height: '70px'}}*/}
                                <Card>
                                <span style={{ marinBottom: 10, marginRight: 10, fontWeight: 'bold'}}>{comment.voteScore}</span>
                                    {/* <Badge badgeContent={4} secondary={true} badgeStyle={{top: 18, right: 18}}> */}
                                        <IconButton iconStyle={{ width: '20', height: '20' }}>
                                            <ThumbUp/>
                                        </IconButton>
                                    {/* </Badge> */}
                                    {/* <Badge badgeContent={4} secondary={true} badgeStyle={{top: 18, right: 18}}> */}
                                        <IconButton iconStyle={{ width: '20', height: '20' }}>
                                            <ThumbDown/>
                                        </IconButton>
                                    {/* </Badge> */}
                                    
                                    <div style={{ float: 'right', padding: '20px' }}>
                                    <IconButton iconStyle={{ width: '20', height: '20' }}>
                                        <ModeEdit/>
                                    </IconButton>
                                    <IconButton iconStyle={{ width: '20', height: '20' }}>
                                        <Delete/>
                                    </IconButton>
                                    </div>
                                </Card>
                            </Card>
                        </div>
                    )
                })}
                
            </div>
        )
    }
}

export default Comments;