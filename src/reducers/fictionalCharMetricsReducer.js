import { GET_ACTOR_METRICS } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_ACTOR_METRICS:
      //   console.log("get actor reducer", action.payload);
      return { ...state, [action.payload.id]: action.payload.metrics };
    default:
      return state;
  }
};
