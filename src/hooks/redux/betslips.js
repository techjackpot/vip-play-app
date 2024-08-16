import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  loadBetslipsAction,
} from 'store/actions/betslips';

export const useLoadBetslipsDispatch = () => {
  const dispatch = useDispatch();
  return (data) => dispatch(loadBetslipsAction(data));
};

export const useBetslips = () => useSelector(({ betslips: {list} }) => list);
