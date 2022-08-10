import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300',
    height:'100',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function Coupon({pay , SetPay}) {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('1');
    const [showCoupon , setShowCoupon] = useState([])
    const [CouponApply , SetCouponApply] = useState('')
    const[couponData , setCouponData] = useState([])
    const dispatch = useDispatch()
    


    

    // console.log(couponData);

    const user = localStorage.getItem('userInfo')
    const userId = JSON.parse(user)
    const USERID = userId._id
    // console.log(USERID);


    

    // const handleOpen = () => setOpen(true);
    const handleClose = () => SetPay(false);


// Tab

const handleChange = (event, newValue) => {
    setValue(newValue);
  };
// 

// getting data
  
const getCoupon = () => {
  try {
      axios.post('/api/user/getCoupon',{USERID}).then((res)=>{
          // console.log(res.data.data);
          setShowCoupon(res.data.data)
          
      })
  } catch (error) {
      console.log(error);
  }
}



// coupon applying
    const couponSubmit = (e) => {
      e.preventDefault()
      // console.log(CouponApply);
        try {
            axios.post('/api/user/applyCoupon',{CouponApply , USERID}).then((res)=>{
              // console.log(res.data);
                dispatch({
                  type:'CouponMsg',
                  payload:res.data.message
                })
         
               dispatch({
                 type:'discount',
                 payload:res.data.discount
               })
      
              dispatch({
                type:"DisAllData",
                payload:res.data
              })
              dispatch({
                type:"CouponMsg",
                payload:res.data
              })
            })
            SetPay(false);
            // checkCoupon()
        } catch (error) {
          console.log(error);
        }


    }
// 



useEffect(()=>{
  getCoupon()

},[])

  return (
    <div>
         {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={pay}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' ,justifyContent:'center',display:'flex' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"  >
            <Tab label="Apply Coupons" value="1" />
            <Tab label="Available Coupons" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
        
           <form  onSubmit={couponSubmit} >
        <Grid container >
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
          <TextField id="outlined-basic" label="Coupon Code" variant="outlined"  onChange={(e)=>SetCouponApply(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
          <Box mt={1} ml={3} >
          <Button variant="contained" type='submit'  >Apply</Button>
          </Box>
          </Grid>
        </Grid>
          </form>
        </TabPanel>
          {
            showCoupon.map((obj)=>{
              return(
        <Grid container >
             
         <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
        <TabPanel value="2">Coupon:{obj.couponName} </TabPanel>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
        <TabPanel value="2">Code: {obj.CouponCode}</TabPanel>
        </Grid>
              
        </Grid>
              )
            })
          }
     
      </TabContext>
    </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Coupon