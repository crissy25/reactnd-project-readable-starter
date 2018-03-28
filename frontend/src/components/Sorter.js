import React from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { sortAllPosts, sortByValue } from '../actions';
class Sorter extends React.Component {
    state = {
        value: null
    }
    handleChange = ( event, index, value ) => { 
        this.props.sortByValueSelected(value)
        this.props.sortPosts(value)
        this.setState({
            value
        })
    }
    render () {
        const { value } = this.state
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <SelectField
                        floatingLabelText="Sort By"
                        onChange={this.handleChange}
                        value={value}
                        >
                            <MenuItem value={null} primaryText="" />
                            <MenuItem value="Date Ascending" primaryText="Date Ascending" />
                            <MenuItem value="Date Descending" primaryText="Date Descending" />
                            <MenuItem value="Score Ascending" primaryText="Score Ascending" />
                            <MenuItem value="Score Descending" primaryText="Score Descending" />
                        </SelectField>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default connect(
    undefined,{
        sortPosts: sortAllPosts,
        sortByValueSelected: sortByValue
    }
)(Sorter);