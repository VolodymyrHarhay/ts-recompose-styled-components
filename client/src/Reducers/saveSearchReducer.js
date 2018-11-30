
import { List, fromJS } from 'immutable';

const saveSearchReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE':
    {
      const items = List(state.items);
      if (items.includes(state.inputValue)) {
        return {...state, isError: true, errorMessage: 'Such Save Search is already exist.'};
      }
      else {
        const modifiedItems = items.push(state.inputValue);
        return {...state, items: modifiedItems, isError: false, errorMessage: ''};
      }
    }

    case 'DELETE':
    {
      let items = fromJS(state.items);
      const index = items.findIndex(listItem => {
        return listItem.get('id') === action.id;
      });
      items = items.delete(index); 
      return {...state, items: items.toJS(), inputValue: action.value, isError: false, errorMessage: ''};
    }

    case 'UPDATE':
    {
      let items = fromJS(state.items);
      const index = items.findIndex(listItem => {
        return listItem.get('id') === action.id;
      });
      items = items.update(index, (item) => item.set('name', action.newName)); 
      return {...state, items: items.toJS(), inputValue: action.value, isError: false, errorMessage: ''};
    }

    default: {
      return state;
    }
  }
}

export default saveSearchReducer;