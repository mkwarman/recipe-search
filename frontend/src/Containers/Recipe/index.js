import React from "react"
import { connect } from "react-redux"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import LinearProgress from "@material-ui/core/LinearProgress"
import { Typography } from "@material-ui/core"
import { RecipeWrapper, useStyles } from "./styles"


function Recipe(props) {  
  const classes = useStyles()

  const formatIngredients = (ingredients) => {
    return ingredients.map((ingredient, index) =>
      <ListItem className={classes.listItem} key={index}>
        <ListItemText primary={ingredient} />
      </ListItem>)
  }

  // If no recipe has been loaded, do not display anything
  if (!props?.details?.name) return null

  return (
    <RecipeWrapper>
      {props.isLoading && <LinearProgress />}
      <Typography variant="h5" gutterBottom>{props.details.name}</Typography>
      <Typography variant="h6" gutterBottom>Ingredients:</Typography>
      <List>{formatIngredients(props.details.ingredients)}</List>
      <Typography variant="h6" gutterBottom>Instructions:</Typography>
      <Typography variant="body1" gutterBottom>{props.details.instructions}</Typography>
    </RecipeWrapper>
  )
}

const mapStateToProps = (state) => {
  const { recipe } = state
  return { ...recipe }
}

export default connect(mapStateToProps)(Recipe)