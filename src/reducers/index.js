import { combineReducers } from "redux";

import actorsReducer from "./actorsReducer";
import requestReducer from "./requestReducer";
import fictionalCharMetricsReducer from "./fictionalCharMetricsReducer";
import psychometricsReducer from "./psychometricsReducer";

export default combineReducers({
  requestStatus: requestReducer,
  actors: actorsReducer,
  movies: null,
  fictionalCharMetrics: fictionalCharMetricsReducer,
  psychometricsMetadata: psychometricsReducer,
});
