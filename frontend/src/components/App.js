import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCategories, getPosts } from '../actions';
import { Route, withRouter } from 'react-router-dom'
import Header from './Header';
import Content from './Content';
import Sorter from './Sorter';
import DetailedPost from './DetailedPost'
class App extends Component {
    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchPosts()
    }
  render() {
    return (
        <div>
            <Header/>
            <Sorter/>
            <Content/>
            <Route exact path="/posts/:id" render={(match)=>(
                <DetailedPost match={match.match}/>
//create a wrapper component which can fetch the post via an api call
            )} />
        </div>
    );
  }
}
export default withRouter(connect(undefined,{
    fetchCategories: getCategories,
    fetchPosts: getPosts
})(App))