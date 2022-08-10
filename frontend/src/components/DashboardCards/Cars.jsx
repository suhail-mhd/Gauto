import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import axios from "axios";

function Cars(props) {
  const [totalCar , setTotalCar] = useState([])
  const totalCarLength = totalCar.length

  const carData = () => {
    try {
      axios.get('http://localhost:5000/api/user/getcarData').then((res)=>{
        // console.log(res);
        setTotalCar(res.data.data)
      })
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    carData()
  },[])

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Total Cars
            </Typography>
            <Typography color="textPrimary" variant="h4">
            {totalCarLength}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2,
          }}
        >
          <ArrowUpwardIcon color="success" />
          <Typography
            variant="body2"
            sx={{
              mr: 1,
            }}
          >
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Cars;
