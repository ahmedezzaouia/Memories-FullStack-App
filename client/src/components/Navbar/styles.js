import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 620px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    flexDirection: "row",
    "@media (max-width: 620px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-around",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
