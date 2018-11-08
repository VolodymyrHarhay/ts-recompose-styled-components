import React, { Component } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components'
import logo from './logo.svg';
import * as R from "ramda";
import {withProps} from 'recompose';

import { createGlobalStyle } from 'styled-components'
// import './App.css';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const AppWrapper = styled.div`
  text-align: center;
`

const AppHeader = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`

const AppTitle = styled<{ color: string }, 'h1'>('h1')`
  font-size: 1.3em;
  color: ${props => props.color ? props.color : 'black'}
`

const AppIntro = styled.p`
  color: ${props => props.theme.primary};
  font-size: large;
  code {
    font-size: 1.3rem;
  }
`

const AppLogo = styled.img`
  animation: ${rotate360} infinite 120s linear;
  height: 80px;
  &:hover {
    animation: ${rotate360} infinite 1.5s linear;
  }
`

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: red;
    font-family: sans-serif;
  }
`

export const theme = {
  primary: 'green'
}

export const color = {
  orange: 'orange'
}

class App extends Component {
  render() {
    console.log(R.add(2, 3));
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <GlobalStyle />
          <AppHeader>
            <AppLogo src={logo} alt="logo"/>
            <AppTitle color={color.orange}>Welcome to React</AppTitle>
          </AppHeader>
          <AppIntro>
            Bootstrapped with <code>create-react-app</code>.
          </AppIntro>
          <AppIntro>
            Components styled with <code>styled-components</code>{' '}
          </AppIntro>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
