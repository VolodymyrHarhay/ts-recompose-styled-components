import React, { Component } from 'react';
import SavedSearches from './Components/SavedSearches';
import styled from 'styled-components';


const Call = styled.div `
  font-size: 20px;
  color: red;
`

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/get');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <React.Fragment>
        <SavedSearches/>
        <Call> DATA - {this.state.data}</Call>
      </React.Fragment>
    );
  }
}

export default App;
