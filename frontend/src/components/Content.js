import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Posts from './Posts'
import NewPost from './NewPost'
import CreateNewPost from './CreateNewPost';
class Content extends Component {
  render() {
    return (
        <div>
            <MuiThemeProvider>
                <div>
            <Route exact path="/" render={()=>(
                <Posts/>
            )} />
            <Route exact path="/:categories"  render={(match)=>(
                <Posts match={match.match}/>
            )}  />
            </div>
            </MuiThemeProvider>
            <CreateNewPost/>
        </div>
    );
  }
}

export default Content