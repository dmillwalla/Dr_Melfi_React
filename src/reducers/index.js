import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import noticesReducer from "./noticesReducer";
import requestReducer from "./requestReducer";
import solicitationReducer from "./solicitationReducer";
import preferencesReducer from "./preferencesReducer";

export default combineReducers({
  auth: authReducer,
  notices: noticesReducer,
  requestStatus: requestReducer,
  solicitations: solicitationReducer,
  preferences: preferencesReducer,
});
