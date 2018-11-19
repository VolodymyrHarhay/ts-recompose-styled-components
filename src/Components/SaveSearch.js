
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/lib/Button';
import styled from 'styled-components'

const SearchItem = styled.div`
	color: red;
	margin-bottom: 10px;
`;
  
function SaveSearch(props) {
	const { onDelete, onUpdate } = props;
	const [ name, setName ] = useState(props.name);

	useEffect(() => {
		setName(props.name);
	}, [props.name]);

	return (
		<SearchItem>
			<input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
			<Button variant='link' onClick={onDelete}>Delete</Button>
			<Button variant='info' onClick={() => onUpdate(name)}>Update</Button>
		</SearchItem>
	)
};
  
export default SaveSearch;