import { GET_ACTOR, GET_ACTORS, CLEAR_CURRENT_ACTOR } from "../actions/types";

const INITIAL_STATE = { actors: null, current_actor: null };

function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTOR:
      console.log("get actor reducer", action.payload);
      return { ...state, current_actor: action.payload };
    case GET_ACTORS:
      const all_actors_dict = swap(action.payload);
      return { ...state, actors: all_actors_dict };
    case CLEAR_CURRENT_ACTOR:
      return { ...state, current_actor: null };
    default:
      return state;
  }
};
