
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/lib/Button';
import styled from 'styled-components'

const SearchItem = styled.div`
	margin-bottom: 10px;

	input {
		padding-left: 5px;
	}

	.hasError {
		border: 1px solid red;
	}
`;

const Error = styled.div`
  color: red;
  margin-bottom: 15px;
  font-size: 12px;
`
  
function SaveSearch(props) {
  const { onDelete, onUpdate, onChange, onSave, errorMessage, newSearch } = props;
  const [ name, setName ] = useState(props.name || '');
  
 	useEffect(() => {
    console.log('useEffect');
    setName(props.name);
	}, [props.name]);

	const hasError = !!errorMessage;

	return (
		<div>
			{ !newSearch ?
				<SearchItem>
					<input type='text' value={name} onChange={(e) => {setName(e.target.value); onChange();}} className={`${hasError ? 'hasError' : ''}`} />
					<Button variant='link' onClick={onDelete}>Delete</Button>
					<Button variant='info' onClick={() => onUpdate(name)}>Update</Button>
					{ 
						errorMessage &&
							<Error>
								{errorMessage}
							</Error>
					}
				</SearchItem>
				:
				<SearchItem>
					<input type='text' value={name} onChange={(e) => {setName(e.target.value); onChange();}} className={`${hasError ? 'hasError' : ''}`} />
					<Button variant='info' onClick={() => onSave(name)}>Save</Button>
					{ 
						errorMessage &&
							<Error>
								{errorMessage}
							</Error>
					}
				</SearchItem>
			}
		</div>
	)
};
  
export default SaveSearch;