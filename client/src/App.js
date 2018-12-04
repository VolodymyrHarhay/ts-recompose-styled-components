import React, { Component } from 'react';
import SavedSearches from './Components/SavedSearches';


class App extends Component {
  state = {
    savedSearches: null
  };

  componentDidMount() {
    this.getSavedSearches()
      .then(data => this.setState({ savedSearches: data }))
      .catch(err => console.log(err));
  }

  getSavedSearches = async () => {
    const response = await fetch('/getSavedSearches');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <React.Fragment>
        { this.state.savedSearches &&
          <SavedSearches savedSearches={this.state.savedSearches}/>
        }
      </React.Fragment>
    );
  }
}

export default App;
