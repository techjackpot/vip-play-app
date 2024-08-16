import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BETSLIPS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
