import React, { Component } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components'
import {compose, withProps, withHandlers} from 'recompose'
// import logo from './logo.svg';
import * as R from "ramda";
import { Button } from 'react-bootstrap';
import { createGlobalStyle } from 'styled-components'


// const AppTitle = styled<{ color: string }, 'h1'>('h1')`
//   font-size: 1.3em;
//   color: ${props => props.color ? props.color : 'black'}
// `

// const AppIntro = styled.p`
//   color: ${props => props.theme.primary};
//   font-size: large;
//   code {
//     font-size: 1.3rem;
//   }
// `

const Footer = styled.div`
  margin-top: 20px;
  button {
    margin-right: 15px;
  }
`

const Title = styled.h1`
  margin-top: 20px;
`

const Body = styled.div`
  margin-top: 20px;
`

const Wrapper = styled.div`
  text-align: center;
`

const enhance = compose(
  withHandlers({
    onSave: (props) => (event) => {
      console.log('onSave');
    },
    onUpdate: (props) => (event) => {
      console.log('onUpdate');
    },
    onDelete: (props) => (event) => {
      console.log('onDelete');
    }
  })
)

const SaveSearch = enhance( (props) => 
    <Wrapper>
      <Title>
        Menage Save Searches
      </Title>
      <Body>
        <input type='text'></input>
      </Body>
      <Footer>
        <Button bsStyle='link' className={'btn btn-link btn-lg'} onClick={props.onDelete}>Delete</Button>
        <Button bsStyle='info' className={'btn btn-info btn-lg'} onClick={props.onUpdate}>Update</Button>
        <Button bsStyle='success' className={'btn btn-success btn-lg'} onClick={props.onSave}>Save</Button>
      </Footer>
    </Wrapper>
);

export default SaveSearch;


