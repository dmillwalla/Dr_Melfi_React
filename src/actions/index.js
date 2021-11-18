import melfi from "../apis/melfi";
import history from "../history";

import {
  SIGN_IN,
  SIGN_OUT,
  GET_NOTICE_UPDATES,
  GET_SOLICITATION_UPDATES,
  REQUEST_PENDING,
  REQUEST_COMPLETED,
  GET_PREFERENCES,
  GET_ACTORS,
  GET_ACTOR,
  GET_ACTOR_METRICS,
  GET_PSYCHO_METADATA,
  CLEAR_CURRENT_ACTOR,
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

export const getAllActors = () => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await melfi.get(`/get_all_actors`);
  dispatch({ type: GET_ACTORS, payload: response.data });
  dispatch({ type: REQUEST_COMPLETED });
};

export const getActor = (actor_id) => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await melfi.get(
    `/get_characters_details?message=ppl:${actor_id}`
  );
  let payload_obj = { ...response.data };
  payload_obj.id = actor_id;
  console.log("get actor action", response.data);
  dispatch({ type: GET_ACTOR, payload: payload_obj });
  dispatch({ type: REQUEST_COMPLETED });
};

export const clearCurrentActor = () => {
  return { type: CLEAR_CURRENT_ACTOR };
};

export const getActorMetrics = (actor_id) => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await melfi.get(`/get_actor_matrix?message=ppl:${actor_id}`);
  let payload_obj = {};
  payload_obj.id = actor_id;
  payload_obj.metrics = response.data;
  // console.log("get actor action", response.data);
  dispatch({ type: GET_ACTOR_METRICS, payload: payload_obj });
  dispatch({ type: REQUEST_COMPLETED });
};

export const getPsychoMetadata = () => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await melfi.get(`/get_spectrum_metadata`);
  dispatch({ type: GET_PSYCHO_METADATA, payload: response.data });
  dispatch({ type: REQUEST_COMPLETED });
};

export const getNoticeUpdates = (notice_id) => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await melfi.get(`/notice-updates/${notice_id}`);
  dispatch({ type: GET_NOTICE_UPDATES, payload: response.data });
  dispatch({ type: REQUEST_COMPLETED });
};

export const getSolicitationUpdates = () => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await melfi.get(`/solicitation-updates`);
  dispatch({ type: GET_SOLICITATION_UPDATES, payload: response.data });
  dispatch({ type: REQUEST_COMPLETED });
};

export const getPreferences = (pref_id) => async (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  const response = await melfi.get(`/preferences/${pref_id}`);
  dispatch({ type: GET_PREFERENCES, payload: response.data });
  dispatch({ type: REQUEST_COMPLETED });
};
