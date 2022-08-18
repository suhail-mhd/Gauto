import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Image, ListGroup, Card,} from 'react-bootstrap'
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { format, toDate } from "date-fns";
import axios from "axios";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Review from "../components/Review/Review";
import { createProductReview } from '../reviewAction/reviewAction'
import { PRODUCT_CREATE_REVIEW_RESET } from '../reviewConstant/reviewConstant'
import {FaStar} from 'react-icons/fa'
import Message from '../components/Message/Message'

const CarDetails = ({ match }) => {
  const [value, setValue] = React.useState([null, null]);
  const [dummyAmount, setDummyAmount] = useState(0);
  const [carData, setCarData] = useState({});
  const [carId, setCarID] = useState();
  const [wishlistdata,setWishListData] = useState([])
  const id2 = useParams();
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookStatus, setBookStatus] = useState(false);
  const [pageRender, setPageRender] = useState(false);
  const [DateAvailability, SetDateAvailability] = useState(false);
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const val = format(new Date(value[0]), "dd/MM/yyyy ");
  const val2 = format(new Date(value[1]), "dd/MM/yyyy ");
  const { slug } = useParams();
  const user = localStorage.getItem("userInfo");
  const userId = JSON.parse(user);
  const USERID = user ? userId._id : null;

  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate 

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const idInfo = id2.id;

  console.log(id2);

  const gettingData = () => {
    try {
      axios.post(`/api/user/GetSingleCar/${id2.id}`).then((response) => {
        // console.log(response.data);
        setCarData(response.data);
        setDummyAmount(response.data.price);
        setCarID(response.data._id);
        dispatch({
          type: "lattitude",
          payload: response.data.latitude,
        });
        dispatch({
          type: "longitude",
          payload: response.data.longitude,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  const count = getDifferenceInDays(value[0], value[1]);

  const totalAmount = dummyAmount * count;

  dispatch({
    type: "CarDetails",
    payload: carData,
  });

  dispatch({
    type: "date",
    payload: val,
  });

  dispatch({
    type: "endDate",
    payload: val2,
  });

  dispatch({
    type: "Total",
    payload: totalAmount,
  });

  var test = false;

  // console.log(wish);

   wishlistdata.length > 0 && wishlistdata.filter((item)=>{
    if(item === carData._id){
      test = true;
    }else{
      test = false
    }
  })

  const wishlist = () => {
    axios.post(`/api/user/dataTowishlist/${id2.id}`,{USERID}).then((res)=>{
      // console.log(res);
  
      setUpdate(true)
    })
  }

  const getwishlistdata = () => {
    try {
      axios.post('/api/user/getdatafromwishlist',{USERID}).then((res)=>{
        console.log(res.data.wishlist);
        setWishListData(res.data.wishlist)
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  const removefromwishlist = async() => {
    const data = await axios.post(`/api/user/removefromwishlist/${id2.id}`,{USERID})
    // console.log(data.data);
    setUpdate(false)
  }
    

  const HandleBookNow = (id) => {
    // console.log(id);
    try {
      axios.post(`/api/user/checkdate`, { val, val2, id }).then((res) => {
        // console.log(res);
        SetDateAvailability(res.data.message);
        if (res.data.message === "Car Not Available For this Time Period") {
          SetDateAvailability(true);
        } else {
          navigate(`/booking/${id2.id}`);
        }
      });
    } catch (error) {
      console.log("triggered");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    gettingData();
    getwishlistdata()

    setPageRender(true);
  }, [update, pageRender]);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
        marginTop: 60,
      }}
    />
  );

  const callingMap = () => {
    navigate("/map");
  };

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
   }, [dispatch, match, successProductReview])

   const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      
      createProductReview(id2.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <Helmet title="Car Detail">
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <CardMedia
                component="img"
                height="140"
                style={{ height: "auto", objectFit: "contain" }}
                alt="Image Loaded Failed"
                image={carData.imgUrl}
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">
                  {" "}
                  {carData.brand} {carData.model}
                </h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${carData.price}.00 / Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                  <Review
                  value={carData.rating}
                  text={`${carData.numReviews} reviews`}
                />
                  </span>
                </div>

                <p className="section__description">{carData.description}</p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {carData.RegNo}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-calendar-check-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {carData.register}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {carData.mileage} kmpl
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  {/* <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.gps}
                  </span> */}

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {carData.seats} Seats
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-oil-line" style={{ color: "#f9a826" }}></i>{" "}
                    {carData.fueltype}
                  </span>
                </div>
              </div>
              <ColoredLine color="black" />
            </Col>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Paper
                elevation={0}
                sx={{
                  margin: "auto",
                  height: "auto",
                  marginTop: 5,
                  background: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 10,
                  }}
                ></div>
                <Paper
                  elevation={0}
                  style={{ height: "auto", background: "none" }}
                >
                  <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    style={{ display: "flex", marginBottom: "4rem" }}
                  >
                    <Col>
                      <Typography variant="h5" component="p">
                        Choose Your Booking Date
                      </Typography>
                      <Box sx={{ display: "flex", paddingTop: 10 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateRangePicker
                            startText="Trip-starts"
                            endText="Trip-ends"
                            value={value}
                            minDate={Date.now()}
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                              <React.Fragment>
                                <TextField {...startProps} autoComplete="off" />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} autoComplete="off" />
                              </React.Fragment>
                            )}
                          />
                        </LocalizationProvider>
                      </Box>
                      <Box
                        sx={{ display: "flex", justifyContent: "center" }}
                        paddingTop={1}
                      >
                        {bookStatus ? (
                          <Chip
                            color="error"
                            label="Please Select A Date"
                            variant="outlined"
                          />
                        ) : null}
                        {DateAvailability ? (
                          <Chip
                            color="error"
                            label="Car Is Not Available At This Time Period"
                            variant="outlined"
                          />
                        ) : null}
                      </Box>
                    </Col>
                    <Col>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        {/* <Paper elevation={3} sx={{height:150,margin:1}} > */}

                        <Box
                          sx={{
                            justifyContent: "center",
                            display: "flex",
                            paddingTop: 3,
                          }}
                        >
                          <Typography variant="h5" component="h5">
                            PickUp Location
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="h3 "
                            component="h3"
                            textAlign="center"
                          >
                            {carData.location}{" "}
                            <Tooltip title="Direction from your location to cars">
                              <LocationOnOutlinedIcon
                                onClick={callingMap}
                                style={{
                                  fontSize: 40,
                                  cursor: "pointer",
                                  color: "green",
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        </Box>
                        {/* </Paper> */}
                      </Grid>
                    </Col>

                    <Col style={{ marginTop: "-5rem" }}>
                      <br />
                      <div style={{ justifyContent: "right", display: "flex" }}>
                        <Typography variant="h5">
                          <span style={{ fontWeight: "bold" }}>Total :</span>{" "}
                          {count} Days
                        </Typography>
                      </div>
                      <div style={{ justifyContent: "right", display: "flex" }}>
                        <Typography variant="h5">
                          <span style={{ fontWeight: "bold" }}>
                            Total Amount :
                          </span>{" "}
                          {totalAmount}/-
                        </Typography>
                      </div>
                      <div
                        style={{
                          justifyContent: "right",
                          display: "flex",
                          marginTop: 20,
                        }}
                      >
                        {user ? (
                          <div>
                            {totalAmount === 0 ? (
                              <Button
                                variant="contained"
                                onClick={() => setBookStatus(true)}
                              >
                                Book Now
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={() => HandleBookNow(carData._id)}
                              >
                                Book Now
                              </Button>
                            )}
                            {test ? 
                              <Button
                                variant="contained"
                                color='error'
                                sx={{ marginLeft: 3 }}
                                onClick={removefromwishlist}
                              >
                                Remove from Wishlist{" "}
                              </Button>
                             : 
                              <Button
                                sx={{ marginLeft: 3 }}
                                variant="contained"
                                color='success'
                                onClick={wishlist}
                              >
                                Add To Wishlist
                              </Button>
                            }
                          </div>
                        ) : (
                          <Typography
                            variant="p"
                            component="h6"
                            sx={{
                              color: "red",
                              border: "2px solid red",
                              padding: 1.5,
                            }}
                          >
                            Please Login To Book A Car!{" "}
                            <SentimentDissatisfiedOutlinedIcon />
                          </Typography>
                        )}
                      </div>
                    </Col>
                  </Grid>
                </Paper>
              </Paper>
            </Grid>

            {/* <Review id={idInfo} /> */}
            <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
               <ListGroup variant='flush'>
                 {product.reviews.map((review) => (
                   <ListGroup.Item key={review._id}>
                     <strong>{review.name}</strong>
                     <Review value={review.rating} />
                     <p>{review.createdAt.substring(0, 10)}</p>
                     <p>{review.comment}</p>
                   </ListGroup.Item>
                 ))}
                 <ListGroup.Item>
                 {errorProductReview && (
                     <Message variant='danger'>{errorProductReview}</Message>
                   )}
                   {userInfo ? (
                     <form className="form" onSubmit={submitHandler}>
                     <div>
                       <h2>Write a customer review</h2>
                     </div>
                     <div>
                       <label htmlFor="rating">Rating</label>
                       <select id="rating" value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                           <option value="">Select</option>
                           <option value="1">1- Bad</option>
                           <option value="2">2- Fair</option>
                           <option value="3">3- Good</option>
                           <option value="4">4- Very good</option>
                           <option value="5">5- Excellent</option>

                       </select>
                     </div>
                       <div>
                       <label htmlFor="comment">Comment</label>
                       <textarea
                         id="comment"
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                       ></textarea>
                     </div>
                    
                     <div>
                       <label />
                       <button className="primary" type="submit">
                         Submit
                       </button>
                     </div>
                     
                   </form>
                     
                   ) : (<Message>Please <Link to='/login'
                   >sign in</Link>to write a review</Message>)}
                   
                 </ListGroup.Item>
              </ListGroup>
              

          </Col>
        </Row>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
