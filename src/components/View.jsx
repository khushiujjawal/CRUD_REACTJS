import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
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
const View = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [student, setStudent] = useState([]);
  async function getStudent() {
    try {
      const students = await axios.get(`http://localhost:3333/students/${id}`);
      setStudent(students.data);
    } catch (err) {
      console.log("Something Went Wrong");
    }
  }

  useEffect(() => {
    getStudent();
  }, [id]);
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("back to home");
    navigate("/");
  };

  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Student Detail</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.stname}</TableCell>
              <TableCell align="center">{student.email}</TableCell>
              <TableCell align="center">
                <Tooltip title="View">
                  <IconButton>
                    <Link to={`/view/`}>
                      <VisibilityIcon color="primary" />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton>
                    <Link to={`/edit`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};

export default View;
