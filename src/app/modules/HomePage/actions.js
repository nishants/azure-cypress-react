export const HOME_ACTIONS = {
  SEARCH_FOR_KEY: 'HOME_ACTIONS/SEARCH_FOR_KEY',
  SET_TAGS: 'HOME_ACTIONS/SET_TAGS',
  SET_SEARCH_AND_FILTER: 'HOME_ACTIONS/SET_SEARCH_AND_FILTER'
};

export const searchForKey = searchString => ({
  type: HOME_ACTIONS.SEARCH_FOR_KEY,
  payload: { searchString }
});

export const setTags = tags => ({
  type: HOME_ACTIONS.SET_TAGS,
  payload: { tags }
});

export const setSearchAndFilter = active => ({
  type: HOME_ACTIONS.SET_SEARCH_AND_FILTER,
  payload: { active }
});
