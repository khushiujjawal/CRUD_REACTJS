import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";
import List from "./List";
import axios from "axios";
import { useState } from "react";

const useStyles = makeStyles({
  heading: {
    backgroundColor: deepPurple[500],
    color: "White",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
});

export default function Home() {
  const classes = useStyles();
  const [status, setStatus] = useState();
  const [student, setStudents] = useState({
    stname: "",
    email: "",
  });

  function onFieldChange(e) {
    setStudents({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3333/students`, student);
      setStatus(true);
    } catch (err) {
      console.log("Something went wrong");
    }
  }

  if (status) {
    return <Home />;
  }

  return (
    <>
      <Box textAlign="center" className={classes.heading} p={2} mb={2}>
        <Typography variant="h2">React Crud With API Call</Typography>
      </Box>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4"> Add Students </Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  onChange={(e) => onFieldChange(e)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => onFieldChange(e)}
                ></TextField>
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onSubmit(e)}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        <Grid item md={6} xs={12}>
          <List />
        </Grid>
      </Grid>
    </>
  );
}
