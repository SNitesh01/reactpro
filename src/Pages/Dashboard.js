import React, { useEffect, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import {
  Button,
  ButtonGroup,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  //TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { http } from "../Config/Http_api";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { sorting } from "../Utils/Sorting";
import { useNavigate } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const Dashboard = () => {
  const classes = useStyles();
  const navigator = useNavigate();

  //let api_base_url = process.env.REACT_APP_PRODUCTS_URI;
  //console.log(api_base_url,'env')

  const [products, setProducts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [refresh, setRefresh] = useState();

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [sortDataType, setSortDataType] = useState("number","boolean");





  useEffect(() => {
    // setProducts(api_base_url)
    http("products").then((res) => {
      setProducts(res.data);
    });
  }, [refresh]);
  //console.log(Products)

  //delete handler
  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        http
          .delete(`products/${id}`)
          .then((res) => {
            if (res.status === 200) {
              //alert('deleted');
              setRefresh(!refresh);
            }
          })
          .catch((err) => {
            swal.fire("Oops", "Something went wrong", "error");
          });
      }
    });
  };

  //pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //sorting
    products && sorting(products, sortBy, sortDataType, sortOrder);

    //sorting handler
    const handleSort = (col, type) => {
      if (!(sortBy === col)) {
        setSortOrder(1);
        setSortBy(col);
        setSortDataType(type);
      } else {
        setSortOrder(sortOrder === 1 ? -1 : 1);
        setSortBy(col);
        setSortDataType(type);
      }
    };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={() => handleSort("name", "string")} >Products Name</StyledTableCell>
              <StyledTableCell onClick={() => handleSort("price", "number")} align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell onClick={() => handleSort("inStock", "boolean")} align="center">In stock</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <StyledTableRow key={product.name}>
                  <StyledTableCell component="th" scope="row">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                    <Button onClick={() => navigator(`product/${product._id}`)}>
                       Edit
                    </Button>

                      <Button>Add to cart</Button>
                      <Button onClick={() => HandleDelete(product._id)}>
                        delete
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
     
    </div>
  );
};
