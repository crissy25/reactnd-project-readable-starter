import React from 'react'
import { connect } from 'react-redux'
import { getComments } from '../actions'
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
        if ( newProps.category.category !== this.state.category){
            const { getPostComments, id, category } = newProps;
            getPostComments(id);
            this.setState({ category: category.category })
        }
    }
    render () {
        let commentsArray = this.props.comments[this.props.id]
        return (
            <div>
               {commentsArray && commentsArray !== [] && commentsArray.length !== 0 && commentsArray.filter( comm => comm.deleted === false ).map((comment, index) =>{
                   return(
                       <Comment comment={comment} key={index}/>
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
