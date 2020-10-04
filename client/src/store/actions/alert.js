import * as actionType from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4();
  dispatch({ type: actionType.SET_ALERT, payload: { msg, alertType, id } });
  setTimeout(
    () => dispatch({ type: actionType.REMOVE_ALERT, payload: id }),
    1000
  );
};
