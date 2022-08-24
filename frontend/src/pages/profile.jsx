import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height:'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


function Profile(id) {
    const [propic , serPropic] = useState(true)
    const userid = useParams()
    const [userDataValue , setUserDataValue] = useState({})
    const [updateRes, setUpdateRes] = useState()
    const [snackOpen, snackClose] = useState(false)
    const [render, setRender] = useState(0)
    // console.log(userDataValue);


    // edit form states
        const [name,setName] = useState('')
        const [phone,setPhone] = useState('')
        const [gender,setGender] = useState()
        const [email,setEmail] = useState()
        const [district,setDistrict] = useState()
        const [age,setAge] = useState()
        const [address,setAddress] = useState()
    // 




   

    // snackbar
    const SnackClose = () => {
        // if (reason === 'clickaway') {
        //   return;
        // }
    
        snackClose(false);
      };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={SnackClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );


      

    // 



    // password rest modal
        const [passOpen , SetPassOpen] = useState(false)
        const HandlePassOpen = () => SetPassOpen(true);
        const HandlePassClose = () => SetPassOpen(false);


        const [password, setPassword] = useState('')
        const [confirmPassword , setConfirmPassword] = useState()


        const PasswordResetHandle = (e) => {
            e.preventDefault();
            if(password === confirmPassword){
                axios.patch(`/api/user/passwordreset/${userid.id}`,{password}).then((res)=>{
                    console.log(res.data.message);
                    setUpdateRes(res.data.message)
                    snackClose(true)
                })
                setRender(render+1)
                SetPassOpen(false)
            }else{
                snackClose(true)
                setUpdateRes("Password Not Matching")
                console.log("Password Not Matching");
            }

        }

    // 

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  


    const userData = () => {
        try {
            axios.get(`/api/user/getprofileuserdata/${userid.id}`).then((res)=>{
                setUserDataValue(res.data.user)  
                // console.log(res.data); 
                setName(res.data.user.name)
                setEmail(res.data.user.email)
                setPhone(res.data.user.phone)
                setGender(res.data.user.gender)
                setDistrict(res.data.user.district)
                setAge(res.data.user.age)
                setAddress(res.data.user.address)
            })

         
        } catch (error) {
            console.log(error);
        }
    }

    const userDataSubmit = (e) => {
        e.preventDefault();
            // console.log(name, email ,phone , gender , district , age ,address);


            try {
                axios.patch(`/api/user/userupdate/${userid.id}`,
                  {  name, email ,phone , gender , district , age ,address}
                ).then((res)=>{
                    // console.log(res.data.message);
                    setUpdateRes(res.data.message)
                    snackClose(true)
                })
                setRender(render+1)
                setOpen(false)
            } catch (error) {
                snackClose(false)
                console.log("Error occured while data updating",error);
            }
    }

    
    


    useEffect(()=>{
        userData()
    },[render])






  return (
    <div>
      <br/>
        <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={snackClose}
        message={updateRes}
        action={action}
      />
        <Container fixed>
            <Grid container >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                {
                   userDataValue.gender === "Male"  ?
                    <Stack sx={{alignItems:'center',marginTop:7}} >
                    <Avatar sx={{width:300,height:300}}  src='https://st4.depositphotos.com/11634452/41441/v/600/depositphotos_414416680-stock-illustration-picture-profile-icon-male-icon.jpg' />
                </Stack>
                :
                <Stack sx={{alignItems:'center',marginTop:7}} >
                <Avatar sx={{width:300,height:300}}  src='https://www.soniaworkmanlifecoaching.com/wp-content/uploads/bb-plugin/cache/anonymous-profile-square.jpg' />
            </Stack>
                }
                            

                            
                        </Grid>
            </Grid>
                <Box>
                    <Grid container spacing={1} >
                     

                        <Grid item sm={12} xs={12}  md={6} lg={6} xl={6} >
                            <Paper  sx={{display:'flex', justifyContent:'center',marginTop:5,height:50,width:'100%'}} >
                            <Typography variant='h5' component='h5' margin='auto' >
                                Name: {userDataValue.name}
                            </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} xs={12}  md={6} lg={6} xl={6} >
                        <Paper  sx={{display:'flex', justifyContent:'center',marginTop:5,height:'auto',minHeight:50,width:'100%'}} elevation={3} >
                            
                            <Typography variant='h5' component='h5' margin='auto' >
                                Email: {userDataValue.email}
                            </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} xs={12}  md={6} lg={6} xl={6} >
                            <Paper  sx={{display:'flex', justifyContent:'center',marginTop:5,height:50,width:'100%'}} elevation={3} >
                            <Typography variant='h5' component='h5' margin='auto' >
                                Phone: {userDataValue.phone}
                            </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} xs={12}  md={6} lg={6} xl={6} >
                        <Paper  sx={{display:'flex', justifyContent:'center',marginTop:5,height:50,width:'100%'}} elevation={3} >
                            <Typography variant='h5' component='h5' margin='auto' >
                                Age: {userDataValue.age}
                            </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} xs={12}  md={6} lg={6} xl={6} >
                            <Paper  sx={{display:'flex', justifyContent:'center',marginTop:5,height:50,width:'100%'}} elevation={3} >
                            <Typography variant='h5' component='h5' margin='auto' >
                                Gender: {userDataValue.gender}
                            </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} xs={12}  md={6} lg={6} xl={6} >
                        <Paper  sx={{display:'flex', justifyContent:'center',marginTop:5,height:50,width:'100%'}} elevation={3} >
                            <Typography variant='h5' component='h5' margin='auto' >
                                District: {userDataValue.district}
                            </Typography>
                            </Paper>
                        </Grid> 
                        <Grid item sm={12} xs={12}  md={12} lg={12} xl={12}  >
                        <Box sx={{display:'flex',justifyContent:'center'}} >
                        <Paper  sx={{display:'flex', justifyContent:'center',marginTop:5,height:'auto',width:'100%'}} elevation={3} >
                            <Box marginTop={2}  >
                            <Typography variant='h5' component='h5' margin='auto' sx={{textAlign:'center'}} >
                                Address:
                            </Typography>
                            <Typography variant='h5' component='h5' margin='auto' sx={{margin:2}} >
                               {userDataValue.address}
                            </Typography>
                            </Box>
                            </Paper>    
                        </Box>
                        </Grid> 

                       
                        
                    </Grid>
                  
                </Box>
                <Grid container sx={{justifyContent:'center',display:'flex'}} >
                        <Grid item  >
                       <Box marginTop={4}  >
                       <Button variant='contained' sx={{width:200,height:50}} onClick={handleOpen} >Edit</Button>
                       </Box>
                       
                        </Grid>
                        <Grid item  >
                       <Box marginTop={4}  marginLeft={2}  >
                       <Button variant='contained' sx={{width:200,height:50}} onClick={HandlePassOpen} >Reset Password</Button>
                       </Box>
                       
                        </Grid>
                    </Grid>
                    <br/>
                    <br/>
        </Container>
       <Grid container >
            <Grid item xs={12}  >
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
           <form  onSubmit={userDataSubmit} >
            <Container >
           <Grid container mt={5}  >
           <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2} >
           {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"  /> */}
           <TextField
        
            label="Name"
            placeholder="Enter Name"
            type="text"
            name="brand"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            sx={{width:'90%'}}
          />
            </Grid>
            <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}  >
            <TextField
        
        label="Email"
        placeholder="Enter Name"
        type="text"
        name="brand"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        sx={{width:'90%'}}
      />
            </Grid>
            <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
            <TextField
        
        label="Phone"
        placeholder="Enter Name"
        type="text"
        name="brand"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        sx={{width:'90%'}}
      />
            </Grid>
            <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
            <TextField
        
        label="District"
        placeholder="Enter Name"
        type="text"
        name="brand"
        value={district}
        onChange={(e)=>setDistrict(e.target.value)}
        sx={{width:'90%'}}
      />
            </Grid>
            <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
            <TextField
        
        label="Gender"
        placeholder="Enter Name"
        type="text"
        name="brand"
        onChange={(e)=>setGender(e.target.value)}
        value={gender}
        sx={{width:'90%'}}
      />
            </Grid>
            <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
            <TextField
        
        label="Address"
        placeholder="Enter Name"
        type="text"
        name="brand"
        onChange={(e)=>setAddress(e.target.value)}
        value={address}
        sx={{width:'90%'}}
      />
            </Grid>
            <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
            <TextField
        
        label="Age"
        placeholder="Enter Age"
        type="number"
        name="brand"
        value={age}
        onChange={(e)=>setAge(e.target.value)}
        sx={{width:'90%'}}
      />
            </Grid>
            
            <Box sx={{display:'flex',justifyContent:'center'}} >
               <Button type='submit' sx={{height:50}} variant='contained' >Submit</Button>
               </Box>
           
           </Grid>
           </Container>
           </form>
        </Box>
      </Modal>
            </Grid>
       </Grid>


       {/* password reset modal */}
     <Grid container >
         <Grid item xs={12}>
         <Modal
        open={passOpen}
        onClose={HandlePassClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
           Reset Your Password
          </Typography>
        <form onSubmit={PasswordResetHandle} >
            <Container>
                <Grid  container mt={5}  >
                <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
            <TextField
        
        label="Password"
        placeholder="Enter Password"
        type="password"
        name="brand"
        onChange={(e)=>setPassword(e.target.value)}
        sx={{width:'90%'}}
      />
            </Grid>

            <Grid xl={6} sm={12} xs={12} md={6} lg={6} marginBottom={2}>
            <TextField
        
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        name="brand"
        onChange={(e)=>setConfirmPassword(e.target.value)}
        sx={{width:'90%'}}
      />
            </Grid>

           
        
                </Grid>
                <Box sx={{display:'flex',justifyContent:'center'}} >
               <Button type='submit' sx={{height:40}} variant='contained' >Reset</Button>
               </Box>
            </Container>
        </form>
        </Box>
      </Modal>

         </Grid>
     </Grid>
       {/*  */}
    </div>
  )
}

export default Profile