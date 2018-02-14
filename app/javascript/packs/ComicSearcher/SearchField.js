import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest';
import Issue from './Issue.js'
import { Loader } from '../Components';

class SearchField extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      issues: [],
      loading: true
    }
  }

  componentDidMount(){
    this.fetchComics();
  }

  fetchComics = (query, page=1) => {
    this.setState({ loading: true });
    fetch('http://localhost:3000/api/v1/issues/')
    .then(this.handleErrors)
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        issues: data.issues,
        loading: false
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        loading: false,
        issues: null
      })
    });
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.issues.filter(issue =>
      issue.title.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => suggestion.title

  renderSuggestion = suggestion => (
    <div>
      {suggestion.title}
    </div>
  );

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({value: newValue});
  }

  renderAutocomplete = () => {
    if(this.state.loading) return <span>Loading</span>;
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Title, Series, Publisher, Whatever',
      value,
      onChange: this.handleChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={(event) => {
                                            this.props.onSubmit(event, this.state.value);
                                            this.setState({value: ''})}}>
          <div className="row">
            <div className="input-field inline col s12 SeriesIndex_SearcherForm">
              {this.renderAutocomplete()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchField;
