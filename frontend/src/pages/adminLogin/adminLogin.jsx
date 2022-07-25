import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import ErrorMessage from "../ErrorMessage";
import { useEffect, useState } from "react";


const theme = createTheme();

export default function AdminLogin() {

    const navigate = useNavigate()
    const [error , setError] = useState('')

    useEffect(()=>{
        const adminInfo = localStorage.getItem('Admin')
        if(adminInfo){
          navigate('/admin/dashboard')
        }else{
          navigate('/admin')
        }
      },[navigate])

      const {register , handleSubmit ,formState:{errors}} = useForm()



      const submitHandle = async(data) => {
        // setLoading(true)
    
    
        const {email,password} = data
    
    
        try {
    
             const config = {
               headers: {
                   "Content-type": "application/json"
               }
             }
    
             const {data , status} = await axios.post('http://localhost:5000/api/admin/adminlogin',{
               email,password
             },config)
    
             localStorage.setItem('Admin',JSON.stringify(data))
             navigate('/admin/dashboard')
            //  setLoading(false)
    
             
        } catch (error) {
          console.log(error);
        //   setLoading(false)
            setError("Invalid email or password")
        }
        
      }
    
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.montecarloluxurycars.it/wp-content/uploads/2019/11/rent-supercar-montecarlo-luxury-cars-1024x576.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(submitHandle)} sx={{ mt: 1 }}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register('email',{
                    required:"Email is required",pattern:{value:/^\S+@\S+$/i,message:"This is not a valid email"}
                })}
              />
          <p style={{color:'red',fontSize:'12px'}} >{errors.email && errors.email.message}</p>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password',{required:'Password is required' , minLength:{value:6,message:"Minimum length is 6 characters"}})}
              />
          <p style={{color:'red',fontSize:'12px'}} >{errors.password && errors.password.message}</p>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}