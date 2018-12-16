import React, { useReducer, useState } from 'react';

import styled from 'styled-components';

import Button from 'react-bootstrap/lib/Button';

import saveSearchReducer from '../Reducers/saveSearchReducer';

import SaveSearch from './SaveSearch';

import { deleteSavedSearch, updateSavedSearch, saveNewSearch } from '../services/savedSearches'


const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    margin-right: 12px;
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

const onSave = (dispatch, newName) => {
  saveNewSearch(newName)
    .then(data => dispatch({ type: 'SAVE', data: data }))
    .catch(err => console.log(err));
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

const SavedSearches = (props) => {
  const [savedSearches, dispatch] = useReducer(saveSearchReducer, {items: props.savedSearches, isError: false, errorMessage: '', errorItemId: -1});
  const [isAddClicked, clickAddButon] = useState(false);
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
        <Button variant='success' onClick={() => clickAddButon(!isAddClicked)}>{!isAddClicked ? 'Add New' : 'Close'}</Button>
        {
          isAddClicked &&
          <SaveSearch
            newSearch
            onChange={onChange}
            onSave={(newName) => onSave(dispatch, newName)}
          />
        }
      </Footer>
    </Wrapper>
  );
};

export default SavedSearches;