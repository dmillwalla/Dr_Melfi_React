import notices from "../apis/notices";
import history from "../history";

import {
  SIGN_IN,
  SIGN_OUT,
  GET_NOTICE_UPDATES,
  GET_SOLICITATION_UPDATES,
  REQUEST_PENDING,
  REQUEST_COMPLETED,
  GET_PREFERENCES,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const getNoticeUpdates = (notice_id) => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await notices.get(`/notice-updates/${notice_id}`);
  dispatch({ type: GET_NOTICE_UPDATES, payload: response.data });
  dispatch({ type: REQUEST_COMPLETED });
};

export const getSolicitationUpdates = () => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await notices.get(`/solicitation-updates`);
  dispatch({ type: GET_SOLICITATION_UPDATES, payload: response.data });
  dispatch({ type: REQUEST_COMPLETED });
};

export const getPreferences = (pref_id) => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await notices.get(`/preferences/${pref_id}`);
  dispatch({ type: GET_PREFERENCES, payload: response.data });
  dispatch({ type: REQUEST_COMPLETED });
};
