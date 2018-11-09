import React from 'react';
import styled from 'styled-components'
import {compose, withHandlers, withReducer} from 'recompose'
import Button from 'react-bootstrap/lib/Button';
// import { createGlobalStyle } from 'styled-components'
// import * as R from "ramda";


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

const Error = styled.div`
  color: red;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 12px;
`

const items = ['1', '2', '3'];

const saveSearchReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE':
    {
      const [...items] = state.items;
      if (items.includes(state.value)) {
        return {...state, isError: true, errorMessage: 'Such Save Search is already exist'};
      }
      else {
        items.push(state.value);
        return {...state, items};
      }
    }

    case 'DELETE':
    {
      let [...items] = state.items;
      if (items.includes(state.value)) {
        items = items.filter(x => x !== state.value);
        return {...state, items};
      }
      else {
        return {...state, items, isError: true, errorMessage: 'Such Save Search was not found '};
      }
    }

    case 'CHANGE':
    {
      return {...state, value: action.value, isError: false, errorMessage: ''};
    }

    default: {
      return state;
    }
  }
}

const onSaveCLick = ({ dispatch }) => (event) => {
  dispatch({ type: 'SAVE' })
};

const onDeleteCLick = ({ dispatch }) => (event) => {
  dispatch({ type: 'DELETE' })
};

const onChangeName = ({ dispatch }) => (event) => {
  dispatch({ type: 'CHANGE', value: event.target.value })
};


const enhance = compose(
  // withState('value', 'updateValue', []),
  withReducer('savedSearches', 'dispatch', saveSearchReducer, {items: items, value: '', isError: false, errorMessage: ''}),
  withHandlers({
    onSave: onSaveCLick,
    onUpdate: (props) => (event) => {
      console.log('onUpdate');
    },
    onDelete: onDeleteCLick,
    onChange: onChangeName
  })
)

const SaveSearch = enhance( (props)=> {
    const { onDelete, onUpdate, onSave, onChange, savedSearches } = props;
    return (
      <Wrapper>
        <Title>
          Menage Save Searches
        </Title>
        <Body>
          <input type='text' value={savedSearches.value} onChange={onChange}></input>
          {
            savedSearches.isError &&
            <Error>
              {savedSearches.errorMessage}
            </Error>
          }
          <div>
            Saved Searches: {savedSearches.items.map((x, i) => <span key={i}>{x}-</span>)}
          </div>
        </Body>
        <Footer>
          <Button variant='link' onClick={onDelete}>Delete</Button>
          <Button variant='info' onClick={onUpdate}>Update</Button>
          <Button variant='success' onClick={onSave}>Save</Button>
        </Footer>
      </Wrapper>
    );
  }
);

export default SaveSearch;