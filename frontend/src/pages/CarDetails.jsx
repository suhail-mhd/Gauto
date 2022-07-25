import React, { useEffect, useState } from "react";
import carData from "../assets/data/carData";
import { Button, CardMedia, Grid, Typography } from '@mui/material'
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { useDispatch} from 'react-redux'
import { format, toDate } from 'date-fns'
import axios from 'axios';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const CarDetails = () => {
  const [value, setValue] = React.useState([null, null]);
  const [dummyAmount , setDummyAmount] = useState(0)
  const [carData , setCarData] = useState({})
  const [carId, setCarID] = useState()
  const [wishlistdata,setWishListData] = useState([])
  const id2 = useParams()
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [bookStatus , setBookStatus] = useState(false)
  const [pageRender , setPageRender] = useState(false)
  const [DateAvailability , SetDateAvailability] = useState(false)
    const val = format(new Date(value[0]) ,'dd/MM/yyyy ')
    const val2 = format(new Date(value[1]) ,'dd/MM/yyyy ')
  const { slug } = useParams();

  const user = localStorage.getItem('userInfo')
  const userId = JSON.parse(user) 
  const USERID = user ? userId._id : null

  const idInfo  = id2.id

  const gettingData = () => {
  
    try {

        axios.post(`http://localhost:5000/api/user/GetSingleCar/${id2.id}`).then((responce)=>{
          // console.log(responce.data);
          setCarData(responce.data)
          setDummyAmount(responce.data.price)
          setCarID(responce.data._id)
          dispatch({
            type:'lattitude',
            payload:responce.data.latitude
          })
          dispatch({
            type:'longitude',
            payload:responce.data.longitude
          })
        })

    } catch (error) {
      console.log(error);
    }
  }

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  const count = getDifferenceInDays(value[0],value[1])

  const totalAmount = dummyAmount*count


    dispatch({
      type:'CarDetails',
      payload:carData
    })  

    dispatch({
      type:'date',
      payload:val
    })
  
    dispatch({
      type:'endDate',
      payload:val2
    })
    
    dispatch({
      type:'Total',
      payload:totalAmount
    })

    // var test = false;

    const HandleBookNow = (id) =>  {
      // console.log(id);
      try {
        axios.post(`http://localhost:5000/api/user/checkdate`,{val,val2,id}).then((res)=>{
          // console.log(res);
          SetDateAvailability(res.data.message)
          if(res.data.message === 'Car Not Available For this Time Period'){
            SetDateAvailability(true)
          }else{
            navigate(`/booking/${id2.id}`)
          }
          
        })
    
      } catch (error) {
        console.log("triggred");
       
      }
    
    }

    useEffect(()=>{ 
      window.scrollTo(0, 0);
      gettingData()
      // getwishlistdata()
    
      setPageRender(true)
    },[update,pageRender])

    const ColoredLine = ({ color }) => (
      <hr
          style={{
              color: color,
              backgroundColor: color,
              height: 1,
              marginTop:60
          }}
      />
  );
  
    

  return (
    <Helmet>
      <section>
        <Container>
          <Row>
            <Col lg="6">
            <CardMedia
        component="img"
        height="140"
        style={{height:'auto',objectFit:'contain'}}
        alt="Image Loaded Failed"
        image={carData.imgUrl}
      />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title"> {carData.brand}  {carData.model}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${carData.price}.00 / Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    {/* ({singleCarItem.rating} ratings) */}
                  </span>
                </div>

                <p className="section__description">
                {carData.description}
                </p>

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
                  <i class="ri-calendar-check-line" style={{ color: "#f9a826" }}></i>{" "}
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
              
            </Col>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Paper elevation={0} sx={{margin:'auto',height:'auto',marginTop:5,background:'none'}} >
              <div style={{display:'flex',justifyContent:'center',paddingTop:10}} >
                
              
              </div>
          <Paper elevation={0}  style={{height:'auto',background:'none'}} >
            <Grid xs={12} sm={12} md={12} lg={6} xl={6} style={{display:'flex'}}>
            <Col>
            <Typography variant='h5' component='p' >
                  Choose Your Booking Date
                </Typography>
            <Box sx={{display:'flex' , paddingTop:10 }}>
             
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
            <TextField {...startProps} autoComplete='off' />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} autoComplete='off' />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
    </Box>
    <Box sx={{display:'flex' , justifyContent:'center'}} paddingTop={1}>
    { bookStatus ?  <Chip color='error' label="Please Select A Date" variant="outlined" /> : null}
    {DateAvailability ? <Chip color='error' label="Car Is Not Available At This Time Period" variant="outlined" /> : null}
    </Box>

    </Col>

    <Col style={{marginTop:'-5rem'}}>
  
    <ColoredLine color="black" />
    <br/>
    <div style={{justifyContent:'right',display:'flex'}} >
      <Typography variant='h5' >
        <span style={{fontWeight:'bold'}}>Total :</span> {count} Days
      </Typography>
    </div>
    <div style={{justifyContent:'right',display:'flex'}} >
      <Typography variant='h5' >
        <span style={{fontWeight:'bold'}}>Total Amount :</span> {totalAmount}/-
      </Typography>
    </div>
    <div style={{justifyContent:'right',display:'flex',marginTop:20}} >
      {user ? 
     <div>
        {
          totalAmount === 0 ? <Button variant='outlined' onClick={()=>setBookStatus(true)}  >Book Now</Button> : <Button variant='outlined'  onClick={()=>HandleBookNow(carData._id)}  >Book Now</Button>
        }
       {/* {
         test ?
         <Button sx={{marginLeft:3}} onClick={removefromwishlist} >Remove from Wishlist </Button>
         :
         <Button sx={{marginLeft:3}} onClick={wishlist} >Add To Wishlist</Button>
       } */}
     </div>
      :
      <Typography  variant='p' component='h6' sx={{color:'red',border:'2px solid red',padding:1.5}} >
        Please Login To Book A Car! <SentimentDissatisfiedOutlinedIcon   />
      </Typography>
      }
      
    </div>
    </Col>
    </Grid>
            </Paper>
           
            </Paper>
            
          </Grid>
            

            {/* <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
