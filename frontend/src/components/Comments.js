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
        category: ''
    }
    componentDidMount(){
        const { getPostComments, id, category } = this.props;
        getPostComments(id);
        this.setState({ category: category.category })
    }
    componentWillReceiveProps( newProps ) {
        console.log('compo is mounting', newProps.category.category, this.state.category)
        if ( newProps.category.category !== this.state.category){
            const { getPostComments, id, category } = newProps;
            getPostComments(id);
            this.setState({ category: category.category })
        }
        
    }
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
const mapStateToProps = ({ comments, category }) => ({
    comments, category
})
export default connect(mapStateToProps,{
    getPostComments: getComments
})(Comments);
