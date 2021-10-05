import streams from "../apis/streams";
import notices from "../apis/notices";
import history from "../history";

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
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

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  dispatch({ type: REQUEST_COMPLETED });
  history.push("/");
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
