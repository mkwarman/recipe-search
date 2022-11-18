import {GET_RECIPE, RECEIVE_RECIPE, FAIL_RECIPE, CLEAR_RECIPE} from "../actions"

const initialState = {
  details: {},
  isLoading: false,
  error: null,
}

const recipeFetching = (state) => {
  return { ...state, isLoading: true }
}

const recipeFetched = (state, payload) => {
  return { ...state, isLoading: false, details: payload }
}

const recipeFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

const recipeClear = (state) => {
  return { ...state, details: {} }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE:
      return recipeFetching(state)
    case RECEIVE_RECIPE:
      return recipeFetched(state, payload)
    case FAIL_RECIPE:
      return recipeFailed(state, payload)
    case CLEAR_RECIPE:
      return recipeClear(state)
    default:
      return state
  }
}