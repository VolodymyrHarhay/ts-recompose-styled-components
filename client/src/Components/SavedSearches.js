import React, { useReducer } from 'react';

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
  display: flex;
  flex-direction: column;
  align-items: center;
`

const onSave = (dispatch) => {
  dispatch({ type: 'SAVE' });
};

const onDelete = (dispatch, id) => {
  deleteSavedSearch(id)
    .then(data => dispatch({ type: 'DELETE', items: data }))
    .catch(err => console.log(err));
};

const onUpdate = (dispatch, id, newName ) => {
  updateSavedSearch(id, newName)
    .then(data => dispatch({ type: 'UPDATE', data: data }))
    .catch(err => console.log(err));
};

const deleteSavedSearch = async (id) => {
  const response = await fetch(`/deleteSavedSearch/${id}`, { method: 'DELETE'});
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }

  return body;
};

const updateSavedSearch = async (id, newName) => {
  const response = await fetch(`/updateSavedSearch/${id}`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName
    })
  });
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }

  return body;
};

const SavedSearches = (props) => {
  const [savedSearches, dispatch] = useReducer(saveSearchReducer, {items: props.savedSearches, isError: false, errorMessage: '', errorItemId: -1});
  console.log(savedSearches.items);

  const onChange  = () => {
    dispatch({ type: 'ONCHANGE' });
  }

  return (
    <Wrapper>
      <Title>
        Menage Save Searches
      </Title>
      <Body>
        {
          savedSearches.items.map((item, i) => {
            const hasError = item.id === savedSearches.errorItemId;
            let errorMessage = '';
            if (hasError) {
              errorMessage = savedSearches.errorMessage;
            }
            
            return (
              <SaveSearch
                key={i}
                name={item.name}
                errorMessage={errorMessage}
                onChange={onChange}
                onDelete={() => onDelete(dispatch, item.id)}
                onUpdate={(newName) => onUpdate(dispatch, item.id, newName)}
              />
            )
          })
        }
      </Body>
      <Footer>
        <Button variant='success' onClick={() => console.log(savedSearches)}>Save</Button>
      </Footer>
    </Wrapper>
  );
};

export default SavedSearches;