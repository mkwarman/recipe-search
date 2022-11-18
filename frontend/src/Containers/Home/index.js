import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { HomeWrapper } from "./styles"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"
import Recipe from "../Recipe"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

function Home(props) {
  const [state, setState] = useState({
    term: "",
    ingredients: ["milk"],
  })

  const fetchSearch = () => {
    props.searchRecipes(state.term, state.ingredients)
  }

  const handleSearch = (event) => {
    const term = event.target.value
    setState({ ...state, term })
  }

  const handleIngredient = (ingredient, event) => {
    const { ingredients } = { ...state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    setState({ ...state, ingredients })
  }

  const loadRecipe = (recipeId) => {
    props.loadRecipe(recipeId)
  }

  const { term, ingredients } = state
  const { recipes, isLoading } = props
  return (
    <HomeWrapper>
      <Input
        autoFocus={true}
        fullWidth={true}
        onChange={handleSearch}
        value={term}
      />
      <div>
        <h3>Ingredients on hand</h3>
        {ingredientList.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox
                checked={ingredients.includes(ingredient)}
                onChange={handleIngredient.bind(this, ingredient)}
                value={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </div>
      <Button onClick={fetchSearch}>search</Button>
      <Divider />
      {recipes && (
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id} onClick={() => loadRecipe(recipe.id)}>
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
      loadRecipe: actions.loadRecipe
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
