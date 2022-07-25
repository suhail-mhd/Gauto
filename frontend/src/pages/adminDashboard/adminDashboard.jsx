import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sideBar/sideBar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Typography } from '@mui/material';
// import NumberEasing from 'react-number-easing';
import ChartJS from '../../components/Chart/Chart';



function AdminDashboard() {
  const [totalUser , setTotalUser] = useState([])
  const [totalCar , setTotalCar] = useState([])
  const [revenuTotal , setTotalRevenu] = useState([])
  const [maxUsedCar , setMaxUsedCar] = useState({})

// console.log(revenuTotal);
  const UserLenght = totalUser.length
  const totalcarlength = totalCar.length

console.log(maxUsedCar);
  // console.log(totalcarlength);
  // console.log(UserLenght);

    const totalUserData = () => {
      try {
        axios.get('/api/admin/userManagement').then((res)=>{
          // console.log(res.data);
          setTotalUser(res.data)
        })
      } catch (error) {
        
      }
    }

    const carData = () => {
      try {
        axios.get('/api/user/getCarData').then((res)=>{
          // console.log(res);
          setTotalCar(res.data.data)
        })
      } catch (error) {
        
      }
    }

    const revenu = () => {
      try {
        axios.get('/api/admin/revenu').then((res)=>{
          // console.log(res);
          setTotalRevenu(res.data.revenu[0].sum)
        })
        
      } catch (error) {
        
      }
    }


    const mostusedcar = () =>{
      try {
        axios.get('/api/admin/mostusedcar').then((res)=>{
          // console.log(res);
          setMaxUsedCar(res.data)
        })
      } catch (error) {
        
      }
    }


   

    useEffect(()=>{
      totalUserData()
      carData()
      revenu()
      mostusedcar()
    },[])

  return (
    <div>
      <SideBar/>
      <Box sx={{ flexGrow: 1 ,paddingLeft:50 ,marginTop:10 }}>
      <Grid container spacing={4} >  
          <Grid sm={12} xs={12} md={6} lg={4} xl={4} >
          <Paper elevation={12} style={{width:400,height:150}} >
          <Typography variant='h4' component='h6' textAlign='center' paddingTop={7} fontFamily='monospace' >Revenu:
           {/* <NumberEasing
  value={revenuTotal}
  speed={3000}
  decimals={0}
  ease='quintInOut' /> */}
  /-</Typography>
          </Paper>

          </Grid>

          <Grid  sm={12} xs={12} md={6} lg={4} xl={4}>
          <Paper elevation={12}  style={{width:400,height:150}} >
            <Typography variant='h4' component='h6' textAlign='center' paddingTop={7} fontFamily='monospace' >Total 
            {/* <NumberEasing
  value={UserLenght}
  speed={3000}
  decimals={0}
  ease='quintInOut' /> */}
   Users</Typography>
          </Paper>

            </Grid>

            <Grid sm={12} xs={12} md={6} lg={4} xl={4}>
            <Paper elevation={12} style={{width:400,height:150}} >
            <Typography variant='h4' component='h6' textAlign='center' paddingTop={7} fontFamily='monospace' >Total
             {/* <NumberEasing
  value={totalcarlength}
  speed={3000}
  decimals={0}
  ease='quintInOut' />  */}
  Cars</Typography>
            </Paper>

            </Grid>

            <Grid sm={12} xs={12} md={6} lg={6} xl={6}>
            <Paper elevation={12} style={{width:'80%',height:150,marginTop:40}} >
            <Typography variant='h6' component='h1' textAlign='center' paddingTop={5} fontFamily='monospace' >Maximum Used Car</Typography>
            <Typography  variant='h5' component='h1' textAlign='center'  fontFamily='monospace'  >{maxUsedCar.brand} {maxUsedCar.model}</Typography>
            </Paper>

            </Grid>


            <Grid sm={12} xs={12} md={6} lg={6} xl={6}>
            <Paper elevation={12} style={{width:'80%',height:150,marginTop:40}} >
            <Typography variant='h6' component='h1' textAlign='center' paddingTop={5} fontFamily='monospace' >Minimum Used Car</Typography>
            <Typography  variant='h5' component='h1' textAlign='center'  fontFamily='monospace'  >{maxUsedCar.MinBrand} {maxUsedCar.MinModel}</Typography>
            </Paper>

            </Grid>
      </Grid>
      <ChartJS/>
      </Box>
    </div>
  )
}

export default AdminDashboard