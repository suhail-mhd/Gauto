import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import SideBar from "../../components/sideBar/sideBar";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { TextareaAutosize, TextField } from "@mui/material";
// import Loading from '../../Components/Loading/Loading';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../Firebase/Firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styleOne = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CarManagement() {
  const [adminCar, adminCarManagement] = useState([]);
  const navigate = useNavigate();
  const loc = localStorage.getItem("Admin");
  const [deleteId, setDeleteId] = useState();
  const [render, setRender] = useState(false);
  const edit = useParams();
  const [carEditData, SetCarEditData] = useState({});
  const [updateid, setupdateId] = useState();
  // // const [loading,setloading] =useState(false)
  //

  // console.log(carEditData);

  //states of field
  const [brand, SetBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, SetDescription] = useState("");
  const [fueltype, setFuelType] = useState("");
  const [location, SetLocation] = useState("");
  const [mileage, SetMileage] = useState("");
  const [price, SetPrice] = useState("");
  const [RegNo, SetRegNo] = useState("");
  const [register, SetRegister] = useState("");
  const [seats, SetSeat] = useState("");
  const [url, SetUrl] = useState("");
  const [img, setImg] = useState();
  const [id, setId] = useState();
  const [image, setImage] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [deletImgName, setDltImgName] = useState("");
  const [LongDescription, setLongDescription] = useState("");
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // console.log(imgUrl);

  // console.log(img);
  // console.log(deletImgName);
  //modal
  const [open, setOpen] = React.useState(false);

  // edit modal handle
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenEdit = () => setOpenModal(true);
  const handleCloseEdit = () => setOpenModal(false);

  // delete modal handle
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dtlFun = (id, imgName) => {
    // console.log(id);
    setDltImgName(imgName);
    // console.log(imgName);
    setDeleteId(id);
    handleOpen();
  };

  // getting data
  const carManagement = async () => {
    try {
      const data = await axios
        .get("http://localhost:5000/api/user/getcarData")
        .then((res) => {
          adminCarManagement(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //deleting data
  const DeleteCar = async () => {
    //  console.log(deleteId);
    if (deletImgName) {
      const desertRef = ref(storage, `carImages/${deletImgName}`);

      deleteObject(desertRef)
        .then((res) => {
          console.log("deleted succesfully", res);
        })
        .catch((error) => {
          console.log("error occures ", error);
        });
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios.post(
        "http://localhost:5000/api/admin/deletecar",
        { deleteId },
        config
      );

      handleClose();
      setRender(true);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  // cardetailsgettingAPI

  const getCarDetails = async (id) => {
    setupdateId(id);
    handleOpenEdit();
    // console.log(id);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios
        .get(`http://localhost:5000/api/admin/getallcardetails/${id}`)
        .then((res) => {
          // console.log(res.data.brand);
          SetBrand(res.data.brand);
          setFuelType(res.data.fueltype);
          setModel(res.data.model);
          SetLocation(res.data.location);
          SetMileage(res.data.mileage);
          SetPrice(res.data.price);
          SetRegNo(res.data.RegNo);
          SetSeat(res.data.seats);
          SetUrl(res.data.url);
          SetDescription(res.data.description);
          SetRegister(res.data.register);
          setImage(res.data.imgUrl);
          setId(res.data._id);
          setLongDescription(res.data.Longdescription);
          setLattitude(res.data.latitude);
          setLongitude(res.data.longitude);
          // SetCarEditData(res.data)
        });
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = await axios
        .patch(
          "http://localhost:5000/api/admin/updatecardata",
          {
            id,
            brand,
            model,
            fueltype,
            RegNo,
            price,
            seats,
            location,
            mileage,
            register,
            description,
            imgUrl,
            url,
            LongDescription,
            lattitude,
            longitude,
          },
          config
        )
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const imgUpload = (e) => {
    e.preventDefault();
    //   setloading(false)
    // console.log(img);
    if (!img) return;
    const sotrageRef = ref(storage, `carImages/${img.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
    //   setloading(false)
  };

  // console.log(carEditData);

  useEffect(() => {
    if (loc) {
      navigate("/admin/carManagement");
    } else {
      navigate("/admin");
    }
    // console.log("Admin Car management");
    carManagement();
  }, [render]);

  return (
    <div>
      <SideBar />
      {/*  delete  Modal  start */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            textAlign="center"
            variant="h6"
            component="h2"
          >
            Are You Sure Want to Delete
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <div>
              <Button variant="contained" onClick={DeleteCar}>
                Yes
              </Button>
            </div>
            <div>
              <Button variant="contained" onClick={handleClose}>
                NO
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      23
      {/* modal end */}
      {/* Edit modal start */}
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={openModal}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleOne}>
          <form onSubmit={formSubmit} encType="multipart/form-data">
            <Box>
              <Typography gutterBottom variant="h6" component="div">
                Update Field
              </Typography>

              <Grid container>
                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />

                  <TextField
                    label="Brand Name"
                    placeholder="Enter Name"
                    type="text"
                    name="brand"
                    value={brand}
                    onChange={(e) => SetBrand(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Model"
                    placeholder="Enter Model"
                    type="text"
                    name="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Fuel Type"
                    placeholder="Petrol/Diesel"
                    type="text"
                    name="fueltype"
                    value={fueltype}
                    onChange={(e) => setFuelType(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Register Number"
                    placeholder="Enter Register No"
                    type="text"
                    value={RegNo}
                    name="RegNo"
                    onChange={(e) => SetRegNo(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Price/day"
                    placeholder="Enter Amount"
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => SetPrice(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="No of seats"
                    placeholder="Enter no of seats"
                    type="number"
                    name="seats"
                    value={seats}
                    onChange={(e) => SetSeat(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Pickup Location"
                    placeholder="Enter Pickup Location"
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => SetLocation(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Mileage"
                    placeholder="Enter Mileage in liter"
                    type="number"
                    name="mileage"
                    value={mileage}
                    onChange={(e) => SetMileage(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Lattitude"
                    placeholder="Enter Lattitude of location"
                    type="number"
                    name="latitude"
                    value={lattitude}
                    onChange={(e) => setLattitude(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Longitude"
                    placeholder="Enter Longitude of location"
                    type="number"
                    name="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Car Registration Date"
                    placeholder="Enter registration details"
                    type="text"
                    name="register"
                    value={register}
                    onChange={(e) => SetRegister(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextareaAutosize
                    maxRows={4}
                    label="Description"
                    placeholder="Enter Description about car"
                    type="text"
                    name="description"
                    value={description}
                    style={{ width: 240, height: 70 }}
                    onChange={(e) => SetDescription(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Aditional Details"
                    placeholder="Optional"
                    value="none"
                    type="text"
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextField
                    label="Image Url"
                    placeholder="Enter Car image Url"
                    type="url"
                    name="url"
                    value={url}
                    onChange={(e) => SetUrl(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <br />
                  <TextareaAutosize
                    style={{ height: 100, width: 260 }}
                    maxRows={4}
                    label="Long Description"
                    placeholder="Enter Long Description"
                    type="text"
                    name="Longdescription"
                    value={LongDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={4} marginTop={2}>
                  <div style={{ display: "flex" }}>
                    <input
                      type="file"
                      name={imgUrl}
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                    <input type="submit" value="Upload" onClick={imgUpload} />
                  </div>
                  {progress ? <h4>Image uploaded:{progress}%</h4> : null}
                </Grid>
              </Grid>

              <div style={{ justifyContent: "end", display: "flex" }}>
                <input
                  type="submit"
                  value="submit"
                  style={{ width: 100, height: 50 }}
                />
              </div>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* modal edn */}
      <Box sx={{ flexGrow: 1, paddingLeft: 40 }}>
        <div style={{ justifyContent: "end" }}>
          <Link to="/admin/addcars">
            <Button variant="contained">ADD CAR</Button>
          </Link>
        </div>
        <Grid container spacing={4} mt={5}>
          {adminCar.map((obj, index) => {
            return (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{ height: 450 }}
                  key={index}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    style={{ height: 300, objectFit: "contain" }}
                    image={obj.imgUrl}
                    alt={obj.Url}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {obj.brand} {obj.model}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="medium"
                      variant="contained"
                      onClick={() => getCarDetails(`${obj._id}`)}
                    >
                      Edit
                      <EditOutlinedIcon />
                    </Button>
                    <Button
                      size="medium"
                      color="error"
                      variant="contained"
                      onClick={() => dtlFun(`${obj._id}`, `${obj.imgName}`)}
                    >
                      Delete
                      <DeleteIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default CarManagement;
