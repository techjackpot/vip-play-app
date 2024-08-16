import { combineReducers } from 'redux';

import betslips from './betslips';
import matches from './matches';

export const key = 'zensports_kambi';

export default combineReducers({
  betslips,
  matches,
});
