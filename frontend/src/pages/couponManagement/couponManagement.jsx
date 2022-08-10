import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import SideBar from "../../components/sideBar/sideBar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CouponManagement() {
  const [couponName, SetCouponName] = useState("");
  const [discount, setDiscount] = useState("");
  const [showCoupon, setShowCoupon] = useState([]);
  const [AddRender, setAddRender] = useState(false);
  const [dltRender, setDltRender] = useState(false);
  const [SnackMessage, SetSnackMessage] = useState("");
  const [CouponCode, SetCouponCode] = useState("");
  const [deleteId, setDeleteId] = useState("");

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const deleteData = (id) => {
    setDeleteId(id);
    setOpenModal(true);
  };
  //

  // snackbar

  const [state, setState] = React.useState(false);

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState(false);
  };

  //

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios
        .post(`http://localhost:5000/api/admin/couponManagement`, {
          couponName,
          discount,
          CouponCode,
        })
        .then((res) => {
          // console.log(res);
          SetSnackMessage(res.data.message);
        });
      setAddRender(true);
      setState(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoupon = () => {
    try {
      axios.get("http://localhost:5000/api/admin/getCoupon").then((res) => {
        // console.log(res);
        setShowCoupon(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    console.log(id);

    try {
      axios.post(`http://localhost:5000/api/admin/deleteCoupon/${deleteId}`).then((res) => {
        // console.log(res.data.message);
        SetSnackMessage(res.data.message);
      });
      setDltRender(true);
      setState(true);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoupon();
  }, [AddRender, dltRender]);

  return (
    <div>
      <SideBar />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            textAlign="center"
            component="h2"
          >
            Are you sure want to Delete
          </Typography>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={() => setOpenModal(false)}>No</Button>
          </Box>
        </Box>
      </Modal>

      {/* SnackBar */}
      <Snackbar
        open={state}
        onClose={handleClose}
        message={SnackMessage}
        key={vertical + horizontal}
      />
      {/*  */}

      <Box sx={{ paddingLeft: 35, justifyContent: "center" }}>
        <Box sx={{ marginLeft: 10 }}>
          <Typography
            variant="h4"
            component="h6"
            fontFamily="egoe UI"
            style={{fontWeight:"bold"}} 
          >
            Coupon Management
          </Typography>

          <Box mt={3} ml={3} sx={{ width: 500 }} marginLeft={50}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Coupon Name"
                variant="outlined"
                sx={{ width: "90%" }}
                onChange={(e) => SetCouponName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Coupon Code"
                variant="outlined"
                sx={{ width: "90%", mt: 2 }}
                onChange={(e) => SetCouponCode(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Discount Amount"
                variant="outlined"
                sx={{ width: "90%", mt: 2 }}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <Button
                style={{ marginLeft: 130, marginTop: 20 }}
                variant="contained"
                type="submit"
                color="success"
              >
                Add Coupon
              </Button>
            </form>
          </Box>
        </Box>

        <Box sx={{ width: 600, marginLeft: 10 }} marginTop={10} marginBottom={10}>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Coupon Name</TableCell>
                  <TableCell align="center">Discount Amount</TableCell>
                  <TableCell align="center">Apply Code</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showCoupon.map((Obj, index) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell component="th" scope="row">
                        {Obj.couponName}
                      </TableCell>
                      <TableCell align="center">$ {Obj.discount}</TableCell>
                      <TableCell align="center">{Obj.CouponCode}</TableCell>
                      <TableCell align="center">
                        <Button
                          style={{ color: "red" }}
                          onClick={() => deleteData(`${Obj._id}`)}
                        >
                        <DeleteIcon />{" "}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}

export default CouponManagement;
