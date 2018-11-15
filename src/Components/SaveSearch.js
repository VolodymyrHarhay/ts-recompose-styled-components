
import React, { useState } from 'react';
import Button from 'react-bootstrap/lib/Button';
import styled from 'styled-components'

const SearchItem = styled.div`
	color: red;
	margin-bottom: 10px;
`;
  
const SaveSearch = (props) => {
	const { onDelete, onUpdate } = props;
	const [ name, setName ] = useState(props.name)

	return (
		<SearchItem>
			<input type='text' value={name} onChange={(e) => { setName(e.currentTarget.value); }}/>
			<Button variant='link' onClick={onDelete}>Delete</Button>
			<Button variant='info' onClick={() => onUpdate(name)}>Update</Button>
		</SearchItem>
	)
};
  
export default SaveSearch;