import { NewsAPI } from '../../API/api';

const FETCHING = 'News/FETCHING',
      TAGS = 'News/Tags',
      AUTHORS = 'News/Authors';

const initialState = {
  fetching: false,
  tags: null,
  authors: null,

};

const newsReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCHING:
      return {...state,
        fetching: action.value
      };

    case TAGS:
      return {...state,
        tags: action.tags
      };
      
    case AUTHORS: 
      return {...state,
        authors: action.authors
      };
      
    default: return state;  
  }
};

// ACTIONS CREATOR
export const updateFetching = (value) => ({type: FETCHING, value});
export const setTags = (tags) => ({type: TAGS, tags});
export const setAuthor = (authors) => ({type: AUTHORS, authors});


// THUNK CREATORS
export const updateTags = (tags, username) => async (dispatch) => {
  await NewsAPI.updateTags(tags, username)
    .then(response => {
      dispatch(setTags(response.tags));
      dispatch(updateFetching(false));
    });
};
export const getTags = (username) => async (dispatch) => {
  await NewsAPI.getTags(username)
    .then(response => {
      dispatch(setTags(response.tags));
    });
};

export default newsReducer;