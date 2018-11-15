import React, { useState, useReducer } from 'react';

import styled from 'styled-components'

import Button from 'react-bootstrap/lib/Button';

import saveSearchReducer from '../Reducers/saveSearchReducer'

import SaveSearch from './SaveSearch'


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

//mocked SavedSearches
const items = [
  {
    id: 1,
    name: 'name1'
  },
  {
    id: 2,
    name: 'name2'
  },
  {
    id: 3,
    name: 'name3'
  }
];

const onSave = (dispatch) => {
  dispatch({ type: 'SAVE' });
};

const onDelete = (dispatch, id) => {
  dispatch({ type: 'DELETE', id })
};

const onUpdate = (dispatch, id, newName ) => {
  dispatch({ type: 'UPDATE', id, newName })
};

// const onChange = (dispatch, id, newName ) => {
//   dispatch({ type: 'UPDATE', id, newName })
// };

const SavedSearches = () => {
  const [savedSearches, dispatch] = useReducer(saveSearchReducer, {items: items, isError: false, errorMessage: ''});

  return (
    <Wrapper>
      <Title>
        Menage Save Searches
      </Title>
      <Body>
        {
          savedSearches.isError &&
          <Error>
            {savedSearches.errorMessage}
          </Error>
        }
        <div>
          {
            savedSearches.items.map((item, i) => {
              console.log(item);
              return(
                <SaveSearch
                  key={i}
                  name={item.name}
                  // onChange={(newName) => onChange(dispatch, item.id)}
                  onDelete={() => onDelete(dispatch, item.id)}
                  onUpdate={(newName) => onUpdate(dispatch, item.id, newName)}
                />
              )
            })
          }
        </div>
      </Body>
      <Footer>
        <Button variant='success' onClick={() => console.log(savedSearches)}>Save</Button>
      </Footer>
    </Wrapper>
  );
};

export default SavedSearches;