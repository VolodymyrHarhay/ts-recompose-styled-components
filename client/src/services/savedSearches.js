
export const deleteSavedSearch = async (id) => {
	const response = await fetch(`/deleteSavedSearch/${id}`, { method: 'DELETE'});
	const body = await response.json();

	if (response.status !== 200) {
		throw Error(body.message) 
	}

	return body;
};

export const updateSavedSearch = async (id, newName) => {
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

