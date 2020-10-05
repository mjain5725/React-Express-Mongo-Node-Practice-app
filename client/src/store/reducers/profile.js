import * as actionType from '../actions/types';

const initialState = {
  profile: null,
  proiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionType.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case actionType.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionType.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
