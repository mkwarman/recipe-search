import React from "react"
import { connect } from "react-redux"

function Recipe(props) {  
  const formatIngredients = (ingredients) => {
    return ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
  }

  // If no recipe has been loaded, do not display anything
  if (!props?.details?.name) return null

  return (<>
    <h2>{props.details.name}</h2>
    <h3>Ingredients:</h3>
    <ul>{formatIngredients(props.details.ingredients)}</ul>
    <h3>Instructions:</h3>
    <div>{props.details.instructions}</div>
  </>)
}

const mapStateToProps = (state) => {
  const { recipe } = state
  return { ...recipe }
}

export default connect(mapStateToProps)(Recipe)