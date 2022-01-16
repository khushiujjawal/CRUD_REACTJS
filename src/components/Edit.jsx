import React from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  heading: {
    backgroundColor: deepPurple[500],
    color: "White",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
});

const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("back to home");
    navigate("/");
  };

  const [student, setStudent] = useState({
    stname: "",
    email: "",
  });
  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3333/students/${id}`);
        // console.log(student.data);
        setStudent(student.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStudent();
  }, [id]);
  async function onSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3333/students/${id}`, student);
      navigate("/");
    } catch (err) {
      console.log("Something went wrong");
    }
  }
  function onFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  autoFocus
                  value={id}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="stuname"
                  name="stname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  value={student.stname}
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
                  value={student.email}
                  onChange={(e) => onFieldChange(e)}
                ></TextField>
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onSubmit(e)}
              >
                UPDATE
              </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              BACK TO HOME
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;
