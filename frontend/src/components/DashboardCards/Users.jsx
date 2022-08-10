import React, { useEffect, useState } from 'react'
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
// import NumberEasing from 'react-number-easing';
import axios from 'axios';

function Users (props) {
  const [totalUser , setTotalUser] = useState([])
  const UserLength = totalUser.length

  const totalUserData = () => {
    try {
      axios.get('http://localhost:5000/api/admin/userManagement').then((res)=>{
        // console.log(res.data);
        setTotalUser(res.data)
      })
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    totalUserData()
  },[])

  return(
    <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Users
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {UserLength}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
  )
} 

export default Users;