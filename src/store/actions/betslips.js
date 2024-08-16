import * as actionTypes from 'store/actionTypes';

export const loadBetslipsAction = (betslips) => (dispatch) => {
  dispatch({
    type: actionTypes.LOAD_BETSLIPS,
    payload: betslips,
  });
};
