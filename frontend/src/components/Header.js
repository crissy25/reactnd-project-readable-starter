import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'

class Header extends Component {
  render() {
      const { categories } = this.props.categories
    return (
        <div>
           <MuiThemeProvider>
                <header>
                    <Link to="/"><FlatButton>All</FlatButton></Link>
                    {categories && categories.length > 0 && categories.map(( category, categoryIndex ) => {
                        return (
                            <Link to ={"/"+category.name} key={categoryIndex}><FlatButton>{category.name}</FlatButton></Link>
                        )
                    })}
                </header>
            </MuiThemeProvider>
        </div>
    );
  }
}
const mapStateToProps = ({ categories }) => ({
    categories
})
export default withRouter(connect(mapStateToProps)(Header))