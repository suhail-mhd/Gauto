import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, TextField } from "@mui/material";
// import './card.css'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popper from "@mui/material/Popper";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import District from "../DistrictSelecting/District";
import { useSelector } from "react-redux";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  textAlign: "center",
  fontSize: 30,
  fontFamily: "revert",
}));

function Cards() {
  const [visible, setVisible] = useState(4);
  const [carsData, setCarsData] = useState([]);
  const [render, Setrender] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [lowtohighdata, setLowToHighData] = useState([]);
  const [hightolowdata, setHighToLowData] = useState([]);
  const [HighToLow, SetHighToLow] = useState(false);
  const [LowToHigh, SetLowToHigh] = useState(false);
  const [SearchData, SetSearchData] = useState(false);
  // console.log(carsData);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const userInfo = localStorage.getItem("userInfo");
  const value = JSON.parse(userInfo);
    const DistrictSort = useSelector((state) => state.DisSort);

  const Datas = () => {
    if (userInfo) {
      setUserId(value._id);
    }
  };

  const showMoreItem = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const showLessItem = () => {
    setVisible((prevValue) => prevValue - 4);
  };

  const navigate = useNavigate();

  const GetCars = async () => {
    const data = await axios
      .get("http://localhost:5000/api/user/getcarData")
      .then((res) => {
        // console.log(res.data.data)

        setCarsData(res.data.data);
        Setrender(true);
      });

    // console.log(data);
  };

  //offer area

  // const offerData = () => {
  //   try {
  //       axios.get
  //   } catch (error) {

  //   }
  // }

  //

  const handleSearch = () => {
    // console.log(searchText);

    try {
      axios
        .post("http://localhost:5000/api/user/search", { searchText })
        .then((res) => {
          // console.log(res.data.data);
          setSearchData(res.data.data);
        });
      SetSearchData(true);
    } catch (error) {
      console.log("error occurred while searching", error);
    }
  };

  const lowtohigh = () => {
    try {
      axios.get("http://localhost:5000/api/user/lowtohigh").then((res) => {
        // console.log(res);
        setLowToHighData(res.data.sort);
      });
      SetLowToHigh(true);
      SetHighToLow(false);
    } catch (error) {
      console.log("error occurred while sorting", error);
    }
  };

  const hightolow = () => {
    try {
      axios.get("http://localhost:5000/api/user/hightolow").then((res) => {
        //  console.log(res);
        setHighToLowData(res.data.sorttwo);
      });
      SetHighToLow(true);
      SetLowToHigh(false);
    } catch (error) {}
  };

  const handleSearchClear = () => {
    // console.log("clearing");
    SetSearchData(false);
    setSearchText("");
  };



  useEffect(() => {
    GetCars();
    Datas();
  }, [render]);

  return (
    <div>
      {/* <Div>{"Choose your car."}</Div> */}
      <br />

      <Container>
        <Grid container spacing={4} style={{ margin: "auto" }}>
          <Grid
            item
            sm={12}
            xs={12}
            md={6}
            lg={4}
            xl={4}
            style={{ display: "flex" }}
          >
            <span className=" d-flex align-items-center gap-2">
              <i class="ri-sort-asc"></i> Sort By
            </span>
            <Box sx={{ marginTop: 1 }}>
              <Button
                aria-describedby={id}
                type="button"
                style={{ marginLeft: 20, marginTop: 1 }}
                onClick={handleClick}
              >
                Price
              </Button>
              <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: "white" }}>
                  <Button onClick={lowtohigh}>Price--Low to high</Button>
                  <br />
                  <Button onClick={hightolow}>Price--High to low</Button>
                </Box>
              </Popper>
            </Box>
          </Grid>

          <Grid sm={12} xs={12} md={6} lg={4} xl={4}>
            
            <Box sx={{ marginTop: 1, marginLeft: 4, maxWidth: 400 }}>
              <District />
            </Box>
          </Grid>

          <Grid></Grid>

          <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
            <Box sx={{ display: "flex" }}>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Search Cars"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputProps={{
                    style: { height: 50 },
                    endAdornment: (
                      <CloseIcon
                        onClick={handleSearchClear}
                        style={{ cursor: "pointer" }}
                      ></CloseIcon>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ marginLeft: 2 }}>
                <Button
                  variant="contained"
                  sx={{ marginTop: 1 }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <br />
      <Container maxWidth="xl">
        {SearchData ? (
          <Grid container>
            {searchData.slice(0, visible).map((obj, index) => {
              return (
                <Grid item xl={3} lg={4} md={4} sm={6} xs={12} key={index}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{
                      margin: 15,
                      Height: "auto",
                      position: "relative",
                      minHeight: 600,
                    }}
                    className="card"
                  >
                    <CardMedia
                      component="img"
                      alt="cars"
                      height="140"
                      style={{ height: 300, objectFit: "contain" }}
                      key={index}
                      image={obj.imgUrl}
                    />
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {obj.brand} {obj.model}
                          {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}   /> */}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                          ${obj.price}/day
                        </Typography>
                      </div>
                      {obj.OfferStatus ? (
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            gutterBottom
                            variant="BUTTON TEXT"
                            component="div"
                          >
                            Orginal Price :
                          </Typography>
                          <Typography
                            style={{ textDecoration: "line-through" }}
                            variant="subtitle2"
                          >
                            ${obj.prevAmount}
                          </Typography>
                        </Box>
                      ) : null}
                      <Typography variant="subtitle2" color="text.secondary">
                        Available in :{obj.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        marginTop={1}
                      >
                        {obj.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ bottom: 0, position: "absolute" }}>
                      <Button
                        className="btn"
                        onClick={() => navigate(`/productpage/${obj._id}`)}
                        style={{
                          color: "white",
                          margin: 10,
                          backgroundColor: "#016DD9",
                        }}
                      >
                        BOOK NOW
                      </Button>
                      {/* <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button> */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : LowToHigh ? (
          <Grid container>
            {lowtohighdata.slice(0, visible).map((obj, index) => {
              return (
                <Grid item xl={3} lg={4} md={4} sm={6} xs={12} key={index}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{
                      margin: 15,
                      Height: "auto",
                      position: "relative",
                      minHeight: 600,
                    }}
                    className="card"
                  >
                    <CardMedia
                      component="img"
                      alt="cars"
                      height="140"
                      key={index}
                      style={{ height: 300, objectFit: "contain" }}
                      image={obj.imgUrl}
                    />
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {obj.brand} {obj.model}
                          {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}   /> */}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                          ${obj.price}/day
                        </Typography>
                      </div>
                      {obj.OfferStatus ? (
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            gutterBottom
                            variant="BUTTON TEXT"
                            component="div"
                          >
                            Orginal Price :
                          </Typography>
                          <Typography
                            style={{ textDecoration: "line-through" }}
                            variant="subtitle2"
                          >
                            ${obj.prevAmount}
                          </Typography>
                        </Box>
                      ) : null}
                      <Typography variant="subtitle2" color="text.secondary">
                        Available in :{obj.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        marginTop={1}
                      >
                        {obj.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ bottom: 0, position: "absolute" }}>
                      <Button
                        className="btn"
                        onClick={() => navigate(`/productpage/${obj._id}`)}
                        style={{
                          color: "white",
                          margin: 10,
                          backgroundColor: "#016DD9",
                        }}
                      >
                        BOOK NOW
                      </Button>
                      {/* <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button> */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : HighToLow ? (
          <Grid container>
            {hightolowdata.slice(0, visible).map((obj, index) => {
              return (
                <Grid item xl={3} lg={4} md={4} sm={6} xs={12} key={index}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{
                      margin: 15,
                      Height: "auto",
                      position: "relative",
                      minHeight: 600,
                    }}
                    className="card"
                  >
                    <CardMedia
                      component="img"
                      alt="cars"
                      height="140"
                      key={index}
                      style={{ height: 300, objectFit: "contain" }}
                      image={obj.imgUrl}
                    />
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {obj.brand} {obj.model}
                          {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}   /> */}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                          ${obj.price}/day
                        </Typography>
                      </div>
                      {obj.OfferStatus ? (
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            gutterBottom
                            variant="BUTTON TEXT"
                            component="div"
                          >
                            Orginal Price :
                          </Typography>
                          <Typography
                            style={{ textDecoration: "line-through" }}
                            variant="subtitle2"
                          >
                            ${obj.prevAmount}
                          </Typography>
                        </Box>
                      ) : null}
                      <Typography variant="subtitle2" color="text.secondary">
                        Available in :{obj.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        marginTop={1}
                      >
                        {obj.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ bottom: 0, position: "absolute" }}>
                      <Button
                        className="btn"
                        onClick={() => navigate(`/productpage/${obj._id}`)}
                        style={{
                          color: "white",
                          margin: 10,
                          backgroundColor: "#016DD9",
                        }}
                      >
                        BOOK NOW
                      </Button>
                      {/* <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button> */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) 
        : DistrictSort.length > 0 ? (
          <Grid container>
            {DistrictSort.slice(0, visible).map((obj, index) => {
              return (
                <Grid item xl={3} lg={4} md={4} sm={6} xs={12} key={index}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{
                      margin: 15,
                      Height: "auto",
                      position: "relative",
                      minHeight: 600,
                    }}
                    className="card"
                  >
                    <CardMedia
                      component="img"
                      alt="cars"
                      height="140"
                      key={index}
                      style={{ height: 300, objectFit: "contain" }}
                      image={obj.imgUrl}
                    />
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {obj.brand} {obj.model}
                          {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}   /> */}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                          ${obj.price}/day
                        </Typography>
                      </div>
                      {obj.OfferStatus ? (
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            gutterBottom
                            variant="BUTTON TEXT"
                            component="div"
                          >
                            Orginal Price :
                          </Typography>
                          <Typography
                            style={{ textDecoration: "line-through" }}
                            variant="subtitle2"
                          >
                            ${obj.prevAmount}
                          </Typography>
                        </Box>
                      ) : null}
                      <Typography variant="subtitle2" color="text.secondary">
                        Available in :{obj.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        marginTop={1}
                      >
                        {obj.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ bottom: 0, position: "absolute" }}>
                      <Button
                        className="btn"
                        onClick={() => navigate(`/productpage/${obj._id}`)}
                        style={{
                          color: "white",
                          margin: 10,
                          backgroundColor: "#016DD9",
                        }}
                      >
                        BOOK NOW
                      </Button>

                      {/* <Button  onClick={()=>wishlist(`${obj._id}`)} >Remove from wishlist</Button>    */}
                      {/* <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button>   */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) 
        : (
          <Grid container>
            {carsData.slice(0, visible).map((obj, index) => {
              return (
                <Grid item xl={3} lg={4} md={4} sm={6} xs={12} key={index}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{
                      margin: 15,
                      Height: "auto",
                      position: "relative",
                      minHeight: 600,
                    }}
                    className="card"
                  >
                    <CardMedia
                      component="img"
                      alt="cars"
                      height="140"
                      key={index}
                      style={{ height: 300, objectFit: "contain" }}
                      image={obj.imgUrl}
                    />
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {obj.brand} {obj.model}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                          ${obj.price}/day
                        </Typography>
                      </div>
                      {obj.OfferStatus ? (
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            gutterBottom
                            variant="BUTTON TEXT"
                            component="div"
                          >
                            Orginal Price :
                          </Typography>
                          <Typography
                            style={{ textDecoration: "line-through" }}
                            variant="subtitle2"
                          >
                            ${obj.prevAmount}
                          </Typography>
                        </Box>
                      ) : null}
                      <Typography variant="subtitle2" color="text.secondary">
                        Available in :{obj.location}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        marginTop={1}
                      >
                        {obj.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ bottom: 0, position: "absolute" }}>
                      <Button
                        className="btn"
                        onClick={() => navigate(`/productpage/${obj._id}`)}
                        style={{
                          color: "white",
                          margin: 10,
                          backgroundColor: "#016DD9",
                        }}
                      >
                        BOOK NOW
                      </Button>

                      {/* <Button  onClick={()=>wishlist(`${obj._id}`)} >Remove from wishlist</Button>    */}
                      {/* <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button>   */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
      <div style={{ justifyContent: "center", display: "flex" }}>
        {carsData.length === visible ? null : carsData.length ? (
          <Button onClick={showMoreItem} variant="contained">
            Load More
            <ArrowDropDownIcon />
          </Button>
        ) : null}

        {visible > 4 ? (
          <Button
            onClick={showLessItem}
            variant="contained"
            style={{ marginLeft: 5 }}
          >
            Load less
            <ArrowDropUpIcon />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default Cards;
