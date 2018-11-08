import React, { Component } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components'
import {compose, withState, withHandlers, withReducer} from 'recompose'
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

const saveSearchReducer = (state, action) => {
  console.log({action});
  switch (action.type) {
    case 'SAVE':
      let newState = {...state};
      newState.items.push(action.payload);
      return newState;
    default: {
      return state;
    }
  }
}

const enhance = compose(
  withState('value', 'updateValue', []),
  withReducer('savedSearches', 'dispatch', saveSearchReducer, {items: ['']}),
  withHandlers({
    onSave: ({dispatch, value}) => (event) => dispatch({ type: 'SAVE', payload: value }),
    onUpdate: (props) => (event) => {
      console.log('onUpdate');
    },
    onDelete: (props) => (event) => {
      console.log(props.value);
    },
    onChange: props => event => {
      props.updateValue(event.target.value)
    }
  })
)

const SaveSearch = enhance( ({onDelete, onUpdate, onSave, onChange, value, savedSearches})=> {
    console.log({savedSearches});
    return (
      <Wrapper>
        <Title>
          Menage Save Searches
        </Title>
        <Body>
          <input type='text' value={value} onChange={onChange}></input>
          <div>
            Saved Searches: {savedSearches.items.map(x => <span>{x}-</span>)}
          </div>
        </Body>
        <Footer>
          <Button bsStyle='link' className={'btn btn-link btn-lg'} onClick={onDelete}>Delete</Button>
          <Button bsStyle='info' className={'btn btn-info btn-lg'} onClick={onUpdate}>Update</Button>
          <Button bsStyle='success' className={'btn btn-success btn-lg'} onClick={onSave}>Save</Button>
        </Footer>
      </Wrapper>
    );
  }
);

export default SaveSearch;