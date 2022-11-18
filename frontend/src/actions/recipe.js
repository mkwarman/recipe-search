export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"
export const CLEAR_RECIPE = "CLEAR_RECIPE"


const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
})

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
})

const clearingRecipe = () => ({
  type: CLEAR_RECIPE,
})

export const executeLoadRecipe = async (recipeId) => {
  const response = await fetch(`/api/recipe/${recipeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const recipeResults = await response.json()
  return recipeResults
}

export const loadRecipe = (recipeId) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return executeLoadRecipe(recipeId)
    .then((res) => dispatch(fetchedRecipe(res)))
    .catch((err) => dispatch(failedRecipe(err)))
  }
}

export const clearRecipe = () => {
  return (dispatch) => dispatch(clearingRecipe())
}