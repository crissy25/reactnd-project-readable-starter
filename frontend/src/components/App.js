import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCategories, getPosts } from '../actions';
import { withRouter } from 'react-router-dom'
import Header from './Header';
import Content from './Content';
import Sorter from './Sorter';
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
        </div>
    );
  }
}
export default withRouter(connect(undefined,{
    fetchCategories: getCategories,
    fetchPosts: getPosts
})(App))