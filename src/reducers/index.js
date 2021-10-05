import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import noticesReducer from "./noticesReducer";
import requestReducer from "./requestReducer";
import solicitationReducer from "./solicitationReducer";
import preferencesReducer from "./preferencesReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
  notices: noticesReducer,
  requestStatus: requestReducer,
  solicitations: solicitationReducer,
  preferences: preferencesReducer,
});
