import { HOME_ACTIONS } from './actions';

const INITIAL_STATE = {
  searchAndFilter: {
    tags: [],
    searchString: '',
    active: false
  }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HOME_ACTIONS.SEARCH_FOR_KEY:
      return {
        ...state,
        searchAndFilter: {
          ...state.searchAndFilter,
          searchString: action.payload.searchString
        }
      };

    case HOME_ACTIONS.SET_TAGS:
      return {
        ...state,
        searchAndFilter: {
          ...state.searchAndFilter,
          tags: action.payload.tags
        }
      };

    case HOME_ACTIONS.SET_SEARCH_AND_FILTER:
      return {
        ...state,
        searchAndFilter: {
          ...state.searchAndFilter,
          active: action.payload.active
        }
      };

    default:
      return state;
  }
};

export default reducer;
