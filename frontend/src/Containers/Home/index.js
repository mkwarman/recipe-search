import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { HomeWrapper, useStyles } from "./styles"
import TextField from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import * as actions from "../../actions"
import Recipe from "../Recipe"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]
const initialState = {
  term: "",
  ingredients: ["milk"],
  selectedRecipeId: null,
}

function Home(props) {
  const [state, setState] = useState(initialState)
  const [searchParams, setSearchParams] = useSearchParams()
  const classes = useStyles()

  // Check for query params on load to persist state on refresh
  useEffect(() =>{
    if (Array.from(searchParams.keys()).length < 1) return

    const loadedParams = {
      term: searchParams.get("query") ?? initialState.term,
      ingredients: searchParams.get("ingredients").split(",") ?? initialState.ingredients,
      selectedRecipeId: searchParams.get("recipeId") ?? initialState.selectedRecipeId,
    }

    // Update the state with loaded info
    setState(loadedParams);

    // Automatically trigger search with loaded info if present
    if (loadedParams.term && loadedParams.ingredients) {
      props.searchRecipes(loadedParams.term, loadedParams.ingredients)
    }
  }, [])

  // Load data into query params whenever they are updated
  useEffect(() => {
    const params = {}

    if (state.term) params.query = state.term
    if (state.ingredients) params.ingredients = state.ingredients.join(",")
    if (state.selectedRecipeId) params.recipeId = state.selectedRecipeId

    setSearchParams(params)
  }, [state])

  // Automatically load recipe whenever the selected recipe changes
  useEffect(() => {
    if (!state.selectedRecipeId) return

    props.loadRecipe(state.selectedRecipeId)
  }, [state.selectedRecipeId])

  const handleSearchClick = () => {
    setState({...state, selectedRecipeId: null})
    props.clearRecipe()
    props.searchRecipes(state.term, state.ingredients)
  }

  const handleQueryChange = (event) => {
    const term = event.target.value
    setState({ ...state, term })
  }

  const handleIngredientChange = (ingredient, event) => {
    const { ingredients } = { ...state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    setState({ ...state, ingredients })
  }

  const handleRecipeClick = (recipeId) => {
    setState({ ...state, selectedRecipeId: recipeId })
  }

  const { recipes, isLoading } = props
  return (
    <HomeWrapper>
      <TextField
        autoFocus={true}
        fullWidth={true}
        onChange={handleQueryChange}
        value={state.term}
        placeholder="Enter search terms here"
      />
      <div>
        <Typography variant="subtitle1">Ingredients on hand:</Typography>
        {ingredientList.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox
                checked={state.ingredients.includes(ingredient)}
                onChange={(event) => handleIngredientChange(ingredient, event)}
                value={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </div>
      <Button onClick={handleSearchClick}>search</Button>
      <Divider />
      {recipes && (
        <List>
          {recipes.map((recipe) => (
            <ListItem
              className={`${classes.listItem} ${recipe.id === state.selectedRecipeId ? classes.selected : null}`}
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      )}
      {isLoading && <LinearProgress />}
      <Divider />
      <Recipe></Recipe>
    </HomeWrapper>
  )
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      loadRecipe: actions.loadRecipe,
      clearRecipe: actions.clearRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
