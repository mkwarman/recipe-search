import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

function Recipe(props) {
  return (<h1>Recipe</h1>)
}

const mapStateToProps = (state) => {
  const { recipe } = state
  return { ...recipe }
}

export default connect(mapStateToProps)(Recipe)