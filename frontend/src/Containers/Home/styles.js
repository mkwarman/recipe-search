import styled from "styled-components"
import { makeStyles } from "@material-ui/core/styles"

export const HomeWrapper = styled.div`
  width: 75vw;
  height: 90vh;
  display: flex;
  flex-flow: column;
  margin: auto;
  padding: 8px;
`

export const useStyles = makeStyles({
  listItem: {
    borderRadius: "5px",
    '&:hover': {
      backgroundColor: "#DDDDDD",
    }
  },
  selected: {
    backgroundColor: "#F0F0F0"
  }
})