import { Request, Response } from "express"
import { RecipeModel, Recipe, Ingredient } from "../models"


const formatIngredients = (ingredients: Ingredient[]): string[] => {
  return ingredients.map(ingredient => `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`)
}

const formatRecipe = (recipe: Recipe): {name: string, instructions: string, ingredients: string[]} => {
  const { name, instructions, ingredients } = recipe
  return { name, instructions, ingredients: formatIngredients(ingredients)}
}

export const recipeMiddleware = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const recipeId = req.params.id

  if (!recipeId) {
    res.status(400).send({"error": "recipeId is required"})
    return
  }

  let foundRecipe = null
  try {
    foundRecipe = await RecipeModel.findById(recipeId)
  } catch (e) {
    console.error(e)
    res.status(500).send({"error": "An unexpected error has occured, please try again later"})
    return
  }

  if (!foundRecipe) {
    res.status(404).send({"error": "Recipe not found"})
    return
  }

  res.send(formatRecipe(foundRecipe))
}
