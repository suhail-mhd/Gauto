import React, { useEffect,useState } from 'react'
import { Button, Card, CardMedia, Container, Grid, Typography ,Paper } from '@mui/material'
import { Box } from '@mui/system'
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function WishList() {

  const [open, setOpen] = React.useState(false);
  const handleClosemodal = () => setOpen(false);
  const[removeId , setRemoveId] = useState('')

  const user = localStorage.getItem('userInfo') 
  const [carID , setCarId] = useState([])
  const [render,setRender] = useState(false)
  const navigate = useNavigate()
  
  
  const data = JSON.parse(user)
  const USERID = data._id
  // console.log(carID);


  const wishlistCount = carID.length


  // console.log(wishlistCount);

  const remove = (id) => {
    // console.log(id);
    setRemoveId(id)
    setOpen(true);
  }

  const getallwishlistdata  = () => {
    axios.post('/api/user/getallwishlistdata',{USERID}).then((res)=>{
     // console.log(res);
     setCarId(res.data)
   })
 }


 const removefromwishlist = async() => {
  const data = await  axios.post(`/api/user/removefromwishlist/${removeId}`,{USERID})
    setRender(true)
    setOpen(false); 
}
  
  useEffect(()=>{
    getallwishlistdata()   
      setRender(false)
  },[render])

  return (
    <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <Modal
        open={open}
        onClose={handleClosemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign='center' component="h2">
            Are you sure want to Remove
          </Typography>
      <Box sx={{justifyContent:'center',display:'flex'}} >
      <Button onClick={removefromwishlist} >Yes</Button>
      <Button onClick={()=>setOpen(false)} >No</Button>
      </Box>
        </Box>
      </Modal>
        <Box marginLeft={10} >
            <Typography variant='h4' component='h6' fontFamily="egoe UI" style={{fontWeight:"bold"}} >
                WhishList
            </Typography>
        </Box>

        <Box marginBottom={10}>
            <Container>
              {
                carID.length === 0 ? <Typography variant='h3' component='h1' textAlign='center' sx={{marginTop:20}} style={{fontWeight:"bold"}} >No Data On The WishList</Typography> : 

                <Grid container spacing={4} mt={3} >
                {carID.map((data)=>{
  
                  return(
              <Grid item xs={12} sm={12} md={6} lg={3} xl={3}  >
                    <Card sx={{ maxWidth: 345 }}  style={{height:'auto',width:280}}  >
                    <CardMedia
                               component="img"
                                  height="140"
        
                          style={{height:188,objectFit:'contain'}}
                          image={data.imgUrl}
                          alt=""
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                                 {data.brand} {data.model}
                          </Typography>
                        </CardContent>
                        <CardActions style={{justifyContent:'center'}} >
                        <Button  variant='contained' onClick={()=>navigate(`/productpage/${data._id}`)}  >View Car</Button>
                        <Button variant='contained' color='error' onClick={()=>remove(`${data._id}`)} >Remove</Button>
                        </CardActions>
                        <br/>
                        </Card>
                       
       </Grid>
                  )
                })}
            
              </Grid>
              }
          
            </Container>
        </Box>
    </div>
  )
}

export default WishList