import React, { useEffect, useState } from 'react'
import { Box,Button, Typography } from '@mui/material'
import SideBar from '../../components/sideBar/sideBar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

function AdminBooking() {
    const [BookingManagement , setBookingManagement] = useState([])
    const [render , setRender] = useState(false)

    // console.log(BookingManagement);

    const getBookingData = () => {
        axios.get('/api/admin/adminbookingdata').then((res)=>{
            // console.log(res);
            // SetHistory(res.data.bookingData)
            setBookingManagement(res.data.data)
        })
    }

    const completeHandle = (id) => {
        console.log(id);

        axios.post(`/api/admin/completed/${id}`).then((res)=>{
            console.log(res.data.data.message);
        })
        setRender(true)
    }

    
    useEffect(()=>{
        getBookingData()
    },[render])

  return (
    <div>
         <SideBar/>
        <Typography variant='h4' component='h6' textAlign='center' fontFamily="egoe UI" fontWeight={'bold'} mb={5} >Booking Management</Typography>
      <Box sx={{paddingLeft:30, marginBottom:20 }}>
      <TableContainer component={Paper}  >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{border:'2px solid black'}} >
            <TableCell>Username</TableCell>
            <TableCell align="right">Car</TableCell>
            <TableCell align="right">StartDate</TableCell>
            <TableCell align="right">EndDate</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      
      {
          BookingManagement.map((obj,index)=>{
              return(
                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 },height:70,border:'1px solid black' }} key={index}
              >
                <TableCell component="th" scope="row">
                  {obj.username}
                </TableCell>
                <TableCell align="right">{obj.carname}</TableCell>
                <TableCell align="right">{obj.startDate}</TableCell>
                <TableCell align="right">{obj.endDate}</TableCell>
                <TableCell align="right">{obj.PayedAmount}</TableCell>
                {/* <TableCell align="right">{obj.cancel ? <p >Cancelled</p> : "Not Cancelled" }</TableCell> */}
                <TableCell align="right">{obj.cancel ? <p style={{color:'red'}}  >Cancelled</p> : obj.complete ? <p style={{color:'green'}} >Completed</p> : <Button variant='outlined' color='success' onClick={()=>completeHandle(`${`${obj._id}`}`)} >Completed</Button>}</TableCell>
              </TableRow>
              )
          })
      }
            
        
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </div>
  )
}

export default AdminBooking